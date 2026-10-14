import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "../components/content/LegalPage";
import { pageMetadata } from "../lib/metadata";
import { robotsFor } from "../content/status";
import { PRODUCT, SITE } from "../lib/site";

// DRAFT — requires legal review. TODO(owner): every "[To be confirmed]" item, legal entity and address.
const UPDATED = "2026-10-14";

export const metadata: Metadata = {
  ...pageMetadata({ title: "Terms of use", description: `Terms for using the Eigensu website and ${PRODUCT.name}.`, path: "/terms" }),
  robots: robotsFor("review"),
};

const TBC = () => <span className="tbc">[To be confirmed]</span>;

const SECTIONS: LegalSection[] = [
  { heading: "Who we are", body: <p>This website and {PRODUCT.name} are provided by {SITE.legalName}, based in {SITE.location}. Contact: <a href={`mailto:${SITE.enquiryEmail}`}>{SITE.enquiryEmail}</a>.</p> },
  { heading: "Using this website", body: <p>The information on this website is for general guidance. We work to keep it accurate, including the WhatsApp prices we quote with their sources and dates, but prices set by third parties such as Meta can change without notice.</p> },
  {
    heading: `Using ${PRODUCT.name}`,
    body: (
      <>
        <p>A {PRODUCT.name} subscription is governed by the order form or agreement you sign with us. <TBC /></p>
        <p>You are responsible for the messages you send through {PRODUCT.name}, including having your customers&apos; opt-in and following WhatsApp&apos;s Business and Commerce policies.</p>
      </>
    ),
  },
  { heading: "Fees and Meta charges", body: <p>Subscription fees, billing periods and how Meta&apos;s message charges are billed: <TBC /></p> },
  { heading: "Intellectual property", body: <p>The website, its content and the {PRODUCT.name} software belong to {SITE.legalName}. You keep ownership of the customer data you upload.</p> },
  { heading: "Liability", body: <p><TBC /></p> },
  { heading: "Governing law", body: <p><TBC /></p> },
  { heading: "Changes to these terms", body: <p>If we change these terms we will update this page and its &ldquo;last updated&rdquo; date.</p> },
];

export default function TermsPage() {
  return <LegalPage path="/terms" title="Terms of use" intro={`The terms for using this website and ${PRODUCT.name}.`} updated={UPDATED} sections={SECTIONS} />;
}
