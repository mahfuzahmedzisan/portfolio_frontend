"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export function CardShine() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    parent.addEventListener("mousemove", onMove);
    return () => parent.removeEventListener("mousemove", onMove);
  }, []);
  return <div ref={ref} className="card-shine" />;
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  action,
}: {
  eyebrow?: string;
  title?: string;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <div className="sec-head reveal">
      <div className="stack">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        {title ? <h2 className="h-1 text-grad">{title}</h2> : null}
        {sub ? <p>{sub}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <header className="page-intro shell">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h1 className="h-1 text-grad">{title}</h1>
      {sub ? <p>{sub}</p> : null}
    </header>
  );
}

export function Placeholder({
  label = "image",
  height = "200px",
  aspect,
}: {
  label?: string;
  height?: string;
  aspect?: string;
}) {
  return (
    <div
      className="placeholder"
      style={{ height: aspect ? "auto" : height, aspectRatio: aspect }}
    >
      <span>{label}</span>
    </div>
  );
}

export function Empty({
  title = "Nothing here yet",
  sub,
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <div
      className="card"
      style={{ textAlign: "center", padding: "3rem 1.5rem" }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: "var(--accent-soft)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1rem",
          color: "var(--accent)",
          border: "1px solid var(--accent-line)",
        }}
      >
        {/* search icon inline to avoid circular import if Empty used without Icon parent */}
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </div>
      <div className="h-3" style={{ marginBottom: "0.5rem" }}>
        {title}
      </div>
      {sub ? (
        <p className="muted" style={{ maxWidth: 380, margin: "0 auto" }}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}

export function Skeleton({
  w = "100%",
  h = "1rem",
  r = "8px",
  style,
}: {
  w?: string;
  h?: string;
  r?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="skeleton" style={{ width: w, height: h, borderRadius: r, ...style }} />
  );
}
