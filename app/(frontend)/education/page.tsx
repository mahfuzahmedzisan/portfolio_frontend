import type { Metadata } from "next";
import { EducationPage } from "@/components/portfolio/pages/services-skills-experience-education";

export const metadata: Metadata = {
  title: "Education",
  description: "Formal training, certificates, and continuous learning.",
};

export default function Page() {
  return <EducationPage />;
}
