import type { Metadata } from "next";
import Link from "next/link";
import { ThemeHeroSection } from "./components/ThemeHero";
import { PRODUCT } from "./lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";
const BODY = "var(--font-body), 'Instrument Sans', sans-serif";

const LINKS = [
  { href: "/", label: "Home", primary: true },
  { href: PRODUCT.path, label: PRODUCT.name, primary: false },
  { href: "/contact", label: "Contact us", primary: false },
];

export default function NotFound() {
  return (
    <ThemeHeroSection>
      <div style={{ fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>
        Error 404
      </div>
      <h1 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(2rem,5vw,3.8rem)", lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--text)", maxWidth: "16ch", margin: "0 0 20px" }}>
        We couldn&apos;t find <span style={{ color: "var(--accent)" }}>that page</span>.
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "48ch", lineHeight: 1.7, marginBottom: 32 }}>
        The link may be old or mistyped. These will get you back on track:
      </p>
      <nav aria-label="Helpful links" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              display: "inline-flex", alignItems: "center", fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, textDecoration: "none",
              ...(l.primary
                ? { background: "var(--accent)", color: "var(--on-accent)" }
                : { color: "var(--text)", border: "1px solid var(--border-strong)" }),
            }}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </ThemeHeroSection>
  );
}
