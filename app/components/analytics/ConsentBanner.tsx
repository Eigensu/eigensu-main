"use client";

import Link from "next/link";
import { setConsent } from "../../lib/consent";

const BODY = "var(--font-body), 'Instrument Sans', sans-serif";

const btn = {
  fontFamily: BODY,
  fontWeight: 600,
  fontSize: "0.85rem",
  padding: "10px 18px",
  borderRadius: 100,
  cursor: "pointer",
  whiteSpace: "nowrap" as const,
};

/** Small, non-blocking consent banner. The choice is remembered in localStorage. */
export default function ConsentBanner() {
  return (
    <section
      role="region"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 9990,
        maxWidth: 560,
        marginLeft: "auto",
        background: "var(--wine)",
        color: "var(--cream)",
        borderRadius: 16,
        padding: "18px 20px",
        border: "1px solid rgba(251,243,228,0.22)",
        boxShadow: "0 18px 48px -12px rgba(26,7,16,0.55)",
        fontFamily: BODY,
      }}
    >
      <p style={{ fontSize: "0.88rem", lineHeight: 1.6, margin: "0 0 14px" }}>
        We&apos;d like to use cookies to measure how this site is used, so we can improve it. Nothing is set
        unless you accept. See our{" "}
        <Link href="/privacy" style={{ color: "var(--butter)", textDecoration: "underline" }}>
          privacy policy
        </Link>
        .
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={() => setConsent("denied")}
          style={{ ...btn, background: "transparent", color: "var(--cream)", border: "1px solid rgba(251,243,228,0.45)" }}
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => setConsent("granted")}
          style={{ ...btn, background: "var(--ember)", color: "#fff", border: "1px solid var(--ember)" }}
        >
          Accept
        </button>
      </div>
    </section>
  );
}
