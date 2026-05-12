"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import type { SiteSettings } from "@/lib/site-settings/types";
import { ACCENT_SWATCH_STYLES, applyTweaksCss } from "@/lib/site-tweaks/apply-client";
import { Background } from "./background";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { TweaksFloating } from "./tweaks-floating";

type Ctx = {
  settings: SiteSettings;
  patchSettings: (p: Partial<SiteSettings>) => void;
};

const SiteSettingsContext = createContext<Ctx | null>(null);

export function useSiteSettings() {
  const v = useContext(SiteSettingsContext);
  if (!v) throw new Error("useSiteSettings outside SiteShell");
  return v;
}

function ThemeSync({ theme }: { theme: SiteSettings["theme"] }) {
  const { setTheme } = useTheme();
  useEffect(() => {
    const id = requestAnimationFrame(() => setTheme(theme));
    return () => cancelAnimationFrame(id);
  }, [theme, setTheme]);
  return null;
}

export function SiteShell({
  initialSettings,
  adminAuthed,
  children,
}: {
  initialSettings: SiteSettings;
  adminAuthed: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "/";
  const [settings, setSettings] = useState(initialSettings);
  const settingsRef = useRef(initialSettings);
  const lastSent = useRef<string | null>(null);

  const incomingSerialized = JSON.stringify(initialSettings);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const next = JSON.parse(incomingSerialized) as SiteSettings;
      setSettings((prev) => {
        if (JSON.stringify(prev) === incomingSerialized) return prev;
        lastSent.current = incomingSerialized;
        return next;
      });
    });
    return () => cancelAnimationFrame(id);
  }, [incomingSerialized]);

  useEffect(() => {
    applyTweaksCss(settings);
  }, [settings]);

  useEffect(() => {
    const json = JSON.stringify(settings);
    if (lastSent.current === null) {
      lastSent.current = json;
      return;
    }
    if (lastSent.current === json) return;
    const shouldPersist =
      process.env.NODE_ENV === "development" ||
      (process.env.NODE_ENV === "production" &&
        adminAuthed &&
        pathname.startsWith("/admin") &&
        pathname !== "/admin/login");
    if (!shouldPersist) return;
    const id = setTimeout(() => {
      const payload = settingsRef.current;
      lastSent.current = JSON.stringify(payload);
      void fetch("/api/site-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then(async (res) => {
        if (!res.ok) return;
        const next = (await res.json()) as SiteSettings;
        lastSent.current = JSON.stringify(next);
        setSettings(next);
      });
    }, 500);
    return () => clearTimeout(id);
  }, [settings, adminAuthed, pathname]);

  const patchSettings = useCallback((p: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...p }));
  }, []);

  const ctx = useMemo<Ctx>(
    () => ({ settings, patchSettings }),
    [settings, patchSettings],
  );

  const isAdmin = pathname.startsWith("/admin");
  const showChrome = !isAdmin;
  const showTweaks =
    process.env.NODE_ENV === "development" ||
    (process.env.NODE_ENV === "production" &&
      adminAuthed &&
      isAdmin &&
      pathname !== "/admin/login");

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme={initialSettings.theme}
      enableSystem
      disableTransitionOnChange
      storageKey="portfolio-theme"
    >
      <SiteSettingsContext.Provider value={ctx}>
        <ThemeSync theme={settings.theme} />
        <style dangerouslySetInnerHTML={{ __html: ACCENT_SWATCH_STYLES }} />
        <Background motion={settings.motion} />
        {showChrome ? <SiteHeader /> : null}
        {children}
        {showChrome ? <SiteFooter /> : null}
        {showTweaks ? <TweaksFloating /> : null}
      </SiteSettingsContext.Provider>
    </ThemeProvider>
  );
}
