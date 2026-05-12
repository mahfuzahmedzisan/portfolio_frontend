import { Redis } from "@upstash/redis";
import fs from "node:fs/promises";
import path from "node:path";
import { SITE_SETTINGS_KEY, TWEAK_DEFAULTS } from "./defaults";
import { mergeSiteSettings } from "./merge";
import type { SiteSettings } from "./types";

const LOCAL_REL = ".local/site-settings.json";

function redis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

async function readLocalFile(): Promise<unknown | null> {
  if (process.env.NODE_ENV !== "development") return null;
  try {
    const p = path.join(process.cwd(), LOCAL_REL);
    const buf = await fs.readFile(p, "utf8");
    return JSON.parse(buf) as unknown;
  } catch {
    return null;
  }
}

async function writeLocalFile(data: SiteSettings): Promise<void> {
  if (process.env.NODE_ENV !== "development") return;
  const dir = path.join(process.cwd(), ".local");
  await fs.mkdir(dir, { recursive: true });
  const p = path.join(process.cwd(), LOCAL_REL);
  await fs.writeFile(p, JSON.stringify(data, null, 2), "utf8");
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const client = redis();
  if (client) {
    const raw = await client.get<string | Record<string, unknown>>(SITE_SETTINGS_KEY);
    if (!raw) return TWEAK_DEFAULTS;
    const obj = typeof raw === "string" ? JSON.parse(raw) : raw;
    return mergeSiteSettings(obj);
  }
  const file = await readLocalFile();
  return mergeSiteSettings(file ?? {});
}

export async function setSiteSettings(next: SiteSettings): Promise<void> {
  const client = redis();
  if (client) {
    await client.set(SITE_SETTINGS_KEY, JSON.stringify(next));
    return;
  }
  await writeLocalFile(next);
}
