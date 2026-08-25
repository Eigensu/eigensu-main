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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim())  errs.lastName  = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    if (!form.phone.trim())     errs.phone     = "Required";
    if (!form.message.trim())   errs.message   = "Required";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  /* ── tokens ── */
  void isDark;
  const drawerBg   = "#FBF3E4";
  const heading    = "#3B0A22";
  const subtext    = "rgba(59,10,34,.55)";
  const divider    = "rgba(59,10,34,.14)";
  const inputBdr   = "rgba(59,10,34,.16)";
  const inputClr   = "#3B0A22";
  const labelClr   = "rgba(59,10,34,.48)";
  const reqClr     = "rgba(59,10,34,.32)";
  const focusBdr   = "var(--accent)";
  const cardBg     = "rgba(59,10,34,.04)";
  const cardBdr    = "rgba(59,10,34,.10)";
  const errClr     = "#F0491F";
  const linkAccent = "var(--accent)";
  const btnBg      = linkAccent;
  const btnTxt     = "var(--on-accent)";
  const btnHoverShadow = "var(--accent-line)";
  const btnIconBg  = "rgba(255,255,255,0.30)";
  const overlayBg  = "rgba(59,10,34,.35)";
  const closeBg    = "rgba(59,10,34,.08)";

  if (!open && !visible) return null;

  return (
    <>
      <style>{`
        @keyframes ltOverIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes ltOverOut { from { opacity:1 } to { opacity:0 } }
        @keyframes ltDrawIn  { from { transform: translateX(100%) } to { transform: translateX(0) } }
        @keyframes ltDrawOut { from { transform: translateX(0) }     to { transform: translateX(100%) } }
        @keyframes ltSuccIn  { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }

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
          font-family: var(--font-body), "Instrument Sans", sans-serif;
          animation: ltDrawIn .48s cubic-bezier(.22,1,.36,1) both;
        }
        .lt-drawer.out { animation: ltDrawOut .42s cubic-bezier(.4,0,1,1) both; }
        .lt-drawer::-webkit-scrollbar { display: none; }

        .lt-drawer h2 {
          font-family: var(--font-head), "Bricolage Grotesque", sans-serif;
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
          font-family: var(--font-body), "Instrument Sans", sans-serif;
        }

        .lt-body {
          font-size: 14px;
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
          font-weight: 400;
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
          transition: border-color .2s;
        }
        .lt-input::placeholder { color: rgba(128,128,128,.4); }
        .lt-input.err { border-bottom-color: ${errClr} !important; }

        .lt-textarea {
          resize: none;
          min-height: 90px;
          padding-bottom: 8px;
        }

        .lt-sendbtn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 28px; border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer; border: none;
          transition: transform .18s, box-shadow .2s;
          background: ${btnBg}; color: ${btnTxt};
          letter-spacing: 0.01em;
        }
        .lt-sendbtn:hover { transform: scale(1.04); box-shadow: 0 0 28px ${btnHoverShadow}; }
        .lt-sendbtn:active { transform: scale(.97); }

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
      >
        {/* Close */}
        <button className="lt-closebtn" onClick={onClose} aria-label="Close">✕</button>

        <div style={{ padding: "52px 44px 48px" }}>

          {submitted ? (
            /* ── Success ── */
            <div className="lt-success" style={{ paddingTop: 60, textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
              <h2 style={{ fontSize: 38, color: heading, marginBottom: 14 }}>
                We&apos;ll be in touch!
              </h2>
              <p className="lt-body" style={{ color: subtext, fontSize: 15, maxWidth: 340, margin: "0 auto 36px" }}>
                Thanks for reaching out. Expect to hear from us within 24 hours.
              </p>
              <button className="lt-sendbtn" onClick={onClose}>Back to site →</button>
            </div>
          ) : (
            <>
              {/* Heading */}
              <h2
              className="font-heading"
                style={{
                  fontSize: "clamp(46px, 9vw, 70px)",
                  lineHeight: 0.95,
                  color: heading,
                  marginBottom: 20,
                  marginTop: 8,
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
                      <span className="lt-field-label" style={{ color: labelClr }}>First name</span>
                      <span className="lt-field-hint" style={{ color: errors.firstName ? errClr : reqClr }}>{errors.firstName || "Required"}</span>
                    </div>
                    <input
                      className={`lt-input${errors.firstName ? " err" : ""}`}
                      name="firstName" value={form.firstName} onChange={handleChange}
                      placeholder="Jane"
                      style={{ borderBottomColor: errors.firstName ? errClr : inputBdr, color: inputClr }}
                      onFocus={(e) => { if (!errors.firstName) e.target.style.borderBottomColor = focusBdr; }}
                      onBlur={(e)  => { if (!errors.firstName) e.target.style.borderBottomColor = inputBdr; }}
                    />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span className="lt-field-label" style={{ color: labelClr }}>Last name</span>
                      <span className="lt-field-hint" style={{ color: errors.lastName ? errClr : reqClr }}>{errors.lastName || "Required"}</span>
                    </div>
                    <input
                      className={`lt-input${errors.lastName ? " err" : ""}`}
                      name="lastName" value={form.lastName} onChange={handleChange}
                      placeholder="Smith"
                      style={{ borderBottomColor: errors.lastName ? errClr : inputBdr, color: inputClr }}
                      onFocus={(e) => { if (!errors.lastName) e.target.style.borderBottomColor = focusBdr; }}
                      onBlur={(e)  => { if (!errors.lastName) e.target.style.borderBottomColor = inputBdr; }}
                    />
                  </div>
                </div>

                {/* Email / Phone row */}
                <div className="lt-row">
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span className="lt-field-label" style={{ color: labelClr }}>Email address</span>
                      <span className="lt-field-hint" style={{ color: errors.email ? errClr : reqClr }}>{errors.email || "Required"}</span>
                    </div>
                    <input
                      className={`lt-input${errors.email ? " err" : ""}`}
                      name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="jane@company.com"
                      style={{ borderBottomColor: errors.email ? errClr : inputBdr, color: inputClr }}
                      onFocus={(e) => { if (!errors.email) e.target.style.borderBottomColor = focusBdr; }}
                      onBlur={(e)  => { if (!errors.email) e.target.style.borderBottomColor = inputBdr; }}
                    />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span className="lt-field-label" style={{ color: labelClr }}>Phone number</span>
                      <span className="lt-field-hint" style={{ color: errors.phone ? errClr : reqClr }}>{errors.phone || "Required"}</span>
                    </div>
                    <input
                      className={`lt-input${errors.phone ? " err" : ""}`}
                      name="phone" type="tel" value={form.phone} onChange={handleChange}
                      placeholder="+1 555 000 0000"
                      style={{ borderBottomColor: errors.phone ? errClr : inputBdr, color: inputClr }}
                      onFocus={(e) => { if (!errors.phone) e.target.style.borderBottomColor = focusBdr; }}
                      onBlur={(e)  => { if (!errors.phone) e.target.style.borderBottomColor = inputBdr; }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span className="lt-field-label" style={{ color: labelClr }}>Message</span>
                    <span className="lt-field-hint" style={{ color: errors.message ? errClr : reqClr }}>{errors.message || "Required"}</span>
                  </div>
                  <textarea
                    className={`lt-input lt-textarea${errors.message ? " err" : ""}`}
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    style={{ borderBottomColor: errors.message ? errClr : inputBdr, color: inputClr }}
                    onFocus={(e) => { if (!errors.message) e.currentTarget.style.borderBottomColor = focusBdr; }}
                    onBlur={(e)  => { if (!errors.message) e.currentTarget.style.borderBottomColor = inputBdr; }}
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
                  <button className="lt-sendbtn" onClick={handleSubmit}>
                    Send request
                    <span style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: btnIconBg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16,
                    }}>→</span>
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
                    123 Enterprise Ave<br />
                    San Francisco, CA 94105
                  </p>
                </div>
                <div style={{ background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 14, padding: "20px 22px" }}>
                  <p className="lt-card-eyebrow" style={{ color: subtext, marginBottom: 10 }}>
                    Want to ask something?
                  </p>
                  <p className="lt-card-value" style={{ color: heading }}>
                    hello@eigensu.com<br />
                    +1 (415) 000-0000
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