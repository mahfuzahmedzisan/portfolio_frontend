"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "./icon";
import { Logo } from "./logo";
import { useSiteSettings } from "./site-shell";
import type { SiteSettings } from "@/lib/site-settings/types";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { patchSettings } = useSiteSettings();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const cycleTheme = () => {
    const cur = theme ?? "system";
    const next =
      cur === "system" ? "light" : cur === "light" ? "dark" : "system";
    setTheme(next);
    patchSettings({ theme: next as SiteSettings["theme"] });
  };

  return (
    <div
      className="nav-wrap"
      style={{ top: scrolled ? "0.5rem" : "1rem" }}
    >
      <nav
        className="nav shell"
        style={{
          padding: scrolled
            ? "0.55rem 0.85rem 0.55rem 1.25rem"
            : "0.7rem 0.85rem 0.7rem 1.25rem",
          transition: "padding 0.3s var(--ease-out)",
        }}
      >
        <Link href="/" aria-label="Home">
          <Logo />
        </Link>
        <ul className="nav-links">
          {NAV_ITEMS.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className={`nav-link ${isActive(pathname, n.href) ? "active" : ""}`}
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button
            type="button"
            className="btn-icon"
            onClick={cycleTheme}
            aria-label="Toggle theme"
            suppressHydrationWarning
          >
            <Icon
              name={
                !mounted
                  ? "sun"
                  : (theme === "system" ? resolvedTheme : theme) === "dark"
                    ? "moon"
                    : "sun"
              }
              size={15}
            />
          </button>
          <Link href="/admin/login" className="btn-icon" aria-label="Admin">
            <Icon name="lock" size={14} />
          </Link>
          <Link
            href="/contact"
            className="btn btn-primary nav-cta"
            style={{ padding: "0.55rem 1rem", fontSize: "0.85rem" }}
          >
            Hire me <Icon name="arrow-right" size={12} />
          </Link>
          <button
            type="button"
            className="btn-icon nav-mobile-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <Icon name={open ? "x" : "menu"} size={15} />
          </button>
        </div>
      </nav>
      <div className={`nav-mobile-panel ${open ? "open" : ""}`}>
        {NAV_ITEMS.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={isActive(pathname, n.href) ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {n.label}
          </Link>
        ))}
        <div className="divider" style={{ margin: "0.5rem 0" }} />
        <Link href="/admin/login" onClick={() => setOpen(false)}>
          Admin
        </Link>
      </div>
    </div>
  );
}
