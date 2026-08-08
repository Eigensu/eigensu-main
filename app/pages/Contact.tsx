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

const INFO_ITEMS = [
  { icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 17, height: 17, stroke: "var(--accent)" }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>, label: "Email", value: "hello@eigensu.in", href: "mailto:hello@eigensu.in" },
  { icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 17, height: 17, stroke: "var(--accent)" }}><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 9h.01M7 13h5"/></svg>, label: "LinkedIn", value: "/company/eigensu", href: "#" },
  { icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 17, height: 17, stroke: "var(--accent)" }}><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>, label: "Location", value: "Mumbai, Maharashtra, India", href: null },
  { icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 17, height: 17, stroke: "var(--accent)" }}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>, label: "Response time", value: "Within 24 hours, on business days", href: null },
];

export default function ContactPage() {
  const { ref: gridRef, on: gridOn } = useReveal();
  
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (name: string, value: string) => {
    let error = "";
    if (name === "name" && !value.trim()) error = "Name is required.";
    if (name === "email") {
      if (!value.trim()) error = "Work email is required.";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Please enter a valid email address.";
    }
    if (name === "message" && !value.trim()) error = "Please provide some details.";
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all
    const newErrors: Record<string, string> = {
      name: validate("name", form.name),
      email: validate("email", form.email),
      message: validate("message", form.message),
    };
    
    setTouched({ name: true, email: true, message: true, company: true });
    setErrors(newErrors);

    if (Object.values(newErrors).some(err => err !== "")) return;

    setIsSubmitting(true);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const inputStyle = (hasError: boolean) => ({
    width: "100%",
    fontFamily: BODY,
    fontSize: "0.95rem",
    background: "var(--bg)",
    border: `1px solid ${hasError ? "var(--err)" : "var(--border)"}`,
    borderRadius: "10px",
    padding: "14px 16px",
    color: "var(--text)",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
  });

  return (
    <div>
      <style>{`
        .enterprise-input:hover:not(:disabled) {
          border-color: var(--border-strong) !important;
        }
        .enterprise-input:focus:not(:disabled) {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 1px var(--accent) !important;
        }
        .enterprise-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: var(--bg-elev) !important;
        }
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
      `}</style>
      
      {/* ── Hero ── */}
      <ThemeHeroSection>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
          Enterprise Inquiry
        </div>
        <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(2rem,5vw,4rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--text)", maxWidth: "16ch", margin: "0 0 20px" }}>
          Engineer your next <span style={{ color: "var(--accent)" }}>operational advantage</span>.
        </h1>
        <p className="hero-anim-4" style={{ color: "var(--text-muted)", fontSize: "clamp(1.05rem,1.4vw,1.15rem)", maxWidth: "54ch", lineHeight: 1.7 }}>
          Whether you need a full product team or strategic engineering consulting, our engineers are ready to dive into your requirements.
        </p>
      </ThemeHeroSection>

      {/* ── Contact grid ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={gridRef} className="grid gap-12 lg:gap-16 md:grid-cols-2 md:items-start" style={{ opacity: gridOn ? 1 : 0, transition: "opacity .8s ease, transform .8s cubic-bezier(0.16, 1, 0.3, 1)", transform: gridOn ? "translateY(0)" : "translateY(24px)" }}>
            
            {/* Info panel */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(56,232,176,0.08)", border: "1px solid rgba(56,232,176,0.25)", borderRadius: 100, padding: "8px 16px", marginBottom: 36 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ok)", boxShadow: "0 0 12px var(--ok)", animation: "availPulse 2s infinite" }} />
                <span style={{ fontFamily: MONO, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.5px", color: "var(--ok)" }}>Currently accepting new partnerships</span>
              </div>
              <style>{`@keyframes availPulse { 0%,100%{box-shadow:0 0 0 0 rgba(56,232,176,.6)} 70%{box-shadow:0 0 0 8px rgba(56,232,176,0)} }`}</style>

              <div style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem" }}>
                {INFO_ITEMS.map((item, i) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 0", borderBottom: i < INFO_ITEMS.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, border: "1px solid var(--border)", display: "grid", placeItems: "center", flexShrink: 0, background: "var(--bg)" }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily: MONO, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 6 }}>{item.label}</div>
                      {item.href ? <a href={item.href} style={{ fontFamily: BODY, fontSize: "1rem", fontWeight: 500, color: "var(--text)", textDecoration: "none" }}>{item.value}</a> : <span style={{ fontFamily: BODY, fontSize: "1rem", fontWeight: 500, color: "var(--text)" }}>{item.value}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 36, padding: "1.5rem", background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: "16px" }}>
                <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.15rem", color: "var(--text)", marginBottom: "0.5rem" }}>Prefer a structured kickoff?</h3>
                <p style={{ fontFamily: BODY, fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 20 }}>
                  Skip the open-ended form and use our interactive project onboarding flow to define your requirements instantly.
                </p>
                <Link href="/onboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.95rem", padding: "12px 20px", borderRadius: 100, background: "var(--bg)", color: "var(--text)", border: "1px solid var(--border)", textDecoration: "none", transition: "border-color 0.2s" }}>
                  Start Project Onboarding
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </div>
            </div>

            {/* Form Panel */}
            <div style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 16, padding: "2.5rem 2rem", boxShadow: "0 24px 80px rgba(0,0,0,0.07)" }}>
              {isSuccess ? (
                /* Success State */
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(56,232,176,0.1)", border: "1px solid rgba(56,232,176,0.3)", display: "grid", placeItems: "center", margin: "0 auto 24px" }}>
                    <svg viewBox="0 0 24 24" fill="none" width={28} height={28}><path d="M5 13l4 4L19 7" stroke="var(--ok)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.6rem", color: "var(--text)", marginBottom: 12 }}>Request Received</h3>
                  <p style={{ fontFamily: BODY, color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 32, fontSize: "1.05rem", maxWidth: "40ch", margin: "0 auto 32px" }}>
                    Thank you for reaching out. A senior engineer will review your requirements and follow up within 24 hours to schedule a Discovery Call.
                  </p>
                  
                  <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem", textAlign: "left", marginBottom: 32 }}>
                    <div style={{ fontFamily: MONO, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 16 }}>Next Steps</div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                      <li style={{ display: "flex", gap: 12, fontFamily: BODY, fontSize: "0.95rem", color: "var(--text)" }}><span style={{ color: "var(--accent)" }}>1.</span> Technical Review by our team</li>
                      <li style={{ display: "flex", gap: 12, fontFamily: BODY, fontSize: "0.95rem", color: "var(--text)" }}><span style={{ color: "var(--accent)" }}>2.</span> 30-minute Discovery Call</li>
                      <li style={{ display: "flex", gap: 12, fontFamily: BODY, fontSize: "0.95rem", color: "var(--text)" }}><span style={{ color: "var(--accent)" }}>3.</span> Architecture Proposal & Quote</li>
                    </ul>
                  </div>

                  <button onClick={() => { setIsSuccess(false); setForm({ name: "", company: "", email: "", message: "" }); setTouched({}); }} style={{ fontFamily: BODY, fontWeight: 600, fontSize: "0.95rem", color: "var(--text)", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 100, padding: "10px 24px", cursor: "pointer", transition: "border-color 0.2s" }}>Submit another inquiry</button>
                </div>
              ) : (
                /* Form State */
                <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.4rem", color: "var(--text)", marginBottom: 6 }}>Request a Consultation</h2>
                    <p style={{ fontFamily: BODY, color: "var(--text-muted)", fontSize: "0.95rem" }}>Please provide your details below.</p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <label htmlFor="name" style={{ fontFamily: BODY, fontWeight: 600, fontSize: "0.85rem", color: "var(--text)" }}>Full Name <span aria-hidden="true" style={{ color: "var(--err)" }}>*</span></label>
                      </div>
                      <input 
                        id="name"
                        name="name"
                        autoComplete="name"
                        value={form.name} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        placeholder="Jane Doe" 
                        disabled={isSubmitting}
                        className="enterprise-input"
                        style={inputStyle(!!errors.name)} 
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && <div id="name-error" style={{ color: "var(--err)", fontFamily: BODY, fontSize: "0.8rem", marginTop: 6, fontWeight: 500 }}>{errors.name}</div>}
                    </div>

                    <div>
                      <label htmlFor="company" style={{ fontFamily: BODY, fontWeight: 600, fontSize: "0.85rem", color: "var(--text)", marginBottom: 8, display: "block" }}>Company Name</label>
                      <input 
                        id="company"
                        name="company"
                        autoComplete="organization"
                        value={form.company} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        placeholder="Acme Corp" 
                        disabled={isSubmitting}
                        className="enterprise-input"
                        style={inputStyle(false)} 
                      />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <label htmlFor="email" style={{ fontFamily: BODY, fontWeight: 600, fontSize: "0.85rem", color: "var(--text)" }}>Work Email <span aria-hidden="true" style={{ color: "var(--err)" }}>*</span></label>
                    </div>
                    <input 
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email} 
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      placeholder="jane@acme.com" 
                      disabled={isSubmitting}
                      className="enterprise-input"
                      style={inputStyle(!!errors.email)} 
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && <div id="email-error" style={{ color: "var(--err)", fontFamily: BODY, fontSize: "0.8rem", marginTop: 6, fontWeight: 500 }}>{errors.email}</div>}
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <label htmlFor="message" style={{ fontFamily: BODY, fontWeight: 600, fontSize: "0.85rem", color: "var(--text)" }}>Project Details <span aria-hidden="true" style={{ color: "var(--err)" }}>*</span></label>
                    </div>
                    <textarea 
                      id="message"
                      name="message"
                      value={form.message} 
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      placeholder="Tell us about the business problem you are trying to solve..." 
                      disabled={isSubmitting}
                      rows={5} 
                      className="enterprise-input"
                      style={{ ...inputStyle(!!errors.message), resize: "vertical", minHeight: 120 }} 
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && <div id="message-error" style={{ color: "var(--err)", fontFamily: BODY, fontSize: "0.8rem", marginTop: 6, fontWeight: 500 }}>{errors.message}</div>}
                  </div>

                  <p style={{ fontFamily: BODY, fontSize: "0.8rem", color: "var(--text-dim)", lineHeight: 1.5, marginTop: "-4px" }}>
                    Your information is secure. We never share your data with third parties.
                  </p>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    style={{ 
                      width: "100%", 
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      fontFamily: BODY, 
                      fontWeight: 600, 
                      fontSize: "1rem", 
                      padding: "14px 24px", 
                      borderRadius: 100, 
                      background: isSubmitting ? "var(--bg)" : "var(--accent)", 
                      color: isSubmitting ? "var(--text-dim)" : "var(--on-accent)", 
                      border: isSubmitting ? "1px solid var(--border)" : "none", 
                      cursor: isSubmitting ? "not-allowed" : "pointer", 
                      transition: "all 0.2s ease"
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="spinner" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}>
                          <circle cx="12" cy="12" r="10" opacity="0.25" />
                          <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                        Submitting...
                      </>
                    ) : "Submit Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
