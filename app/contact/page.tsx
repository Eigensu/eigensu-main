import ContactPage from "../pages/Contact";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to Eigensu about an internal tool, an automation or Dishigen. Email us or use the enquiry form; we reply within 24 hours on business days.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
