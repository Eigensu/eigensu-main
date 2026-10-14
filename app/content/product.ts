/**
 * Dishigen's real features, taken from the product page. Industry pages, guides
 * and comparisons describe the product only in these terms; add a feature here
 * before mentioning it anywhere else.
 */

export const FEATURES = {
  customerProfiles: { title: "Customer profiles", body: "One profile per customer, built from NFC taps, e-cards, Excel imports and reservations." },
  segmentation: { title: "Segments", body: "Group customers by visits, spend and activity, and reuse the segment in any campaign." },
  campaigns: { title: "WhatsApp and email campaigns", body: "Send now or schedule for later, with a test message before launch and live pause or cancel." },
  templates: { title: "Approved WhatsApp templates", body: "Sync the templates Meta has approved for your number and build emails with a live preview." },
  retries: { title: "Recover failed sends", body: "See exactly why a message failed, and retry failed messages without rebuilding the campaign." },
  inbox: { title: "Shared inbox", body: "Every reply lands in one inbox, with unread counts and resolution status." },
  suppression: { title: "Opt-outs enforced", body: "Validation, de-duplication and a suppression list that is applied to every campaign." },
  reservations: { title: "Reservation sync", body: "Visit history and spend pulled in from reservations, so segments stay current." },
  analytics: { title: "Delivery and read reporting", body: "Delivery rates, read rates, template leaderboards and exportable reports." },
  outlets: { title: "Multiple outlets", body: "One account for every location, with owners, managers and viewers scoped per outlet." },
} as const;

export type FeatureKey = keyof typeof FEATURES;

export const HOW_IT_WORKS = [
  { title: "Bring in your customers", body: "Import your customer list from Excel, or collect contacts through NFC taps, e-cards and reservations. Duplicates and opt-outs are handled for you." },
  { title: "Pick a segment and an approved template", body: "Choose who should hear from you, such as regulars who haven't visited in a month, and pick a WhatsApp template Meta has already approved." },
  { title: "Send, then see what happened", body: "Send now or schedule it. Track delivery, reads and replies, answer customers from the shared inbox, and retry any message that failed." },
] as const;

/**
 * Questions for the product page Q&A. Answers come only from the owner or from
 * content/facts.ts; `answer: null` means TODO(owner) and the question is not shown.
 */
export const PRODUCT_QUESTIONS: { q: string; answer: string | null; usesFacts?: boolean }[] = [
  { q: "Is this the official WhatsApp Business Platform?", answer: null },
  { q: "Can I keep my number and my WhatsApp Business app?", answer: null },
  { q: "What does Meta charge per message, and do you add a markup?", answer: null, usesFacts: true },
  { q: "Can my number get banned, and how do you prevent it?", answer: null },
  { q: "How long does setup take, and do you help?", answer: null },
  { q: "Can I cancel any time?", answer: null },
  { q: "Where is my customers' data stored?", answer: null },
  {
    q: "Which industries is it for?",
    answer:
      "Dishigen is built for businesses that depend on repeat visits: restaurants, salons and spas, gyms, clinics and local retail.",
  },
];

/** TODO(owner): screenshots of the mobile app; store links only once the app is live. */
export const MOBILE_APP: { live: boolean; appStoreUrl?: string; playStoreUrl?: string; screenshots: { src: string; alt: string }[] } = {
  live: false,
  screenshots: [],
};
