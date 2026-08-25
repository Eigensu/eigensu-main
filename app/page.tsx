"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useModal } from "./components/PageShell";
import { ThemeHeroSection } from "./components/ThemeHero";

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

function useReveal(threshold = 0.1) {
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

/* ── Ops Console ─────────────────────────────────────────────────────────── */

function OpsConsole() {
  const [tick, setTick] = useState(true);
  useEffect(() => { const id = setInterval(() => setTick(t => !t), 850); return () => clearInterval(id); }, []);
  const BARS = [42, 61, 38, 78, 55, 90, 47, 68, 83, 59, 72, 95];
  return (
    <div style={{ background: "var(--wine)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 14, overflow: "hidden", boxShadow: "24px 30px 60px rgba(59,10,34,0.28)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 10px 15px" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["#FF7661","var(--butter)","#65C58A"].map(c => <i key={c} style={{ width: 9, height: 9, borderRadius: "50%", display: "block", background: c }} />)}
        </div>
        <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "0.08em", color: "rgba(251,243,228,0.55)" }}>ops_console — live</span>
      </div>
      <div style={{ background: "#260616", borderRadius: 18, padding: 18 }}>
        {[
          { label: "invoice_sync",     tag: "active",  tc: "#72D69A", tb: "rgba(101,197,138,0.13)" },
          { label: "inventory_recon",  tag: "running", tc: "#FF8064", tb: "rgba(240,73,31,0.15)" },
          { label: "approval_routing", tag: "queued",  tc: "var(--butter)", tb: "rgba(255,197,61,0.14)" },
        ].map(row => (
          <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 14px", border: "1px solid rgba(251,243,228,0.1)", borderRadius: 10, marginBottom: 9, background: "rgba(251,243,228,0.045)" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.75rem", color: "rgba(251,243,228,0.72)" }}>{row.label}</span>
            <span style={{ fontFamily: MONO, fontSize: "0.62rem", letterSpacing: "0.05em", padding: "5px 8px", borderRadius: 999, textTransform: "uppercase", color: row.tc, background: row.tb }}>{row.tag}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 95, padding: "15px 12px", border: "1px solid rgba(251,243,228,0.1)", borderRadius: 10, marginTop: 14 }}>
          {BARS.map((h, i) => <div key={i} style={{ flex: 1, background: "var(--ember)", opacity: 0.9, borderRadius: "3px 3px 0 0", height: `${h}%` }} />)}
        </div>
        <div style={{ marginTop: 10, background: "#12030a", borderRadius: 9, padding: "12px 13px", fontFamily: MONO, fontSize: "0.68rem", color: "rgba(251,243,228,0.62)" }}>
          <b style={{ color: "#72D69A" }}>eigensu ▸</b>
          {" deploy --pipeline ops.core"}
          <span style={{ display: "inline-block", width: 6, height: 12, background: "var(--ember)", marginLeft: 4, verticalAlign: "-2px", opacity: tick ? 0.9 : 0, transition: "opacity .1s" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Clients ─────────────────────────────────────────────────────────────── */

const LOGO_FILTER = "brightness(0) saturate(100%) invert(96%) sepia(9%) saturate(638%) hue-rotate(315deg) brightness(103%) contrast(96%)";

const CLIENTS_ROW_1 = [
  { src: "/clientlogos/binge.png", alt: "Binge Consulting", h: "clamp(2.4rem,6vw,3.4rem)" },
  { src: "/clientlogos/soraia.png", alt: "Soraia", h: "clamp(3.4rem,8vw,4.9rem)" },
  { src: "/clientlogos/scarletthouse.png", alt: "Scarlett House", h: "clamp(3.9rem,9vw,5.5rem)" },
  { src: "/clientlogos/Sweeney.png", alt: "Sweeney", h: "clamp(3.4rem,8vw,4.9rem)" },
  { src: "/clientlogos/icici.svg", alt: "ICICI Bank", h: "clamp(2.6rem,6.5vw,3.6rem)" },
];
const CLIENTS_ROW_2 = [
  { src: "/clientlogos/sacredwalks.png", alt: "The Sacred Walks", h: "clamp(3.4rem,8vw,4.9rem)" },
  { src: "/clientlogos/lafete.png", alt: "La fête", h: "clamp(2.4rem,6vw,3.4rem)" },
  { src: "/clientlogos/walle.png", alt: "Wall-E Arena", h: "clamp(3.4rem,8vw,4.9rem)" },
  { src: "/clientlogos/fielia.png", alt: "Fielia", h: "clamp(3.4rem,8vw,4.9rem)" },
  { src: "/clientlogos/reservego.png", alt: "ReserveGo", h: "clamp(2.2rem,5.5vw,3rem)" },
];

function LogoLoopRow({ logos, direction, duration, siya = false }: { logos: typeof CLIENTS_ROW_1; direction: "left" | "right"; duration: number; siya?: boolean }) {
  const items = [...logos, ...logos];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 48,
          width: "max-content",
          animation: `${direction === "left" ? "logoLoopLeft" : "logoLoopRight"} ${duration}s linear infinite`,
        }}
      >
        {/* eslint-disable @next/next/no-img-element */}
        {items.map((l, i) => (
          <img key={`${l.alt}-${i}`} src={l.src} alt={i < logos.length ? l.alt : ""} aria-hidden={i >= logos.length} style={{ height: l.h, width: "auto", flexShrink: 0, filter: LOGO_FILTER }} />
        ))}
        {/* eslint-enable @next/next/no-img-element */}
        {siya && (
          <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.3rem,4vw,1.9rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--cream)", textAlign: "center", whiteSpace: "nowrap", flexShrink: 0 }}>SIYA MANUFACTURING</span>
        )}
      </div>
    </div>
  );
}

function ClientsBand() {
  return (
    <div style={{ padding: "56px 0", textAlign: "center", background: "var(--ember)", borderRadius: 48, position: "relative", zIndex: 1, overflow: "hidden" }}>
      <p style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", color: "var(--cream)", background: "var(--wine)", border: "1px solid rgba(59,10,34,0.2)", padding: "9px 16px", borderRadius: 100, margin: "0 auto 44px" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cream)", flexShrink: 0 }} />
        Teams of all sizes trust Eigensu to run the systems behind their operation.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        <LogoLoopRow logos={CLIENTS_ROW_1} direction="left" duration={30} siya />
        <LogoLoopRow logos={CLIENTS_ROW_2} direction="right" duration={34} />
      </div>
    </div>
  );
}

/* ── Services Teaser ─────────────────────────────────────────────────────── */

const SERVICES = [
  { idx: "01", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 20, height: 20, stroke: "var(--accent)" }}><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg>, title: "Operations Automation", body: "Replace spreadsheets and manual workflows with pipelines that trigger, route and reconcile on their own." },
  { idx: "02", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 20, height: 20, stroke: "var(--accent)" }}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>, title: "Internal Tooling", body: "Custom dashboards, admin panels and internal apps that fit your process instead of forcing you into a template." },
  { idx: "03", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 20, height: 20, stroke: "var(--accent)" }}><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M6 9v6a3 3 0 0 0 3 3h6"/></svg>, title: "Systems Integration", body: "Connect the tools you already pay for so data flows once, cleanly, without a human in the middle." },
];

const BUTTER_LIGHT = "#FFE9AD";

function ServiceCard({ s }: { s: typeof SERVICES[0] }) {
  const { ref, on } = useReveal();
  const isPeri = s.idx === "03";
  return (
    <article ref={ref} style={{ background: isPeri ? "var(--peri)" : "var(--basil)", border: isPeri ? "1px solid var(--peri)" : "1px solid var(--basil)", borderRadius: 14, padding: "26px 24px", position: "relative", opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(20px)", transition: "opacity .6s, transform .6s" }}>
      <span style={{ position: "absolute", top: 20, right: 22, fontFamily: MONO, fontSize: "0.7rem", color: isPeri ? "rgba(59,10,34,0.45)" : "rgba(255,233,173,0.45)" }}>{s.idx}</span>
      <div style={{ width: 42, height: 42, borderRadius: 10, display: "grid", placeItems: "center", border: isPeri ? "1px solid var(--wine)" : `1px solid ${BUTTER_LIGHT}`, background: isPeri ? "var(--wine)" : BUTTER_LIGHT, marginBottom: 18 }}>
        {s.icon}
      </div>
      <h3 style={{ fontFamily: HEAD, fontSize: "1.1rem", fontWeight: 700, marginBottom: 10, color: isPeri ? "var(--wine)" : BUTTER_LIGHT }}>{s.title}</h3>
      <p style={{ color: isPeri ? "rgba(59,10,34,0.78)" : "rgba(255,233,173,0.8)", fontSize: "0.9rem", lineHeight: 1.65 }}>{s.body}</p>
      <Link href="/services" style={{ fontFamily: MONO, fontSize: "0.74rem", letterSpacing: "0.5px", color: isPeri ? "var(--wine)" : BUTTER_LIGHT, marginTop: 16, display: "inline-flex", gap: 6, alignItems: "center" }}>Explore →</Link>
    </article>
  );
}

/* ── Stats strip ─────────────────────────────────────────────────────────── */

const STATS = [
  { num: "12", unit: "+",  lbl: "Projects delivered" },
  { num: "100", unit: "%", lbl: "Client retention" },
  { num: "3",   unit: "×", lbl: "Avg. process speed-up" },
  { num: "04",  unit: "yr",lbl: "Track record" },
];

function StatsStrip() {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} style={{ border: "1px solid var(--border)", borderRadius: 14, background: "linear-gradient(180deg,var(--bg-elev-2),var(--bg-elev))", overflow: "hidden", opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
      <div className="g-stats">
        {STATS.map((s, i) => (
          <div key={s.lbl} style={{ padding: "clamp(24px,4vw,40px) clamp(18px,3vw,28px)", borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
            <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", letterSpacing: "-0.03em", color: "var(--text)" }}>
              {s.num}<span style={{ color: "var(--accent)" }}>{s.unit}</span>
            </div>
            <div style={{ fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 6 }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Carousel ────────────────────────────────────────────────────────────── */

const SLIDES = [
  { tag: "Logistics",    title: "Dispatch automation",      body: "Replaced a 6-person routing desk with a self-balancing engine handling 2,000+ orders/day.", client: "NORTHWIND", outcome: "−71% manual hrs" },
  { tag: "Manufacturing",title: "Inventory reconciliation", body: "Real-time stock sync across 4 plants and 3 ERPs, killing the monthly variance scramble.", client: "VERTEX",    outcome: "99.4% accuracy" },
  { tag: "Finance",      title: "Approval routing",         body: "Policy-aware flows that route, escalate and audit themselves — cycle cut from days to 40min.", client: "ATLAS",     outcome: "8h → 40m" },
  { tag: "Retail",       title: "Ops command centre",       body: "One console unifying 9 in-store systems into a single live operational view.", client: "HELIOS",    outcome: "9 tools → 1" },
  { tag: "Healthcare",   title: "Intake digitisation",      body: "Paper intake replaced with a validated workflow feeding straight into the records system.", client: "MERIDIAN",  outcome: "−92% errors" },
];

function Carousel({ dark = false }: { dark?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const { ref, on } = useReveal(0.08);

  const slideWidth = () => (trackRef.current?.children[0] as HTMLElement)?.offsetWidth + 20 || 360;
  const goTo = (i: number) => trackRef.current?.scrollTo({ left: i * slideWidth(), behavior: "smooth" });
  const onScroll = () => setActiveIdx(Math.round((trackRef.current?.scrollLeft || 0) / slideWidth()));

  return (
    <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
      <div ref={trackRef} onScroll={onScroll} style={{ display: "flex", gap: 16, overflowX: "auto", scrollSnapType: "x mandatory", padding: "4px 2px 16px", scrollbarWidth: "none" }}>
        {SLIDES.map(slide => (
          <article key={slide.client} style={{ scrollSnapAlign: "start", flex: "0 0 clamp(280px, 30%, 360px)", background: dark ? "rgba(251,243,228,0.06)" : "var(--bg-elev)", border: dark ? "1px solid rgba(251,243,228,0.14)" : "1px solid var(--border)", borderRadius: 14, padding: "24px 22px" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "1px", textTransform: "uppercase", color: dark ? "var(--butter)" : "var(--accent-4)", padding: "3px 9px", border: dark ? "1px solid rgba(255,197,61,0.35)" : "1px solid rgba(167,139,250,0.3)", borderRadius: 100, display: "inline-block" }}>{slide.tag}</span>
            <h4 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.1rem", margin: "16px 0 10px", color: dark ? "var(--cream)" : "var(--text)" }}>{slide.title}</h4>
            <p style={{ color: dark ? "rgba(251,243,228,0.68)" : "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.65 }}>{slide.body}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTop: dark ? "1px solid rgba(251,243,228,0.14)" : "1px solid var(--border)", fontFamily: MONO, fontSize: "0.72rem" }}>
              <span style={{ color: dark ? "rgba(251,243,228,0.5)" : "var(--text-dim)" }}>{slide.client}</span>
              <span style={{ color: dark ? "#72D69A" : "var(--ok)" }}>{slide.outcome}</span>
            </div>
          </article>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
        <div style={{ display: "flex", gap: 7 }}>
          {SLIDES.map((_, i) => <button key={i} onClick={() => goTo(i)} style={{ width: i === activeIdx ? 22 : 7, height: 7, borderRadius: 4, background: i === activeIdx ? "var(--accent)" : dark ? "rgba(251,243,228,0.3)" : "var(--border-strong)", border: "none", cursor: "pointer", transition: "all .25s", padding: 0 }} />)}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[{ l: "←", d: -1 }, { l: "→", d: 1 }].map(({ l, d }) => (
            <button key={l} onClick={() => goTo(activeIdx + d)} style={{ width: 40, height: 40, borderRadius: "50%", border: dark ? "1px solid rgba(251,243,228,0.3)" : "1px solid var(--border-strong)", display: "grid", placeItems: "center", background: "none", color: dark ? "var(--cream)" : "var(--text)", cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Insights ────────────────────────────────────────────────────────────── */

const INSIGHTS = [
  { tag: "Operations",  time: "6 min", title: "Why spreadsheets fail at scale", body: "The hidden cost of manual reconciliation and the tipping point where automation pays for itself." },
  { tag: "Product",     time: "4 min", title: "Designing tools operators actually want", body: "Consumer-grade UX principles applied to internal dashboards, and why it matters for adoption." },
  { tag: "Engineering", time: "8 min", title: "Declarative workflows over drag-and-drop", body: "Why versioned, code-first automation beats black-box builders for anything mission-critical." },
];

/* ── CTA block ───────────────────────────────────────────────────────────── */

function CtaBlock({ heading, sub, primary, primaryHref, ghost, ghostFn }: { heading: string; sub: string; primary: string; primaryHref: string; ghost: string; ghostFn?: () => void }) {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} style={{ position: "relative", textAlign: "center", background: "var(--ember)", overflow: "hidden", borderRadius: "48px 48px 0 0", opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ padding: "clamp(56px,9vw,96px) 0" }}>
        <Eyebrow color="var(--butter)">Get started</Eyebrow>
        <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--cream)", maxWidth: "22ch", margin: "0 auto 16px" }}>{heading}</h2>
        <p style={{ color: "rgba(251,243,228,0.82)", fontSize: "clamp(0.9rem,1.3vw,1rem)", maxWidth: "50ch", margin: "0 auto 28px", lineHeight: 1.7 }}>{sub}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <BtnPrimary href={primaryHref} invert>{primary}</BtnPrimary>
          <BtnGhost onClick={ghostFn} href={ghostFn ? undefined : "/contact"} invert>{ghost}</BtnGhost>
        </div>
      </div>
    </div>
  );
}

/* ── FAQ ─────────────────────────────────────────────────────────────────── */

const FAQ_ITEMS = [
  { q: "What does an engagement actually look like?", a: "We start with a scoping call to map your workflow, then send a fixed-scope proposal within a week. Once approved, we build in short, visible sprints — you see working software early and often, not a black box that appears at the end." },
  { q: "How long does a typical project take?", a: "Most internal tools and automations ship in 3–8 weeks depending on scope. We'll give you a concrete timeline during scoping — not a range that quietly slips." },
  { q: "Do you work with our existing stack?", a: "Yes. Systems integration is one of our core disciplines — we connect to whatever ERPs, databases, SaaS tools or internal APIs you already run, rather than asking you to replace them." },
  { q: "What happens after launch?", a: "Every build includes a handover period plus ongoing support options. We stay reachable for fixes, tweaks and scaling questions — we're not a vendor that disappears after go-live." },
  { q: "How is pricing structured?", a: "Fixed-scope pricing agreed upfront after the scoping call, so there are no surprise invoices. For ongoing integration work we also offer retainer arrangements." },
];

function Faq() {
  const [open, setOpen] = useState(0);
  const { ref, on } = useReveal();
  return (
    <section className="relative z-10 py-14 md:py-20 lg:py-24" style={{ background: "var(--basil)" }}>
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <div style={{ maxWidth: 560, marginBottom: 34 }}>
          <Eyebrow color="var(--butter)">Questions</Eyebrow>
          <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2rem,4.2vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--cream)" }}>Frequently asked.</h2>
        </div>
        <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} style={{ borderTop: i === 0 ? "1px solid rgba(251,243,228,0.18)" : "none", borderBottom: "1px solid rgba(251,243,228,0.18)" }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, background: "none", border: 0, textAlign: "left", padding: "22px 2px", cursor: "pointer", color: "var(--cream)" }}
                >
                  <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.3, letterSpacing: "-0.02em", margin: 0 }}>{item.q}</h3>
                  <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(251,243,228,0.32)", display: "grid", placeItems: "center", background: isOpen ? "var(--butter)" : "transparent", color: isOpen ? "var(--wine)" : "var(--cream)", fontSize: "1.1rem", lineHeight: 1, transition: "all .25s ease" }}>{isOpen ? "−" : "+"}</span>
                </button>
                <div style={{ maxHeight: isOpen ? 220 : 0, overflow: "hidden", transition: "max-height .35s ease" }}>
                  <p style={{ margin: 0, padding: "0 2px 24px", maxWidth: "62ch", color: "rgba(251,243,228,0.7)", fontSize: "0.94rem", lineHeight: 1.7 }}>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  const { openModal } = useModal();

  return (
    <div>
      {/* ── Hero ── */}
      <ThemeHeroSection fullScreen contentClassName="pb-8">
        <div style={{ position: "absolute", width: 560, height: 560, right: -160, bottom: -220, background: "var(--butter)", borderRadius: "50%", opacity: 0.28, filter: "blur(2px)", zIndex: 0, pointerEvents: "none" }} />
        <div className="grid w-full gap-8 min-[900px]:grid-cols-[1.12fr_0.88fr] min-[900px]:items-center" style={{ position: "relative", zIndex: 1 }}>
          {/* Left */}
          <div style={{ marginLeft: "clamp(-8px,-1.6vw,-24px)" }}>
            <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2.6rem,7vw,6.4rem)", lineHeight: 0.92, letterSpacing: "-0.045em", color: "var(--text)", margin: "0 0 24px" }}>
              Internal systems that{" "}
              <span style={{ color: "var(--accent)" }}>run themselves</span>.
            </h1>
            <p className="hero-anim-4" style={{ color: "var(--text-muted)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "50ch", marginBottom: 32, lineHeight: 1.7 }}>
              Eigensu builds tailored software that streamlines internal management and optimises operations — so your teams stop fighting tools and start compounding output.
            </p>
            <div className="hero-anim-4 flex flex-wrap gap-3">
              <BtnPrimary href="/onboard">
                Start a Project
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 15, height: 15 }}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </BtnPrimary>
              <BtnGhost href="/projects">See our work</BtnGhost>
              <BtnGhost onClick={openModal}>Book a call</BtnGhost>
            </div>
          </div>
          {/* Right */}
          <div className="hero-anim-5">
            <OpsConsole />
          </div>
        </div>
      </ThemeHeroSection>

      {/* ── Clients ── */}
      <ClientsBand />

      {/* ── Services teaser ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24" style={{ overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 300, height: 300, left: -110, top: 40, background: "var(--butter)", borderRadius: "50%", opacity: 0.22, filter: "blur(1px)", zIndex: 0, pointerEvents: "none" }} />
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 580, marginBottom: 48 }}>
            <Eyebrow>What we do</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2.1rem,4.6vw,4.4rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--text)" }}>
              Built for the unglamorous parts{" "}
              <span style={{ background: "linear-gradient(120deg,var(--text) 30%,var(--accent) 130%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>that run the company.</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.9rem,1.3vw,1rem)", marginTop: 16, lineHeight: 1.7 }}>Three disciplines, one outcome: less manual work, fewer errors, faster decisions.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(s => <ServiceCard key={s.idx} s={s} />)}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative z-10 py-10 md:py-14">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <StatsStrip />
        </div>
      </section>

      {/* ── Carousel / Outcomes ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24" style={{ background: "var(--wine)", borderRadius: 48 }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <Eyebrow color="var(--butter)">Proof</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2rem,4.2vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--cream)" }}>Selected outcomes.</h2>
          </div>
          <Carousel dark />
        </div>
      </section>

      {/* ── Insights ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24" style={{ overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 240, height: 240, left: "8%", bottom: -50, background: "var(--peri)", borderRadius: "50%", opacity: 0.24, zIndex: 0, pointerEvents: "none" }} />
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <Eyebrow>Writing</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2rem,4.2vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--text)" }}>Insights &amp; updates.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INSIGHTS.map(post => (
              <article key={post.title} style={{ borderTop: "2px solid var(--wine)", paddingTop: 22, minHeight: 220, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--accent)" }}>
                  <span>{post.tag}</span>
                  <span>{post.time}</span>
                </div>
                <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.35rem", letterSpacing: "-0.02em", margin: "18px 0 10px", color: "var(--text)" }}>{post.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>{post.body}</p>
                <Link href="/blog" style={{ marginTop: "auto", paddingTop: 18, fontFamily: MONO, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 6 }}>Read article →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaBlock
        heading="Tell us what's slowing your operation down."
        sub="We'll map it, scope it, and show you what automating it looks like — usually within a week."
        primary="Onboard a project"
        primaryHref="/onboard"
        ghost="Book a call"
        ghostFn={openModal}
      />

      {/* ── FAQ ── */}
      <Faq />

      <style>{`
        @keyframes logoLoopLeft  { to { transform: translateX(-50%); } }
        @keyframes logoLoopRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @media (min-width: 1024px) {
          .g-stats > div:nth-child(odd) { border-right: 1px solid var(--border) !important; }
          .g-stats > div:nth-child(-n+2) { border-bottom: none !important; }
        }
      `}</style>
    </div>
  );
}
