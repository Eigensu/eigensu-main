/**
 * Single source of truth for names, descriptions, URLs and contact details.
 * Import from here everywhere: metadata, structured data, hero copy, footer.
 */

export const SITE = {
  name: "Eigensu",
  url: "https://eigensu.in",
  description:
    "Eigensu builds tailored software that streamlines internal management and optimises operations.",
  // TODO(owner): full registered legal entity name and address.
  legalName: "Eigensu",
  location: "Mumbai, Maharashtra, India",
  enquiryEmail: "contact@eigensu.in",
  supportEmail: "hello@eigensu.in",
  linkedin: "https://www.linkedin.com/company/eigensu",
} as const;

export const PRODUCT = {
  name: "Dishigen",
  path: "/dishigen",
  description:
    "Dishigen is a WhatsApp and email marketing platform for businesses built on repeat visits, made by Eigensu in Mumbai.",
} as const;

/** Booking link for "Book a demo". When unset, the button opens the enquiry drawer. */
export const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || "";

/** Digits only, with country code, e.g. 919876543210. When unset, the WhatsApp button is hidden. */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");

export const WHATSAPP_MESSAGE = `Hi Eigensu, I'd like to know more about ${PRODUCT.name}.`;

export function whatsappHref(message: string = WHATSAPP_MESSAGE) {
  if (!WHATSAPP_NUMBER) return "";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path = "/") {
  return new URL(path, SITE.url).toString();
}
