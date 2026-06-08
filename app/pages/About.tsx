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

const VALUES = [
  { idx: "01", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 20, height: 20, stroke: "#3b82f6" }}><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>, title: "Outcomes, not output", body: "We measure success by hours saved and errors removed — not lines shipped or features listed." },
  { idx: "02", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 20, height: 20, stroke: "#3b82f6" }}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>, title: "No hand-holding required", body: "What we build runs without us. Documented, monitored, and genuinely yours on handover." },
  { idx: "03", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 20, height: 20, stroke: "#3b82f6" }}><path d="M4 6h16M4 12h16M4 18h10"/></svg>, title: "Boring on purpose", body: "The best operational software is invisible. We optimise for reliability over novelty, every time." },
];

const TIMELINE = [
  { year: "2021", title: "Founded",       body: "Started in Mumbai with one automation project and one stubborn spreadsheet." },
  { year: "2022", title: "First product", body: "Shipped our first reusable internal-tooling framework." },
  { year: "2023", title: "Cross-border",  body: "Expanded to clients across three countries and four industries." },
  { year: "2024", title: "Scaling",       body: "Now running production systems handling millions of events monthly." },
];

const STATS = [
  { num: "12+",   lbl: "Projects delivered" },
  { num: "100%",  lbl: "Client retention" },
  { num: "03",    lbl: "Countries served" },
  { num: "04yr",  lbl: "Track record" },
];

export default function AboutPage() {
  const statsReveal   = useReveal(0.08);
  const valuesReveal  = useReveal(0.07);
  const timelineReveal = useReveal(0.07);
  const ctaReveal     = useReveal(0.08);

  return (
    <div>
      {/* ── Hero ── */}
      <ThemeHeroSection>
        <Eyebrow muted>EST. 2021 // MUMBAI, IN</Eyebrow>
        <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(2rem,5vw,3.8rem)", lineHeight: 1.06, letterSpacing: "-0.025em", color: "#f3f4f6", maxWidth: "16ch", margin: "0 0 20px" }}>
          We build the systems <span style={{ color: "#3b82f6" }}>companies run on</span> but never show off.
        </h1>
        <p className="hero-anim-4" style={{ color: "#8b919c", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "50ch", lineHeight: 1.7 }}>
          Eigensu is a small, deliberate engineering studio. We take the messy internal operations that hold businesses together and turn them into software that holds itself together.
        </p>
      </ThemeHeroSection>

      {/* ── Stats + "Operators first" ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={statsReveal.ref} className="grid gap-8 md:gap-12 md:grid-cols-2 md:items-center" style={{ opacity: statsReveal.on ? 1 : 0, transform: statsReveal.on ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
            {/* Stats grid */}
            <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, background: "linear-gradient(180deg,#0e1014,#08090b)", overflow: "hidden" }}>
              <div className="grid grid-cols-2">
                {STATS.map((s, i) => (
                  <div key={s.lbl} style={{ padding: "clamp(22px,4vw,36px) clamp(16px,3vw,28px)", borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.08)" : "none", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                    <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(1.7rem,3vw,2.4rem)", letterSpacing: "-0.03em", color: "#f3f4f6" }}>
                      {s.num.replace(/[+%×yr]/g, "")}<span style={{ color: "#3b82f6" }}>{s.num.match(/[+%×yr]+/)?.[0] ?? ""}</span>
                    </div>
                    <div style={{ fontFamily: MONO, fontSize: "0.7rem", letterSpacing: "1px", textTransform: "uppercase", color: "#8b919c", marginTop: 6 }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Text */}
            <div>
              <Eyebrow>Who we are</Eyebrow>
              <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.5rem,2.5vw,2rem)", letterSpacing: "-0.02em", color: "#f3f4f6", marginBottom: 16 }}>Operators first, engineers second.</h2>
              <p style={{ color: "#8b919c", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: 1.7 }}>
                Most software fails operations because it&apos;s built by people who&apos;ve never run one. We start from the workflow — the handoffs, the exceptions, the 4pm scramble — and only then write code. The result is systems that fit the way work actually happens, not the way a tool wishes it did.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values / Principles ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <Eyebrow>Principles</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.02em", lineHeight: 1.12, color: "#f3f4f6" }}>How we think.</h2>
          </div>
          <div ref={valuesReveal.ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <article key={v.idx} style={{ background: "#08090b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "24px 22px", position: "relative", opacity: valuesReveal.on ? 1 : 0, transform: valuesReveal.on ? "translateY(0)" : "translateY(20px)", transition: `opacity .6s ${i * 0.1}s, transform .6s ${i * 0.1}s` }}>
                <span style={{ position: "absolute", top: 20, right: 22, fontFamily: MONO, fontSize: "0.7rem", color: "#565c66" }}>{v.idx}</span>
                <div style={{ width: 42, height: 42, borderRadius: 10, display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.02)", marginBottom: 18 }}>{v.icon}</div>
                <h3 style={{ fontFamily: HEAD, fontSize: "1.1rem", fontWeight: 700, marginBottom: 10, color: "#f3f4f6" }}>{v.title}</h3>
                <p style={{ color: "#8b919c", fontSize: "0.9rem", lineHeight: 1.65 }}>{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <Eyebrow>Trajectory</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.02em", lineHeight: 1.12, color: "#f3f4f6" }}>A short history.</h2>
          </div>
          <div ref={timelineReveal.ref} className="grid gap-5 grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((t, i) => (
              <article key={t.year} style={{ background: "#08090b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "22px 20px", opacity: timelineReveal.on ? 1 : 0, transform: timelineReveal.on ? "translateY(0)" : "translateY(20px)", transition: `opacity .6s ${i * 0.1}s, transform .6s ${i * 0.1}s` }}>
                <Eyebrow muted>{t.year}</Eyebrow>
                <h3 style={{ fontFamily: HEAD, fontSize: "1.1rem", fontWeight: 700, marginTop: 12, marginBottom: 10, color: "#f3f4f6" }}>{t.title}</h3>
                <p style={{ color: "#8b919c", fontSize: "0.88rem", lineHeight: 1.65 }}>{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-10 md:py-14">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={ctaReveal.ref} style={{ position: "relative", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "clamp(48px,8vw,80px) clamp(24px,4vw,48px)", overflow: "hidden", background: "#08090b", opacity: ctaReveal.on ? 1 : 0, transform: ctaReveal.on ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
            <div style={{ position: "absolute", width: 400, height: 280, background: "#3b82f6", filter: "blur(100px)", opacity: 0.18, top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "#f3f4f6", maxWidth: "20ch", margin: "0 auto 28px" }}>Want to know if we&apos;re the right fit?</h2>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, background: "#3b82f6", color: "#00112e", boxShadow: "0 0 0 1px rgba(59,130,246,0.35), 0 8px 28px -8px #3b82f6", textDecoration: "none" }}>Book a call</Link>
                <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, color: "#f3f4f6", border: "1px solid rgba(255,255,255,0.16)", textDecoration: "none" }}>See our work</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
