import { PRODUCT } from "./site";

/** Every indexable page. The sitemap is generated from this list. */
export const ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: PRODUCT.path, priority: 0.9, changeFrequency: "weekly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/process", priority: 0.6, changeFrequency: "yearly" },
  { path: "/projects", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/onboard", priority: 0.5, changeFrequency: "yearly" },
  { path: "/careers", priority: 0.4, changeFrequency: "monthly" },
  // TODO(owner): add "/blog" back (route and entry) once real posts exist.
];
