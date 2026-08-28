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

/* ── Hero visual: deployed-systems ledger ────────────────────────────────── */
/* Not a repeat of the home page console — this one is a register of what is
   actually running, because that is the argument this page has to make. */

const LEDGER = [
  { sys: "northwind.dispatch",  since: "26 mo", out: "−71% hrs" },
  { sys: "vertex.inventory",    since: "18 mo", out: "99.4%" },
  { sys: "atlas.approvals",     since: "14 mo", out: "40m cycle" },
  { sys: "helios.console",      since: "09 mo", out: "9 → 1" },
  { sys: "meridian.intake",     since: "05 mo", out: "−92% err" },
];

const UPTIME_BARS = [88, 94, 91, 97, 93, 99, 96, 99, 95, 98, 94, 99];

function ProductionLedger() {
  const [tick, setTick] = useState(true);
  useEffect(() => { const id = setInterval(() => setTick(t => !t), 850); return () => clearInterval(id); }, []);

  return (
    <div style={{ background: "var(--cream)", border: "1px solid rgba(59,10,34,0.14)", borderRadius: 28, padding: 14, overflow: "hidden", boxShadow: "24px 30px 60px rgba(59,10,34,0.28)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 10px 15px" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["#FF7661", "var(--butter)", "#65C58A"].map(c => <i key={c} style={{ width: 9, height: 9, borderRadius: "50%", display: "block", background: c }} />)}
        </div>
        <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "0.08em", color: "rgba(59,10,34,0.55)" }}>deployed_systems — 5 live</span>
      </div>

      <div style={{ background: "#260616", borderRadius: 18, padding: 18 }}>
        <div className="pj-ledger-row" style={{ fontFamily: MONO, fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(251,243,228,0.4)", paddingBottom: 10, borderBottom: "1px solid rgba(251,243,228,0.12)" }}>
          <span>System</span>
          <span>Running</span>
          <span style={{ textAlign: "right" }}>Outcome</span>
        </div>

        {LEDGER.map(r => (
          <div key={r.sys} className="pj-ledger-row" style={{ padding: "11px 0", borderBottom: "1px solid rgba(251,243,228,0.07)", fontFamily: MONO, fontSize: "0.72rem" }}>
            <span style={{ color: "rgba(251,243,228,0.78)", overflow: "hidden", textOverflow: "ellipsis" }}>{r.sys}</span>
            <span style={{ color: "rgba(251,243,228,0.42)" }}>{r.since}</span>
            <span style={{ color: "#72D69A", textAlign: "right", whiteSpace: "nowrap" }}>{r.out}</span>
          </div>
        ))}

        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 46, marginTop: 16 }}>
          {UPTIME_BARS.map((h, i) => (
            <div key={i} style={{ flex: 1, background: i % 4 === 2 ? "var(--peri)" : "var(--ember)", opacity: 0.9, borderRadius: "3px 3px 0 0", height: `${h}%` }} />
          ))}
        </div>

        <div style={{ marginTop: 12, background: "#12030a", borderRadius: 9, padding: "12px 13px", fontFamily: MONO, fontSize: "0.68rem", color: "rgba(251,243,228,0.62)" }}>
          <b style={{ color: "#72D69A" }}>eigensu ▸</b>
          {" status --all → 99.9% uptime"}
          <span style={{ display: "inline-block", width: 6, height: 12, background: "var(--ember)", marginLeft: 4, verticalAlign: "-2px", opacity: tick ? 0.9 : 0, transition: "opacity .1s" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Clients marquee ─────────────────────────────────────────────────────── */

const LOGO_FILTER = "brightness(0) saturate(100%) invert(96%) sepia(9%) saturate(638%) hue-rotate(315deg) brightness(103%) contrast(96%)";

const CLIENT_LOGOS = [
  { src: "/clientlogos/binge.png",          alt: "Binge Consulting",  h: "clamp(2.2rem,5vw,3rem)" },
  { src: "/clientlogos/soraia.png",         alt: "Soraia",            h: "clamp(3rem,7vw,4.2rem)" },
  { src: "/clientlogos/scarletthouse.png",  alt: "Scarlett House",    h: "clamp(3.4rem,8vw,4.8rem)" },
  { src: "/clientlogos/Sweeney.png",        alt: "Sweeney",           h: "clamp(3rem,7vw,4.2rem)" },
  { src: "/clientlogos/icici.svg",          alt: "ICICI Bank",        h: "clamp(2.4rem,5.5vw,3.2rem)" },
  { src: "/clientlogos/sacredwalks.png",    alt: "The Sacred Walks",  h: "clamp(3rem,7vw,4.2rem)" },
  { src: "/clientlogos/lafete.png",         alt: "La fête",           h: "clamp(2.2rem,5vw,3rem)" },
  { src: "/clientlogos/walle.png",          alt: "Wall-E Arena",      h: "clamp(3rem,7vw,4.2rem)" },
  { src: "/clientlogos/fielia.png",         alt: "Fielia",            h: "clamp(3rem,7vw,4.2rem)" },
  { src: "/clientlogos/reservego.png",      alt: "ReserveGo",         h: "clamp(2rem,4.5vw,2.7rem)" },
];

function ClientsBand() {
  const items = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <div style={{ padding: "96px 0 88px", marginTop: -48, textAlign: "center", background: "var(--ember)", position: "relative", zIndex: 1, overflow: "hidden" }}>
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <p style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontWeight: 700, fontSize: "0.66rem", letterSpacing: "0.06em", color: "var(--cream)", background: "var(--wine)", padding: "9px 16px", borderRadius: 100, margin: "0 auto 46px" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--butter)", flexShrink: 0 }} />
          The operations behind these teams run on systems we built.
        </p>
      </div>
      <div style={{ overflow: "hidden", width: "100%" }}>
        <div className="pj-marquee" style={{ display: "flex", alignItems: "center", gap: 56, width: "max-content" }}>
          {/* eslint-disable @next/next/no-img-element */}
          {items.map((l, i) => (
            <img key={`${l.alt}-${i}`} src={l.src} alt={i < CLIENT_LOGOS.length ? l.alt : ""} aria-hidden={i >= CLIENT_LOGOS.length} style={{ height: l.h, width: "auto", flexShrink: 0, filter: LOGO_FILTER }} />
          ))}
          {/* eslint-enable @next/next/no-img-element */}
        </div>
      </div>
    </div>
  );
}

/* ── Index + stats ───────────────────────────────────────────────────────── */

const INDEX_ROWS = [
  { n: "01", tag: "Logistics",     title: "Dispatch automation",      client: "Northwind", metric: "−71% manual hrs", href: "#case-northwind" },
  { n: "02", tag: "Manufacturing", title: "Inventory reconciliation", client: "Vertex",    metric: "99.4% accuracy",  href: "#case-vertex" },
  { n: "03", tag: "Finance",       title: "Approval routing",         client: "Atlas",     metric: "days → 40m",      href: "#case-atlas" },
  { n: "04", tag: "Retail",        title: "Ops command centre",       client: "Helios",    metric: "9 tools → 1",     href: "#also-shipped" },
  { n: "05", tag: "Healthcare",    title: "Intake digitisation",      client: "Meridian",  metric: "−92% errors",     href: "#also-shipped" },
];

const STATS = [
  { num: "12", unit: "+",  lbl: "Systems shipped" },
  { num: "100", unit: "%", lbl: "Still in production" },
  { num: "05", unit: "",   lbl: "Industries served" },
  { num: "3–8", unit: "wk", lbl: "To first release" },
];

function IndexList() {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} style={{ borderTop: "1px solid var(--border)", opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(18px)", transition: "opacity .7s, transform .7s" }}>
      {INDEX_ROWS.map((r, i) => (
        <a
          key={r.n}
          href={r.href}
          className="pj-index-row"
          style={{ borderBottom: "1px solid var(--border)", transitionDelay: `${i * 0.05}s` }}
        >
          <span style={{ fontFamily: MONO, fontSize: "0.68rem", color: "var(--accent)" }}>{r.n}</span>
          <span style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "1px", textTransform: "uppercase", color: "var(--wine-2)" }}>{r.tag}</span>
          <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1rem,1.8vw,1.35rem)", letterSpacing: "-0.02em", color: "var(--text)" }}>{r.title}</span>
          <span style={{ fontFamily: MONO, fontSize: "0.62rem", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-dim)" }}>{r.client}</span>
          <span style={{ fontFamily: MONO, fontSize: "0.76rem", color: "var(--basil)", whiteSpace: "nowrap" }}>{r.metric}</span>
          <span className="pj-index-arrow" aria-hidden="true">→</span>
        </a>
      ))}
    </div>
  );
}

function StatsStrip() {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} style={{ marginTop: 40, border: "2px solid var(--wine)", borderRadius: 16, background: "#fff", overflow: "hidden", opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(18px)", transition: "opacity .7s, transform .7s" }}>
      <div className="pj-stats">
        {STATS.map(s => (
          <div key={s.lbl}>
            <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(1.6rem,3.6vw,2.5rem)", letterSpacing: "-0.03em", color: "var(--text)" }}>
              {s.num}<span style={{ color: "var(--accent)" }}>{s.unit}</span>
            </div>
            <div style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "1px", textTransform: "uppercase", color: "var(--wine-2)", marginTop: 8 }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Case study primitives ───────────────────────────────────────────────── */

type Tone = "dark" | "light";

const TONE = {
  dark: {
    heading: "var(--cream)",
    body: "rgba(251,243,228,0.78)",
    dim: "rgba(251,243,228,0.5)",
    rule: "1px solid rgba(251,243,228,0.18)",
    eyebrow: "var(--butter)",
    metric: "#8CE0B0",
    panelBg: "rgba(251,243,228,0.08)",
    panelBorder: "1px solid rgba(251,243,228,0.16)",
    pillBg: "rgba(251,243,228,0.10)",
    pillBorder: "1px solid rgba(251,243,228,0.2)",
    pillText: "rgba(251,243,228,0.82)",
  },
  light: {
    heading: "var(--text)",
    body: "var(--text-muted)",
    dim: "var(--text-dim)",
    rule: "1px solid var(--border)",
    eyebrow: "var(--accent)",
    metric: "var(--basil)",
    panelBg: "#fff",
    panelBorder: "2px solid var(--wine)",
    pillBg: "#F4E9D6",
    pillBorder: "1px solid rgba(59,10,34,0.18)",
    pillText: "var(--wine-2)",
  },
} as const;

type CaseData = {
  n: string;
  id: string;
  industry: string;
  client: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  metric: string;
  metricLabel: string;
  tech: string[];
};

function CaseIntro({ c, tone }: { c: CaseData; tone: Tone }) {
  const t = TONE[tone];
  return (
    <div style={{ maxWidth: 640 }}>
      <Eyebrow color={t.eyebrow}>Case study // {c.n}</Eyebrow>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, fontFamily: MONO, fontSize: "0.64rem", letterSpacing: "1px", textTransform: "uppercase", color: t.dim }}>
        <span>{c.industry}</span>
        <span aria-hidden="true">/</span>
        <span>{c.client}</span>
      </div>
      <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(1.9rem,4vw,3.2rem)", letterSpacing: "-0.04em", lineHeight: 1.02, color: t.heading, marginBottom: 16 }}>{c.title}</h2>
      <p style={{ color: t.body, fontSize: "clamp(0.92rem,1.3vw,1.05rem)", lineHeight: 1.7, maxWidth: "58ch" }}>{c.summary}</p>
    </div>
  );
}

function CaseArc({ c, tone }: { c: CaseData; tone: Tone }) {
  const t = TONE[tone];
  const label = (color: string) => ({ fontFamily: MONO, fontSize: "0.62rem", textTransform: "uppercase" as const, letterSpacing: "1px", color, marginBottom: 12 });
  return (
    <div className="grid gap-8 md:grid-cols-3" style={{ marginTop: 44, paddingTop: 36, borderTop: t.rule }}>
      <div>
        <h3 style={label(tone === "dark" ? "#FF8064" : "var(--err)")}>The problem</h3>
        <p style={{ color: t.body, fontSize: "0.92rem", lineHeight: 1.65 }}>{c.problem}</p>
      </div>
      <div>
        <h3 style={label(tone === "dark" ? "var(--butter)" : "var(--accent)")}>What we built</h3>
        <p style={{ color: t.body, fontSize: "0.92rem", lineHeight: 1.65 }}>{c.solution}</p>
      </div>
      <div>
        <h3 style={label(t.metric)}>The result</h3>
        <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2.2rem,4.5vw,3.2rem)", letterSpacing: "-0.045em", lineHeight: 0.9, color: t.metric, marginBottom: 12 }}>{c.metric}</div>
        <p style={{ color: t.body, fontSize: "0.92rem", lineHeight: 1.65 }}>{c.metricLabel}</p>
      </div>
    </div>
  );
}

function CaseFoot({ c, tone }: { c: CaseData; tone: Tone }) {
  const t = TONE[tone];
  return (
    <div className="flex flex-wrap items-end justify-between gap-6" style={{ marginTop: 36, paddingTop: 28, borderTop: t.rule }}>
      <div>
        <div style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "1px", color: t.dim, marginBottom: 12 }}>Stack</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {c.tech.map(tag => (
            <span key={tag} style={{ background: t.pillBg, border: t.pillBorder, borderRadius: 100, padding: "6px 13px", fontFamily: MONO, fontSize: "0.7rem", color: t.pillText }}>{tag}</span>
          ))}
        </div>
      </div>
      <Link href="/onboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", color: t.eyebrow }}>
        Scope something like this →
      </Link>
    </div>
  );
}

/* ── Visual 01: routing flow (Northwind) ─────────────────────────────────── */

const ROUTE_STAGES = [
  { label: "INTAKE",   icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} style={{ width: 18, height: 18, stroke: "var(--basil)" }}><path d="M12 3v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 21h16" strokeLinecap="round" /></svg> },
  { label: "SCORE",    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} style={{ width: 18, height: 18, stroke: "var(--basil)" }}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" /></svg> },
  { label: "BALANCE",  icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} style={{ width: 18, height: 18, stroke: "var(--basil)" }}><path d="M4 4v5h5M20 20v-5h-5" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.5 9A8 8 0 0 1 18 5.5M19.5 15a8 8 0 0 1-13.5 3.5" strokeLinecap="round" /></svg> },
  { label: "DISPATCH", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} style={{ width: 18, height: 18, stroke: "var(--basil)" }}><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
];

const QUEUE_BARS = [96, 88, 74, 61, 49, 38, 30, 24, 19, 15, 12, 9];

function RoutingFlow({ on }: { on: boolean }) {
  const t = TONE.dark;
  return (
    <div className="pj-panel" style={{ background: t.panelBg, border: t.panelBorder, borderRadius: 20, padding: "28px 22px" }}>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4" style={{ position: "relative" }}>
        {ROUTE_STAGES.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center" style={{ gap: 10, flex: "1 1 62px", minWidth: 62, position: "relative", zIndex: 1 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--cream)", display: "grid", placeItems: "center", opacity: on ? 1 : 0, transform: on ? "scale(1)" : "scale(0.6)", transition: `opacity .5s ${i * 0.15}s, transform .5s ${i * 0.15}s` }}>
              {s.icon}
            </div>
            <span style={{ fontFamily: MONO, fontSize: "0.58rem", letterSpacing: "0.08em", color: "rgba(251,243,228,0.6)" }}>{s.label}</span>
          </div>
        ))}
        <div className="pj-flow-track" style={{ position: "absolute", top: 20, left: "10%", right: "10%", height: 0, borderTop: "1.5px dashed rgba(251,243,228,0.3)", zIndex: 0 }}>
          <span className="pj-flow-dot" />
        </div>
      </div>

      <div style={{ marginTop: 26 }}>
        <div style={{ fontFamily: MONO, fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(251,243,228,0.5)", marginBottom: 10 }}>
          Manual queue depth · first 12 weeks
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 78 }}>
          {QUEUE_BARS.map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderRadius: "3px 3px 0 0",
                background: i > 8 ? "#8CE0B0" : "var(--ember)",
                opacity: 0.9,
                height: on ? `${h}%` : "4%",
                transition: `height .8s cubic-bezier(.16,1,.3,1) ${i * 0.04}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ marginTop: 18, background: "rgba(0,0,0,0.22)", borderRadius: 9, padding: "12px 13px", fontFamily: MONO, fontSize: "0.7rem", color: "#B8E9CB" }}>
        ✓ 2,041 orders routed today · 0 manual touches · 38ms avg
      </div>
    </div>
  );
}

/* ── Visual 02: sync matrix (Vertex) ─────────────────────────────────────── */

const PLANTS = [
  { site: "Pune",     cells: ["ok", "ok", "ok"],   delta: "0.00%" },
  { site: "Chennai",  cells: ["ok", "ok", "ok"],   delta: "0.00%" },
  { site: "Nashik",   cells: ["ok", "sync", "ok"], delta: "0.02%" },
  { site: "Baddi",    cells: ["ok", "ok", "ok"],   delta: "0.00%" },
];

const ERPS = ["SAP", "Oracle", "Tally"];

function SyncMatrix({ on }: { on: boolean }) {
  return (
    <div style={{ background: "#fff", border: "2px solid var(--wine)", borderRadius: 20, padding: "22px 20px 20px", boxShadow: "0 16px 34px rgba(59,10,34,0.12)" }}>
      <div className="flex items-center justify-between" style={{ gap: 12, marginBottom: 18 }}>
        <span style={{ fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.06em", color: "var(--wine)" }}>inventory_recon</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--basil)" }}>
          <span className="pj-pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--basil)", display: "block" }} />
          4 sites · 3 ERPs
        </span>
      </div>

      <div className="pj-matrix">
        <span />
        {ERPS.map(e => (
          <span key={e} style={{ fontFamily: MONO, fontSize: "0.56rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--wine-2)", textAlign: "center" }}>{e}</span>
        ))}
        <span style={{ fontFamily: MONO, fontSize: "0.56rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--wine-2)", textAlign: "right" }}>Δ</span>

        {PLANTS.map((p, row) => (
          <div key={p.site} style={{ display: "contents" }}>
            <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: "0.82rem", color: "var(--wine)" }}>{p.site}</span>
            {p.cells.map((state, col) => (
              <span
                key={col}
                style={{
                  height: 26,
                  borderRadius: 7,
                  display: "grid",
                  placeItems: "center",
                  background: state === "ok" ? "var(--basil)" : "var(--butter)",
                  opacity: on ? 1 : 0,
                  transform: on ? "scale(1)" : "scale(0.7)",
                  transition: `opacity .4s ${(row * 3 + col) * 0.04}s, transform .4s ${(row * 3 + col) * 0.04}s`,
                }}
              >
                {state === "ok" ? (
                  <svg viewBox="0 0 12 12" width={11} height={11} fill="none" aria-label="synced"><path d="M2 6l3 3 5-5" stroke="#EAF6EE" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                  <span className="pj-spin" style={{ width: 9, height: 9, borderRadius: "50%", border: "2px solid var(--wine)", borderTopColor: "transparent", display: "block" }} />
                )}
              </span>
            ))}
            <span style={{ fontFamily: MONO, fontSize: "0.68rem", color: "var(--wine-2)", textAlign: "right" }}>{p.delta}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, background: "#F4E9D6", borderRadius: 9, padding: "11px 13px", fontFamily: MONO, fontSize: "0.68rem", color: "var(--wine-2)" }}>
        last reconcile 41s ago · 482 rows · 0 conflicts
      </div>
    </div>
  );
}

/* ── Visual 03: approval tree (Atlas) ────────────────────────────────────── */

const APPROVERS = [
  { role: "Finance", time: "6m" },
  { role: "Legal",   time: "11m" },
  { role: "Exec",    time: "23m" },
];

function ApprovalTree({ on }: { on: boolean }) {
  const t = TONE.dark;
  return (
    <div className="pj-panel" style={{ background: t.panelBg, border: t.panelBorder, borderRadius: 20, padding: "26px 22px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ background: "var(--cream)", borderRadius: 12, padding: "13px 22px", textAlign: "center", minWidth: 200 }}>
          <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "0.98rem", letterSpacing: "-0.02em", color: "var(--wine)" }}>CAPEX request · ₹4.2L</div>
          <div style={{ fontFamily: MONO, fontSize: "0.58rem", letterSpacing: "0.05em", color: "var(--muted)", marginTop: 5 }}>submitted 09:14</div>
        </div>

        <div style={{ width: 1, height: 18, background: "rgba(251,243,228,0.32)" }} />

        <div style={{ border: "1px dashed rgba(255,197,61,0.5)", borderRadius: 10, padding: "10px 18px", fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--butter)" }}>
          policy engine · 34 rules
        </div>

        <svg viewBox="0 0 600 44" preserveAspectRatio="none" style={{ width: "100%", height: 44, display: "block" }} aria-hidden="true">
          <path d="M300,0 V20 M100,20 H500 M100,20 V44 M300,20 V44 M500,20 V44" fill="none" stroke="rgba(251,243,228,0.32)" strokeWidth="2" />
        </svg>

        <div className="pj-approvers">
          {APPROVERS.map((a, i) => (
            <div
              key={a.role}
              style={{
                background: "rgba(251,243,228,0.1)",
                border: "1px solid rgba(251,243,228,0.18)",
                borderRadius: 12,
                padding: "13px 10px",
                textAlign: "center",
                opacity: on ? 1 : 0,
                transform: on ? "translateY(0)" : "translateY(10px)",
                transition: `opacity .5s ${0.2 + i * 0.12}s, transform .5s ${0.2 + i * 0.12}s`,
              }}
            >
              <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: "0.82rem", color: "var(--cream)" }}>{a.role}</div>
              <div style={{ fontFamily: MONO, fontSize: "0.66rem", color: "#8CE0B0", marginTop: 5 }}>✓ {a.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(251,243,228,0.14)", display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { label: "Before", width: "100%", color: "rgba(251,243,228,0.22)", value: "8 days" },
          { label: "After",  width: "9%",   color: "#8CE0B0",                value: "40 min" },
        ].map((b, i) => (
          <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ flex: "0 0 52px", fontFamily: MONO, fontSize: "0.62rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(251,243,228,0.55)" }}>{b.label}</span>
            <span style={{ flex: 1, height: 10, borderRadius: 100, background: "rgba(251,243,228,0.1)", overflow: "hidden", display: "block" }}>
              <i style={{ display: "block", height: "100%", borderRadius: 100, background: b.color, width: on ? b.width : "0%", transition: `width .9s cubic-bezier(.16,1,.3,1) ${0.3 + i * 0.15}s` }} />
            </span>
            <span style={{ flex: "0 0 58px", fontFamily: MONO, fontSize: "0.68rem", color: "var(--cream)", textAlign: "right" }}>{b.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Case data ───────────────────────────────────────────────────────────── */

const NORTHWIND: CaseData = {
  n: "01",
  id: "case-northwind",
  industry: "Logistics",
  client: "Northwind",
  title: "A dispatch desk that stopped needing a desk.",
  summary: "Northwind's routing team was both a bottleneck and a single point of failure. We modelled their rules, built an engine around them, and put people back on exceptions only.",
  problem: "Six full-time dispatchers hand-assigned 2,000+ daily orders across a fleet of 150 drivers. The rule set took months to learn, and surge days turned straight into backlogs and missed SLAs.",
  solution: "A self-balancing routing engine ingests the live order stream, scores each drop against vehicle telemetry, and pushes assignments to the driver app. Operators now only see what the rules genuinely can't resolve.",
  metric: "−71%",
  metricLabel: "manual routing hours — while order volume grew 2.5× over the same period.",
  tech: ["Node.js", "Redis", "PostgreSQL", "React Native", "WebSockets"],
};

const VERTEX: CaseData = {
  n: "02",
  id: "case-vertex",
  industry: "Manufacturing",
  client: "Vertex",
  title: "Four plants, three ERPs, one number.",
  summary: "Real-time stock reconciliation across every Vertex site, so the month-end variance scramble simply stopped happening.",
  problem: "Stock counts across four sites were reconciled by hand at month-end. Discrepancies halted production lines, triggered emergency air freight, and made the financial reporting hard to trust.",
  solution: "An event-driven middleware layer subscribes to floor scans and legacy ERP updates, normalises them onto one data contract, and broadcasts live state to a single command view.",
  metric: "99.4%",
  metricLabel: "inventory accuracy across all four facilities, with zero month-end downtime since launch.",
  tech: ["Go", "Kafka", "GraphQL", "Next.js"],
};

const ATLAS: CaseData = {
  n: "03",
  id: "case-atlas",
  industry: "Finance",
  client: "Atlas",
  title: "Approvals that route, escalate and audit themselves.",
  summary: "Capital requests used to disappear into email threads. Now they move through a policy engine that knows the rules better than the org chart does.",
  problem: "Capex requests were trapped in email chains and a generic SaaS workflow that couldn't express Atlas's layered, jurisdiction-specific compliance rules.",
  solution: "A custom rules engine evaluates every submission against live financial policy, then pings exactly the right approver in Slack — with the full decision trail written down as it goes.",
  metric: "40m",
  metricLabel: "average approval cycle, down from an eight-day average — with a complete audit trail per request.",
  tech: ["Python", "Temporal", "Slack API", "React"],
};

/* ── Also shipped ────────────────────────────────────────────────────────── */

const ALSO = [
  {
    tag: "Retail",
    client: "Helios",
    title: "Ops command centre",
    body: "Nine in-store systems — stock, staffing, footfall, POS — folded into one live operational view that store managers actually open in the morning.",
    metric: "9 tools → 1",
    bg: "var(--butter)",
    fg: "var(--wine)",
    sub: "rgba(59,10,34,0.72)",
    pill: "rgba(59,10,34,0.12)",
  },
  {
    tag: "Healthcare",
    client: "Meridian",
    title: "Intake digitisation",
    body: "Paper intake forms replaced with a validated workflow that writes straight into the records system, catching bad data at the point of entry instead of three weeks later.",
    metric: "−92% errors",
    bg: "var(--peri)",
    fg: "var(--cream)",
    sub: "rgba(251,243,228,0.82)",
    pill: "rgba(255,255,255,0.16)",
  },
];

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function ProjectsPage() {
  const { openModal } = useModal();

  const c1 = useReveal(0.12);
  const c2 = useReveal(0.12);
  const c3 = useReveal(0.12);
  const alsoReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <div>
      {/* ── Hero ── */}
      <ThemeHeroSection background="var(--wine)" className="rounded-b-[48px] z-[2]">
        <div className="grid w-full gap-10 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:items-center" style={{ position: "relative", zIndex: 1 }}>
          <div>
            <div className="hero-anim-2">
              <Eyebrow color="var(--butter)">Projects // case studies</Eyebrow>
            </div>
            <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2.4rem,5.6vw,4.6rem)", lineHeight: 0.95, letterSpacing: "-0.045em", color: "var(--cream)", maxWidth: "14ch", margin: "0 0 22px" }}>
              Systems quietly <span style={{ color: "var(--accent)" }}>doing the work</span> right now.
            </h1>
            <p className="hero-anim-4" style={{ color: "rgba(251,243,228,0.8)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "48ch", marginBottom: 30, lineHeight: 1.7 }}>
              We don&apos;t string APIs together and call it a platform. We architect the engine that removes a bottleneck — then leave it running. Here&apos;s what that looks like in production.
            </p>
            <div className="hero-anim-4 flex flex-wrap gap-3">
              <BtnPrimary href="/onboard">
                Start a project
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 15, height: 15 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </BtnPrimary>
              <BtnGhost onClick={openModal} invert>Book a call</BtnGhost>
            </div>
          </div>

          <div className="hero-anim-5">
            <ProductionLedger />
          </div>
        </div>
      </ThemeHeroSection>

      {/* ── Clients ── */}
      <ClientsBand />

      {/* ── Index + stats ── */}
      <section className="relative z-10 pt-[96px] pb-14 md:pt-[120px] md:pb-20 lg:pb-24" style={{ overflow: "hidden", background: "var(--bg)", borderRadius: "48px 48px 0 0", marginTop: -48 }}>
        <div style={{ position: "absolute", width: 300, height: 300, right: -110, top: 40, background: "var(--butter)", borderRadius: "50%", opacity: 0.22, filter: "blur(1px)", zIndex: 0, pointerEvents: "none" }} />
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 620, marginBottom: 42 }}>
            <Eyebrow>The index</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2rem,4.4vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--text)" }}>
              Five systems,{" "}
              <span style={{ background: "linear-gradient(120deg,var(--text) 30%,var(--accent) 130%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>still running.</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.9rem,1.3vw,1rem)", marginTop: 16, lineHeight: 1.7, maxWidth: "56ch" }}>
              Every one of these replaced a manual process that a team had quietly accepted as the cost of doing business.
            </p>
          </div>

          <IndexList />
          <StatsStrip />
        </div>
      </section>

      {/* ── Case 01 — Northwind (basil) ── */}
      <section id={NORTHWIND.id} className="relative z-10 py-14 md:py-20 lg:py-24" style={{ background: "var(--basil)", borderRadius: 48, scrollMarginTop: 96 }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={c1.ref} style={{ opacity: c1.on ? 1 : 0, transform: c1.on ? "translateY(0)" : "translateY(22px)", transition: "opacity .7s, transform .7s" }}>
            <div className="grid gap-10 md:gap-14 md:grid-cols-2 md:items-center">
              <CaseIntro c={NORTHWIND} tone="dark" />
              <RoutingFlow on={c1.on} />
            </div>
            <CaseArc c={NORTHWIND} tone="dark" />
            <CaseFoot c={NORTHWIND} tone="dark" />
          </div>
        </div>
      </section>

      {/* ── Case 02 — Vertex (cream breather) ── */}
      <section id={VERTEX.id} className="relative z-10 py-14 md:py-20 lg:py-24" style={{ overflow: "hidden", scrollMarginTop: 96 }}>
        <div style={{ position: "absolute", width: 260, height: 260, left: "6%", bottom: -60, background: "var(--peri)", borderRadius: "50%", opacity: 0.22, zIndex: 0, pointerEvents: "none" }} />
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ position: "relative", zIndex: 1 }}>
          <div ref={c2.ref} style={{ opacity: c2.on ? 1 : 0, transform: c2.on ? "translateY(0)" : "translateY(22px)", transition: "opacity .7s, transform .7s" }}>
            <div className="grid gap-10 md:gap-14 md:grid-cols-2 md:items-center">
              <div className="order-2 md:order-1">
                <SyncMatrix on={c2.on} />
              </div>
              <div className="order-1 md:order-2">
                <CaseIntro c={VERTEX} tone="light" />
              </div>
            </div>
            <CaseArc c={VERTEX} tone="light" />
            <CaseFoot c={VERTEX} tone="light" />
          </div>
        </div>
      </section>

      {/* ── Case 03 — Atlas (wine) ── */}
      <section id={ATLAS.id} className="relative z-10 py-14 md:py-20 lg:py-24" style={{ background: "var(--wine)", borderRadius: 48, scrollMarginTop: 96 }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={c3.ref} style={{ opacity: c3.on ? 1 : 0, transform: c3.on ? "translateY(0)" : "translateY(22px)", transition: "opacity .7s, transform .7s" }}>
            <div className="grid gap-10 md:gap-14 md:grid-cols-2 md:items-center">
              <CaseIntro c={ATLAS} tone="dark" />
              <ApprovalTree on={c3.on} />
            </div>
            <CaseArc c={ATLAS} tone="dark" />
            <CaseFoot c={ATLAS} tone="dark" />
          </div>
        </div>
      </section>

      {/* ── Also shipped ── */}
      <section id="also-shipped" className="relative z-10 py-14 md:py-20 lg:py-24" style={{ scrollMarginTop: 96 }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ maxWidth: 560, marginBottom: 42 }}>
            <Eyebrow>Also shipped</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(1.9rem,4vw,3.4rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--text)" }}>Two more, in short.</h2>
          </div>
          <div ref={alsoReveal.ref} className="grid gap-5 md:grid-cols-2">
            {ALSO.map((a, i) => (
              <article
                key={a.client}
                style={{
                  background: a.bg,
                  borderRadius: 24,
                  padding: "30px 28px 32px",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 260,
                  opacity: alsoReveal.on ? 1 : 0,
                  transform: alsoReveal.on ? "translateY(0)" : "translateY(18px)",
                  transition: `opacity .6s ${i * 0.1}s, transform .6s ${i * 0.1}s`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: MONO, fontSize: "0.62rem", letterSpacing: "1px", textTransform: "uppercase", color: a.sub }}>
                  <span>{a.tag}</span>
                  <span aria-hidden="true">/</span>
                  <span>{a.client}</span>
                </div>
                <h3 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-0.03em", color: a.fg, margin: "16px 0 12px" }}>{a.title}</h3>
                <p style={{ color: a.sub, fontSize: "0.9rem", lineHeight: 1.65, flex: 1 }}>{a.body}</p>
                <span style={{ alignSelf: "flex-start", marginTop: 22, background: a.pill, color: a.fg, borderRadius: 100, padding: "8px 16px", fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.04em" }}>{a.metric}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div ref={ctaReveal.ref} style={{ position: "relative", textAlign: "center", background: "var(--ember)", overflow: "hidden", borderRadius: "48px 48px 0 0", opacity: ctaReveal.on ? 1 : 0, transform: ctaReveal.on ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ padding: "clamp(56px,9vw,96px) 0" }}>
          <Eyebrow color="var(--butter)">Get started</Eyebrow>
          <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--cream)", maxWidth: "22ch", margin: "0 auto 16px" }}>
            Your operation could be the next entry on this page.
          </h2>
          <p style={{ color: "rgba(251,243,228,0.82)", fontSize: "clamp(0.9rem,1.3vw,1rem)", maxWidth: "50ch", margin: "0 auto 28px", lineHeight: 1.7 }}>
            Tell us which process is eating the most hours. We&apos;ll map it, scope it, and show you what the automated version looks like — usually within a week.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <BtnPrimary href="/onboard" invert>Onboard a project</BtnPrimary>
            <BtnGhost onClick={openModal} invert>Book a call</BtnGhost>
          </div>
        </div>
      </div>

      <style>{`
        /* logo marquee */
        @keyframes pjMarquee { to { transform: translateX(-50%); } }
        .pj-marquee { animation: pjMarquee 40s linear infinite; }

        /* hero ledger */
        .pj-ledger-row { display:grid; grid-template-columns: minmax(0,1.5fr) 0.6fr 0.9fr; gap:10px; align-items:center; }

        /* index rows */
        .pj-index-row{
          display:grid;
          grid-template-columns: 34px 118px minmax(0,1fr) 110px 130px 22px;
          align-items:center;
          gap:14px;
          padding:18px 6px;
          text-decoration:none;
          transition: background .25s ease, padding-left .25s ease;
        }
        .pj-index-row:hover{ background: rgba(59,10,34,0.04); padding-left:14px; }
        .pj-index-arrow{
          font-family: var(--font-mono); font-size:.85rem; color: var(--accent);
          opacity:0; transform: translateX(-6px);
          transition: opacity .25s ease, transform .25s ease;
        }
        .pj-index-row:hover .pj-index-arrow{ opacity:1; transform: translateX(0); }
        @media (max-width: 900px){
          .pj-index-row{ grid-template-columns: 30px minmax(0,1fr) auto; grid-template-areas: "n t m" "n c m"; row-gap:2px; }
          .pj-index-row > :nth-child(1){ grid-area:n; }
          .pj-index-row > :nth-child(2){ grid-area:c; }
          .pj-index-row > :nth-child(3){ grid-area:t; }
          .pj-index-row > :nth-child(4){ display:none; }
          .pj-index-row > :nth-child(5){ grid-area:m; text-align:right; }
          .pj-index-row > :nth-child(6){ display:none; }
        }

        /* stats strip */
        .pj-stats{ display:grid; grid-template-columns:1fr 1fr; }
        .pj-stats > div{ padding:26px 22px; }
        .pj-stats > div:nth-child(odd){ border-right:1px solid var(--border); }
        .pj-stats > div:nth-child(-n+2){ border-bottom:1px solid var(--border); }
        @media (min-width:1024px){
          .pj-stats{ grid-template-columns:repeat(4,1fr); }
          .pj-stats > div{ border-right:1px solid var(--border); border-bottom:none; }
          .pj-stats > div:last-child{ border-right:none; }
        }

        /* routing flow */
        .pj-flow-dot{
          position:absolute; top:-3px; left:0; width:6px; height:6px; border-radius:50%;
          background: var(--butter); box-shadow: 0 0 8px var(--butter);
          animation: pjFlowTravel 3.2s ease-in-out infinite;
        }
        @keyframes pjFlowTravel{
          0%{ left:0%; opacity:0; }
          8%{ opacity:1; }
          92%{ opacity:1; }
          100%{ left:100%; opacity:0; }
        }

        /* sync matrix */
        .pj-matrix{
          display:grid;
          grid-template-columns: minmax(64px,1fr) repeat(3, minmax(34px,0.7fr)) 58px;
          gap:8px;
          align-items:center;
        }
        .pj-pulse{ animation: pjPulse 2s ease-in-out infinite; }
        @keyframes pjPulse{ 0%,100%{ opacity:1; } 50%{ opacity:.35; } }
        .pj-spin{ animation: pjSpin .9s linear infinite; }
        @keyframes pjSpin{ to{ transform: rotate(360deg); } }

        /* approval tree */
        .pj-approvers{ display:grid; grid-template-columns:repeat(3,1fr); gap:12px; width:100%; }

        @media (max-width:480px){
          .pj-flow-track{ display:none; }
          .pj-panel{ padding:20px 14px !important; }
          .pj-approvers{ grid-template-columns:1fr; }
        }

        @media (prefers-reduced-motion: reduce){
          .pj-marquee, .pj-flow-dot, .pj-pulse, .pj-spin{ animation:none !important; }
          .pj-flow-dot{ opacity:0 !important; }
        }
      `}</style>
    </div>
  );
}
