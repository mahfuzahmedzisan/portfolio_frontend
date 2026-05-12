"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useMemo } from "react";
import { SERVICES, SKILLS, EXPERIENCE, EDUCATION, CERTIFICATES } from "@/lib/content/site";
import { Icon } from "../icon";
import { PageIntro } from "../primitives";
import { useReveal } from "../use-reveal";
import { ServiceCard, SkillCard, Timeline } from "../cards";

export function ServicesPage() {
  useReveal();
  return (
    <main className="page-anim">
      <PageIntro
        eyebrow="Services"
        title="Everything I'd take on."
        sub="Pick what you need — or send me your weird hybrid request and I'll figure it out."
      />
      <section className="section">
        <div className="shell">
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.id} s={s} delay={i * 0.05} />
            ))}
          </div>

          <div
            className="card reveal"
            style={{
              marginTop: "5rem",
              padding: "2.5rem",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "var(--accent-soft)",
                border: "1px solid var(--accent-line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)",
              }}
            >
              <Icon name="rocket" size={24} />
            </div>
            <div>
              <div className="h-3" style={{ marginBottom: "0.4rem" }}>
                Not sure what you need?
              </div>
              <p className="text-2" style={{ margin: 0, fontSize: "0.95rem" }}>
                Book a free 30-minute call and I&apos;ll help you scope it.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Book a call <Icon name="arrow-right" size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export function SkillsPage() {
  useReveal();
  const grouped = useMemo(() => {
    return SKILLS.reduce<Record<string, typeof SKILLS>>((acc, s) => {
      (acc[s.cat] ??= []).push(s);
      return acc;
    }, {});
  }, []);

  return (
    <main className="page-anim">
      <PageIntro
        eyebrow="Skills"
        title="The full toolbelt."
        sub="Day-to-day stack first, then the secondary tools. Levels are honest self-ratings."
      />
      <section className="section">
        <div className="shell">
          {Object.entries(grouped).map(([cat, list], gi) => (
            <div
              key={cat}
              className="reveal"
              style={{ marginBottom: "3rem", "--reveal-delay": `${gi * 0.04}s` } as CSSProperties}
            >
              <div className="row" style={{ gap: "1rem", marginBottom: "1.5rem" }}>
                <span className="eyebrow">{cat}</span>
                <span className="mono muted" style={{ fontSize: "0.78rem" }}>
                  {list.length} {list.length === 1 ? "skill" : "skills"}
                </span>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              </div>
              <div className="grid-2">
                {list.map((sk, i) => (
                  <SkillCard key={sk.name} sk={sk} delay={i * 0.03} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export function ExperiencePage() {
  useReveal();
  return (
    <main className="page-anim">
      <PageIntro
        eyebrow="Experience"
        title="Where I've worked."
        sub="A short, honest timeline. Each role earned a row."
      />
      <section className="section">
        <div className="shell">
          <Timeline items={EXPERIENCE} />
        </div>
      </section>
    </main>
  );
}

export function EducationPage() {
  useReveal();
  return (
    <main className="page-anim">
      <PageIntro
        eyebrow="Education"
        title="Studies & certificates."
        sub="Computer science diploma, science-track SSC, and a steady stream of self-paced courses."
      />
      <section className="section">
        <div className="shell">
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
              {EDUCATION.map((it, i) => (
                <div key={i} style={{ display: "flex", gap: "1.5rem" }}>
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
                    <Icon name="graduation" size={11} style={{ color: "var(--accent)" }} />
                  </div>
                  <div className="card" style={{ flex: 1, padding: "1.5rem" }}>
                    <div
                      className="row"
                      style={{
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginBottom: "0.4rem",
                      }}
                    >
                      <h3 className="h-3" style={{ margin: 0 }}>
                        {it.title}
                      </h3>
                      <span className="mono muted" style={{ fontSize: "0.78rem" }}>
                        {it.from} — {it.to}
                      </span>
                    </div>
                    <div
                      className="row"
                      style={{ gap: "1rem", marginBottom: "0.85rem", flexWrap: "wrap" }}
                    >
                      <span className="text-2" style={{ fontSize: "0.92rem" }}>
                        {it.org}
                      </span>
                      <span className="tag tag-accent mono">{it.grade}</span>
                    </div>
                    <p className="text-2" style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6 }}>
                      {it.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal" style={{ marginTop: "4rem" }}>
            <div className="row" style={{ marginBottom: "1.5rem", gap: "1rem" }}>
              <span className="eyebrow">Certificates</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>
            <div className="grid-3">
              {CERTIFICATES.map((c, i) => (
                <div key={i} className="card">
                  <Icon name="check" size={20} style={{ color: "var(--accent)", marginBottom: "1rem" }} />
                  <h3 className="h-3" style={{ marginBottom: "0.4rem", fontSize: "1.05rem" }}>
                    {c.title}
                  </h3>
                  <p className="muted mono" style={{ margin: 0, fontSize: "0.78rem" }}>
                    {c.org} · {c.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
