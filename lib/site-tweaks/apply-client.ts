"use client";

import type { SiteSettings } from "@/lib/site-settings/types";

export const ACCENT_HUES: Record<SiteSettings["accent"], number> = {
  Magenta: 305,
  Indigo: 270,
  Cyan: 220,
  Mint: 165,
  Amber: 65,
  Coral: 25,
};

const DENSITY: Record<
  SiteSettings["density"],
  { sectionY: string; gap: string; cardR: string; btnR: string }
> = {
  compact: { sectionY: "5rem", gap: "1rem", cardR: "12px", btnR: "10px" },
  comfortable: {
    sectionY: "7rem",
    gap: "1.25rem",
    cardR: "14px",
    btnR: "999px",
  },
  spacious: {
    sectionY: "9rem",
    gap: "1.5rem",
    cardR: "18px",
    btnR: "999px",
  },
};

export const FONT_PAIR_CSS: Record<
  SiteSettings["fontPair"],
  { display: string; body: string; mono: string }
> = {
  "Geist + Geist Mono": {
    display: "var(--font-geist), system-ui, sans-serif",
    body: "var(--font-geist), system-ui, sans-serif",
    mono: "var(--font-geist-mono), ui-monospace, monospace",
  },
  "Space Grotesk + JetBrains": {
    display: "var(--font-space-grotesk), system-ui, sans-serif",
    body: "var(--font-space-grotesk), system-ui, sans-serif",
    mono: "var(--font-jetbrains-mono), ui-monospace, monospace",
  },
  "Bricolage + IBM Plex": {
    display: "var(--font-bricolage), serif",
    body: "var(--font-ibm-plex-sans), sans-serif",
    mono: "var(--font-ibm-plex-mono), ui-monospace, monospace",
  },
  "Instrument Serif + Geist": {
    display: "var(--font-instrument-serif), serif",
    body: "var(--font-geist), system-ui, sans-serif",
    mono: "var(--font-geist-mono), ui-monospace, monospace",
  },
};

/** Sets resolved light/dark on document (next-themes should stay in sync separately). */
export function applyDataTheme(mode: SiteSettings["theme"]) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const sysDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = mode === "system" ? (sysDark ? "dark" : "light") : mode;
  root.setAttribute("data-theme", resolved);
  root.setAttribute("data-theme-mode", mode);
}

export function applyTweaksCss(t: SiteSettings) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const hue = ACCENT_HUES[t.accent] ?? 305;
  root.style.setProperty("--accent-h", String(hue));
  root.style.setProperty("--accent", `oklch(0.72 0.18 ${hue})`);
  root.style.setProperty("--accent-fg", `oklch(0.12 0.04 ${hue})`);
  root.style.setProperty("--accent-soft", `oklch(0.72 0.18 ${hue} / 0.12)`);
  root.style.setProperty("--accent-line", `oklch(0.72 0.18 ${hue} / 0.4)`);
  root.style.setProperty("--accent-glow", `oklch(0.72 0.18 ${hue} / 0.4)`);

  const d = DENSITY[t.density] ?? DENSITY.comfortable;
  root.setAttribute("data-density", t.density);
  root.style.setProperty("--section-y", d.sectionY);
  root.style.setProperty("--gap", d.gap);
  root.style.setProperty("--radius", d.cardR);
  root.style.setProperty("--btn-r", d.btnR);

  const f = FONT_PAIR_CSS[t.fontPair] ?? FONT_PAIR_CSS["Geist + Geist Mono"];
  root.style.setProperty("--font-display", f.display);
  root.style.setProperty("--font-body", f.body);
  root.style.setProperty("--font-mono", f.mono);
}

export const ACCENT_SWATCH_STYLES = `
.twk-color-opts [data-value="Magenta"] .twk-swatch{background:oklch(0.72 0.18 305) !important}
.twk-color-opts [data-value="Indigo"]  .twk-swatch{background:oklch(0.72 0.18 270) !important}
.twk-color-opts [data-value="Cyan"]    .twk-swatch{background:oklch(0.72 0.16 220) !important}
.twk-color-opts [data-value="Mint"]    .twk-swatch{background:oklch(0.72 0.16 165) !important}
.twk-color-opts [data-value="Amber"]   .twk-swatch{background:oklch(0.78 0.16 65)  !important}
.twk-color-opts [data-value="Coral"]   .twk-swatch{background:oklch(0.7  0.18 25)  !important}
`;
