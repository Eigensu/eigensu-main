"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeHeroSection } from "../components/ThemeHero";
import { Reveal, ScrollProgress, cx, useMagnetic } from "../components/motion";
import { CATEGORIES, POSTS, type Post } from "../lib/posts";
import s from "../home.module.css";
import e from "./editorial.module.css";

export const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={15} height={15} aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export function Btn({ href, children, variant = "solid" }: { href: string; children: React.ReactNode; variant?: "solid" | "line" | "dark" }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.22);
  return (
    <Link ref={ref} href={href} className={cx(s.btn, variant === "solid" && s.btnSolid, variant === "line" && s.btnLine, variant === "dark" && s.btnDark)}>
      {children}
    </Link>
  );
}

/** One editorial row: date · title + excerpt · category · arrow. Used on /blog and under articles. */
export function PostRow({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className={e.item}>
      <time className={e.itemDate} dateTime={post.iso}>{post.date}</time>
      <div>
        <h3 className={e.itemTitle}>{post.title}</h3>
        <p className={e.itemBody}>{post.excerpt}</p>
      </div>
      <span className={e.itemCat}>{post.category} <span>· {post.readTime.replace(" read", "")}</span></span>
      <span className={e.itemArrow}><Arrow /></span>
    </Link>
  );
}

function firstQuote(post: Post) {
  const q = post.body.find(b => b.t === "quote");
  return q && q.t === "quote" ? q.text : post.excerpt;
}

export default function BlogPage() {
  const [filter, setFilter] = useState<string>("All");
  const [featured, ...rest] = POSTS;
  const shown = filter === "All" ? rest : POSTS.filter(p => p.category === filter);
  const count = (c: string) => (c === "All" ? rest.length : POSTS.filter(p => p.category === c).length);

  return (
    <div>
      <ScrollProgress />

      {/* ── Hero ── */}
      <ThemeHeroSection plain background="var(--wine)" className="z-[2] max-md:min-h-0!" contentClassName="justify-end pb-10 pt-[calc(var(--page-offset-top)+0.75rem)]! md:pt-[calc(var(--page-offset-top)+2.5rem)]! md:pb-16">
        <div className={cx(s.metaRow, s.fade)} style={{ animationDelay: ".05s" }}>
          <span>Writing</span>
          <span><b>{String(POSTS.length).padStart(2, "0")}</b> articles</span>
          <span>Latest · {featured.date}</span>
        </div>
        <h1 className={cx(s.mega, e.heroMega)}>
          <span className={s.line}><span>Notes from</span></span>
          <span className={s.line}><span style={{ color: "var(--ember)" }}>the build.</span></span>
        </h1>
        <p className={cx(s.lede, s.fade)} style={{ animationDelay: ".7s", marginTop: "clamp(1.5rem,3vw,2.25rem)" }}>
          What we&rsquo;ve learned building operations software: the patterns that hold up, the ones that don&rsquo;t, and the arithmetic behind both.
        </p>
      </ThemeHeroSection>

      {/* ── Featured ── */}
      <section className={cx(s.sec, e.first)}>
        <div className={s.wrap}>
          <Reveal><div className={s.eyebrow}>Latest article</div></Reveal>
          <Reveal delay={0.05}>
            <Link href={`/blog/${featured.slug}`} className={e.featured}>
              <div>
                <div className={e.meta}>
                  <b>{featured.category}</b>
                  <time dateTime={featured.iso}>{featured.date}</time>
                  <span>{featured.readTime}</span>
                </div>
                <h2 className={e.featTitle}>{featured.title}</h2>
                <p className={e.featBody}>{featured.excerpt}</p>
                <span className={cx(e.featCta)}>
                  <span className={cx(s.btn, s.btnDark)}>Read article <Arrow /></span>
                </span>
              </div>
              <blockquote className={e.featQuote}>
                <q>{firstQuote(featured)}</q>
                <span className={e.featQuoteFoot}>From the article</span>
              </blockquote>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Archive ── */}
      <section className={cx(s.sec, e.plain)} style={{ paddingTop: "clamp(40px,6vw,80px)" }}>
        <div className={s.wrap}>
          <div className={e.archiveHead}>
            <Reveal>
              <div className={s.eyebrow}>All writing</div>
              <h2 className={s.h2} style={{ color: "var(--wine)" }}>Archive.</h2>
            </Reveal>
            <div className={e.filters} role="group" aria-label="Filter by category">
              {["All", ...CATEGORIES].map(c => (
                <button key={c} type="button" className={e.chip} aria-pressed={filter === c} onClick={() => setFilter(c)}>
                  {c}<span>{count(c)}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={e.list} aria-live="polite">
            {shown.map(p => <PostRow key={p.slug} post={p} />)}
            {shown.length === 0 && <p className={e.empty}>Nothing here yet.</p>}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={s.cta}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.eyebrow} style={{ color: "var(--butter)" }}>Next step</div>
            <h2 className={s.ctaBig}>Recognise<br /><em>your process?</em></h2>
          </Reveal>
          <div className={s.ctaRow}>
            <p className={s.ctaSub}>Most of these articles started as a client conversation. A 30-minute call is usually enough to tell if we can help.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Btn href="/contact" variant="dark">Book a call <Arrow /></Btn>
              <Btn href="/services" variant="line">Our services</Btn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
