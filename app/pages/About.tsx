"use client";

import { useTheme } from "../components/PageShell";

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
  const isDark = theme === "dark";

  const background = isDark
    ? "radial-gradient(1200px 600px at 10% 10%, rgba(0,200,180,0.18), transparent 45%), radial-gradient(900px 500px at 90% 0%, rgba(0,153,204,0.12), transparent 40%), linear-gradient(180deg,#050b10 0%,#020608 100%)"
    : "radial-gradient(1200px 600px at 10% 10%, rgba(251,191,36,0.18), transparent 45%), radial-gradient(900px 500px at 90% 0%, rgba(245,158,11,0.10), transparent 40%), linear-gradient(180deg,#fffaf0 0%,#fff7e8 100%)";

  const panel = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.82)";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const heading = isDark ? "#ffffff" : "#0f172a";
  const body = isDark ? "rgba(255,255,255,0.72)" : "rgba(15,23,42,0.72)";
  const muted = isDark ? "rgba(255,255,255,0.46)" : "rgba(15,23,42,0.52)";
  const accent = isDark ? "#00c8b4" : "#f59e0b";
  const accentSoft = isDark ? "rgba(0,200,180,0.12)" : "rgba(245,158,11,0.12)";

  return (
    <main className="min-h-screen" style={{ background, transition: "background 0.65s ease" }}>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em]"
              style={{ borderColor: border, color: accent, background: accentSoft }}
            >
              About eigensu
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl" style={{ color: heading }}>
              Simple, reliable technology built around your business.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 md:text-lg" style={{ color: body }}>
              We are a team of engineers, designers, and strategists who believe that technology should be simple, reliable, and purpose-built for the problems it aims to solve.
            </p>
          </div>

          <div className="rounded-[32px] border p-6 md:p-8 lg:p-10" style={{ background: panel, borderColor: border, boxShadow: isDark ? "0 24px 90px rgba(0,0,0,0.28)" : "0 24px 80px rgba(15,23,42,0.08)", backdropFilter: "blur(18px)" }}>
            <div className="grid gap-4 sm:grid-cols-3">
              {milestones.map((item) => (
                <div key={item.label} className="rounded-2xl border p-5" style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.65)", borderColor: border }}>
                  <div className="text-2xl font-semibold tracking-tight" style={{ color: heading }}>
                    {item.value}
                  </div>
                  <div className="mt-1 text-sm" style={{ color: muted }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border p-5 md:p-6" style={{ background: isDark ? "linear-gradient(180deg, rgba(0,200,180,0.08), rgba(255,255,255,0.03))" : "linear-gradient(180deg, rgba(251,191,36,0.10), rgba(255,255,255,0.72))", borderColor: border }}>
              <div className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: accent }}>
                Our perspective
              </div>
              <p className="mt-3 text-sm leading-7 md:text-base" style={{ color: body }}>
                We don&apos;t just build software—we invest in understanding your business, your challenges, and your vision for the future. That collaboration is what turns good work into lasting value.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <article key={pillar.title} className="rounded-[28px] border p-6 md:p-7" style={{ background: panel, borderColor: border, boxShadow: index === 1 ? (isDark ? "0 20px 60px rgba(0,0,0,0.18)" : "0 20px 60px rgba(15,23,42,0.05)") : "none" }}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: accentSoft, border: `1px solid ${border}` }}>
                <span className="text-sm font-semibold" style={{ color: accent }}>{`0${index + 1}`}</span>
              </div>
              <h2 className="text-xl font-semibold" style={{ color: heading }}>
                {pillar.title}
              </h2>
              <p className="mt-3 text-sm leading-7 md:text-[15px]" style={{ color: body }}>
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
