"use client";

import { useCallback, useEffect, useState } from "react";
import type { CheckResult, CheckState, ServiceGroup } from "../lib/status";

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";

const POLL_MS = 60_000;
const HISTORY = 30; // checks kept per service while the page is open

const STATE_META: Record<CheckState, { label: string; color: string; soft: string }> = {
  up:   { label: "Operational", color: "#0F4D2E", soft: "rgba(15,77,46,0.12)" },
  slow: { label: "Slow",        color: "#B45309", soft: "rgba(255,197,61,0.3)" },
  down: { label: "Down",        color: "#C4310C", soft: "rgba(240,73,31,0.14)" },
};

type Snapshot = { checkedAt: string; results: CheckResult[] };

export default function StatusPage() {
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [history, setHistory] = useState<Record<string, CheckState[]>>({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as Snapshot;
      setSnap(data);
      setError(false);
      setHistory((h) => {
        const next = { ...h };
        for (const r of data.results) next[r.id] = [...(next[r.id] ?? []), r.state].slice(-HISTORY);
        return next;
      });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const first = window.setTimeout(load, 0);
    const poll = window.setInterval(load, POLL_MS);
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    return () => { window.clearTimeout(first); window.clearInterval(poll); window.clearInterval(tick); };
  }, [load]);

  const results = snap?.results ?? [];
  const down = results.filter((r) => r.state === "down").length;
  const slow = results.filter((r) => r.state === "slow").length;
  const overall: CheckState | null = !snap ? null : down ? "down" : slow ? "slow" : "up";
  const ago = snap ? Math.max(0, Math.round((now - new Date(snap.checkedAt).getTime()) / 1000)) : null;

  const groups: ServiceGroup[] = ["Eigensu", "Client sites"];

  return (
    <div style={{ paddingTop: "calc(var(--page-offset-top) + 40px)", paddingBottom: 96 }}>
      <div className="w-full max-w-[920px] mx-auto px-5 sm:px-8">
        <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 14 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)" }} />
          Status
        </div>
        <h1 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2.2rem,5vw,3.6rem)", letterSpacing: "-0.045em", lineHeight: 1, color: "var(--text)", marginBottom: 14 }}>
          Is it us?
        </h1>
        <p style={{ color: "var(--text-muted)", lineHeight: 1.7, maxWidth: "56ch", marginBottom: 32 }}>
          Live checks of every product and client site we run. Each service is checked from our servers about once a minute; this page refreshes on its own.
        </p>

        {/* Overall banner */}
        <div
          role="status"
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
            padding: "20px 22px", borderRadius: 20, marginBottom: 36,
            background: overall ? STATE_META[overall].color : "var(--wine)", color: "var(--cream)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span className={overall === "up" ? "st-beat" : ""} style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--cream)", flexShrink: 0 }} />
            <span style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(1.15rem,2.4vw,1.5rem)", letterSpacing: "-0.02em" }}>
              {error && !snap ? "Couldn't reach the status checker" :
               !overall ? "Checking everything…" :
               overall === "up" ? "All systems operational" :
               overall === "slow" ? `${slow} service${slow > 1 ? "s" : ""} responding slowly` :
               `${down} service${down > 1 ? "s" : ""} down`}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: MONO, fontSize: "0.7rem", opacity: 0.85 }}>
            {ago !== null && <span>checked {ago < 5 ? "just now" : `${ago}s ago`}</span>}
            <button type="button" onClick={load} disabled={loading} style={{ fontFamily: MONO, fontSize: "0.7rem", color: "var(--cream)", border: "1px solid rgba(251,243,228,0.45)", borderRadius: 100, padding: "6px 12px", opacity: loading ? 0.6 : 1 }}>
              {loading ? "checking…" : "↻ re-check"}
            </button>
          </div>
        </div>

        {groups.map((g) => {
          const rows = results.filter((r) => r.group === g);
          return (
            <section key={g} style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: MONO, fontSize: "0.7rem", letterSpacing: "1.6px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 12 }}>{g === "Eigensu" ? "Eigensu products" : g}</h2>
              <div style={{ background: "var(--bg-elev)", border: "2px solid var(--wine)", borderRadius: 20, overflow: "hidden" }}>
                {(rows.length ? rows : Array.from({ length: g === "Eigensu" ? 3 : 6 }, () => null)).map((r, i) => (
                  <div key={r?.id ?? i} className="st-row" style={{ borderTop: i ? "1px solid var(--border)" : "none" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.02rem", color: "var(--text)" }}>{r?.name ?? <span className="st-skel" style={{ width: 120 }} />}</div>
                      <div style={{ fontFamily: MONO, fontSize: "0.66rem", color: "var(--text-dim)", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {r ? <>{r.host}{r.note ? ` · ${r.note}` : ""}</> : <span className="st-skel" style={{ width: 160 }} />}
                      </div>
                    </div>
                    <div className="st-bars" aria-hidden="true">
                      {Array.from({ length: HISTORY }, (_, k) => {
                        const h = r ? history[r.id] ?? [] : [];
                        const s = h[h.length - HISTORY + k];
                        return <i key={k} style={{ background: s ? STATE_META[s].color : "rgba(28,25,23,0.08)", opacity: s ? 0.9 : 1 }} />;
                      })}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
                      {r && <span style={{ fontFamily: MONO, fontSize: "0.68rem", color: "var(--text-dim)", whiteSpace: "nowrap" }}>{r.latencyMs !== null ? `${r.latencyMs} ms` : r.statusCode ?? "timeout"}</span>}
                      {r ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.04em", padding: "6px 11px", borderRadius: 100, background: STATE_META[r.state].soft, color: STATE_META[r.state].color, whiteSpace: "nowrap" }}>
                          <span style={{ width: 7, height: 7, borderRadius: "50%", background: STATE_META[r.state].color }} />
                          {STATE_META[r.state].label}
                        </span>
                      ) : <span className="st-skel" style={{ width: 90, height: 24, borderRadius: 100 }} />}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <p style={{ fontSize: "0.86rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
          Seeing a problem that isn&apos;t shown here? Email <a href="mailto:hello@eigensu.in" style={{ color: "var(--text)", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>hello@eigensu.in</a>.
          The bars show the checks made while this page has been open.
        </p>
      </div>

      <style>{`
        .st-row{ display:grid; grid-template-columns:minmax(0,1.2fr) minmax(0,1fr) auto; align-items:center; gap:16px; padding:16px 18px; }
        .st-bars{ display:flex; gap:3px; height:26px; align-items:stretch; }
        .st-bars i{ flex:1; border-radius:3px; min-width:3px; }
        .st-skel{ display:inline-block; height:12px; border-radius:6px; background:rgba(28,25,23,0.08); animation:stSkel 1.2s ease-in-out infinite; }
        @keyframes stSkel{ 50%{ opacity:.5; } }
        .st-beat{ animation:stBeat 2s ease-out infinite; }
        @keyframes stBeat{ 0%{ box-shadow:0 0 0 0 rgba(251,243,228,.6);} 100%{ box-shadow:0 0 0 12px rgba(251,243,228,0);} }
        @media (max-width:640px){
          .st-row{ grid-template-columns:minmax(0,1fr) auto; }
          .st-bars{ display:none; }
        }
        @media (prefers-reduced-motion: reduce){ .st-beat, .st-skel{ animation:none; } }
      `}</style>
    </div>
  );
}
