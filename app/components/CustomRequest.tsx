"use client";

import { upload } from "@vercel/blob/client";
import { useCallback, useEffect, useRef, useState } from "react";

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";
const BODY = "var(--font-body), 'Instrument Sans', sans-serif";

/** Voice notes are capped at five minutes (Nov 2026 product meeting). */
const MAX_VOICE_SECONDS = 5 * 60;

export type Kind = "Custom product" | "Custom service" | "Not sure yet";
type Mode = "type" | "voice";
type SendState = "idle" | "sending" | "sent" | "error";

const KINDS: { value: Kind; hint: string }[] = [
  { value: "Custom product", hint: "Software built around your process" },
  { value: "Custom service", hint: "Websites, upkeep, branding" },
  { value: "Not sure yet",   hint: "Tell us the problem" },
];

function fmt(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function pickMimeType() {
  if (typeof MediaRecorder === "undefined") return "";
  const options = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];
  return options.find((t) => MediaRecorder.isTypeSupported(t)) ?? "";
}

function extensionFor(type: string) {
  if (type.includes("mp4")) return "m4a";
  if (type.includes("ogg")) return "ogg";
  return "webm";
}

/* ── Voice recorder ─────────────────────────────────────────────────────── */

function useVoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [clip, setClip] = useState<{ blob: Blob; url: string; seconds: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef(0);
  const tickRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const cleanupStream = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (tickRef.current) window.clearInterval(tickRef.current);
    tickRef.current = null;
  };

  const stop = useCallback(() => {
    const rec = recorderRef.current;
    if (rec && rec.state !== "inactive") rec.stop();
  }, []);

  const start = useCallback(async () => {
    setError(null);
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("This browser can't record audio. Type your request instead.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = pickMimeType();
      const rec = new MediaRecorder(stream, mimeType ? { mimeType, audioBitsPerSecond: 64000 } : undefined);
      chunksRef.current = [];
      rec.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      rec.onstop = () => {
        const seconds = Math.min(MAX_VOICE_SECONDS, (performance.now() - startedAtRef.current) / 1000);
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || mimeType || "audio/webm" });
        setClip((prev) => {
          if (prev) URL.revokeObjectURL(prev.url);
          return { blob, url: URL.createObjectURL(blob), seconds };
        });
        setRecording(false);
        cleanupStream();
      };
      recorderRef.current = rec;
      startedAtRef.current = performance.now();
      setElapsed(0);
      rec.start(1000);
      setRecording(true);
      tickRef.current = window.setInterval(() => {
        const s = (performance.now() - startedAtRef.current) / 1000;
        setElapsed(s);
        if (s >= MAX_VOICE_SECONDS) stop();
      }, 200);
    } catch {
      cleanupStream();
      setError("We couldn't reach your microphone. Check the browser's permission, or type instead.");
    }
  }, [stop]);

  const discard = useCallback(() => {
    setClip((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setElapsed(0);
  }, []);

  useEffect(() => () => {
    cleanupStream();
    const rec = recorderRef.current;
    if (rec && rec.state !== "inactive") rec.stop();
  }, []);

  return { recording, elapsed, clip, error, start, stop, discard };
}

/* ── Styles ─────────────────────────────────────────────────────────────── */

const labelStyle: React.CSSProperties = { fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "1.4px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 8, display: "block" };
const inputStyle: React.CSSProperties = { width: "100%", fontFamily: BODY, fontSize: "0.92rem", background: "var(--bg)", border: "1.5px solid var(--border)", borderRadius: 12, padding: "12px 14px", color: "var(--text)", outline: "none" };

/* ── Component ──────────────────────────────────────────────────────────── */

export type RequestPreset = { kind: Kind; text: string; nonce: number };

export default function CustomRequest({ defaultKind = "Not sure yet", id = "request", preset }: { defaultKind?: Kind; id?: string; preset?: RequestPreset | null }) {
  const [kind, setKind] = useState<Kind>(defaultKind);
  const [mode, setMode] = useState<Mode>("type");
  const [text, setText] = useState("");
  const [beforeRefine, setBeforeRefine] = useState<string | null>(null);
  const [refining, setRefining] = useState(false);
  const [refineError, setRefineError] = useState<string | null>(null);
  const [contact, setContact] = useState({ name: "", email: "", company: "" });
  const [trap, setTrap] = useState("");
  const [state, setState] = useState<SendState>("idle");
  const [sendError, setSendError] = useState<string | null>(null);
  const voice = useVoiceRecorder();

  // Lets another control (e.g. the "book a demo" keys) pre-fill the form.
  // Adjusting state while rendering (instead of in an effect) avoids a second pass.
  const [appliedPreset, setAppliedPreset] = useState<RequestPreset | null>(null);
  if (preset && preset !== appliedPreset) {
    setAppliedPreset(preset);
    setKind(preset.kind);
    setText(preset.text);
    setBeforeRefine(null);
    setMode("type");
  }

  const hasText = text.trim().length > 0;
  const hasVoice = !!voice.clip;
  const canSend = (hasText || hasVoice) && contact.name.trim() && /\S+@\S+\.\S+/.test(contact.email) && !voice.recording && state !== "sending";

  async function refine() {
    if (!hasText || refining) return;
    setRefining(true);
    setRefineError(null);
    try {
      const res = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, kind }),
      });
      const data = (await res.json().catch(() => ({}))) as { brief?: string; error?: string };
      if (!res.ok || !data.brief) throw new Error(data.error || "Refine is unavailable right now.");
      setBeforeRefine(text);
      setText(data.brief);
    } catch (e) {
      setRefineError(e instanceof Error ? e.message : "Refine is unavailable right now.");
    } finally {
      setRefining(false);
    }
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    setState("sending");
    setSendError(null);
    try {
      let voiceNote: { url: string; pathname: string; contentType: string; seconds: number } | null = null;
      if (voice.clip) {
        const contentType = voice.clip.blob.type || "audio/webm";
        const file = await upload(`requests/voice-note.${extensionFor(contentType)}`, voice.clip.blob, {
          access: "private",
          handleUploadUrl: "/api/requests/upload",
          contentType,
        });
        voiceNote = { url: file.url, pathname: file.pathname, contentType, seconds: Math.round(voice.clip.seconds) };
      }
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, brief: text, refined: beforeRefine !== null, contact, voiceNote, website: trap }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "We couldn't send that. Please try again.");
      setState("sent");
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "We couldn't send that. Please try again.");
      setState("error");
    }
  }

  function reset() {
    setText("");
    setBeforeRefine(null);
    voice.discard();
    setState("idle");
    setSendError(null);
  }

  if (state === "sent") {
    return (
      <div id={id} className="cr-card" style={{ textAlign: "center", padding: "56px 28px" }}>
        <style>{CR_STYLES}</style>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--basil)", display: "grid", placeItems: "center", margin: "0 auto 20px" }}>
          <svg viewBox="0 0 24 24" width={26} height={26} fill="none" stroke="#FBF3E4" strokeWidth={2.4}><path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "1.7rem", letterSpacing: "-0.03em", color: "var(--text)", marginBottom: 10 }}>Request received.</h3>
        <p style={{ color: "var(--text-muted)", maxWidth: "44ch", margin: "0 auto 24px", lineHeight: 1.65 }}>
          {hasVoice ? "Your voice note is with the team. We reply to voice notes within one hour." : "It's with the team now. We'll reply to " + contact.email + " shortly."}
        </p>
        <button type="button" onClick={reset} className="cr-ghost">Send another request</button>
      </div>
    );
  }

  return (
    <form id={id} className="cr-card" onSubmit={send} noValidate>
      <style>{CR_STYLES}</style>

      {/* What kind of request */}
      <fieldset style={{ border: 0, marginBottom: 22 }}>
        <legend style={labelStyle}>What do you need?</legend>
        <div className="cr-kinds">
          {KINDS.map((k) => (
            <label key={k.value} className={`cr-kind ${kind === k.value ? "on" : ""}`}>
              <input type="radio" name="kind" value={k.value} checked={kind === k.value} onChange={() => setKind(k.value)} />
              <span className="cr-kind-title">{k.value}</span>
              <span className="cr-kind-hint">{k.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Type vs voice */}
      <div className="cr-tabs" role="tablist" aria-label="How do you want to tell us?">
        <button type="button" role="tab" aria-selected={mode === "type"} className={mode === "type" ? "on" : ""} onClick={() => setMode("type")}>
          <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" /></svg>
          Type it
        </button>
        <button type="button" role="tab" aria-selected={mode === "voice"} className={mode === "voice" ? "on" : ""} onClick={() => setMode("voice")}>
          <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round" /></svg>
          Voice note
          {hasVoice && <span className="cr-dot" aria-label="voice note recorded" />}
        </button>
      </div>

      {mode === "type" ? (
        <div className="cr-panel">
          <label htmlFor={`${id}-brief`} style={labelStyle}>Describe it in your own words</label>
          <textarea
            id={`${id}-brief`}
            value={text}
            onChange={(e) => { setText(e.target.value); }}
            rows={beforeRefine !== null ? 11 : 6}
            maxLength={6000}
            placeholder="e.g. We run 3 cafés and track stock in a spreadsheet. We want staff to log deliveries on a phone and see what's running low…"
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6, fontFamily: beforeRefine !== null ? MONO : BODY, fontSize: beforeRefine !== null ? "0.8rem" : "0.92rem" }}
          />
          <div className="cr-refine-row">
            <button type="button" className="cr-refine" onClick={refine} disabled={!hasText || refining}>
              <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" strokeLinejoin="round" /><path d="M19 15l.8 1.9 1.9.8-1.9.8L19 20.4l-.8-1.9-1.9-.8 1.9-.8z" strokeLinejoin="round" /></svg>
              {refining ? "Refining…" : beforeRefine !== null ? "Refine again" : "Refine into a brief"}
            </button>
            {beforeRefine !== null && !refining && (
              <button type="button" className="cr-link" onClick={() => { setText(beforeRefine); setBeforeRefine(null); }}>Undo refine</button>
            )}
            <span className="cr-help">
              {beforeRefine !== null ? "Edit anything that's wrong. This is what the team receives." : "Refine turns your notes into the brief template our team works from."}
            </span>
          </div>
          {refineError && <p className="cr-err" role="alert">{refineError}</p>}
        </div>
      ) : (
        <div className="cr-panel">
          <div className="cr-voice">
            <button
              type="button"
              className={`cr-rec ${voice.recording ? "live" : ""}`}
              onClick={voice.recording ? voice.stop : voice.start}
              aria-label={voice.recording ? "Stop recording" : hasVoice ? "Record again" : "Start recording"}
            >
              {voice.recording ? <span className="cr-rec-stop" /> : <span className="cr-rec-dot" />}
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: "0.74rem", color: "var(--text-muted)", marginBottom: 8 }}>
                <span>{voice.recording ? "Recording…" : hasVoice ? "Voice note ready" : "Up to 5 minutes"}</span>
                <span>{fmt(voice.recording ? voice.elapsed : voice.clip?.seconds ?? 0)} / {fmt(MAX_VOICE_SECONDS)}</span>
              </div>
              <div className="cr-track"><i style={{ width: `${Math.min(100, ((voice.recording ? voice.elapsed : voice.clip?.seconds ?? 0) / MAX_VOICE_SECONDS) * 100)}%` }} /></div>
            </div>
          </div>
          {voice.clip && !voice.recording && (
            <div className="cr-playback">
              <audio controls src={voice.clip.url} style={{ width: "100%", height: 38 }} />
              <button type="button" className="cr-link" onClick={voice.discard}>Delete</button>
            </div>
          )}
          {voice.error && <p className="cr-err" role="alert">{voice.error}</p>}
          <p className="cr-promise">
            <span className="cr-promise-dot" />
            We reply to voice notes within one hour.
          </p>
          {hasText && <p className="cr-help" style={{ marginTop: 6 }}>Your typed notes will be sent along with the voice note.</p>}
        </div>
      )}

      {/* Contact */}
      <div className="cr-contact">
        <div>
          <label htmlFor={`${id}-name`} style={labelStyle}>Name</label>
          <input id={`${id}-name`} required autoComplete="name" value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} style={inputStyle} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} style={labelStyle}>Work email</label>
          <input id={`${id}-email`} type="email" required autoComplete="email" value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} style={inputStyle} />
        </div>
        <div>
          <label htmlFor={`${id}-company`} style={labelStyle}>Company</label>
          <input id={`${id}-company`} autoComplete="organization" placeholder="Optional" value={contact.company} onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))} style={inputStyle} />
        </div>
      </div>
      {/* Honeypot: hidden from people, filled by bots. */}
      <input type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} name="website" />

      <div className="cr-submit-row">
        <button type="submit" className="cr-submit" disabled={!canSend}>
          {state === "sending" ? (hasVoice ? "Uploading voice note…" : "Sending…") : "Send request"}
          <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
        <span className="cr-help">
          {!hasText && !hasVoice ? "Type something or record a voice note to send." : "Goes straight to the Eigensu team. No sales sequence."}
        </span>
      </div>
      {state === "error" && sendError && <p className="cr-err" role="alert">{sendError}</p>}
    </form>
  );
}

const CR_STYLES = `
.cr-card{ position:relative; background:#fff; border:2px solid var(--wine); border-radius:26px; padding:clamp(20px,3.4vw,34px); box-shadow:14px 16px 0 var(--wine); }
.cr-kinds{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; }
.cr-kind{ position:relative; display:flex; flex-direction:column; gap:3px; padding:13px 14px; border:1.5px solid var(--border); border-radius:14px; cursor:pointer; transition:border-color .2s, background .2s, transform .2s; }
.cr-kind input{ position:absolute; opacity:0; pointer-events:none; }
.cr-kind:hover{ border-color:var(--border-strong); }
.cr-kind.on{ border-color:var(--wine); background:var(--bg); box-shadow:inset 0 0 0 1px var(--wine); }
.cr-kind:focus-within{ outline:2px solid var(--peri); outline-offset:2px; }
.cr-kind-title{ font-family:${HEAD}; font-weight:700; font-size:.98rem; letter-spacing:-.01em; color:var(--text); }
.cr-kind-hint{ font-size:.76rem; color:var(--text-dim); line-height:1.35; }
.cr-tabs{ display:inline-flex; gap:4px; padding:4px; border-radius:100px; background:var(--bg-elev-3); margin-bottom:14px; }
.cr-tabs button{ display:inline-flex; align-items:center; gap:7px; padding:9px 16px; border-radius:100px; font-family:${BODY}; font-weight:600; font-size:.86rem; color:var(--text-muted); transition:background .2s,color .2s; position:relative; }
.cr-tabs button.on{ background:var(--wine); color:var(--cream); }
.cr-dot{ width:7px; height:7px; border-radius:50%; background:var(--ember); display:inline-block; }
.cr-panel{ margin-bottom:24px; }
.cr-refine-row{ display:flex; align-items:center; flex-wrap:wrap; gap:10px 14px; margin-top:12px; }
.cr-refine{ display:inline-flex; align-items:center; gap:8px; padding:10px 16px; border-radius:100px; background:var(--peri); color:#fff; font-family:${BODY}; font-weight:700; font-size:.84rem; transition:transform .2s, opacity .2s; }
.cr-refine:hover:not(:disabled){ transform:translateY(-1px); }
.cr-refine:disabled{ opacity:.45; cursor:not-allowed; }
.cr-link{ font-family:${BODY}; font-weight:600; font-size:.84rem; color:var(--text); text-decoration:underline; text-underline-offset:3px; }
.cr-help{ font-size:.8rem; color:var(--text-dim); line-height:1.45; }
.cr-err{ margin-top:10px; font-size:.84rem; color:#C4310C; }
.cr-voice{ display:flex; align-items:center; gap:18px; padding:18px; border:1.5px dashed var(--border-strong); border-radius:16px; background:var(--bg); }
.cr-rec{ flex:0 0 64px; width:64px; height:64px; border-radius:50%; background:var(--wine); display:grid; place-items:center; transition:transform .2s; box-shadow:0 0 0 0 rgba(240,73,31,.5); }
.cr-rec:hover{ transform:scale(1.05); }
.cr-rec.live{ background:var(--ember); animation:crPulse 1.4s ease-out infinite; }
.cr-rec-dot{ width:20px; height:20px; border-radius:50%; background:var(--ember); }
.cr-rec-stop{ width:18px; height:18px; border-radius:4px; background:#fff; }
@keyframes crPulse{ 0%{ box-shadow:0 0 0 0 rgba(240,73,31,.45);} 100%{ box-shadow:0 0 0 18px rgba(240,73,31,0);} }
.cr-track{ height:8px; border-radius:100px; background:rgba(28,25,23,.08); overflow:hidden; }
.cr-track i{ display:block; height:100%; background:var(--ember); border-radius:100px; transition:width .2s linear; }
.cr-playback{ display:flex; align-items:center; gap:14px; margin-top:12px; }
.cr-promise{ display:flex; align-items:center; gap:9px; margin-top:14px; font-family:${MONO}; font-size:.74rem; letter-spacing:.02em; color:var(--basil); }
.cr-promise-dot{ width:8px; height:8px; border-radius:50%; background:var(--basil); box-shadow:0 0 0 4px rgba(15,77,46,.14); }
.cr-contact{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; margin-bottom:22px; }
.cr-submit-row{ display:flex; align-items:center; flex-wrap:wrap; gap:12px 18px; }
.cr-submit{ display:inline-flex; align-items:center; gap:9px; padding:14px 22px; border-radius:100px; background:var(--ember); color:#fff; font-family:${BODY}; font-weight:700; font-size:.92rem; box-shadow:0 8px 24px -8px var(--ember); transition:transform .2s, opacity .2s; }
.cr-submit:hover:not(:disabled){ transform:translateY(-2px); }
.cr-submit:disabled{ opacity:.45; cursor:not-allowed; box-shadow:none; }
.cr-ghost{ display:inline-flex; padding:11px 18px; border-radius:100px; border:1.5px solid var(--border-strong); font-family:${BODY}; font-weight:600; font-size:.88rem; color:var(--text); }
.cr-card textarea:focus, .cr-card input:focus{ border-color:var(--wine); box-shadow:none; }
@media (max-width:760px){
  .cr-kinds{ grid-template-columns:1fr; }
  .cr-contact{ grid-template-columns:1fr; }
  .cr-card{ box-shadow:8px 10px 0 var(--wine); }
}
@media (prefers-reduced-motion: reduce){ .cr-rec.live{ animation:none; } }
`;
