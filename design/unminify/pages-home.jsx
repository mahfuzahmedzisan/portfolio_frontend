// pages-home.jsx — Home page

const HeroAvatar = () => (
  <div
      style={{
          width: 92,
          height: 92,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--accent-soft), oklch(0.4 0.15 calc(var(--accent-h) + 30) / 0.2))",
          border: "1px solid var(--accent-line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "1.8rem",
          letterSpacing: "-0.04em",
          color: "var(--text)",
          boxShadow: "0 0 0 6px var(--bg), 0 0 0 7px var(--border), 0 8px 32px var(--accent-glow)",
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

const HomePage = () => {
  useReveal();
  const projects = useFakeFetch(PROJECTS, 700, []);
  const blogs = useFakeFetch(BLOGS, 800, []);
  const services = useFakeFetch(SERVICES, 600, []);

  return (
      <main className="page-anim">
          {/* HERO */}
          <section className="section" style={{ paddingTop: "9rem", position: "relative" }}>
              <div className="shell" style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "2rem" }}>
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

                      <div className="reveal" style={{ "--reveal-delay": "0.05s" }}>
                          <div className="row" style={{ gap: "1.25rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                              <HeroAvatar />
                              <div>
                                  <div className="mono muted" style={{ fontSize: "0.85rem", marginBottom: "0.4rem" }}>
                                      // Hi, I'm
                                  </div>
                                  <div className="h-display text-grad">{PROFILE.name}.</div>
                              </div>
                          </div>
                          <p className="h-2 text-2" style={{ maxWidth: 760, fontWeight: 400, marginTop: "1.5rem" }}>
                              <span className="accent-grad">{PROFILE.role}</span> at {PROFILE.company}, building{" "}
                              <span style={{ color: "var(--text)" }}>modern web apps</span> with Laravel, React, and
                              Next.js.
                          </p>
                      </div>

                      <div
                          className="row-wrap reveal"
                          style={{ gap: "0.75rem", marginTop: "0.5rem", "--reveal-delay": "0.15s" }}
                      >
                          <a className="btn btn-primary" href="#/projects">
                              See selected work <Icon name="arrow-right" size={16} />
                          </a>
                          <a className="btn btn-ghost" href="#/contact">
                              Get in touch
                          </a>
                          <div style={{ display: "flex", gap: "0.5rem", marginLeft: "auto" }}>
                              <a className="btn-icon" href={PROFILE.socials[0].href} aria-label="GitHub">
                                  <Icon name="github" size={16} />
                              </a>
                              <a className="btn-icon" href={PROFILE.socials[1].href} aria-label="Facebook">
                                  <Icon name="facebook" size={16} />
                              </a>
                              <a className="btn-icon" href="mailto:hello@mahfuz.dev" aria-label="Email">
                                  <Icon name="mail" size={16} />
                              </a>
                          </div>
                      </div>

                      {/* Stats */}
                      <div className="reveal" style={{ marginTop: "5rem", "--reveal-delay": "0.25s" }}>
                          <div
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
                              className="stats-row"
                          >
                              {PROFILE.stats.map((s, i) => (
                                  <div
                                      key={i}
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

          {/* MARQUEE / TECH STRIP */}
          <section
              className="section-tight"
              style={{ borderBlock: "1px solid var(--border)", overflow: "hidden", padding: "1.5rem 0" }}
          >
              <div className="marquee">
                  <div className="marquee-track">
                      {[...Array(2)].map((_, k) => (
                          <div
                              key={k}
                              style={{ display: "flex", gap: "3.5rem", paddingRight: "3.5rem", alignItems: "center" }}
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
                                      key={t}
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

          {/* ABOUT PREVIEW */}
          <section className="section" id="about-preview">
              <div className="shell">
                  <SectionHead
                      eyebrow="01 / About"
                      title="A pragmatic developer who actually ships."
                      sub="Software developer at Maktech, polytechnic CS grad, freelance veteran. I care about clean code, sharp interfaces, and projects that work."
                      action={
                          <a className="btn btn-ghost" href="#/about">
                              Read full bio <Icon name="arrow-right" size={14} />
                          </a>
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
                              What I'm into
                          </div>
                          <p className="text-2" style={{ lineHeight: 1.7, fontSize: "1.05rem", margin: 0 }}>
                              {PROFILE.about[1]}
                          </p>
                      </div>
                  </div>
              </div>
          </section>

          {/* SERVICES PREVIEW */}
          <section className="section" id="services-preview" style={{ position: "relative" }}>
              <div className="spotlight" />
              <div className="shell" style={{ position: "relative", zIndex: 1 }}>
                  <SectionHead
                      eyebrow="02 / Services"
                      title="What I can build for you."
                      sub="From a one-page launch site to a multi-tenant SaaS, I handle the design, the code, and the deploy."
                      action={
                          <a className="btn btn-ghost" href="#/services">
                              All services <Icon name="arrow-right" size={14} />
                          </a>
                      }
                  />
                  <div className="grid-3">
                      {!services
                          ? [...Array(3)].map((_, i) => <SkeletonServiceCard key={i} />)
                          : services.slice(0, 3).map((s, i) => <ServiceCard key={s.id} s={s} delay={i * 0.05} />)}
                  </div>
              </div>
          </section>

          {/* SKILLS PREVIEW */}
          <section className="section" id="skills-preview">
              <div className="shell">
                  <SectionHead
                      eyebrow="03 / Skills"
                      title="The toolbelt."
                      sub="Day-to-day stack on the left, picked up on the right. I'd rather go deep on a few things than be shallow on many."
                      action={
                          <a className="btn btn-ghost" href="#/skills">
                              Full skill matrix <Icon name="arrow-right" size={14} />
                          </a>
                      }
                  />
                  <div className="grid-2 reveal">
                      {SKILLS.slice(0, 8).map((sk, i) => (
                          <SkillCard key={sk.name} sk={sk} delay={i * 0.04} />
                      ))}
                  </div>
              </div>
          </section>

          {/* FEATURED PROJECTS */}
          <section className="section" id="projects-preview" style={{ position: "relative" }}>
              <div className="spotlight" />
              <div className="shell" style={{ position: "relative", zIndex: 1 }}>
                  <SectionHead
                      eyebrow="04 / Selected work"
                      title="Things I've shipped recently."
                      sub="A handful of recent projects. The full archive lives on the projects page."
                      action={
                          <a className="btn btn-ghost" href="#/projects">
                              All projects <Icon name="arrow-right" size={14} />
                          </a>
                      }
                  />
                  <div className="grid-3">
                      {!projects
                          ? [...Array(3)].map((_, i) => <SkeletonProjectCard key={i} />)
                          : projects
                                .filter((p) => p.featured)
                                .slice(0, 3)
                                .map((p, i) => <ProjectCard key={p.slug} p={p} delay={i * 0.06} />)}
                  </div>
              </div>
          </section>

          {/* EXPERIENCE PREVIEW */}
          <section className="section" id="experience-preview">
              <div className="shell">
                  <SectionHead
                      eyebrow="05 / Experience"
                      title="Where I've worked."
                      sub="A short timeline. Each role taught me something I still use."
                      action={
                          <a className="btn btn-ghost" href="#/experience">
                              Full timeline <Icon name="arrow-right" size={14} />
                          </a>
                      }
                  />
                  <Timeline items={EXPERIENCE} />
              </div>
          </section>

          {/* BLOG PREVIEW */}
          <section className="section" id="blog-preview">
              <div className="shell">
                  <SectionHead
                      eyebrow="06 / Writing"
                      title="Latest from the blog."
                      sub="Notes on Laravel, Next.js, devops, and the occasional career rant."
                      action={
                          <a className="btn btn-ghost" href="#/blogs">
                              Read the blog <Icon name="arrow-right" size={14} />
                          </a>
                      }
                  />
                  <div className="grid-3">
                      {!blogs
                          ? [...Array(3)].map((_, i) => <SkeletonBlogCard key={i} />)
                          : blogs.slice(0, 3).map((b, i) => <BlogCard key={b.slug} b={b} delay={i * 0.06} />)}
                  </div>
              </div>
          </section>

          {/* CONTACT CTA */}
          <section className="section">
              <div className="shell">
                  <div
                      className="card reveal"
                      style={{
                          padding: "clamp(2rem, 5vw, 4.5rem)",
                          background: "linear-gradient(135deg, var(--accent-soft), transparent 60%), var(--card)",
                          border: "1px solid var(--accent-line)",
                          position: "relative",
                          overflow: "hidden",
                          textAlign: "center",
                      }}
                  >
                      <span className="eyebrow" style={{ marginBottom: "1.5rem" }}>
                          Let's build something
                      </span>
                      <h2 className="h-1 text-grad" style={{ margin: "0.5rem auto 1rem", maxWidth: 720 }}>
                          Have a project in mind? <br />
                          I'd love to hear about it.
                      </h2>
                      <p
                          className="text-2"
                          style={{ maxWidth: 540, margin: "0 auto 2rem", fontSize: "1.05rem", lineHeight: 1.6 }}
                      >
                          Drop me a message and I'll get back within 24 hours. Full-time roles, freelance gigs, and
                          weird side-quests all welcome.
                      </p>
                      <div className="row-wrap" style={{ justifyContent: "center" }}>
                          <a className="btn btn-primary" href="#/contact">
                              Start a conversation <Icon name="arrow-right" size={16} />
                          </a>
                          <a className="btn btn-ghost" href="mailto:hello@mahfuz.dev">
                              <Icon name="mail" size={14} /> {PROFILE.email}
                          </a>
                      </div>
                  </div>
              </div>
          </section>
      </main>
  );
};

// ─── Re-usable cards ────────────────────────────────────────────────────
const ServiceCard = ({ s, delay = 0 }) => (
  <div className="card card-hover reveal" style={{ "--reveal-delay": `${delay}s` }}>
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
      <p className="text-2" style={{ margin: "0 0 1.25rem", lineHeight: 1.6, fontSize: "0.95rem" }}>
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
                  <Icon name="check" size={12} style={{ color: "var(--accent)", flexShrink: 0 }} /> {b}
              </li>
          ))}
      </ul>
  </div>
);

const SkillCard = ({ sk, delay = 0 }) => (
  <div className="card reveal" style={{ padding: "1.15rem 1.35rem", "--reveal-delay": `${delay}s` }}>
      <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.7rem" }}
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
                  background: "linear-gradient(90deg, var(--accent), oklch(0.7 0.18 calc(var(--accent-h) + 40)))",
                  borderRadius: 999,
                  boxShadow: "0 0 12px var(--accent-glow)",
                  transition: "width 1.2s var(--ease-out)",
              }}
          />
      </div>
  </div>
);

const ProjectCard = ({ p, delay = 0 }) => (
  <a
      href={`#/projects/${p.slug}`}
      className="card card-hover reveal"
      style={{ padding: 0, display: "block", "--reveal-delay": `${delay}s` }}
  >
      <CardShine />
      <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius) var(--radius) 0 0" }}>
          <Placeholder label={`${p.title} — preview`} aspect="16/10" />
          <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: "0.4rem" }}>
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
              {p.featured && (
                  <span className="tag tag-accent" style={{ backdropFilter: "blur(8px)" }}>
                      ★ Featured
                  </span>
              )}
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
          <p className="text-2" style={{ margin: "0 0 1rem", fontSize: "0.92rem", lineHeight: 1.55 }}>
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
  </a>
);

const BlogCard = ({ b, delay = 0 }) => (
  <a
      href={`#/blogs/${b.slug}`}
      className="card card-hover reveal"
      style={{ padding: 0, display: "block", "--reveal-delay": `${delay}s` }}
  >
      <CardShine />
      <Placeholder label={b.cat} aspect="16/9" />
      <div style={{ padding: "1.4rem" }}>
          <div className="row" style={{ gap: "0.75rem", fontSize: "0.78rem", marginBottom: "0.75rem" }}>
              <span className="mono muted" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Icon name="calendar" size={11} /> {b.date}
              </span>
              <span className="mono muted" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Icon name="clock" size={11} /> {b.read}
              </span>
          </div>
          <h3 className="h-3" style={{ marginBottom: "0.65rem", lineHeight: 1.3 }}>
              {b.title}
          </h3>
          <p className="text-2" style={{ margin: "0 0 1rem", fontSize: "0.92rem", lineHeight: 1.55 }}>
              {b.excerpt}
          </p>
          <span
              className="mono accent"
              style={{ fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
              Read article <Icon name="arrow-right" size={12} />
          </span>
      </div>
  </a>
);

const Timeline = ({ items }) => (
  <div className="reveal" style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: 12, top: 12, bottom: 12, width: 1, background: "var(--border)" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {items.map((it, i) => (
              <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
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
                      <p className="text-2" style={{ margin: "0 0 1rem", fontSize: "0.92rem", lineHeight: 1.6 }}>
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

Object.assign(window, { HomePage, ServiceCard, SkillCard, ProjectCard, BlogCard, Timeline, HeroAvatar });
