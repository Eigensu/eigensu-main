"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useModal } from "./components/PageShell";
import { ThemeHeroSection } from "./components/ThemeHero";
import { Workflow, LayoutDashboard, Network } from "lucide-react";
import { POSTS } from "./pages/Blog";

const MONO = "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Sora', sans-serif";
const BODY = "var(--font-body), 'Hanken Grotesk', sans-serif";

/* ── Eyebrow ─────────────────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase" as const, color: "var(--accent)", marginBottom: 18 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)", flexShrink: 0 }} />
      {children}
    </div>
  );
}

/* ── Buttons ─────────────────────────────────────────────────────────────── */

function BtnPrimary({ href, onClick, children }: { href?: string; onClick?: () => void; children: React.ReactNode }) {
  const s = { display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.95rem", padding: "12px 24px", borderRadius: 100, background: "var(--accent)", color: "var(--on-accent)", boxShadow: "0 0 0 1px var(--accent-line), 0 8px 28px -8px var(--accent)", textDecoration: "none", whiteSpace: "nowrap" as const };
  const className = "transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]";
  if (href) return <Link href={href} style={s} className={className}>{children}</Link>;
  return <button type="button" onClick={onClick} style={s} className={className}>{children}</button>;
}

function BtnGhost({ href, onClick, children }: { href?: string; onClick?: () => void; children: React.ReactNode }) {
  const s = { display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.95rem", padding: "12px 24px", borderRadius: 100, color: "var(--text)", border: "1px solid var(--border-strong)", textDecoration: "none", whiteSpace: "nowrap" as const };
  const className = "transition-all duration-300 hover:bg-[var(--panel)] hover:border-[var(--accent-line)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]";
  if (href) return <Link href={href} style={s} className={className}>{children}</Link>;
  return <button type="button" onClick={onClick} style={s} className={className}>{children}</button>;
}

function BtnTertiary({ href, onClick, children }: { href?: string; onClick?: () => void; children: React.ReactNode }) {
  const s = { display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.95rem", padding: "12px 24px", borderRadius: 100, color: "var(--text-muted)", border: "1px solid transparent", textDecoration: "none", whiteSpace: "nowrap" as const };
  const className = "transition-all duration-300 hover:text-[var(--text)] hover:bg-[var(--panel)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]";
  if (href) return <Link href={href} style={s} className={className}>{children}</Link>;
  return <button type="button" onClick={onClick} style={s} className={className}>{children}</button>;
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
    <div style={{ background: "linear-gradient(180deg,var(--bg-elev-2),var(--bg-elev))", border: "1px solid var(--border-strong)", borderRadius: 14, overflow: "hidden", boxShadow: "0 32px 64px -24px rgba(0,0,0,0.8)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", borderBottom: "1px solid var(--border)", background: "var(--panel)" }}>
        <div style={{ display: "flex", gap: 7 }}>
          {["var(--err)","var(--warn)","var(--ok)"].map(c => <i key={c} style={{ width: 11, height: 11, borderRadius: "50%", display: "block", background: c }} />)}
        </div>
        <span style={{ fontFamily: MONO, fontSize: "0.72rem", color: "var(--text-muted)" }}>ops_console — live</span>
      </div>
      <div style={{ padding: 18 }}>
        {[
          { label: "invoice_sync",     tag: "active",  tc: "var(--ok)", tb: "rgba(56,232,176,0.1)",  tbd: "rgba(56,232,176,0.25)" },
          { label: "inventory_recon",  tag: "running", tc: "var(--accent)", tb: "var(--accent-soft)", tbd: "var(--accent-line)" },
          { label: "approval_routing", tag: "queued",  tc: "var(--warn)", tb: "rgba(255,178,36,0.1)",  tbd: "rgba(255,178,36,0.25)" },
        ].map(row => (
          <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: 8, marginBottom: 8, background: "var(--panel)" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.76rem", color: "var(--text-muted)" }}>{row.label}</span>
            <span style={{ fontFamily: MONO, fontSize: "0.64rem", letterSpacing: "0.5px", padding: "3px 8px", borderRadius: 100, textTransform: "uppercase", color: row.tc, background: row.tb, border: `1px solid ${row.tbd}` }}>{row.tag}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 72, padding: "12px 12px 6px", border: "1px solid var(--border)", borderRadius: 8, marginTop: 4 }}>
          {BARS.map((h, i) => <div key={i} style={{ flex: 1, background: "linear-gradient(180deg,var(--accent),var(--accent-soft))", borderRadius: "3px 3px 0 0", height: `${h}%` }} />)}
        </div>
        <div style={{ fontFamily: MONO, fontSize: "0.74rem", color: "var(--text-muted)", marginTop: 10, padding: "9px 12px", borderRadius: 8, background: "#000", border: "1px solid var(--border)" }}>
          <span style={{ color: "var(--ok)" }}>eigensu ▸</span>
          {" deploy --pipeline ops.core"}
          <span style={{ display: "inline-block", width: 7, height: 13, background: "var(--accent)", marginLeft: 2, verticalAlign: "middle", opacity: tick ? 0.9 : 0, transition: "opacity .1s" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Ticker ──────────────────────────────────────────────────────────────── */

const TICKER_ITEMS = ["NORTHWIND LOGISTICS","VERTEX MANUFACTURING","HELIOS RETAIL","ATLAS FINANCE","MERIDIAN HEALTH","QUANTA LABS"];

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", overflow: "hidden", padding: "16px 0", background: "var(--bg-elev-2)", position: "relative", zIndex: 1, maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
      <div style={{ display: "flex", gap: 56, width: "max-content", animation: "tickerScroll 28s linear infinite" }}>
        {items.map((item, i) => (
          <span key={i} style={{ fontFamily: MONO, fontSize: "0.82rem", color: "var(--text-muted)", letterSpacing: "1px", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "var(--accent)", fontSize: "0.6rem" }}>◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Services Teaser ─────────────────────────────────────────────────────── */

const SERVICES = [
  { idx: "01", icon: <Workflow strokeWidth={1.8} style={{ width: 22, height: 22, color: "var(--accent)" }} />, title: "Operations Automation", body: "Replace spreadsheets and manual workflows with pipelines that trigger, route and reconcile on their own." },
  { idx: "02", icon: <LayoutDashboard strokeWidth={1.8} style={{ width: 22, height: 22, color: "var(--accent)" }} />, title: "Internal Tooling", body: "Custom dashboards, admin panels and internal apps that fit your process instead of forcing you into a template." },
  { idx: "03", icon: <Network strokeWidth={1.8} style={{ width: 22, height: 22, color: "var(--accent)" }} />, title: "Systems Integration", body: "Connect the tools you already pay for so data flows once, cleanly, without a human in the middle." },
];

function ServiceCard({ s }: { s: typeof SERVICES[0] }) {
  const { ref, on } = useReveal();
  return (
    <article ref={ref} style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 14, padding: "26px 24px", position: "relative", opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(20px)", transition: "opacity .6s, transform .6s" }}>
      <span style={{ position: "absolute", top: 20, right: 22, fontFamily: MONO, fontSize: "0.7rem", color: "var(--text-dim)" }}>{s.idx}</span>
      <div style={{ width: 42, height: 42, borderRadius: 10, display: "grid", placeItems: "center", border: "1px solid var(--border-strong)", background: "var(--panel)", marginBottom: 18 }}>
        {s.icon}
      </div>
      <h3 style={{ fontFamily: HEAD, fontSize: "1.1rem", fontWeight: 700, marginBottom: 10, color: "var(--text)" }}>{s.title}</h3>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>{s.body}</p>
      <Link href="/services" style={{ fontFamily: MONO, fontSize: "0.74rem", letterSpacing: "0.5px", color: "var(--accent)", marginTop: 16, display: "inline-flex", gap: 6, alignItems: "center" }}>Explore →</Link>
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
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.lbl} className={`p-6 md:p-8 border-[var(--border)] ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} ${i !== 3 ? "lg:border-r" : ""}`}>
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

function Carousel() {
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
          <article key={slide.client} style={{ scrollSnapAlign: "start", flex: "0 0 clamp(280px, 30%, 360px)", background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 14, padding: "24px 22px" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "1px", textTransform: "uppercase", color: "var(--accent-4)", padding: "3px 9px", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 100, display: "inline-block" }}>{slide.tag}</span>
            <h4 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.1rem", margin: "16px 0 10px", color: "var(--text)" }}>{slide.title}</h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.65 }}>{slide.body}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border)", fontFamily: MONO, fontSize: "0.72rem" }}>
              <span style={{ color: "var(--text-dim)" }}>{slide.client}</span>
              <span style={{ color: "var(--ok)" }}>{slide.outcome}</span>
            </div>
          </article>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
        <div style={{ display: "flex", gap: 7 }}>
          {SLIDES.map((_, i) => <button key={i} onClick={() => goTo(i)} style={{ width: i === activeIdx ? 22 : 7, height: 7, borderRadius: 4, background: i === activeIdx ? "var(--accent)" : "var(--border-strong)", border: "none", cursor: "pointer", transition: "all .25s", padding: 0 }} />)}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[{ l: "←", d: -1 }, { l: "→", d: 1 }].map(({ l, d }) => (
            <button key={l} onClick={() => goTo(activeIdx + d)} style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--border-strong)", display: "grid", placeItems: "center", background: "none", color: "var(--text)", cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── CTA block ───────────────────────────────────────────────────────────── */

function CtaBlock({ heading, sub, primary, primaryHref, ghost, ghostFn }: { heading: string; sub: string; primary: string; primaryHref: string; ghost: string; ghostFn?: () => void }) {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} style={{ position: "relative", textAlign: "center", border: "1px solid var(--border)", borderRadius: 20, padding: "clamp(48px,8vw,80px) clamp(24px,4vw,48px)", overflow: "hidden", background: "var(--bg-elev)", opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
      <div style={{ position: "absolute", width: 400, height: 280, background: "var(--accent)", filter: "blur(100px)", opacity: 0.18, top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Eyebrow>Get started</Eyebrow>
        <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--text)", maxWidth: "22ch", margin: "0 auto 16px" }}>{heading}</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.9rem,1.3vw,1rem)", maxWidth: "50ch", margin: "0 auto 28px", lineHeight: 1.7 }}>{sub}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <BtnPrimary href={primaryHref}>{primary}</BtnPrimary>
          <BtnGhost onClick={ghostFn} href={ghostFn ? undefined : "/contact"}>{ghost}</BtnGhost>
        </div>
      </div>
    </div>
  );
}

/* ── Insights Preview ────────────────────────────────────────────────────── */

function InsightsPreview() {
  const { ref, on } = useReveal();
  const recentPosts = POSTS.slice(0, 3);
  return (
    <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <Eyebrow>Writing</Eyebrow>
          <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", letterSpacing: "-0.02em", lineHeight: 1.12, color: "var(--text)" }}>Insights & updates</h2>
        </div>
        <div className="hidden sm:block">
          <BtnGhost href="/blog">Read all →</BtnGhost>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recentPosts.map((post) => (
          <article key={post.slug} style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 14, padding: "26px 24px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "1px", textTransform: "uppercase", color: "var(--accent)" }}>{post.category}</span>
              <span style={{ fontFamily: MONO, fontSize: "0.68rem", color: "var(--text-dim)" }}>{post.readTime}</span>
            </div>
            <h3 style={{ fontFamily: HEAD, fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginTop: 12, marginBottom: 8, lineHeight: 1.3 }}>{post.title}</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.6, flex: 1 }}>{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} style={{ fontFamily: MONO, fontSize: "0.74rem", letterSpacing: "0.5px", color: "var(--text)", marginTop: 16, display: "inline-flex", gap: 6, alignItems: "center", textDecoration: "none" }}>Read article →</Link>
          </article>
        ))}
      </div>
      <div className="mt-6 sm:hidden">
        <BtnGhost href="/blog">Read all →</BtnGhost>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  const { openModal } = useModal();

  return (
    <div>
      {/* ── Hero ── */}
      <ThemeHeroSection fullScreen contentClassName="pb-8">
        <div className="grid w-full gap-8 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:items-center">
          {/* Left */}
          <div>
            <div className="hero-anim-2" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
              Internal systems
            </div>
            <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(2rem,5vw,3.8rem)", lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--text)", margin: "0 0 20px" }}>
              Internal systems that{" "}
              <span style={{ color: "var(--accent)" }}>run themselves</span>.
            </h1>
            <p className="hero-anim-4" style={{ color: "var(--text-muted)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "50ch", marginBottom: 32, lineHeight: 1.7 }}>
              Eigensu builds tailored software that streamlines internal management and optimises operations — so your teams stop fighting tools and start compounding output.
            </p>
            <div className="hero-anim-4 flex flex-wrap gap-4 mt-2">
              <BtnPrimary onClick={openModal}>
                Book a Demo
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 15, height: 15 }}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </BtnPrimary>
              <BtnGhost href="/onboard">Start a Project</BtnGhost>
              <BtnTertiary onClick={() => {}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 15, height: 15 }}><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Watch Demo
              </BtnTertiary>
            </div>
          </div>
          {/* Right */}
          <div className="hero-anim-5">
            <OpsConsole />
          </div>
        </div>
      </ThemeHeroSection>

      {/* ── Ticker ── */}
      <Ticker />

      {/* ── Services teaser ── */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ maxWidth: 580, marginBottom: 48 }}>
            <Eyebrow>What we do</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.02em", lineHeight: 1.12, color: "var(--text)" }}>
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
      <section className="relative z-10 py-8 md:py-12">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <StatsStrip />
        </div>
      </section>

      {/* ── Carousel ── */}
      <section className="relative z-10 py-12 md:py-16" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <Eyebrow>Proof</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.02em", lineHeight: 1.12, color: "var(--text)" }}>Selected outcomes.</h2>
          </div>
          <Carousel />
        </div>
      </section>

      {/* ── Insights Preview ── */}
      <section className="relative z-10 py-12 md:py-16" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <InsightsPreview />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <CtaBlock
            heading="Tell us what's slowing your operation down."
            sub="We'll map it, scope it, and show you what automating it looks like — usually within a week."
            primary="Onboard a project"
            primaryHref="/onboard"
            ghost="Book a call"
            ghostFn={openModal}
          />
        </div>
      </section>

      <style>{`
        @keyframes tickerScroll { to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
