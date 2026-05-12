import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, PROJECTS } from "@/lib/content/site";
import { ProjectDetailPage } from "@/components/portfolio/pages/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.short,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetailPage project={project} />;
}
