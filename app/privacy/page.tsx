import type { Metadata } from "next";
import { ThemeHeroSection } from "../components/ThemeHero";
import { pageMetadata } from "../lib/metadata";
import { SITE } from "../lib/site";

// DRAFT — requires legal review before launch. TODO(owner): legal review; registered
// entity name and address; retention periods; grievance officer details if required.
const LAST_UPDATED = "14 October 2026";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Privacy policy",
    description: "How Eigensu collects, uses and protects the details you share through this website.",
    path: "/privacy",
  }),
  // Kept out of search results until the draft has been reviewed.
  robots: { index: false, follow: true },
};

const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";
const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
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
        </ul>
        <p>These providers may store data outside India.</p>
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
    body: <p>If we change this policy we will update this page and the date below.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <div>
      <ThemeHeroSection>
        <div style={{ fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 16 }}>
          Legal // privacy
        </div>
        <h1 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(2rem,5vw,3.8rem)", lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--text)", margin: "0 0 20px" }}>
          Privacy policy
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "52ch", lineHeight: 1.7 }}>
          How we handle the details you share with us through this website. Last updated {LAST_UPDATED}.
        </p>
      </ThemeHeroSection>

      <section className="relative z-10 py-14 md:py-20">
        <div className="legal w-full max-w-[760px] mx-auto px-5 sm:px-8">
          {SECTIONS.map((s) => (
            <section key={s.heading} style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.35rem", color: "var(--text)", marginBottom: 12 }}>{s.heading}</h2>
              {s.body}
            </section>
          ))}
        </div>
      </section>

      <style>{`
        .legal p, .legal li { color: var(--text-muted); font-size: 0.98rem; line-height: 1.75; margin-bottom: 12px; }
        .legal ul { list-style: disc; padding-left: 22px; margin-bottom: 12px; }
        .legal a { color: var(--accent); text-decoration: underline; }
      `}</style>
    </div>
  );
}
