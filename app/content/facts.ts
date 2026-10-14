/**
 * Facts that appear on more than one page. Every figure has its sources and an
 * "as of" date; pages must read figures from here, never type them inline.
 *
 * Sourcing note (14 October 2026): the build environment could not open Meta's
 * pages directly, so the WhatsApp figures below were checked against the owner-
 * supplied sources plus independent reporting. TODO(owner): confirm them against
 * Meta's rate card before each quarterly update.
 */

export type Source = { label: string; url: string };

export type Fact<T = number> = {
  value: T;
  /** How the value is shown, e.g. "₹0.8631 per message". */
  display: string;
  asOf: string; // ISO date
  sources: Source[];
  note?: string;
};

const META_PRICING_SOURCES: Source[] = [
  { label: "Meta: pricing for non-template messages", url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/non-template-messages" },
  { label: "Flowcall: WhatsApp Business API pricing (Oct 2026)", url: "https://www.flowcall.co/blog/whatsapp-business-api-pricing" },
  { label: "NewsBytes: WhatsApp business messages get costlier in India", url: "https://www.newsbytesapp.com/news/science/whatsapp-business-messages-get-costlier-in-india-from-today/story" },
];

/** Meta's WhatsApp Business Platform charges for messages to Indian (+91) numbers, excluding GST. */
export const WHATSAPP_INDIA = {
  effectiveFrom: "2026-10-01",
  marketing: {
    value: 0.8631,
    display: "₹0.8631 per message",
    asOf: "2026-10-01",
    sources: META_PRICING_SOURCES,
    note: "Unchanged on 1 October 2026.",
  } satisfies Fact,
  utility: {
    value: 0.115,
    display: "₹0.115 per message",
    asOf: "2026-10-01",
    sources: META_PRICING_SOURCES,
    note: "From 1 October 2026 this also applies to utility templates sent inside the 24-hour customer service window.",
  } satisfies Fact,
  authentication: {
    value: 0.115,
    display: "₹0.115 per message",
    asOf: "2026-10-01",
    sources: META_PRICING_SOURCES,
  } satisfies Fact,
  service: {
    value: 0.115,
    display: "₹0.115 per message",
    asOf: "2026-10-01",
    sources: META_PRICING_SOURCES,
    note: "Service messages are free-form replies inside the 24-hour customer service window. Charged from 1 October 2026, after the free allowance.",
  } satisfies Fact,
  freeServicePerNumberPerMonth: {
    value: 1000,
    display: "1,000 service messages per phone number per month",
    asOf: "2026-10-01",
    sources: META_PRICING_SOURCES,
    note: "The allowance resets each month and does not roll over.",
  } satisfies Fact,
} as const;

/** GST on WhatsApp message charges billed in India. */
export const GST_RATE: Fact = {
  value: 0.18,
  display: "18% GST",
  asOf: "2026-10-01",
  sources: [{ label: "Digital Toolbox: WhatsApp Business API pricing in India", url: "https://digitaltoolbox.in/blog/whatsapp-business-api-pricing-india/" }],
  note: "Meta's rates are quoted excluding GST.",
};

export type MessageCategory = "marketing" | "utility" | "authentication" | "service";

export const CATEGORY_LABELS: Record<MessageCategory, string> = {
  marketing: "Marketing",
  utility: "Utility",
  authentication: "Authentication",
  service: "Service",
};

export const CATEGORY_DESCRIPTIONS: Record<MessageCategory, string> = {
  marketing: "Offers, announcements, win-back and re-engagement messages.",
  utility: "Updates about something the customer started: booking confirmations, reminders, order and payment updates.",
  authentication: "One-time passwords and login codes.",
  service: "Free-form replies inside the 24-hour window after a customer messages you.",
};

/**
 * Dishigen plan prices. TODO(owner): supply plan names, prices and what each includes.
 * Until then pages say prices are shared on request and no Offer is added to JSON-LD.
 */
export const DISHIGEN_PLANS: { name: string; priceInr: number; period: "month" | "year"; includes: string[] }[] = [];

/** TODO(owner): does Dishigen add a markup to Meta's message charges? null until confirmed. */
export const DISHIGEN_MESSAGE_MARKUP: string | null = null;

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function formatInr(n: number, digits = 2) {
  return `₹${n.toLocaleString("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}
