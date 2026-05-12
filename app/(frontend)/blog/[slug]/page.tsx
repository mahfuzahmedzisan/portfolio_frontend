import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOGS, getBlogBySlug } from "@/lib/content/site";
import { BlogDetailPage } from "@/components/portfolio/pages/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOGS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Blog" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();
  return <BlogDetailPage post={post} />;
}
