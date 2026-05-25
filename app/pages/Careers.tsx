"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../components/PageShell";

const whyWorkWithUs = [
  {
    title: "Cutting-edge tech",
    description: "Work with modern stacks including Next.js, FastAPI, TypeScript, and AI-powered development tools.",
  },
  {
    title: "Fast-paced growth",
    description: "Join a rapidly growing company where your work directly shapes outcomes and your growth stays visible.",
  },
  {
    title: "Collaborative culture",
    description: "Work with engineers who value knowledge sharing, code reviews, and continuous learning.",
  },
];

const proficiencyOptions = ["1", "2", "3", "4", "5"];
const experienceOptions = ["Beginner", "Intermediate", "Advanced", "Expert"];
const availabilityOptions = ["Immediately", "Within 1 week", "Within 2 weeks", "Within 1 month"];
const hoursOptions = ["Part-time (20 hrs)", "Full-time (40 hrs)"];
const aiTools = ["Cursor", "GitHub Copilot", "Supermaven", "Windsurf", "Other"];

const heroHighlights = [
  {
    value: "Next.js",
    label: "Product-grade frontend systems",
  },
  {
    value: "FastAPI",
    label: "Clean, scalable backend delivery",
  },
  {
    value: "AI tools",
    label: "Modern workflows with real leverage",
  },
];

const commitments = [
  "Enterprise-grade delivery standards",
  "Direct ownership from day one",
  "A team that values craft and clarity",
];

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
      if (event.key === "Escape") {
        setOpen(false);
      }
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
          onClick={() => setOpen((current) => !current)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 text-left text-sm outline-none transition focus:ring-2"
          style={{ background: surfaceColor, borderColor, color: textColor, boxShadow: open ? `0 0 0 2px ${isDark ? "rgba(0,200,180,0.18)" : "rgba(245,158,11,0.18)"}` : "none" }}
        >
          <span style={{ color: value ? textColor : mutedColor }}>
            {value || placeholder}
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={mutedColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {open ? (
          <div
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-2xl border shadow-2xl"
            style={{ background: isDark ? "#0f141a" : "rgba(255,255,255,0.98)", borderColor }}
          >
            <button
              type="button"
              className="w-full px-4 py-3 text-left text-sm transition"
              style={{ color: mutedColor, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(15,23,42,0.02)" }}
              onClick={() => {
                setValue("");
                setOpen(false);
              }}
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
                    background: selected
                      ? (isDark ? "rgba(0,200,180,0.14)" : "rgba(245,158,11,0.12)")
                      : "transparent",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background = isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.05)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = selected
                      ? (isDark ? "rgba(0,200,180,0.14)" : "rgba(245,158,11,0.12)")
                      : "transparent";
                  }}
                  onClick={() => {
                    setValue(option);
                    setOpen(false);
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </label>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  borderTone,
  accentTone,
  accentWash,
  titleColor,
  bodyColor,
}: {
  eyebrow: string;
  title: string;
  description: string;
  borderTone: string;
  accentTone: string;
  accentWash: string;
  titleColor: string;
  bodyColor: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <div
        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.2em]"
        style={{ borderColor: borderTone, color: accentTone, background: accentWash }}
      >
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl" style={{ color: titleColor }}>
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-7 md:text-lg" style={{ color: bodyColor }}>
        {description}
      </p>
    </div>
  );
}

export default function CareersPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const background = isDark
    ? "radial-gradient(1000px 500px at 10% 0%, rgba(0,200,180,0.18), transparent 45%), radial-gradient(900px 520px at 90% 15%, rgba(0,153,204,0.12), transparent 45%), linear-gradient(180deg,#04080b 0%,#020406 100%)"
    : "radial-gradient(1000px 500px at 10% 0%, rgba(251,191,36,0.16), transparent 42%), radial-gradient(900px 520px at 90% 15%, rgba(245,158,11,0.10), transparent 42%), linear-gradient(180deg,#fffdf8 0%,#fff7ea 100%)";

  const panel = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.74)";
  const strongPanel = isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.86)";
  const border = isDark ? "rgba(255,255,255,0.09)" : "rgba(15,23,42,0.08)";
  const heading = isDark ? "#ffffff" : "#0f172a";
  const body = isDark ? "rgba(255,255,255,0.72)" : "rgba(15,23,42,0.72)";
  const muted = isDark ? "rgba(255,255,255,0.48)" : "rgba(15,23,42,0.52)";
  const accent = isDark ? "#00c8b4" : "#c26a00";
  const accentSoft = isDark ? "rgba(0,200,180,0.12)" : "rgba(251,191,36,0.12)";
  const accentPanel = isDark ? "rgba(0,200,180,0.08)" : "rgba(251,191,36,0.12)";
  const chipBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.04)";
  const sectionBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.60)";

  return (
    <main className="min-h-screen" style={{ background, transition: "background 0.65s ease" }}>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-8 md:px-10 md:pb-24 md:pt-12">
        <div
          className="relative overflow-hidden rounded-[36px] border px-6 py-12 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:px-10 md:py-16 lg:px-12"
          style={{ background: sectionBg, borderColor: border }}
        >
          <div className="absolute inset-0 opacity-70" aria-hidden="true">
            <div
              className="absolute -left-20 top-0 h-64 w-64 rounded-full blur-2xl"
              style={{ background: isDark ? "rgba(0,200,180,0.12)" : "rgba(251,191,36,0.12)" }}
            />
            <div
              className="absolute right-0 top-10 h-72 w-72 rounded-full blur-2xl"
              style={{ background: isDark ? "rgba(0,153,204,0.12)" : "rgba(245,158,11,0.10)" }}
            />
          </div>

          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-7">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.2em]"
                style={{ borderColor: border, color: accent, background: accentSoft }}
              >
                Why Eigensu?
              </div>

              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl" style={{ color: heading }}>
                  Build the future with eigensu.
                </h1>
                <p className="max-w-2xl text-base leading-7 md:text-lg" style={{ color: body }}>
                  We&apos;re looking for talented developers who love building with Next.js, FastAPI, and cutting-edge AI tools. Join us in creating enterprise-grade solutions that matter.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#application-form"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: `linear-gradient(135deg, ${accent}, ${isDark ? "#0099cc" : "#f59e0b"})`, boxShadow: isDark ? "0 18px 40px rgba(0,200,180,0.18)" : "0 18px 40px rgba(245,158,11,0.20)" }}
                >
                  Apply Now
                </a>
                <span
                  className="inline-flex items-center rounded-full border px-5 py-3 text-sm font-medium"
                  style={{ borderColor: border, background: panel, color: heading }}
                >
                  Why Eigensu?
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {heroHighlights.map((item) => (
                  <article
                    key={item.value}
                    className="rounded-3xl border p-5"
                    style={{ background: panel, borderColor: border, boxShadow: isDark ? "0 16px 34px rgba(0,0,0,0.12)" : "0 16px 34px rgba(15,23,42,0.04)" }}
                  >
                    <div className="text-sm font-semibold" style={{ color: heading }}>
                      {item.value}
                    </div>
                    <p className="mt-2 text-sm leading-6" style={{ color: body }}>
                      {item.label}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="relative">
              <div
                className="rounded-4xl border p-6 md:p-8"
                style={{ background: strongPanel, borderColor: border, boxShadow: isDark ? "0 20px 60px rgba(0,0,0,0.22)" : "0 20px 60px rgba(15,23,42,0.06)" }}
              >
                <div className="rounded-[26px] border p-6 md:p-7" style={{ background: panel, borderColor: border }}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em]" style={{ color: muted }}>
                        Hiring now
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight" style={{ color: heading }}>
                        Why work with us?
                      </h2>
                    </div>
                    <div className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ background: accentPanel, color: accent }}>
                      Careers
                    </div>
                  </div>

                  <p className="mt-4 max-w-lg text-sm leading-7 md:text-base" style={{ color: body }}>
                    We&apos;re building something special, and we want you to be part of it.
                  </p>

                  <div className="mt-6 space-y-3">
                    {commitments.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border px-4 py-4"
                        style={{ background: chipBg, borderColor: border }}
                      >
                        <span className="mt-0.5 h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
                        <p className="text-sm leading-6" style={{ color: heading }}>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10 md:pb-24">
        <div className="rounded-[36px] border px-6 py-12 md:px-10 md:py-16" style={{ background: panel, borderColor: border, boxShadow: isDark ? "0 16px 48px rgba(0,0,0,0.12)" : "0 16px 48px rgba(15,23,42,0.05)" }}>
          <SectionHeading
            eyebrow="Join our team"
            title="Why work with us?"
            description="We&apos;re building something special, and we want you to be part of it."
            borderTone={border}
            accentTone={accent}
            accentWash={accentSoft}
            titleColor={heading}
            bodyColor={body}
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {whyWorkWithUs.map((item) => (
              <article
                key={item.title}
                className="rounded-[28px] border p-6 md:p-7"
                style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.72)", borderColor: border }}
              >
                <div className="mb-5 h-12 w-12 rounded-2xl border" style={{ background: accentSoft, borderColor: border }} />
                <h3 className="text-xl font-semibold tracking-tight" style={{ color: heading }}>
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7" style={{ color: body }}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10 md:pb-28" id="application-form">
        <div className="rounded-[36px] border p-6 md:p-10" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.78)", borderColor: border, boxShadow: isDark ? "0 18px 60px rgba(0,0,0,0.16)" : "0 18px 60px rgba(15,23,42,0.06)" }}>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-5 lg:sticky lg:top-28">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.2em]"
                style={{ borderColor: border, color: accent, background: accentSoft }}
              >
                Apply Now
              </div>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl" style={{ color: heading }}>
                  Build with us.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7" style={{ color: body }}>
                  Ready to build amazing things? Fill out the application below and let&apos;s start the conversation.
                </p>
              </div>

              <div className="rounded-[28px] border p-5 md:p-6" style={{ background: panel, borderColor: border }}>
                <p className="text-sm leading-7" style={{ color: body }}>
                  We review every submission carefully and respond within 3 to 5 business days.
                </p>
              </div>
            </div>

            <form className="space-y-8" onSubmit={(event) => event.preventDefault()}>
              <section className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: muted }}>
                    Basic Information
                  </h3>
                  <span className="text-xs" style={{ color: muted }}>
                    Required fields marked *
                  </span>
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
                      <span className="text-sm font-medium" style={{ color: body }}>
                        {label}
                      </span>
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
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: muted }}>
                  Technical Links (The &quot;Proof&quot;)
                </h3>
                <div className="grid gap-4">
                  {[
                    ["GitHub Profile URL *", "Essential to check your TypeScript/Next.js repositories", "https://github.com/your-handle"],
                    ["Portfolio Website", "Optional but encouraged", "https://your-site.com"],
                    ["LinkedIn Profile *", "Professional profile link", "https://linkedin.com/in/your-handle"],
                    ["Resume/CV Link *", "Please provide a link to your resume (Google Drive, Notion, or Dropbox). Ensure the sharing settings are set to 'Anyone with the link can view'.", "Paste link here"],
                  ].map(([label, note, placeholder]) => (
                    <label key={label} className="space-y-2">
                      <span className="text-sm font-medium" style={{ color: body }}>
                        {label}
                      </span>
                      <input
                        type="url"
                        placeholder={placeholder}
                        className="w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition focus:border-transparent focus:ring-2"
                        style={fieldSurface(isDark)}
                      />
                      <span className="block text-xs leading-6" style={{ color: muted }}>
                        {note}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: muted }}>
                  Skill Self-Assessment
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    ["Next.js Proficiency (1-5 scale) *", proficiencyOptions],
                    ["FastAPI Proficiency (1-5 scale) *", proficiencyOptions],
                    ["TypeScript Experience *", experienceOptions],
                  ].map(([label, options]) => (
                    <div key={label as string} className="space-y-2">
                      <DropdownField
                        label={label as string}
                        placeholder="Select proficiency level"
                        options={options as string[]}
                        isDark={isDark}
                        labelColor={body}
                        borderColor={border}
                        surfaceColor={isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.78)"}
                        textColor={heading}
                        mutedColor={muted}
                      />
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {aiTools.map((tool) => (
                    <label key={tool} className="flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm" style={{ background: chipBg, borderColor: border, color: body }}>
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-400 text-teal-500 focus:ring-teal-500" />
                      {tool}
                    </label>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: muted }}>
                  Technical Screening Questions
                </h3>
                <div className="grid gap-4">
                  {[
                    ["Project Showcase *", "Tell us about a project you are proud of and the role you played."],
                    ["Agentic Workflow *", "Describe how you would structure an AI-assisted workflow for a real product team."],
                    ["DevOps/Deployment *", "How do you handle deployment reliability, rollback safety, and observability?"],
                    ["Logic/Speed Test *", "Share a concise answer or link if you have a technical challenge you want us to review."],
                  ].map(([label, placeholder]) => (
                    <label key={label} className="space-y-2">
                      <span className="text-sm font-medium" style={{ color: body }}>
                        {label}
                      </span>
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
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: muted }}>
                  Logistics & Availability
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    ["Can you commit to 6 months? *", ["Yes", "No"]],
                    ["How soon can you start? *", availabilityOptions],
                    ["Hours per week *", hoursOptions],
                  ].map(([label, options]) => (
                    <DropdownField
                      key={label as string}
                      label={label as string}
                      placeholder="Select an option"
                      options={options as string[]}
                      isDark={isDark}
                      labelColor={body}
                      borderColor={border}
                      surfaceColor={isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.78)"}
                      textColor={heading}
                      mutedColor={muted}
                    />
                  ))}
                </div>
              </section>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold text-white transition hover:scale-[1.01] active:scale-[0.99]"
                  style={{ background: `linear-gradient(135deg, ${accent}, ${isDark ? "#0099cc" : "#f59e0b"})`, boxShadow: isDark ? "0 18px 44px rgba(0,200,180,0.18)" : "0 18px 44px rgba(245,158,11,0.20)" }}
                >
                  Submit Application
                </button>

                <p className="mt-4 text-center text-sm leading-7" style={{ color: muted }}>
                  We&apos;ll review your application and get back to you within 3-5 business days.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
