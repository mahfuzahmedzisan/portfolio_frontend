"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BLOGS, PROJECTS, PROFILE } from "@/lib/content/site";
import { Icon } from "../icon";
import { adminLogoutAction } from "@/app/actions/admin";

export function AdminDashboard() {
  const [tab, setTab] = useState<"overview" | "projects" | "blog" | "appearance">("overview");

  const stats = useMemo(
    () => [
      { k: "Projects", v: String(PROJECTS.length), icon: "folder" as const },
      { k: "Blog posts", v: String(BLOGS.length), icon: "feed" as const },
      { k: "Available", v: PROFILE.available ? "Yes" : "No", icon: "check" as const },
      { k: "Location", v: PROFILE.location, icon: "map-pin" as const },
    ],
    [],
  );

  return (
    <div className="admin-shell" style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }}>
      <aside
        className="card"
        style={{
          margin: 0,
          borderRadius: 0,
          border: "none",
          borderRight: "1px solid var(--border)",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: "1rem" }}>
          Dashboard
        </div>
        {(
          [
            ["overview", "Overview", "layers"],
            ["projects", "Projects", "folder"],
            ["blog", "Blog", "feed"],
            ["appearance", "Appearance", "palette"],
          ] as const
        ).map(([id, label, ic]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`row ${tab === id ? "tag-accent" : ""}`}
            style={{
              gap: "0.6rem",
              padding: "0.65rem 0.85rem",
              borderRadius: 10,
              border: tab === id ? "1px solid var(--accent-line)" : "1px solid transparent",
              background: tab === id ? "var(--accent-soft)" : "transparent",
              cursor: "pointer",
              color: "var(--text)",
              font: "inherit",
              textAlign: "left",
            }}
          >
            <Icon name={ic} size={15} />
            {label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <form action={adminLogoutAction}>
          <button
            type="submit"
            className="btn btn-ghost"
            style={{ width: "100%", justifyContent: "center", gap: "0.5rem" }}
          >
            <Icon name="logout" size={14} /> Log out
          </button>
        </form>
        <Link href="/" className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
          View site
        </Link>
      </aside>
      <main style={{ padding: "2rem" }}>
        {tab === "overview" ? (
          <>
            <h1 className="h-1 text-grad" style={{ marginBottom: "0.5rem" }}>
              Overview
            </h1>
            <p className="muted text-2" style={{ marginBottom: "2rem", maxWidth: 560 }}>
              Static content is defined in <span className="mono">lib/content</span>. Use the floating
              Tweaks panel (this route in production) to adjust accent, motion, fonts, and theme for all
              visitors.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1rem",
              }}
              className="admin-stat-grid"
            >
              {stats.map((s) => (
                <div key={s.k} className="card" style={{ padding: "1.25rem" }}>
                  <div className="row" style={{ gap: "0.5rem", marginBottom: "0.75rem", color: "var(--muted)" }}>
                    <Icon name={s.icon} size={14} />
                    <span className="mono" style={{ fontSize: "0.72rem", textTransform: "uppercase" }}>
                      {s.k}
                    </span>
                  </div>
                  <div style={{ fontSize: "1.35rem", fontFamily: "var(--font-display)" }}>{s.v}</div>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {tab === "projects" ? (
          <>
            <h1 className="h-1 text-grad" style={{ marginBottom: "1.5rem" }}>
              Projects
            </h1>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Year</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {PROJECTS.map((p) => (
                    <tr key={p.slug}>
                      <td>{p.title}</td>
                      <td>{p.cat}</td>
                      <td className="mono">{p.year}</td>
                      <td>
                        <Link href={`/projects/${p.slug}`} className="mono" style={{ fontSize: "0.82rem" }}>
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {tab === "blog" ? (
          <>
            <h1 className="h-1 text-grad" style={{ marginBottom: "1.5rem" }}>
              Blog
            </h1>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {BLOGS.map((b) => (
                    <tr key={b.slug}>
                      <td>{b.title}</td>
                      <td>{b.cat}</td>
                      <td className="mono">{b.date}</td>
                      <td>
                        <Link href={`/blog/${b.slug}`} className="mono" style={{ fontSize: "0.82rem" }}>
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {tab === "appearance" ? (
          <>
            <h1 className="h-1 text-grad" style={{ marginBottom: "0.5rem" }}>
              Appearance
            </h1>
            <p className="muted text-2" style={{ marginBottom: "1.5rem", maxWidth: 560 }}>
              Open the <strong>Tweaks</strong> floating panel to edit accent hue, motion, font pairing,
              density, and light/dark/system. Changes persist to the server store and apply to every
              visitor after revalidation.
            </p>
            <div className="card" style={{ padding: "1.5rem" }}>
              <div className="eyebrow" style={{ marginBottom: "0.75rem" }}>
                Quick checks
              </div>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.7 }}>
                <li>Production Tweaks UI is limited to this admin area.</li>
                <li>
                  <span className="mono">GET /api/site-settings</span> returns merged defaults + stored
                  values.
                </li>
                <li>
                  <span className="mono">PATCH /api/site-settings</span> requires admin cookie in
                  production.
                </li>
              </ul>
            </div>
          </>
        ) : null}

        <style>{`
          @media (max-width: 720px) {
            .admin-shell { grid-template-columns: 1fr !important; }
            .admin-shell > aside { border-right: none !important; border-bottom: 1px solid var(--border); }
          }
          .admin-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
          .admin-table th,
          .admin-table td { padding: 0.85rem 1rem; text-align: left; border-bottom: 1px solid var(--border); }
          .admin-table th { font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
          @media (max-width: 900px) {
            .admin-stat-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 720px) {
            .admin-stat-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </main>
    </div>
  );
}
