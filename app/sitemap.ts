import type { MetadataRoute } from "next";
import { ROUTES } from "./lib/routes";
import { absoluteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: absoluteUrl(r.path),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
