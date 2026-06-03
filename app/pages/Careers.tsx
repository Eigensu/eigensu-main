"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../components/PageShell";
import { ThemeHeroSection } from "../components/ThemeHero";
import { getThemeTokens } from "../lib/themeTokens";

const proficiencyOptions = ["1", "2", "3", "4", "5"];
const experienceOptions = ["Beginner", "Intermediate", "Advanced", "Expert"];
const availabilityOptions = ["Immediately", "Within 1 week", "Within 2 weeks", "Within 1 month"];
const hoursOptions = ["Part-time (20 hrs)", "Full-time (40 hrs)"];
const aiTools = ["Cursor", "GitHub Copilot", "Supermaven", "Windsurf", "Other"];

function fieldSurface(isDark: boolean) {
  return {
    background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.78)",
    borderColor: isDark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.10)",
    color: isDark ? "#ffffff" : "#0f172a",
    colorScheme: isDark ? "dark" : "light",
  } as const;
}

function DropdownField({
  label,
  placeholder,
  options,
  isDark,
  labelColor,
  borderColor,
  surfaceColor,
  textColor,
  mutedColor,
}: {
  label: string;
  placeholder: string;
  options: string[];
  isDark: boolean;
  labelColor: string;
  borderColor: string;
  surfaceColor: string;
  textColor: string;
  mutedColor: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <label className="space-y-2">
      <span className="text-sm font-medium" style={{ color: labelColor }}>
        {label}
      </span>
      <div ref={rootRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((c) => !c)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 text-left text-sm outline-none transition"
          style={{
            background: surfaceColor,
            borderColor,
            color: textColor,
            boxShadow: open ? `0 0 0 2px ${isDark ? "rgba(0,200,180,0.18)" : "rgba(245,158,11,0.18)"}` : "none",
          }}
        >
          <span style={{ color: value ? textColor : mutedColor }}>{value || placeholder}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={mutedColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {open && (
          <div
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-2xl border shadow-2xl"
            style={{ background: isDark ? "#0f141a" : "rgba(255,255,255,0.98)", borderColor }}
          >
            <button
              type="button"
              className="w-full px-4 py-3 text-left text-sm"
              style={{ color: mutedColor, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(15,23,42,0.02)" }}
              onClick={() => { setValue(""); setOpen(false); }}
            >
              {placeholder}
            </button>
            {options.map((option) => {
              const selected = option === value;
              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className="w-full px-4 py-3 text-left text-sm transition"
                  style={{
                    color: textColor,
                    background: selected ? (isDark ? "rgba(0,200,180,0.14)" : "rgba(245,158,11,0.12)") : "transparent",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = selected ? (isDark ? "rgba(0,200,180,0.14)" : "rgba(245,158,11,0.12)") : "transparent"; }}
                  onClick={() => { setValue(option); setOpen(false); }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </label>
  );
}

// Step indicator
function StepIndicator({ step, isDark, accent, muted }: { step: number; isDark: boolean; accent: string; muted: string }) {
  const steps = ["Basic Info & Links", "Skills & Availability"];
  return (
    <div className="flex items-center gap-3 mb-8">
      {steps.map((label, i) => {
        const active = i + 1 === step;
        const done = i + 1 < step;
        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all"
              style={{
                background: active || done ? accent : isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
                color: active || done ? "#fff" : muted,
              }}
            >
              {done ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span className="text-xs font-medium hidden sm:block" style={{ color: active ? accent : muted }}>
              {label}
            </span>
            {i < steps.length - 1 && (
              <div className="ml-2 h-px w-8 md:w-16" style={{ background: isDark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.10)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CareersPage() {
  const { theme } = useTheme();
  const t = getThemeTokens(theme);
  const isDark = t.isDark;

  const [step, setStep] = useState(1);

  const border = t.border;
  const heading = t.heading;
  const body = t.body;
  const muted = t.muted;
  const accent = t.accent;
  const accentSoft = t.accentSoft;
  const panel = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.74)";
  const chipBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.04)";
  const sectionBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.60)";

  // Shared dropdown props
  const dropdownShared = {
    isDark,
    labelColor: body,
    borderColor: border,
    surfaceColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.78)",
    textColor: heading,
    mutedColor: muted,
  };

  // Section label style — replaces font-body/font-heading with a clear sans-serif weight
  const sectionLabel = {
    color: heading,
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
  };

  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <ThemeHeroSection contentClassName="mx-auto w-full max-w-7xl">
        <div
          className="hero-anim-3 relative overflow-hidden rounded-[36px] border px-6 py-12 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:px-10 md:py-16 lg:px-12"
          style={{ background: sectionBg, borderColor: border }}
        >
          <div className="space-y-6 max-w-2xl">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.2em]"
              style={{ borderColor: border, color: accent, background: accentSoft }}
            >
              We&apos;re hiring
            </div>

            <h1 className="text-4xl tracking-tight md:text-5xl lg:text-6xl" style={{ color: heading }}>
              Build the future with Eigensu.
            </h1>
            <p className="text-base leading-7 md:text-lg" style={{ color: body }}>
              We&apos;re looking for talented developers who love building with Next.js, FastAPI, and cutting-edge AI tools — creating enterprise-grade solutions that matter.
            </p>

            <a
              href="#application-form"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${accent}, ${isDark ? "#0099cc" : "#f59e0b"})`,
                boxShadow: isDark ? "0 18px 40px rgba(0,200,180,0.18)" : "0 18px 40px rgba(245,158,11,0.20)",
              }}
            >
              Apply Now
            </a>
          </div>
        </div>
      </ThemeHeroSection>

      {/* ── Application Form ── */}
      <section
        id="application-form"
        className="w-full pb-20 md:pb-28"
        style={{ background: t.contentBg, transition: "background 0.65s ease" }}
      >
        <div
          className="w-full border-y p-6 sm:p-8 md:p-10 lg:px-14 xl:px-20"
          style={{
            background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.78)",
            borderColor: border,
            boxShadow: isDark ? "0 18px 60px rgba(0,0,0,0.16)" : "0 18px 60px rgba(15,23,42,0.06)",
          }}
        >
          <div className="mx-auto grid w-full max-w-none gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            {/* Left sticky info */}
            <div className="space-y-5 lg:sticky lg:top-28">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.2em]"
                style={{ borderColor: border, color: accent, background: accentSoft }}
              >
                Apply Now
              </div>
              <div>
                <h2 className="text-3xl tracking-tight md:text-4xl" style={{ color: heading }}>
                  Build with us.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7" style={{ color: body }}>
                  Ready to build amazing things? Fill out the application and let&apos;s start the conversation.
                </p>
              </div>
              <div className="rounded-[28px] border p-5 md:p-6" style={{ background: panel, borderColor: border }}>
                <p className="text-sm leading-7" style={{ color: body }}>
                  We review every submission carefully and respond within 3–5 business days.
                </p>
              </div>
            </div>

            {/* Right form */}
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <StepIndicator step={step} isDark={isDark} accent={accent} muted={muted} />

              {/* ── Step 1 ── */}
              {step === 1 && (
                <>
                  <section className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <p style={sectionLabel}>Basic Information</p>
                      <span className="text-xs" style={{ color: muted }}>* Required</span>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        ["Full Name *", "text", "Your full name"],
                        ["Email Address *", "email", "name@example.com"],
                        ["Phone Number (WhatsApp preferred) *", "tel", "+91 ..."],
                        ["College Name *", "text", "College or university"],
                        ["Degree *", "text", "Degree program"],
                        ["Year of Graduation *", "text", "2026"],
                      ].map(([label, type, placeholder]) => (
                        <label key={label} className="space-y-2">
                          <span className="text-sm font-medium" style={{ color: body }}>{label}</span>
                          <input
                            type={type}
                            placeholder={placeholder}
                            className="w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition focus:border-transparent focus:ring-2"
                            style={fieldSurface(isDark)}
                          />
                        </label>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <p style={sectionLabel}>Technical Links</p>
                    <div className="grid gap-4">
                      {[
                        ["GitHub Profile URL *", "url", "https://github.com/your-handle", "Essential — we check your TS/Next.js repos"],
                        ["Portfolio Website", "url", "https://your-site.com", "Optional but encouraged"],
                        ["LinkedIn Profile *", "url", "https://linkedin.com/in/your-handle", "Professional profile link"],
                        ["Resume / CV Link *", "url", "Paste link here", "Google Drive, Notion, or Dropbox — set to 'Anyone with link can view'"],
                      ].map(([label, type, placeholder, note]) => (
                        <label key={label} className="space-y-2">
                          <span className="text-sm font-medium" style={{ color: body }}>{label}</span>
                          <input
                            type={type}
                            placeholder={placeholder}
                            className="w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition focus:border-transparent focus:ring-2"
                            style={fieldSurface(isDark)}
                          />
                          <span className="block text-xs leading-6" style={{ color: muted }}>{note}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold text-white transition hover:scale-[1.01] active:scale-[0.99]"
                      style={{
                        background: `linear-gradient(135deg, ${accent}, ${isDark ? "#0099cc" : "#f59e0b"})`,
                        boxShadow: isDark ? "0 18px 44px rgba(0,200,180,0.18)" : "0 18px 44px rgba(245,158,11,0.20)",
                      }}
                    >
                      Continue →
                    </button>
                  </div>
                </>
              )}

              {/* ── Step 2 ── */}
              {step === 2 && (
                <>
                  <section className="space-y-4">
                    <p style={sectionLabel}>Skill Self-Assessment</p>
                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        ["Next.js Proficiency (1–5) *", proficiencyOptions],
                        ["FastAPI Proficiency (1–5) *", proficiencyOptions],
                        ["TypeScript Experience *", experienceOptions],
                      ].map(([label, options]) => (
                        <DropdownField
                          key={label as string}
                          label={label as string}
                          placeholder="Select level"
                          options={options as string[]}
                          {...dropdownShared}
                        />
                      ))}
                    </div>

                    <div>
                      <p className="mb-3 text-sm font-medium" style={{ color: body }}>AI Tools you use</p>
                      <div className="grid gap-3 md:grid-cols-2">
                        {aiTools.map((tool) => (
                          <label key={tool} className="flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm" style={{ background: chipBg, borderColor: border, color: body }}>
                            <input type="checkbox" className="h-4 w-4 rounded border-slate-400 text-teal-500 focus:ring-teal-500" />
                            {tool}
                          </label>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <p style={sectionLabel}>Technical Screening</p>
                    <div className="grid gap-4">
                      {[
                        ["Project Showcase *", "Tell us about a project you are proud of and the role you played."],
                        ["Agentic Workflow *", "Describe how you would structure an AI-assisted workflow for a real product team."],
                        ["DevOps / Deployment *", "How do you handle deployment reliability, rollback safety, and observability?"],
                        ["Logic / Speed Test *", "Share a concise answer or a link to a technical challenge you want us to review."],
                      ].map(([label, placeholder]) => (
                        <label key={label} className="space-y-2">
                          <span className="text-sm font-medium" style={{ color: body }}>{label}</span>
                          <textarea
                            rows={4}
                            placeholder={placeholder}
                            className="w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition focus:border-transparent focus:ring-2"
                            style={fieldSurface(isDark)}
                          />
                        </label>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <p style={sectionLabel}>Logistics & Availability</p>
                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        ["6-month commitment? *", ["Yes", "No"]],
                        ["How soon can you start? *", availabilityOptions],
                        ["Hours per week *", hoursOptions],
                      ].map(([label, options]) => (
                        <DropdownField
                          key={label as string}
                          label={label as string}
                          placeholder="Select an option"
                          options={options as string[]}
                          {...dropdownShared}
                        />
                      ))}
                    </div>
                  </section>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center justify-center rounded-2xl border px-6 py-4 text-sm font-semibold transition hover:scale-[1.01] active:scale-[0.99]"
                      style={{ borderColor: border, background: panel, color: heading }}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold text-white transition hover:scale-[1.01] active:scale-[0.99]"
                      style={{
                        background: `linear-gradient(135deg, ${accent}, ${isDark ? "#0099cc" : "#f59e0b"})`,
                        boxShadow: isDark ? "0 18px 44px rgba(0,200,180,0.18)" : "0 18px 44px rgba(245,158,11,0.20)",
                      }}
                    >
                      Submit Application
                    </button>
                  </div>

                  <p className="text-center text-sm leading-7" style={{ color: muted }}>
                    We&apos;ll review your application and get back to you within 3–5 business days.
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}