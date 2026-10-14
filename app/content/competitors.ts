import { DISHIGEN_MESSAGE_MARKUP, DISHIGEN_PLANS, type Source } from "./facts";
import type { PageStatus } from "./status";

/**
 * Comparison pages (/compare/[slug]). Every competitor claim carries a public
 * source and the date it was checked. The build environment could not open the
 * competitors' own pricing pages, so figures were gathered from public sources
 * via web search on 14 October 2026 and some sources disagree.
 * All comparison pages stay in "review" until the owner checks each figure
 * against the competitor's official pricing page. TODO(owner).
 */

export type Claim = { text: string; sources: Source[]; checked: string; caveat?: string };

export type CompareRow = { label: string; competitor: Claim; dishigen: string };

export type Competitor = {
  slug: string;
  name: string;
  status: PageStatus;
  officialPricingUrl: string;
  rows: CompareRow[];
};

const CHECKED = "2026-10-14";

const dishigenPlans = DISHIGEN_PLANS.length
  ? DISHIGEN_PLANS.map((p) => `${p.name}: ₹${p.priceInr.toLocaleString("en-IN")}/${p.period}`).join("; ")
  : "Not yet published";
const dishigenMarkup = DISHIGEN_MESSAGE_MARKUP ?? "To be confirmed";

export const COMPETITORS: Competitor[] = [
  {
    slug: "aisensy",
    name: "AiSensy",
    status: "review",
    officialPricingUrl: "https://aisensy.com/pricing",
    rows: [
      {
        label: "Monthly plans (billed monthly, excl. GST)",
        competitor: {
          text: "Free tier; Basic ₹1,500/month; Pro ₹3,200/month",
          sources: [
            { label: "AiSensy pricing", url: "https://aisensy.com/pricing" },
            { label: "Vivelead: AiSensy pricing 2026", url: "https://vivelead.com/aisensy-pricing/" },
          ],
          checked: CHECKED,
          caveat: "Older pages list lower Pro prices; one source reports a price rise in May 2026.",
        },
        dishigen: dishigenPlans,
      },
      {
        label: "Marketing message to an Indian number",
        competitor: {
          text: "₹1.09 per delivered message",
          sources: [
            { label: "AiSensy pricing", url: "https://aisensy.com/pricing" },
            { label: "ChatMitra: AiSensy pricing 2026", url: "https://chatmitra.com/chatmitra-vs-aisensy/" },
          ],
          checked: CHECKED,
        },
        dishigen: dishigenMarkup,
      },
      {
        label: "Utility or authentication message",
        competitor: {
          text: "₹0.145 per delivered message",
          sources: [{ label: "AiSensy pricing", url: "https://aisensy.com/pricing" }],
          checked: CHECKED,
        },
        dishigen: dishigenMarkup,
      },
      {
        label: "Service messages from 1 October 2026",
        competitor: {
          text: "First 1,000 per number per month free, then ₹0.145 each",
          sources: [{ label: "AiSensy pricing calculator", url: "https://aisensy.com/whatsapp-business-pricing-calculator-free" }],
          checked: CHECKED,
        },
        dishigen: dishigenMarkup,
      },
    ],
  },
  {
    slug: "wati",
    name: "WATI",
    status: "review",
    officialPricingUrl: "https://www.wati.io/pricing/",
    rows: [
      {
        label: "Monthly plans (India, billed monthly)",
        competitor: {
          text: "Growth ₹4,999; Pro ₹9,999; Business ₹24,999",
          sources: [{ label: "Codingclave: WhatsApp API pricing in India 2026 (as of 4 October 2026)", url: "https://codingclave.com/guides/whatsapp-api-pricing-india-2026-comparison" }],
          checked: CHECKED,
          caveat: "Other 2026 sources list lower prices (for example Growth ₹2,499). Not verified against WATI's own page.",
        },
        dishigen: dishigenPlans,
      },
      {
        label: "Users included",
        competitor: {
          text: "Growth: 3 users; Pro and Business: 5 users, extra users charged",
          sources: [
            { label: "Macha: WATI pricing explained", url: "https://www.getmacha.com/blog/wati-pricing-explained" },
            { label: "Ominiflow: WATI pricing India 2026", url: "https://ominiflow.com/blog/wati-pricing-india-2026" },
          ],
          checked: CHECKED,
        },
        dishigen: "To be confirmed",
      },
      {
        label: "Marketing message to an Indian number",
        competitor: {
          text: "Not verified",
          sources: [{ label: "ChatMitra: WATI pricing 2026", url: "https://chatmitra.com/chatmitra-vs-wati/" }],
          checked: CHECKED,
          caveat: "Sources disagree on WATI's India per-message rates; see WATI's rate card.",
        },
        dishigen: dishigenMarkup,
      },
    ],
  },
  {
    slug: "interakt",
    name: "Interakt",
    status: "review",
    officialPricingUrl: "https://www.interakt.shop/pricing",
    rows: [
      {
        label: "Plans with WhatsApp (excl. taxes)",
        competitor: {
          text: "Starter ₹3,499/quarter or ₹11,999/year; Growth ₹2,799/month; Advanced ₹3,799/month; Enterprise custom",
          sources: [
            { label: "Thrivia: Interakt alternatives (checked 19 September 2026)", url: "https://www.thrivia.io/alternatives/interakt" },
            { label: "CampaignHQ: Interakt pricing in India 2026", url: "https://blog.campaignhq.co/interakt-pricing-india-2026" },
          ],
          checked: CHECKED,
          caveat: "The monthly Starter plan covers Instagram only.",
        },
        dishigen: dishigenPlans,
      },
      {
        label: "Message charges",
        competitor: {
          text: "Per-message rate depends on the plan; Enterprise listed as no markup",
          sources: [{ label: "Thrivia: Interakt per-tier message markup", url: "https://www.thrivia.io/alternatives/interakt" }],
          checked: CHECKED,
          caveat: "Sources disagree on the exact per-message figures.",
        },
        dishigen: dishigenMarkup,
      },
    ],
  },
];

export function getCompetitor(slug: string) {
  return COMPETITORS.find((c) => c.slug === slug);
}
