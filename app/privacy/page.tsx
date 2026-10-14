import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "../components/content/LegalPage";
import { pageMetadata } from "../lib/metadata";
import { robotsFor } from "../content/status";
import { SITE } from "../lib/site";

// DRAFT — requires legal review before launch. TODO(owner): legal review; registered
// entity name and address; retention periods; grievance officer details if required.
// Linked from the enquiry forms' consent checkbox, so it stays linked while in review.
const UPDATED = "2026-10-14";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Privacy policy",
    description: "How Eigensu collects, uses and protects the details you share through this website.",
    path: "/privacy",
  }),
  robots: robotsFor("review"),
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        This website is run by {SITE.legalName}, based in {SITE.location} (&ldquo;Eigensu&rdquo;, &ldquo;we&rdquo;). Questions about this policy or your
        data can be sent to <a href={`mailto:${SITE.enquiryEmail}`}>{SITE.enquiryEmail}</a>.
      </p>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <>
        <p>When you send an enquiry through a form on this site, we collect the details you enter, which may include your name, email address, phone number, company, role and message, along with the page you sent it from and the time.</p>
        <p>We do not ask for payment details or sensitive personal data through this website.</p>
      </>
    ),
  },
  {
    heading: "How we use it",
    body: <p>We use your details only to reply to your enquiry and to discuss the work you asked about. We do not sell your details or add you to marketing lists without asking you first.</p>,
  },
  {
    heading: "Who processes it for us",
    body: (
      <>
        <p>To deliver enquiries to our team we use service providers that process data on our behalf:</p>
        <ul>
          <li>Resend, to send the enquiry to our inbox by email.</li>
          <li>Google, where enquiries are also recorded in a Google Sheet.</li>
          <li>Vercel, which hosts this website.</li>
          <li>Google Tag Manager and Google Analytics, only if you accept analytics cookies.</li>
        </ul>
        <p>These providers may store data outside India.</p>
      </>
    ),
  },
  {
    heading: "Cookies and analytics",
    body: (
      <>
        <p>
          With your permission, we use Google Tag Manager and Google Analytics to understand how visitors use this site, for
          example which pages are viewed and which buttons are clicked. These tools set cookies only after you choose
          &ldquo;Accept&rdquo; in the cookie banner. If you choose &ldquo;Reject&rdquo;, they are not loaded.
        </p>
        <p>
          We never send your name, email address, phone number or message to these tools. You can change your choice at any
          time with &ldquo;Cookie settings&rdquo; at the bottom of every page.
        </p>
      </>
    ),
  },
  {
    heading: "How long we keep it",
    // TODO(owner): confirm the retention period.
    body: <p>We keep enquiry details for as long as needed to respond and to follow up on any resulting work, and then delete them.</p>,
  },
  {
    heading: "Your choices",
    body: (
      <p>
        You can ask us to show you, correct or delete the details you sent us, or withdraw your consent, by emailing{" "}
        <a href={`mailto:${SITE.enquiryEmail}`}>{SITE.enquiryEmail}</a>.
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: <p>If we change this policy we will update this page and its &ldquo;last updated&rdquo; date.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      path="/privacy"
      title="Privacy policy"
      intro="How we handle the details you share with us through this website."
      updated={UPDATED}
      sections={SECTIONS}
    />
  );
}
