import type { FeatureKey } from "./product";
import type { IndustrySlug } from "./templates";

/**
 * Industry pages (/for/[slug]). DRAFT copy written from the product's real
 * features; no customer results, statistics or integrations are claimed.
 */

export type Industry = {
  slug: IndustrySlug;
  /** Plural noun used in headings, e.g. "restaurants". */
  noun: string;
  label: string;
  title: string;
  description: string;
  /** First paragraph; contains the target phrase. */
  intro: string;
  /** What repeat business looks like for this kind of business, and where WhatsApp fits. */
  moments: { heading: string; body: string }[];
  features: FeatureKey[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "restaurants",
    noun: "restaurants",
    label: "Restaurants and cafés",
    title: "WhatsApp marketing for restaurants",
    description: "WhatsApp marketing for restaurants: confirm bookings, bring regulars back and fill quiet nights with Dishigen, built in Mumbai for repeat-visit businesses.",
    intro:
      "WhatsApp marketing for restaurants works best when it follows the guest, not the calendar: a confirmation when they book, a thank-you after they dine, and a nudge when a regular stops coming. Dishigen keeps one profile per guest across every outlet, so each message can be about their visits rather than a mass blast.",
    moments: [
      { heading: "Before the visit", body: "Send a booking confirmation the moment a table is reserved, and let guests reply to change it instead of calling during service." },
      { heading: "After the visit", body: "Thank guests the next morning and ask for a quick rating. Replies land in the shared inbox, so a manager can follow up on a bad night." },
      { heading: "When regulars go quiet", body: "Reservation sync keeps visit history current, so a segment like \"visited 3+ times, not in the last 30 days\" updates itself and can feed a win-back campaign." },
    ],
    features: ["reservations", "customerProfiles", "segmentation", "outlets", "inbox"],
  },
  {
    slug: "salons",
    noun: "salons and spas",
    label: "Salons and spas",
    title: "WhatsApp marketing for salons and spas",
    description: "WhatsApp marketing for salons and spas: appointment reminders, rebooking nudges and package updates sent from approved templates with Dishigen.",
    intro:
      "WhatsApp marketing for salons and spas is mostly about timing. Clients come back on a rhythm, every few weeks for a cut or colour, so the right reminder at the right moment fills the chair. Dishigen lets you segment clients by when they last came in and schedule messages around it.",
    moments: [
      { heading: "Cut no-shows", body: "Send an appointment reminder the day before and let clients confirm or ask to reschedule with a one-letter reply." },
      { heading: "Rebook on rhythm", body: "Group clients by their last recorded visit, then schedule a \"time for your next visit\" message for the week they're usually due." },
      { heading: "Keep packages visible", body: "After each session, send a utility message with the sessions left on a prepaid package, so clients use what they've paid for." },
    ],
    features: ["segmentation", "campaigns", "templates", "inbox", "suppression"],
  },
  {
    slug: "gyms",
    noun: "gyms and studios",
    label: "Gyms and fitness studios",
    title: "WhatsApp marketing for gyms",
    description: "WhatsApp marketing for gyms and fitness studios: renewal reminders, class bookings and check-ins for members who drift away, with Dishigen.",
    intro:
      "WhatsApp marketing for gyms has one job above all: keeping members coming in, because a member who stops training stops renewing. Dishigen helps you find members who have gone quiet, remind people before a membership lapses and confirm class bookings, all from approved WhatsApp templates.",
    moments: [
      { heading: "Before a membership ends", body: "Schedule a renewal reminder a week before expiry, with a reply keyword so members can ask for the payment link." },
      { heading: "When attendance drops", body: "If you record visits, for example with NFC taps at the front desk, build a segment of members whose last visit was over two weeks ago and offer a coach-led comeback session." },
      { heading: "Around classes", body: "Confirm class bookings and invite cancellations by reply, so spots go to the waiting list instead of staying empty." },
    ],
    features: ["segmentation", "campaigns", "retries", "analytics", "suppression"],
  },
  {
    slug: "clinics",
    noun: "clinics",
    label: "Clinics",
    title: "WhatsApp marketing for clinics",
    description: "WhatsApp for clinics: appointment reminders, follow-up scheduling and report-ready alerts, with opt-outs enforced on every message, using Dishigen.",
    intro:
      "WhatsApp marketing for clinics is mostly not marketing at all: patients want reminders, follow-up dates and a message when their report is ready. Dishigen sends these as utility templates, keeps promotional messages for patients who opted in, and applies every opt-out automatically.",
    moments: [
      { heading: "Appointments and follow-ups", body: "Remind patients the day before, and ask them to book the follow-up the doctor requested, with replies handled in the shared inbox." },
      { heading: "Reports and results", body: "Tell patients when a report is ready to collect, instead of fielding calls asking whether it has come in." },
      { heading: "Only opted-in patients get news", body: "Health camps and clinic news go only to patients who agreed to hear from you; the suppression list is enforced on every campaign." },
    ],
    features: ["templates", "inbox", "suppression", "campaigns", "outlets"],
  },
  {
    slug: "retail",
    noun: "local retailers",
    label: "Local retail",
    title: "WhatsApp marketing for retail stores",
    description: "WhatsApp marketing for retail stores: back-in-stock alerts, order-ready messages and loyalty reminders for local shoppers, with Dishigen.",
    intro:
      "WhatsApp marketing for retail stores turns a one-off purchase into a habit. Local shoppers already message stores to ask about stock and orders; Dishigen lets you answer those in one inbox and follow up with back-in-stock alerts and loyalty reminders to the right segment.",
    moments: [
      { heading: "When something they wanted is back", body: "Tell customers the item they asked about has arrived, and let them reply to have one held." },
      { heading: "Orders and pickups", body: "Send an order-ready message with your opening hours, so customers come in at the right time." },
      { heading: "Loyalty that gets used", body: "Remind members about unused points once a month, segmented by store if you have several." },
    ],
    features: ["inbox", "segmentation", "campaigns", "outlets", "analytics"],
  },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
