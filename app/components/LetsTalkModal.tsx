"use client";

import { useEffect, useRef, useState } from "react";

type Theme = "dark" | "light";

interface LetsTalkDrawerProps {
  open: boolean;
  onClose: () => void;
  theme?: Theme;
}

export default function LetsTalkDrawer({ open, onClose, theme = "dark" }: LetsTalkDrawerProps) {
  const isDark = theme === "dark";
  const [visible, setVisible] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let openFrame = 0;
    let closeFrame = 0;
    let closeTimer: ReturnType<typeof setTimeout> | undefined;

    if (open) {
      openFrame = requestAnimationFrame(() => {
        closeFrame = requestAnimationFrame(() => setVisible(true));
      });
    } else {
      openFrame = requestAnimationFrame(() => {
        setVisible(false);
        closeTimer = setTimeout(() => { setSubmitted(false); }, 480);
      });
    }

    return () => {
      cancelAnimationFrame(openFrame);
      cancelAnimationFrame(closeFrame);
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const validateField = (name: string, value: string) => {
    if (name === "firstName" && !value.trim()) return "Required";
    if (name === "lastName" && !value.trim()) return "Required";
    if (name === "email") {
      if (!value.trim()) return "Required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Valid email required";
    }
    if (name === "phone" && !value.trim()) return "Required";
    if (name === "message" && !value.trim()) return "Required";
    return "";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      setErrors((er) => ({ ...er, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = async () => {
    const errs: Record<string, string> = {
      firstName: validateField("firstName", form.firstName),
      lastName: validateField("lastName", form.lastName),
      email: validateField("email", form.email),
      phone: validateField("phone", form.phone),
      message: validateField("message", form.message),
    };
    
    setTouched({ firstName: true, lastName: true, email: true, phone: true, message: true });
    setErrors(errs);

    if (Object.values(errs).some(err => err !== "")) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    setIsSubmitting(false);
    setSubmitted(true);
  };

  /* ── tokens ── */
  const drawerBg   = isDark ? "#0f1117"               : "#fafaf8";
  const heading    = isDark ? "#ffffff"               : "#0a0a0a";
  const subtext    = isDark ? "rgba(255,255,255,.55)" : "rgba(10,10,10,.60)";
  const divider    = isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)";
  const inputBdr   = isDark ? "rgba(255,255,255,.13)" : "rgba(0,0,0,.14)";
  const inputClr   = isDark ? "#ffffff"               : "#0a0a0a";
  const labelClr   = isDark ? "rgba(255,255,255,.38)" : "rgba(0,0,0,.42)";
  const reqClr     = isDark ? "rgba(255,255,255,.28)" : "rgba(0,0,0,.28)";
  const focusBdr   = "var(--accent)";
  const cardBg     = isDark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)";
  const cardBdr    = isDark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.07)";
  const errClr     = "#ff5757";
  const linkAccent = "var(--accent)";
  const btnBg      = linkAccent;
  const btnTxt     = "var(--on-accent)";
  const btnHoverShadow = "var(--accent-line)";
  const btnIconBg  = isDark ? "rgba(2,6,8,0.14)"      : "rgba(255,255,255,0.22)";
  const overlayBg  = isDark ? "rgba(0,0,0,.55)"       : "rgba(0,0,0,.35)";
  const closeBg    = isDark ? "rgba(255,255,255,.10)" : "rgba(0,0,0,.08)";

  if (!open && !visible) return null;

  return (
    <>
      <style>{`
        @keyframes ltOverIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes ltOverOut { from { opacity:1 } to { opacity:0 } }
        @keyframes ltDrawIn  { from { transform: translateX(100%) } to { transform: translateX(0) } }
        @keyframes ltDrawOut { from { transform: translateX(0) }     to { transform: translateX(100%) } }
        @keyframes ltSuccIn  { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        @keyframes spin { to { transform: rotate(360deg); } }

        .lt-overlay {
          position: fixed; inset: 0; z-index: 9998;
          background: ${overlayBg};
          backdrop-filter: blur(4px);
          animation: ltOverIn .3s ease both;
        }
        .lt-overlay.out { animation: ltOverOut .4s ease both; }

        .lt-drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: min(560px, 100vw);
          z-index: 9999;
          overflow-y: auto; overflow-x: hidden;
          scrollbar-width: none;
          font-family: var(--font-body), "Hanken Grotesk", sans-serif;
          animation: ltDrawIn .48s cubic-bezier(.22,1,.36,1) both;
        }
        .lt-drawer.out { animation: ltDrawOut .42s cubic-bezier(.4,0,1,1) both; }
        .lt-drawer::-webkit-scrollbar { display: none; }

        .lt-drawer h2 {
          font-family: var(--font-head), "Sora", sans-serif;
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        .lt-body,
        .lt-input,
        .lt-textarea,
        .lt-sendbtn,
        .lt-closebtn,
        .lt-field-label,
        .lt-field-hint,
        .lt-card-eyebrow,
        .lt-card-value {
          font-family: var(--font-body), "Hanken Grotesk", sans-serif;
        }

        .lt-body {
          font-size: 14.5px;
          line-height: 1.7;
        }

        .lt-field-label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .lt-field-hint {
          font-size: 11px;
          font-weight: 500;
        }

        .lt-card-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .lt-card-value {
          font-size: 14px;
          line-height: 1.65;
        }

        .lt-input {
          width: 100%;
          padding: 0 0 12px 0;
          border: none;
          border-bottom: 1px solid;
          font-size: 15px;
          font-weight: 400;
          outline: none;
          background: transparent;
          transition: border-color .2s, opacity .2s;
        }
        .lt-input::placeholder { color: rgba(128,128,128,.4); }
        .lt-input.err { border-bottom-color: ${errClr} !important; }
        .lt-input:disabled { opacity: 0.5; cursor: not-allowed; }

        .lt-textarea {
          resize: none;
          min-height: 90px;
          padding-bottom: 8px;
        }

        .lt-sendbtn {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 15px 28px; border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer; border: none;
          transition: transform .18s, box-shadow .2s, background .2s, opacity .2s;
          background: ${btnBg}; color: ${btnTxt};
          letter-spacing: 0.01em;
        }
        .lt-sendbtn:hover:not(:disabled) { transform: scale(1.04); box-shadow: 0 0 28px ${btnHoverShadow}; }
        .lt-sendbtn:active:not(:disabled) { transform: scale(.97); }
        .lt-sendbtn:disabled { opacity: 0.7; cursor: not-allowed; }

        .lt-closebtn {
          position: absolute; top: 24px; right: 24px;
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: none;
          font-size: 15px;
          font-weight: 500;
          transition: background .18s, transform .18s;
          z-index: 10;
          background: ${closeBg}; color: ${heading};
        }
        .lt-closebtn:hover { transform: scale(1.08); }

        .lt-success { animation: ltSuccIn .42s cubic-bezier(.22,1,.36,1) both; }

        .lt-row { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        @media (max-width: 440px) { .lt-row { grid-template-columns: 1fr; gap: 20px; } }

        .lt-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 32px; }
        @media (max-width: 440px) { .lt-cards { grid-template-columns: 1fr; } }
      `}</style>

      {/* Overlay */}
      <div className={`lt-overlay${!visible ? " out" : ""}`} onClick={onClose} />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`lt-drawer${!visible ? " out" : ""}`}
        style={{ background: drawerBg }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lt-drawer-title"
      >
        {/* Close */}
        <button className="lt-closebtn" onClick={onClose} aria-label="Close">✕</button>

        <div style={{ padding: "52px 44px 48px" }}>

          {submitted ? (
            /* ── Success ── */
            <div className="lt-success" style={{ paddingTop: 60, textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(56,232,176,0.1)", border: "1px solid rgba(56,232,176,0.3)", display: "grid", placeItems: "center", margin: "0 auto 24px" }}>
                <svg viewBox="0 0 24 24" fill="none" width={28} height={28}><path d="M5 13l4 4L19 7" stroke="var(--ok)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h2 style={{ fontSize: 32, color: heading, marginBottom: 14, fontFamily: "var(--font-head), sans-serif", fontWeight: 700 }}>
                Request Received
              </h2>
              <p className="lt-body" style={{ color: subtext, fontSize: 15, maxWidth: 340, margin: "0 auto 36px" }}>
                Thank you for reaching out. A senior engineer will review your requirements and follow up within 24 hours to schedule a Discovery Call.
              </p>
              <button className="lt-sendbtn" onClick={onClose}>Back to site</button>
            </div>
          ) : (
            <>
              {/* Heading */}
              <h2
                id="lt-drawer-title"
                className="font-heading"
                style={{
                  fontSize: "clamp(42px, 8vw, 64px)",
                  lineHeight: 0.95,
                  color: heading,
                  marginBottom: 20,
                  marginTop: 8,
                  fontWeight: 700,
                  letterSpacing: "-0.02em"
                }}
              >
                LET&apos;S<br />TALK
              </h2>

              <p className="lt-body" style={{ color: subtext, marginBottom: 32, maxWidth: 400 }}>
                Leave your contact info and expect to hear from us within 24&nbsp;hours. We&apos;ll help clarify your
                needs, shape the requirements, and identify the best solution for you.
              </p>

              <div style={{ borderTop: `1px solid ${divider}`, marginBottom: 32 }} />

              {/* Form */}
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

                {/* Name row */}
                <div className="lt-row">
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <label htmlFor="lt-firstName" className="lt-field-label" style={{ color: labelClr }}>First name <span aria-hidden="true" style={{ color: errClr }}>*</span></label>
                      <span className="lt-field-hint" style={{ color: errors.firstName ? errClr : reqClr }}>{errors.firstName}</span>
                    </div>
                    <input
                      id="lt-firstName"
                      className={`lt-input${errors.firstName ? " err" : ""}`}
                      name="firstName" 
                      value={form.firstName} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Jane"
                      disabled={isSubmitting}
                      autoComplete="given-name"
                      aria-invalid={!!errors.firstName}
                      style={{ borderBottomColor: errors.firstName ? errClr : inputBdr, color: inputClr }}
                      onFocus={(e) => { if (!errors.firstName && !isSubmitting) e.target.style.borderBottomColor = focusBdr; }}
                    />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <label htmlFor="lt-lastName" className="lt-field-label" style={{ color: labelClr }}>Last name <span aria-hidden="true" style={{ color: errClr }}>*</span></label>
                      <span className="lt-field-hint" style={{ color: errors.lastName ? errClr : reqClr }}>{errors.lastName}</span>
                    </div>
                    <input
                      id="lt-lastName"
                      className={`lt-input${errors.lastName ? " err" : ""}`}
                      name="lastName" 
                      value={form.lastName} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Smith"
                      disabled={isSubmitting}
                      autoComplete="family-name"
                      aria-invalid={!!errors.lastName}
                      style={{ borderBottomColor: errors.lastName ? errClr : inputBdr, color: inputClr }}
                      onFocus={(e) => { if (!errors.lastName && !isSubmitting) e.target.style.borderBottomColor = focusBdr; }}
                    />
                  </div>
                </div>

                {/* Email / Phone row */}
                <div className="lt-row">
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <label htmlFor="lt-email" className="lt-field-label" style={{ color: labelClr }}>Work Email <span aria-hidden="true" style={{ color: errClr }}>*</span></label>
                      <span className="lt-field-hint" style={{ color: errors.email ? errClr : reqClr }}>{errors.email}</span>
                    </div>
                    <input
                      id="lt-email"
                      className={`lt-input${errors.email ? " err" : ""}`}
                      name="email" 
                      type="email" 
                      value={form.email} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="jane@company.com"
                      disabled={isSubmitting}
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      style={{ borderBottomColor: errors.email ? errClr : inputBdr, color: inputClr }}
                      onFocus={(e) => { if (!errors.email && !isSubmitting) e.target.style.borderBottomColor = focusBdr; }}
                    />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <label htmlFor="lt-phone" className="lt-field-label" style={{ color: labelClr }}>Phone number <span aria-hidden="true" style={{ color: errClr }}>*</span></label>
                      <span className="lt-field-hint" style={{ color: errors.phone ? errClr : reqClr }}>{errors.phone}</span>
                    </div>
                    <input
                      id="lt-phone"
                      className={`lt-input${errors.phone ? " err" : ""}`}
                      name="phone" 
                      type="tel" 
                      value={form.phone} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="+1 555 000 0000"
                      disabled={isSubmitting}
                      autoComplete="tel"
                      aria-invalid={!!errors.phone}
                      style={{ borderBottomColor: errors.phone ? errClr : inputBdr, color: inputClr }}
                      onFocus={(e) => { if (!errors.phone && !isSubmitting) e.target.style.borderBottomColor = focusBdr; }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <label htmlFor="lt-message" className="lt-field-label" style={{ color: labelClr }}>Message <span aria-hidden="true" style={{ color: errClr }}>*</span></label>
                    <span className="lt-field-hint" style={{ color: errors.message ? errClr : reqClr }}>{errors.message}</span>
                  </div>
                  <textarea
                    id="lt-message"
                    className={`lt-input lt-textarea${errors.message ? " err" : ""}`}
                    name="message" 
                    value={form.message} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell us about the business problem you are trying to solve..."
                    disabled={isSubmitting}
                    aria-invalid={!!errors.message}
                    style={{ borderBottomColor: errors.message ? errClr : inputBdr, color: inputClr }}
                    onFocus={(e) => { if (!errors.message && !isSubmitting) e.currentTarget.style.borderBottomColor = focusBdr; }}
                  />
                </div>

                {/* Legal */}
                <p className="lt-body" style={{ fontSize: 11.5, color: subtext, lineHeight: 1.65, marginTop: -8 }}>
                  By submitting this form, I hereby declare that I have read and understood the{" "}
                  <a href="#" style={{ color: linkAccent, textDecoration: "underline" }}>Privacy Policy</a>{" "}
                  and the terms governing the processing of my personal data by Eigensu as the data controller.
                </p>

                {/* Send button */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="lt-sendbtn" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg className="spinner" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}>
                          <circle cx="12" cy="12" r="10" opacity="0.25" />
                          <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send request
                        <span style={{
                          width: 32, height: 32, borderRadius: "50%",
                          background: btnIconBg,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 16,
                        }}>→</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Info cards */}
              <div className="lt-cards">
                <div style={{ background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 14, padding: "20px 22px" }}>
                  <p className="lt-card-eyebrow" style={{ color: subtext, marginBottom: 10 }}>
                    Want to visit us?
                  </p>
                  <p className="lt-card-value" style={{ color: heading }}>
                    Mumbai, Maharashtra<br />
                    India
                  </p>
                </div>
                <div style={{ background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 14, padding: "20px 22px" }}>
                  <p className="lt-card-eyebrow" style={{ color: subtext, marginBottom: 10 }}>
                    Want to ask something?
                  </p>
                  <p className="lt-card-value" style={{ color: heading }}>
                    hello@eigensu.in<br />
                    <span style={{ color: subtext }}>Response in 24 hours</span>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}