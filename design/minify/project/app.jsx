// app.jsx — Layout (Header, Footer), Router, Tweaks integration

const { useState, useEffect, useRef, useMemo } = React;

// ── Density presets ───────────────────────────────────────────────────────
const DENSITY = {
  compact:     { sectionY: "5rem",  gap: "1rem",   cardR: "12px", btnR: "10px" },
  comfortable: { sectionY: "7rem",  gap: "1.25rem", cardR: "14px", btnR: "999px" },
  spacious:    { sectionY: "9rem",  gap: "1.5rem", cardR: "18px", btnR: "999px" },
};

const ACCENT_HUES = {
  Magenta:  305,
  Indigo:   270,
  Cyan:     220,
  Mint:     165,
  Amber:     65,
  Coral:     25,
};

const FONT_PAIRS = {
  "Geist + Geist Mono":          { display: "Geist", body: "Geist", mono: "Geist Mono" },
  "Space Grotesk + JetBrains":   { display: "Space Grotesk", body: "Space Grotesk", mono: "JetBrains Mono" },
  "Bricolage + IBM Plex":        { display: "Bricolage Grotesque", body: "IBM Plex Sans", mono: "IBM Plex Mono" },
  "Instrument Serif + Geist":    { display: "Instrument Serif", body: "Geist", mono: "Geist Mono" },
};

const HERO_LAYOUTS = ["split", "centered", "stacked"];

// ── Header ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { href: "#/",           label: "Home" },
  { href: "#/about",      label: "About" },
  { href: "#/projects",   label: "Projects" },
  { href: "#/services",   label: "Services" },
  { href: "#/blog",       label: "Blog" },
  { href: "#/contact",    label: "Contact" },
];

const Header = ({ route }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [route.path]);

  const cycleTheme = () => {
    const cur = (() => { try { return localStorage.getItem("theme-mode") || "system"; } catch { return "system"; } })();
    const next = cur === "system" ? "light" : cur === "light" ? "dark" : "system";
    try { localStorage.setItem("theme-mode", next); } catch {}
    applyTheme(next);
  };

  const isActive = (href) => {
    const path = href.replace("#", "") || "/";
    if (path === "/") return route.path === "/";
    return route.path.startsWith(path);
  };

  return (
    <div className="nav-wrap" style={{ top: scrolled ? "0.5rem" : "1rem" }}>
      <nav className="nav shell" style={{ padding: scrolled ? "0.55rem 0.85rem 0.55rem 1.25rem" : "0.7rem 0.85rem 0.7rem 1.25rem", transition: "padding 0.3s var(--ease-out)" }}>
        <a href="#/" aria-label="Home"><Logo /></a>
        <ul className="nav-links">
          {NAV_ITEMS.map((n) => (
            <li key={n.href}>
              <a href={n.href} className={`nav-link ${isActive(n.href) ? "active" : ""}`}>{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="btn-icon" onClick={cycleTheme} aria-label="Toggle theme">
            <Icon name="sun" size={15} />
          </button>
          <a href="#/admin/login" className="btn-icon" aria-label="Admin">
            <Icon name="lock" size={14} />
          </a>
          <a href="#/contact" className="btn btn-primary nav-cta" style={{ padding: "0.55rem 1rem", fontSize: "0.85rem" }}>
            Hire me <Icon name="arrow-right" size={12} />
          </a>
          <button className="btn-icon nav-mobile-toggle" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <Icon name={open ? "x" : "menu"} size={15} />
          </button>
        </div>
      </nav>
      <div className={`nav-mobile-panel ${open ? "open" : ""}`}>
        {NAV_ITEMS.map((n) => (
          <a key={n.href} href={n.href} className={isActive(n.href) ? "active" : ""}>{n.label}</a>
        ))}
        <div className="divider" style={{ margin: "0.5rem 0" }} />
        <a href="#/admin/login">Admin</a>
      </div>
      <style>{`
        .nav-cta { display: inline-flex; }
        @media (max-width: 720px) { .nav-cta { display: none; } }
      `}</style>
    </div>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="footer">
    <div className="shell">
      <div className="footer-grid">
        <div className="footer-col">
          <Logo size="1.15rem" />
          <p className="text-2" style={{ margin: "1rem 0 1.5rem", fontSize: "0.92rem", lineHeight: 1.65, maxWidth: 320 }}>
            {PROFILE.tagline}
          </p>
          <div className="row" style={{ gap: "0.5rem" }}>
            {PROFILE.socials.slice(0, 4).map((s) => (
              <a key={s.label} href={s.href} className="btn-icon" aria-label={s.label} target="_blank" rel="noreferrer">
                <Icon name={s.label.toLowerCase()} size={14} />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h5>Sitemap</h5>
          <ul>
            <li><a href="#/">Home</a></li>
            <li><a href="#/about">About</a></li>
            <li><a href="#/projects">Projects</a></li>
            <li><a href="#/services">Services</a></li>
            <li><a href="#/blog">Blog</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Resources</h5>
          <ul>
            <li><a href="#/skills">Skills</a></li>
            <li><a href="#/experience">Experience</a></li>
            <li><a href="#/education">Education</a></li>
            <li><a href="#/contact">Contact</a></li>
            <li><a href="#/admin/login">Admin</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Get in touch</h5>
          <ul>
            <li><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
            <li><a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>{PROFILE.phone}</a></li>
            <li className="muted mono" style={{ fontSize: "0.8rem" }}>{PROFILE.location}</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom row" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <span className="muted mono" style={{ fontSize: "0.78rem" }}>© 2026 Mahfuz Ahmed Zisan. All rights reserved.</span>
        <span className="muted mono" style={{ fontSize: "0.78rem" }}>
          <span style={{ color: "oklch(0.7 0.18 145)" }}>●</span> All systems operational · v1.0.0
        </span>
      </div>
    </div>
  </footer>
);

// ── Tweaks Panel ──────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "system",
  "accent": "Magenta",
  "motion": "grid-streaks",
  "fontPair": "Geist + Geist Mono",
  "density": "comfortable",
  "heroLayout": "split"
}/*EDITMODE-END*/;

const PortfolioTweaks = ({ onChange }) => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => { onChange?.(t); }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme">
        <TweakRadio label="Mode" value={t.theme}
          options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }, { value: "system", label: "System" }]}
          onChange={(v) => setTweak("theme", v)} />
        <TweakColor label="Accent" value={t.accent}
          options={Object.keys(ACCENT_HUES)}
          onChange={(v) => setTweak("accent", v)} />
      </TweakSection>

      <TweakSection label="Motion">
        <TweakSelect label="Background" value={t.motion}
          options={[
            { value: "grid-streaks", label: "Grid + light streaks" },
            { value: "particles",    label: "Particles" },
            { value: "blobs",        label: "Glowing blobs" },
            { value: "static",       label: "Static" },
          ]}
          onChange={(v) => setTweak("motion", v)} />
        <TweakRadio label="Hero layout" value={t.heroLayout}
          options={[{ value: "split", label: "Split" }, { value: "centered", label: "Center" }, { value: "stacked", label: "Stack" }]}
          onChange={(v) => setTweak("heroLayout", v)} />
      </TweakSection>

      <TweakSection label="Type & spacing">
        <TweakSelect label="Font pair" value={t.fontPair}
          options={Object.keys(FONT_PAIRS).map((k) => ({ value: k, label: k }))}
          onChange={(v) => setTweak("fontPair", v)} />
        <TweakRadio label="Density" value={t.density}
          options={[{ value: "compact", label: "Compact" }, { value: "comfortable", label: "Comfy" }, { value: "spacious", label: "Roomy" }]}
          onChange={(v) => setTweak("density", v)} />
      </TweakSection>
    </TweaksPanel>
  );
};

// Override the accent swatches: default circle is fine, but show a colored chip
const ACCENT_SWATCH_STYLES = `
.twk-color-opts [data-value="Magenta"] .twk-swatch{background:oklch(0.72 0.18 305) !important}
.twk-color-opts [data-value="Indigo"]  .twk-swatch{background:oklch(0.72 0.18 270) !important}
.twk-color-opts [data-value="Cyan"]    .twk-swatch{background:oklch(0.72 0.16 220) !important}
.twk-color-opts [data-value="Mint"]    .twk-swatch{background:oklch(0.72 0.16 165) !important}
.twk-color-opts [data-value="Amber"]   .twk-swatch{background:oklch(0.78 0.16 65)  !important}
.twk-color-opts [data-value="Coral"]   .twk-swatch{background:oklch(0.7  0.18 25)  !important}
`;

// Apply tweak values to CSS variables / state
function applyTweaks(t) {
  const root = document.documentElement;

  // Accent
  const hue = ACCENT_HUES[t.accent] ?? 305;
  root.style.setProperty("--accent-h", hue);
  root.style.setProperty("--accent",       `oklch(0.72 0.18 ${hue})`);
  root.style.setProperty("--accent-fg",    `oklch(0.12 0.04 ${hue})`);
  root.style.setProperty("--accent-soft",  `oklch(0.72 0.18 ${hue} / 0.12)`);
  root.style.setProperty("--accent-line",  `oklch(0.72 0.18 ${hue} / 0.4)`);
  root.style.setProperty("--accent-glow",  `oklch(0.72 0.18 ${hue} / 0.4)`);

  // Theme
  applyTheme(t.theme);
  try { localStorage.setItem("theme-mode", t.theme); } catch {}

  // Density
  const d = DENSITY[t.density] || DENSITY.comfortable;
  root.style.setProperty("--section-y", d.sectionY);
  root.style.setProperty("--gap",       d.gap);
  root.style.setProperty("--radius",    d.cardR);
  root.style.setProperty("--btn-r",     d.btnR);

  // Fonts
  const f = FONT_PAIRS[t.fontPair] || FONT_PAIRS["Geist + Geist Mono"];
  root.style.setProperty("--font-display", `"${f.display}", system-ui, sans-serif`);
  root.style.setProperty("--font-body",    `"${f.body}", system-ui, sans-serif`);
  root.style.setProperty("--font-mono",    `"${f.mono}", ui-monospace, monospace`);
}

// ── Layout ────────────────────────────────────────────────────────────────
const Layout = ({ route, motion, heroLayout }) => {
  const isAdminDashboard = route.path.startsWith("/admin") && route.path !== "/admin/login";
  const showChrome = !route.path.startsWith("/admin");

  return (
    <>
      <Background motion={motion} />
      {showChrome && <Header route={route} />}
      <Router route={route} heroLayout={heroLayout} />
      {showChrome && <Footer />}
    </>
  );
};

// ── Router ────────────────────────────────────────────────────────────────
const Router = ({ route, heroLayout }) => {
  const { path, parts } = route;
  const key = path; // re-mount on route change to retrigger page-anim

  if (path === "/")                return <HomePage key={key} heroLayout={heroLayout} />;
  if (path === "/about")           return <AboutPage key={key} />;
  if (path === "/services")        return <ServicesPage key={key} />;
  if (path === "/skills")          return <SkillsPage key={key} />;
  if (path === "/experience")      return <ExperiencePage key={key} />;
  if (path === "/education")       return <EducationPage key={key} />;
  if (path === "/projects")        return <ProjectsPage key={key} />;
  if (parts[0] === "projects" && parts[1]) return <ProjectDetailPage key={key} slug={parts[1]} />;
  if (path === "/blog")            return <BlogsPage key={key} />;
  if (parts[0] === "blog" && parts[1])     return <BlogDetailPage key={key} slug={parts[1]} />;
  if (path === "/contact")         return <ContactPage key={key} />;
  if (path === "/admin/login")     return <AdminLoginPage key={key} />;
  if (parts[0] === "admin")        return <AdminDashboardPage key={key} />;

  return (
    <main className="shell page-anim" style={{ padding: "9rem 0 6rem", textAlign: "center" }}>
      <div className="eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>404</div>
      <h1 className="h-display" style={{ margin: "1rem 0", fontSize: "clamp(3rem, 8vw, 7rem)" }}>Lost in the grid.</h1>
      <p className="text-2" style={{ maxWidth: 480, margin: "0 auto 2rem" }}>That route doesn't exist (yet). Let's get you home.</p>
      <a href="#/" className="btn btn-primary">← Back home</a>
    </main>
  );
};

// ── App ───────────────────────────────────────────────────────────────────
const App = () => {
  const route = useHashRoute();
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);

  // Apply tweaks reactively
  useEffect(() => { applyTweaks(tweaks); }, [tweaks]);

  // Restore theme on first load (before tweaks panel mounts)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme-mode");
      if (saved) applyTheme(saved);
      else applyTheme("system");
    } catch { applyTheme("system"); }
  }, []);

  // Listen for system theme changes when in "system" mode
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      try {
        const cur = localStorage.getItem("theme-mode") || "system";
        if (cur === "system") applyTheme("system");
      } catch {}
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <style>{BG_STYLE}</style>
      <style>{ACCENT_SWATCH_STYLES}</style>
      <Layout route={route} motion={tweaks.motion} heroLayout={tweaks.heroLayout} />
      <PortfolioTweaks onChange={setTweaks} />
    </>
  );
};

// ── Mount ─────────────────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
