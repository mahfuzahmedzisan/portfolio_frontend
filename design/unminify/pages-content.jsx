// pages-content.jsx — About, Services, Skills, Experience, Education, Contact

const AboutPage = () => {
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
                                      style={{
                                          fontSize: "1.1rem",
                                          lineHeight: 1.75,
                                          color: "var(--text-2)",
                                          margin: 0,
                                      }}
                                  >
                                      {p}
                                  </p>
                              ))}
                              <p style={{ fontSize: "1.1rem", lineHeight: 1.75, color: "var(--text-2)", margin: 0 }}>
                                  When I'm not in a Laravel route file or a Next.js page, I'm reading about LLMs,
                                  sketching small experiments, or spending way too long on a ranked match. I try to
                                  learn one new thing every week and ship one small thing every month.
                              </p>
                          </div>

                          <div style={{ marginTop: "3rem" }}>
                              <div className="eyebrow" style={{ marginBottom: "1.25rem" }}>
                                  Currently
                              </div>
                              <div className="stack" style={{ gap: "1rem" }}>
                                  {[
                                      ["Working on", "Internal SaaS at Maktech + a few freelance projects"],
                                      ["Learning", "RSC patterns, pgvector, and a bit of Rust on the side"],
                                      ["Reading", "Designing Data-Intensive Applications by Martin Kleppmann"],
                                      ["Listening to", "Lo-fi while coding, deathcore at the gym (yes, both)"],
                                  ].map(([k, v]) => (
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

                      <aside className="reveal" style={{ "--reveal-delay": "0.1s" }}>
                          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                              <Placeholder label="Portrait — drop your photo" aspect="3/4" />
                              <div style={{ padding: "1.5rem" }}>
                                  <div style={{ marginBottom: "1.25rem" }}>
                                      <div className="eyebrow" style={{ marginBottom: "0.5rem" }}>
                                          Quick facts
                                      </div>
                                  </div>
                                  {[
                                      ["Name", PROFILE.name],
                                      ["Role", `${PROFILE.role} @ ${PROFILE.company}`],
                                      ["Based in", PROFILE.location],
                                      ["Email", PROFILE.email],
                                      ["Status", "Open to work"],
                                  ].map(([k, v]) => (
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
                                              <Icon name={s.label.toLowerCase()} size={14} />
                                          </a>
                                      ))}
                                      <a
                                          href="#/contact"
                                          className="btn btn-primary"
                                          style={{
                                              marginLeft: "auto",
                                              padding: "0.5rem 0.85rem",
                                              fontSize: "0.85rem",
                                          }}
                                      >
                                          Hire me <Icon name="arrow-right" size={13} />
                                      </a>
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
};

const ServicesPage = () => {
  useReveal();
  const services = useFakeFetch(SERVICES, 700);
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
                      {!services
                          ? [...Array(6)].map((_, i) => <SkeletonServiceCard key={i} />)
                          : services.map((s, i) => <ServiceCard key={s.id} s={s} delay={i * 0.05} />)}
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
                              Book a free 30-minute call and I'll help you scope it.
                          </p>
                      </div>
                      <a href="#/contact" className="btn btn-primary">
                          Book a call <Icon name="arrow-right" size={14} />
                      </a>
                  </div>
              </div>
          </section>
      </main>
  );
};

const SkillsPage = () => {
  useReveal();
  const skills = useFakeFetch(SKILLS, 700);
  const grouped = useMemo(() => {
      if (!skills) return null;
      return skills.reduce((acc, s) => {
          (acc[s.cat] ||= []).push(s);
          return acc;
      }, {});
  }, [skills]);
  return (
      <main className="page-anim">
          <PageIntro
              eyebrow="Skills"
              title="The full toolbelt."
              sub="Day-to-day stack first, then the secondary tools. Levels are honest self-ratings."
          />
          <section className="section">
              <div className="shell">
                  {!grouped ? (
                      <div className="grid-2">
                          {[...Array(8)].map((_, i) => (
                              <SkeletonSkillCard key={i} />
                          ))}
                      </div>
                  ) : (
                      Object.entries(grouped).map(([cat, list], gi) => (
                          <div
                              key={cat}
                              className="reveal"
                              style={{ marginBottom: "3rem", "--reveal-delay": `${gi * 0.04}s` }}
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
                      ))
                  )}
              </div>
          </section>
      </main>
  );
};

const ExperiencePage = () => {
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
};

const EducationPage = () => {
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
                                      <p
                                          className="text-2"
                                          style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6 }}
                                      >
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
                                  <Icon
                                      name="check"
                                      size={20}
                                      style={{ color: "var(--accent)", marginBottom: "1rem" }}
                                  />
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
};

const ContactPage = () => {
  useReveal();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const submit = (e) => {
      e.preventDefault();
      setSubmitting(true);
      setTimeout(() => {
          setSubmitting(false);
          setSent(true);
      }, 1200);
  };
  return (
      <main className="page-anim">
          <PageIntro
              eyebrow="Contact"
              title="Let's talk."
              sub="Fill out the form, drop me an email, or grab a slot on my calendar. I reply within 24 hours."
          />
          <section className="section">
              <div className="shell">
                  <div
                      style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "3rem" }}
                      className="contact-grid"
                  >
                      <form className="card reveal" onSubmit={submit} style={{ padding: "2rem" }}>
                          <div className="grid-2" style={{ gap: "1.25rem" }}>
                              <div>
                                  <label className="label">Name</label>
                                  <input
                                      className="input"
                                      required
                                      value={form.name}
                                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                                      placeholder="Jane Doe"
                                  />
                              </div>
                              <div>
                                  <label className="label">Email</label>
                                  <input
                                      className="input"
                                      type="email"
                                      required
                                      value={form.email}
                                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                                      placeholder="you@company.com"
                                  />
                              </div>
                              <div>
                                  <label className="label">Phone (optional)</label>
                                  <input
                                      className="input"
                                      value={form.phone}
                                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                      placeholder="+880 1XXX-XXXXXX"
                                  />
                              </div>
                              <div>
                                  <label className="label">Subject</label>
                                  <input
                                      className="input"
                                      required
                                      value={form.subject}
                                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                      placeholder="Project, role, or hello"
                                  />
                              </div>
                          </div>
                          <div style={{ marginTop: "1.25rem" }}>
                              <label className="label">Message</label>
                              <textarea
                                  className="textarea"
                                  required
                                  value={form.message}
                                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                                  placeholder="Tell me about your project, timeline, and what you're trying to solve."
                              />
                          </div>
                          <div
                              className="row"
                              style={{
                                  justifyContent: "space-between",
                                  marginTop: "1.5rem",
                                  flexWrap: "wrap",
                                  gap: "1rem",
                              }}
                          >
                              <span className="muted mono" style={{ fontSize: "0.78rem" }}>
                                  By sending, you agree to my privacy policy.
                              </span>
                              <button className="btn btn-primary" disabled={submitting || sent} type="submit">
                                  {sent ? (
                                      <>
                                          <Icon name="check" size={14} /> Sent — talk soon
                                      </>
                                  ) : submitting ? (
                                      <>
                                          <span
                                              className="skeleton"
                                              style={{ width: 12, height: 12, borderRadius: "50%" }}
                                          />{" "}
                                          Sending…
                                      </>
                                  ) : (
                                      <>
                                          Send message <Icon name="send" size={14} />
                                      </>
                                  )}
                              </button>
                          </div>
                      </form>

                      <aside className="reveal" style={{ "--reveal-delay": "0.1s" }}>
                          <div className="card" style={{ padding: "2rem", marginBottom: "1.25rem" }}>
                              <div className="eyebrow" style={{ marginBottom: "1.25rem" }}>
                                  Direct lines
                              </div>
                              <div className="stack" style={{ gap: "1rem" }}>
                                  {[
                                      ["mail", "Email", PROFILE.email, `mailto:${PROFILE.email}`],
                                      ["phone", "Phone", PROFILE.phone, `tel:${PROFILE.phone}`],
                                      ["map-pin", "Location", PROFILE.location, "#"],
                                  ].map(([icon, k, v, href]) => (
                                      <a
                                          key={k}
                                          href={href}
                                          className="row"
                                          style={{ gap: "1rem", textDecoration: "none" }}
                                      >
                                          <div
                                              style={{
                                                  width: 38,
                                                  height: 38,
                                                  borderRadius: 10,
                                                  flexShrink: 0,
                                                  background: "var(--accent-soft)",
                                                  border: "1px solid var(--accent-line)",
                                                  color: "var(--accent)",
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                              }}
                                          >
                                              <Icon name={icon} size={15} />
                                          </div>
                                          <div>
                                              <div
                                                  className="muted mono"
                                                  style={{
                                                      fontSize: "0.7rem",
                                                      textTransform: "uppercase",
                                                      letterSpacing: "0.12em",
                                                      marginBottom: "0.2rem",
                                                  }}
                                              >
                                                  {k}
                                              </div>
                                              <div style={{ color: "var(--text)" }}>{v}</div>
                                          </div>
                                      </a>
                                  ))}
                              </div>
                          </div>

                          <div className="card" style={{ padding: "2rem" }}>
                              <div className="eyebrow" style={{ marginBottom: "1.25rem" }}>
                                  Follow / connect
                              </div>
                              <div className="stack" style={{ gap: "0.5rem" }}>
                                  {PROFILE.socials.map((s) => (
                                      <a
                                          key={s.label}
                                          href={s.href}
                                          className="row"
                                          style={{
                                              justifyContent: "space-between",
                                              padding: "0.85rem 1rem",
                                              borderRadius: 10,
                                              border: "1px solid var(--border)",
                                          }}
                                      >
                                          <span className="row" style={{ gap: "0.75rem" }}>
                                              <Icon name={s.label.toLowerCase()} size={14} />
                                              {s.label}
                                          </span>
                                          <span className="mono muted" style={{ fontSize: "0.8rem" }}>
                                              {s.handle} <Icon name="arrow-up-right" size={12} />
                                          </span>
                                      </a>
                                  ))}
                              </div>
                          </div>
                      </aside>
                  </div>
              </div>
              <style>{`@media (max-width: 880px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
          </section>
      </main>
  );
};

Object.assign(window, { AboutPage, ServicesPage, SkillsPage, ExperiencePage, EducationPage, ContactPage });
