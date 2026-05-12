import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "portfolio_admin";

export function expectedAdminCookieValue(): string {
  const secret =
    process.env.ADMIN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "dev-only-change-me";
  return createHmac("sha256", secret).update("portfolio-admin-v1").digest("hex");
}

export function verifyAdminCookie(value: string | undefined): boolean {
  if (!value) return false;
  const exp = Buffer.from(expectedAdminCookieValue(), "utf8");
  const got = Buffer.from(value, "utf8");
  if (exp.length !== got.length) return false;
  return timingSafeEqual(exp, got);
}

export { COOKIE as ADMIN_COOKIE_NAME };
