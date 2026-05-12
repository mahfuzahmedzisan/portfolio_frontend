import type { Metadata } from "next";
import { ProjectsListPage } from "@/components/portfolio/pages/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected client and personal work.",
};

export default function Page() {
  return <ProjectsListPage />;
}
