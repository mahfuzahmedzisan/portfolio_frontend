import { cookies } from "next/headers";
import { verifyAdminCookie, ADMIN_COOKIE_NAME } from "@/lib/admin/session";
import { getSiteSettings } from "@/lib/site-settings";
import { SiteShell } from "@/components/portfolio/site-shell";

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const jar = await cookies();
  const adminAuthed = verifyAdminCookie(jar.get(ADMIN_COOKIE_NAME)?.value);

  // Do not set data-theme here — next-themes injects its own blocking script and
  // resolving "system" early fights the client, causing hydration mismatches.
  const densityBoot = `(function(){try{document.documentElement.setAttribute("data-density",${JSON.stringify(settings.density)});}catch(e){}})();`;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: densityBoot }} />
      <SiteShell initialSettings={settings} adminAuthed={adminAuthed}>
        {children}
      </SiteShell>
    </>
  );
}
