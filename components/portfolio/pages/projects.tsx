"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, PROJECTS, type Project } from "@/lib/content/site";
import { Icon } from "../icon";
import { PageIntro } from "../primitives";
import { useReveal } from "../use-reveal";
import { Empty, Skeleton } from "../primitives";
import { ProjectCard } from "../cards";

export function ProjectsListPage() {
  useReveal();
  const all = PROJECTS;
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [tech, setTech] = useState<string | null>(null);
  const [shown, setShown] = useState(6);

  const allTech = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return all.filter(
      (p) =>
        (cat === "All" || p.cat === cat) &&
        (!featuredOnly || p.featured) &&
        (!tech || tech === "All" || p.tech.includes(tech)) &&
        (q === "" ||
          `${p.title} ${p.short} ${p.tech.join(" ")}`.toLowerCase().includes(q.toLowerCase())),
    );
  }, [all, cat, q, featuredOnly, tech]);

  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setShown((s) => Math.min(s + 6, filtered.length));
    });
    io.observe(el);
    return () => io.disconnect();
  }, [filtered]);

  return (
    <main className="page-anim">
      <PageIntro
        eyebrow={`Projects · ${PROJECTS.length} shipped`}
        title="Selected work."
        sub="Filter, search, scroll. Click any card for the full case study."
      />

      <section className="section-tight" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
        <div className="shell">
          <div
            className="card"
            style={{
              padding: "1rem 1.15rem",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
              <Icon
                name="search"
                size={15}
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--muted)",
                }}
              />
              <input
                className="input"
                placeholder="Search by name, tech, or description…"
                style={{ paddingLeft: "2.5rem" }}
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <button
              type="button"
              className={`tag ${featuredOnly ? "tag-accent" : ""}`}
              onClick={() => setFeaturedOnly((v) => !v)}
              style={{ cursor: "pointer", padding: "0.5rem 0.85rem", fontSize: "0.82rem" }}
            >
              ★ Featured only
            </button>
          </div>

          <div className="row-wrap" style={{ marginTop: "1.25rem", justifyContent: "space-between" }}>
            <div className="row-wrap" style={{ gap: "0.4rem" }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`tag ${cat === c ? "tag-accent" : ""}`}
                  onClick={() => setCat(c)}
                  style={{ cursor: "pointer", padding: "0.45rem 0.9rem", fontSize: "0.85rem" }}
                >
                  {c}
                </button>
              ))}
            </div>
            <select
              className="select"
              value={tech ?? "All"}
              onChange={(e) => setTech(e.target.value === "All" ? null : e.target.value)}
              style={{ width: "auto", padding: "0.5rem 0.85rem", fontSize: "0.85rem" }}
            >
              {allTech.map((t) => (
                <option key={t} value={t}>
                  {t === "All" ? "All technologies" : t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="shell">
          {filtered.length === 0 ? (
            <Empty title="No matching projects" sub="Try clearing filters or searching something else." />
          ) : (
            <>
              <div className="grid-3">
                {filtered.slice(0, shown).map((p, i) => (
                  <ProjectCard key={p.slug} p={p} delay={(i % 3) * 0.05} />
                ))}
              </div>
              {shown < filtered.length ? (
                <div ref={sentinelRef} style={{ marginTop: "2rem", textAlign: "center" }}>
                  <div className="row" style={{ justifyContent: "center", gap: "0.5rem", color: "var(--muted)" }}>
                    <span className="skeleton" style={{ width: 12, height: 12, borderRadius: "50%" }} />
                    <span className="mono" style={{ fontSize: "0.8rem" }}>
                      Loading more…
                    </span>
                  </div>
                </div>
              ) : null}
              <div className="row" style={{ justifyContent: "center", marginTop: "2rem" }}>
                <span className="mono muted" style={{ fontSize: "0.78rem" }}>
                  Showing {Math.min(shown, filtered.length)} of {filtered.length}
                </span>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export function ProjectDetailPage({ project }: { project: Project }) {
  useReveal();
  const related = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <main className="page-anim">
      <section className="section" style={{ paddingTop: "9rem" }}>
        <div className="shell">
          <Link
            href="/projects"
            className="mono muted"
            style={{
              fontSize: "0.85rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "2rem",
            }}
          >
            <Icon name="arrow-left" size={13} /> All projects
          </Link>
          <div className="row-wrap reveal" style={{ gap: "0.5rem", marginBottom: "1rem" }}>
            <span className="tag tag-accent">{project.cat}</span>
            <span className="tag mono">{project.year}</span>
            {project.featured ? <span className="tag tag-accent">★ Featured</span> : null}
          </div>
          <h1
            className="h-display reveal text-grad"
            style={{ marginBottom: "1.5rem", fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            {project.title}
          </h1>
          <p
            className="reveal text-2"
            style={
              {
                fontSize: "1.2rem",
                lineHeight: 1.6,
                maxWidth: 760,
                "--reveal-delay": "0.1s",
              } as CSSProperties
            }
          >
            {project.full}
          </p>

          <div
            className="row-wrap reveal"
            style={{ marginTop: "2rem", gap: "0.75rem", "--reveal-delay": "0.15s" } as CSSProperties}
          >
            <a href={project.live} className="btn btn-primary">
              <Icon name="external" size={14} /> View live
            </a>
            <a href={project.repo} className="btn btn-ghost">
              <Icon name="github" size={14} /> Source
            </a>
          </div>

          <div
            className="card reveal meta-strip"
            style={{
              marginTop: "3rem",
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              "--reveal-delay": "0.2s",
            } as CSSProperties}
          >
            {(
              [
                ["Role", project.role],
                ["Duration", project.duration],
                ["Year", project.year],
                ["Category", project.cat],
              ] as const
            ).map(([k, v], i) => (
              <div
                key={k}
                style={{
                  padding: "1.5rem",
                  borderRight: i < 3 ? "1px solid var(--border)" : "none",
                }}
              >
                <div
                  className="mono muted"
                  style={{
                    fontSize: "0.72rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    marginBottom: "0.5rem",
                  }}
                >
                  {k}
                </div>
                <div style={{ fontSize: "0.95rem" }}>{v}</div>
              </div>
            ))}
          </div>

          <div
            className="reveal"
            style={{ marginTop: "3rem", "--reveal-delay": "0.25s" } as CSSProperties}
          >
            <Skeleton w="100%" h="400px" r="var(--radius)" />
          </div>

          <div
            className="reveal detail-grid"
            style={{
              marginTop: "4rem",
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr",
              gap: "3rem",
            }}
          >
            <div>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>
                The brief
              </div>
              <p className="text-2" style={{ fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "2rem" }}>
                {project.short} The team needed a system that scales beyond the proof-of-concept stage
                and stays maintainable as features grow. I scoped the architecture, built the core, and
                shepherded the deploy.
              </p>
            </div>
            <aside>
              <div className="card" style={{ padding: "1.5rem", position: "sticky", top: "5.5rem" }}>
                <div className="eyebrow" style={{ marginBottom: "1rem" }}>
                  Tech used
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                  {project.tech.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="sec-head reveal">
            <div className="stack">
              <span className="eyebrow">More work</span>
              <h2 className="h-1 text-grad">Related projects</h2>
              <p>Other things I&apos;ve shipped recently.</p>
            </div>
          </div>
          <div className="grid-3">
            {related.map((p, i) => (
              <ProjectCard key={p.slug} p={p} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 880px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .meta-strip { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  );
}
