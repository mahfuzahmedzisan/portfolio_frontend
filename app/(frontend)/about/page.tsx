import type { Metadata } from "next";
import { AboutPage } from "@/components/portfolio/pages/about";

export const metadata: Metadata = {
  title: "About",
  description: "Background, stack, and how I work.",
};

export default function Page() {
  return <AboutPage />;
}
