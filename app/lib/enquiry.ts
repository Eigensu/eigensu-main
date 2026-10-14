/**
 * Enquiry form definitions shared by the client forms and the server action.
 * The server re-validates everything; client checks are only for fast feedback.
 */

export type EnquiryKind = "drawer" | "contact" | "onboard";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  /** Shown above the submit button when status is "error". */
  message?: string;
  fieldErrors?: Record<string, string>;
};

export const INITIAL_ENQUIRY_STATE: EnquiryState = { status: "idle" };

type FieldRule = { label: string; required?: boolean; max: number; email?: boolean; oneOf?: readonly string[] };

export const PROJECT_TYPES = ["Operations Automation", "Internal Tooling", "Systems Integration", "Not sure yet"] as const;
export const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Just exploring"] as const;
export const BUDGETS = ["Under ₹5L", "₹5L – ₹15L", "₹15L – ₹40L", "₹40L+"] as const;
export const REFERRALS = ["Referral", "Search", "Social", "Other"] as const;

export const ENQUIRY_FIELDS: Record<EnquiryKind, Record<string, FieldRule>> = {
  drawer: {
    firstName: { label: "First name", required: true, max: 100 },
    lastName: { label: "Last name", required: true, max: 100 },
    email: { label: "Email", required: true, max: 254, email: true },
    phone: { label: "Phone", required: true, max: 40 },
    message: { label: "Message", required: true, max: 5000 },
  },
  contact: {
    name: { label: "Name", required: true, max: 200 },
    company: { label: "Company", max: 200 },
    email: { label: "Email", required: true, max: 254, email: true },
    message: { label: "What do you need?", required: true, max: 5000 },
  },
  onboard: {
    name: { label: "Full name", required: true, max: 200 },
    role: { label: "Role", max: 200 },
    company: { label: "Company", max: 200 },
    email: { label: "Work email", required: true, max: 254, email: true },
    projectType: { label: "Type of work", max: 100, oneOf: PROJECT_TYPES },
    scope: { label: "Scope", max: 5000 },
    timeline: { label: "Timeline", max: 100, oneOf: TIMELINES },
    budget: { label: "Budget range", max: 100, oneOf: BUDGETS },
    notes: { label: "Additional notes", max: 5000 },
    referral: { label: "How did you hear about us?", max: 100, oneOf: REFERRALS },
  },
};

export const FORM_TITLES: Record<EnquiryKind, string> = {
  drawer: "Let's talk drawer",
  contact: "Contact page",
  onboard: "Start a project",
};

/** Name of the hidden honeypot field. Real visitors never see or fill it. */
export const HONEYPOT_FIELD = "website";
/** Hidden field holding the time the form was rendered in the browser (ms since epoch). */
export const STARTED_AT_FIELD = "startedAt";
/** Submissions faster than this are treated as automated. */
export const MIN_FILL_MS = 3000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validates one field. Returns an error message, or "" when the value is valid. */
export function validateField(rule: FieldRule, value: string): string {
  if (!value) return rule.required ? "Required" : "";
  if (value.length > rule.max) return `Keep this under ${rule.max} characters`;
  if (rule.email && !EMAIL_RE.test(value)) return "Valid email required";
  if (rule.oneOf && !rule.oneOf.includes(value)) return "Choose one of the options";
  return "";
}
