"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeHeroSection } from "../components/ThemeHero";

const MONO = "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Sora', sans-serif";
const BODY = "var(--font-body), 'Hanken Grotesk', sans-serif";

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

const labelStyle: React.CSSProperties = { fontFamily: MONO, fontSize: "0.7rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 8, display: "block" };

const inputStyle: React.CSSProperties = { width: "100%", fontFamily: BODY, fontSize: "0.9rem", background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 9, padding: "11px 13px", color: "var(--text)", outline: "none", boxSizing: "border-box" };

const INFO_ITEMS = [
  { icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 17, height: 17, stroke: "var(--accent)" }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>, label: "Email", value: "hello@eigensu.in", href: "mailto:hello@eigensu.in" },
  { icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 17, height: 17, stroke: "var(--accent)" }}><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 9h.01M7 13h5"/></svg>, label: "LinkedIn", value: "/company/eigensu", href: "#" },
  { icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 17, height: 17, stroke: "var(--accent)" }}><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>, label: "Location", value: "Mumbai, Maharashtra, India", href: null },
  { icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 17, height: 17, stroke: "var(--accent)" }}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>, label: "Response time", value: "Within 24 hours, on business days", href: null },
];

export default function ContactPage() {
  const gridReveal = useReveal();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  return (
    <div>
      {/* ── Hero ── */}
      <ThemeHeroSection>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 16 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--text-dim)", flexShrink: 0 }} />
          Contact // let&apos;s talk
        </div>
        <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(2rem,5vw,3.8rem)", lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--text)", maxWidth: "14ch", margin: "0 0 20px" }}>
          Start a <span style={{ color: "var(--accent)" }}>conversation</span>.
        </h1>
        <p className="hero-anim-4" style={{ color: "var(--text-muted)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "46ch", lineHeight: 1.7 }}>
          Whether it&apos;s a quick question or a full project, we read everything that comes in.
        </p>
      </ThemeHeroSection>

      {/* ── Contact grid ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={gridReveal.ref} className="grid gap-10 md:gap-14 md:grid-cols-2 md:items-start" style={{ opacity: gridReveal.on ? 1 : 0, transition: "opacity .7s, transform .7s", transform: gridReveal.on ? "translateY(0)" : "translateY(20px)" }}>
            {/* Info panel */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(56,232,176,0.08)", border: "1px solid rgba(56,232,176,0.2)", borderRadius: 100, padding: "7px 14px", marginBottom: 32 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ok)", boxShadow: "0 0 8px var(--ok)", animation: "availPulse 2s infinite" }} />
                <span style={{ fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "1px", color: "var(--ok)" }}>Currently accepting new projects</span>
              </div>
              <style>{`@keyframes availPulse { 0%,100%{box-shadow:0 0 0 0 rgba(56,232,176,.5)} 70%{box-shadow:0 0 0 8px rgba(56,232,176,0)} }`}</style>

              <div>
                {INFO_ITEMS.map((item, i) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 0", borderBottom: i < INFO_ITEMS.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid var(--border)", display: "grid", placeItems: "center", flexShrink: 0, background: "var(--panel)" }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 4 }}>{item.label}</div>
                      {item.href ? <a href={item.href} style={{ fontFamily: BODY, fontSize: "0.92rem", color: "var(--text)" }}>{item.value}</a> : <span style={{ fontFamily: BODY, fontSize: "0.92rem", color: "var(--text)" }}>{item.value}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 28 }}>
                <p style={{ fontFamily: BODY, fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 18 }}>
                  Want to skip the form? You can also onboard a project directly — takes about two minutes.
                </p>
                <Link href="/onboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.88rem", padding: "11px 18px", borderRadius: 100, background: "var(--accent)", color: "var(--on-accent)", boxShadow: "0 0 0 1px var(--accent-line)", textDecoration: "none" }}>Start a project</Link>
              </div>
            </div>

            {/* Form */}
            <div style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 14, padding: "28px 26px" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "36px 0" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(56,232,176,0.1)", border: "1px solid rgba(56,232,176,0.3)", display: "grid", placeItems: "center", margin: "0 auto 18px" }}>
                    <svg viewBox="0 0 24 24" fill="none" width={22} height={22}><path d="M5 13l4 4L19 7" stroke="var(--ok)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.3rem", color: "var(--text)", marginBottom: 10 }}>Message sent.</h3>
                  <p style={{ fontFamily: BODY, color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 22, fontSize: "0.9rem" }}>We&apos;ll get back to you within 24 hours on business days.</p>
                  <button onClick={() => { setSent(false); setForm({ name: "", company: "", email: "", message: "" }); }} style={{ fontFamily: BODY, fontSize: "0.88rem", color: "var(--text-muted)", background: "none", border: "1px solid var(--border)", borderRadius: 100, padding: "8px 16px", cursor: "pointer" }}>Send another</button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><label style={labelStyle}>Name</label><input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Jane Doe" style={inputStyle} /></div>
                    <div><label style={labelStyle}>Company</label><input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Acme Inc." style={inputStyle} /></div>
                  </div>
                  <div><label style={labelStyle}>Email</label><input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="jane@acme.com" style={inputStyle} /></div>
                  <div><label style={labelStyle}>What do you need?</label><textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us about the process or product you have in mind..." rows={5} style={{ ...inputStyle, resize: "vertical" }} /></div>
                  <button type="submit" style={{ width: "100%", fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, background: "var(--accent)", color: "var(--on-accent)", border: "none", cursor: "pointer", boxShadow: "0 0 0 1px var(--accent-line), 0 8px 28px -8px var(--accent)" }}>Send message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
