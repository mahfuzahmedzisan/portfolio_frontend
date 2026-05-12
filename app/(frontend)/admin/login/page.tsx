import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/portfolio/pages/admin-login";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminLoginForm />;
}
