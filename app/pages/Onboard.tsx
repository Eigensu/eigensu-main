"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeHeroSection } from "../components/ThemeHero";

const MONO = "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Sora', sans-serif";
const BODY = "var(--font-body), 'Hanken Grotesk', sans-serif";

const PROJECT_TYPES = [
  { title: "Operations Automation", desc: "Pipelines, workflows, reconciliation" },
  { title: "Internal Tooling",      desc: "Dashboards, admin apps" },
  { title: "Systems Integration",   desc: "Connecting existing tools" },
  { title: "Not sure yet",          desc: "Help me figure it out" },
];

const inputStyle: React.CSSProperties = {
  width: "100%", fontFamily: BODY, fontSize: "0.92rem",
  background: "var(--panel)", border: "1px solid var(--border)",
  borderRadius: 9, padding: "11px 13px", color: "var(--text)", outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: MONO, fontSize: "0.7rem", letterSpacing: "1.5px",
  textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 8, display: "block",
};

function BtnPrimary({ children, onClick, type = "button" }: { children: React.ReactNode; onClick?: () => void; type?: "button" | "submit" }) {
  return (
    <button type={type} onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "11px 20px", borderRadius: 100, background: "var(--accent)", color: "var(--on-accent)", border: "none", cursor: "pointer", boxShadow: "0 0 0 1px var(--accent-line), 0 8px 28px -8px var(--accent)" }}>
      {children}
    </button>
  );
}

function BtnGhost({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "11px 20px", borderRadius: 100, color: "var(--text)", border: "1px solid var(--border-strong)", background: "none", cursor: "pointer" }}>
      {children}
    </button>
  );
}

const ArrowRight = () => <svg viewBox="0 0 24 24" fill="none" width={15} height={15}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

export default function OnboardPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [s1, setS1] = useState({ name: "", role: "", company: "", email: "" });
  const [s2, setS2] = useState({ projectType: 0, scope: "", timeline: "ASAP", budget: "Under ₹5L" });
  const [s3, setS3] = useState({ notes: "", referral: "Referral" });

  const STEPS = ["About you", "The project", "Confirm"];

  if (submitted) {
    return (
      <div>
        <ThemeHeroSection>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(56,232,176,0.1)", border: "1px solid rgba(56,232,176,0.25)", display: "grid", placeItems: "center", margin: "0 auto 24px" }}>
              <svg viewBox="0 0 24 24" fill="none" width={28} height={28}><path d="M5 13l4 4L19 7" stroke="var(--ok)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(2rem,4vw,2.8rem)", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: 14 }}>Project received.</h2>
            <p style={{ fontFamily: BODY, color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "42ch", margin: "0 auto 28px" }}>
              Thanks — we&apos;ve got your details. Someone from the team will be in touch within 24 hours to map out next steps.
            </p>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "11px 20px", borderRadius: 100, color: "var(--text)", border: "1px solid var(--border-strong)", textDecoration: "none" }}>Back to home</Link>
          </div>
        </ThemeHeroSection>
      </div>
    );
  }

  return (
    <div>
      {/* ── Hero ── */}
      <ThemeHeroSection>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 16 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--text-dim)", flexShrink: 0 }} />
          Onboard // new project
        </div>
        <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(2rem,5vw,3.8rem)", lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--text)", maxWidth: "16ch", margin: "0 0 20px" }}>
          Let&apos;s scope <span style={{ color: "var(--accent)" }}>your project</span>.
        </h1>
        <p className="hero-anim-4" style={{ color: "var(--text-muted)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "46ch", lineHeight: 1.7 }}>
          Three quick steps. Takes about two minutes — we&apos;ll follow up within 24 hours.
        </p>
      </ThemeHeroSection>

      {/* ── Form ── */}
      <section className="relative z-10 py-14 pb-24 md:pb-32">
        <div className="w-full max-w-[780px] mx-auto px-5 sm:px-8">
          {/* Progress */}
          <div className="grid grid-cols-3 gap-3 mb-9">
            {STEPS.map((label, i) => (
              <div key={label}>
                <div style={{ height: 3, borderRadius: 2, background: i <= step ? "var(--accent)" : "var(--border)", marginBottom: 8, transition: "background .3s" }} />
                <div style={{ fontFamily: MONO, fontSize: "0.7rem", letterSpacing: "1.5px", textTransform: "uppercase", color: i === step ? "var(--text)" : "var(--text-dim)" }}>
                  {String(i + 1).padStart(2, "0")} — {label}
                </div>
              </div>
            ))}
          </div>

          {/* Card */}
          <div style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 14, padding: "clamp(22px,4vw,34px)" }}>

            {/* Step 1 */}
            {step === 0 && (
              <div>
                <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.4rem", color: "var(--text)", marginBottom: 8 }}>About you</h3>
                <p style={{ fontFamily: BODY, color: "var(--text-muted)", marginBottom: 26, fontSize: "0.9rem" }}>So we know who we&apos;re talking to.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><label style={labelStyle}>Full name</label><input value={s1.name} onChange={e => setS1(s => ({ ...s, name: e.target.value }))} placeholder="Jane Doe" style={inputStyle} /></div>
                    <div><label style={labelStyle}>Role</label><input value={s1.role} onChange={e => setS1(s => ({ ...s, role: e.target.value }))} placeholder="Head of Operations" style={inputStyle} /></div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><label style={labelStyle}>Company</label><input value={s1.company} onChange={e => setS1(s => ({ ...s, company: e.target.value }))} placeholder="Acme Inc." style={inputStyle} /></div>
                    <div><label style={labelStyle}>Work email</label><input type="email" value={s1.email} onChange={e => setS1(s => ({ ...s, email: e.target.value }))} placeholder="jane@acme.com" style={inputStyle} /></div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 8 }}>
                    <BtnPrimary onClick={() => setStep(1)}>Continue <ArrowRight /></BtnPrimary>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 1 && (
              <div>
                <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.4rem", color: "var(--text)", marginBottom: 8 }}>The project</h3>
                <p style={{ fontFamily: BODY, color: "var(--text-muted)", marginBottom: 26, fontSize: "0.9rem" }}>What are we building, and roughly how big is it?</p>

                <div style={{ marginBottom: 22 }}>
                  <label style={labelStyle}>Type of work</label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {PROJECT_TYPES.map((pt, i) => (
                      <button key={i} type="button" onClick={() => setS2(s => ({ ...s, projectType: i }))} style={{ padding: "14px 16px", borderRadius: 9, textAlign: "left", border: s2.projectType === i ? "1px solid var(--accent)" : "1px solid var(--border)", background: s2.projectType === i ? "var(--accent-soft)" : "var(--panel)", cursor: "pointer" }}>
                        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: "0.88rem", color: s2.projectType === i ? "var(--text)" : "var(--text-muted)", marginBottom: 4 }}>{pt.title}</div>
                        <div style={{ fontFamily: MONO, fontSize: "0.68rem", color: "var(--text-dim)", letterSpacing: "0.5px" }}>{pt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Describe the scope</label>
                  <textarea value={s2.scope} onChange={e => setS2(s => ({ ...s, scope: e.target.value }))} placeholder="What's the process today, and what would 'solved' look like?" rows={4} style={{ ...inputStyle, resize: "vertical" }} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2" style={{ marginBottom: 28, gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Timeline</label>
                    <select value={s2.timeline} onChange={e => setS2(s => ({ ...s, timeline: e.target.value }))} style={inputStyle}>
                      <option>ASAP</option>
                      <option>1–3 months</option>
                      <option>3–6 months</option>
                      <option>Just exploring</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Budget range</label>
                    <select value={s2.budget} onChange={e => setS2(s => ({ ...s, budget: e.target.value }))} style={inputStyle}>
                      <option>Under ₹5L</option>
                      <option>₹5L – ₹15L</option>
                      <option>₹15L – ₹40L</option>
                      <option>₹40L+</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <BtnGhost onClick={() => setStep(0)}>Back</BtnGhost>
                  <BtnPrimary onClick={() => setStep(2)}>Continue <ArrowRight /></BtnPrimary>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 2 && (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.4rem", color: "var(--text)", marginBottom: 8 }}>Confirm &amp; submit</h3>
                <p style={{ fontFamily: BODY, color: "var(--text-muted)", marginBottom: 26, fontSize: "0.9rem" }}>Anything else we should know before we reach out?</p>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Additional notes (optional)</label>
                  <textarea value={s3.notes} onChange={e => setS3(s => ({ ...s, notes: e.target.value }))} placeholder="Links, context, constraints, deadlines..." rows={4} style={{ ...inputStyle, resize: "vertical" }} />
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>How did you hear about us?</label>
                  <select value={s3.referral} onChange={e => setS3(s => ({ ...s, referral: e.target.value }))} style={inputStyle}>
                    <option>Referral</option>
                    <option>Search</option>
                    <option>Social</option>
                    <option>Other</option>
                  </select>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <BtnGhost onClick={() => setStep(1)}>Back</BtnGhost>
                  <BtnPrimary type="submit">
                    Submit project
                    <svg viewBox="0 0 24 24" fill="none" width={15} height={15}><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </BtnPrimary>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
