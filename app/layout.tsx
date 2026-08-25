import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import PageShell from "./components/PageShell";
import ClientOnly from "./components/ClientOnly";

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

export const metadata: Metadata = {
  title: "Eigensu — Systems for internal operations",
  description: "Tailored solutions and products for internal management and operations optimisation.",
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
      </head>
      <body className="min-h-full">
        <ClientOnly>
          <PageShell>{children}</PageShell>
        </ClientOnly>
      </body>
    </html>
  );
}
