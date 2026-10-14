import ProcessPage from "../pages/Process";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata({
  title: "How we work",
  description:
    "How Eigensu takes a project from discovery and scoping through architecture, build, testing and deployment, and keeps it running afterwards.",
  path: "/process",
});

export default function Page() {
  return <ProcessPage />;
}
