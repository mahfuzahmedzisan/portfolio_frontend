"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { PROFILE } from "@/lib/content/site";
import { Icon } from "../icon";
import { PageIntro, Placeholder } from "../primitives";
import { useReveal } from "../use-reveal";

function socialIcon(label: string): "github" | "facebook" | "twitter" | "linkedin" | "youtube" {
  const l = label.toLowerCase();
  if (l === "github") return "github";
  if (l === "facebook") return "facebook";
  if (l === "twitter") return "twitter";
  if (l === "linkedin") return "linkedin";
  return "youtube";
}

export function AboutPage() {
  useReveal();
  return (
    <main className="page-anim">
      <PageIntro eyebrow="About" title="Hey, I'm Mahfuz." sub={PROFILE.tagline} />
      <section className="section">
        <div className="shell">
          <div
            style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "3rem" }}
            className="about-grid"
          >
            <div className="reveal">
              <div className="stack" style={{ gap: "1.5rem" }}>
                {PROFILE.about.map((p, i) => (
                  <p
                    key={i}
                    style={{ fontSize: "1.1rem", lineHeight: 1.75, color: "var(--text-2)", margin: 0 }}
                  >
                    {p}
                  </p>
                ))}
                <p style={{ fontSize: "1.1rem", lineHeight: 1.75, color: "var(--text-2)", margin: 0 }}>
                  When I&apos;m not in a Laravel route file or a Next.js page, I&apos;m reading about
                  LLMs, sketching small experiments, or spending way too long on a ranked match. I try
                  to learn one new thing every week and ship one small thing every month.
                </p>
              </div>

              <div style={{ marginTop: "3rem" }}>
                <div className="eyebrow" style={{ marginBottom: "1.25rem" }}>
                  Currently
                </div>
                <div className="stack" style={{ gap: "1rem" }}>
                  {(
                    [
                      ["Working on", "Internal SaaS at Maktech + a few freelance projects"],
                      ["Learning", "RSC patterns, pgvector, and a bit of Rust on the side"],
                      ["Reading", "Designing Data-Intensive Applications by Martin Kleppmann"],
                      ["Listening to", "Lo-fi while coding, deathcore at the gym (yes, both)"],
                    ] as const
                  ).map(([k, v]) => (
                    <div
                      key={k}
                      className="row"
                      style={{
                        gap: "1.5rem",
                        padding: "0.65rem 0",
                        borderBottom: "1px dashed var(--border)",
                      }}
                    >
                      <span
                        className="mono muted"
                        style={{
                          fontSize: "0.78rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          minWidth: 110,
                        }}
                      >
                        {k}
                      </span>
                      <span style={{ color: "var(--text-2)" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="reveal" style={{ "--reveal-delay": "0.1s" } as CSSProperties}>
              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <Placeholder label="Portrait — drop your photo" aspect="3/4" />
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <div className="eyebrow" style={{ marginBottom: "0.5rem" }}>
                      Quick facts
                    </div>
                  </div>
                  {(
                    [
                      ["Name", PROFILE.name],
                      ["Role", `${PROFILE.role} @ ${PROFILE.company}`],
                      ["Based in", PROFILE.location],
                      ["Email", PROFILE.email],
                      ["Status", "Open to work"],
                    ] as const
                  ).map(([k, v]) => (
                    <div
                      key={k}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.5rem 0",
                        fontSize: "0.88rem",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <span className="muted mono" style={{ fontSize: "0.78rem" }}>
                        {k}
                      </span>
                      <span style={{ color: "var(--text)" }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.25rem" }}>
                    {PROFILE.socials.slice(0, 3).map((s) => (
                      <a key={s.label} href={s.href} className="btn-icon" aria-label={s.label}>
                        <Icon name={socialIcon(s.label)} size={14} />
                      </a>
                    ))}
                    <Link
                      href="/contact"
                      className="btn btn-primary"
                      style={{ marginLeft: "auto", padding: "0.5rem 0.85rem", fontSize: "0.85rem" }}
                    >
                      Hire me <Icon name="arrow-right" size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) { .about-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </main>
  );
}
