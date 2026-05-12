"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import {
  PROFILE,
  type Project,
  type BlogPost,
  type Service,
  type Skill,
  type ExperienceItem,
} from "@/lib/content/site";
import { Icon } from "./icon";
import { CardShine, Placeholder } from "./primitives";

export function HeroAvatar() {
  return (
    <div
      style={{
        width: 92,
        height: 92,
        borderRadius: "50%",
        background:
          "linear-gradient(135deg, var(--accent-soft), oklch(0.4 0.15 calc(var(--accent-h) + 30) / 0.2))",
        border: "1px solid var(--accent-line)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "1.8rem",
        letterSpacing: "-0.04em",
        color: "var(--text)",
        boxShadow:
          "0 0 0 6px var(--bg), 0 0 0 7px var(--border), 0 8px 32px var(--accent-glow)",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {PROFILE.initials}
      <div
        style={{
          position: "absolute",
          bottom: -2,
          right: -2,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "oklch(0.7 0.18 145)",
          border: "3px solid var(--bg)",
        }}
      />
    </div>
  );
}

export function ServiceCard({ s, delay = 0 }: { s: Service; delay?: number }) {
  return (
    <div
      className="card card-hover reveal"
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      <CardShine />
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: "var(--accent-soft)",
          border: "1px solid var(--accent-line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          color: "var(--accent)",
          fontSize: "1.15rem",
          marginBottom: "1.25rem",
        }}
      >
        {s.icon}
      </div>
      <h3 className="h-3" style={{ marginBottom: "0.65rem" }}>
        {s.title}
      </h3>
      <p
        className="text-2"
        style={{ margin: "0 0 1.25rem", lineHeight: 1.6, fontSize: "0.95rem" }}
      >
        {s.desc}
      </p>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
        }}
      >
        {s.bullets.map((b) => (
          <li
            key={b}
            className="mono"
            style={{
              fontSize: "0.8rem",
              color: "var(--text-2)",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Icon name="check" size={12} style={{ color: "var(--accent)", flexShrink: 0 }} />{" "}
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SkillCard({ sk, delay = 0 }: { sk: Skill; delay?: number }) {
  return (
    <div
      className="card reveal"
      style={
        {
          padding: "1.15rem 1.35rem",
          "--reveal-delay": `${delay}s`,
        } as CSSProperties
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "0.7rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span
            className="mono"
            style={{
              fontSize: "0.7rem",
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {sk.cat}
          </span>
          <span style={{ fontWeight: 500 }}>{sk.name}</span>
        </div>
        <span className="mono accent" style={{ fontSize: "0.78rem" }}>
          {sk.level}%
        </span>
      </div>
      <div
        style={{
          height: 6,
          background: "var(--bg-2)",
          borderRadius: 999,
          overflow: "hidden",
          border: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            width: `${sk.level}%`,
            height: "100%",
            background:
              "linear-gradient(90deg, var(--accent), oklch(0.7 0.18 calc(var(--accent-h) + 40)))",
            borderRadius: 999,
            boxShadow: "0 0 12px var(--accent-glow)",
            transition: "width 1.2s var(--ease-out)",
          }}
        />
      </div>
    </div>
  );
}

export function ProjectCard({ p, delay = 0 }: { p: Project; delay?: number }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="card card-hover reveal"
      style={
        {
          padding: 0,
          display: "block",
          "--reveal-delay": `${delay}s`,
        } as CSSProperties
      }
    >
      <CardShine />
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "var(--radius) var(--radius) 0 0",
        }}
      >
        <Placeholder label={`${p.title} — preview`} aspect="16/10" />
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            display: "flex",
            gap: "0.4rem",
          }}
        >
          <span
            className="tag mono"
            style={{
              background: "rgba(0,0,0,0.5)",
              borderColor: "rgba(255,255,255,0.15)",
              color: "#fff",
              backdropFilter: "blur(8px)",
            }}
          >
            {p.cat}
          </span>
          {p.featured ? (
            <span className="tag tag-accent" style={{ backdropFilter: "blur(8px)" }}>
              ★ Featured
            </span>
          ) : null}
        </div>
        <div style={{ position: "absolute", top: 12, right: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}
          >
            <Icon name="arrow-up-right" size={14} />
          </div>
        </div>
      </div>
      <div style={{ padding: "1.4rem" }}>
        <div
          className="mono muted"
          style={{
            fontSize: "0.75rem",
            marginBottom: "0.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          {p.year} · {p.role}
        </div>
        <h3 className="h-3" style={{ marginBottom: "0.55rem" }}>
          {p.title}
        </h3>
        <p
          className="text-2"
          style={{ margin: "0 0 1rem", fontSize: "0.92rem", lineHeight: 1.55 }}
        >
          {p.short}
        </p>
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
          {p.tech.slice(0, 4).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function BlogCard({ b, delay = 0 }: { b: BlogPost; delay?: number }) {
  return (
    <Link
      href={`/blog/${b.slug}`}
      className="card card-hover reveal"
      style={
        {
          padding: 0,
          display: "block",
          "--reveal-delay": `${delay}s`,
        } as CSSProperties
      }
    >
      <CardShine />
      <Placeholder label={b.cat} aspect="16/9" />
      <div style={{ padding: "1.4rem" }}>
        <div
          className="row"
          style={{ gap: "0.75rem", fontSize: "0.78rem", marginBottom: "0.75rem" }}
        >
          <span
            className="mono muted"
            style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
          >
            <Icon name="calendar" size={11} /> {b.date}
          </span>
          <span
            className="mono muted"
            style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
          >
            <Icon name="clock" size={11} /> {b.read}
          </span>
        </div>
        <h3 className="h-3" style={{ marginBottom: "0.65rem", lineHeight: 1.3 }}>
          {b.title}
        </h3>
        <p
          className="text-2"
          style={{ margin: "0 0 1rem", fontSize: "0.92rem", lineHeight: 1.55 }}
        >
          {b.excerpt}
        </p>
        <span
          className="mono accent"
          style={{ fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
        >
          Read article <Icon name="arrow-right" size={12} />
        </span>
      </div>
    </Link>
  );
}

export function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="reveal" style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: 12,
          top: 12,
          bottom: 12,
          width: 1,
          background: "var(--border)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {items.map((it, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}
          >
            <div
              style={{
                width: 25,
                height: 25,
                borderRadius: "50%",
                flexShrink: 0,
                background: "var(--bg)",
                border: "1px solid var(--accent-line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 8px var(--accent-glow)",
                }}
              />
            </div>
            <div className="card" style={{ flex: 1, padding: "1.25rem 1.5rem" }}>
              <div
                className="row"
                style={{
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <h3 className="h-3" style={{ margin: 0 }}>
                  {it.role}
                </h3>
                <span className="mono muted" style={{ fontSize: "0.78rem" }}>
                  {it.from} — {it.to}
                </span>
              </div>
              <div className="row" style={{ gap: "0.5rem", marginBottom: "0.85rem" }}>
                <Icon name="briefcase" size={13} style={{ color: "var(--accent)" }} />
                <span className="text-2" style={{ fontSize: "0.92rem" }}>
                  {it.org}
                </span>
              </div>
              <p
                className="text-2"
                style={{ margin: "0 0 1rem", fontSize: "0.92rem", lineHeight: 1.6 }}
              >
                {it.desc}
              </p>
              <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                {it.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
