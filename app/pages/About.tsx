"use client";

import { useTheme } from "../components/PageShell";
import { ThemeHeroSection } from "../components/ThemeHero";
import { getThemeTokens } from "../lib/themeTokens";

const pillars = [
  {
    title: "Simple systems",
    description: "Technology should reduce friction, not add it. We keep architecture clear, reliable, and purpose-built.",
  },
  {
    title: "Long-term partnership",
    description: "We prioritize honest communication, iterative delivery, and a working relationship that survives beyond launch day.",
  },
  {
    title: "Business-first thinking",
    description: "Every solution is designed around the actual challenge, the users it serves, and the value it needs to create.",
  },
];

const milestones = [
  { value: "2018", label: "Founded" },
  { value: "Fortune 500", label: "Trusted by" },
  { value: "End-to-end", label: "Delivery style" },
];

export default function AboutPage() {
  const { theme } = useTheme();
  const t = getThemeTokens(theme);

  return (
    <div className="min-h-screen" style={{ transition: "background 0.65s ease" }}>
      <ThemeHeroSection contentClassName="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div
              className="hero-anim-2 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em]"
              style={{ borderColor: t.border, color: t.accent, background: t.accentSoft }}
            >
              About eigensu
            </div>
            <h1 className="hero-anim-3 mt-6 max-w-3xl text-4xl leading-none tracking-tight md:text-5xl lg:text-6xl xl:text-7xl" style={{ color: t.heading }}>
              Simple, reliable technology built around your business.
            </h1>
            <p className="hero-anim-4 mt-6 max-w-2xl text-base leading-7 md:text-lg" style={{ color: t.body }}>
              We are a team of engineers, designers, and strategists who believe that technology should be simple, reliable, and purpose-built for the problems it aims to solve.
            </p>
          </div>

          <div
            className="hero-anim-5 rounded-[32px] border p-6 md:p-8 lg:p-10"
            style={{
              background: t.panel,
              borderColor: t.border,
              boxShadow: t.isDark ? "0 24px 90px rgba(0,0,0,0.28)" : "0 24px 80px rgba(15,23,42,0.08)",
              backdropFilter: "blur(18px)",
            }}
          >
            <div className="grid gap-4 sm:grid-cols-3">
              {milestones.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border p-5"
                  style={{
                    background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.65)",
                    borderColor: t.border,
                  }}
                >
                  <div className="text-2xl tracking-tight" style={{ color: t.heading }}>
                    {item.value}
                  </div>
                  <div className="mt-1 text-sm" style={{ color: t.muted }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-8 rounded-[28px] border p-5 md:p-6"
              style={{
                background: t.isDark
                  ? "linear-gradient(180deg, rgba(0,200,180,0.08), rgba(255,255,255,0.03))"
                  : "linear-gradient(180deg, rgba(251,191,36,0.10), rgba(255,255,255,0.72))",
                borderColor: t.border,
              }}
            >
              <div className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: t.accent }}>
                Our perspective
              </div>
              <p className="mt-3 text-sm leading-7 md:text-base" style={{ color: t.body }}>
                We don&apos;t just build software—we invest in understanding your business, your challenges, and your vision for the future. That collaboration is what turns good work into lasting value.
              </p>
            </div>
          </div>
        </div>
      </ThemeHeroSection>

      <section
        className="w-full px-4 pb-16 md:px-6 md:pb-24"
        style={{ background: t.contentBg, transition: "background 0.65s ease" }}
      >
        <div className="grid w-full gap-4 md:grid-cols-3 md:gap-6">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className="rounded-[28px] border p-6 md:p-7"
              style={{
                background: t.panel,
                borderColor: t.border,
                boxShadow:
                  index === 1
                    ? t.isDark
                      ? "0 20px 60px rgba(0,0,0,0.18)"
                      : "0 20px 60px rgba(15,23,42,0.05)"
                    : "none",
              }}
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: t.accentSoft, border: `1px solid ${t.border}` }}
              >
                <span className="text-sm font-semibold" style={{ color: t.accent }}>{`0${index + 1}`}</span>
              </div>
              <h2 className="text-xl" style={{ color: t.heading }}>
                {pillar.title}
              </h2>
              <p className="mt-3 text-sm leading-7 md:text-[15px]" style={{ color: t.body }}>
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
