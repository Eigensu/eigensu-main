import ProjectsPage from "../pages/Projects";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Software Eigensu has built, including Dishigen, our WhatsApp and email marketing platform for repeat-visit businesses.",
  path: "/projects",
});

export default function Page() {
  return <ProjectsPage />;
}
