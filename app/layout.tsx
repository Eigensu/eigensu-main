import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import PageShell from "./components/PageShell";
import { SITE } from "./lib/site";
import Analytics from "./components/analytics/Analytics";
import { GTM_ID } from "./lib/analytics";
import { CONSENT_DEFAULTS_SCRIPT } from "./lib/consent";

const bricolageLogo = Bricolage_Grotesque({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const bricolageHead = Bricolage_Grotesque({
  variable: "--font-head",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const verification: Metadata["verification"] = {};
if (process.env.GOOGLE_SITE_VERIFICATION) verification.google = process.env.GOOGLE_SITE_VERIFICATION;
if (process.env.BING_SITE_VERIFICATION) verification.other = { "msvalidate.01": process.env.BING_SITE_VERIFICATION };

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Eigensu — Systems for internal operations",
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_IN",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  verification,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${bricolageLogo.variable} ${bricolageHead.variable} ${instrumentSans.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        {/* Set the theme before first paint to avoid a flash of the wrong palette. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;}catch(e){}})();`,
          }}
        />
        {/* Google consent mode defaults (all denied) must be set before Tag Manager loads. */}
        {GTM_ID && <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS_SCRIPT }} />}
      </head>
      <body className="min-h-full">
        <PageShell>{children}</PageShell>
        <Analytics />
      </body>
    </html>
  );
}
