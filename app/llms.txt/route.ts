import { INDUSTRIES } from "../content/industries";
import { GUIDES } from "../content/guides";
import { COMPETITORS } from "../content/competitors";
import { PRODUCT, SITE, absoluteUrl } from "../lib/site";

/**
 * /llms.txt: a short, plain-text map of the main pages for AI tools (llmstxt.org format).
 * Optional: Google says no such file is needed to appear in its AI features.
 * Built from the same content files as the pages, so it lists only published pages.
 */
export const dynamic = "force-static";

export function GET() {
  const line = (path: string, title: string, note: string) => `- [${title}](${absoluteUrl(path)}): ${note}`;
  const body = [
    `# ${SITE.name}`,
    "",
    `> ${PRODUCT.description}`,
    "",
    `${SITE.name} is based in ${SITE.location}. ${SITE.description}`,
    "",
    `## ${PRODUCT.name}`,
    line(PRODUCT.path, PRODUCT.name, "WhatsApp marketing software for restaurants, salons and gyms: features, how it works, questions and answers."),
    line("/pricing", "WhatsApp Business API pricing in India", "Meta's per-message rates by category from 1 October 2026, with sources."),
    line("/whatsapp-cost-calculator", "WhatsApp API cost calculator", "Estimate monthly Meta charges for Indian numbers."),
    line("/templates", "WhatsApp message templates by industry", "Example templates with their likely category."),
    "",
    "## Industries",
    ...INDUSTRIES.map((i) => line(`/for/${i.slug}`, i.title, i.description)),
    "",
    "## Guides",
    ...GUIDES.filter((g) => g.status === "published").map((g) => line(`/guides/${g.slug}`, g.title, g.description)),
    ...(COMPETITORS.some((c) => c.status === "published")
      ? ["", "## Comparisons", ...COMPETITORS.filter((c) => c.status === "published").map((c) => line(`/compare/${c.slug}`, `${c.name} alternative`, `${c.name} and ${PRODUCT.name} compared, with sources.`))]
      : []),
    "",
    "## Company",
    line("/about", `About ${SITE.name}`, "Who we are."),
    line("/contact", "Contact", `Email ${SITE.enquiryEmail}.`),
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
