import type { Metadata } from "next";
import { ServicesPage } from "@/components/portfolio/pages/services-skills-experience-education";

export const metadata: Metadata = {
  title: "Services",
  description: "What I build and how I can help your team ship.",
};

export default function Page() {
  return <ServicesPage />;
}
