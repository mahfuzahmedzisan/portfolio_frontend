import type { SiteSettings } from "./types";

export const SITE_SETTINGS_KEY = "portfolio:site-settings" as const;

export const TWEAK_DEFAULTS: SiteSettings = {
  theme: "system",
  accent: "Magenta",
  motion: "grid-streaks",
  fontPair: "Geist + Geist Mono",
  density: "comfortable",
  heroLayout: "split",
};
