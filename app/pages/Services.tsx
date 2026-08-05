"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeHeroSection } from "../components/ThemeHero";
import { Workflow, Globe, Box, Receipt, Trophy, BrainCircuit } from "lucide-react";

const MONO = "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Sora', sans-serif";
const BODY = "var(--font-body), 'Hanken Grotesk', sans-serif";

function Eyebrow({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase" as const, color: muted ? "var(--text-dim)" : "var(--accent)", marginBottom: 16 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: muted ? "var(--text-dim)" : "var(--accent)", boxShadow: muted ? "none" : "0 0 10px var(--accent)", flexShrink: 0 }} />
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
  { idx: "01", icon: <Globe strokeWidth={1.8} style={{ width: 22, height: 22, color: "var(--accent)" }} />, title: "Custom Web Platforms", body: "End-to-end bespoke product engineering. We build the core software that runs your business, not just a marketing site." },
  { idx: "02", icon: <BrainCircuit strokeWidth={1.8} style={{ width: 22, height: 22, color: "var(--accent)" }} />, title: "AI Automation", body: "Deploy practical AI pipelines that parse unstructured data, draft responses, and make routine decisions." },
  { idx: "03", icon: <Box strokeWidth={1.8} style={{ width: 22, height: 22, color: "var(--accent)" }} />, title: "Inventory Management", body: "Real-time stock syncing across multiple warehouses and ERPs, killing the monthly variance scramble." },
  { idx: "04", icon: <Receipt strokeWidth={1.8} style={{ width: 22, height: 22, color: "var(--accent)" }} />, title: "Invoicing Systems", body: "Reconcile vendor invoices automatically. Stop paying humans to copy data from PDFs into your accounting software." },
  { idx: "05", icon: <Workflow strokeWidth={1.8} style={{ width: 22, height: 22, color: "var(--accent)" }} />, title: "Systems Integration", body: "Connect the tools you already pay for so data flows once, cleanly, without a human in the middle." },
  { idx: "06", icon: <Trophy strokeWidth={1.8} style={{ width: 22, height: 22, color: "var(--accent)" }} />, title: "SaaS Development", body: "From Fantasy Sports platforms to restaurant dispatch systems. We build scalable, multi-tenant architectures." },
];

function CodeWindow({ filename, lines }: { filename: string; lines: { num: number; tokens: { type: string; text: string }[] }[] }) {
  const colors: Record<string, string> = { cm: "var(--text-dim)", kw: "var(--accent-4)", fn: "var(--ok)", str: "var(--warn)", num: "var(--err)", pun: "var(--text-muted)", def: "var(--text)" };
  return (
    <div style={{ background: "var(--bg-elev)", border: "1px solid var(--border-strong)", borderRadius: 14, overflow: "hidden", fontFamily: MONO, fontSize: "0.78rem", boxShadow: "0 32px 64px -24px rgba(0,0,0,0.8)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 16px", borderBottom: "1px solid var(--border)", background: "var(--panel)" }}>
        {["var(--err)","var(--warn)","var(--ok)"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: c === "var(--err)" ? 0.8 : 0.4 }} />)}
        <span style={{ marginLeft: 8, fontSize: "0.7rem", color: "var(--text-dim)", letterSpacing: "1px" }}>{filename}</span>
      </div>
      <div style={{ padding: "14px 18px", lineHeight: 1.85, overflowX: "auto" }}>
        {lines.map(line => (
          <div key={line.num} style={{ display: "flex", gap: 14, whiteSpace: "nowrap" }}>
            <span style={{ color: "var(--text-dim)", userSelect: "none", minWidth: 16, textAlign: "right", flexShrink: 0 }}>{line.num}</span>
            <span>{line.tokens.map((tok, i) => <span key={i} style={{ color: colors[tok.type] ?? "var(--text)" }}>{tok.text}</span>)}</span>
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

function AbstractDashboard() {
  return (
    <div style={{ background: "linear-gradient(180deg,var(--bg-elev-2),var(--bg-elev))", border: "1px solid var(--border-strong)", borderRadius: 14, padding: "20px", display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 32px 64px -24px rgba(0,0,0,0.8)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: 16 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
           {["var(--err)","var(--warn)","var(--ok)"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.6 }} />)}
        </div>
        <div style={{ height: 8, width: 80, background: "var(--border)", borderRadius: 4 }} />
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ width: 60, display: "flex", flexDirection: "column", gap: 12 }}>
          {[1,2,3,4].map(i => <div key={i} style={{ height: 20, width: "100%", background: i === 1 ? "var(--accent-soft)" : "var(--panel)", borderRadius: 4, border: i === 1 ? "1px solid var(--accent-line)" : "none" }} />)}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 2, height: 90, background: "var(--panel)", borderRadius: 8, border: "1px solid var(--border)", display: "flex", alignItems: "flex-end", padding: 12, gap: 6 }}>
               {[40, 70, 45, 90, 60, 85, 50, 75, 40, 95].map((h, i) => <div key={i} style={{ flex: 1, background: "linear-gradient(180deg,var(--accent),var(--accent-soft))", opacity: 0.9, borderRadius: "2px 2px 0 0", height: `${h}%` }} />)}
            </div>
            <div style={{ flex: 1, height: 90, background: "var(--panel)", borderRadius: 8, border: "1px solid var(--border)", display: "flex", justifyContent: "center", alignItems: "center" }}>
               <div style={{ width: 44, height: 44, borderRadius: "50%", border: "5px solid var(--accent-soft)", borderRightColor: "var(--accent)" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[1,2,3].map(i => (
               <div key={i} style={{ height: 32, background: "var(--panel)", borderRadius: 6, border: "1px solid var(--border)", display: "flex", alignItems: "center", padding: "0 12px", gap: 12 }}>
                 <div style={{ width: 14, height: 14, borderRadius: 3, background: "var(--border-strong)" }} />
                 <div style={{ width: "45%", height: 8, borderRadius: 4, background: "var(--border-strong)" }} />
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PROCESS = [
  { idx: "01", title: "Map",      body: "We sit with your team and document the workflow as it actually runs today." },
  { idx: "02", title: "Scope",    body: "A fixed proposal: what we'll build, the timeline, and the measurable outcome." },
  { idx: "03", title: "Build",    body: "Weekly working demos. You see progress, not status decks." },
  { idx: "04", title: "Handover", body: "Documented, monitored and yours — with support if you want it." },
];

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--text-muted)", fontSize: "0.9rem" }}>
      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(56,232,176,0.12)", border: "1px solid rgba(56,232,176,0.3)", display: "grid", placeItems: "center", flexShrink: 0 }}>
        <svg viewBox="0 0 12 12" width={10} height={10} fill="none"><path d="M2 6l3 3 5-5" stroke="var(--ok)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
      {children}
    </li>
  );
}

const FEATURED_CASES = [
  { title: "DishPatch", desc: "A robust SaaS platform for restaurants to manage guest databases, monitor replies, and run campaigns natively on WhatsApp.", href: "/dispatch", tag: "SaaS Product" },
  { title: "Fantasy Sports Engine", desc: "A highly concurrent platform scaling to millions of live socket connections during peak game times with sub-100ms latency.", href: "/projects", tag: "Custom Platform" }
];

export default function ServicesPage() {
  const { ref: cardsRef, on: cardsOn }   = useReveal();
  const { ref: d1Ref, on: d1On }         = useReveal();
  const { ref: d2Ref, on: d2On }         = useReveal();
  const { ref: caseRef, on: caseOn }     = useReveal();
  const { ref: processRef, on: processOn } = useReveal();
  const { ref: ctaRef, on: ctaOn }       = useReveal();

  return (
    <div>
      {/* ── Hero ── */}
      <ThemeHeroSection>
        <Eyebrow muted>Services // capabilities</Eyebrow>
        <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(2rem,5vw,3.8rem)", lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--text)", maxWidth: "16ch", margin: "0 0 20px" }}>
          Enterprise product engineering & <span style={{ color: "var(--accent)" }}>automation</span>.
        </h1>
        <p className="hero-anim-4" style={{ color: "var(--text-muted)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "52ch", lineHeight: 1.7 }}>
          We design, architect, and deploy the bespoke software that runs your operation. From highly concurrent consumer platforms to mission-critical internal tools.
        </p>
      </ThemeHeroSection>

      {/* ── Service Cards ── */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={cardsRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <article key={s.idx} style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 14, padding: "24px 22px", position: "relative", display: "flex", flexDirection: "column", gap: 14, opacity: cardsOn ? 1 : 0, transform: cardsOn ? "translateY(0)" : "translateY(20px)", transition: `opacity .6s ${i * 0.1}s, transform .6s ${i * 0.1}s` }}>
                <span style={{ position: "absolute", top: 20, right: 22, fontFamily: MONO, fontSize: "0.7rem", color: "var(--text-dim)" }}>{s.idx}</span>
                <div style={{ width: 42, height: 42, borderRadius: 10, display: "grid", placeItems: "center", border: "1px solid var(--border-strong)", background: "var(--panel)" }}>{s.icon}</div>
                <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.1rem", color: "var(--text)", margin: 0 }}>{s.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.65, flex: 1, margin: 0 }}>{s.body}</p>
                <Link href="/onboard" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.5px", color: "var(--accent)", textDecoration: "none", marginTop: "auto" }}>Scope this →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deep Dive 1 (Code) ── */}
      <section className="relative z-10 py-12 md:py-16" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={d1Ref} className="grid gap-10 md:gap-16 md:grid-cols-2 md:items-center" style={{ opacity: d1On ? 1 : 0, transition: "opacity .7s, transform .7s", transform: d1On ? "translateY(0)" : "translateY(20px)" }}>
            <div>
              <Eyebrow>Deep dive // Infrastructure</Eyebrow>
              <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.7rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--text)", marginBottom: 18 }}>Workflows you can read like a sentence.</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: 1.7, marginBottom: 22 }}>
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

      {/* ── Deep Dive 2 (Product) ── */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={d2Ref} className="grid gap-10 md:gap-16 md:grid-cols-2 md:items-center" style={{ opacity: d2On ? 1 : 0, transition: "opacity .7s, transform .7s", transform: d2On ? "translateY(0)" : "translateY(20px)" }}>
            <AbstractDashboard />
            <div>
              <Eyebrow>Deep dive // Interface</Eyebrow>
              <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.7rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--text)", marginBottom: 18 }}>Interfaces engineered for operational efficiency.</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: 1.7, marginBottom: 22 }}>
                We don&apos;t just string together APIs. We build consumer-grade interfaces for your internal operators, mapping the UI to their exact mental model.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Sub-100ms UI interactions","Tailored exclusively to your business logic","Live sockets for real-time collaboration"].map(item => <CheckItem key={item}>{item}</CheckItem>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Case Studies ── */}
      <section className="relative z-10 py-12 md:py-16" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <Eyebrow>In production</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.02em", lineHeight: 1.12, color: "var(--text)" }}>Platforms we&apos;ve engineered.</h2>
          </div>
          <div ref={caseRef} className="grid gap-5 md:grid-cols-2" style={{ opacity: caseOn ? 1 : 0, transform: caseOn ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
            {FEATURED_CASES.map(fc => (
               <article key={fc.title} style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 14, padding: "32px", display: "flex", flexDirection: "column", gap: 16 }}>
                 <span style={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "1px", textTransform: "uppercase", color: "var(--accent-4)", padding: "4px 10px", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 100, alignSelf: "flex-start" }}>{fc.tag}</span>
                 <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.4rem", color: "var(--text)", margin: 0 }}>{fc.title}</h3>
                 <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0, flex: 1 }}>{fc.desc}</p>
                 <Link href={fc.href} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.95rem", padding: "12px 24px", borderRadius: 100, color: "var(--text)", border: "1px solid var(--border-strong)", textDecoration: "none", alignSelf: "flex-start", marginTop: 12 }}>Read case study →</Link>
               </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="relative z-10 py-12 md:py-16" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <Eyebrow>How we work</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.02em", lineHeight: 1.12, color: "var(--text)" }}>A rigorous, predictable engineering methodology.</h2>
          </div>
          <div ref={processRef} className="grid gap-5 grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <article key={p.idx} style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 14, padding: "22px 20px", opacity: processOn ? 1 : 0, transform: processOn ? "translateY(0)" : "translateY(20px)", transition: `opacity .6s ${i * 0.1}s, transform .6s ${i * 0.1}s` }}>
                <Eyebrow muted>{p.idx}</Eyebrow>
                <h3 style={{ fontFamily: HEAD, fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", margin: "12px 0 10px" }}>{p.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.65 }}>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={ctaRef} style={{ position: "relative", textAlign: "center", border: "1px solid var(--border)", borderRadius: 20, padding: "clamp(48px,8vw,80px) clamp(24px,4vw,48px)", overflow: "hidden", background: "var(--bg-elev)", opacity: ctaOn ? 1 : 0, transform: ctaOn ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
            <div style={{ position: "absolute", width: 380, height: 260, background: "var(--accent)", filter: "blur(100px)", opacity: 0.17, top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--text)", maxWidth: "22ch", margin: "0 auto 28px" }}>Scope your platform.</h2>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/onboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, background: "var(--accent)", color: "var(--on-accent)", boxShadow: "0 0 0 1px var(--accent-line), 0 8px 28px -8px var(--accent)", textDecoration: "none" }}>Onboard a project</Link>
                <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, color: "var(--text)", border: "1px solid var(--border-strong)", textDecoration: "none" }}>Consult an Engineer</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
