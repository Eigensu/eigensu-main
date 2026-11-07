import type { Metadata } from "next";
import ProductsPage from "../pages/Products";

export const metadata: Metadata = {
  title: "Products — Eigensu",
  description: "DishPatch, Inventory and Recruiter: software Eigensu builds and runs, plus custom products and services built around your process.",
};

export default function Page() {
  return <ProductsPage />;
}
