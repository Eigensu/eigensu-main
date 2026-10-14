import CareersPage from "../pages/Careers";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Work with Eigensu in Mumbai: build internal tools, automations and products that businesses depend on every day.",
  path: "/careers",
});

export default function Page() {
  return <CareersPage />;
}
