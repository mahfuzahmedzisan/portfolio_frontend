import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCookie, ADMIN_COOKIE_NAME } from "@/lib/admin/session";
import { AdminDashboard } from "@/components/portfolio/pages/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function Page() {
  if (process.env.NODE_ENV === "production") {
    const jar = await cookies();
    if (!verifyAdminCookie(jar.get(ADMIN_COOKIE_NAME)?.value)) {
      redirect("/admin/login");
    }
  }
  return <AdminDashboard />;
}
