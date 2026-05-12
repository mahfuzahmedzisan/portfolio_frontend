"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { PROFILE } from "@/lib/content/site";
import { Icon } from "../icon";
import { PageIntro } from "../primitives";
import { useReveal } from "../use-reveal";

function socialIcon(label: string): "github" | "facebook" | "twitter" | "linkedin" | "youtube" {
  const l = label.toLowerCase();
  if (l === "github") return "github";
  if (l === "facebook") return "facebook";
  if (l === "twitter") return "twitter";
  if (l === "linkedin") return "linkedin";
  return "youtube";
}

export function ContactPage() {
  useReveal();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
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

            <aside className="reveal" style={{ "--reveal-delay": "0.1s" } as CSSProperties}>
              <div className="card" style={{ padding: "2rem", marginBottom: "1.25rem" }}>
                <div className="eyebrow" style={{ marginBottom: "1.25rem" }}>
                  Direct lines
                </div>
                <div className="stack" style={{ gap: "1rem" }}>
                  {(
                    [
                      ["mail", "Email", PROFILE.email, `mailto:${PROFILE.email}`],
                      ["phone", "Phone", PROFILE.phone, `tel:${PROFILE.phone.replace(/\s/g, "")}`],
                      ["map-pin", "Location", PROFILE.location, "#"],
                    ] as const
                  ).map(([icon, k, v, href]) => (
                    <a key={k} href={href} className="row" style={{ gap: "1rem", textDecoration: "none" }}>
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
                        <Icon name={socialIcon(s.label)} size={14} />
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
        <style>{`
          @media (max-width: 880px) { .contact-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </main>
  );
}
