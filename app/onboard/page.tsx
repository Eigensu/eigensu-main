import OnboardPage from "../pages/Onboard";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata({
  title: "Start a project",
  description:
    "Tell Eigensu about the process you want automated or the tool you need built, and we will come back with a scoped proposal.",
  path: "/onboard",
});

export default function Page() {
  return <OnboardPage />;
}
