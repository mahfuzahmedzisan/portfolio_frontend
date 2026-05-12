import Link from "next/link";
import { PROFILE } from "@/lib/content/site";
import { Icon } from "./icon";
import { Logo } from "./logo";

function iconFor(label: string): "github" | "facebook" | "twitter" | "linkedin" | "youtube" {
  const l = label.toLowerCase();
  if (l === "github") return "github";
  if (l === "facebook") return "facebook";
  if (l === "twitter") return "twitter";
  if (l === "linkedin") return "linkedin";
  return "youtube";
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-col">
            <Logo size="1.15rem" />
            <p
              className="text-2"
              style={{
                margin: "1rem 0 1.5rem",
                fontSize: "0.92rem",
                lineHeight: 1.65,
                maxWidth: 320,
              }}
            >
              {PROFILE.tagline}
            </p>
            <div className="row" style={{ gap: "0.5rem" }}>
              {PROFILE.socials.slice(0, 4).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="btn-icon"
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name={iconFor(s.label)} size={14} />
                </a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h5>Sitemap</h5>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Resources</h5>
            <ul>
              <li>
                <Link href="/skills">Skills</Link>
              </li>
              <li>
                <Link href="/experience">Experience</Link>
              </li>
              <li>
                <Link href="/education">Education</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/admin/login">Admin</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Get in touch</h5>
            <ul>
              <li>
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </li>
              <li>
                <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>
                  {PROFILE.phone}
                </a>
              </li>
              <li className="muted mono" style={{ fontSize: "0.8rem" }}>
                {PROFILE.location}
              </li>
            </ul>
          </div>
        </div>
        <div
          className="footer-bottom row"
          style={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span className="muted mono" style={{ fontSize: "0.78rem" }}>
            © 2026 Mahfuz Ahmed Zisan. All rights reserved.
          </span>
          <span className="muted mono" style={{ fontSize: "0.78rem" }}>
            <span style={{ color: "oklch(0.7 0.18 145)" }}>●</span> All systems
            operational · v1.0.0
          </span>
        </div>
      </div>
    </footer>
  );
}
