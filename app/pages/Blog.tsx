"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useModal } from "../components/PageShell";
import { ThemeHeroSection } from "../components/ThemeHero";
import { CATEGORIES, POSTS, categoryStyle, type Post } from "../lib/posts";

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";
const BODY = "var(--font-body), 'Instrument Sans', sans-serif";

/* ── Eyebrow ─────────────────────────────────────────────────────────────── */

function Eyebrow({ children, color = "var(--accent)" }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase" as const, color, marginBottom: 18 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 10px ${color}`, flexShrink: 0 }} />
      {children}
    </div>
  );
}

/* ── Buttons ─────────────────────────────────────────────────────────────── */

function BtnPrimary({ href, onClick, children, invert = false }: { href?: string; onClick?: () => void; children: React.ReactNode; invert?: boolean }) {
  const s = { display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, background: invert ? "var(--wine)" : "var(--accent)", color: invert ? "var(--cream)" : "var(--on-accent)", boxShadow: invert ? "0 8px 28px -8px rgba(0,0,0,0.45)" : "0 0 0 1px var(--accent-line), 0 8px 28px -8px var(--accent)", textDecoration: "none", whiteSpace: "nowrap" as const };
  if (href) return <Link href={href} style={s}>{children}</Link>;
  return <button type="button" onClick={onClick} style={s}>{children}</button>;
}

function BtnGhost({ href, onClick, children, invert = false }: { href?: string; onClick?: () => void; children: React.ReactNode; invert?: boolean }) {
  const s = { display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, color: invert ? "var(--cream)" : "var(--text)", border: invert ? "1px solid rgba(251,243,228,0.35)" : "1px solid var(--border-strong)", textDecoration: "none", whiteSpace: "nowrap" as const };
  if (href) return <Link href={href} style={s}>{children}</Link>;
  return <button type="button" onClick={onClick} style={s}>{children}</button>;
}

/* ── useReveal ───────────────────────────────────────────────────────────── */

function useReveal(threshold = 0.08) {
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

/* ── Category chip ───────────────────────────────────────────────────────── */

export function CategoryChip({ category, size = "sm" }: { category: string; size?: "sm" | "md" }) {
  const c = categoryStyle(category);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: c.bg,
        color: c.fg,
        borderRadius: 100,
        padding: size === "md" ? "7px 15px" : "5px 12px",
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: size === "md" ? "0.66rem" : "0.6rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {category}
    </span>
  );
}

/* ── Featured card (hero, right column) ──────────────────────────────────── */

function FeaturedCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="pj-featured" style={{ display: "block", background: "var(--cream)", borderRadius: 26, padding: "26px 26px 24px", boxShadow: "24px 30px 60px rgba(59,10,34,0.3)", textDecoration: "none" }}>
      <div className="flex items-center justify-between gap-3" style={{ marginBottom: 20 }}>
        <span style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)" }}>Latest</span>
        <CategoryChip category={post.category} />
      </div>

      <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(1.4rem,2.4vw,1.9rem)", letterSpacing: "-0.03em", lineHeight: 1.08, color: "var(--wine)", marginBottom: 12 }}>
        {post.title}
      </h2>
      <p style={{ color: "var(--wine-2)", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: 22 }}>{post.excerpt}</p>

      <div className="flex items-center justify-between gap-3" style={{ paddingTop: 16, borderTop: "1px solid rgba(59,10,34,0.14)", fontFamily: MONO, fontSize: "0.66rem", color: "var(--muted)" }}>
        <span>{post.date} · {post.readTime}</span>
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>Read →</span>
      </div>
    </Link>
  );
}

/* ── Post card ───────────────────────────────────────────────────────────── */

function PostCard({ post, i, on }: { post: Post; i: number; on: boolean }) {
  const c = categoryStyle(post.category);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="pj-card"
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        border: "2px solid var(--wine)",
        borderRadius: 18,
        padding: "24px 24px 26px",
        textDecoration: "none",
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(18px)",
        transition: `opacity .55s ${(i % 3) * 0.08}s, transform .55s ${(i % 3) * 0.08}s, box-shadow .25s ease`,
      }}
    >
      <span style={{ display: "block", width: 40, height: 4, borderRadius: 100, background: c.bg, marginBottom: 20 }} />

      <div className="flex items-center justify-between gap-3" style={{ marginBottom: 16 }}>
        <CategoryChip category={post.category} />
        <span style={{ fontFamily: MONO, fontSize: "0.64rem", color: "var(--text-dim)" }}>{post.readTime}</span>
      </div>

      <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.025em", lineHeight: 1.16, color: "var(--wine)", marginBottom: 10 }}>
        {post.title}
      </h3>
      <p style={{ color: "var(--wine-2)", fontSize: "0.88rem", lineHeight: 1.65, flex: 1 }}>{post.excerpt}</p>

      <div className="flex items-center justify-between gap-3" style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid rgba(59,10,34,0.14)" }}>
        <time dateTime={post.iso} style={{ fontFamily: MONO, fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>{post.date}</time>
        <span className="pj-card-arrow" style={{ fontFamily: MONO, fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)" }}>Read article →</span>
      </div>
    </Link>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function BlogPage() {
  const { openModal } = useModal();
  const [active, setActive] = useState<string>("All");
  const gridReveal = useReveal();
  const ctaReveal = useReveal();

  const featured = POSTS[0];
  const rest = useMemo(() => POSTS.slice(1), []);
  const visible = useMemo(
    () => (active === "All" ? rest : rest.filter(p => p.category === active)),
    [active, rest]
  );

  return (
    <div>
      {/* ── Hero ── */}
      <ThemeHeroSection background="var(--wine)" className="rounded-b-[48px] z-[2]">
        <div className="grid w-full gap-10 min-[900px]:grid-cols-[1.08fr_0.92fr] min-[900px]:items-center" style={{ position: "relative", zIndex: 1 }}>
          <div>
            <div className="hero-anim-2">
              <Eyebrow color="var(--butter)">Writing // insights</Eyebrow>
            </div>
            <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2.4rem,5.6vw,4.6rem)", lineHeight: 0.95, letterSpacing: "-0.045em", color: "var(--cream)", maxWidth: "14ch", margin: "0 0 22px" }}>
              Notes from the people who <span style={{ color: "var(--accent)" }}>ship the systems</span>.
            </h1>
            <p className="hero-anim-4" style={{ color: "rgba(251,243,228,0.8)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "48ch", marginBottom: 28, lineHeight: 1.7 }}>
              Practical writing on operations, engineering and the unglamorous decisions behind systems that keep running. No thought leadership, no predictions — just what we learned building the thing.
            </p>
            <div className="hero-anim-4" style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(251,243,228,0.55)" }}>
              <span>{POSTS.length} articles</span>
              <span aria-hidden="true">·</span>
              <span>{CATEGORIES.length} topics</span>
            </div>
          </div>

          <div className="hero-anim-5">
            <FeaturedCard post={featured} />
          </div>
        </div>
      </ThemeHeroSection>

      {/* ── Archive ── */}
      <section className="relative z-10 pt-[88px] pb-14 md:pt-[112px] md:pb-20 lg:pb-24" style={{ overflow: "hidden", background: "var(--bg)", borderRadius: "48px 48px 0 0", marginTop: -48 }}>
        <div style={{ position: "absolute", width: 300, height: 300, left: -110, top: 60, background: "var(--butter)", borderRadius: "50%", opacity: 0.22, filter: "blur(1px)", zIndex: 0, pointerEvents: "none" }} />
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 620, marginBottom: 32 }}>
            <Eyebrow>The archive</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2rem,4.4vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--text)" }}>
              Everything we&apos;ve{" "}
              <span style={{ background: "linear-gradient(120deg,var(--text) 30%,var(--accent) 130%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>written down.</span>
            </h2>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2.5" style={{ marginBottom: 34 }}>
            {["All", ...CATEGORIES].map(cat => {
              const isOn = active === cat;
              const c = cat === "All" ? { bg: "var(--wine)", fg: "var(--cream)" } : categoryStyle(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  aria-pressed={isOn}
                  style={{
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: "0.66rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "9px 16px",
                    borderRadius: 100,
                    background: isOn ? c.bg : "transparent",
                    color: isOn ? c.fg : "var(--wine-2)",
                    border: `1.5px solid ${isOn ? c.bg : "rgba(59,10,34,0.22)"}`,
                    transition: "background .2s ease, color .2s ease, border-color .2s ease",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div ref={gridReveal.ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, i) => (
              <PostCard key={post.slug} post={post} i={i} on={gridReveal.on} />
            ))}
          </div>

          {visible.length === 0 && (
            <p style={{ fontFamily: MONO, fontSize: "0.8rem", color: "var(--text-dim)", padding: "40px 0" }}>
              Nothing filed under {active} yet.
            </p>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <div ref={ctaReveal.ref} style={{ position: "relative", textAlign: "center", background: "var(--ember)", overflow: "hidden", borderRadius: "48px 48px 0 0", opacity: ctaReveal.on ? 1 : 0, transform: ctaReveal.on ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ padding: "clamp(56px,9vw,96px) 0" }}>
          <Eyebrow color="var(--butter)">Get started</Eyebrow>
          <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--cream)", maxWidth: "24ch", margin: "0 auto 16px" }}>
            Recognise one of these problems in your own operation?
          </h2>
          <p style={{ color: "rgba(251,243,228,0.82)", fontSize: "clamp(0.9rem,1.3vw,1rem)", maxWidth: "48ch", margin: "0 auto 28px", lineHeight: 1.7 }}>
            We write about this because we spend our weeks fixing it. Tell us where the manual work is and we&apos;ll scope what removing it looks like.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <BtnPrimary href="/onboard" invert>Onboard a project</BtnPrimary>
            <BtnGhost onClick={openModal} invert>Book a call</BtnGhost>
          </div>
        </div>
      </div>

      <style>{`
        .pj-featured{ transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease; }
        .pj-featured:hover{ transform: translateY(-5px); box-shadow: 24px 36px 70px rgba(59,10,34,.38); }

        .pj-card:hover{ box-shadow: 0 16px 32px rgba(59,10,34,.18); transform: translateY(-4px) !important; }
        .pj-card-arrow{ transition: opacity .2s ease; }
        .pj-card:hover .pj-card-arrow{ opacity: .7; }

        @media (prefers-reduced-motion: reduce){
          .pj-featured, .pj-card{ transition: none !important; }
        }
      `}</style>
    </div>
  );
}
