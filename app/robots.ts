import type { MetadataRoute } from "next";
import { absoluteUrl } from "./lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Search engines (Googlebot, Bingbot) fall under "*". Rules for AI crawlers are added in Phase 4.
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
