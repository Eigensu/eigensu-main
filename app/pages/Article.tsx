"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useModal } from "../components/PageShell";
import { ThemeHeroSection } from "../components/ThemeHero";
import { CategoryChip } from "./Blog";
import { categoryStyle, headingId, relatedPosts, type Block, type Post } from "../lib/posts";

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";
const BODY = "var(--font-body), 'Instrument Sans', sans-serif";

/* ── Reading progress ────────────────────────────────────────────────────── */

function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 95, pointerEvents: "none" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: "var(--ember)", transition: "width .1s linear" }} />
    </div>
  );
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

/* ── Block renderer ──────────────────────────────────────────────────────── */

function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case "p":
      return (
        <p style={{ color: "var(--wine-2)", fontSize: "clamp(1rem,1.25vw,1.08rem)", lineHeight: 1.8, margin: "0 0 22px" }}>
          {block.text}
        </p>
      );

    case "h2":
      return (
        <h2
          id={headingId(block.text)}
          style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(1.4rem,2.6vw,2rem)", letterSpacing: "-0.035em", lineHeight: 1.12, color: "var(--wine)", margin: "48px 0 18px", scrollMarginTop: 110 }}
        >
          {block.text}
        </h2>
      );

    case "ul":
      return (
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px", display: "flex", flexDirection: "column", gap: 14 }}>
          {block.items.map(item => (
            <li key={item} style={{ display: "flex", gap: 13, color: "var(--wine-2)", fontSize: "clamp(0.95rem,1.2vw,1.03rem)", lineHeight: 1.72 }}>
              <span style={{ flexShrink: 0, width: 18, height: 18, marginTop: 6, borderRadius: "50%", background: "rgba(240,73,31,0.12)", border: "1px solid rgba(240,73,31,0.35)", display: "grid", placeItems: "center" }}>
                <svg viewBox="0 0 12 12" width={9} height={9} fill="none" aria-hidden="true"><path d="M2 6l3 3 5-5" stroke="var(--ember)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote style={{ margin: "34px 0", padding: "6px 0 6px 26px", borderLeft: "3px solid var(--butter)" }}>
          <p style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.15rem,2vw,1.5rem)", letterSpacing: "-0.025em", lineHeight: 1.32, color: "var(--wine)", margin: 0 }}>
            {block.text}
          </p>
        </blockquote>
      );

    case "code":
      return (
        <figure style={{ margin: "30px 0", background: "var(--wine)", borderRadius: 16, overflow: "hidden", boxShadow: "0 16px 34px rgba(59,10,34,0.22)" }}>
          <figcaption style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid rgba(251,243,228,0.12)" }}>
            {["#FF7661", "var(--butter)", "#65C58A"].map(c => <i key={c} style={{ width: 9, height: 9, borderRadius: "50%", display: "block", background: c }} />)}
            <span style={{ marginLeft: 6, fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "0.06em", color: "rgba(251,243,228,0.55)" }}>{block.file}</span>
          </figcaption>
          <pre className="art-code" style={{ margin: 0, padding: "18px 16px", overflowX: "auto" }}>
            <code style={{ fontFamily: MONO, fontSize: "0.76rem", lineHeight: 1.85, color: "rgba(251,243,228,0.86)", whiteSpace: "pre" }}>
              {block.lines.map((line, i) => (
                <span key={i} style={{ display: "block", color: line.trimStart().startsWith("//") || line.trimStart().startsWith("--") || line.trimStart().startsWith("#") ? "rgba(251,243,228,0.42)" : undefined }}>
                  {line || " "}
                </span>
              ))}
            </code>
          </pre>
        </figure>
      );

    case "stat":
      return (
        <div className="art-stats" style={{ margin: "32px 0", background: "#fff", border: "2px solid var(--wine)", borderRadius: 16, overflow: "hidden" }}>
          {block.items.map((s, i) => (
            <div key={s.label} style={{ padding: "22px 20px", borderRight: i < block.items.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(1.5rem,3.2vw,2.1rem)", letterSpacing: "-0.035em", lineHeight: 1, color: "var(--accent)" }}>{s.num}</div>
              <div style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--wine-2)", marginTop: 10, lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      );

    case "note":
      return (
        <aside style={{ margin: "30px 0", background: "#F4E9D6", borderLeft: "3px solid var(--ember)", borderRadius: "0 14px 14px 0", padding: "20px 22px" }}>
          <div style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>{block.label}</div>
          <p style={{ margin: 0, color: "var(--wine-2)", fontSize: "0.95rem", lineHeight: 1.72 }}>{block.text}</p>
        </aside>
      );
  }
}

/* ── Table of contents ───────────────────────────────────────────────────── */

function TableOfContents({ headings }: { headings: string[] }) {
  const [active, setActive] = useState(headings[0] ?? "");

  useEffect(() => {
    if (headings.length === 0) return;
    const els = headings
      .map(h => document.getElementById(headingId(h)))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      entries => {
        const shown = entries.filter(e => e.isIntersecting);
        if (shown.length > 0) setActive(shown[0].target.id);
      },
      { rootMargin: "-110px 0px -65% 0px", threshold: 0 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="On this page" className="art-toc">
      <div style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 16 }}>
        On this page
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 2 }}>
        {headings.map(h => {
          const id = headingId(h);
          const isOn = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                style={{
                  display: "block",
                  padding: "8px 0 8px 14px",
                  borderLeft: `2px solid ${isOn ? "var(--accent)" : "rgba(59,10,34,0.14)"}`,
                  fontFamily: BODY,
                  fontSize: "0.82rem",
                  lineHeight: 1.45,
                  color: isOn ? "var(--wine)" : "var(--muted)",
                  fontWeight: isOn ? 600 : 400,
                  transition: "color .2s ease, border-color .2s ease",
                }}
              >
                {h}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ── Related card ────────────────────────────────────────────────────────── */

function RelatedCard({ post }: { post: Post }) {
  const c = categoryStyle(post.category);
  return (
    <Link href={`/blog/${post.slug}`} className="art-related" style={{ display: "flex", flexDirection: "column", background: "#fff", border: "2px solid var(--wine)", borderRadius: 18, padding: "22px 22px 24px", textDecoration: "none" }}>
      <span style={{ display: "block", width: 36, height: 4, borderRadius: 100, background: c.bg, marginBottom: 18 }} />
      <CategoryChip category={post.category} />
      <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.12rem", letterSpacing: "-0.025em", lineHeight: 1.2, color: "var(--wine)", margin: "14px 0 10px" }}>{post.title}</h3>
      <p style={{ color: "var(--wine-2)", fontSize: "0.85rem", lineHeight: 1.6, flex: 1 }}>{post.excerpt}</p>
      <span style={{ marginTop: 18, fontFamily: MONO, fontSize: "0.68rem", fontWeight: 700, color: "var(--accent)" }}>Read article →</span>
    </Link>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function ArticlePage({ post }: { post: Post }) {
  const { openModal } = useModal();
  const headings = post.body.filter((b): b is Extract<Block, { t: "h2" }> => b.t === "h2").map(b => b.text);
  const related = relatedPosts(post.slug);
  const relReveal = useReveal();

  return (
    <div>
      <ReadingProgress />

      {/* ── Hero ── */}
      <ThemeHeroSection background="var(--wine)" className="rounded-b-[48px] z-[2]">
        <div style={{ position: "relative", zIndex: 1, maxWidth: 780 }}>
          <Link href="/blog" className="hero-anim-2" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(251,243,228,0.6)", marginBottom: 26 }}>
            ← All writing
          </Link>

          <div className="hero-anim-3" style={{ marginBottom: 20 }}>
            <CategoryChip category={post.category} size="md" />
          </div>

          <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2.1rem,5vw,4rem)", lineHeight: 0.98, letterSpacing: "-0.045em", color: "var(--cream)", margin: "0 0 22px" }}>
            {post.title}
          </h1>

          <p className="hero-anim-4" style={{ color: "rgba(251,243,228,0.8)", fontSize: "clamp(1rem,1.5vw,1.2rem)", maxWidth: "54ch", lineHeight: 1.65, marginBottom: 30 }}>
            {post.excerpt}
          </p>

          <div className="hero-anim-4 flex flex-wrap items-center" style={{ gap: 14, paddingTop: 22, borderTop: "1px solid rgba(251,243,228,0.18)", fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "0.06em", color: "rgba(251,243,228,0.6)" }}>
            <span style={{ color: "var(--butter)" }}>{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.iso}>{post.date}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </ThemeHeroSection>

      {/* ── Body ── */}
      <section className="relative z-10 pt-[80px] pb-14 md:pt-[104px] md:pb-20" style={{ overflow: "hidden", background: "var(--bg)", borderRadius: "48px 48px 0 0", marginTop: -48 }}>
        <div style={{ position: "absolute", width: 280, height: 280, right: -110, top: 100, background: "var(--peri)", borderRadius: "50%", opacity: 0.16, zIndex: 0, pointerEvents: "none" }} />
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ position: "relative", zIndex: 1 }}>
          <div className="art-layout">
            <article>
              {post.body.map((block, i) => <BlockView key={i} block={block} />)}

              <div style={{ marginTop: 48, paddingTop: 28, borderTop: "2px solid var(--wine)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 8 }}>Written by</div>
                  <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.02em", color: "var(--wine)" }}>{post.author}</div>
                </div>
                <Link href="/blog" style={{ fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700 }}>
                  ← Back to all writing
                </Link>
              </div>
            </article>

            <aside className="art-side">
              <TableOfContents headings={headings} />
            </aside>
          </div>
        </div>
      </section>

      {/* ── Related ── */}
      <section className="relative z-10 py-14 md:py-20" style={{ background: "var(--bg)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ maxWidth: 520, marginBottom: 34 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent)", marginBottom: 18 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
              Keep reading
            </div>
            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(1.7rem,3.4vw,2.8rem)", letterSpacing: "-0.04em", lineHeight: 1, color: "var(--text)" }}>More from the team.</h2>
          </div>
          <div ref={relReveal.ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ opacity: relReveal.on ? 1 : 0, transform: relReveal.on ? "translateY(0)" : "translateY(18px)", transition: "opacity .6s, transform .6s" }}>
            {related.map(p => <RelatedCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div style={{ position: "relative", textAlign: "center", background: "var(--ember)", overflow: "hidden", borderRadius: "48px 48px 0 0" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ padding: "clamp(56px,9vw,96px) 0" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--butter)", marginBottom: 18 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--butter)", boxShadow: "0 0 10px var(--butter)" }} />
            Get started
          </div>
          <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--cream)", maxWidth: "24ch", margin: "0 auto 16px" }}>
            Rather have us fix it than read about it?
          </h2>
          <p style={{ color: "rgba(251,243,228,0.82)", fontSize: "clamp(0.9rem,1.3vw,1rem)", maxWidth: "48ch", margin: "0 auto 28px", lineHeight: 1.7 }}>
            Tell us which process is eating the most hours. We&apos;ll map it, scope it, and show you what the automated version looks like.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/onboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, background: "var(--wine)", color: "var(--cream)", boxShadow: "0 8px 28px -8px rgba(0,0,0,0.45)", textDecoration: "none" }}>
              Onboard a project
            </Link>
            <button type="button" onClick={openModal} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, color: "var(--cream)", border: "1px solid rgba(251,243,228,0.35)" }}>
              Book a call
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .art-layout{ display:grid; grid-template-columns: minmax(0,1fr); gap:48px; max-width:780px; }
        .art-side{ display:none; }
        @media (min-width:1100px){
          .art-layout{ grid-template-columns: minmax(0,1fr) 230px; max-width:none; gap:64px; }
          .art-side{ display:block; }
          .art-toc{ position:sticky; top:120px; }
        }

        .art-stats{ display:grid; grid-template-columns:1fr; }
        .art-stats > div{ border-right:none !important; border-bottom:1px solid var(--border); }
        .art-stats > div:last-child{ border-bottom:none; }
        @media (min-width:640px){
          .art-stats{ grid-template-columns:repeat(3,1fr); }
          .art-stats > div{ border-bottom:none; border-right:1px solid var(--border) !important; }
          .art-stats > div:last-child{ border-right:none !important; }
        }

        .art-code::-webkit-scrollbar{ height:8px; }
        .art-code::-webkit-scrollbar-thumb{ background:rgba(251,243,228,.2); border-radius:100px; }

        .art-related{ transition: transform .25s ease, box-shadow .25s ease; }
        .art-related:hover{ transform: translateY(-4px); box-shadow: 0 16px 32px rgba(59,10,34,.18); }

        @media (prefers-reduced-motion: reduce){
          .art-related{ transition:none !important; }
        }
      `}</style>
    </div>
  );
}
