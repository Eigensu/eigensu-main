import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "../components/content/LegalPage";
import { pageMetadata } from "../lib/metadata";
import { robotsFor } from "../content/status";
import { CONSENT_STORAGE_KEY } from "../lib/consent";

// DRAFT — requires legal review. Describes exactly what the site stores (see lib/consent.ts, layout.tsx).
const UPDATED = "2026-10-14";

export const metadata: Metadata = {
  ...pageMetadata({ title: "Cookie policy", description: "What this website stores in your browser, and how to change your choice.", path: "/cookies" }),
  robots: robotsFor("review"),
};

const SECTIONS: LegalSection[] = [
  {
    heading: "What we store without asking",
    body: (
      <>
        <p>Two small values are kept in your browser&apos;s local storage so the site works as expected. Neither is sent to us or anyone else.</p>
        <ul>
          <li><code>theme</code>: remembers the colour theme.</li>
          <li><code>{CONSENT_STORAGE_KEY}</code>: remembers whether you accepted or rejected analytics cookies.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "What we store only if you accept",
    body: (
      <>
        <p>If you choose &ldquo;Accept&rdquo; in the cookie banner, we load Google Tag Manager and Google Analytics, which set Google Analytics cookies (such as <code>_ga</code>) to count visits and understand how pages are used.</p>
        <p>If you choose &ldquo;Reject&rdquo;, these tools are not loaded and set no cookies.</p>
      </>
    ),
  },
  {
    heading: "Changing your choice",
    body: <p>Use &ldquo;Cookie settings&rdquo; at the bottom of any page to see the banner again. You can also clear cookies and local storage in your browser settings. More detail is in our <Link href="/privacy">privacy policy</Link>.</p>,
  },
];

export default function CookiesPage() {
  return <LegalPage path="/cookies" title="Cookie policy" intro="What this website stores in your browser, and how to change your choice." updated={UPDATED} sections={SECTIONS} />;
}
