"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeHeroSection } from "../components/ThemeHero";

const MONO = "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Sora', sans-serif";
const BODY = "var(--font-body), 'Hanken Grotesk', sans-serif";

function Eyebrow({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase" as const, color: muted ? "#565c66" : "#3b82f6", marginBottom: 16 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: muted ? "#565c66" : "#3b82f6", boxShadow: muted ? "none" : "0 0 10px #3b82f6", flexShrink: 0 }} />
      {children}
    </div>
  );
}

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setOn(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, on };
}

const SERVICES = [
  { idx: "01", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 20, height: 20, stroke: "#3b82f6" }}><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" strokeLinecap="round"/></svg>, title: "Operations Automation", body: "Event-driven pipelines that handle the repetitive, rules-based work humans shouldn't be touching — sync, route, reconcile, notify." },
  { idx: "02", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 20, height: 20, stroke: "#3b82f6" }}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>, title: "Internal Tooling", body: "Dashboards, admin consoles and internal products designed around your actual workflow — not a generic SaaS template." },
  { idx: "03", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 20, height: 20, stroke: "#3b82f6" }}><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M6 9v6a3 3 0 0 0 3 3h6"/></svg>, title: "Systems Integration", body: "Make your existing stack behave like one system — clean data contracts between ERPs, CRMs, finance and ops tools." },
];

function CodeWindow({ filename, lines }: { filename: string; lines: { num: number; tokens: { type: string; text: string }[] }[] }) {
  const colors: Record<string, string> = { cm: "#565c66", kw: "#a78bfa", fn: "#38e8b0", str: "#ffb224", num: "#ff6b6b", pun: "#8b919c", def: "#f3f4f6" };
  return (
    <div style={{ background: "#08090b", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, overflow: "hidden", fontFamily: MONO, fontSize: "0.78rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)" }}>
        {["#ff6b6b","#ffb224","#38e8b0"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: c === "#ff6b6b" ? 0.8 : 0.4 }} />)}
        <span style={{ marginLeft: 8, fontSize: "0.7rem", color: "#565c66", letterSpacing: "1px" }}>{filename}</span>
      </div>
      <div style={{ padding: "14px 18px", lineHeight: 1.85, overflowX: "auto" }}>
        {lines.map(line => (
          <div key={line.num} style={{ display: "flex", gap: 14, whiteSpace: "nowrap" }}>
            <span style={{ color: "#565c66", userSelect: "none", minWidth: 16, textAlign: "right", flexShrink: 0 }}>{line.num}</span>
            <span>{line.tokens.map((tok, i) => <span key={i} style={{ color: colors[tok.type] ?? "#f3f4f6" }}>{tok.text}</span>)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const INVOICE_LINES = [
  { num: 1,  tokens: [{ type: "cm",  text: "// reconcile vendor invoices nightly" }] },
  { num: 2,  tokens: [{ type: "kw",  text: "export const " }, { type: "fn", text: "invoiceSync" }, { type: "pun", text: " = " }, { type: "fn", text: "workflow" }, { type: "pun", text: "({" }] },
  { num: 3,  tokens: [{ type: "def", text: "  trigger" }, { type: "pun", text: ": " }, { type: "fn", text: "schedule" }, { type: "pun", text: "(" }, { type: "str", text: '"0 2 * * *"' }, { type: "pun", text: ")," }] },
  { num: 4,  tokens: [{ type: "def", text: "  retries" }, { type: "pun", text: ": " }, { type: "num", text: "3" }, { type: "pun", text: "," }] },
  { num: 5,  tokens: [{ type: "fn",  text: "  run" }, { type: "pun", text: ": " }, { type: "kw", text: "async" }, { type: "pun", text: " ({ step }) => {" }] },
  { num: 6,  tokens: [{ type: "kw",  text: "    const " }, { type: "def", text: "rows " }, { type: "pun", text: "= " }, { type: "kw", text: "await " }, { type: "def", text: "step" }, { type: "pun", text: "." }, { type: "fn", text: "fetch" }, { type: "pun", text: "(" }, { type: "str", text: '"erp.invoices"' }, { type: "pun", text: ");" }] },
  { num: 7,  tokens: [{ type: "kw",  text: "    const " }, { type: "def", text: "matched " }, { type: "pun", text: "= " }, { type: "fn", text: "reconcile" }, { type: "pun", text: "(rows, ledger);" }] },
  { num: 8,  tokens: [{ type: "kw",  text: "    await " }, { type: "def", text: "step" }, { type: "pun", text: "." }, { type: "fn", text: "commit" }, { type: "pun", text: "(matched);" }] },
  { num: 9,  tokens: [{ type: "kw",  text: "    return " }, { type: "pun", text: "{ synced: matched.length };" }] },
  { num: 10, tokens: [{ type: "pun", text: "  }," }] },
  { num: 11, tokens: [{ type: "pun", text: "});" }] },
];

const INTEGRATION_LINES = [
  { num: 1,  tokens: [{ type: "kw",  text: "source" }, { type: "pun", text: ": " }, { type: "str", text: "crm.deals" }] },
  { num: 2,  tokens: [{ type: "kw",  text: "target" }, { type: "pun", text: ": " }, { type: "str", text: "warehouse.revenue" }] },
  { num: 3,  tokens: [{ type: "kw",  text: "mode" }, { type: "pun", text: ": " }, { type: "str", text: "stream" }] },
  { num: 4,  tokens: [{ type: "kw",  text: "contract" }, { type: "pun", text: ":" }] },
  { num: 5,  tokens: [{ type: "fn",  text: "  deal_id" }, { type: "pun", text: ": " }, { type: "kw", text: "string" }, { type: "pun", text: " !" }] },
  { num: 6,  tokens: [{ type: "fn",  text: "  amount" }, { type: "pun", text: ": " }, { type: "kw", text: "number" }, { type: "pun", text: " !" }] },
  { num: 7,  tokens: [{ type: "fn",  text: "  closed_at" }, { type: "pun", text: ": " }, { type: "kw", text: "timestamp" }] },
  { num: 8,  tokens: [{ type: "kw",  text: "on_error" }, { type: "pun", text: ": " }, { type: "str", text: "dead_letter" }] },
  { num: 9,  tokens: [{ type: "kw",  text: "alerts" }, { type: "pun", text: ":" }] },
  { num: 10, tokens: [{ type: "fn",  text: '  channel' }, { type: "pun", text: ": " }, { type: "str", text: '"#ops-alerts"' }] },
  { num: 11, tokens: [{ type: "fn",  text: "  threshold" }, { type: "pun", text: ": " }, { type: "num", text: "0.99" }] },
];

const PROCESS = [
  { idx: "01", title: "Map",      body: "We sit with your team and document the workflow as it actually runs today." },
  { idx: "02", title: "Scope",    body: "A fixed proposal: what we'll build, the timeline, and the measurable outcome." },
  { idx: "03", title: "Build",    body: "Weekly working demos. You see progress, not status decks." },
  { idx: "04", title: "Handover", body: "Documented, monitored and yours — with support if you want it." },
];

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ display: "flex", alignItems: "center", gap: 12, color: "#8b919c", fontSize: "0.9rem" }}>
      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(56,232,176,0.12)", border: "1px solid rgba(56,232,176,0.3)", display: "grid", placeItems: "center", flexShrink: 0 }}>
        <svg viewBox="0 0 12 12" width={10} height={10} fill="none"><path d="M2 6l3 3 5-5" stroke="#38e8b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
      {children}
    </li>
  );
}

export default function ServicesPage() {
  const cardsReveal   = useReveal();
  const d1Reveal      = useReveal();
  const d2Reveal      = useReveal();
  const processReveal = useReveal();
  const ctaReveal     = useReveal();

  return (
    <div>
      {/* ── Hero ── */}
      <ThemeHeroSection>
        <Eyebrow muted>Services // capabilities</Eyebrow>
        <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(2rem,5vw,3.8rem)", lineHeight: 1.06, letterSpacing: "-0.025em", color: "#f3f4f6", maxWidth: "16ch", margin: "0 0 20px" }}>
          Everything between <span style={{ color: "#3b82f6" }}>a problem</span> and a system that solves it.
        </h1>
        <p className="hero-anim-4" style={{ color: "#8b919c", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "52ch", lineHeight: 1.7 }}>
          We don&apos;t sell seats or licences. We build the specific machinery your operation needs and hand it over running.
        </p>
      </ThemeHeroSection>

      {/* ── Service Cards ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={cardsReveal.ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <article key={s.idx} style={{ background: "#08090b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "24px 22px", position: "relative", display: "flex", flexDirection: "column", gap: 14, opacity: cardsReveal.on ? 1 : 0, transform: cardsReveal.on ? "translateY(0)" : "translateY(20px)", transition: `opacity .6s ${i * 0.1}s, transform .6s ${i * 0.1}s` }}>
                <span style={{ position: "absolute", top: 20, right: 22, fontFamily: MONO, fontSize: "0.7rem", color: "#565c66" }}>{s.idx}</span>
                <div style={{ width: 42, height: 42, borderRadius: 10, display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.02)" }}>{s.icon}</div>
                <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.1rem", color: "#f3f4f6", margin: 0 }}>{s.title}</h3>
                <p style={{ color: "#8b919c", fontSize: "0.9rem", lineHeight: 1.65, flex: 1, margin: 0 }}>{s.body}</p>
                <Link href="/onboard" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.5px", color: "#3b82f6", textDecoration: "none", marginTop: "auto" }}>Scope this →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deep Dive 1 ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={d1Reveal.ref} className="grid gap-10 md:gap-16 md:grid-cols-2 md:items-center" style={{ opacity: d1Reveal.on ? 1 : 0, transition: "opacity .7s, transform .7s", transform: d1Reveal.on ? "translateY(0)" : "translateY(20px)" }}>
            <div>
              <Eyebrow>Deep dive // 01</Eyebrow>
              <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.7rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.15, color: "#f3f4f6", marginBottom: 18 }}>Workflows you can read like a sentence.</h3>
              <p style={{ color: "#8b919c", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: 1.7, marginBottom: 22 }}>
                Every automation we ship is declarative and versioned. No black-box drag-and-drop — your team can see exactly what triggers, what runs, and what happens on failure.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Trigger on schedule, webhook or queue event","Built-in retries, alerting and audit trail","Deploys through CI — fully reproducible"].map(item => <CheckItem key={item}>{item}</CheckItem>)}
              </ul>
            </div>
            <CodeWindow filename="invoice_sync.ops.ts" lines={INVOICE_LINES} />
          </div>
        </div>
      </section>

      {/* ── Deep Dive 2 (code left, text right) ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={d2Reveal.ref} className="grid gap-10 md:gap-16 md:grid-cols-2 md:items-center" style={{ opacity: d2Reveal.on ? 1 : 0, transition: "opacity .7s, transform .7s", transform: d2Reveal.on ? "translateY(0)" : "translateY(20px)" }}>
            <CodeWindow filename="integration.config.yaml" lines={INTEGRATION_LINES} />
            <div>
              <Eyebrow>Deep dive // 02</Eyebrow>
              <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.7rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.15, color: "#f3f4f6", marginBottom: 18 }}>Integrations that don&apos;t break at 2am.</h3>
              <p style={{ color: "#8b919c", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: 1.7, marginBottom: 22 }}>
                We define explicit contracts between your systems, so a field rename in one tool never silently corrupts another. Typed, validated, observable.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Schema-validated payloads on every hop","Dead-letter handling for bad records","Live health metrics per connection"].map(item => <CheckItem key={item}>{item}</CheckItem>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <Eyebrow>How we work</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.02em", lineHeight: 1.12, color: "#f3f4f6" }}>Four steps, no surprises.</h2>
          </div>
          <div ref={processReveal.ref} className="grid gap-5 grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <article key={p.idx} style={{ background: "#08090b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "22px 20px", opacity: processReveal.on ? 1 : 0, transform: processReveal.on ? "translateY(0)" : "translateY(20px)", transition: `opacity .6s ${i * 0.1}s, transform .6s ${i * 0.1}s` }}>
                <Eyebrow muted>{p.idx}</Eyebrow>
                <h3 style={{ fontFamily: HEAD, fontSize: "1.15rem", fontWeight: 700, color: "#f3f4f6", margin: "12px 0 10px" }}>{p.title}</h3>
                <p style={{ color: "#8b919c", fontSize: "0.88rem", lineHeight: 1.65 }}>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-10 md:py-14">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={ctaReveal.ref} style={{ position: "relative", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "clamp(48px,8vw,80px) clamp(24px,4vw,48px)", overflow: "hidden", background: "#08090b", opacity: ctaReveal.on ? 1 : 0, transform: ctaReveal.on ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
            <div style={{ position: "absolute", width: 380, height: 260, background: "#3b82f6", filter: "blur(100px)", opacity: 0.17, top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "#f3f4f6", maxWidth: "22ch", margin: "0 auto 28px" }}>Have a process that&apos;s begging to be automated?</h2>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/onboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, background: "#3b82f6", color: "#00112e", boxShadow: "0 0 0 1px rgba(59,130,246,0.35), 0 8px 28px -8px #3b82f6", textDecoration: "none" }}>Onboard a project</Link>
                <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, color: "#f3f4f6", border: "1px solid rgba(255,255,255,0.16)", textDecoration: "none" }}>Talk to us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
