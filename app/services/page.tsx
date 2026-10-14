import ServicesPage from "../pages/Services";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata({
  title: "Services: operations automation, internal tools and integration",
  description:
    "Operations automation, internal tooling and systems integration from Eigensu: we replace manual workflows with software that runs on its own.",
  path: "/services",
});

export default function Page() {
  return <ServicesPage />;
}
