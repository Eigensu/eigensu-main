import AboutPage from "../pages/About";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Eigensu is a Mumbai software studio that builds the internal tools, automations and integrations companies run on.",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
