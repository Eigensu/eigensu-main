import type { Metadata } from "next";
import { Bebas_Neue, Lora } from "next/font/google";
import "./globals.css";
import PageShell from "./components/PageShell";
import ClientOnly from "./components/ClientOnly";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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
      className={`${bebasNeue.variable} ${lora.variable} h-full antialiased`}
    >
      <body className={`${lora.className} min-h-full`}>
        <ClientOnly>
          <PageShell>{children}</PageShell>
        </ClientOnly>
      </body>
    </html>
  );
}
