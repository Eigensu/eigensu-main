import type { Metadata } from "next";
import { Montserrat, Sora, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PageShell from "./components/PageShell";
import ClientOnly from "./components/ClientOnly";

const montserrat = Montserrat({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const sora = Sora({
  variable: "--font-head",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
      className={`${montserrat.variable} ${sora.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ClientOnly>
          <PageShell>{children}</PageShell>
        </ClientOnly>
      </body>
    </html>
  );
}
