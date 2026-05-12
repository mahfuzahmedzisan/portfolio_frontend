"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BLOGS, BLOG_CATEGORIES, type BlogPost } from "@/lib/content/site";
import { Icon } from "../icon";
import { PageIntro } from "../primitives";
import { useReveal } from "../use-reveal";
import { Empty } from "../primitives";
import { BlogCard } from "../cards";

export function BlogListPage() {
  useReveal();
  const [cat, setCat] = useState<(typeof BLOG_CATEGORIES)[number]>("All");
  const [q, setQ] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [shown, setShown] = useState(6);

  const filtered = useMemo(() => {
    return BLOGS.filter(
      (b) =>
        (cat === "All" || b.cat === cat) &&
        (!featuredOnly || b.featured) &&
        (q === "" ||
          `${b.title} ${b.excerpt} ${b.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase())),
    );
  }, [cat, q, featuredOnly]);

  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setShown((s) => Math.min(s + 6, filtered.length));
    });
    io.observe(el);
    return () => io.disconnect();
  }, [filtered]);

  return (
    <main className="page-anim">
      <PageIntro
        eyebrow={`Blog · ${BLOGS.length} posts`}
        title="Writing & notes."
        sub="Long-form thoughts on Laravel, Next.js, DevOps, and the path from student to paid engineer."
      />

      <section className="section-tight" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
        <div className="shell">
          <div
            className="card"
            style={{
              padding: "1rem 1.15rem",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
              <Icon
                name="search"
                size={15}
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--muted)",
                }}
              />
              <input
                className="input"
                placeholder="Search posts…"
                style={{ paddingLeft: "2.5rem" }}
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <button
              type="button"
              className={`tag ${featuredOnly ? "tag-accent" : ""}`}
              onClick={() => setFeaturedOnly((v) => !v)}
              style={{ cursor: "pointer", padding: "0.5rem 0.85rem", fontSize: "0.82rem" }}
            >
              ★ Featured only
            </button>
          </div>

          <div className="row-wrap" style={{ marginTop: "1.25rem", gap: "0.4rem" }}>
            {BLOG_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`tag ${cat === c ? "tag-accent" : ""}`}
                onClick={() => setCat(c)}
                style={{ cursor: "pointer", padding: "0.45rem 0.9rem", fontSize: "0.85rem" }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="shell">
          {filtered.length === 0 ? (
            <Empty title="No matching posts" sub="Try another category or search term." />
          ) : (
            <>
              <div className="grid-3">
                {filtered.slice(0, shown).map((b, i) => (
                  <BlogCard key={b.slug} b={b} delay={(i % 3) * 0.05} />
                ))}
              </div>
              {shown < filtered.length ? (
                <div ref={sentinelRef} style={{ marginTop: "2rem", textAlign: "center" }}>
                  <div className="row" style={{ justifyContent: "center", gap: "0.5rem", color: "var(--muted)" }}>
                    <span className="skeleton" style={{ width: 12, height: 12, borderRadius: "50%" }} />
                    <span className="mono" style={{ fontSize: "0.8rem" }}>
                      Loading more…
                    </span>
                  </div>
                </div>
              ) : null}
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
}

export function BlogDetailPage({ post }: { post: BlogPost }) {
  useReveal();
  const related = BLOGS.filter((b) => b.slug !== post.slug).slice(0, 3);

  return (
    <main className="page-anim">
      <article className="section" style={{ paddingTop: "9rem" }}>
        <div className="shell" style={{ maxWidth: 760 }}>
          <Link
            href="/blog"
            className="mono muted"
            style={{
              fontSize: "0.85rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "2rem",
            }}
          >
            <Icon name="arrow-left" size={13} /> All posts
          </Link>
          <div className="row-wrap reveal" style={{ gap: "0.5rem", marginBottom: "1rem" }}>
            <span className="tag tag-accent">{post.cat}</span>
            <span className="tag mono">{post.date}</span>
            <span className="tag mono">{post.read}</span>
            {post.featured ? <span className="tag tag-accent">★ Featured</span> : null}
          </div>
          <h1
            className="h-display reveal text-grad"
            style={{ marginBottom: "1.5rem", fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.1 }}
          >
            {post.title}
          </h1>
          <p
            className="reveal text-2"
            style={
              {
                fontSize: "1.15rem",
                lineHeight: 1.65,
                marginBottom: "2rem",
                "--reveal-delay": "0.08s",
              } as CSSProperties
            }
          >
            {post.excerpt}
          </p>
          <div className="row-wrap reveal" style={{ gap: "0.4rem", marginBottom: "2.5rem" } as CSSProperties}>
            {post.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div
            className="reveal prose-block"
            style={
              {
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "var(--text-2)",
                "--reveal-delay": "0.12s",
              } as CSSProperties
            }
          >
            <p>
              This is a static portfolio build — there is no CMS-backed article body yet. The excerpt
              above captures the thesis; below is placeholder structure so the layout matches the design
              prototype.
            </p>
            <p>
              If you wire MDX or a headless CMS later, swap this block for rendered markdown and keep the
              same typographic rhythm: comfortable line height, subtle muted body copy, and clear hierarchy
              between intro and sections.
            </p>
            <h2 className="h-2" style={{ marginTop: "2.5rem", marginBottom: "1rem", color: "var(--text)" }}>
              Key takeaways
            </h2>
            <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li>Ship small slices and validate with real users early.</li>
              <li>Prefer boring, well-understood infrastructure over novelty.</li>
              <li>Document decisions so your future self does not guess intent.</li>
            </ul>
          </div>
        </div>
      </article>

      <section className="section">
        <div className="shell">
          <div className="sec-head reveal">
            <div className="stack">
              <span className="eyebrow">Read next</span>
              <h2 className="h-1 text-grad">More from the blog</h2>
            </div>
          </div>
          <div className="grid-3">
            {related.map((b, i) => (
              <BlogCard key={b.slug} b={b} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
