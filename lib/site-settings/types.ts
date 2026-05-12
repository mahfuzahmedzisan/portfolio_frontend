export type ThemeMode = "light" | "dark" | "system";

export type AccentName =
  | "Magenta"
  | "Indigo"
  | "Cyan"
  | "Mint"
  | "Amber"
  | "Coral";

export type MotionMode = "grid-streaks" | "particles" | "blobs" | "static";

export type DensityMode = "compact" | "comfortable" | "spacious";

export type HeroLayout = "split" | "centered" | "stacked";

export type FontPairName =
  | "Geist + Geist Mono"
  | "Space Grotesk + JetBrains"
  | "Bricolage + IBM Plex"
  | "Instrument Serif + Geist";

export type SiteSettings = {
  theme: ThemeMode;
  accent: AccentName;
  motion: MotionMode;
  fontPair: FontPairName;
  density: DensityMode;
  heroLayout: HeroLayout;
};
