import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import PageShell from "./components/PageShell";
import ClientOnly from "./components/ClientOnly";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "eigensu",
  description: "Enterprise-grade IT solutions engineered for speed, security, and scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ClientOnly>
          <PageShell>{children}</PageShell>
        </ClientOnly>
      </body>
    </html>
  );
}
