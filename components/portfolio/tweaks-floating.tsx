"use client";

import { useMemo, useState } from "react";
import type { SiteSettings } from "@/lib/site-settings/types";
import { ACCENT_HUES } from "@/lib/site-tweaks/apply-client";
import { useSiteSettings } from "./site-shell";
import "./tweaks-panel.css";

const ACCENTS: SiteSettings["accent"][] = [
  "Magenta",
  "Indigo",
  "Cyan",
  "Mint",
  "Amber",
  "Coral",
];

function Seg3<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  const idx = Math.max(0, options.findIndex((o) => o.value === value));
  const n = options.length;
  return (
    <div className="twk-row">
      <div className="twk-lbl">
        <span>{label}</span>
      </div>
      <div className="twk-seg" role="radiogroup">
        <div
          className="twk-seg-thumb"
          style={{
            left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
            width: `calc((100% - 4px) / ${n})`,
          }}
        />
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={o.value === value}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TweaksFloating() {
  const { settings, patchSettings } = useSiteSettings();
  const [open, setOpen] = useState(false);

  const motionOpts = useMemo(
    () =>
      [
        { value: "grid-streaks" as const, label: "Grid + streaks" },
        { value: "particles" as const, label: "Particles" },
        { value: "blobs" as const, label: "Blobs" },
        { value: "static" as const, label: "Static" },
      ] satisfies { value: SiteSettings["motion"]; label: string }[],
    [],
  );

  const fontOpts = useMemo(
    () =>
      [
        { value: "Geist + Geist Mono" as const, label: "Geist" },
        {
          value: "Space Grotesk + JetBrains" as const,
          label: "Space · JB",
        },
        { value: "Bricolage + IBM Plex" as const, label: "Bric · IBM" },
        {
          value: "Instrument Serif + Geist" as const,
          label: "Instr · Geist",
        },
      ] satisfies { value: SiteSettings["fontPair"]; label: string }[],
    [],
  );

  if (!open) {
    return (
      <button
        type="button"
        className="twk-panel"
        style={{
          width: "auto",
          padding: "10px 14px",
          cursor: "pointer",
          fontWeight: 600,
        }}
        onClick={() => setOpen(true)}
      >
        Tweaks
      </button>
    );
  }

  return (
    <div className="twk-panel" style={{ bottom: 16 }}>
      <div className="twk-hd">
        <b>Tweaks</b>
        <button
          type="button"
          className="twk-x"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
      </div>
      <div className="twk-body">
        <div className="twk-sect">Theme</div>
        <Seg3
          label="Mode"
          value={settings.theme}
          options={[
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
            { value: "system", label: "Sys" },
          ]}
          onChange={(v) => patchSettings({ theme: v })}
        />
        <div className="twk-row">
          <div className="twk-lbl">
            <span>Accent</span>
          </div>
          <div className="twk-chips twk-color-opts" role="radiogroup">
            {ACCENTS.map((a) => (
              <button
                key={a}
                type="button"
                className="twk-chip"
                data-value={a}
                data-on={settings.accent === a ? "1" : "0"}
                aria-label={a}
                style={{
                  background: `oklch(0.72 0.18 ${ACCENT_HUES[a]})`,
                }}
                onClick={() => patchSettings({ accent: a })}
              />
            ))}
          </div>
        </div>

        <div className="twk-sect">Motion</div>
        <div className="twk-row">
          <div className="twk-lbl">
            <span>Background</span>
          </div>
          <select
            className="twk-field"
            value={settings.motion}
            onChange={(e) =>
              patchSettings({
                motion: e.target.value as SiteSettings["motion"],
              })
            }
          >
            {motionOpts.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <Seg3
          label="Hero layout"
          value={settings.heroLayout}
          options={[
            { value: "split", label: "Split" },
            { value: "centered", label: "Center" },
            { value: "stacked", label: "Stack" },
          ]}
          onChange={(v) => patchSettings({ heroLayout: v })}
        />

        <div className="twk-sect">Type & spacing</div>
        <div className="twk-row">
          <div className="twk-lbl">
            <span>Font pair</span>
          </div>
          <select
            className="twk-field"
            value={settings.fontPair}
            onChange={(e) =>
              patchSettings({
                fontPair: e.target.value as SiteSettings["fontPair"],
              })
            }
          >
            {fontOpts.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <Seg3
          label="Density"
          value={settings.density}
          options={[
            { value: "compact", label: "Compact" },
            { value: "comfortable", label: "Comfy" },
            { value: "spacious", label: "Roomy" },
          ]}
          onChange={(v) => patchSettings({ density: v })}
        />
      </div>
    </div>
  );
}
