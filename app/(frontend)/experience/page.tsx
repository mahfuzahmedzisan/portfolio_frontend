import type { Metadata } from "next";
import { ExperiencePage } from "@/components/portfolio/pages/services-skills-experience-education";

export const metadata: Metadata = {
  title: "Experience",
  description: "Roles, teams, and problems I have worked on.",
};

export default function Page() {
  return <ExperiencePage />;
}
