"use client";

import Link from "next/link";
import { useTheme } from "./PageShell";

export default function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <div className={`${isDark ? "bg-[#020608]" : "bg-white"} px-4 md:px-10 pt-10 pb-0 transition-colors duration-500`} />
      <footer
        className={`relative w-full overflow-hidden rounded-3xl transition-colors duration-500 ${isDark ? "bg-[#060d12]" : "bg-[#fffbeb]"
          }`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: isDark
              ? "radial-gradient(circle at 20% 20%, rgba(0,200,180,0.12), transparent 28%), radial-gradient(circle at 80% 10%, rgba(0,153,204,0.10), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))"
              : "radial-gradient(circle at 20% 20%, rgba(251,191,36,0.12), transparent 28%), radial-gradient(circle at 80% 10%, rgba(245,158,11,0.08), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.24), rgba(255,255,255,0))",
            backgroundSize: "100% 100%",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: isDark
              ? "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
              : "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            opacity: 0.55,
          }}
        />

        {/* Subtle overlay for text contrast */}
        <div className={`absolute inset-0 z-1 ${isDark ? "bg-black/15" : "bg-white/75"}`} />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em]"
                style={{ borderColor: isDark ? "rgba(0,200,180,0.25)" : "rgba(245,158,11,0.25)", color: isDark ? "#00c8b4" : "#b45309", background: isDark ? "rgba(0,200,180,0.08)" : "rgba(245,158,11,0.10)" }}
              >
                Ready to start
              </div>
              <h2
                className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl"
                style={{
                  letterSpacing: '-0.03em',
                  color: isDark ? '#ffffff' : '#0f172a',
                }}
              >
                Ready for a website that actually works?
              </h2>

              <p
                className="mt-5 max-w-xl text-base leading-7 md:text-lg"
                style={{
                  color: isDark ? 'rgba(255, 255, 255, 0.72)' : 'rgba(15, 23, 42, 0.72)',
                }}
              >
                Tell us about your project. We respond quickly, and we&apos;ll tell you straight whether we&apos;re the right fit.
              </p>
            </div>

            <div className="rounded-[28px] border p-5 md:p-6" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.68)", borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)", boxShadow: isDark ? "0 20px 70px rgba(0,0,0,0.22)" : "0 20px 70px rgba(15,23,42,0.06)" }}>
              <p className="text-sm leading-7" style={{ color: isDark ? 'rgba(255,255,255,0.68)' : 'rgba(15,23,42,0.68)' }}>
                We build systems for teams that want clear communication, fast delivery, and long-term reliability.
              </p>
              <button
                type="button"
                onClick={onOpenModal}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: isDark ? 'linear-gradient(135deg, #00c8b4, #0099cc)' : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  boxShadow: isDark ? '0 6px 24px rgba(0, 200, 180, 0.28)' : '0 6px 24px rgba(251, 191, 36, 0.28)',
                }}
              >
                <span>Let&apos;s Talk</span>
                <span>»</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Bottom Section */}
      <div className={`border-t transition-colors duration-500 ${isDark ? "bg-[#020608] border-slate-800/60" : "bg-white border-slate-200/30"}`}>
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-12 md:py-16">
          {/* Top section: Info, Nav, Badges */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b ${isDark ? "border-slate-800/60" : "border-slate-200/30"}`}>
            {/* Left: Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                eigensu<span style={{ color: '#00c8b4' }}>.in</span>
              </h3>
              <p className={`text-sm mb-2 transition-colors duration-500 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Enterprise-grade IT solutions.
              </p>
              <p className={`text-sm mb-1 transition-colors duration-500 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                hello@eigensu.in
              </p>
            </div>

            {/* Center: Navigation Links */}
            <div>
              <nav className="flex flex-wrap gap-6 md:justify-center">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Process', href: '/process' },
                  { label: 'About', href: '/about' },
                  { label: 'Careers', href: '/careers' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-sm transition-colors duration-500 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right: Badges/Awards */}
            <div className="flex justify-end gap-4">
              {/* Placeholder for award badges */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xs transition-colors duration-500 ${isDark ? "bg-slate-800/40 text-slate-500" : "bg-slate-100 text-slate-400"}`}>
                ⭐
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xs transition-colors duration-500 ${isDark ? "bg-slate-800/40 text-slate-500" : "bg-slate-100 text-slate-400"}`}>
                ⭐
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xs transition-colors duration-500 ${isDark ? "bg-slate-800/40 text-slate-500" : "bg-slate-100 text-slate-400"}`}>
                ⭐
              </div>
            </div>
          </div>

          {/* Bottom section: Copyright and Privacy */}
          <div className={`flex flex-col md:flex-row items-center justify-between text-xs transition-colors duration-500 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
            <p>
              &copy; {new Date().getFullYear()} eigensu.in. All rights reserved.
            </p>
            <a href="#" className={`transition-colors mt-4 md:mt-0 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </>
  );
}