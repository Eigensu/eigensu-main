"use client";

import dynamic from "next/dynamic";
import { useTheme } from "./PageShell";

const GridScan = dynamic(() => import("./GridScan").then((mod) => mod.GridScan), {
  ssr: false,
});

export default function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <div className={`${isDark ? "bg-[#020608]" : "bg-white"} px-4 md:px-10 pt-10 pb-0 transition-colors duration-500`} />
      <footer
        className={`relative w-full h-screen md:h-[500px] overflow-hidden flex items-center justify-center rounded-2xl transition-colors duration-500 ${isDark ? "bg-[#060d12]" : "bg-[#fffbeb]"
          }`}
      >
        <GridScan
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
          sensitivity={0.55}
          lineThickness={1}
          linesColor={isDark ? "#2A3547" : "#D1D5DB"}
          gridScale={0.12}
          scanColor={isDark ? "#00c8b4" : "#fbbf24"}
          scanOpacity={isDark ? 0.35 : 0.80}
          enablePost
          bloomIntensity={isDark ? 1.0 : 0.5}
          chromaticAberration={isDark ? 0.002 : 0.0}
          noiseIntensity={isDark ? 0.015 : 0.0}
        />

        {/* Subtle overlay for text contrast */}
        <div className={`absolute inset-0 z-1 ${isDark ? "bg-black/10" : "bg-white/70"}`} />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-8 md:px-12 text-center">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
          `}</style>

          {/* Heading */}
          <h2
            className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            style={{
              fontFamily: "'Syne', sans-serif",
              letterSpacing: '-0.03em',
              color: isDark ? '#ffffff' : '#0f172a',
            }}
          >
            Ready for a website that actually works?
          </h2>

          {/* Description */}
          <p
            className="mx-auto mb-10 max-w-2xl text-base md:text-lg leading-relaxed"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
            }}
          >
            Tell us about your project. We respond quickly, and we&apos;ll tell you straight whether we&apos;re the right fit.
          </p>

          {/* CTA Button */}
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: isDark ? 'linear-gradient(135deg, #00c8b4, #0099cc)' : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              boxShadow: isDark ? '0 4px 20px rgba(0, 200, 180, 0.3)' : '0 4px 20px rgba(251, 191, 36, 0.3)',
            }}
          >
            <span>Let&apos;s Talk</span>
            <span>»</span>
          </button>
        </div>
      </footer>

      {/* Footer Bottom Section */}
      <div className={`border-t transition-colors duration-500 ${isDark ? "bg-[#020608] border-slate-800/60" : "bg-white border-slate-200/30"}`}>
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-12 md:py-16">
          {/* Top section: Info, Nav, Badges */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b ${isDark ? "border-slate-800/60" : "border-slate-200/30"}`}>
            {/* Left: Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Syne', sans-serif", color: isDark ? '#ffffff' : '#0f172a' }}>
                eigensu<span style={{ color: '#00c8b4' }}>.in</span>
              </h3>
              <p className={`text-sm mb-2 transition-colors duration-500 ${isDark ? "text-slate-400" : "text-slate-600"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Enterprise-grade IT solutions.
              </p>
              <p className={`text-sm mb-1 transition-colors duration-500 ${isDark ? "text-slate-500" : "text-slate-500"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                hello@eigensu.in
              </p>
            </div>

            {/* Center: Navigation Links */}
            <div>
              <nav className="flex flex-wrap gap-6 md:justify-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {['Work', 'Process', 'About', 'Blog', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className={`text-sm transition-colors duration-500 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
                  >
                    {item}
                  </a>
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
          <div className={`flex flex-col md:flex-row items-center justify-between text-xs transition-colors duration-500 ${isDark ? "text-slate-500" : "text-slate-500"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
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