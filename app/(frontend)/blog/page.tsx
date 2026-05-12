import type { Metadata } from "next";
import { BlogListPage } from "@/components/portfolio/pages/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on Laravel, Next.js, DevOps, and engineering practice.",
};

export default function Page() {
  return <BlogListPage />;
}
