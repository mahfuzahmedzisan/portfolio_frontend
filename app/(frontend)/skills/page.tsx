import type { Metadata } from "next";
import { SkillsPage } from "@/components/portfolio/pages/services-skills-experience-education";

export const metadata: Metadata = {
  title: "Skills",
  description: "Languages, frameworks, and tools I reach for most often.",
};

export default function Page() {
  return <SkillsPage />;
}
