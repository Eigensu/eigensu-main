"use client";

import { useState } from "react";
import { ThemeHeroSection } from "../components/ThemeHero";
import BusinessCard from "../components/BusinessCard";
import { ProductKey } from "../components/Brand";
import CustomRequest, { type RequestPreset } from "../components/CustomRequest";
import { CUSTOM_KEY, PRODUCTS } from "../lib/products";

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";

const DEMO_KEYS = [
  ...PRODUCTS.map((p) => ({ id: p.slug, label: p.name, spec: p.key, kind: "Custom product" as const, text: `We'd like a demo of ${p.name}.\n\nAbout us: ` })),
  { id: "custom", label: "Something custom", spec: CUSTOM_KEY, kind: "Not sure yet" as const, text: "We'd like to talk through a custom build.\n\nWhat we need: " },
];

export default function ContactPage() {
  const [preset, setPreset] = useState<RequestPreset | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function pick(k: (typeof DEMO_KEYS)[number]) {
    setPicked(k.id);
    setPreset((p) => ({ kind: k.kind, text: k.text, nonce: (p?.nonce ?? 0) + 1 }));
    window.setTimeout(() => scrollTo("request"), 260);
  }

  return (
    <div>
      {/* ── Hero: the card ── */}
      <ThemeHeroSection>
        <div className="grid w-full gap-12 min-[960px]:grid-cols-[0.9fr_1.1fr] min-[960px]:items-center">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 16 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
              Contact // let&apos;s talk
            </div>
            <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2.2rem,5vw,4rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "var(--text)", maxWidth: "14ch", margin: "0 0 20px", textWrap: "balance" }}>
              Talk to the people who <span style={{ color: "var(--peri)" }}>build it</span>.
            </h1>
            <p className="hero-anim-4" style={{ color: "var(--text-muted)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "42ch", lineHeight: 1.7 }}>
              No sales team, no ticket queue. Book a demo, send a voice note, or write to us. It all lands with the engineers.
            </p>
          </div>
          <div className="hero-anim-5" style={{ display: "flex", justifyContent: "center" }}>
            <BusinessCard onBookDemo={() => scrollTo("demo")} />
          </div>
        </div>
      </ThemeHeroSection>

      {/* ── Book a demo ── */}
      <section id="demo" className="relative z-10 py-14 md:py-20" style={{ background: "var(--wine)", borderRadius: 48, scrollMarginTop: 90 }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--butter)", marginBottom: 16 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--butter)" }} />
                Book a demo
              </div>
              <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", letterSpacing: "-0.04em", lineHeight: 1, color: "var(--cream)", marginBottom: 14 }}>
                Press a key.
              </h2>
              <p style={{ color: "rgba(251,243,228,0.74)", lineHeight: 1.7, maxWidth: "40ch" }}>
                Pick what you want to see. We&apos;ll set up a 20-minute walkthrough on your data, not a slide deck.
              </p>
            </div>
            <div className="ct-keys">
              {DEMO_KEYS.map((k) => (
                <button key={k.id} type="button" className={`ct-key ${picked === k.id ? "on" : ""}`} onClick={() => pick(k)}>
                  <ProductKey spec={k.spec} size={78} tone="dark" pressed={picked === k.id} />
                  <span>{k.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Request ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24" style={{ scrollMarginTop: 80 }}>
        <div className="w-full max-w-[880px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(1.8rem,3.6vw,2.8rem)", letterSpacing: "-0.04em", lineHeight: 1, color: "var(--text)", marginBottom: 10 }}>
              {picked ? "Tell us a little about you." : "Or just tell us what you need."}
            </h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>Type it or record a voice note. Voice notes get a reply within one hour.</p>
          </div>
          <CustomRequest preset={preset} />
        </div>
      </section>

      <style>{`
        .ct-keys{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; }
        .ct-key{ display:flex; flex-direction:column; align-items:center; gap:12px; padding:18px 8px 16px; border-radius:20px; background:rgba(251,243,228,0.05); border:1px solid rgba(251,243,228,0.1); color:var(--cream); font-family:${HEAD}; font-weight:700; font-size:.95rem; letter-spacing:-.01em; transition:background .2s, border-color .2s, transform .2s; }
        .ct-key:hover{ background:rgba(251,243,228,0.1); transform:translateY(-3px); }
        .ct-key.on{ border-color:var(--peri); background:rgba(92,124,240,0.16); }
        .ct-key:focus-visible{ outline:2px solid var(--peri); outline-offset:3px; }
        @media (max-width:640px){
          .ct-keys{ grid-template-columns:repeat(2,minmax(0,1fr)); }
        }
      `}</style>
    </div>
  );
}
