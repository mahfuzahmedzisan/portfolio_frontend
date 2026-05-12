import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  getSiteSettings,
  partialSiteSettings,
  setSiteSettings,
  type SiteSettings,
} from "@/lib/site-settings";
import { verifyAdminCookie, ADMIN_COOKIE_NAME } from "@/lib/admin/session";

export async function GET() {
  const s = await getSiteSettings();
  return NextResponse.json(s, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" },
  });
}

export async function PATCH(req: Request) {
  const jar = await cookies();
  const ok = verifyAdminCookie(jar.get(ADMIN_COOKIE_NAME)?.value);
  const isProd = process.env.NODE_ENV === "production";
  if (isProd && !ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const partial = partialSiteSettings(body);
  if (!partial || Object.keys(partial).length === 0) {
    return NextResponse.json({ error: "No valid fields" }, { status: 400 });
  }
  const cur = await getSiteSettings();
  const next: SiteSettings = { ...cur, ...partial };
  await setSiteSettings(next);
  revalidatePath("/", "layout");
  revalidatePath("/(frontend)", "layout");
  return NextResponse.json(next);
}
