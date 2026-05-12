"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import {
  PROFILE,
  SKILLS,
  SERVICES,
  PROJECTS,
  BLOGS,
  EXPERIENCE,
} from "@/lib/content/site";
import { Icon } from "../icon";
import { SectionHead } from "../primitives";
import { useReveal } from "../use-reveal";
import {
  BlogCard,
  HeroAvatar,
  ProjectCard,
  ServiceCard,
  SkillCard,
  Timeline,
} from "../cards";

export function HomePage() {
  useReveal();
  const projects = PROJECTS.filter((p) => p.featured).slice(0, 3);
  const blogs = BLOGS.slice(0, 3);
  const services = SERVICES.slice(0, 3);

  return (
    <main className="page-anim">
      <section className="section" style={{ paddingTop: "9rem", position: "relative" }}>
        <div className="shell" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr)",
              gap: "2rem",
            }}
          >
            <div className="row-wrap reveal" style={{ gap: "0.75rem" }}>
              <span className="tag tag-accent">
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "currentColor",
                    boxShadow: "0 0 8px currentColor",
                  }}
                />
                Available for hire — Q3 2026
              </span>
              <span className="tag mono">
                <Icon name="map-pin" size={12} />
                {PROFILE.location}
              </span>
            </div>

            <div className="reveal" style={{ "--reveal-delay": "0.05s" } as CSSProperties}>
              <div
                className="row"
                style={{ gap: "1.25rem", marginBottom: "1.5rem", flexWrap: "wrap" }}
              >
                <HeroAvatar />
                <div>
                  <div className="mono muted" style={{ fontSize: "0.85rem", marginBottom: "0.4rem" }}>
                    {"// Hi, I\u0027m"}
                  </div>
                  <div className="h-display text-grad">{PROFILE.name}.</div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  maxWidth: 760,
                }}
              >
                <p className="h-2 text-2" style={{ fontWeight: 400, margin: 0, lineHeight: 1.45 }}>
                  <span className="accent-grad">{PROFILE.role}</span> at {PROFILE.company}, building{" "}
                  <span style={{ color: "var(--text)" }}>modern web apps</span> with Laravel, React, and
                  Next.js.
                </p>
                <div
                  className="row-wrap"
                  style={{
                    gap: "0.75rem",
                    margin: 0,
                    alignItems: "center",
                  }}
                >
                  <Link className="btn btn-primary" href="/projects">
                    See selected work <Icon name="arrow-right" size={16} />
                  </Link>
                  <Link className="btn btn-ghost" href="/contact">
                    Get in touch
                  </Link>
                  <div style={{ display: "flex", gap: "0.5rem", marginLeft: "auto" }}>
                    <a
                      className="btn-icon"
                      href={PROFILE.socials[0].href}
                      aria-label="GitHub"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="github" size={16} />
                    </a>
                    <a
                      className="btn-icon"
                      href={PROFILE.socials[1].href}
                      aria-label="Facebook"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="facebook" size={16} />
                    </a>
                    <a className="btn-icon" href={`mailto:${PROFILE.email}`} aria-label="Email">
                      <Icon name="mail" size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal" style={{ marginTop: "5rem", "--reveal-delay": "0.25s" } as CSSProperties}>
              <div
                className="stats-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 0,
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  background: "var(--card)",
                  backdropFilter: "blur(20px)",
                  overflow: "hidden",
                }}
              >
                {PROFILE.stats.map((s, i) => (
                  <div
                    key={s.k}
                    style={{
                      padding: "1.5rem",
                      borderRight: i < 3 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <div className="stat-num accent-grad">{s.v}</div>
                    <div
                      className="mono muted"
                      style={{
                        fontSize: "0.78rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginTop: "0.5rem",
                      }}
                    >
                      {s.k}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-tight"
        style={{
          borderBlock: "1px solid var(--border)",
          overflow: "hidden",
          padding: "1.5rem 0",
        }}
      >
        <div className="marquee">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  gap: "3.5rem",
                  paddingRight: "3.5rem",
                  alignItems: "center",
                }}
              >
                {[
                  "Laravel",
                  "Next.js",
                  "React",
                  "TypeScript",
                  "PostgreSQL",
                  "Tailwind",
                  "Docker",
                  "PHP",
                  "MySQL",
                  "Figma",
                ].map((t) => (
                  <span
                    key={`${k}-${t}`}
                    className="mono"
                    style={{
                      fontSize: "1.2rem",
                      letterSpacing: "-0.02em",
                      color: "var(--text-2)",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    {t}
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "var(--accent)",
                        opacity: 0.6,
                      }}
                    />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .marquee { width: 100%; }
          .marquee-track { display: flex; width: max-content; animation: marquee 30s linear infinite; }
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        `}</style>
      </section>

      <section className="section" id="about-preview">
        <div className="shell">
          <SectionHead
            eyebrow="01 / About"
            title="A pragmatic developer who actually ships."
            sub="Software developer at Maktech, polytechnic CS grad, freelance veteran. I care about clean code, sharp interfaces, and projects that work."
            action={
              <Link className="btn btn-ghost" href="/about">
                Read full bio <Icon name="arrow-right" size={14} />
              </Link>
            }
          />
          <div className="grid-2 reveal">
            <div className="card" style={{ padding: "2rem" }}>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>
                What I do
              </div>
              <p className="text-2" style={{ lineHeight: 1.7, fontSize: "1.05rem", margin: 0 }}>
                {PROFILE.about[0]}
              </p>
            </div>
            <div className="card" style={{ padding: "2rem" }}>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>
                What I&apos;m into
              </div>
              <p className="text-2" style={{ lineHeight: 1.7, fontSize: "1.05rem", margin: 0 }}>
                {PROFILE.about[1]}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services-preview" style={{ position: "relative" }}>
        <div className="spotlight" />
        <div className="shell" style={{ position: "relative", zIndex: 1 }}>
          <SectionHead
            eyebrow="02 / Services"
            title="What I can build for you."
            sub="From a one-page launch site to a multi-tenant SaaS, I handle the design, the code, and the deploy."
            action={
              <Link className="btn btn-ghost" href="/services">
                All services <Icon name="arrow-right" size={14} />
              </Link>
            }
          />
          <div className="grid-3">
            {services.map((s, i) => (
              <ServiceCard key={s.id} s={s} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="skills-preview">
        <div className="shell">
          <SectionHead
            eyebrow="03 / Skills"
            title="The toolbelt."
            sub="Day-to-day stack on the left, picked up on the right. I'd rather go deep on a few things than be shallow on many."
            action={
              <Link className="btn btn-ghost" href="/skills">
                Full skill matrix <Icon name="arrow-right" size={14} />
              </Link>
            }
          />
          <div className="grid-2 reveal">
            {SKILLS.slice(0, 8).map((sk, i) => (
              <SkillCard key={sk.name} sk={sk} delay={i * 0.04} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects-preview" style={{ position: "relative" }}>
        <div className="spotlight" />
        <div className="shell" style={{ position: "relative", zIndex: 1 }}>
          <SectionHead
            eyebrow="04 / Selected work"
            title="Things I've shipped recently."
            sub="A handful of recent projects. The full archive lives on the projects page."
            action={
              <Link className="btn btn-ghost" href="/projects">
                All projects <Icon name="arrow-right" size={14} />
              </Link>
            }
          />
          <div className="grid-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} p={p} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="experience-preview">
        <div className="shell">
          <SectionHead
            eyebrow="05 / Experience"
            title="Where I've worked."
            sub="A short timeline. Each role taught me something I still use."
            action={
              <Link className="btn btn-ghost" href="/experience">
                Full timeline <Icon name="arrow-right" size={14} />
              </Link>
            }
          />
          <Timeline items={EXPERIENCE} />
        </div>
      </section>

      <section className="section" id="blog-preview">
        <div className="shell">
          <SectionHead
            eyebrow="06 / Writing"
            title="Latest from the blog."
            sub="Notes on Laravel, Next.js, devops, and the occasional career rant."
            action={
              <Link className="btn btn-ghost" href="/blog">
                Read the blog <Icon name="arrow-right" size={14} />
              </Link>
            }
          />
          <div className="grid-3">
            {blogs.map((b, i) => (
              <BlogCard key={b.slug} b={b} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div
            className="card reveal"
            style={{
              padding: "clamp(2rem, 5vw, 4.5rem)",
              background:
                "linear-gradient(135deg, var(--accent-soft), transparent 60%), var(--card)",
              border: "1px solid var(--accent-line)",
              position: "relative",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            <span className="eyebrow" style={{ marginBottom: "1.5rem" }}>
              Let&apos;s build something
            </span>
            <h2 className="h-1 text-grad" style={{ margin: "0.5rem auto 1rem", maxWidth: 720 }}>
              Have a project in mind? <br />
              I&apos;d love to hear about it.
            </h2>
            <p
              className="text-2"
              style={{
                maxWidth: 540,
                margin: "0 auto 2rem",
                fontSize: "1.05rem",
                lineHeight: 1.6,
              }}
            >
              Drop me a message and I&apos;ll get back within 24 hours. Full-time roles, freelance
              gigs, and weird side-quests all welcome.
            </p>
            <div className="row-wrap" style={{ justifyContent: "center" }}>
              <Link className="btn btn-primary" href="/contact">
                Start a conversation <Icon name="arrow-right" size={16} />
              </Link>
              <a className="btn btn-ghost" href={`mailto:${PROFILE.email}`}>
                <Icon name="mail" size={14} /> {PROFILE.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
