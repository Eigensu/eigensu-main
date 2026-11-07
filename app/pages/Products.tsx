"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useModal } from "../components/PageShell";
import { ThemeHeroSection } from "../components/ThemeHero";
import { EigensuMark, ProductKey } from "../components/Brand";
import CustomRequest from "../components/CustomRequest";
import { CUSTOM_KEY, PRODUCTS, type Product } from "../lib/products";

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";
const BODY = "var(--font-body), 'Instrument Sans', sans-serif";

function Eyebrow({ children, color = "var(--accent)" }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase" as const, color, marginBottom: 18 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {children}
    </div>
  );
}

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setOn(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, on };
}

/* ── Hero: the key tray ─────────────────────────────────────────────────────
   Every product is a key on the same keyboard as the Eigensu "e". The tray
   "types" through them, and each key shows what it's for. */

const TRAY = [
  ...PRODUCTS.map((p) => ({ id: p.slug, spec: p.key, name: p.name.toLowerCase(), line: p.audience.toLowerCase(), href: `#${p.slug}` })),
  { id: "custom", spec: CUSTOM_KEY, name: "custom", line: "built around your process", href: "#request" },
];

function KeyTray() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  useEffect(() => {
    if (hovered !== null) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % TRAY.length), 1600);
    return () => window.clearInterval(id);
  }, [hovered]);
  const current = hovered ?? active;

  return (
    <div className="pd-tray">
      <div className="pd-tray-row">
        <div className="pd-tray-home" title="Eigensu">
          <EigensuMark tone="dark" size={74} />
        </div>
        <span className="pd-tray-sep" aria-hidden="true" />
        {TRAY.map((k, i) => (
          <a
            key={k.id}
            href={k.href}
            className="pd-tray-key"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            aria-label={k.name}
          >
            <ProductKey spec={k.spec} size={74} tone="dark" pressed={current === i} />
          </a>
        ))}
      </div>
      <div className="pd-tray-term">
        <b style={{ color: "#8CE0B0" }}>eigensu ▸</b>{" "}
        <span style={{ color: "var(--cream)" }}>{TRAY[current].name}</span>
        <span style={{ color: "rgba(251,243,228,0.5)" }}> — {TRAY[current].line}</span>
        <span className="pd-caret" />
      </div>
    </div>
  );
}

/* ── Product previews ───────────────────────────────────────────────────── */

function DishPatchPreview() {
  return (
    <div className="pd-prev" style={{ background: "#ece5dd", borderRadius: 22, padding: 14, boxShadow: "18px 22px 50px rgba(0,0,0,0.35)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--cream)", borderRadius: 14, padding: "10px 12px", marginBottom: 12 }}>
        <span style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--ember)", color: "#fff", display: "grid", placeItems: "center", fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700 }}>CB</span>
        <div>
          <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: "0.78rem", color: "#3B0A22" }}>Corner Bistro</div>
          <div style={{ fontFamily: MONO, fontSize: "0.58rem", color: "#765C67" }}>Campaign · weekend regulars · 412 guests</div>
        </div>
      </div>
      {[
        { out: true,  t: "Hi Meera! It's been a while. Your table by the window is free this Saturday." },
        { out: false, t: "Oh lovely, book us for 8pm? Two of us." },
        { out: true,  t: "Done ✓ See you Saturday at 8." },
      ].map((m, i) => (
        <div key={i} style={{ display: "flex", justifyContent: m.out ? "flex-end" : "flex-start", marginBottom: 7 }}>
          <span style={{ maxWidth: "80%", padding: "8px 11px", borderRadius: 10, fontSize: "0.72rem", lineHeight: 1.4, background: m.out ? "#0F4D2E" : "#fff", color: m.out ? "var(--cream)" : "#161616" }}>{m.t}</span>
        </div>
      ))}
    </div>
  );
}

function InventoryPreview() {
  const rows = [
    { sku: "Arabica beans 1kg", loc: "Bandra", qty: 42, low: false },
    { sku: "Oat milk 1L",       loc: "Andheri", qty: 6,  low: true },
    { sku: "Paper cups 12oz",   loc: "Warehouse", qty: 1800, low: false },
    { sku: "Croissant dough",   loc: "Bandra", qty: 24, low: false },
  ];
  return (
    <div className="pd-prev" style={{ background: "var(--cream)", border: "2px solid var(--wine)", borderRadius: 22, padding: 16, boxShadow: "14px 16px 0 var(--wine)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, fontFamily: MONO, fontSize: "0.64rem", color: "var(--text-muted)" }}>
        <span>stock · 3 locations</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--basil)" }}><span className="pd-pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--basil)" }} />synced 12s ago</span>
      </div>
      <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid var(--border)" }}>
        {rows.map((r, i) => (
          <div key={r.sku} style={{ display: "grid", gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr) 64px", gap: 10, alignItems: "center", padding: "11px 14px", borderTop: i ? "1px solid var(--border)" : "none", background: r.low ? "rgba(255,197,61,0.22)" : "transparent" }}>
            <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: "0.8rem", color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.sku}</span>
            <span style={{ fontFamily: MONO, fontSize: "0.66rem", color: "var(--text-dim)" }}>{r.loc}</span>
            <span style={{ fontFamily: MONO, fontSize: "0.74rem", textAlign: "right", color: r.low ? "#9A3412" : "var(--text)", fontWeight: 700 }}>{r.qty.toLocaleString("en-IN")}{r.low ? " ↓" : ""}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, background: "var(--butter)", borderRadius: 10, padding: "9px 12px", fontFamily: MONO, fontSize: "0.66rem", color: "var(--wine)" }}>
        ⚑ Oat milk below reorder level at Andheri · PO drafted
      </div>
    </div>
  );
}

function RecruiterPreview() {
  const cols = [
    { stage: "Sourced",   people: ["AK", "RS", "TM"], tint: "#FBF3E4" },
    { stage: "Interview", people: ["PN", "DV"],       tint: "#FFC53D" },
    { stage: "Offer",     people: ["SJ"],             tint: "#8CE0B0" },
  ];
  return (
    <div className="pd-prev" style={{ background: "var(--wine)", borderRadius: 22, padding: 16, boxShadow: "18px 22px 50px rgba(28,25,23,0.35)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: "0.64rem", color: "rgba(251,243,228,0.6)", marginBottom: 12 }}>
        <span>Senior accountant · client: Harbor & Co</span>
        <span style={{ color: "var(--butter)" }}>6 in play</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 8 }}>
        {cols.map((c) => (
          <div key={c.stage} style={{ background: "rgba(251,243,228,0.07)", borderRadius: 12, padding: 10, minHeight: 150 }}>
            <div style={{ fontFamily: MONO, fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(251,243,228,0.6)", marginBottom: 9 }}>{c.stage} · {c.people.length}</div>
            {c.people.map((p) => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(251,243,228,0.1)", borderRadius: 9, padding: "7px 8px", marginBottom: 6 }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: c.tint, color: "var(--wine)", display: "grid", placeItems: "center", fontFamily: MONO, fontSize: "0.52rem", fontWeight: 700, flexShrink: 0 }}>{p}</span>
                <span style={{ height: 6, flex: 1, borderRadius: 100, background: "rgba(251,243,228,0.18)" }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const PREVIEWS: Record<string, () => React.ReactElement> = {
  dishpatch: DishPatchPreview,
  inventory: InventoryPreview,
  recruiter: RecruiterPreview,
};

/* ── Product block ──────────────────────────────────────────────────────── */

function ProductBlock({ p, i }: { p: Product; i: number }) {
  const { openModal } = useModal();
  const { ref, on } = useReveal(0.15);
  const Preview = PREVIEWS[p.slug];
  const flip = i % 2 === 1;
  const lightSurface = p.keyTone === "light";

  return (
    <section
      id={p.slug}
      className="relative z-10 py-14 md:py-20 lg:py-24"
      style={{ background: p.surface, borderRadius: 48, scrollMarginTop: 96, border: p.surface === "#FFFFFF" ? "2px solid var(--wine)" : "none", marginTop: i === 0 ? 0 : -1 }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <div ref={ref} className="grid gap-12 md:gap-16 md:grid-cols-2 md:items-center" style={{ opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(22px)", transition: "opacity .7s, transform .7s" }}>
          <div className={flip ? "md:order-2" : ""}>
            {/* Product logo: key + wordmark */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
              <ProductKey spec={p.key} size={64} tone={p.keyTone} title={`${p.name} logo`} />
              <div>
                <div style={{ fontFamily: "var(--font-logo), 'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,3.4vw,2.6rem)", letterSpacing: "-0.045em", lineHeight: 0.9, color: p.onSurface }}>
                  {p.name.toLowerCase()}
                </div>
                <div style={{ fontFamily: MONO, fontSize: "0.62rem", letterSpacing: "1.6px", textTransform: "uppercase", color: p.onSurfaceMuted, marginTop: 8 }}>
                  by eigensu · {p.audience}
                </div>
              </div>
            </div>

            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(1.7rem,3.4vw,2.7rem)", letterSpacing: "-0.04em", lineHeight: 1.02, color: p.onSurface, marginBottom: 16, maxWidth: "18ch" }}>{p.tagline}</h2>
            <p style={{ color: p.onSurfaceMuted, fontSize: "clamp(0.92rem,1.3vw,1.04rem)", lineHeight: 1.7, maxWidth: "52ch", marginBottom: 24 }}>{p.body}</p>

            <ul style={{ display: "grid", gap: 10, marginBottom: 30 }}>
              {p.features.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: 11, color: p.onSurface, fontSize: "0.92rem", fontWeight: 500 }}>
                  <span style={{ width: 20, height: 20, borderRadius: 6, background: p.key.face, display: "grid", placeItems: "center", flexShrink: 0, boxShadow: lightSurface ? "inset 0 0 0 1.5px rgba(28,25,23,0.9)" : "none" }}>
                    <svg viewBox="0 0 12 12" width={10} height={10} fill="none"><path d="M2 6l3 3 5-5" stroke={p.key.ink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {p.href ? (
                <Link href={p.href} className="pd-btn" style={{ background: p.onSurface, color: p.surface === "#FFFFFF" ? "var(--cream)" : p.surface }}>
                  {p.hrefLabel} →
                </Link>
              ) : null}
              <button type="button" onClick={openModal} className="pd-btn" style={p.href ? { border: `1.5px solid ${p.onSurfaceMuted}`, color: p.onSurface } : { background: p.onSurface, color: p.surface === "#FFFFFF" ? "var(--cream)" : p.surface }}>
                Book a demo
              </button>
            </div>
          </div>

          <div className={flip ? "md:order-1" : ""}>
            {Preview ? <Preview /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function ProductsPage() {
  const { ref: customRef, on: customOn } = useReveal(0.1);

  return (
    <div>
      <style>{PD_STYLES}</style>

      {/* ── Hero ── */}
      <ThemeHeroSection background="var(--wine)" className="rounded-b-[48px] z-[2]">
        <div className="grid w-full gap-12 min-[980px]:grid-cols-[0.95fr_1.05fr] min-[980px]:items-center" style={{ position: "relative", zIndex: 1 }}>
          <div>
            <div className="hero-anim-2"><Eyebrow color="var(--peri)">Products // by eigensu</Eyebrow></div>
            <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2.4rem,5.4vw,4.4rem)", lineHeight: 0.95, letterSpacing: "-0.045em", color: "var(--cream)", margin: "0 0 22px", maxWidth: "15ch" }}>
              Three products. <span style={{ color: "var(--peri)" }}>One keyboard.</span>
            </h1>
            <p className="hero-anim-4" style={{ color: "rgba(251,243,228,0.78)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "46ch", lineHeight: 1.7, marginBottom: 30 }}>
              Software we build and run ourselves, for restaurants, stock-heavy businesses and recruitment teams. If none of them fits, the fourth key is yours: we build it around your process.
            </p>
            <div className="hero-anim-4" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="#dishpatch" className="pd-btn" style={{ background: "var(--accent)", color: "#fff" }}>See the products</a>
              <a href="#request" className="pd-btn" style={{ border: "1.5px solid rgba(251,243,228,0.35)", color: "var(--cream)" }}>Request something custom</a>
            </div>
          </div>
          <div className="hero-anim-5">
            <KeyTray />
          </div>
        </div>
      </ThemeHeroSection>

      {/* ── Lineup ── */}
      <div style={{ background: "var(--bg)", paddingTop: 72 }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ marginBottom: 40 }}>
          <Eyebrow>The lineup</Eyebrow>
          <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2rem,4.4vw,3.8rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--text)", maxWidth: "18ch" }}>
            Each one has its own key.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.9rem,1.3vw,1rem)", marginTop: 16, lineHeight: 1.7, maxWidth: "56ch" }}>
            Same studio, same standards, different jobs. Every product is built and supported by the Eigensu team, and each one can be shaped around how you already work.
          </p>
        </div>
        <div style={{ display: "grid", gap: 20, padding: "0 clamp(0px,1.2vw,14px)" }}>
          {PRODUCTS.map((p, i) => <ProductBlock key={p.slug} p={p} i={i} />)}
        </div>
      </div>

      {/* ── Custom products & services ── */}
      <section className="relative z-10 py-16 md:py-24" style={{ background: "var(--bg)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ maxWidth: 640, marginBottom: 40 }}>
            <Eyebrow>Not on the shelf?</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2rem,4.2vw,3.6rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--text)" }}>
              Custom products and custom services.
            </h2>
          </div>
          <div ref={customRef} className="grid gap-5 md:grid-cols-2">
            {[
              {
                title: "Custom product",
                body: "When the tool you need doesn't exist, we build it around your process: CRMs, dashboards, portals, booking systems and the automations that tie them together.",
                bullets: ["Scoped in a week", "Weekly working demos", "Yours on handover"],
                cta: { label: "Describe your product", href: "#request" },
                bg: "var(--wine)", fg: "var(--cream)", sub: "rgba(251,243,228,0.76)", key: CUSTOM_KEY, tone: "dark" as const,
              },
              {
                title: "Custom service",
                body: "Websites built or revamped, Wix and Shopify upkeep, compliance websites, brand building and logo redesigns, handled by the same team that builds our products.",
                bullets: ["Website creation & revamps", "Wix & Shopify maintenance", "Brand & logo design"],
                cta: { label: "See all services", href: "/services#service-menu" },
                bg: "var(--peri)", fg: "var(--wine)", sub: "rgba(28,25,23,0.78)", key: { face: "#FBF3E4", glyph: "s", ink: "#1C1917" }, tone: "light" as const,
              },
            ].map((c, i) => (
              <article key={c.title} style={{ background: c.bg, borderRadius: 28, padding: "32px 30px 34px", display: "flex", flexDirection: "column", opacity: customOn ? 1 : 0, transform: customOn ? "translateY(0)" : "translateY(18px)", transition: `opacity .6s ${i * 0.12}s, transform .6s ${i * 0.12}s` }}>
                <ProductKey spec={c.key} size={56} tone={c.tone} />
                <h3 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "1.9rem", letterSpacing: "-0.035em", color: c.fg, margin: "22px 0 12px" }}>{c.title}</h3>
                <p style={{ color: c.sub, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 20 }}>{c.body}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 26 }}>
                  {c.bullets.map((b) => (
                    <span key={b} style={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "0.03em", padding: "7px 12px", borderRadius: 100, background: "rgba(251,243,228,0.14)", color: c.fg, border: `1px solid ${c.sub}` }}>{b}</span>
                  ))}
                </div>
                <a href={c.cta.href} className="pd-btn" style={{ marginTop: "auto", alignSelf: "flex-start", background: c.fg, color: c.bg === "var(--peri)" ? "var(--cream)" : "var(--wine)" }}>{c.cta.label} →</a>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 22, fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Want proof first? <Link href="/projects" style={{ color: "var(--text)", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>Browse the custom work we&apos;ve shipped →</Link>
          </p>
        </div>
      </section>

      {/* ── Request ── */}
      <section className="relative z-10 py-16 md:py-24" style={{ background: "var(--bg-elev-3)", borderRadius: "48px 48px 0 0", scrollMarginTop: 80 }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Custom request</Eyebrow>
              <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2rem,4vw,3.4rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--text)", marginBottom: 18 }}>
                Type it, or just say it.
              </h2>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 28, maxWidth: "44ch" }}>
                No forms with twenty fields. Tell us what you need the way you&apos;d tell a colleague.
              </p>
              <ol style={{ display: "grid", gap: 16 }}>
                {[
                  { n: "1", t: "Type your idea or record a voice note", d: "Voice notes can be up to five minutes long." },
                  { n: "2", t: "Press Refine", d: "Your notes become the brief template our team works from. Edit anything before sending." },
                  { n: "3", t: "Hear back fast", d: "Voice notes get a reply within one hour." },
                ].map((s) => (
                  <li key={s.n} style={{ display: "flex", gap: 14 }}>
                    <span style={{ flex: "0 0 30px", height: 30, borderRadius: 9, background: "var(--wine)", color: "var(--cream)", display: "grid", placeItems: "center", fontFamily: MONO, fontSize: "0.74rem", fontWeight: 700 }}>{s.n}</span>
                    <div>
                      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.02rem", color: "var(--text)" }}>{s.t}</div>
                      <div style={{ fontSize: "0.86rem", color: "var(--text-muted)", lineHeight: 1.55, marginTop: 3 }}>{s.d}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <CustomRequest defaultKind="Custom product" />
          </div>
        </div>
      </section>
    </div>
  );
}

const PD_STYLES = `
.pd-btn{ display:inline-flex; align-items:center; gap:8px; font-family:${BODY}; font-weight:700; font-size:.9rem; padding:12px 20px; border-radius:100px; text-decoration:none; white-space:nowrap; transition:transform .2s ease; }
.pd-btn:hover{ transform:translateY(-2px); }

.pd-tray{ background:#0C0A09; border:1px solid rgba(251,243,228,0.12); border-radius:30px; padding:clamp(18px,3vw,30px); box-shadow:0 30px 70px rgba(0,0,0,0.45), inset 0 1px 0 rgba(251,243,228,0.06); }
.pd-tray-row{ display:flex; align-items:flex-end; justify-content:center; gap:clamp(8px,1.6vw,16px); flex-wrap:nowrap; }
.pd-tray-home{ flex-shrink:0; }
.pd-tray-sep{ width:1px; align-self:stretch; background:rgba(251,243,228,0.14); margin:0 clamp(2px,0.6vw,6px); }
.pd-tray-key{ display:block; flex-shrink:0; border-radius:14px; outline:none; transition:transform .2s; }
.pd-tray-key:focus-visible{ box-shadow:0 0 0 3px var(--peri); }
.pd-tray-term{ margin-top:22px; background:rgba(251,243,228,0.05); border-radius:12px; padding:13px 15px; font-family:${MONO}; font-size:.76rem; min-height:44px; }
.pd-caret{ display:inline-block; width:7px; height:13px; background:var(--accent); margin-left:5px; vertical-align:-2px; animation:pdBlink 1s steps(2,start) infinite; }
@keyframes pdBlink{ to{ visibility:hidden; } }
.pd-pulse{ animation:pdPulse 2s ease-in-out infinite; }
@keyframes pdPulse{ 0%,100%{opacity:1} 50%{opacity:.35} }

@media (max-width:560px){
  .pd-tray-row svg, .pd-tray-home img{ height:52px !important; width:auto !important; }
  .pd-tray-row{ gap:7px; }
}
@media (max-width:380px){
  .pd-tray-row svg, .pd-tray-home img{ height:44px !important; }
}
@media (prefers-reduced-motion: reduce){ .pd-caret, .pd-pulse{ animation:none; } }
`;
