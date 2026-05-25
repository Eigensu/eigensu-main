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
  const drawerBg   = isDark ? "#0f1117"              : "#fafaf8";
  const heading    = isDark ? "#ffffff"               : "#0a0a0a";
  const subtext    = isDark ? "rgba(255,255,255,.42)" : "rgba(10,10,10,.50)";
  const divider    = isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)";
  const inputBdr   = isDark ? "rgba(255,255,255,.13)" : "rgba(0,0,0,.14)";
  const inputClr   = isDark ? "#ffffff"               : "#0a0a0a";
  const labelClr   = isDark ? "rgba(255,255,255,.38)" : "rgba(0,0,0,.42)";
  const reqClr     = isDark ? "rgba(255,255,255,.28)" : "rgba(0,0,0,.28)";
  const focusBdr   = isDark ? "#00c8b4"               : "#d4a017";
  const cardBg     = isDark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)";
  const cardBdr    = isDark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.07)";
  const errClr     = "#ff5757";
  const btnBg      = "#c6ff00";
  const btnTxt     = "#0a0a0a";
  const overlayBg  = isDark ? "rgba(0,0,0,.55)"       : "rgba(0,0,0,.35)";
  const closeBg    = isDark ? "rgba(255,255,255,.10)"  : "rgba(0,0,0,.08)";

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
          animation: ltDrawIn .48s cubic-bezier(.22,1,.36,1) both;
        }
        .lt-drawer.out { animation: ltDrawOut .42s cubic-bezier(.4,0,1,1) both; }
        .lt-drawer::-webkit-scrollbar { display: none; }

        .lt-input {
          width: 100%;
          padding: 0 0 12px 0;
          border: none;
          border-bottom: 1px solid;
          font-size: 15px;
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
          font-size: 15px; font-weight: 600;
          cursor: pointer; border: none;
          transition: transform .18s, box-shadow .2s;
          background: ${btnBg}; color: ${btnTxt};
          letter-spacing: .01em;
        }
        .lt-sendbtn:hover { transform: scale(1.04); box-shadow: 0 0 28px rgba(198,255,0,.38); }
        .lt-sendbtn:active { transform: scale(.97); }

        .lt-closebtn {
          position: absolute; top: 24px; right: 24px;
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: none; font-size: 15px; font-weight: 700;
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
              <h2 style={{ fontSize: 38, fontWeight: 800, color: heading, marginBottom: 14, letterSpacing: "-0.03em" }}>
                We&apos;ll be in touch!
              </h2>
              <p style={{ color: subtext, fontSize: 15, lineHeight: 1.7, maxWidth: 340, margin: "0 auto 36px" }}>
                Thanks for reaching out. Expect to hear from us within 24 hours.
              </p>
              <button className="lt-sendbtn" onClick={onClose}>Back to site →</button>
            </div>
          ) : (
            <>
              {/* Heading */}
              <h2 style={{
                fontWeight: 800,
                fontSize: "clamp(46px, 9vw, 70px)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: heading,
                marginBottom: 20,
                marginTop: 8,
              }}>
                LET&apos;S<br />TALK
              </h2>

              <p style={{ color: subtext, fontSize: 14, lineHeight: 1.7, marginBottom: 32, maxWidth: 400 }}>
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
                      <span style={{ fontSize: 12, color: labelClr, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>First name</span>
                      <span style={{ fontSize: 11, color: errors.firstName ? errClr : reqClr }}>{errors.firstName || "Required"}</span>
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
                      <span style={{ fontSize: 12, color: labelClr, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Last name</span>
                      <span style={{ fontSize: 11, color: errors.lastName ? errClr : reqClr }}>{errors.lastName || "Required"}</span>
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
                      <span style={{ fontSize: 12, color: labelClr, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Email address</span>
                      <span style={{ fontSize: 11, color: errors.email ? errClr : reqClr }}>{errors.email || "Required"}</span>
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
                      <span style={{ fontSize: 12, color: labelClr, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Phone number</span>
                      <span style={{ fontSize: 11, color: errors.phone ? errClr : reqClr }}>{errors.phone || "Required"}</span>
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
                    <span style={{ fontSize: 12, color: labelClr, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Message</span>
                    <span style={{ fontSize: 11, color: errors.message ? errClr : reqClr }}>{errors.message || "Required"}</span>
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
                <p style={{ fontSize: 11.5, color: subtext, lineHeight: 1.65, marginTop: -8 }}>
                  By submitting this form, I hereby declare that I have read and understood the{" "}
                  <a href="#" style={{ color: isDark ? "#00c8b4" : "#d4a017", textDecoration: "underline" }}>Privacy Policy</a>{" "}
                  and the terms governing the processing of my personal data by Eigensu as the data controller.
                </p>

                {/* Send button */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="lt-sendbtn" onClick={handleSubmit}>
                    Send request
                    <span style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: "rgba(0,0,0,0.14)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16,
                    }}>→</span>
                  </button>
                </div>
              </div>

              {/* Info cards */}
              <div className="lt-cards">
                <div style={{ background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 14, padding: "20px 22px" }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: subtext, marginBottom: 10, textTransform: "uppercase" }}>
                    Want to visit us?
                  </p>
                  <p style={{ fontSize: 14, color: heading, lineHeight: 1.65 }}>
                    123 Enterprise Ave<br />
                    San Francisco, CA 94105
                  </p>
                </div>
                <div style={{ background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 14, padding: "20px 22px" }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: subtext, marginBottom: 10, textTransform: "uppercase" }}>
                    Want to ask something?
                  </p>
                  <p style={{ fontSize: 14, color: heading, lineHeight: 1.65 }}>
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