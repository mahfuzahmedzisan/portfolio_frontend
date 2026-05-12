import { TWEAK_DEFAULTS } from "./defaults";
import type { SiteSettings } from "./types";

const ACCENTS: SiteSettings["accent"][] = [
  "Magenta",
  "Indigo",
  "Cyan",
  "Mint",
  "Amber",
  "Coral",
];
const MOTIONS: SiteSettings["motion"][] = [
  "grid-streaks",
  "particles",
  "blobs",
  "static",
];
const DENSITIES: SiteSettings["density"][] = [
  "compact",
  "comfortable",
  "spacious",
];
const FONTS: SiteSettings["fontPair"][] = [
  "Geist + Geist Mono",
  "Space Grotesk + JetBrains",
  "Bricolage + IBM Plex",
  "Instrument Serif + Geist",
];
const HERO: SiteSettings["heroLayout"][] = [
  "split",
  "centered",
  "stacked",
];
const THEMES: SiteSettings["theme"][] = ["light", "dark", "system"];

function pick<V>(v: unknown, allowed: readonly V[], fallback: V): V {
  return (allowed as readonly unknown[]).includes(v) ? (v as V) : fallback;
}

export function mergeSiteSettings(raw: unknown): SiteSettings {
  if (!raw || typeof raw !== "object") return TWEAK_DEFAULTS;
  const o = raw as Record<string, unknown>;
  return {
    theme: pick(o.theme, THEMES, TWEAK_DEFAULTS.theme),
    accent: pick(o.accent, ACCENTS, TWEAK_DEFAULTS.accent),
    motion: pick(o.motion, MOTIONS, TWEAK_DEFAULTS.motion),
    fontPair: pick(o.fontPair, FONTS, TWEAK_DEFAULTS.fontPair),
    density: pick(o.density, DENSITIES, TWEAK_DEFAULTS.density),
    heroLayout: pick(o.heroLayout, HERO, TWEAK_DEFAULTS.heroLayout),
  };
}

export function partialSiteSettings(
  raw: unknown,
): Partial<SiteSettings> | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const out: Partial<SiteSettings> = {};
  if (o.theme !== undefined && THEMES.includes(o.theme as SiteSettings["theme"]))
    out.theme = o.theme as SiteSettings["theme"];
  if (
    o.accent !== undefined &&
    ACCENTS.includes(o.accent as SiteSettings["accent"])
  )
    out.accent = o.accent as SiteSettings["accent"];
  if (
    o.motion !== undefined &&
    MOTIONS.includes(o.motion as SiteSettings["motion"])
  )
    out.motion = o.motion as SiteSettings["motion"];
  if (
    o.fontPair !== undefined &&
    FONTS.includes(o.fontPair as SiteSettings["fontPair"])
  )
    out.fontPair = o.fontPair as SiteSettings["fontPair"];
  if (
    o.density !== undefined &&
    DENSITIES.includes(o.density as SiteSettings["density"])
  )
    out.density = o.density as SiteSettings["density"];
  if (
    o.heroLayout !== undefined &&
    HERO.includes(o.heroLayout as SiteSettings["heroLayout"])
  )
    out.heroLayout = o.heroLayout as SiteSettings["heroLayout"];
  return Object.keys(out).length ? out : null;
}
