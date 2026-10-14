"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, type CSSProperties, type FormEvent } from "react";
import { submitEnquiry } from "../../actions/enquiry";
import { HONEYPOT_FIELD, INITIAL_ENQUIRY_STATE, STARTED_AT_FIELD, type EnquiryKind } from "../../lib/enquiry";
import { track } from "../../lib/analytics";

/**
 * Submits a form to the enquiry server action. Uses onSubmit rather than the
 * form `action` prop so fields keep their values when validation or delivery fails.
 */
export function useEnquiryForm(kind: EnquiryKind) {
  const [state, dispatch, pending] = useActionState(
    (prev: Parameters<typeof submitEnquiry>[1], formData: FormData) => submitEnquiry(kind, prev, formData),
    INITIAL_ENQUIRY_STATE,
  );
  // Count a lead only once the server confirms delivery, never on click.
  useEffect(() => {
    if (state.status === "success" && state.delivered) track("generate_lead", { form_name: kind });
  }, [state, kind]);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => dispatch(formData));
  };
  return { state, pending, onSubmit, errors: state.fieldErrors ?? {} };
}

/**
 * Hidden fields every enquiry form carries: a honeypot that people never see,
 * the time the form appeared (for the minimum time-to-submit check) and the page path.
 * Values are set after mount so the server render and hydration match.
 */
export function FormGuard() {
  const startedRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
    if (pageRef.current) pageRef.current.value = window.location.pathname;
  }, []);

  return (
    <>
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Leave this field empty
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      {/* No defaultValue: React re-applies it on every re-render, which would wipe the values set below. */}
      <input ref={startedRef} type="hidden" name={STARTED_AT_FIELD} />
      <input ref={pageRef} type="hidden" name="page" />
    </>
  );
}

/** Required consent checkbox linking to the privacy policy. */
export function ConsentCheckbox({
  error,
  textColor,
  linkColor = "var(--accent)",
  errorColor = "var(--err)",
  style,
}: {
  error?: string;
  textColor: string;
  linkColor?: string;
  errorColor?: string;
  style?: CSSProperties;
}) {
  return (
    <div style={style}>
      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 12.5, lineHeight: 1.6, color: textColor }}>
        <input
          type="checkbox"
          name="consent"
          required
          aria-invalid={error ? true : undefined}
          style={{ marginTop: 3, width: 16, height: 16, accentColor: "var(--accent)", flexShrink: 0 }}
        />
        <span>
          I agree that Eigensu may use these details to reply to my enquiry, as described in the{" "}
          <Link href="/privacy" target="_blank" style={{ color: linkColor, textDecoration: "underline" }}>
            privacy policy
          </Link>
          .
        </span>
      </label>
      {error && (
        <p role="alert" style={{ color: errorColor, fontSize: 12, marginTop: 6 }}>
          {error}
        </p>
      )}
    </div>
  );
}

/** Error banner shown when delivery or validation fails. */
export function FormError({ message, style }: { message?: string; style?: CSSProperties }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      style={{
        background: "rgba(240,73,31,0.08)",
        border: "1px solid rgba(240,73,31,0.35)",
        color: "var(--text)",
        borderRadius: 9,
        padding: "10px 14px",
        fontSize: "0.85rem",
        lineHeight: 1.55,
        ...style,
      }}
    >
      {message}
    </p>
  );
}
