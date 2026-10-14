import type { Metadata } from "next";

/**
 * "review" pages are built and reachable by URL (so they can be checked on a
 * preview deployment) but are noindex, left out of the sitemap and not linked
 * from other pages until the owner approves them by switching to "published".
 */
export type PageStatus = "published" | "review";

export function robotsFor(status: PageStatus): Metadata["robots"] {
  return status === "review" ? { index: false, follow: false } : undefined;
}
