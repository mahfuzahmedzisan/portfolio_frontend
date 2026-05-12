import type { Metadata } from "next";
import { HomePage } from "@/components/portfolio/pages/home";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Software developer building modern web apps with Laravel, React, and Next.js. Available for hire and freelance projects.",
};

export default function Page() {
  return <HomePage />;
}
