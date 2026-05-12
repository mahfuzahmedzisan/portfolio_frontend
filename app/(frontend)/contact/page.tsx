import type { Metadata } from "next";
import { ContactPage } from "@/components/portfolio/pages/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out for projects, collaborations, or a quick hello.",
};

export default function Page() {
  return <ContactPage />;
}
