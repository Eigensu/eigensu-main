"use client";

export default function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <>
       <div className="bg-white px-4 md:px-10 pt-10 pb-0"/>
        <footer
          className="relative w-full h-screen md:h-[500px] overflow-hidden bg-cover bg-center bg-no-repeat flex items-center justify-center rounded-2xl"
          style={{
            backgroundImage: 'url(/footer.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >

        {/* Subtle overlay for text contrast */}
        <div className="absolute inset-0 bg-black/5" />

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
              color: '#0f172a',
            }}
          >
            Ready for a website that actually works?
          </h2>

          {/* Description */}
          <p
            className="mx-auto mb-10 max-w-2xl text-base md:text-lg leading-relaxed"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: 'rgba(15, 23, 42, 0.7)',
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
              background: 'linear-gradient(135deg, #0066ff, #0052cc)',
              boxShadow: '0 4px 20px rgba(0, 102, 255, 0.3)',
            }}
          >
            <span>Let&apos;s Talk</span>
            <span>»</span>
          </button>
        </div>
      </footer>

      {/* Footer Bottom Section */}
      <div className="bg-white border-t border-slate-200/30">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-12 md:py-16">
          {/* Top section: Info, Nav, Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-200/30">
            {/* Left: Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Syne', sans-serif", color: '#0f172a' }}>
                eigensu<span style={{ color: '#00c8b4' }}>.in</span>
              </h3>
              <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Enterprise-grade IT solutions.
              </p>
              <p className="text-sm text-slate-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Right: Badges/Awards */}
            <div className="flex justify-end gap-4">
              {/* Placeholder for award badges */}
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                ⭐
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                ⭐
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                ⭐
              </div>
            </div>
          </div>

          {/* Bottom section: Copyright and Privacy */}
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <p>
              &copy; {new Date().getFullYear()} eigensu.in. All rights reserved.
            </p>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors mt-4 md:mt-0">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </>
  );
}