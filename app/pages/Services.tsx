"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useModal } from "../components/PageShell";
import { ThemeHeroSection } from "../components/ThemeHero";

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";
const BODY = "var(--font-body), 'Instrument Sans', sans-serif";

/* ── Eyebrow ─────────────────────────────────────────────────────────────── */

function Eyebrow({ children, color = "var(--accent)" }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase" as const, color, marginBottom: 18 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 10px ${color}`, flexShrink: 0 }} />
      {children}
    </div>
  );
}

/* ── Buttons ─────────────────────────────────────────────────────────────── */

function BtnPrimary({ href, onClick, children, invert = false }: { href?: string; onClick?: () => void; children: React.ReactNode; invert?: boolean }) {
  const s = { display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, background: invert ? "var(--wine)" : "var(--accent)", color: invert ? "var(--cream)" : "var(--on-accent)", boxShadow: invert ? "0 8px 28px -8px rgba(0,0,0,0.45)" : "0 0 0 1px var(--accent-line), 0 8px 28px -8px var(--accent)", textDecoration: "none", whiteSpace: "nowrap" as const };
  if (href) return <Link href={href} style={s}>{children}</Link>;
  return <button type="button" onClick={onClick} style={s}>{children}</button>;
}

function BtnGhost({ href, onClick, children, invert = false }: { href?: string; onClick?: () => void; children: React.ReactNode; invert?: boolean }) {
  const s = { display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, color: invert ? "var(--cream)" : "var(--text)", border: invert ? "1px solid rgba(251,243,228,0.35)" : "1px solid var(--border-strong)", textDecoration: "none", whiteSpace: "nowrap" as const };
  if (href) return <Link href={href} style={s}>{children}</Link>;
  return <button type="button" onClick={onClick} style={s}>{children}</button>;
}

/* ── useReveal ───────────────────────────────────────────────────────────── */

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

/* ── Capability Stack (hero visual) ──────────────────────────────────────── */
/* A collage of overlapping cards, not a console/terminal — each card names a
   category of work, so the hero itself previews the "what do you build" answer. */

const STACK_ICONS: Record<string, React.ReactNode> = {
  Websites: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 18, height: 18, stroke: "var(--wine)" }}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" /></svg>,
  Automation: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 18, height: 18, stroke: "var(--cream)" }}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  CRMs: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 18, height: 18, stroke: "var(--cream)" }}><circle cx="12" cy="8" r="3.2" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" strokeLinecap="round" /></svg>,
  Integrations: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 16, height: 16, stroke: "var(--wine)" }}><circle cx="6" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="M6 9v6a3 3 0 0 0 3 3h6" /></svg>,
};

const STACK_CARDS: { label: string; bg: string; fg: string; top: string; left: string; rotate: string; z: number; width: string }[] = [
  { label: "Websites",     bg: "var(--peri)",   fg: "var(--wine)",  top: "2%",  left: "4%",  rotate: "-7deg", z: 1, width: "58%" },
  { label: "CRMs",         bg: "var(--basil)",  fg: "var(--cream)", top: "16%", left: "38%", rotate: "5deg",  z: 2, width: "56%" },
  { label: "Automation",   bg: "var(--ember)",  fg: "var(--cream)", top: "44%", left: "8%",  rotate: "-3deg", z: 4, width: "62%" },
  { label: "Integrations", bg: "var(--butter)", fg: "var(--wine)",  top: "62%", left: "46%", rotate: "8deg",  z: 3, width: "48%" },
];

function CapabilityStack() {
  return (
    <div className="svc-stack" style={{ position: "relative", width: "100%", height: "clamp(280px,32vw,360px)" }}>
      {STACK_CARDS.map((c, i) => (
        <div
          key={c.label}
          className="svc-stack-card"
          style={{
            position: "absolute",
            top: c.top,
            left: c.left,
            width: c.width,
            maxWidth: 220,
            zIndex: c.z,
            transform: `rotate(${c.rotate})`,
            background: c.bg,
            borderRadius: 16,
            padding: "16px 18px",
            boxShadow: "0 18px 34px rgba(59,10,34,0.32)",
            animationDelay: `${i * 0.35}s`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(0,0,0,0.12)", display: "grid", placeItems: "center", flexShrink: 0 }}>
              {STACK_ICONS[c.label]}
            </span>
            <b style={{ fontFamily: HEAD, fontSize: "0.92rem", fontWeight: 700, color: c.fg }}>{c.label}</b>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── What we build (chip cloud) ──────────────────────────────────────────── */

const WHAT_WE_BUILD: { label: string; bg: string; fg: string; icon: React.ReactNode }[] = [
  { label: "Websites & Web Apps", bg: "var(--peri)", fg: "var(--wine)", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 15, height: 15, stroke: "var(--wine)" }}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" /></svg> },
  { label: "Automation & Workflows", bg: "var(--ember)", fg: "var(--cream)", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 15, height: 15, stroke: "var(--cream)" }}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { label: "CRMs & Customer Systems", bg: "var(--basil)", fg: "var(--cream)", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 15, height: 15, stroke: "var(--cream)" }}><circle cx="12" cy="8" r="3.2" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" strokeLinecap="round" /></svg> },
  { label: "Internal Dashboards", bg: "var(--wine)", fg: "var(--cream)", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 15, height: 15, stroke: "var(--cream)" }}><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg> },
  { label: "Systems Integrations", bg: "var(--butter)", fg: "var(--wine)", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 15, height: 15, stroke: "var(--wine)" }}><circle cx="6" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="M6 9v6a3 3 0 0 0 3 3h6" /></svg> },
  { label: "Custom Software", bg: "var(--peri)", fg: "var(--wine)", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 15, height: 15, stroke: "var(--wine)" }}><path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12" strokeLinecap="round" strokeLinejoin="round" /></svg> },
];

/* ── Service cards (bento tiles) ─────────────────────────────────────────── */

const SERVICES = [
  {
    idx: "01",
    title: "Operations Automation",
    body: "Event-driven pipelines that handle the repetitive, rules-based work humans shouldn't be touching — sync, route, reconcile, notify.",
    bg: "var(--basil)",
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 20, height: 20, stroke: "var(--wine)" }}><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" strokeLinecap="round" /></svg>,
  },
  {
    idx: "02",
    title: "Internal Tooling",
    body: "Dashboards, admin consoles and internal products designed around your actual workflow — not a generic SaaS template.",
    bg: "var(--wine)",
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 20, height: 20, stroke: "var(--wine)" }}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
  },
  {
    idx: "03",
    title: "Systems Integration",
    body: "Make your existing stack behave like one system — clean data contracts between ERPs, CRMs, finance and ops tools.",
    bg: "var(--peri)",
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 20, height: 20, stroke: "var(--wine)" }}><circle cx="6" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="M6 9v6a3 3 0 0 0 3 3h6" /></svg>,
  },
];

function ServiceCard({ s, i, on }: { s: typeof SERVICES[0]; i: number; on: boolean }) {
  return (
    <article
      style={{
        background: s.bg,
        borderRadius: 18,
        padding: "26px 24px 30px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: 220,
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(20px)",
        transition: `opacity .6s ${i * 0.1}s, transform .6s ${i * 0.1}s`,
      }}
    >
      <span style={{ position: "absolute", top: 22, right: 24, fontFamily: MONO, fontSize: "0.7rem", color: "rgba(251,243,228,0.4)" }}>{s.idx}</span>
      <div style={{ width: 42, height: 42, borderRadius: 10, display: "grid", placeItems: "center", background: "var(--butter)", marginBottom: 18 }}>
        {s.icon}
      </div>
      <h3 style={{ fontFamily: HEAD, fontSize: "1.1rem", fontWeight: 700, marginBottom: 10, color: "var(--cream)" }}>{s.title}</h3>
      <p style={{ color: "rgba(251,243,228,0.78)", fontSize: "0.9rem", lineHeight: 1.65, flex: 1 }}>{s.body}</p>
      <Link href="/onboard" style={{ fontFamily: MONO, fontSize: "0.74rem", letterSpacing: "0.5px", color: "var(--butter)", marginTop: 16, display: "inline-flex", gap: 6, alignItems: "center" }}>Scope this →</Link>
    </article>
  );
}

/* ── Check item (for dark bands) ─────────────────────────────────────────── */

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ display: "flex", alignItems: "center", gap: 12, color: "rgba(251,243,228,0.82)", fontSize: "0.9rem" }}>
      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,197,61,0.16)", border: "1px solid rgba(255,197,61,0.4)", display: "grid", placeItems: "center", flexShrink: 0 }}>
        <svg viewBox="0 0 12 12" width={10} height={10} fill="none"><path d="M2 6l3 3 5-5" stroke="var(--butter)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      {children}
    </li>
  );
}

/* ── Deep dive 1 visual: Pipeline flow ───────────────────────────────────── */

const STAGES = [
  { label: "SCHEDULE", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} style={{ width: 18, height: 18, stroke: "var(--basil)" }}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" /></svg> },
  { label: "FETCH",    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} style={{ width: 18, height: 18, stroke: "var(--basil)" }}><path d="M12 3v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 21h16" strokeLinecap="round" /></svg> },
  { label: "RECONCILE", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} style={{ width: 18, height: 18, stroke: "var(--basil)" }}><path d="M4 4v5h5M20 20v-5h-5" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.5 9A8 8 0 0 1 18 5.5M19.5 15a8 8 0 0 1-13.5 3.5" strokeLinecap="round" /></svg> },
  { label: "COMMIT",   icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} style={{ width: 18, height: 18, stroke: "var(--basil)" }}><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
];

function PipelineFlow({ on }: { on: boolean }) {
  return (
    <div className="svc-pipeline" style={{ background: "rgba(251,243,228,0.08)", border: "1px solid rgba(251,243,228,0.16)", borderRadius: 18, padding: "28px 22px" }}>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4" style={{ position: "relative" }}>
        {STAGES.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center" style={{ gap: 10, flex: "1 1 62px", minWidth: 62, position: "relative", zIndex: 1 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--cream)", display: "grid", placeItems: "center", opacity: on ? 1 : 0, transform: on ? "scale(1)" : "scale(0.6)", transition: `opacity .5s ${i * 0.15}s, transform .5s ${i * 0.15}s` }}>
              {s.icon}
            </div>
            <span style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.08em", color: "rgba(251,243,228,0.6)" }}>{s.label}</span>
          </div>
        ))}
        <div className="svc-flow-track" style={{ position: "absolute", top: 20, left: "8%", right: "8%", height: 0, borderTop: "1.5px dashed rgba(251,243,228,0.3)", zIndex: 0 }}>
          <span className="svc-flow-dot" />
        </div>
      </div>
      <div style={{ marginTop: 22, background: "rgba(0,0,0,0.22)", borderRadius: 9, padding: "12px 13px", fontFamily: MONO, fontSize: "0.7rem", color: "#B8E9CB" }}>
        ✓ synced 482 rows · retries 0 · 41ms
      </div>
    </div>
  );
}

/* ── Deep dive 2 visual: Contract diagram ────────────────────────────────── */

const CONTRACT_FIELDS = ["deal_id : string", "amount : number", "closed_at : timestamp"];

function ContractDiagram() {
  return (
    <div style={{ background: "rgba(251,243,228,0.08)", border: "1px solid rgba(251,243,228,0.16)", borderRadius: 18, padding: "26px 22px" }}>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-3">
        <div style={{ flex: 1, width: "100%", textAlign: "center", background: "rgba(251,243,228,0.1)", borderRadius: 10, padding: "12px 10px" }}>
          <span style={{ fontFamily: MONO, fontSize: "0.72rem", color: "var(--cream)" }}>crm.deals</span>
        </div>
        <svg viewBox="0 0 24 24" fill="none" stroke="rgba(251,243,228,0.5)" strokeWidth={1.8} style={{ width: 22, height: 22, flexShrink: 0, transform: "rotate(90deg)" }} className="sm:rotate-0"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div style={{ flex: 1, width: "100%", textAlign: "center", background: "rgba(251,243,228,0.1)", borderRadius: 10, padding: "12px 10px" }}>
          <span style={{ fontFamily: MONO, fontSize: "0.72rem", color: "var(--cream)" }}>warehouse.revenue</span>
        </div>
      </div>

      <div style={{ marginTop: 16, border: "1px dashed rgba(255,197,61,0.45)", borderRadius: 10, padding: "16px 18px" }}>
        <div style={{ fontFamily: MONO, fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--butter)", marginBottom: 12 }}>Contract</div>
        {CONTRACT_FIELDS.map(f => (
          <div key={f} className="flex items-center justify-between" style={{ padding: "5px 0" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.74rem", color: "rgba(251,243,228,0.82)" }}>{f}</span>
            <svg viewBox="0 0 12 12" width={11} height={11} fill="none"><path d="M2 6l3 3 5-5" stroke="#8CE0B0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, background: "rgba(0,0,0,0.22)", borderRadius: 9, padding: "12px 13px", fontFamily: MONO, fontSize: "0.7rem", color: "#B8E9CB", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#8CE0B0", boxShadow: "0 0 8px #8CE0B0", flexShrink: 0 }} />
        live · 99.97% uptime · 0 dead-letters today
      </div>
    </div>
  );
}

/* ── Process (sticky-note steps) ─────────────────────────────────────────── */

const PROCESS = [
  { idx: "01", tag: "Discovery", title: "Map",      body: "We sit with your team and document the workflow as it actually runs today." },
  { idx: "02", tag: "Planning",  title: "Scope",    body: "A fixed proposal: what we'll build, the timeline, and the measurable outcome." },
  { idx: "03", tag: "Execution", title: "Build",    body: "Weekly working demos. You see progress, not status decks." },
  { idx: "04", tag: "Delivery",  title: "Handover", body: "Documented, monitored and yours — with support if you want it." },
];

const STEP_ROTATIONS = ["-1.5deg", "1deg", "-1deg", "1.5deg"];

function StepCell({ p, i, on }: { p: typeof PROCESS[0]; i: number; on: boolean }) {
  return (
    <div
      className="svc-step-cell"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#fff",
        border: "1px solid rgba(59,10,34,0.18)",
        borderRadius: 10,
        padding: "20px 20px 22px",
        boxShadow: "0 10px 24px rgba(59,10,34,0.14)",
        opacity: on ? 1 : 0,
        transform: on ? `rotate(${STEP_ROTATIONS[i]}) translateY(0)` : "rotate(0deg) translateY(12px)",
        transition: `opacity .5s ease ${i * 0.08}s, transform .5s ease ${i * 0.08}s`,
      }}
    >
      <span style={{ position: "absolute", top: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 22px 22px 0", borderColor: "transparent var(--accent) transparent transparent" }} />
      <div className="flex items-center gap-[9px]" style={{ marginBottom: 16 }}>
        <span style={{ fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700, color: "#C43D17" }}>{p.idx}</span>
        <span style={{ fontFamily: MONO, fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>{p.tag}</span>
      </div>
      <b style={{ display: "block", fontFamily: HEAD, fontSize: "1.15rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 10, color: "var(--wine)" }}>{p.title}</b>
      <p style={{ margin: 0, fontSize: "0.87rem", lineHeight: 1.6, color: "var(--wine-2)" }}>{p.body}</p>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function ServicesPage() {
  const { openModal } = useModal();

  const buildReveal = useReveal();
  const cardsReveal = useReveal();
  const d1Reveal    = useReveal(0.2);
  const d2Reveal    = useReveal(0.2);
  const stepsReveal = useReveal();
  const ctaReveal   = useReveal();

  return (
    <div>
      {/* ── Hero ── */}
      <ThemeHeroSection background="var(--wine)" className="rounded-b-[48px] z-[2]">
        <div className="grid w-full gap-8 min-[900px]:grid-cols-[1.15fr_0.85fr] min-[900px]:items-start" style={{ position: "relative", zIndex: 1 }}>
          <div>
            <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2.2rem,4.8vw,3.9rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--cream)", maxWidth: "20ch", margin: "0 0 22px" }}>
              Everything between a problem and a{" "}
              <span style={{ color: "var(--accent)" }}>system that solves it</span>.
            </h1>
            <p className="hero-anim-4" style={{ color: "rgba(251,243,228,0.8)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "48ch", marginBottom: 30, lineHeight: 1.7 }}>
              We don&apos;t sell seats or licences. We build the specific machinery your operation needs and hand it over running.
            </p>
            <div className="hero-anim-4 flex flex-wrap gap-3">
              <BtnPrimary href="/onboard">
                Start scoping
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 15, height: 15 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </BtnPrimary>
              <BtnGhost onClick={openModal} invert>Book a call</BtnGhost>
            </div>
          </div>
          <div className="hero-anim-5">
            <CapabilityStack />
          </div>
        </div>
      </ThemeHeroSection>

      {/* ── What we build ── */}
      <section className="relative z-10 pt-[88px] pb-10 md:pt-[104px] md:pb-14" style={{ overflow: "hidden", background: "var(--bg)", borderRadius: "48px 48px 0 0", marginTop: -48 }}>
        <div style={{ position: "absolute", width: 280, height: 280, right: -100, top: 30, background: "var(--butter)", borderRadius: "50%", opacity: 0.22, filter: "blur(1px)", zIndex: 0, pointerEvents: "none" }} />
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 620, marginBottom: 34 }}>
            <Eyebrow>What we build</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(1.9rem,4vw,3.4rem)", letterSpacing: "-0.04em", lineHeight: 1.02, color: "var(--text)" }}>If it&apos;s technical, it&apos;s in scope.</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.9rem,1.3vw,1rem)", marginTop: 14, lineHeight: 1.7, maxWidth: "58ch" }}>
              Websites, product platforms, CRMs, the automation between them — if it&apos;s technical and it&apos;s slowing your team down, we&apos;ll build it.
            </p>
          </div>
          <div ref={buildReveal.ref} className="flex flex-wrap gap-3">
            {WHAT_WE_BUILD.map((item, i) => (
              <span
                key={item.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  fontFamily: BODY,
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  padding: "11px 18px",
                  borderRadius: 100,
                  background: item.bg,
                  color: item.fg,
                  opacity: buildReveal.on ? 1 : 0,
                  transform: buildReveal.on ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity .45s ${i * 0.06}s, transform .45s ${i * 0.06}s`,
                }}
              >
                {item.icon}
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="relative z-10 pt-10 pb-14 md:pt-14 md:pb-20 lg:pb-24" style={{ background: "var(--bg)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ maxWidth: 580, marginBottom: 48 }}>
            <Eyebrow>How we group it</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2.1rem,4.6vw,4.4rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--text)" }}>
              Three disciplines,{" "}
              <span style={{ background: "linear-gradient(120deg,var(--text) 30%,var(--accent) 130%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>one running system.</span>
            </h2>
          </div>
          <div ref={cardsReveal.ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => <ServiceCard key={s.idx} s={s} i={i} on={cardsReveal.on} />)}
          </div>
        </div>
      </section>

      {/* ── Deep Dive 1: Operations Automation ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24" style={{ background: "var(--basil)", borderRadius: 48 }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={d1Reveal.ref} className="grid gap-10 md:gap-16 md:grid-cols-2 md:items-center" style={{ opacity: d1Reveal.on ? 1 : 0, transition: "opacity .7s, transform .7s", transform: d1Reveal.on ? "translateY(0)" : "translateY(20px)" }}>
            <div>
              <Eyebrow color="var(--butter)">Deep dive // 01</Eyebrow>
              <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.7rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--cream)", marginBottom: 18 }}>Workflows you can read like a sentence.</h3>
              <p style={{ color: "rgba(251,243,228,0.78)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: 1.7, marginBottom: 22 }}>
                Every automation we ship is declarative and versioned. No black-box drag-and-drop — your team can see exactly what triggers, what runs, and what happens on failure.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Trigger on schedule, webhook or queue event", "Built-in retries, alerting and audit trail", "Deploys through CI — fully reproducible"].map(item => <CheckItem key={item}>{item}</CheckItem>)}
              </ul>
            </div>
            <PipelineFlow on={d1Reveal.on} />
          </div>
        </div>
      </section>

      {/* ── Deep Dive 2: Systems Integration (visual left, text right) ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24" style={{ marginTop: 32 }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ background: "var(--peri)", borderRadius: 48, padding: "clamp(32px,5vw,64px)" }}>
            <div ref={d2Reveal.ref} className="grid gap-10 md:gap-16 md:grid-cols-2 md:items-center" style={{ opacity: d2Reveal.on ? 1 : 0, transition: "opacity .7s, transform .7s", transform: d2Reveal.on ? "translateY(0)" : "translateY(20px)" }}>
              <ContractDiagram />
              <div>
                <Eyebrow color="var(--butter)">Deep dive // 02</Eyebrow>
                <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.7rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--cream)", marginBottom: 18 }}>Integrations that don&apos;t break at 2am.</h3>
                <p style={{ color: "rgba(251,243,228,0.8)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: 1.7, marginBottom: 22 }}>
                  We define explicit contracts between your systems, so a field rename in one tool never silently corrupts another. Typed, validated, observable.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Schema-validated payloads on every hop", "Dead-letter handling for bad records", "Live health metrics per connection"].map(item => <CheckItem key={item}>{item}</CheckItem>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <Eyebrow>How we work</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2rem,4.2vw,3.6rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--text)" }}>Four steps, no surprises.</h2>
          </div>
          <div ref={stepsReveal.ref} className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => <StepCell key={p.idx} p={p} i={i} on={stepsReveal.on} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div ref={ctaReveal.ref} style={{ position: "relative", textAlign: "center", background: "var(--ember)", overflow: "hidden", borderRadius: "48px 48px 0 0", opacity: ctaReveal.on ? 1 : 0, transform: ctaReveal.on ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ padding: "clamp(56px,9vw,96px) 0" }}>
          <Eyebrow color="var(--butter)">Get started</Eyebrow>
          <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--cream)", maxWidth: "22ch", margin: "0 auto 16px" }}>Have a process that&apos;s begging to be automated?</h2>
          <p style={{ color: "rgba(251,243,228,0.82)", fontSize: "clamp(0.9rem,1.3vw,1rem)", maxWidth: "48ch", margin: "0 auto 28px", lineHeight: 1.7 }}>
            Tell us where the manual work is. We&apos;ll scope a fixed-price build and show you the first working version fast.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <BtnPrimary href="/onboard" invert>Onboard a project</BtnPrimary>
            <BtnGhost href="/contact" invert>Talk to us</BtnGhost>
          </div>
        </div>
      </div>

      <style>{`
        .svc-stack-card{ animation: svc-stack-float 6s ease-in-out infinite; }
        @keyframes svc-stack-float{ 0%,100%{ margin-top:0px; } 50%{ margin-top:-10px; } }
        @media(max-width:600px){
          .svc-stack{ height:300px !important; }
        }
        .svc-flow-dot{
          position:absolute; top:-3px; left:0; width:6px; height:6px; border-radius:50%;
          background: var(--butter); box-shadow: 0 0 8px var(--butter);
          animation: svc-flow-travel 3.2s ease-in-out infinite;
        }
        @keyframes svc-flow-travel{
          0%{ left:0%; opacity:0; }
          8%{ opacity:1; }
          92%{ opacity:1; }
          100%{ left:100%; opacity:0; }
        }
        @media(max-width:600px){
          .svc-step-cell{ transform:none !important; }
        }
        @media(max-width:480px){
          .svc-flow-track{ display:none; }
          .svc-pipeline{ padding:20px 14px !important; }
        }
        @media(prefers-reduced-motion:reduce){
          .svc-flow-dot{ animation:none !important; opacity:0 !important; }
          .svc-stack-card{ animation:none !important; }
        }
      `}</style>
    </div>
  );
}
