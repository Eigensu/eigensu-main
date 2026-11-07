import type { ProductKeySpec } from "../components/Brand";

/**
 * Eigensu's own products. Each one has its own key in the Eigensu keycap
 * family (see components/Brand.tsx); colours come from the brand kit plus
 * the two supporting colours (butter, basil).
 *
 * Copy for Inventory and Recruiter was written from the Nov 2026 meeting
 * notes — review it against what each product actually ships.
 */

export type Product = {
  slug: string;
  name: string;
  /** Short category line, e.g. "For restaurants". */
  audience: string;
  tagline: string;
  body: string;
  features: string[];
  key: ProductKeySpec;
  /** Section colour on the products page. */
  surface: string;
  /** Key base for that surface: "dark" = cream base (dark surfaces), "light" = warm-black base. */
  keyTone: "light" | "dark";
  onSurface: string;
  onSurfaceMuted: string;
  href?: string;
  hrefLabel?: string;
};

export const EIGENSU_KEY: ProductKeySpec = { face: "#5C7CF0", glyph: "e", ink: "#1C1917" };
export const CUSTOM_KEY: ProductKeySpec = { face: "#1C1917", glyph: "+", ink: "#FBF3E4" };

export const PRODUCTS: Product[] = [
  {
    slug: "dishpatch",
    name: "DishPatch",
    audience: "For restaurants",
    tagline: "Every guest, outlet and conversation in one place.",
    body: "DishPatch brings guest data, segments, WhatsApp campaigns, replies and outlet analytics into one platform, so a restaurant can bring regulars back without a marketing team.",
    features: [
      "Guest profiles and visit history",
      "WhatsApp campaigns, personalised per guest",
      "One inbox for replies and reviews",
      "Analytics across every outlet",
    ],
    key: { face: "#F0491F", glyph: "d", ink: "#FBF3E4", light: "#FFC53D" },
    surface: "#3B0A22",
    keyTone: "dark",
    onSurface: "#FBF3E4",
    onSurfaceMuted: "rgba(251,243,228,0.74)",
    href: "/dispatch",
    hrefLabel: "Explore DishPatch",
  },
  {
    slug: "inventory",
    name: "Inventory",
    audience: "For retail, F&B and warehouses",
    tagline: "The count on screen matches the count on the shelf.",
    body: "A web app for stock, purchases and movements across stores and warehouses. Every change is logged, low stock is flagged before it runs out, and month-end stops being a recount.",
    features: [
      "Live stock levels per location",
      "Purchase orders and supplier records",
      "Low-stock alerts before you run out",
      "A full movement history for audits",
    ],
    key: { face: "#0F4D2E", glyph: "i", ink: "#FBF3E4" },
    surface: "#FFFFFF",
    keyTone: "light",
    onSurface: "#1C1917",
    onSurfaceMuted: "#44403C",
  },
  {
    slug: "recruiter",
    name: "Recruiter",
    audience: "For recruitment teams",
    tagline: "Openings, candidates and placements in one pipeline.",
    body: "Built for consultancies that place people for a living: track every opening by client, move candidates through your stages, schedule interviews and see what each placement earned.",
    features: [
      "Openings grouped by client",
      "Candidate pipeline with your own stages",
      "Interview scheduling and notes",
      "Placement and revenue reporting",
    ],
    key: { face: "#FFC53D", glyph: "r", ink: "#1C1917" },
    surface: "#5C7CF0",
    keyTone: "light",
    onSurface: "#1C1917",
    onSurfaceMuted: "rgba(28,25,23,0.78)",
  },
];
