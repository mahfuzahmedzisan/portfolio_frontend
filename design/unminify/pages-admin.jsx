// pages-admin.jsx — Admin login + dashboard

const ADMIN_KEY = "maz_admin_session";

const useAdminSession = () => {
    const [authed, setAuthed] = useState(() => {
        try {
            return localStorage.getItem(ADMIN_KEY) === "1";
        } catch (e) {
            return false;
        }
    });
    useEffect(() => {
        try {
            authed ? localStorage.setItem(ADMIN_KEY, "1") : localStorage.removeItem(ADMIN_KEY);
        } catch (e) {}
    }, [authed]);
    return [authed, setAuthed];
};

const AdminLoginPage = () => {
    const [authed, setAuthed] = useAdminSession();
    const [email, setEmail] = useState("admin@maz.dev");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        if (authed) navigate("/admin");
    }, [authed]);

    const submit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErr("");
        setTimeout(() => {
            if (password.length >= 4) {
                setAuthed(true);
                navigate("/admin");
            } else {
                setErr("Invalid credentials. Hint: any password with 4+ characters works in this prototype.");
                setSubmitting(false);
            }
        }, 900);
    };

    return (
        <main
            className="page-anim"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "6rem 1.5rem 4rem",
            }}
        >
            <div className="card" style={{ width: "100%", maxWidth: 440, padding: "2.5rem", position: "relative" }}>
                <div className="row" style={{ justifyContent: "space-between", marginBottom: "2rem" }}>
                    <Logo />
                    <span className="tag mono" style={{ fontSize: "0.7rem" }}>
                        <Icon name="lock" size={11} /> Admin
                    </span>
                </div>
                <h1 className="h-2" style={{ marginBottom: "0.5rem" }}>
                    Welcome back.
                </h1>
                <p className="text-2" style={{ margin: "0 0 2rem", fontSize: "0.95rem" }}>
                    Sign in to manage your portfolio content.
                </p>

                <form onSubmit={submit} className="stack" style={{ gap: "1.25rem" }}>
                    <div>
                        <label className="label">Email</label>
                        <input
                            className="input"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">Password</label>
                        <div style={{ position: "relative" }}>
                            <input
                                className="input"
                                type={showPw ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                autoFocus
                                style={{ paddingRight: "2.75rem" }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw((s) => !s)}
                                style={{
                                    position: "absolute",
                                    right: 8,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "transparent",
                                    border: 0,
                                    color: "var(--muted)",
                                    padding: 8,
                                }}
                                aria-label="Toggle password"
                            >
                                <Icon name={showPw ? "eye-off" : "eye"} size={15} />
                            </button>
                        </div>
                    </div>
                    {err && (
                        <div
                            className="tag"
                            style={{
                                background: "oklch(0.5 0.15 25 / 0.15)",
                                borderColor: "oklch(0.55 0.15 25 / 0.4)",
                                color: "oklch(0.75 0.15 25)",
                                padding: "0.6rem 0.85rem",
                            }}
                        >
                            {err}
                        </div>
                    )}
                    <button
                        className="btn btn-primary"
                        disabled={submitting}
                        type="submit"
                        style={{ justifyContent: "center", padding: "0.85rem 1rem" }}
                    >
                        {submitting ? (
                            <>
                                <span className="skeleton" style={{ width: 12, height: 12, borderRadius: "50%" }} />{" "}
                                Signing in…
                            </>
                        ) : (
                            <>
                                Sign in <Icon name="arrow-right" size={14} />
                            </>
                        )}
                    </button>
                </form>

                <div className="divider" style={{ margin: "2rem 0 1.25rem" }} />
                <div className="row" style={{ justifyContent: "space-between", fontSize: "0.82rem" }}>
                    <a href="#/" className="muted">
                        ← Back to site
                    </a>
                    <span className="muted mono" style={{ fontSize: "0.75rem" }}>
                        Single-admin · middleware protected
                    </span>
                </div>

                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "inherit",
                        pointerEvents: "none",
                        background: "radial-gradient(400px circle at 50% 0%, var(--accent-soft), transparent 60%)",
                        opacity: 0.6,
                    }}
                />
            </div>
        </main>
    );
};

// ────────────────────────────────────────────────────────────────────────
// Admin dashboard
// ────────────────────────────────────────────────────────────────────────

const ADMIN_NAV = [
    { id: "overview", label: "Overview", icon: "spark" },
    { id: "profile", label: "Profile", icon: "user" },
    { id: "hero", label: "Hero", icon: "rocket" },
    { id: "services", label: "Services", icon: "layers" },
    { id: "skills", label: "Skills", icon: "code" },
    { id: "projects", label: "Projects", icon: "folder" },
    { id: "blogs", label: "Blog posts", icon: "feed" },
    { id: "experience", label: "Experience", icon: "briefcase" },
    { id: "education", label: "Education", icon: "graduation" },
    { id: "messages", label: "Messages", icon: "mail" },
    { id: "appearance", label: "Appearance", icon: "palette" },
    { id: "seo", label: "SEO", icon: "search" },
    { id: "settings", label: "Settings", icon: "settings" },
];

const AdminDashboardPage = () => {
    const [authed, setAuthed] = useAdminSession();
    const [section, setSection] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!authed) navigate("/admin/login");
    }, [authed]);

    if (!authed) return <main />;

    return (
        <div className="admin-shell">
            <style>{ADMIN_STYLES}</style>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="admin-side-head">
                    <Logo />
                    <button
                        className="btn-icon admin-side-close"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close menu"
                    >
                        <Icon name="x" size={14} />
                    </button>
                </div>
                <div className="admin-side-section mono">Manage</div>
                <nav>
                    {ADMIN_NAV.map((n) => (
                        <button
                            key={n.id}
                            onClick={() => {
                                setSection(n.id);
                                setSidebarOpen(false);
                            }}
                            className={`admin-side-link ${section === n.id ? "active" : ""}`}
                        >
                            <Icon name={n.icon} size={15} />
                            <span>{n.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="admin-side-foot">
                    <a href="#/" className="admin-side-link" style={{ color: "var(--text-2)" }}>
                        <Icon name="external" size={15} />
                        <span>View site</span>
                    </a>
                    <button
                        onClick={() => {
                            setAuthed(false);
                            navigate("/admin/login");
                        }}
                        className="admin-side-link"
                    >
                        <Icon name="logout" size={15} />
                        <span>Sign out</span>
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="admin-main">
                <header className="admin-topbar">
                    <button
                        className="btn-icon admin-side-burger"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open menu"
                    >
                        <Icon name="menu" size={16} />
                    </button>
                    <div className="row" style={{ flex: 1, gap: "1rem" }}>
                        <div style={{ position: "relative", maxWidth: 380, width: "100%" }}>
                            <Icon
                                name="search"
                                size={14}
                                style={{
                                    position: "absolute",
                                    left: 12,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "var(--muted)",
                                }}
                            />
                            <input
                                className="input"
                                placeholder="Search content, settings…"
                                style={{
                                    paddingLeft: "2.25rem",
                                    padding: "0.55rem 0.85rem 0.55rem 2.25rem",
                                    fontSize: "0.88rem",
                                }}
                            />
                            <span
                                className="kbd"
                                style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}
                            >
                                ⌘K
                            </span>
                        </div>
                    </div>
                    <div className="row" style={{ gap: "0.5rem" }}>
                        <button className="btn-icon">
                            <Icon name="bell" size={15} />
                        </button>
                        <ThemeMenu />
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                background: "var(--accent-soft)",
                                color: "var(--accent)",
                                border: "1px solid var(--accent-line)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: "var(--font-display)",
                                fontWeight: 600,
                                fontSize: "0.78rem",
                            }}
                        >
                            MAZ
                        </div>
                    </div>
                </header>

                <div className="admin-content page-anim">
                    {section === "overview" && <AdminOverview />}
                    {section === "profile" && <AdminProfile />}
                    {section === "hero" && <AdminHero />}
                    {section === "services" && (
                        <AdminTable
                            items={SERVICES}
                            columns={[
                                ["title", "Title"],
                                ["icon", "Icon"],
                            ]}
                            resource="Service"
                        />
                    )}
                    {section === "skills" && (
                        <AdminTable
                            items={SKILLS}
                            columns={[
                                ["name", "Name"],
                                ["cat", "Category"],
                                ["level", "Level"],
                            ]}
                            resource="Skill"
                        />
                    )}
                    {section === "projects" && (
                        <AdminTable
                            items={PROJECTS.map((p) => ({ ...p, status: "Published" }))}
                            columns={[
                                ["title", "Title"],
                                ["cat", "Category"],
                                ["year", "Year"],
                                ["featured", "Featured"],
                                ["status", "Status"],
                            ]}
                            resource="Project"
                        />
                    )}
                    {section === "blogs" && (
                        <AdminTable
                            items={BLOGS.map((b) => ({ ...b, status: "Published" }))}
                            columns={[
                                ["title", "Title"],
                                ["cat", "Category"],
                                ["date", "Date"],
                                ["read", "Read"],
                                ["status", "Status"],
                            ]}
                            resource="Blog post"
                        />
                    )}
                    {section === "experience" && (
                        <AdminTable
                            items={EXPERIENCE.map((e) => ({ ...e, title: e.role, status: "Active" }))}
                            columns={[
                                ["title", "Role"],
                                ["org", "Company"],
                                ["from", "From"],
                                ["to", "To"],
                            ]}
                            resource="Experience"
                        />
                    )}
                    {section === "education" && (
                        <AdminTable
                            items={EDUCATION}
                            columns={[
                                ["title", "Degree"],
                                ["org", "Institution"],
                                ["from", "From"],
                                ["to", "To"],
                                ["grade", "Grade"],
                            ]}
                            resource="Education entry"
                        />
                    )}
                    {section === "messages" && <AdminMessages />}
                    {section === "appearance" && <AdminAppearance />}
                    {section === "seo" && <AdminSEO />}
                    {section === "settings" && <AdminSettings />}
                </div>
            </div>
        </div>
    );
};

const ThemeMenu = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const close = (e) => {
            if (!ref.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, []);
    const choose = (m) => {
        applyTheme(m);
        setOpen(false);
        try {
            localStorage.setItem("theme-mode", m);
        } catch (e) {}
    };
    return (
        <div ref={ref} style={{ position: "relative" }}>
            <button className="btn-icon" onClick={() => setOpen((o) => !o)} aria-label="Theme">
                <Icon name="sun" size={15} />
            </button>
            {open && (
                <div
                    className="card"
                    style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        right: 0,
                        zIndex: 50,
                        padding: "0.5rem",
                        minWidth: 160,
                    }}
                >
                    {[
                        ["light", "sun"],
                        ["dark", "moon"],
                        ["system", "monitor"],
                    ].map(([m, ic]) => (
                        <button
                            key={m}
                            onClick={() => choose(m)}
                            className="row"
                            style={{
                                width: "100%",
                                padding: "0.55rem 0.65rem",
                                borderRadius: 8,
                                fontSize: "0.88rem",
                                textAlign: "left",
                                background: "transparent",
                                border: 0,
                                color: "var(--text)",
                                textTransform: "capitalize",
                                gap: "0.6rem",
                            }}
                        >
                            <Icon name={ic} size={14} /> {m}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const StatCard = ({ label, value, delta, icon }) => (
    <div className="card" style={{ padding: "1.5rem", position: "relative", overflow: "hidden" }}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
            <div
                className="mono muted"
                style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.14em" }}
            >
                {label}
            </div>
            <div
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Icon name={icon} size={14} />
            </div>
        </div>
        <div className="stat-num" style={{ marginTop: "1rem" }}>
            {value}
        </div>
        <div className="row" style={{ marginTop: "0.5rem", fontSize: "0.78rem" }}>
            <span className="mono accent">{delta}</span>
            <span className="muted mono">vs last 30d</span>
        </div>
    </div>
);

const AdminOverview = () => {
    const stats = useFakeFetch(
        [
            { k: "Page views", v: "24,318", d: "+12%", ic: "eye" },
            { k: "New messages", v: "23", d: "+4", ic: "mail" },
            { k: "Published posts", v: BLOGS.length, d: "+1", ic: "feed" },
            { k: "Active projects", v: PROJECTS.length, d: "+2", ic: "folder" },
        ],
        600
    );
    const recent = useFakeFetch(BLOGS.slice(0, 4), 700);
    return (
        <div className="stack" style={{ gap: "1.5rem" }}>
            <div className="row" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                    <div className="eyebrow" style={{ marginBottom: "0.5rem" }}>
                        Welcome back, Mahfuz
                    </div>
                    <h1 className="h-2" style={{ margin: 0 }}>
                        Overview
                    </h1>
                </div>
                <button className="btn btn-primary">
                    <Icon name="plus" size={14} /> Quick action
                </button>
            </div>

            {/* Stats */}
            <div className="grid-4">
                {!stats
                    ? [...Array(4)].map((_, i) => <SkeletonRow key={i} />)
                    : stats.map((s) => <StatCard key={s.k} label={s.k} value={s.v} delta={s.d} icon={s.ic} />)}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }} className="overview-grid">
                {/* Chart card */}
                <div className="card" style={{ padding: "1.5rem" }}>
                    <div className="row" style={{ justifyContent: "space-between", marginBottom: "1.5rem" }}>
                        <div>
                            <h3 className="h-3" style={{ margin: 0 }}>
                                Traffic — last 30 days
                            </h3>
                            <p
                                className="muted mono"
                                style={{ fontSize: "0.75rem", margin: "0.3rem 0 0" }}
                            >{`Mock data — replace with /api/analytics`}</p>
                        </div>
                        <select
                            className="select"
                            style={{ width: "auto", padding: "0.4rem 0.7rem", fontSize: "0.82rem" }}
                        >
                            <option>Last 30 days</option>
                            <option>Last 7 days</option>
                            <option>This year</option>
                        </select>
                    </div>
                    <Sparkline />
                </div>

                {/* Recent posts */}
                <div className="card" style={{ padding: "1.5rem" }}>
                    <div className="row" style={{ justifyContent: "space-between", marginBottom: "1.25rem" }}>
                        <h3 className="h-3" style={{ margin: 0 }}>
                            Recent posts
                        </h3>
                        <a href="#" className="mono accent" style={{ fontSize: "0.78rem" }}>
                            View all <Icon name="arrow-right" size={11} />
                        </a>
                    </div>
                    <div className="stack" style={{ gap: "0.75rem" }}>
                        {!recent
                            ? [...Array(4)].map((_, i) => <Skeleton key={i} h="44px" />)
                            : recent.map((b) => (
                                  <div
                                      key={b.slug}
                                      className="row"
                                      style={{
                                          gap: "0.75rem",
                                          padding: "0.6rem 0",
                                          borderBottom: "1px dashed var(--border)",
                                      }}
                                  >
                                      <div
                                          style={{
                                              width: 36,
                                              height: 36,
                                              borderRadius: 8,
                                              background: "var(--accent-soft)",
                                              color: "var(--accent)",
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              flexShrink: 0,
                                          }}
                                      >
                                          <Icon name="feed" size={14} />
                                      </div>
                                      <div style={{ flex: 1, minWidth: 0 }}>
                                          <div
                                              style={{
                                                  fontSize: "0.88rem",
                                                  fontWeight: 500,
                                                  whiteSpace: "nowrap",
                                                  overflow: "hidden",
                                                  textOverflow: "ellipsis",
                                              }}
                                          >
                                              {b.title}
                                          </div>
                                          <div className="muted mono" style={{ fontSize: "0.7rem" }}>
                                              {b.date} · {b.cat}
                                          </div>
                                      </div>
                                  </div>
                              ))}
                    </div>
                </div>
            </div>

            <style>{`@media (max-width: 980px) { .overview-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
    );
};

const Sparkline = () => {
    const points = [
        12, 18, 14, 22, 30, 26, 34, 28, 42, 38, 44, 50, 46, 58, 62, 56, 64, 70, 68, 76, 82, 78, 86, 90, 84, 92, 96, 92,
        98, 100,
    ];
    const max = Math.max(...points);
    const w = 600,
        h = 180;
    const dx = w / (points.length - 1);
    const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${i * dx} ${h - (p / max) * (h - 20) - 10}`).join(" ");
    const area = `${path} L ${w} ${h} L 0 ${h} Z`;
    return (
        <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 180 }}>
            <defs>
                <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={area} fill="url(#spark)" />
            <path
                d={path}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {points.map(
                (p, i) =>
                    i === points.length - 1 && (
                        <circle key={i} cx={i * dx} cy={h - (p / max) * (h - 20) - 10} r="4" fill="var(--accent)" />
                    )
            )}
        </svg>
    );
};

const AdminProfile = () => (
    <div className="stack" style={{ gap: "1.5rem" }}>
        <div>
            <div className="eyebrow" style={{ marginBottom: "0.5rem" }}>
                Manage
            </div>
            <h1 className="h-2" style={{ margin: 0 }}>
                Profile information
            </h1>
        </div>
        <div className="card" style={{ padding: "2rem" }}>
            <div className="grid-2">
                <Field label="Full name" value={PROFILE.name} />
                <Field label="Display handle" value={PROFILE.handle} />
                <Field label="Role" value={PROFILE.role} />
                <Field label="Company" value={PROFILE.company} />
                <Field label="Location" value={PROFILE.location} />
                <Field label="Email" value={PROFILE.email} />
                <Field label="Phone" value={PROFILE.phone} />
                <Field label="Status" value="Available for hire" />
            </div>
            <div className="row" style={{ justifyContent: "flex-end", marginTop: "2rem", gap: "0.5rem" }}>
                <button className="btn btn-ghost">Discard</button>
                <button className="btn btn-primary">
                    <Icon name="check" size={14} /> Save changes
                </button>
            </div>
        </div>

        <div className="card" style={{ padding: "2rem" }}>
            <h3 className="h-3" style={{ margin: "0 0 0.5rem" }}>
                Bio
            </h3>
            <p className="muted mono" style={{ fontSize: "0.78rem", margin: "0 0 1.25rem" }}>
                The "About me" paragraphs shown on the homepage and About page.
            </p>
            <textarea className="textarea" defaultValue={PROFILE.about.join("\n\n")} style={{ minHeight: 180 }} />
        </div>

        <div className="card" style={{ padding: "2rem" }}>
            <h3 className="h-3" style={{ margin: "0 0 1.25rem" }}>
                Social links
            </h3>
            <div className="stack" style={{ gap: "0.75rem" }}>
                {PROFILE.socials.map((s) => (
                    <div key={s.label} className="row" style={{ gap: "0.75rem" }}>
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 8,
                                background: "var(--accent-soft)",
                                color: "var(--accent)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            <Icon name={s.label.toLowerCase()} size={14} />
                        </div>
                        <div style={{ minWidth: 90, fontSize: "0.88rem", fontWeight: 500 }}>{s.label}</div>
                        <input
                            className="input"
                            defaultValue={s.href === "#" ? "" : s.href}
                            placeholder={`${s.label} URL`}
                            style={{ flex: 1, padding: "0.55rem 0.75rem", fontSize: "0.85rem" }}
                        />
                        <button className="btn-icon" aria-label="Save">
                            <Icon name="check" size={13} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const Field = ({ label, value, type = "text" }) => (
    <div>
        <label className="label">{label}</label>
        <input className="input" defaultValue={value} type={type} />
    </div>
);

const AdminHero = () => (
    <div className="stack" style={{ gap: "1.5rem" }}>
        <div>
            <div className="eyebrow" style={{ marginBottom: "0.5rem" }}>
                Manage
            </div>
            <h1 className="h-2" style={{ margin: 0 }}>
                Hero section
            </h1>
        </div>
        <div className="card" style={{ padding: "2rem" }}>
            <div className="grid-2">
                <Field label="Eyebrow text" value="Available for hire — Q3 2026" />
                <Field label="Tagline" value={PROFILE.tagline} />
            </div>
            <div style={{ marginTop: "1.25rem" }}>
                <label className="label">Background animation</label>
                <select className="select" defaultValue="grid-streaks">
                    <option value="grid-streaks">Grid + light streaks (default)</option>
                    <option value="particles">Particles</option>
                    <option value="blobs">Glowing gradient blobs</option>
                    <option value="static">Static</option>
                </select>
            </div>
            <div className="grid-2" style={{ marginTop: "1.25rem" }}>
                <Field label="Primary CTA label" value="See selected work" />
                <Field label="Primary CTA link" value="/projects" />
                <Field label="Secondary CTA label" value="Get in touch" />
                <Field label="Secondary CTA link" value="/contact" />
            </div>
            <div className="row" style={{ justifyContent: "flex-end", marginTop: "2rem", gap: "0.5rem" }}>
                <button className="btn btn-ghost">Discard</button>
                <button className="btn btn-primary">
                    <Icon name="check" size={14} /> Save changes
                </button>
            </div>
        </div>
    </div>
);

const AdminTable = ({ items: initial, columns, resource }) => {
    const items = useFakeFetch(initial, 700, [resource]);
    const [q, setQ] = useState("");
    const filtered = items?.filter((it) => JSON.stringify(it).toLowerCase().includes(q.toLowerCase()));
    return (
        <div className="stack" style={{ gap: "1.5rem" }}>
            <div className="row" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                    <div className="eyebrow" style={{ marginBottom: "0.5rem" }}>
                        Manage
                    </div>
                    <h1 className="h-2" style={{ margin: 0 }}>
                        {resource}s
                    </h1>
                </div>
                <div className="row" style={{ gap: "0.5rem" }}>
                    <div style={{ position: "relative" }}>
                        <Icon
                            name="search"
                            size={13}
                            style={{
                                position: "absolute",
                                left: 12,
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "var(--muted)",
                            }}
                        />
                        <input
                            className="input"
                            placeholder="Search…"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            style={{
                                paddingLeft: "2.25rem",
                                padding: "0.5rem 0.85rem 0.5rem 2.25rem",
                                fontSize: "0.85rem",
                                width: 220,
                            }}
                        />
                    </div>
                    <button className="btn btn-primary">
                        <Icon name="plus" size={14} /> New {resource.toLowerCase()}
                    </button>
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                {columns.map(([_, label]) => (
                                    <th key={label}>{label}</th>
                                ))}
                                <th style={{ width: 80, textAlign: "right" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!filtered ? (
                                [...Array(6)].map((_, i) => (
                                    <tr key={i}>
                                        {columns.map((_, j) => (
                                            <td key={j}>
                                                <Skeleton w={`${50 + ((i + j) % 30)}%`} h="0.9rem" />
                                            </td>
                                        ))}
                                        <td>
                                            <Skeleton w="50px" h="1.5rem" />
                                        </td>
                                    </tr>
                                ))
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + 1}>
                                        <div style={{ padding: "3rem 1rem", textAlign: "center" }} className="muted">
                                            No results
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((it, i) => (
                                    <tr key={i}>
                                        {columns.map(([key]) => (
                                            <td key={key}>
                                                {key === "featured" ? (
                                                    it[key] ? (
                                                        <span
                                                            className="tag tag-accent"
                                                            style={{ padding: "0.2rem 0.5rem", fontSize: "0.7rem" }}
                                                        >
                                                            ★ Featured
                                                        </span>
                                                    ) : (
                                                        <span className="muted mono" style={{ fontSize: "0.78rem" }}>
                                                            —
                                                        </span>
                                                    )
                                                ) : key === "status" ? (
                                                    <span
                                                        className="tag"
                                                        style={{
                                                            padding: "0.2rem 0.5rem",
                                                            fontSize: "0.7rem",
                                                            color: "oklch(0.75 0.18 145)",
                                                            borderColor: "oklch(0.75 0.18 145 / 0.4)",
                                                            background: "oklch(0.75 0.18 145 / 0.1)",
                                                        }}
                                                    >
                                                        <Icon name="dot" size={10} /> {it[key]}
                                                    </span>
                                                ) : key === "level" ? (
                                                    <div
                                                        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                                                    >
                                                        <div
                                                            style={{
                                                                width: 80,
                                                                height: 4,
                                                                background: "var(--bg-2)",
                                                                borderRadius: 999,
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    width: `${it[key]}%`,
                                                                    height: "100%",
                                                                    background: "var(--accent)",
                                                                    borderRadius: 999,
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="mono muted" style={{ fontSize: "0.78rem" }}>
                                                            {it[key]}%
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span style={{ fontSize: "0.88rem" }}>{String(it[key])}</span>
                                                )}
                                            </td>
                                        ))}
                                        <td style={{ textAlign: "right" }}>
                                            <div style={{ display: "inline-flex", gap: "0.25rem" }}>
                                                <button
                                                    className="btn-icon"
                                                    style={{ width: 28, height: 28 }}
                                                    aria-label="Edit"
                                                >
                                                    <Icon name="edit" size={12} />
                                                </button>
                                                <button
                                                    className="btn-icon"
                                                    style={{ width: 28, height: 28 }}
                                                    aria-label="Delete"
                                                >
                                                    <Icon name="trash" size={12} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div
                    className="row"
                    style={{
                        justifyContent: "space-between",
                        padding: "1rem 1.25rem",
                        borderTop: "1px solid var(--border)",
                    }}
                >
                    <span className="muted mono" style={{ fontSize: "0.78rem" }}>
                        {filtered ? `${filtered.length} ${filtered.length === 1 ? "item" : "items"}` : "Loading…"}
                    </span>
                    <div className="row" style={{ gap: "0.25rem" }}>
                        <button className="btn-icon" style={{ width: 28, height: 28 }}>
                            <Icon name="arrow-left" size={12} />
                        </button>
                        <span className="tag mono">1 / 1</span>
                        <button className="btn-icon" style={{ width: 28, height: 28 }}>
                            <Icon name="arrow-right" size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminMessages = () => {
    const [active, setActive] = useState(0);
    const messages = useFakeFetch(
        [
            {
                name: "Sarah Khan",
                email: "sarah@studio.co",
                subject: "Landing page rebuild",
                body: "Hi Mahfuz — we're a small design studio and we'd like to redo our marketing site. Comfortable with Next.js? Timeline is flexible. — Sarah",
                date: "2h ago",
                read: false,
            },
            {
                name: "Imran Hossain",
                email: "imran@logico.io",
                subject: "Laravel API consultation",
                body: "Need 4-6 hours of consulting on a Laravel queue setup. Are you available next week?",
                date: "5h ago",
                read: false,
            },
            {
                name: "Emma Liu",
                email: "emma@hire.co",
                subject: "Senior FE role at Northwind",
                body: "Came across your portfolio — really like Ledgerly. We're hiring for a senior FE role, fully remote. Open to chat?",
                date: "Yesterday",
                read: true,
            },
            {
                name: "Tom Reyes",
                email: "tom@cafekite.com",
                subject: "Kite POS — feature request",
                body: "Loved your Kite POS write-up. Would you take on a customization? Looking for a kitchen-display add-on.",
                date: "2d ago",
                read: true,
            },
            {
                name: "Lina Park",
                email: "lina@verseai.dev",
                subject: "Verse playground collab",
                body: "Saw your LLM playground. Interested in collaborating on the benchmarking flow — happy to share notes.",
                date: "3d ago",
                read: true,
            },
        ],
        700
    );

    return (
        <div className="stack" style={{ gap: "1.5rem" }}>
            <div>
                <div className="eyebrow" style={{ marginBottom: "0.5rem" }}>
                    Manage
                </div>
                <h1 className="h-2" style={{ margin: 0 }}>
                    Inbox
                </h1>
            </div>
            <div
                className="card"
                style={{
                    padding: 0,
                    display: "grid",
                    gridTemplateColumns: "320px 1fr",
                    height: 560,
                    overflow: "hidden",
                }}
                className2="msg-grid"
            >
                <div style={{ borderRight: "1px solid var(--border)", overflowY: "auto" }}>
                    {!messages
                        ? [...Array(5)].map((_, i) => (
                              <div key={i} style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>
                                  <Skeleton h="0.9rem" w="80%" />
                                  <div style={{ height: 6 }} />
                                  <Skeleton h="0.75rem" w="60%" />
                              </div>
                          ))
                        : messages.map((m, i) => (
                              <button
                                  key={i}
                                  onClick={() => setActive(i)}
                                  className="row"
                                  style={{
                                      width: "100%",
                                      textAlign: "left",
                                      padding: "1rem",
                                      borderBottom: "1px solid var(--border)",
                                      borderLeft: active === i ? "2px solid var(--accent)" : "2px solid transparent",
                                      background: active === i ? "var(--accent-soft)" : "transparent",
                                      border: "0",
                                      borderBottomColor: "var(--border)",
                                      borderBottomStyle: "solid",
                                      borderBottomWidth: 1,
                                      gap: "0.5rem",
                                      flexDirection: "column",
                                      alignItems: "stretch",
                                      color: "var(--text)",
                                  }}
                              >
                                  <div className="row" style={{ justifyContent: "space-between" }}>
                                      <span style={{ fontWeight: 500, fontSize: "0.88rem" }}>{m.name}</span>
                                      <span className="mono muted" style={{ fontSize: "0.7rem" }}>
                                          {m.date}
                                      </span>
                                  </div>
                                  <div
                                      style={{
                                          fontSize: "0.82rem",
                                          color: "var(--text-2)",
                                          whiteSpace: "nowrap",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                      }}
                                  >
                                      {m.subject}
                                  </div>
                                  <div className="row" style={{ gap: "0.5rem" }}>
                                      {!m.read && (
                                          <span
                                              style={{
                                                  width: 6,
                                                  height: 6,
                                                  borderRadius: "50%",
                                                  background: "var(--accent)",
                                              }}
                                          />
                                      )}
                                      <span
                                          className="muted mono"
                                          style={{
                                              fontSize: "0.72rem",
                                              whiteSpace: "nowrap",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                          }}
                                      >
                                          {m.email}
                                      </span>
                                  </div>
                              </button>
                          ))}
                </div>
                <div style={{ padding: "2rem", overflowY: "auto" }}>
                    {messages && messages[active] && (
                        <>
                            <div className="row" style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
                                <h3 className="h-3" style={{ margin: 0 }}>
                                    {messages[active].subject}
                                </h3>
                                <div className="row" style={{ gap: "0.4rem" }}>
                                    <button className="btn-icon">
                                        <Icon name="check" size={13} />
                                    </button>
                                    <button className="btn-icon">
                                        <Icon name="trash" size={13} />
                                    </button>
                                </div>
                            </div>
                            <div
                                className="row"
                                style={{
                                    gap: "0.75rem",
                                    marginBottom: "1.5rem",
                                    paddingBottom: "1.25rem",
                                    borderBottom: "1px solid var(--border)",
                                }}
                            >
                                <div
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        background: "var(--accent-soft)",
                                        color: "var(--accent)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 600,
                                        fontFamily: "var(--font-display)",
                                    }}
                                >
                                    {messages[active].name
                                        .split(" ")
                                        .map((s) => s[0])
                                        .join("")}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 500 }}>{messages[active].name}</div>
                                    <div className="muted mono" style={{ fontSize: "0.78rem" }}>
                                        {messages[active].email} · {messages[active].date}
                                    </div>
                                </div>
                            </div>
                            <p className="text-2" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
                                {messages[active].body}
                            </p>
                            <div style={{ marginTop: "2rem" }}>
                                <textarea className="textarea" placeholder="Write a reply…" />
                                <div
                                    className="row"
                                    style={{ justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.75rem" }}
                                >
                                    <button className="btn btn-ghost">Save draft</button>
                                    <button className="btn btn-primary">
                                        <Icon name="send" size={13} /> Send reply
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <style>{`@media (max-width:880px){[class2="msg-grid"]{grid-template-columns:1fr !important;height:auto !important}}`}</style>
        </div>
    );
};

const AdminAppearance = () => (
    <div className="stack" style={{ gap: "1.5rem" }}>
        <div>
            <div className="eyebrow" style={{ marginBottom: "0.5rem" }}>
                Customize
            </div>
            <h1 className="h-2" style={{ margin: 0 }}>
                Appearance
            </h1>
        </div>

        <div className="card" style={{ padding: "2rem" }}>
            <h3 className="h-3" style={{ margin: "0 0 1.25rem" }}>
                Light mode colors
            </h3>
            <div className="grid-3">
                {["Primary", "Secondary", "Accent", "Background", "Text", "Card"].map((k) => (
                    <ColorRow
                        key={k}
                        label={k}
                        value={k === "Accent" ? "#c95cf2" : k === "Background" ? "#fafaf9" : "#0a0a0b"}
                    />
                ))}
            </div>
        </div>

        <div className="card" style={{ padding: "2rem" }}>
            <h3 className="h-3" style={{ margin: "0 0 1.25rem" }}>
                Dark mode colors
            </h3>
            <div className="grid-3">
                {["Primary", "Secondary", "Accent", "Background", "Text", "Card"].map((k) => (
                    <ColorRow
                        key={k}
                        label={k}
                        value={k === "Accent" ? "#c95cf2" : k === "Background" ? "#08080b" : "#ededee"}
                    />
                ))}
            </div>
        </div>

        <div className="card" style={{ padding: "2rem" }}>
            <h3 className="h-3" style={{ margin: "0 0 1.25rem" }}>
                Typography
            </h3>
            <div className="grid-2">
                <div>
                    <label className="label">Heading font</label>
                    <select className="select" defaultValue="Geist">
                        <option>Geist</option>
                        <option>Inter Tight</option>
                        <option>Space Grotesk</option>
                        <option>Bricolage Grotesque</option>
                    </select>
                </div>
                <div>
                    <label className="label">Body font</label>
                    <select className="select" defaultValue="Geist">
                        <option>Geist</option>
                        <option>Inter</option>
                        <option>Helvetica Neue</option>
                    </select>
                </div>
                <Field label="Heading size" value="clamp(2rem, 4.2vw, 3.5rem)" />
                <Field label="Body size" value="16px" />
            </div>
        </div>

        <div className="card" style={{ padding: "2rem" }}>
            <h3 className="h-3" style={{ margin: "0 0 1.25rem" }}>
                Layout
            </h3>
            <div className="grid-2">
                <Field label="Section padding" value="7rem" />
                <Field label="Card border radius" value="14px" />
                <Field label="Button border radius" value="999px" />
                <div>
                    <label className="label">Background animation</label>
                    <select className="select" defaultValue="grid-streaks">
                        <option>grid-streaks</option>
                        <option>particles</option>
                        <option>blobs</option>
                        <option>static</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="card" style={{ padding: "2rem" }}>
            <h3 className="h-3" style={{ margin: "0 0 1.25rem" }}>
                Section visibility
            </h3>
            <div className="stack" style={{ gap: "0.5rem" }}>
                {[
                    "About preview",
                    "Services preview",
                    "Skills preview",
                    "Featured projects",
                    "Latest blogs",
                    "Experience preview",
                    "Contact CTA",
                ].map((k) => (
                    <div
                        key={k}
                        className="row"
                        style={{
                            justifyContent: "space-between",
                            padding: "0.65rem 0.85rem",
                            border: "1px solid var(--border)",
                            borderRadius: 8,
                        }}
                    >
                        <span style={{ fontSize: "0.92rem" }}>{k}</span>
                        <Toggle defaultOn={true} />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ColorRow = ({ label, value }) => (
    <div>
        <label className="label">{label}</label>
        <div
            className="row"
            style={{
                gap: "0.5rem",
                padding: "0.4rem 0.5rem",
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "var(--panel)",
            }}
        >
            <span
                style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: value,
                    border: "1px solid var(--border)",
                    flexShrink: 0,
                }}
            />
            <input
                defaultValue={value}
                className="mono"
                style={{
                    flex: 1,
                    background: "transparent",
                    border: 0,
                    color: "var(--text)",
                    outline: "none",
                    fontSize: "0.85rem",
                }}
            />
        </div>
    </div>
);

const Toggle = ({ defaultOn }) => {
    const [on, setOn] = useState(defaultOn);
    return (
        <button
            onClick={() => setOn(!on)}
            aria-pressed={on}
            style={{
                width: 38,
                height: 22,
                borderRadius: 999,
                position: "relative",
                flexShrink: 0,
                background: on ? "var(--accent)" : "var(--bg-2)",
                border: "1px solid " + (on ? "var(--accent-line)" : "var(--border)"),
                transition: "background 0.2s",
                padding: 0,
            }}
        >
            <span
                style={{
                    position: "absolute",
                    top: 2,
                    left: on ? 18 : 2,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "left 0.2s",
                }}
            />
        </button>
    );
};

const AdminSEO = () => (
    <div className="stack" style={{ gap: "1.5rem" }}>
        <div>
            <div className="eyebrow" style={{ marginBottom: "0.5rem" }}>
                Optimize
            </div>
            <h1 className="h-2" style={{ margin: 0 }}>
                SEO
            </h1>
        </div>
        <div className="card" style={{ padding: "2rem" }}>
            <h3 className="h-3" style={{ margin: "0 0 1.25rem" }}>
                Defaults
            </h3>
            <div className="grid-2">
                <Field label="Site title" value="Mahfuz Ahmed Zisan — Software Developer" />
                <Field label="Site URL" value="https://mahfuz.dev" />
            </div>
            <div style={{ marginTop: "1.25rem" }}>
                <label className="label">Description</label>
                <textarea className="textarea" defaultValue={PROFILE.tagline} />
            </div>
            <div className="grid-2" style={{ marginTop: "1.25rem" }}>
                <Field label="Twitter handle" value="@mahfuzzisan" />
                <Field label="OG image" value="/og.png" />
            </div>
        </div>
        <div className="card" style={{ padding: "2rem" }}>
            <h3 className="h-3" style={{ margin: "0 0 1.25rem" }}>
                JSON-LD schema
            </h3>
            <pre
                style={{
                    background: "var(--bg-2)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "1rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: "var(--text-2)",
                    overflowX: "auto",
                    margin: 0,
                }}
            >
                {`{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "${PROFILE.name}",
  "url": "https://mahfuz.dev",
  "jobTitle": "${PROFILE.role}",
  "worksFor": { "@type": "Organization", "name": "${PROFILE.company}" },
  "sameAs": [ "https://github.com/mahfuzahmedzisan" ]
}`}
            </pre>
        </div>
        <div className="grid-3">
            {[
                ["Sitemap", "Auto-generated", "/sitemap.xml"],
                ["Robots.txt", "Allowing all crawlers", "/robots.txt"],
                ["RSS feed", "Auto-generated", "/feed.xml"],
            ].map(([k, v, l]) => (
                <div key={k} className="card">
                    <div className="eyebrow" style={{ marginBottom: "0.75rem" }}>
                        {k}
                    </div>
                    <p className="text-2" style={{ margin: "0 0 1rem", fontSize: "0.9rem" }}>
                        {v}
                    </p>
                    <a className="mono accent" style={{ fontSize: "0.82rem" }}>
                        {l} <Icon name="arrow-up-right" size={11} />
                    </a>
                </div>
            ))}
        </div>
    </div>
);

const AdminSettings = () => (
    <div className="stack" style={{ gap: "1.5rem" }}>
        <div>
            <div className="eyebrow" style={{ marginBottom: "0.5rem" }}>
                Configure
            </div>
            <h1 className="h-2" style={{ margin: 0 }}>
                Settings
            </h1>
        </div>
        <div className="card" style={{ padding: "2rem" }}>
            <h3 className="h-3" style={{ margin: "0 0 1.25rem" }}>
                Account
            </h3>
            <div className="grid-2">
                <Field label="Admin email" value="admin@maz.dev" />
                <Field label="Display name" value="Mahfuz" />
                <Field label="Current password" value="" type="password" />
                <Field label="New password" value="" type="password" />
            </div>
            <div className="row" style={{ justifyContent: "flex-end", marginTop: "1.5rem", gap: "0.5rem" }}>
                <button className="btn btn-primary">
                    <Icon name="check" size={13} /> Update credentials
                </button>
            </div>
        </div>
        <div className="card" style={{ padding: "2rem" }}>
            <h3 className="h-3" style={{ margin: "0 0 1.25rem" }}>
                Site
            </h3>
            <div className="grid-2">
                <Field label="Site logo" value="/logo.svg" />
                <Field label="Favicon" value="/favicon.ico" />
            </div>
        </div>
        <div className="card" style={{ padding: "2rem", borderColor: "oklch(0.55 0.15 25 / 0.4)" }}>
            <h3 className="h-3" style={{ margin: "0 0 0.5rem", color: "oklch(0.75 0.15 25)" }}>
                Danger zone
            </h3>
            <p className="text-2" style={{ margin: "0 0 1rem", fontSize: "0.9rem" }}>
                Wipe all content and revert to seed data. This cannot be undone.
            </p>
            <button
                className="btn btn-ghost"
                style={{ borderColor: "oklch(0.55 0.15 25 / 0.4)", color: "oklch(0.75 0.15 25)" }}
            >
                <Icon name="trash" size={13} /> Reset all content
            </button>
        </div>
    </div>
);

// ────────────────────────────────────────────────────────────────────────
// Admin styles
// ────────────────────────────────────────────────────────────────────────

const ADMIN_STYLES = `
.admin-shell{display:grid;grid-template-columns:260px 1fr;min-height:100vh;background:var(--bg);position:relative;z-index:1}
.admin-sidebar{position:sticky;top:0;height:100vh;border-right:1px solid var(--border);
  background:var(--panel-solid);padding:1.5rem 1rem;display:flex;flex-direction:column;gap:0.5rem;
  z-index:40}
.admin-side-head{display:flex;align-items:center;justify-content:space-between;padding:0.25rem 0.5rem 1.25rem;border-bottom:1px solid var(--border);margin-bottom:0.75rem}
.admin-side-close{display:none}
.admin-side-section{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.14em;color:var(--muted);padding:0 0.5rem;margin-top:0.5rem;margin-bottom:0.4rem}
.admin-sidebar nav{display:flex;flex-direction:column;gap:2px;flex:1;overflow-y:auto;min-height:0}
.admin-side-link{display:flex;align-items:center;gap:0.65rem;padding:0.55rem 0.7rem;border-radius:8px;
  font-size:0.88rem;color:var(--text-2);background:transparent;border:0;text-align:left;cursor:pointer;
  transition:background 0.15s,color 0.15s;width:100%}
.admin-side-link:hover{background:oklch(1 0 0 / 0.04);color:var(--text)}
[data-theme="light"] .admin-side-link:hover{background:oklch(0 0 0 / 0.04)}
.admin-side-link.active{background:var(--accent-soft);color:var(--accent);position:relative}
.admin-side-link.active::before{content:"";position:absolute;left:-1rem;top:8px;bottom:8px;width:2px;background:var(--accent);border-radius:2px}
.admin-side-foot{margin-top:auto;padding-top:0.75rem;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:2px}

.admin-main{display:flex;flex-direction:column;min-width:0}
.admin-topbar{position:sticky;top:0;z-index:30;display:flex;align-items:center;gap:1rem;padding:0.85rem 2rem;
  background:var(--panel);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  border-bottom:1px solid var(--border)}
.admin-side-burger{display:none}
.admin-content{padding:2rem;min-height:calc(100vh - 64px);}

.admin-table{width:100%;border-collapse:collapse;font-size:0.88rem}
.admin-table thead th{text-align:left;padding:0.85rem 1.25rem;font-family:var(--font-mono);font-size:0.7rem;
  text-transform:uppercase;letter-spacing:0.14em;color:var(--muted);font-weight:500;
  background:var(--bg-2);border-bottom:1px solid var(--border)}
.admin-table tbody td{padding:0.85rem 1.25rem;border-bottom:1px solid var(--border);vertical-align:middle}
.admin-table tbody tr:last-child td{border-bottom:0}
.admin-table tbody tr:hover{background:oklch(1 0 0 / 0.02)}
[data-theme="light"] .admin-table tbody tr:hover{background:oklch(0 0 0 / 0.02)}
.admin-table-wrap{overflow-x:auto}

@media (max-width: 980px){
  .admin-shell{grid-template-columns:1fr}
  .admin-sidebar{position:fixed;left:-280px;top:0;width:260px;transition:left 0.3s var(--ease-out);box-shadow:0 0 80px rgba(0,0,0,0.5)}
  .admin-sidebar.open{left:0}
  .admin-side-close{display:inline-flex}
  .admin-side-burger{display:inline-flex}
  .admin-content{padding:1.25rem}
  .admin-topbar{padding:0.75rem 1.25rem}
}
`;

Object.assign(window, { AdminLoginPage, AdminDashboardPage, useAdminSession });
