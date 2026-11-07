import type { Metadata } from "next";
import StatusPage from "../pages/Status";

export const metadata: Metadata = {
  title: "Status — Eigensu",
  description: "Live status of Eigensu products and the client sites we run.",
};

export default function Page() {
  return <StatusPage />;
}
