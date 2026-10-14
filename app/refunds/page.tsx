import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "../components/content/LegalPage";
import { pageMetadata } from "../lib/metadata";
import { robotsFor } from "../content/status";
import { PRODUCT, SITE } from "../lib/site";

// DRAFT — requires legal review. TODO(owner): the actual refund and cancellation policy.
const UPDATED = "2026-10-14";

export const metadata: Metadata = {
  ...pageMetadata({ title: "Refund and cancellation policy", description: `How cancellations and refunds work for ${PRODUCT.name} subscriptions.`, path: "/refunds" }),
  robots: robotsFor("review"),
};

const TBC = () => <span className="tbc">[To be confirmed]</span>;

const SECTIONS: LegalSection[] = [
  { heading: "Cancelling a subscription", body: <p>How to cancel, the notice period and when the cancellation takes effect: <TBC /></p> },
  { heading: "Refunds of subscription fees", body: <p>Whether and when subscription fees are refunded, including partial periods: <TBC /></p> },
  { heading: "WhatsApp message charges", body: <p>Message charges are set by Meta and apply once a message is sent. Whether unused prepaid message credit is refundable: <TBC /></p> },
  {
    heading: "How to ask for a refund",
    body: <p>Email <a href={`mailto:${SITE.enquiryEmail}`}>{SITE.enquiryEmail}</a> with your account name and the invoice in question. How long we take to respond and to process a refund: <TBC /></p>,
  },
];

export default function RefundsPage() {
  return <LegalPage path="/refunds" title="Refund and cancellation policy" intro={`How cancellations and refunds work for ${PRODUCT.name} subscriptions.`} updated={UPDATED} sections={SECTIONS} />;
}
