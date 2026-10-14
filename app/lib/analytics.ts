import { sendGTMEvent } from "@next/third-parties/google";
import { readConsent } from "./consent";

/** Tag Manager runs only in production builds with a container ID. */
export const GTM_ID = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_GTM_ID || "" : "";

export type CtaLocation = "hero" | "footer_cta" | "nav" | "pricing" | "contact" | "drawer" | "calculator";
export type FormName = "drawer" | "contact" | "onboard";

/**
 * Every event and the only parameters it may carry. `page_path` is added automatically.
 * No names, emails, phone numbers or free text may ever be sent.
 */
export type AnalyticsEvents = {
  generate_lead: { form_name: FormName };
  demo_click: { cta_location: CtaLocation };
  whatsapp_click: { cta_location: CtaLocation };
  pricing_view: { cta_location?: CtaLocation };
  calculator_used: { cta_location?: CtaLocation };
  /** Reserved for product sign-ups; no call site yet. */
  sign_up: Record<string, never>;
};

const ALLOWED_KEYS = new Set(["page_path", "cta_location", "form_name"]);
// Short lower-case identifiers or URL paths only: no spaces, "@", dots or upper case.
const SAFE_VALUE = /^[a-z0-9_/\-]{1,80}$/;
// Long digit runs look like phone numbers; drop them.
const DIGIT_RUN = /\d{7,}/;

/** Removes anything outside the allow-list, so no personal data can reach the data layer. */
export function sanitizeParams(params: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (ALLOWED_KEYS.has(key) && typeof value === "string" && SAFE_VALUE.test(value) && !DIGIT_RUN.test(value)) out[key] = value;
  }
  return out;
}

/** Pushes an event to the Tag Manager data layer. Does nothing when Tag Manager is off or consent is not granted. */
export function track<E extends keyof AnalyticsEvents>(event: E, params: AnalyticsEvents[E]) {
  if (!GTM_ID || typeof window === "undefined" || readConsent() !== "granted") return;
  sendGTMEvent({ event, ...sanitizeParams({ ...params, page_path: window.location.pathname }) });
}
