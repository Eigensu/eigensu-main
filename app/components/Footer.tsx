"use client";

import Link from "next/link";
import { useTheme } from "./PageShell";

const NAV_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Our process", href: "/process" },
      { label: "Case studies", href: "/cases" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter / X", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
];

const LEGAL_LINKS = ["Privacy policy", "Terms of service", "Cookie settings"];

function IconMail() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1 4l6 4.5L13 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Each letter: filled=solid accent, outline=stroke only (matching the reference image style)
const BREAKER_LETTERS: { char: string; filled: boolean }[] = [
  { char: "E", filled: false },
  { char: "I", filled: true  },
  { char: "G", filled: false },
  { char: "E", filled: true  },
  { char: "N", filled: false },
  { char: "S", filled: false },
  { char: "U", filled: true  },
];

function FooterBreaker({ isDark }: { isDark: boolean }) {
  const bg     = isDark ? "#060d12" : "#f5f0e8";
  const accent = isDark ? "#00c8b4" : "#f59e0b";

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden select-none"
      style={{
        background: bg,
        // Fixed height so letters bleed top+bottom — framed like the reference
        height: "clamp(110px, 16vw, 200px)",
        transition: "background 0.65s ease",
      }}
    >
      {/*
        The trick: letters are MUCH taller than the container.
        We centre them vertically so the top and bottom are clipped,
        leaving only the middle band visible — exactly like the reference.
      */}
      <div
        className="absolute inset-0 flex items-center justify-between"
        style={{ padding: "0" }}
      >
        {BREAKER_LETTERS.map(({ char, filled }, index) => (
          <span
            key={`${char}-${index}`}
            className="flex-1 text-center leading-none"
            style={{
              fontFamily: "var(--font-bebas), 'Arial Narrow', Impact, sans-serif",
              // Much taller than the wrapper — bleeds top & bottom
              fontSize: "clamp(14rem, 30vw, 30rem)",
              lineHeight: 1,
              color: filled ? accent : "transparent",
              WebkitTextStroke: filled ? "0" : `2px ${accent}`,
              paintOrder: "stroke fill",
              // Slight negative margin creates letter overlap
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

export default function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const t = {
    pageBg:        isDark ? "#020608"                     : "#ffffff",
    ctaSectionBg:  isDark ? "#0b1520"                     : "#f8fafc",
    ctaCardBg:     isDark ? "rgba(255,255,255,0.04)"      : "#ffffff",
    btnBg:         isDark ? "rgba(255,255,255,0.06)"      : "#f8fafc",

    sectionBorder: isDark ? "rgba(255,255,255,0.07)"      : "rgba(15,23,42,0.08)",
    cardBorder:    isDark ? "rgba(255,255,255,0.08)"      : "rgba(15,23,42,0.08)",
    btnBorder:     isDark ? "rgba(255,255,255,0.12)"      : "rgba(15,23,42,0.12)",
    divider:       isDark ? "rgba(255,255,255,0.07)"      : "rgba(15,23,42,0.08)",

    textPrimary:   isDark ? "#f1f5f9"                     : "#0f172a",
    textMuted:     isDark ? "rgba(241,245,249,0.55)"      : "rgba(15,23,42,0.55)",
    textFaint:     isDark ? "rgba(241,245,249,0.30)"      : "rgba(15,23,42,0.35)",
    textDimmer:    isDark ? "rgba(241,245,249,0.28)"      : "rgba(15,23,42,0.35)",

    badgeBorder:   isDark ? "rgba(29,158,117,0.35)"       : "rgba(15,118,110,0.25)",
    badgeBg:       isDark ? "rgba(29,158,117,0.08)"       : "#f0fdf9",
    badgeText:     isDark ? "#5DCAA5"                     : "#0F6E56",
    dotGrid:       isDark
      ? "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)"
      : "radial-gradient(circle, rgba(15,23,42,0.06) 1px, transparent 1px)",
  };

  return (
    <>
      {/* spacer bridge */}
      <div
        className="px-4 md:px-10 pt-10 pb-0 transition-colors duration-500"
        style={{ background: t.pageBg }}
      />

      {/* ══ CTA SECTION ════════════════════════════════════════ */}
      <section
        aria-label="Call to action"
        className="relative w-full overflow-hidden transition-colors duration-500"
        style={{
          background: t.ctaSectionBg,
          // Sharp corners — no border-radius
          border: `0.5px solid ${t.sectionBorder}`,
          borderRadius: 0,
        }}
      >
        {/* dot-grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: t.dotGrid, backgroundSize: "24px 24px" }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-8 py-16 md:px-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">

            {/* left copy */}
            <div>
              {/* No line break, no curves — plain straight heading */}
              <h2
                className="text-4xl md:text-5xl"
                style={{
                  color: t.textPrimary,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.18,
                }}
              >
                Ready for a website that actually works?
              </h2>

              <p className="mt-5 max-w-md text-base leading-7" style={{ color: t.textMuted }}>
                Tell us about your project. We respond quickly, and we&apos;ll tell
                you straight whether we&apos;re the right fit.
              </p>
            </div>

            {/* right card */}
            <div
              className="rounded-2xl p-7"
              style={{ background: t.ctaCardBg, border: `0.5px solid ${t.cardBorder}` }}
            >
              <p className="text-sm leading-7" style={{ color: t.textMuted }}>
                We build systems for teams that want clear communication, fast
                delivery, and long-term reliability — not just a vendor.
              </p>

              <button
                type="button"
                onClick={onOpenModal}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-all duration-150 hover:opacity-80 active:scale-[0.98]"
                style={{ color: t.textPrimary, background: t.btnBg, borderColor: t.btnBorder }}
              >
                <IconArrow />
                Start a conversation
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ══ BREAKER — framed like reference image ══════════════ */}
      <FooterBreaker isDark={isDark} />

      {/* ══ FOOTER BOTTOM ══════════════════════════════════════ */}
      <footer
        className="transition-colors duration-500"
        style={{ background: t.pageBg }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-14 md:py-16">

          {/* 4-column grid */}
          <div className="mb-12 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">

            {/* brand */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="mb-2 text-base" style={{ color: t.textPrimary }}>
                eigensu<span style={{ color: "#1D9E75" }}>.in</span>
              </h3>
              <p className="mb-4 text-sm leading-6" style={{ color: t.textMuted }}>
                Enterprise-grade IT solutions,
                <br />
                built for teams that move fast.
              </p>
              <a
                href="mailto:hello@eigensu.in"
                className="inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
                style={{ color: t.textMuted }}
              >
                <IconMail />
                hello@eigensu.in
              </a>
            </div>

            {/* nav columns */}
            {NAV_COLUMNS.map((col) => (
              <div key={col.heading}>
                <h4
                  className="mb-4 text-xs font-medium uppercase tracking-widest"
                  style={{ color: t.textFaint }}
                >
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm transition-opacity hover:opacity-70"
                        style={{ color: t.textMuted }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* divider */}
          <div style={{ height: "0.5px", background: t.divider, marginBottom: "20px" }} />

          {/* bottom bar */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-xs" style={{ color: t.textDimmer }}>
              &copy; {new Date().getFullYear()} eigensu.in. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-5">
              {LEGAL_LINKS.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs transition-opacity hover:opacity-70"
                  style={{ color: t.textDimmer }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}