"use client";

import { useModal, useTheme } from "./components/PageShell";
import { HeroBadge, ThemeHeroSection } from "./components/ThemeHero";
import { getThemeTokens } from "./lib/themeTokens";

type Theme = "dark" | "light";

function DashboardPreview({ theme }: { theme: Theme }) {
  const isDark = theme === "dark";
  const bg = isDark ? "rgba(14,20,28,0.88)" : "rgba(255,252,245,0.94)";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const shadow = isDark
    ? "0 8px 80px rgba(0,200,180,.10),0 2px 32px rgba(0,0,0,.6)"
    : "0 8px 80px rgba(251,191,36,.18),0 2px 32px rgba(0,0,0,.10)";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const cardBdr = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const rowBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  const txt = isDark ? "#ffffff" : "#0f172a";
  const muted = isDark ? "rgba(255,255,255,0.38)" : "rgba(15,23,42,0.45)";
  const activeRow = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.07)";
  const barFrom = isDark ? "#00c8b4" : "#f59e0b";
  const barTo = isDark ? "#0099cc" : "#fbbf24";
  const filterCls = isDark
    ? { bg: "rgba(0,200,180,0.15)", color: "#2dd4bf", border: "rgba(0,200,180,0.35)" }
    : { bg: "rgba(251,191,36,0.18)", color: "#b45309", border: "rgba(251,191,36,0.45)" };
  const avatarGrad = isDark
    ? "linear-gradient(135deg,#00c8b4,#0099cc)"
    : "linear-gradient(135deg,#fbbf24,#f59e0b)";

  return (
    <div
      className="relative mx-auto mt-16 w-full max-w-4xl overflow-hidden rounded-2xl"
      style={{
        background: bg,
        border: `1px solid ${border}`,
        boxShadow: shadow,
        backdropFilter: "blur(16px)",
        zIndex: 10,
        transform: "perspective(900px) rotateX(4deg)",
        transition: "background 0.5s,box-shadow 0.5s",
      }}
    >
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${cardBdr}` }}>
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-green-400/70" />
        </div>
        <div className="flex items-center gap-2 rounded-lg px-3 py-1.5" style={{ background: rowBg }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" style={{ color: muted }}>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="font-mono text-xs" style={{ color: muted }}>
            Search anything...
          </span>
          <span className="ml-6 font-mono text-xs" style={{ color: muted, opacity: 0.5 }}>
            ⌘K
          </span>
        </div>
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ background: avatarGrad }}
        >
          E
        </div>
      </div>
      <div className="flex">
        <div className="hidden w-44 shrink-0 px-3 py-4 md:block" style={{ borderRight: `1px solid ${cardBdr}` }}>
          {["Insights", "Company", "Transactions", "Cards", "Accounting"].map((label, i) => (
            <div
              key={label}
              className="mb-1 rounded-lg px-3 py-2 text-sm"
              style={{
                background: i === 0 ? activeRow : "transparent",
                color: i === 0 ? txt : muted,
                fontWeight: i === 0 ? 500 : 400,
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="flex-1 p-4">
          <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "Inference calls today", value: "₹1,036", cents: ".62", badge: "+21%", bc: "text-green-500 bg-green-500/15" },
              { label: "Avg latency (ms)", value: "244", cents: ".8", badge: "-0.7%", bc: "text-red-500 bg-red-500/15" },
              { label: "Potential savings", value: "₹1,870", cents: ".00", badge: null, bc: "" },
              { label: "Monthly spend", value: "72%", cents: "", badge: "↑", bc: "text-orange-500 bg-orange-500/15" },
            ].map((c, i) => {
              const progressWidths = ["55.4%", "47.2%", "70.1%", "49.0%"];
              return (
                <div key={c.label} className="rounded-xl p-3" style={{ background: cardBg, border: `1px solid ${cardBdr}` }}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs" style={{ color: muted }}>
                      {c.label}
                    </span>
                    {c.badge && <span className={`rounded-md px-1.5 py-0.5 text-xs font-medium ${c.bc}`}>{c.badge}</span>}
                  </div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-lg font-semibold" style={{ color: txt }}>
                      {c.value}
                    </span>
                    <span className="text-xs" style={{ color: muted }}>
                      {c.cents}
                    </span>
                  </div>
                  <div
                    className="mt-2 h-1 overflow-hidden rounded-full"
                    style={{ background: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.06)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: progressWidths[i],
                        backgroundImage: `linear-gradient(to right,${barFrom},${barTo})`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex items-center gap-3">
            {["Last 4 weeks", "Jun 8 – Jul 5"].map((t) => (
              <div key={t} className="rounded-lg px-3 py-1.5 text-xs" style={{ background: cardBg, color: muted }}>
                {t}
              </div>
            ))}
            <div className="ml-auto flex items-center gap-2">
              {["Daily", "Weekly"].map((t) => (
                <span key={t} className="cursor-pointer rounded-md px-2 py-1 text-xs" style={{ color: muted }}>
                  {t}
                </span>
              ))}
              <span
                className="cursor-pointer rounded-md border px-2 py-1 text-xs font-medium"
                style={{
                  background: filterCls.bg,
                  color: filterCls.color,
                  borderColor: filterCls.border,
                }}
              >
                Filter
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { theme } = useTheme();
  const { openModal } = useModal();
  const tokens = getThemeTokens(theme);
  const isDark = tokens.isDark;

  const secBg = isDark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)";
  const secBdr = isDark ? "rgba(255,255,255,.15)" : "rgba(0,0,0,.12)";
  const secTxt = isDark ? "rgba(255,255,255,.80)" : "rgba(15,23,42,.70)";

  return (
    <ThemeHeroSection fullScreen align="center" contentClassName="pb-0 mt-14">
      <HeroBadge className="mb-8">Building the future of enterprise IT</HeroBadge>

      <h1
        className="hero-anim-3 mb-6 text-4xl leading-tight tracking-tight md:text-6xl lg:text-7xl"
        style={{ letterSpacing: "0.02em", color: tokens.heading }}
      >
        <span>Enterprise-grade IT,</span>
        <br />
        <span>delivered without friction.</span>
      </h1>

      <p className="hero-anim-4 mb-10 max-w-xl text-base leading-relaxed md:text-lg" style={{ color: tokens.body }}>
        From cloud and security to managed services—Eigensu keeps your stack fast, safe, and scalable.
      </p>

      <div className="hero-anim-4 mb-4 flex flex-col items-center gap-3 sm:flex-row">
        <button
          className="btn-pri rounded-lg px-8 py-3.5 text-base font-semibold text-white transition-all duration-200"
          style={{ background: tokens.priGrad, boxShadow: tokens.priShadow }}
        >
          Get started
        </button>
        <button
          className="btn-sec rounded-lg px-8 py-3.5 text-base font-medium transition-all duration-200"
          style={{ background: secBg, border: `1px solid ${secBdr}`, color: secTxt }}
          onClick={openModal}
        >
          Book a demo
        </button>
      </div>

      <div className="hero-anim-5 w-full max-w-5xl px-4">
        <DashboardPreview theme={theme} />
      </div>

      <style>{`
        .btn-pri:hover{transform:scale(1.04)!important}
        .btn-sec:hover{transform:scale(1.04)!important;background:rgba(255,255,255,.10)!important}
      `}</style>
    </ThemeHeroSection>
  );
}
