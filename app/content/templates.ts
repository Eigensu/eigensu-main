import type { MessageCategory } from "./facts";

/**
 * Example WhatsApp message templates by industry. DRAFT copy: these are starting
 * points to adapt and submit to Meta for approval, not pre-approved templates.
 * {{1}}, {{2}}… are template variables filled in per customer.
 */

export type IndustrySlug = "restaurants" | "salons" | "gyms" | "clinics" | "retail";

export type MessageTemplate = {
  id: string;
  industry: IndustrySlug;
  name: string;
  category: Exclude<MessageCategory, "service">;
  /** When to send it. */
  use: string;
  body: string;
  /** Shown on the industry page as one of its three examples. */
  featured?: boolean;
};

const OPT_OUT = "Reply STOP to stop these messages.";

export const TEMPLATES: MessageTemplate[] = [
  // Restaurants
  { id: "restaurant-booking-confirmation", industry: "restaurants", name: "Booking confirmation", category: "utility", featured: true,
    use: "Right after a table is booked.",
    body: "Hi {{1}}, your table for {{2}} at {{3}} is confirmed for {{4}}. Need to change it? Just reply to this message." },
  { id: "restaurant-win-back", industry: "restaurants", name: "We miss you", category: "marketing", featured: true,
    use: "For regulars who haven't visited in 30 days or more.",
    body: `Hi {{1}}, it's been a while since your last visit to {{2}}. Our new menu is in, and we'd love to see you back this week. ${OPT_OUT}` },
  { id: "restaurant-feedback", industry: "restaurants", name: "Thanks for visiting", category: "marketing", featured: true,
    use: "The morning after a visit.",
    body: `Thanks for dining with us last night, {{1}}! How was everything? Reply with a quick rating from 1 to 5. ${OPT_OUT}` },
  { id: "restaurant-event", industry: "restaurants", name: "Event announcement", category: "marketing",
    use: "A week before a special evening or festival menu.",
    body: `{{1}}, we're hosting {{2}} on {{3}}. Tables are limited, so reply BOOK and we'll hold one for you. ${OPT_OUT}` },

  // Salons and spas
  { id: "salon-appointment-reminder", industry: "salons", name: "Appointment reminder", category: "utility", featured: true,
    use: "The day before an appointment.",
    body: "Hi {{1}}, a reminder of your {{2}} appointment with {{3}} tomorrow at {{4}}. Reply C to confirm or R to reschedule." },
  { id: "salon-rebook", industry: "salons", name: "Time for your next visit", category: "marketing", featured: true,
    use: "When a customer is due for their usual service, e.g. four to six weeks after a haircut.",
    body: `Hi {{1}}, it's about time for your next {{2}}. Reply with a day that suits you and we'll find a slot. ${OPT_OUT}` },
  { id: "salon-package-balance", industry: "salons", name: "Package sessions left", category: "utility", featured: true,
    use: "After each visit on a prepaid package.",
    body: "Hi {{1}}, thanks for coming in today. You have {{2}} sessions left on your {{3}} package, valid until {{4}}." },
  { id: "salon-birthday", industry: "salons", name: "Birthday treat", category: "marketing",
    use: "In the customer's birthday month.",
    body: `Happy birthday, {{1}}! Treat yourself this month: show this message on your next visit for {{2}}. ${OPT_OUT}` },

  // Gyms
  { id: "gym-renewal", industry: "gyms", name: "Membership renewal", category: "utility", featured: true,
    use: "Seven days before a membership ends.",
    body: "Hi {{1}}, your {{2}} membership ends on {{3}}. Reply RENEW and we'll send you the payment link." },
  { id: "gym-inactive", industry: "gyms", name: "Haven't seen you lately", category: "marketing", featured: true,
    use: "For members who haven't checked in for two weeks.",
    body: `Hi {{1}}, we haven't seen you at {{2}} for a couple of weeks. Want a coach to plan your comeback session? Reply YES. ${OPT_OUT}` },
  { id: "gym-class-booking", industry: "gyms", name: "Class booked", category: "utility", featured: true,
    use: "When a member books a class.",
    body: "You're booked for {{1}} on {{2}} at {{3}}, {{4}}. Can't make it? Reply CANCEL so someone else can take your spot." },
  { id: "gym-referral", industry: "gyms", name: "Bring a friend", category: "marketing",
    use: "For active members, once a quarter.",
    body: `Hi {{1}}, training is better with company. Bring a friend for a free trial session this month: just reply with their first name. ${OPT_OUT}` },

  // Clinics
  { id: "clinic-appointment-reminder", industry: "clinics", name: "Appointment reminder", category: "utility", featured: true,
    use: "The day before an appointment.",
    body: "Hi {{1}}, this is a reminder of your appointment with {{2}} at {{3}} on {{4}}. Reply C to confirm or R to reschedule." },
  { id: "clinic-follow-up", industry: "clinics", name: "Follow-up due", category: "utility", featured: true,
    use: "When the doctor has asked for a follow-up visit.",
    body: "Hi {{1}}, {{2}} asked to see you again around {{3}} for a follow-up. Reply with a day that suits you and we'll book it." },
  { id: "clinic-health-camp", industry: "clinics", name: "Health check camp", category: "marketing", featured: true,
    use: "For patients who opted in to clinic news.",
    body: `Hi {{1}}, {{2}} is running a {{3}} on {{4}}. Reply BOOK to reserve a slot. ${OPT_OUT}` },
  { id: "clinic-report-ready", industry: "clinics", name: "Report ready", category: "utility",
    use: "When test results are ready to collect.",
    body: "Hi {{1}}, your {{2}} report is ready. You can collect it at {{3}} between {{4}}." },

  // Local retail
  { id: "retail-back-in-stock", industry: "retail", name: "Back in stock", category: "marketing", featured: true,
    use: "When an item a customer asked about is back.",
    body: `Good news, {{1}}: {{2}} is back in stock at {{3}}. Reply HOLD and we'll keep one aside for 48 hours. ${OPT_OUT}` },
  { id: "retail-order-ready", industry: "retail", name: "Order ready for pickup", category: "utility", featured: true,
    use: "When an order is packed and ready.",
    body: "Hi {{1}}, your order {{2}} is ready for pickup at {{3}}. We're open until {{4}} today." },
  { id: "retail-loyalty-points", industry: "retail", name: "Points reminder", category: "marketing", featured: true,
    use: "Once a month for loyalty members with unused points.",
    body: `Hi {{1}}, you have {{2}} points waiting at {{3}}. Use them on your next visit before {{4}}. ${OPT_OUT}` },
  { id: "retail-sale-preview", industry: "retail", name: "Early sale access", category: "marketing",
    use: "The day before a sale opens to everyone.",
    body: `{{1}}, our {{2}} sale opens tomorrow, but you can shop it today. See you at {{3}}! ${OPT_OUT}` },
];

export function templatesFor(industry: IndustrySlug) {
  return TEMPLATES.filter((t) => t.industry === industry);
}
