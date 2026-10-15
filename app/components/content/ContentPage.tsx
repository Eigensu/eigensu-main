import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeHeroSection } from "../ThemeHero";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import { formatDate } from "../../content/facts";

/**
 * Shell for search-led pages: breadcrumbs, one H1, the opening paragraph
 * (which carries the page's target phrase) and a "last updated" date.
 */
export default function ContentPage({
  crumbs,
  eyebrow,
  title,
  intro,
  updated,
  published,
  author,
  wide = false,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  updated: string;
  /** Shown for articles, with the author. */
  published?: string;
  author?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <ThemeHeroSection contentClassName="content-hero">
        <Breadcrumbs items={crumbs} />
        <div className="content-eyebrow">{eyebrow}</div>
        <h1 className="content-h1 hero-anim-3">{title}</h1>
        <p className="content-intro hero-anim-4">{intro}</p>
        <p className="content-updated hero-anim-4">
          {author && <>By <Link href="/about">{author}</Link> · </>}
          {published && published !== updated && <>Published <time dateTime={published}>{formatDate(published)}</time> · </>}
          Last updated <time dateTime={updated}>{formatDate(updated)}</time>
        </p>
      </ThemeHeroSection>
      <div className={`content w-full mx-auto px-5 sm:px-8 ${wide ? "max-w-[1100px]" : "max-w-[860px]"}`}>{children}</div>
    </div>
  );
}
