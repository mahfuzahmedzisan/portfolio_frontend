"use client";

import { useEffect, useRef } from "react";
import type { SiteSettings } from "@/lib/site-settings/types";

export function Background({ motion }: { motion: SiteSettings["motion"] }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (motion === "static") return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.6;
      wrap.style.setProperty("--scroll", `${t}px`);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [motion]);

  if (motion === "static") {
    return (
      <div className="bg-root" aria-hidden>
        <div className="bg-vignette" />
      </div>
    );
  }

  if (motion === "particles") {
    return (
      <div className="bg-root" aria-hidden>
        <div className="bg-particles">
          {Array.from({ length: 36 }).map((_, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `${(i * 137) % 100}%`,
                top: `${(i * 73) % 100}%`,
                animationDelay: `${(i * 0.4) % 8}s`,
                animationDuration: `${10 + (i % 6) * 2}s`,
              }}
            />
          ))}
        </div>
        <div className="bg-vignette" />
      </div>
    );
  }

  if (motion === "blobs") {
    return (
      <div className="bg-root" aria-hidden>
        <div className="bg-blobs">
          <span className="b1" />
          <span className="b2" />
          <span className="b3" />
        </div>
        <div className="bg-vignette" />
      </div>
    );
  }

  return (
    <div className="bg-root" ref={wrapRef} aria-hidden>
      <div className="bg-grid-top">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="streak"
            style={{
              position: "absolute",
              left: `${(i * 7.3) % 100}%`,
              animationDelay: `${(i * 0.7) % 9}s`,
              animationDuration: `${6 + (i % 4) * 1.2}s`,
              opacity: 0.4 + (i % 3) * 0.2,
            }}
          />
        ))}
      </div>
      <div className="bg-grid-floor">
        <div className="bg-grid-plane" />
        <div className="bg-streaks-floor">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="floor-streak"
              style={{
                position: "absolute",
                left: `${10 + (i * 9) % 80}%`,
                animationDelay: `${(i * 0.8) % 7}s`,
                animationDuration: `${4 + (i % 3) * 0.8}s`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="bg-vignette" />
    </div>
  );
}
