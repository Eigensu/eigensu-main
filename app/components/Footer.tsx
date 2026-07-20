"use client";

import Link from "next/link";

const SOLUTIONS_LINKS = [
  { label: "Operations Automation", href: "/services" },
  { label: "Internal Tooling",      href: "/services" },
  { label: "Systems Integration",   href: "/services" },
];

const COMPANY_LINKS = [
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/contact" },
];

const CONNECT_LINKS = [
  { label: "LinkedIn",   href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "GitHub",     href: "#" },
];

const BREAKER_LETTERS: { char: string; filled: boolean }[] = [
  { char: "E", filled: false },
  { char: "I", filled: true  },
  { char: "G", filled: false },
  { char: "E", filled: true  },
  { char: "N", filled: false },
  { char: "S", filled: false },
  { char: "U", filled: true  },
];

function FooterBreaker() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden select-none"
      style={{
        background: "var(--bg)",
        height: "clamp(110px, 16vw, 200px)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-between">
        {BREAKER_LETTERS.map(({ char, filled }, index) => (
          <span
            key={`${char}-${index}`}
            className="flex-1 text-center leading-none"
            style={{
              fontFamily: "var(--font-logo), 'Montserrat', sans-serif",
              fontSize: "clamp(14rem, 30vw, 30rem)",
              lineHeight: 1,
              color: filled ? "var(--accent)" : "transparent",
              WebkitTextStroke: filled ? "0" : "2px var(--accent)",
              paintOrder: "stroke fill",
              marginLeft: index === 0 ? 0 : "-0.04em",
              zIndex: filled ? 2 : 1,
              position: "relative",
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  const border    = "var(--border)";
  const textMuted = "var(--text-muted)";
  const textDim   = "var(--text-dim)";
  const textPri   = "var(--text)";
  const dotGrid   = "radial-gradient(circle, var(--border) 1px, transparent 1px)";

  return (
    <>
      {/* CTA section */}
      <section
        className="relative w-full overflow-hidden"
        style={{ background: "var(--bg-elev-2)", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: dotGrid, backgroundSize: "24px 24px" }}
        />
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-head), 'Sora', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.18,
                  color: textPri,
                  maxWidth: "18ch",
                }}
              >
                Tell us what&apos;s slowing your operation down.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7" style={{ color: textMuted }}>
                We&apos;ll map it, scope it, and show you what automating it looks like — usually within a week.
              </p>
            </div>
            <div
              className="rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${border}` }}
            >
              <p className="text-sm leading-7" style={{ color: textMuted }}>
                We build systems for teams that want clear communication, fast delivery, and long-term reliability — not just a vendor.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/onboard"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "var(--accent)",
                    color: "var(--on-accent)",
                    fontFamily: "var(--font-body), 'Hanken Grotesk', sans-serif",
                    boxShadow: "0 0 0 1px var(--accent-line), 0 8px 30px -8px var(--accent)",
                  }}
                >
                  Onboard a project
                </Link>
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:opacity-80"
                  style={{
                    color: textPri,
                    borderColor: "rgba(255,255,255,0.16)",
                    fontFamily: "var(--font-body), 'Hanken Grotesk', sans-serif",
                  }}
                >
                  <IconArrow />
                  Book a call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breaker */}
      <FooterBreaker />

      {/* Footer bottom */}
      <footer style={{ background: "var(--bg)", borderTop: `1px solid ${border}` }}>
        <div className="mx-auto max-w-[1200px] px-6 py-14 md:py-16">
          <div className="mb-12 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">

            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div
                className="mb-3 inline-flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-logo), 'Montserrat', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: textPri,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
                EIGENSU
              </div>
              <p className="mb-4 text-sm leading-6" style={{ color: textMuted }}>
                Tailored systems and products for internal management and operations optimisation.
              </p>
              <a
                href="mailto:hello@eigensu.in"
                className="text-sm transition-opacity hover:opacity-70"
                style={{ color: textMuted }}
              >
                hello@eigensu.in
              </a>
            </div>

            {/* Solutions */}
            <div>
              <h5
                className="mb-4 text-xs uppercase tracking-[2px]"
                style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace", color: textDim }}
              >
                Solutions
              </h5>
              <ul className="flex flex-col gap-2.5">
                {SOLUTIONS_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm transition-opacity hover:opacity-70" style={{ color: textMuted }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h5
                className="mb-4 text-xs uppercase tracking-[2px]"
                style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace", color: textDim }}
              >
                Company
              </h5>
              <ul className="flex flex-col gap-2.5">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm transition-opacity hover:opacity-70" style={{ color: textMuted }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h5
                className="mb-4 text-xs uppercase tracking-[2px]"
                style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace", color: textDim }}
              >
                Connect
              </h5>
              <ul className="flex flex-col gap-2.5">
                {CONNECT_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm transition-opacity hover:opacity-70" style={{ color: textMuted }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "0.5px", background: border, marginBottom: 20 }} />

          {/* Bottom bar */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p
              className="text-xs"
              style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace", color: textDim }}
            >
              &copy; {new Date().getFullYear()} Eigensu. All rights reserved.
            </p>
            <span
              className="inline-flex items-center gap-2 text-xs"
              style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace", color: textMuted }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--ok)",
                  boxShadow: "0 0 10px var(--ok)",
                  animation: "footerPulse 2s infinite",
                }}
              />
              All systems operational
            </span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes footerPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56,232,176,0.5); }
          70%       { box-shadow: 0 0 0 8px rgba(56,232,176,0); }
        }
      `}</style>
    </>
  );
}
