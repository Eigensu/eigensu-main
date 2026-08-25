"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { ThemeHeroSection } from "../components/ThemeHero";

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";
const BODY = "var(--font-body), 'Instrument Sans', sans-serif";

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

/* ── Carousel ────────────────────────────────────────────────────────────── */

const SLIDES = [
  { tag: "Logistics",    title: "Dispatch automation",      body: "A self-balancing dispatch engine that replaced a manual routing desk, handling 2,000+ orders daily without intervention.",     client: "NORTHWIND", outcome: "−71% manual hrs" },
  { tag: "Manufacturing",title: "Inventory reconciliation", body: "Real-time stock synchronisation across four plants and three ERP systems, eliminating the monthly variance scramble.",         client: "VERTEX",    outcome: "99.4% accuracy" },
  { tag: "Finance",      title: "Approval routing",         body: "Policy-aware approval flows that route, escalate, and audit themselves — cutting the average cycle from days to minutes.",    client: "ATLAS",     outcome: "8h → 40m" },
  { tag: "Retail",       title: "Ops command centre",       body: "A single console unifying nine in-store systems into one live operational view for regional managers.",                       client: "HELIOS",    outcome: "9 tools → 1" },
  { tag: "Healthcare",   title: "Intake digitisation",      body: "Paper intake replaced with a validated digital workflow feeding straight into the records system.",                           client: "MERIDIAN",  outcome: "−92% errors" },
  { tag: "R&D",          title: "Experiment tracker",       body: "Internal product giving lab teams one place to log, compare, and reproduce experiments across sites.",                        client: "QUANTA",    outcome: "+40% throughput" },
];

function Carousel() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const go = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, idx));
    setActive(clamped);
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: el.offsetWidth * clamped, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const fn = () => setActive(Math.round(el.scrollLeft / el.offsetWidth));
    el.addEventListener("scroll", fn, { passive: true });
    return () => el.removeEventListener("scroll", fn);
  }, []);

  return (
    <div>
      <style>{`#carousel-track::-webkit-scrollbar { display: none; }`}</style>
      <div id="carousel-track" ref={trackRef} style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", gap: 16, paddingBottom: 4 }}>
        {SLIDES.map((s, i) => (
          <article key={i} style={{ flex: "0 0 clamp(260px, 32%, 360px)", scrollSnapAlign: "start", background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 14, padding: "24px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "1px", textTransform: "uppercase" as const, color: "var(--accent)" }}>{s.tag}</span>
            <h4 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.1rem", color: "var(--text)", margin: 0 }}>{s.title}</h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.65, flex: 1, margin: 0 }}>{s.body}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: 14 }}>
              <span style={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "1.5px", color: "var(--text-dim)" }}>{s.client}</span>
              <span style={{ fontFamily: MONO, fontSize: "0.74rem", color: "var(--ok)" }}>{s.outcome}</span>
            </div>
          </article>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18 }}>
        <div style={{ display: "flex", gap: 7 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{ width: active === i ? 22 : 7, height: 7, borderRadius: 4, border: "none", cursor: "pointer", background: active === i ? "var(--accent)" : "var(--border-strong)", transition: "all .25s", padding: 0 }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[{ l: "←", d: -1 }, { l: "→", d: 1 }].map(({ l, d }) => (
            <button key={l} onClick={() => go(active + d)} style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--border-strong)", background: "var(--panel)", color: "var(--text)", fontSize: "1rem", cursor: "pointer", display: "grid", placeItems: "center" }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Logos ────────────────────────────────────────────────────────────────── */

const CLIENTS = ["NORTHWIND","VERTEX","HELIOS","ATLAS","MERIDIAN","QUANTA","ORBIT","LUMEN","NEXUS","SOLACE"];

/* ── Dispatch Console ────────────────────────────────────────────────────── */

function DispatchConsole() {
  const [tick, setTick] = useState(true);
  useEffect(() => { const id = setInterval(() => setTick(t => !t), 900); return () => clearInterval(id); }, []);
  const BARS = [55, 70, 48, 88, 62, 95, 71, 80];
  return (
    <div style={{ background: "var(--bg-elev)", border: "1px solid var(--border-strong)", borderRadius: 14, overflow: "hidden", fontFamily: MONO }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid var(--border)", background: "var(--panel)" }}>
        {["var(--err)","var(--warn)","var(--ok)"].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: c === "var(--err)" ? 0.8 : 0.4 }} />)}
        <span style={{ marginLeft: 8, fontSize: "0.7rem", color: "var(--text-dim)", letterSpacing: "1px" }}>dispatch — live</span>
      </div>
      <div style={{ padding: 18 }}>
        {[{ label: "orders_in_queue", val: "14", color: "var(--warn)" }, { label: "auto_routed_today", val: "1,986", color: "var(--ok)" }, { label: "exceptions", val: "2 pending", tag: true }].map(r => (
          <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid var(--panel)" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>{r.label}</span>
            {r.tag ? <span style={{ fontFamily: MONO, fontSize: "0.66rem", padding: "3px 8px", borderRadius: 4, background: "rgba(240,73,31,0.12)", color: "var(--err)", border: "1px solid rgba(240,73,31,0.25)" }}>{r.val}</span>
            : <span style={{ fontSize: "0.76rem", fontWeight: 700, color: r.color }}>{r.val}</span>}
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 52, marginTop: 16, marginBottom: 12 }}>
          {BARS.map((h, i) => <div key={i} style={{ flex: 1, background: i === 5 ? "var(--accent)" : "var(--accent-line)", borderRadius: "3px 3px 0 0", height: `${h}%`, border: "1px solid var(--accent-line)", borderBottom: "none" }} />)}
        </div>
        <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", paddingTop: 10, borderTop: "1px solid var(--panel)" }}>
          <span style={{ color: "var(--accent)" }}>engine ▸</span> status: balanced
          <span style={{ marginLeft: 4, display: "inline-block", width: 6, height: 12, background: "var(--accent)", verticalAlign: "middle", opacity: tick ? 0.9 : 0, transition: "opacity .15s" }} />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const carouselReveal  = useReveal();
  const logosReveal     = useReveal();
  const featuredReveal  = useReveal();
  const ctaReveal       = useReveal();

  return (
    <div>
      {/* ── Hero ── */}
      <ThemeHeroSection>
        <Eyebrow muted>Projects // selected work</Eyebrow>
        <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(2rem,5vw,3.8rem)", lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--text)", maxWidth: "15ch", margin: "0 0 20px" }}>
          Systems quietly <span style={{ color: "var(--accent)" }}>doing the work</span> right now.
        </h1>
        <p className="hero-anim-4" style={{ color: "var(--text-muted)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "50ch", lineHeight: 1.7 }}>
          A sample of what we&apos;ve shipped. Each one a system that runs itself so the team behind it doesn&apos;t have to.
        </p>
      </ThemeHeroSection>

      {/* ── Carousel ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={carouselReveal.ref} style={{ opacity: carouselReveal.on ? 1 : 0, transform: carouselReveal.on ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
            <Carousel />
          </div>
        </div>
      </section>

      {/* ── Client Logos ── */}
      <section className="relative z-10 py-10 md:py-14" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ marginBottom: 36 }}>
            <Eyebrow>Clients</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.8rem,3vw,2.4rem)", letterSpacing: "-0.02em", color: "var(--text)", margin: 0 }}>Teams that trust the machinery.</h2>
          </div>
          <div ref={logosReveal.ref} className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" style={{ opacity: logosReveal.on ? 1 : 0, transition: "opacity .7s" }}>
            {CLIENTS.map((c, i) => (
              <div key={c} style={{ border: "1px solid var(--border)", borderRadius: 9, padding: "16px 10px", textAlign: "center", fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "2px", color: "var(--text-dim)", opacity: logosReveal.on ? 1 : 0, transition: `opacity .6s ${i * 0.05}s` }}>{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Case Study ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={featuredReveal.ref} style={{ opacity: featuredReveal.on ? 1 : 0, transition: "opacity .7s" }}>
            <div className="grid gap-10 md:gap-16 md:grid-cols-2 md:items-center">
              <div>
                <Eyebrow>Featured // case study</Eyebrow>
                <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.7rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--text)", marginBottom: 18 }}>From 6 people routing orders to 0.</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: 1.7, marginBottom: 22 }}>
                  Northwind&apos;s dispatch desk was a bottleneck and a single point of failure. We modelled their routing rules, built an engine around them, and put humans back on exceptions only.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {["2,000+ orders auto-routed every day","Exceptions surfaced in a live queue","Full audit trail for every decision"].map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--text-muted)", fontSize: "0.9rem" }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(15,77,46,0.12)", border: "1px solid rgba(15,77,46,0.3)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                        <svg viewBox="0 0 12 12" width={10} height={10} fill="none"><path d="M2 6l3 3 5-5" stroke="var(--ok)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/onboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "11px 20px", borderRadius: 100, color: "var(--text)", border: "1px solid var(--border-strong)", textDecoration: "none" }}>Start something like this</Link>
              </div>
              <DispatchConsole />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-10 md:py-14">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={ctaReveal.ref} style={{ position: "relative", textAlign: "center", border: "1px solid var(--border)", borderRadius: 20, padding: "clamp(48px,8vw,80px) clamp(24px,4vw,48px)", overflow: "hidden", background: "var(--bg-elev)", opacity: ctaReveal.on ? 1 : 0, transform: ctaReveal.on ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
            <div style={{ position: "absolute", width: 380, height: 260, background: "var(--accent)", filter: "blur(100px)", opacity: 0.17, top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--text)", maxWidth: "22ch", margin: "0 auto 28px" }}>Your project could be the next one on this page.</h2>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/onboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, background: "var(--accent)", color: "var(--on-accent)", boxShadow: "0 0 0 1px var(--accent-line), 0 8px 28px -8px var(--accent)", textDecoration: "none" }}>Onboard a project</Link>
                <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, color: "var(--text)", border: "1px solid var(--border-strong)", textDecoration: "none" }}>Book a call</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
