// pages-projects.jsx — Projects list, details, Blogs list, details

const ProjectsPage = () => {
  useReveal();
  const all = useFakeFetch(PROJECTS, 700, []);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [tech, setTech] = useState(null);
  const [shown, setShown] = useState(6);

  const allTech = useMemo(() => {
    const set = new Set();
    PROJECTS.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    if (!all) return null;
    return all.filter((p) =>
      (cat === "All" || p.cat === cat) &&
      (!featuredOnly || p.featured) &&
      (!tech || tech === "All" || p.tech.includes(tech)) &&
      (q === "" || (p.title + " " + p.short + " " + p.tech.join(" ")).toLowerCase().includes(q.toLowerCase()))
    );
  }, [all, cat, q, featuredOnly, tech]);

  // Infinite scroll
  const sentinelRef = useRef(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !filtered) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setShown((s) => Math.min(s + 6, filtered.length));
    });
    io.observe(el);
    return () => io.disconnect();
  }, [filtered]);

  return (
    <main className="page-anim">
      <PageIntro eyebrow={`Projects · ${PROJECTS.length} shipped`} title="Selected work." sub="Filter, search, scroll. Click any card for the full case study." />

      <section className="section-tight" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
        <div className="shell">
          <div className="card" style={{ padding: "1rem 1.15rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
              <Icon name="search" size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
              <input className="input" placeholder="Search by name, tech, or description…"
                style={{ paddingLeft: "2.5rem" }}
                value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <button className={`tag ${featuredOnly ? "tag-accent" : ""}`} onClick={() => setFeaturedOnly((v) => !v)} style={{ cursor: "pointer", padding: "0.5rem 0.85rem", fontSize: "0.82rem" }}>
              ★ Featured only
            </button>
          </div>

          <div className="row-wrap" style={{ marginTop: "1.25rem", justifyContent: "space-between" }}>
            <div className="row-wrap" style={{ gap: "0.4rem" }}>
              {CATEGORIES.map((c) => (
                <button key={c} className={`tag ${cat === c ? "tag-accent" : ""}`}
                  onClick={() => setCat(c)} style={{ cursor: "pointer", padding: "0.45rem 0.9rem", fontSize: "0.85rem" }}>
                  {c}
                </button>
              ))}
            </div>
            <select className="select" value={tech || "All"} onChange={(e) => setTech(e.target.value === "All" ? null : e.target.value)} style={{ width: "auto", padding: "0.5rem 0.85rem", fontSize: "0.85rem" }}>
              {allTech.map((t) => <option key={t} value={t}>{t === "All" ? "All technologies" : t}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="shell">
          {!filtered ? (
            <div className="grid-3">
              {[...Array(6)].map((_, i) => <SkeletonProjectCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <Empty title="No matching projects" sub="Try clearing filters or searching something else." />
          ) : (
            <>
              <div className="grid-3">
                {filtered.slice(0, shown).map((p, i) => <ProjectCard key={p.slug} p={p} delay={(i % 3) * 0.05} />)}
              </div>
              {shown < filtered.length && (
                <div ref={sentinelRef} style={{ marginTop: "2rem", textAlign: "center" }}>
                  <div className="row" style={{ justifyContent: "center", gap: "0.5rem", color: "var(--muted)" }}>
                    <span className="skeleton" style={{ width: 12, height: 12, borderRadius: "50%" }} />
                    <span className="mono" style={{ fontSize: "0.8rem" }}>Loading more…</span>
                  </div>
                </div>
              )}
              <div className="row" style={{ justifyContent: "center", marginTop: "2rem" }}>
                <span className="mono muted" style={{ fontSize: "0.78rem" }}>
                  Showing {Math.min(shown, filtered.length)} of {filtered.length}
                </span>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

const ProjectDetailPage = ({ slug }) => {
  useReveal();
  const project = useFakeFetch(PROJECTS.find((p) => p.slug === slug), 600, [slug]);
  const related = useFakeFetch(PROJECTS.filter((p) => p.slug !== slug).slice(0, 3), 800, [slug]);

  if (!project) {
    return (
      <main className="page-anim">
        <section className="section" style={{ paddingTop: "9rem" }}>
          <div className="shell">
            <Skeleton w="40%" h="1rem" /><div style={{ height: 12 }} />
            <Skeleton w="80%" h="3rem" /><div style={{ height: 24 }} />
            <Skeleton w="100%" h="400px" /><div style={{ height: 24 }} />
            <Skeleton w="100%" h="1rem" /><div style={{ height: 8 }} />
            <Skeleton w="90%" h="1rem" />
          </div>
        </section>
      </main>
    );
  }
  if (project === undefined || project === null) return <main />;

  return (
    <main className="page-anim">
      <section className="section" style={{ paddingTop: "9rem" }}>
        <div className="shell">
          <a href="#/projects" className="mono muted" style={{ fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "2rem" }}>
            <Icon name="arrow-left" size={13} /> All projects
          </a>
          <div className="row-wrap reveal" style={{ gap: "0.5rem", marginBottom: "1rem" }}>
            <span className="tag tag-accent">{project.cat}</span>
            <span className="tag mono">{project.year}</span>
            {project.featured && <span className="tag tag-accent">★ Featured</span>}
          </div>
          <h1 className="h-display reveal text-grad" style={{ marginBottom: "1.5rem", fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>{project.title}</h1>
          <p className="reveal text-2" style={{ fontSize: "1.2rem", lineHeight: 1.6, maxWidth: 760, "--reveal-delay": "0.1s" }}>{project.full}</p>

          <div className="row-wrap reveal" style={{ marginTop: "2rem", gap: "0.75rem", "--reveal-delay": "0.15s" }}>
            <a href={project.live} className="btn btn-primary"><Icon name="external" size={14} /> View live</a>
            <a href={project.repo} className="btn btn-ghost"><Icon name="github" size={14} /> Source</a>
          </div>

          {/* meta strip */}
          <div className="card reveal" style={{ marginTop: "3rem", padding: 0, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", "--reveal-delay": "0.2s" }} className2="meta-strip">
            {[
              ["Role", project.role],
              ["Duration", project.duration],
              ["Year", project.year],
              ["Category", project.cat],
            ].map(([k, v], i) => (
              <div key={k} style={{ padding: "1.5rem", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
                <div className="mono muted" style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "0.5rem" }}>{k}</div>
                <div style={{ fontSize: "0.95rem" }}>{v}</div>
              </div>
            ))}
          </div>

          {/* hero image */}
          <div className="reveal" style={{ marginTop: "3rem", "--reveal-delay": "0.25s" }}>
            <Placeholder label={`${project.title} — hero shot`} aspect="16/9" />
          </div>

          {/* Body */}
          <div className="reveal" style={{
            marginTop: "4rem", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "3rem",
          }} className2="detail-grid">
            <div>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>The brief</div>
              <p className="text-2" style={{ fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "2rem" }}>
                {project.short} The team needed a system that scales beyond the proof-of-concept stage and stays maintainable as features grow. I scoped the architecture, built the core, and shepherded the deploy.
              </p>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>What I built</div>
              <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                {[
                  "Schema design with Postgres, including soft-deletes and audit log",
                  "Auth layer with role-based permissions and granular team scopes",
                  "Background queues for emails, exports, and integrations",
                  "Frontend with Next.js App Router, RSC for fast initial loads",
                  "CI/CD pipeline with Docker, GitHub Actions, and zero-downtime deploys",
                ].map((b) => (
                  <li key={b} className="row" style={{ gap: "0.65rem", color: "var(--text-2)", fontSize: "0.95rem", lineHeight: 1.55 }}>
                    <Icon name="check" size={14} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 4 }} />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>Outcome</div>
              <p className="text-2" style={{ fontSize: "1.05rem", lineHeight: 1.75 }}>
                Shipped on time, hit Lighthouse 95+, and the client team owns the codebase. Project is still in active production at the time of writing.
              </p>
            </div>
            <aside>
              <div className="card" style={{ padding: "1.5rem", position: "sticky", top: "5.5rem" }}>
                <div className="eyebrow" style={{ marginBottom: "1rem" }}>Tech used</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                  {project.tech.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="divider" style={{ margin: "1rem 0 1.25rem" }} />
                <div className="eyebrow" style={{ marginBottom: "0.75rem" }}>Links</div>
                <div className="stack" style={{ gap: "0.5rem" }}>
                  <a href={project.live} className="row" style={{ justifyContent: "space-between", padding: "0.65rem 0.85rem", borderRadius: 8, border: "1px solid var(--border)" }}>
                    <span className="row" style={{ gap: "0.5rem" }}><Icon name="external" size={13} /> Live demo</span>
                    <Icon name="arrow-up-right" size={12} />
                  </a>
                  <a href={project.repo} className="row" style={{ justifyContent: "space-between", padding: "0.65rem 0.85rem", borderRadius: 8, border: "1px solid var(--border)" }}>
                    <span className="row" style={{ gap: "0.5rem" }}><Icon name="github" size={13} /> Repository</span>
                    <Icon name="arrow-up-right" size={12} />
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* gallery */}
          <div className="reveal" style={{ marginTop: "5rem" }}>
            <div className="eyebrow" style={{ marginBottom: "1.25rem" }}>Gallery</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Placeholder label="Dashboard" aspect="4/3" />
              <Placeholder label="Settings panel" aspect="4/3" />
              <Placeholder label="Mobile view" aspect="4/3" />
              <Placeholder label="Reports" aspect="4/3" />
            </div>
          </div>

          <style>{`
            @media (max-width: 880px) {
              [class2="detail-grid"] { grid-template-columns: 1fr !important; }
              [class2="meta-strip"] { grid-template-columns: 1fr 1fr !important; }
              [class2="meta-strip"] > div:nth-child(2) { border-right: none !important; }
              [class2="meta-strip"] > div:nth-child(1),
              [class2="meta-strip"] > div:nth-child(2) { border-bottom: 1px solid var(--border); }
            }
          `}</style>
        </div>
      </section>

      {/* Related projects */}
      <section className="section">
        <div className="shell">
          <SectionHead eyebrow="More work" title="Related projects" sub="Other things I've shipped recently." />
          <div className="grid-3">
            {!related
              ? [...Array(3)].map((_, i) => <SkeletonProjectCard key={i} />)
              : related.map((p, i) => <ProjectCard key={p.slug} p={p} delay={i * 0.05} />)}
          </div>
        </div>
      </section>
    </main>
  );
};

const BlogsPage = () => {
  useReveal();
  const all = useFakeFetch(BLOGS, 700);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const filtered = useMemo(() => {
    if (!all) return null;
    return all.filter((b) =>
      (cat === "All" || b.cat === cat) &&
      (q === "" || (b.title + " " + b.excerpt + " " + b.tags.join(" ")).toLowerCase().includes(q.toLowerCase()))
    );
  }, [all, cat, q]);

  const pageData = filtered ? filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE) : null;
  const totalPages = filtered ? Math.max(1, Math.ceil(filtered.length / PER_PAGE)) : 1;

  return (
    <main className="page-anim">
      <PageIntro eyebrow="Blog" title="Field notes." sub="Stuff I've learned the hard way, written down so I don't forget. Mostly Laravel, Next.js, and devops." />

      <section className="section-tight" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
        <div className="shell">
          <div className="card" style={{ padding: "1rem 1.15rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
              <Icon name="search" size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
              <input className="input" placeholder="Search articles…" style={{ paddingLeft: "2.5rem" }} value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
            </div>
          </div>
          <div className="row-wrap" style={{ marginTop: "1.25rem", gap: "0.4rem" }}>
            {BLOG_CATEGORIES.map((c) => (
              <button key={c} className={`tag ${cat === c ? "tag-accent" : ""}`}
                onClick={() => { setCat(c); setPage(1); }} style={{ cursor: "pointer", padding: "0.45rem 0.9rem", fontSize: "0.85rem" }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="shell">
          {!pageData ? (
            <div className="grid-3">{[...Array(6)].map((_, i) => <SkeletonBlogCard key={i} />)}</div>
          ) : pageData.length === 0 ? (
            <Empty title="No matching articles" sub="Try a different category or search term." />
          ) : (
            <>
              <div className="grid-3">
                {pageData.map((b, i) => <BlogCard key={b.slug} b={b} delay={(i % 3) * 0.05} />)}
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="row" style={{ justifyContent: "center", marginTop: "3rem", gap: "0.4rem" }}>
                  <button className="btn-icon" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}><Icon name="arrow-left" size={14} /></button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i} className={`tag ${page === i + 1 ? "tag-accent" : ""}`} onClick={() => setPage(i + 1)} style={{ cursor: "pointer", padding: "0.45rem 0.85rem", fontFamily: "var(--font-mono)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </button>
                  ))}
                  <button className="btn-icon" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}><Icon name="arrow-right" size={14} /></button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

const BlogDetailPage = ({ slug }) => {
  useReveal();
  const blog = useFakeFetch(BLOGS.find((b) => b.slug === slug), 600, [slug]);
  const more = useFakeFetch(BLOGS.filter((b) => b.slug !== slug).slice(0, 3), 800, [slug]);

  if (!blog) {
    return (
      <main className="page-anim">
        <section className="section" style={{ paddingTop: "9rem" }}>
          <div className="shell" style={{ maxWidth: 760 }}>
            <Skeleton w="30%" h="1rem" /><div style={{ height: 12 }} />
            <Skeleton w="100%" h="3rem" /><div style={{ height: 12 }} />
            <Skeleton w="80%" h="3rem" /><div style={{ height: 24 }} />
            <Skeleton w="100%" h="320px" /><div style={{ height: 24 }} />
            {[...Array(6)].map((_, i) => <><Skeleton key={i} w="100%" h="1rem" /><div style={{ height: 8 }} /></>)}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-anim">
      <article className="section" style={{ paddingTop: "9rem" }}>
        <div className="shell" style={{ maxWidth: 760 }}>
          <a href="#/blogs" className="mono muted" style={{ fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "2rem" }}>
            <Icon name="arrow-left" size={13} /> Back to blog
          </a>
          <div className="row-wrap reveal" style={{ gap: "0.5rem", marginBottom: "1rem" }}>
            <span className="tag tag-accent">{blog.cat}</span>
            {blog.tags.map((t) => <span key={t} className="tag">#{t}</span>)}
          </div>
          <h1 className="h-1 reveal text-grad" style={{ marginBottom: "1.5rem", "--reveal-delay": "0.05s" }}>{blog.title}</h1>
          <div className="row reveal" style={{ gap: "1.5rem", marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)", "--reveal-delay": "0.1s" }}>
            <div className="row" style={{ gap: "0.65rem" }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-line)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.85rem" }}>MAZ</div>
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 500 }}>Mahfuz Ahmed</div>
                <div className="mono muted" style={{ fontSize: "0.72rem" }}>Author</div>
              </div>
            </div>
            <span className="muted mono" style={{ fontSize: "0.78rem", display: "flex", alignItems: "center", gap: "0.35rem" }}><Icon name="calendar" size={11} /> {blog.date}</span>
            <span className="muted mono" style={{ fontSize: "0.78rem", display: "flex", alignItems: "center", gap: "0.35rem" }}><Icon name="clock" size={11} /> {blog.read}</span>
          </div>

          <div className="reveal" style={{ marginBottom: "2.5rem" }}>
            <Placeholder label={`Cover — ${blog.cat}`} aspect="16/9" />
          </div>

          <div className="prose reveal" style={{ "--reveal-delay": "0.05s" }}>
            <p>{blog.excerpt}</p>
            <p>This is a sample article body that would be rendered from MDX or a rich-text editor on the live site. Headings, lists, code blocks, callouts and images all live here. The published version is editable from the admin dashboard, with a Tiptap-style editor that supports keyboard shortcuts, markdown paste, and inline images.</p>

            <h2>The pattern</h2>
            <p>Take any controller method that's grown beyond a single screen. Move it into a class. Inject the dependencies. Now it's testable, reusable, and the route file stays scannable. That's the whole pitch.</p>
            <pre><code>{`// app/Http/Controllers/PostController.php
class PostController extends Controller {
    public function store(StorePost $action, StorePostRequest $req) {
        return $action->execute($req->validated());
    }
}`}</code></pre>

            <h2>Why it stuck</h2>
            <ul>
              <li>Each action does exactly one thing — easy to name, easy to grep.</li>
              <li>Validation lives in form requests, business rules live in the action.</li>
              <li>Pulling logic out of controllers makes them effectively glue code.</li>
              <li>You can call actions from jobs, console commands, and tests with the same signature.</li>
            </ul>

            <blockquote>The best refactor is the one you don't have to do, because the structure made the right shape obvious.</blockquote>

            <h2>What I'd do differently</h2>
            <p>Be ruthless about file naming — one verb, one noun. Don't reach for actions when a simple service method will do; the goal is clarity, not pattern-purity. Keep your test boundary at the action, not the route.</p>

            <p>I've been running this pattern across every Laravel project I've touched in the last 12 months. It hasn't failed me yet.</p>
          </div>

          <div className="reveal" style={{ marginTop: "3rem", padding: "2rem", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            <div className="row" style={{ gap: "1rem", flexWrap: "wrap", justifyContent: "space-between" }}>
              <div className="row" style={{ gap: "0.6rem" }}>
                <span className="muted mono" style={{ fontSize: "0.78rem" }}>Share —</span>
                {["twitter", "linkedin", "facebook"].map((s) => (
                  <a key={s} href="#" className="btn-icon" aria-label={s}><Icon name={s} size={13} /></a>
                ))}
              </div>
              <div className="row" style={{ gap: "0.5rem" }}>
                <span className="muted mono" style={{ fontSize: "0.78rem" }}>Tags —</span>
                {blog.tags.map((t) => <span key={t} className="tag">#{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="section">
        <div className="shell">
          <SectionHead eyebrow="More writing" title="Keep reading" />
          <div className="grid-3">
            {!more
              ? [...Array(3)].map((_, i) => <SkeletonBlogCard key={i} />)
              : more.map((b, i) => <BlogCard key={b.slug} b={b} delay={i * 0.05} />)}
          </div>
        </div>
      </section>

      <style>{`
        .prose { font-size: 1.06rem; line-height: 1.75; color: var(--text-2); }
        .prose p { margin: 1.25rem 0; }
        .prose h2 { font-family: var(--font-display); font-size: 1.6rem; font-weight: 500; letter-spacing: -0.02em; color: var(--text); margin: 2.5rem 0 1rem; }
        .prose ul { padding-left: 1.25rem; margin: 1.25rem 0; }
        .prose li { margin: 0.5rem 0; }
        .prose pre { background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1.25rem; overflow-x: auto; font-family: var(--font-mono); font-size: 0.88rem; line-height: 1.6; color: var(--text); margin: 1.5rem 0; }
        .prose blockquote { border-left: 2px solid var(--accent); padding: 0.5rem 0 0.5rem 1.25rem; margin: 1.5rem 0; color: var(--text); font-style: italic; }
      `}</style>
    </main>
  );
};

Object.assign(window, { ProjectsPage, ProjectDetailPage, BlogsPage, BlogDetailPage });
