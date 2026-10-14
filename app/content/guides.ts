import { GST_RATE, WHATSAPP_INDIA, formatInr, type Source } from "./facts";
import { estimateMonthlyCost } from "../lib/calculator";
import type { PageStatus } from "./status";

/**
 * Guides (/guides/[slug]). Each section is a question with the answer, and its
 * number, in the first two sentences. Figures come from content/facts.ts.
 */

export type GuideSection = {
  id: string;
  question: string;
  /** One or two sentences that answer the question on their own. */
  answer: string;
  paragraphs?: string[];
  list?: string[];
  table?: { caption: string; head: string[]; rows: string[][] };
};

export type Guide = {
  slug: string;
  status: PageStatus;
  title: string;
  description: string;
  intro: string;
  published: string;
  updated: string;
  // TODO(owner): a named author (person) for each guide.
  author: string;
  sections: GuideSection[];
  sources: Source[];
  disclaimer?: string;
};

const R = WHATSAPP_INDIA;
const free = R.freeServicePerNumberPerMonth.value.toLocaleString("en-IN");
const example = estimateMonthlyCost({ marketing: 0, utility: 0, authentication: 0, service: 3000, phoneNumbers: 1 });
const exampleService = example.lines.find((l) => l.category === "service")!;

export const GUIDES: Guide[] = [
  {
    slug: "whatsapp-service-message-charges",
    status: "published",
    title: "WhatsApp service message charges in India from 1 October 2026",
    description: `From 1 October 2026 Meta charges ${R.service.display} for WhatsApp service messages in India after ${free} free per number each month. What changed and what it costs.`,
    intro: `WhatsApp service message charges started in India on 1 October 2026: after the first ${free} service messages per phone number each month, Meta now charges ${R.service.display}. This guide explains what counts as a service message, what else changed, and how to estimate your own bill.`,
    published: "2026-10-14",
    updated: "2026-10-14",
    author: "Eigensu",
    sections: [
      {
        id: "what-changed",
        question: "What changed on 1 October 2026?",
        answer: `Meta started charging ${R.service.display} for service messages sent to Indian numbers, after a free allowance of ${R.freeServicePerNumberPerMonth.display}. Utility templates sent inside the 24-hour customer service window, which were free before, are now charged at ${R.utility.display} too.`,
        paragraphs: [`The marketing rate did not change: it stays at ${R.marketing.display}. All rates exclude GST.`],
      },
      {
        id: "what-is-a-service-message",
        question: "What is a service message?",
        answer: "A service message is a free-form reply you send inside the 24-hour customer service window, which opens when a customer messages you. Messages that start a conversation outside that window must use an approved template and are charged as marketing, utility or authentication.",
      },
      {
        id: "rates",
        question: "How much does each WhatsApp message cost in India now?",
        answer: `Marketing messages cost ${R.marketing.display}; utility, authentication and service messages cost ${R.utility.display} each, with the first ${free} service messages per number each month free. ${GST_RATE.display} is added on top.`,
        table: {
          caption: `Meta's WhatsApp rates for Indian numbers from 1 October 2026, excluding GST`,
          head: ["Category", "Rate", "Free allowance"],
          rows: [
            ["Marketing", R.marketing.display, "None"],
            ["Utility", R.utility.display, "None"],
            ["Authentication", R.authentication.display, "None"],
            ["Service", R.service.display, `${free} per phone number per month`],
          ],
        },
      },
      {
        id: "rollover",
        question: "Do unused free service messages roll over?",
        answer: `No. The ${free} free service messages reset every month and unused ones do not carry over.`,
        paragraphs: ["The allowance is per business phone number, so a business with two WhatsApp numbers gets two allowances."],
      },
      {
        id: "example",
        question: "What does this cost a typical business?",
        answer: `A business that sends 3,000 service replies a month from one number pays for ${exampleService.billable.toLocaleString("en-IN")} of them: ${formatInr(example.subtotal)} before GST, or ${formatInr(example.total)} with ${GST_RATE.display}. Marketing and utility templates are charged on top.`,
        paragraphs: ["Use the WhatsApp cost calculator to estimate your own monthly bill across all four categories."],
      },
    ],
    sources: [...R.service.sources, ...GST_RATE.sources],
  },
  {
    slug: "whatsapp-error-131049",
    status: "published",
    title: "WhatsApp error 131049: what it means and how to recover the messages",
    description: "WhatsApp error 131049 means Meta held back a marketing message to protect the recipient from too many business messages. What causes it and how to retry safely.",
    intro: "WhatsApp error 131049 means Meta chose not to deliver a marketing template message \"to maintain healthy ecosystem engagement\". It is not a fault in your message or your number: it happens when the person has already received a lot of marketing messages from businesses.",
    published: "2026-10-14",
    updated: "2026-10-14",
    author: "Eigensu",
    sections: [
      {
        id: "what-is-131049",
        question: "What is WhatsApp error 131049?",
        answer: "Error 131049 is the WhatsApp Cloud API code for a marketing template that Meta did not deliver to maintain healthy ecosystem engagement. It comes from a per-user limit on how many marketing messages one person receives from businesses, so it depends on the recipient, not on you.",
        paragraphs: ["Because the limit counts marketing messages from all businesses, even the first message you send someone can be held back."],
      },
      {
        id: "which-messages",
        question: "Which messages does error 131049 affect?",
        answer: "It affects marketing templates. Utility and authentication messages, such as booking confirmations and one-time codes, are not held back by this limit.",
      },
      {
        id: "retry",
        question: "Should you retry a message that failed with 131049?",
        answer: "Yes, but not straight away. WhatsApp providers advise waiting at least 24 hours before sending the template again, because retrying immediately hits the same limit.",
        paragraphs: ["Repeated immediate retries waste effort and can annoy the people you are trying to reach. Treat 131049 as \"try later\", not \"try again now\"."],
      },
      {
        id: "dishigen-retries",
        question: "How does Dishigen help recover these messages?",
        answer: "Dishigen shows exactly why each message in a campaign failed, so 131049 failures can be separated from the rest. You can then retry just the failed messages later, without rebuilding the campaign.",
      },
      {
        id: "reduce",
        question: "How do you get fewer 131049 errors?",
        answer: "Send marketing messages to people who are likely to engage, and send fewer of them. Keep transactional information, such as confirmations and reminders, in utility templates, which this limit does not hold back.",
        list: [
          "Segment by recent activity instead of messaging your whole list.",
          "Space out marketing campaigns to the same people.",
          "Make every marketing message easy to opt out of.",
        ],
      },
    ],
    sources: [
      { label: "MSG91 help: healthy ecosystem engagement error", url: "https://msg91.com/help/whatsapp/whatsapp-error---this-message-was-not-delivered-to-maintain-healthy-ecosystem-engagement" },
      { label: "Qiscus: new limits on marketing template messages", url: "https://support.qiscus.com/hc/en-us/articles/37845720755865-WhatsApp-New-Limits-on-Marketing-Template-Messages" },
      { label: "CampaignHQ: healthy ecosystem error 131049", url: "https://medium.com/campaignhq/whatsapp-healthy-ecosystem-error-131049-why-marketing-templates-get-blocked-and-how-to-fix-it-b9e7592a78c5" },
    ],
  },
  {
    slug: "whatsapp-opt-in-india",
    // Requires legal review before publishing.
    status: "review",
    title: "WhatsApp opt-in rules for Indian businesses",
    description: "What Meta requires before you message customers on WhatsApp, and what the DPDP Act and Rules change for Indian businesses, with the 2026–2027 timeline.",
    intro: "WhatsApp opt-in rules for Indian businesses come from two places: Meta's own policy, which applies today, and India's Digital Personal Data Protection (DPDP) Act, whose consent obligations apply from May 2027. This guide covers both. It is general information, not legal advice.",
    published: "2026-10-14",
    updated: "2026-10-14",
    author: "Eigensu",
    sections: [
      {
        id: "need-opt-in",
        question: "Do you need opt-in to message customers on WhatsApp?",
        answer: "Yes. Meta requires that you have the person's phone number and that they have agreed to receive messages from your business before you message them on WhatsApp.",
      },
      {
        id: "valid-opt-in",
        question: "What counts as a valid opt-in?",
        answer: "The person must be told clearly that they are opting in to messages from your business, by name. Since Meta's November 2024 policy update the opt-in does not have to mention WhatsApp specifically, as long as you follow local law.",
        list: [
          "Name your business where the person opts in.",
          "Say what kind of messages they will receive.",
          "Make it easy to opt out later, and honour opt-outs on every campaign.",
          "Keep a record of when and how each person opted in.",
        ],
      },
      {
        id: "dpdp-timeline",
        question: "When do the DPDP Act's consent rules apply?",
        answer: "Most obligations under the DPDP Act and Rules, including consent and notice, apply from 13 May 2027, 18 months after the Rules were notified on 13 November 2025. Provisions for registered consent managers apply from November 2026.",
        table: {
          caption: "DPDP Act and Rules: phased timeline",
          head: ["When", "What applies"],
          rows: [
            ["13 November 2025", "DPDP Rules notified; Data Protection Board provisions in force"],
            ["November 2026 (12 months)", "Consent manager framework"],
            ["13 May 2027 (18 months)", "Most obligations: notice, consent, security safeguards, breach reporting, data principal rights"],
          ],
        },
      },
      {
        id: "dishigen",
        question: "How does Dishigen help you respect opt-outs?",
        answer: "Dishigen keeps a suppression list and applies it to every campaign automatically, so someone who opts out is not messaged again by mistake.",
      },
    ],
    sources: [
      { label: "Meta: get opt-in for WhatsApp", url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in" },
      { label: "Infobip: WhatsApp opt-in policy requirements", url: "https://www.infobip.com/blog/how-to-collect-whatsapp-business-opt-ins" },
      { label: "L&S Law: DPDP Act and Rules, a ticking compliance timeline", url: "https://www.lkslaw.com/insights/articles/dpdp-act-and-rules-a-ticking-compliance-timeline" },
      { label: "Sansa Legal: DPDP phased implementation timeline", url: "https://www.sansalegal.com/post/dpdp-act-2023-and-rules-2025-phased-implementation-timeline-and-business-compliance-deadlines" },
    ],
    disclaimer: "This guide is general information, not legal advice. Check the current Meta policy and the DPDP Rules, or ask a lawyer, before relying on it.",
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}
