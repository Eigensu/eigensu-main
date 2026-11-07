"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeHeroSection } from "../components/ThemeHero";
import { Reveal, ScrollProgress, cx } from "../components/motion";
import { headingId, relatedPosts, type Block, type Post } from "../lib/posts";
import { Arrow, Btn, PostRow } from "./Blog";
import s from "../home.module.css";
import e from "./editorial.module.css";

const isComment = (line: string) => /^\s*(\/\/|--|#)/.test(line);

function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2 id={headingId(block.text)}>{block.text}</h2>;
    case "ul":
      return <ul>{block.items.map(item => <li key={item}>{item}</li>)}</ul>;
    case "quote":
      return <blockquote><p>{block.text}</p></blockquote>;
    case "code":
      return (
        <figure className={e.code}>
          <figcaption className={e.codeBar}>
            {["#FF7661", "var(--butter)", "#65C58A"].map(c => <i key={c} style={{ background: c }} aria-hidden />)}
            <span className={e.codeFile}>{block.file}</span>
          </figcaption>
          <pre className={e.codeBody} style={{ margin: 0 }}>
            <code>
              {block.lines.map((line, i) => (
                <span key={i} className={cx(e.codeLine, isComment(line) && e.tCm)}>{line || " "}</span>
              ))}
            </code>
          </pre>
        </figure>
      );
    case "stat":
      return (
        <div className={e.artStats}>
          {block.items.map(it => (
            <div key={it.label} className={e.artStat}>
              <div className={e.artStatNum}>{it.num}</div>
              <div className={e.artStatLbl}>{it.label}</div>
            </div>
          ))}
        </div>
      );
    case "note":
      return (
        <aside className={e.note}>
          <div className={e.noteLabel}>{block.label}</div>
          <p>{block.text}</p>
        </aside>
      );
  }
}

function TableOfContents({ headings }: { headings: string[] }) {
  const [active, setActive] = useState(headingId(headings[0] ?? ""));

  useEffect(() => {
    const els = headings.map(h => document.getElementById(headingId(h))).filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      entries => {
        const shown = entries.filter(en => en.isIntersecting);
        if (shown.length) setActive(shown[0].target.id);
      },
      { rootMargin: "-110px 0px -65% 0px" },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [headings]);

  if (headings.length < 2) return <div />;
  return (
    <nav aria-label="On this page" className={e.toc}>
      <div className={e.tocLabel}>On this page</div>
      <ol>
        {headings.map(h => {
          const id = headingId(h);
          return <li key={id}><a href={`#${id}`} aria-current={active === id ? "true" : undefined}>{h}</a></li>;
        })}
      </ol>
    </nav>
  );
}

export default function ArticlePage({ post }: { post: Post }) {
  const headings = post.body.flatMap(b => (b.t === "h2" ? [b.text] : []));
  const related = relatedPosts(post.slug);

  return (
    <div>
      <ScrollProgress />

      {/* ── Hero ── */}
      <ThemeHeroSection plain background="var(--wine)" className="z-[2] max-md:min-h-0!" contentClassName="justify-end pb-10 pt-[calc(var(--page-offset-top)+0.75rem)]! md:pt-[calc(var(--page-offset-top)+2.5rem)]! md:pb-16">
        <Link href="/blog" className={cx(e.back, s.fade)} style={{ animationDelay: ".05s" }}>
          <span aria-hidden>←</span> All writing
        </Link>
        <div className={cx(s.metaRow, s.fade)} style={{ animationDelay: ".1s" }}>
          <span><b>{post.category}</b></span>
          <span>{post.readTime}</span>
        </div>
        <h1 className={cx(e.artTitle, s.fade)} style={{ animationDelay: ".2s" }}>{post.title}</h1>
        <p className={cx(s.lede, s.fade)} style={{ animationDelay: ".4s", marginTop: "clamp(1.25rem,2.4vw,1.75rem)", maxWidth: "54ch" }}>{post.excerpt}</p>
        <div className={cx(e.byline, s.fade)} style={{ animationDelay: ".55s" }}>
          <span>By <b>{post.author}</b></span>
          <time dateTime={post.iso}>{post.date}</time>
        </div>
      </ThemeHeroSection>

      {/* ── Body ── */}
      <section className={cx(s.sec, e.first)}>
        <div className={s.wrap}>
          <div className={e.artLayout}>
            <TableOfContents headings={headings} />
            <article className={e.prose}>
              {post.body.map((block, i) => <BlockView key={i} block={block} />)}
              <div className={e.artFoot}>
                <div>
                  <div className={e.artFootLbl}>Written by</div>
                  <div className={e.artFootName}>{post.author}</div>
                </div>
                <Link href="/blog" className={e.artFootLink}>← All writing</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── Related ── */}
      <section className={cx(s.sec, e.plain)} style={{ paddingTop: "clamp(24px,4vw,48px)" }}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.eyebrow}>Keep reading</div>
            <h2 className={s.h2} style={{ color: "var(--wine)" }}>Related.</h2>
          </Reveal>
          <div className={e.list}>
            {related.map(p => <PostRow key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={s.cta}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.eyebrow} style={{ color: "var(--butter)" }}>Next step</div>
            <h2 className={s.ctaBig}>Sound<br /><em>familiar?</em></h2>
          </Reveal>
          <div className={s.ctaRow}>
            <p className={s.ctaSub}>If this describes a process at your company, we should talk. We&rsquo;ll be honest if we&rsquo;re not the right team.</p>
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
