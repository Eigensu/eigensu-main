"use client";

import Link from "next/link";
import { useRef } from "react";
import { useTheme } from "../components/PageShell";
import { ThemeHeroSection } from "../components/ThemeHero";
import { getThemeTokens } from "../lib/themeTokens";

export const POSTS = [
  {
    slug: "zero-downtime-cloud-migration",
    category: "Cloud",
    date: "Mar 12, 2026",
    readTime: "6 min read",
    title: "Zero-downtime cloud migration without the drama",
    excerpt:
      "How we moved a 2,400-seat financial institution to hybrid AWS and Azure while keeping payment pipelines at 99.99% SLA.",
  },
  {
    slug: "zero-trust-in-90-days",
    category: "Security",
    date: "Feb 28, 2026",
    readTime: "8 min read",
    title: "Zero trust in 90 days: a healthcare case study",
    excerpt:
      "Deploying identity-first security across 14 hospitals — and achieving ISO 27001 ahead of schedule.",
  },
  {
    slug: "event-driven-logistics",
    category: "Engineering",
    date: "Feb 14, 2026",
    readTime: "5 min read",
    title: "Sub-100ms tracking with an event-driven backbone",
    excerpt:
      "Why Kafka beat polling for a pan-India operator managing 18,000+ daily shipments.",
  },
  {
    slug: "managed-services-sre",
    category: "Operations",
    date: "Jan 30, 2026",
    readTime: "7 min read",
    title: "What 24/7 managed services actually looks like",
    excerpt:
      "MTTD under four minutes, MTTR under twenty-two — sustained over three years of SRE ownership.",
  },
  {
    slug: "lakehouse-analytics",
    category: "Data",
    date: "Jan 18, 2026",
    readTime: "6 min read",
    title: "From fragmented BI to a modern lakehouse",
    excerpt:
      "Eleven data sources, one Snowflake warehouse, and analyst turnaround that went from days to minutes.",
  },
  {
    slug: "ai-assisted-delivery",
    category: "Process",
    date: "Jan 5, 2026",
    readTime: "4 min read",
    title: "AI tools in enterprise delivery (without the hype)",
    excerpt:
      "Where Cursor, Copilot, and structured review workflows actually save time — and where they don't.",
  },
];

// Split posts into two rows: first 3 go left→right, last 3 go right→left
const ROW_ONE = POSTS.slice(0, 3);
const ROW_TWO = POSTS.slice(3, 6);

interface PostCardProps {
  post: (typeof POSTS)[0];
  t: ReturnType<typeof getThemeTokens>;
  index: number;
}

function PostCard({ post, t, index }: PostCardProps) {
  return (
    <article
      className="flex flex-col rounded-[28px] border p-6 md:p-7"
      style={{
        background: t.panel,
        borderColor: t.border,
        width: "340px",
        flexShrink: 0,
        boxShadow:
          index === 0
            ? t.isDark
              ? "0 20px 60px rgba(0,0,0,0.22)"
              : "0 20px 60px rgba(15,23,42,0.06)"
            : "none",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
          style={{ borderColor: t.border, color: t.accent, background: t.accentSoft }}
        >
          {post.category}
        </span>
        <span className="font-body text-xs" style={{ color: t.muted }}>
          {post.readTime}
        </span>
      </div>

      <h2 className="mt-5 text-2xl leading-tight tracking-tight" style={{ color: t.heading }}>
        {post.title}
      </h2>

      <p className="font-body mt-3 flex-1 text-sm leading-7 md:text-[15px]" style={{ color: t.body }}>
        {post.excerpt}
      </p>

      <div
        className="mt-6 flex items-center justify-between gap-4 border-t pt-5"
        style={{ borderColor: t.border }}
      >
        <time
          className="font-body text-xs uppercase tracking-[0.12em]"
          style={{ color: t.muted }}
          dateTime={post.date}
        >
          {post.date}
        </time>
        <Link
          href={`/blog/${post.slug}`}
          className="font-body inline-flex items-center gap-1.5 text-sm font-medium no-underline transition-opacity hover:opacity-75"
          style={{ color: t.accent }}
        >
          Read article
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

interface MarqueeRowProps {
  posts: typeof POSTS;
  direction: "left" | "right";
  t: ReturnType<typeof getThemeTokens>;
  indexOffset?: number;
}

function MarqueeRow({ posts, direction, t, indexOffset = 0 }: MarqueeRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const pauseAnimation = () => {
    if (rowRef.current) {
      rowRef.current.style.animationPlayState = "paused";
    }
  };

  const resumeAnimation = () => {
    if (rowRef.current) {
      rowRef.current.style.animationPlayState = "running";
    }
  };

  // Duplicate cards so the loop is seamless
  const doubled = [...posts, ...posts];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={pauseAnimation}
      onMouseLeave={resumeAnimation}
      onFocus={pauseAnimation}
      onBlur={resumeAnimation}
    >
      <div
        ref={rowRef}
        className="flex gap-5"
        style={{
          width: "max-content",
          animation: `marquee-${direction} 28s linear infinite`,
        }}
      >
        {doubled.map((post, i) => (
          <PostCard
            key={`${post.slug}-${i}`}
            post={post}
            t={t}
            index={i < posts.length ? i + indexOffset : i - posts.length + indexOffset}
          />
        ))}
      </div>
    </div>
  );
}

export default function BlogPage() {
  const { theme } = useTheme();
  const t = getThemeTokens(theme);

  return (
    <>
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div className="min-h-screen" style={{ transition: "background 0.65s ease" }}>
        <ThemeHeroSection contentClassName="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <div
              className="hero-anim-2 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em]"
              style={{ borderColor: t.border, color: t.accent, background: t.accentSoft }}
            >
              Insights &amp; updates
            </div>
            <h1
              className="hero-anim-3 mt-6 text-4xl leading-none tracking-tight md:text-5xl lg:text-6xl xl:text-7xl"
              style={{ color: t.heading }}
            >
              Notes from the eigensu team.
            </h1>
            <p
              className="hero-anim-4 mt-6 max-w-2xl text-base leading-7 md:text-lg"
              style={{ color: t.body }}
            >
              Practical writing on cloud, security, software engineering, and how we deliver
              enterprise-grade systems without unnecessary complexity.
            </p>
          </div>
        </ThemeHeroSection>

        <section
          className="w-full pb-16 md:pb-24 space-y-5"
          style={{ background: t.contentBg, transition: "background 0.65s ease" }}
        >
          <MarqueeRow posts={ROW_ONE} direction="left" t={t} indexOffset={0} />
          <MarqueeRow posts={ROW_TWO} direction="right" t={t} indexOffset={3} />
        </section>
      </div>
    </>
  );
}