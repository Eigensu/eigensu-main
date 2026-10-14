import { PRODUCT } from "./site";
import { INDUSTRIES } from "../content/industries";
import { GUIDES } from "../content/guides";
import { COMPETITORS } from "../content/competitors";

type Route = { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" };

/**
 * Every indexable page. The sitemap is generated from this list. Pages in
 * "review" status (comparisons, legal drafts, the opt-in guide) are left out
 * until the owner publishes them.
 */
export const ROUTES: Route[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: PRODUCT.path, priority: 0.9, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/whatsapp-cost-calculator", priority: 0.8, changeFrequency: "monthly" },
  ...INDUSTRIES.map((i): Route => ({ path: `/for/${i.slug}`, priority: 0.8, changeFrequency: "monthly" })),
  { path: "/templates", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guides", priority: 0.6, changeFrequency: "monthly" },
  ...GUIDES.filter((g) => g.status === "published").map((g): Route => ({ path: `/guides/${g.slug}`, priority: 0.7, changeFrequency: "monthly" })),
  ...COMPETITORS.filter((c) => c.status === "published").map((c): Route => ({ path: `/compare/${c.slug}`, priority: 0.6, changeFrequency: "monthly" })),
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/process", priority: 0.6, changeFrequency: "yearly" },
  { path: "/projects", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/onboard", priority: 0.5, changeFrequency: "yearly" },
  { path: "/careers", priority: 0.4, changeFrequency: "monthly" },
  // TODO(owner): add "/blog" back (route and entry) once real posts exist.
  // Legal pages (/privacy, /terms, /refunds, /cookies) join once legal review is done.
];
