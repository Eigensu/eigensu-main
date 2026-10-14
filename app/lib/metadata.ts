import type { Metadata } from "next";
import { SITE } from "./site";

/**
 * Per-page metadata with a canonical URL and matching Open Graph / Twitter tags.
 * Child `openGraph` objects replace the parent's rather than merging, so every
 * page builds the full set here, including the default share image from
 * app/opengraph-image.tsx. A route-level opengraph-image file takes precedence.
 */
const DEFAULT_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.name}: systems for internal operations` };

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of applying the "%s | Eigensu" template. */
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_IN",
      url: path,
      title: fullTitle,
      description,
      images: [DEFAULT_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [DEFAULT_IMAGE],
    },
  };
}
