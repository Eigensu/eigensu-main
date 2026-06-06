"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../components/PageShell";
import { ThemeHeroSection } from "../components/ThemeHero";
import { getThemeTokens } from "../lib/themeTokens";

// ── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  icon: string;
  title: string;
  body: string;
  tag: string;
}

interface Integration {
  label: string;
  live: boolean;
}

interface FunnelRow {
  label: string;
  val: number;
  pct: number;
}

// ── Static data ──────────────────────────────────────────────────────────────

const FEATURES: Feature[] = [
  {
    icon: "📊",
    title: "Unified intelligence dashboard",
    body: "Aggregate data from Swiggy, Zomato, and direct POS into one view. Compare channel performance, identify top guests, and spot retention gaps in real time.",
    tag: "Swiggy · Zomato · POS",
  },
  {
    icon: "💬",
    title: "WhatsApp bulk campaigns",
    body: "Send targeted broadcasts to VIP tiers, cuisine preferences, or lapsed guests. Rich media, CTAs, and personalisation — all through the Meta Business API.",
    tag: "Meta API · Segmentation",
  },
  {
    icon: "🤖",
    title: "Automated guest interactions",
    body: "Webhook-powered auto-replies handle reservation queries, menu FAQs, and post-visit follow-ups. Respond instantly at any hour without extra staff.",
    tag: "Webhooks · Auto-reply",
  },
  {
    icon: "🏪",
    title: "Cross-brand loyalty",
    body: "Track guest behaviour across every sister venue in your hospitality group. One unified profile — one loyalty programme — multiple restaurants.",
    tag: "Multi-venue · Loyalty",
  },
  {
    icon: "🧠",
    title: "AI churn prediction",
    body: "Machine learning flags at-risk regulars before they leave. Automated retention offers trigger the moment churn probability crosses your threshold.",
    tag: "AI · Retention",
  },
  {
    icon: "🎯",
    title: "Guest segmentation engine",
    body: "Slice your database by visit frequency, average spend, platform origin, or dish preference. Build segments in minutes, not spreadsheets.",
    tag: "Segments · Filters",
  },
];

const FLOW_STEPS = [
  { num: "01", title: "Connect sources", body: "Link Swiggy, Zomato, and your POS. Guest data flows in automatically." },
  { num: "02", title: "Build segments", body: "Filter by spend, frequency, platform, or loyalty tier in seconds." },
  { num: "03", title: "Launch campaign", body: "Send a WhatsApp broadcast or set an automated trigger flow." },
  { num: "04", title: "Measure impact", body: "Track reads, replies, conversions, and revenue attribution live." },
];

const FUNNEL: FunnelRow[] = [
  { label: "Total sent",   val: 45941, pct: 100  },
  { label: "Delivered",    val: 33700, pct: 73.3 },
  { label: "Opened",       val: 23100, pct: 50.3 },
  { label: "Replied",      val: 8513,  pct: 18.5 },
];

const INTEGRATIONS: Integration[] = [
  { label: "Swiggy",              live: true  },
  { label: "Zomato",              live: true  },
  { label: "WhatsApp Business",   live: true  },
  { label: "Meta Business API",   live: true  },
  { label: "Petpooja POS",        live: false },
  { label: "Posist",              live: false },
  { label: "Dineout",             live: false },
  { label: "EazyDiner",           live: false },
];


// ── Hooks ────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, on };
}

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children, t }: { children: React.ReactNode; t: ReturnType<typeof getThemeTokens> }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="text-[11px] font-medium tracking-[0.16em] uppercase whitespace-nowrap"
        style={{ color: t.accent }}
      >
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: t.border }} />
    </div>
  );
}

function FeatureCard({ feature, t }: { feature: Feature; t: ReturnType<typeof getThemeTokens> }) {
  return (
    <div
      className="rounded-2xl border p-7 flex flex-col gap-4 transition-colors duration-200 hover:border-current"
      style={{ background: t.panel, borderColor: t.border }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
        style={{ background: t.accentSoft, border: `1px solid ${t.border}` }}
      >
        {feature.icon}
      </div>
      <div>
        <h3 className="font-heading text-xl leading-tight mb-2" style={{ color: t.heading }}>
          {feature.title}
        </h3>
        <p className="text-[13.5px] leading-relaxed" style={{ color: t.body }}>
          {feature.body}
        </p>
      </div>
      <span
        className="mt-auto self-start text-[11px] font-medium tracking-wide px-3 py-1 rounded-full border"
        style={{ color: t.accent, background: t.accentSoft, borderColor: t.border }}
      >
        {feature.tag}
      </span>
    </div>
  );
}

function FunnelChart({ t }: { t: ReturnType<typeof getThemeTokens> }) {
  const { ref, on } = useReveal(0.2);
  const isDark = t.isDark;

  const barColors = isDark
    ? ["#0f2838", "#123040", "#0f3d4a", "#00c8b4"]
    : ["#1e3a5f", "#2563eb", "#0ea5e9", "#0284c7"];

  return (
    <div ref={ref} className="rounded-2xl border p-8 mb-12" style={{ background: t.panel, borderColor: t.border }}>
      <h3 className="font-heading text-xl md:text-2xl leading-tight mb-1" style={{ color: t.heading }}>
        Where guests drop off — and where you win them back
      </h3>
      <p className="text-[13px] mb-7" style={{ color: t.muted }}>
        Sample metrics from a 97-campaign account
      </p>
      <div className="flex flex-col gap-3">
        {FUNNEL.map((row, i) => (
          <div key={row.label} className="flex items-center gap-4">
            <span className="text-[13px] text-right w-24 shrink-0" style={{ color: t.body }}>
              {row.label}
            </span>
            <div className="flex-1 h-9 rounded overflow-hidden" style={{ background: t.accentSoft }}>
              <div
                className="h-full rounded flex items-center pl-3 text-[12px] font-medium text-white whitespace-nowrap"
                style={{
                  width: on ? `${row.pct}%` : "0%",
                  background: barColors[i],
                  transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                }}
              >
                {on ? row.val.toLocaleString() : ""}
              </div>
            </div>
            <span className="text-[13px] font-medium w-14 shrink-0" style={{ color: t.heading }}>
              {row.pct.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const DEMO_SLIDES = ["/dispatch1.jpeg", "/dispatch2.jpeg"];

function DemoSlideshow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    setIndex(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, DEMO_SLIDES.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border shadow-2xl"
        style={{ background: "#0a0e14", borderColor: "rgba(255,255,255,0.12)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close demo"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border text-sm"
          style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" }}
        >
          ✕
        </button>

        <div className="relative aspect-[16/10] w-full bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DEMO_SLIDES[index]}
            alt={`DishPatch demo slide ${index + 1}`}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex items-center justify-between gap-4 border-t px-4 py-3" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(i - 1, 0))}
            disabled={index === 0}
            className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-30"
            style={{ borderColor: "rgba(255,255,255,0.15)", color: "#fff" }}
          >
            ← Prev
          </button>
          <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
            {index + 1} / {DEMO_SLIDES.length}
          </span>
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(i + 1, DEMO_SLIDES.length - 1))}
            disabled={index === DEMO_SLIDES.length - 1}
            className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-30"
            style={{ borderColor: "rgba(255,255,255,0.15)", color: "#fff" }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DispatchPage() {
  const { theme } = useTheme();
  const t = getThemeTokens(theme);
  const isDark = t.isDark;
  const [demoOpen, setDemoOpen] = useState(false);

  const heroBg = isDark ? "rgba(10,14,20,0.96)" : "rgba(15,23,42,0.96)";
  const brandBlue = t.accent;

  const { ref: heroRef, on: heroOn } = useReveal(0.05);

  return (
    <div className="min-h-screen" style={{ transition: "background 0.65s ease" }}>

      {/* ── Hero ── */}
      <ThemeHeroSection contentClassName="mx-auto w-full max-w-6xl px-6 !pt-[calc(var(--page-offset-top)+0.5rem)]">
        <div
          ref={heroRef}
          className="w-full rounded-[24px] p-8 md:p-12 relative overflow-hidden"
          style={{ background: heroBg }}
        >
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-medium tracking-[0.14em] uppercase mb-5"
            style={{
              borderColor: "rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.6)",
              background: "rgba(255,255,255,0.07)",
            }}
          >
            <span style={{ color: brandBlue }}>●</span>
            Unified guest intelligence
          </div>

          {/* Heading */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-4"
            style={{
              color: "#ffffff",
              opacity: heroOn ? 1 : 0,
              transform: heroOn ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s ease 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Own your guests.<br />
            <span style={{ color: brandBlue }}>Skip the middleman.</span>
          </h1>

          {/* Sub */}
          <p
            className="text-[16px] leading-relaxed max-w-lg mb-9"
            style={{
              color: "rgba(255,255,255,0.6)",
              opacity: heroOn ? 1 : 0,
              transition: "opacity 0.9s ease 0.2s",
            }}
          >
            DishPatch consolidates your Swiggy, Zomato, and dine-in data into one platform —
            then turns it into direct WhatsApp revenue, automated loyalty, and zero-aggregator dependency.
          </p>

          {/* CTAs */}
          <div
            className="flex gap-3 flex-wrap mb-12"
            style={{ opacity: heroOn ? 1 : 0, transition: "opacity 0.9s ease 0.3s" }}
          >
            <button
              className="px-6 py-3 rounded-xl text-[14px] flex items-center gap-2 border transition-colors duration-200"
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.75)",
                borderColor: "rgba(255,255,255,0.2)",
              }}
            >
              ▷ Watch demo
            </button>
          </div>

          {/* Stats */}
          <div
            className="flex gap-10 flex-wrap pt-9 border-t"
            style={{
              borderColor: "rgba(255,255,255,0.12)",
              opacity: heroOn ? 1 : 0,
              transition: "opacity 0.9s ease 0.4s",
            }}
          >
            {[
              { num: "3×",    label: "Higher read rate vs email" },
              { num: "45K+",  label: "Messages sent daily"       },
              { num: "73%",   label: "Avg effective reach"       },
              { num: "14+",   label: "Multi-brand clients"       },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-medium text-white leading-none">{s.num}</div>
                <div className="text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ThemeHeroSection>

      {/* ── Main content ── */}
      <section
        className="w-full px-4 md:px-6 pb-20"
        style={{ background: t.contentBg, transition: "background 0.65s ease" }}
      >
        <div className="mx-auto max-w-6xl">

          {/* Features */}
          <div className="pt-16 mb-12">
            <SectionLabel t={t}>Core features</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl leading-tight mb-3" style={{ color: t.heading }}>
              Everything you need to own the guest relationship
            </h2>
            <p className="text-[15px] max-w-xl mb-10" style={{ color: t.body }}>
              Four pillars that replace fragmented tools with a single, owned channel.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((f) => (
                <FeatureCard key={f.title} feature={f} t={t} />
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="mb-12">
            <SectionLabel t={t}>How it works</SectionLabel>
            <div
              className="rounded-2xl border p-8 md:p-10"
              style={{ background: t.panel, borderColor: t.border }}
            >
              <h2 className="font-heading text-2xl md:text-3xl leading-tight mb-2" style={{ color: t.heading }}>
                From data to direct revenue in four steps
              </h2>
              <p className="text-[14px] mb-8" style={{ color: t.body }}>
                The complete guest engagement loop — automated end to end.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {FLOW_STEPS.map((step, i) => (
                  <div key={step.num} className="flex flex-col gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-medium border-[1.5px]"
                      style={{
                        background: t.accentSoft,
                        borderColor: brandBlue,
                        color: brandBlue,
                      }}
                    >
                      {step.num}
                    </div>
                    <h4 className="font-heading text-lg leading-tight" style={{ color: t.heading }}>
                      {step.title}
                    </h4>
                    <p className="text-[13px] leading-relaxed" style={{ color: t.muted }}>
                      {step.body}
                    </p>
                    {i < FLOW_STEPS.length - 1 && (
                      <div
                        className="hidden md:block absolute"
                        style={{ /* connector — handled by grid gap */ }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Funnel */}
          <div className="mb-12">
            <SectionLabel t={t}>Engagement funnel</SectionLabel>
            <FunnelChart t={t} />
          </div>

          {/* Integrations */}
          <div className="mb-12">
            <SectionLabel t={t}>Integrations</SectionLabel>
            <h2 className="font-heading text-2xl md:text-3xl leading-tight mb-2" style={{ color: t.heading }}>
              Connects to where your guests already are
            </h2>
            <p className="text-[15px] mb-6" style={{ color: t.body }}>
              Live integrations ship today. Priority roadmap items marked below.
            </p>
            <div className="flex flex-wrap gap-3">
              {INTEGRATIONS.map((integ) => (
                <div
                  key={integ.label}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl border text-[13px] font-medium transition-colors duration-150"
                  style={{
                    background: t.panel,
                    borderColor: t.border,
                    color: integ.live ? t.heading : t.muted,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: integ.live ? brandBlue : t.muted }}
                  />
                  {integ.label}
                  {!integ.live && (
                    <span className="text-[11px]" style={{ color: t.muted }}>
                      Soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}