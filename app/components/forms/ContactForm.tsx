"use client";

import { useState, type CSSProperties } from "react";
import { ConsentCheckbox, FormError, FormGuard, useEnquiryForm } from "./FormGuard";

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";
const BODY = "var(--font-body), 'Instrument Sans', sans-serif";

const labelStyle: CSSProperties = { fontFamily: MONO, fontSize: "0.7rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 8, display: "block" };

const inputStyle: CSSProperties = { width: "100%", fontFamily: BODY, fontSize: "0.9rem", background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 9, padding: "11px 13px", color: "var(--text)", outline: "none", boxSizing: "border-box" };

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} style={{ color: "var(--err)", fontSize: 12, marginTop: 6 }}>{message}</p>;
}

function Form({ onReset }: { onReset: () => void }) {
  const { state, pending, onSubmit, errors } = useEnquiryForm("contact");

  if (state.status === "success") {
    return (
      <div role="status" style={{ textAlign: "center", padding: "36px 0" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(15,77,46,0.1)", border: "1px solid rgba(15,77,46,0.3)", display: "grid", placeItems: "center", margin: "0 auto 18px" }}>
          <svg viewBox="0 0 24 24" fill="none" width={22} height={22} aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="var(--ok)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.3rem", color: "var(--text)", marginBottom: 10 }}>Message sent.</h3>
        <p style={{ fontFamily: BODY, color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 22, fontSize: "0.9rem" }}>We&apos;ll get back to you within 24 hours on business days.</p>
        <button type="button" onClick={onReset} style={{ fontFamily: BODY, fontSize: "0.88rem", color: "var(--text-muted)", background: "none", border: "1px solid var(--border)", borderRadius: 100, padding: "8px 16px", cursor: "pointer" }}>Send another</button>
      </div>
    );
  }

  const field = (name: string) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    style: { ...inputStyle, ...(errors[name] ? { borderColor: "var(--err)" } : {}) },
  });

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 18, position: "relative" }}>
      <FormGuard />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" style={labelStyle}>Name</label>
          <input required autoComplete="name" placeholder="Jane Doe" maxLength={200} {...field("name")} />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="contact-company" style={labelStyle}>Company</label>
          <input autoComplete="organization" placeholder="Acme Inc." maxLength={200} {...field("company")} />
          <FieldError id="contact-company-error" message={errors.company} />
        </div>
      </div>
      <div>
        <label htmlFor="contact-email" style={labelStyle}>Email</label>
        <input required type="email" autoComplete="email" placeholder="jane@acme.com" maxLength={254} {...field("email")} />
        <FieldError id="contact-email-error" message={errors.email} />
      </div>
      <div>
        <label htmlFor="contact-message" style={labelStyle}>What do you need?</label>
        <textarea required placeholder="Tell us about the process or product you have in mind..." rows={5} maxLength={5000} {...field("message")} style={{ ...field("message").style, resize: "vertical" }} />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>
      <ConsentCheckbox textColor="var(--text-muted)" error={errors.consent} />
      <FormError message={state.status === "error" ? state.message : undefined} />
      <button type="submit" disabled={pending} style={{ width: "100%", fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, background: "var(--accent)", color: "var(--on-accent)", border: "none", cursor: pending ? "wait" : "pointer", opacity: pending ? 0.7 : 1, boxShadow: "0 0 0 1px var(--accent-line), 0 8px 28px -8px var(--accent)" }}>
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

export default function ContactForm() {
  // Remounting the form clears the action state for "Send another".
  const [formKey, setFormKey] = useState(0);
  return (
    <div style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 14, padding: "28px 26px" }}>
      <Form key={formKey} onReset={() => setFormKey((k) => k + 1)} />
    </div>
  );
}
