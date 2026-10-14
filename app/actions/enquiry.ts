"use server";

import {
  ENQUIRY_FIELDS,
  FORM_TITLES,
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  STARTED_AT_FIELD,
  validateField,
  type EnquiryKind,
  type EnquiryState,
} from "../lib/enquiry";
import { postEnquiryToSheet, sendEnquiryEmail } from "../lib/deliver";
import { SITE } from "../lib/site";

const FAILURE_MESSAGE = `We couldn't send your message just now. Please try again, or email us at ${SITE.enquiryEmail}.`;

function str(formData: FormData, name: string) {
  const v = formData.get(name);
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Validates and delivers an enquiry from any of the site's forms.
 * Bound per form: `submitEnquiry.bind(null, "contact")`.
 */
export async function submitEnquiry(kind: EnquiryKind, _prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const rules = ENQUIRY_FIELDS[kind];
  if (!rules) return { status: "error", message: FAILURE_MESSAGE };

  // Spam checks. A filled honeypot gets a fake success so bots learn nothing; nothing is sent.
  if (str(formData, HONEYPOT_FIELD)) return { status: "success" };
  const startedAt = Number(str(formData, STARTED_AT_FIELD));
  if (!Number.isFinite(startedAt) || startedAt <= 0 || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "error", message: "That was quicker than we expected. Please check your details and send again." };
  }

  const fieldErrors: Record<string, string> = {};
  const values: Record<string, string> = {};
  for (const [name, rule] of Object.entries(rules)) {
    const value = str(formData, name);
    const error = validateField(rule, value);
    if (error) fieldErrors[name] = error;
    values[name] = value;
  }
  if (formData.get("consent") !== "on") fieldErrors.consent = "Please agree to the privacy policy";
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors };
  }

  const page = str(formData, "page").slice(0, 200) || "unknown page";
  const enquiry = {
    form: FORM_TITLES[kind],
    page,
    submittedAt: new Date().toISOString(),
    replyTo: values.email,
    fields: Object.entries(rules).map(([name, rule]) => ({ label: rule.label, value: values[name] })),
  };

  // Success means at least one destination recorded the enquiry; a failure of the other is logged.
  const [emailed, sheet] = await Promise.all([sendEnquiryEmail(enquiry), postEnquiryToSheet(enquiry)]);
  if (emailed || sheet === true) return { status: "success" };
  return { status: "error", message: FAILURE_MESSAGE };
}
