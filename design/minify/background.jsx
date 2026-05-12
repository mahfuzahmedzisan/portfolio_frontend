// background.jsx — animated tron-grid floor + flowing light streaks

const Background = ({ motion = "grid-streaks" }) => {
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    if (motion === "static") return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf, t = 0;
    const loop = () => {
      t += 0.6;
      wrap.style.setProperty("--scroll", t + "px");
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [motion]);

  if (motion === "static") {
    return (
      <div className="bg-root" aria-hidden="true">
        <div className="bg-vignette" />
      </div>
    );
  }

  if (motion === "particles") {
    return (
      <div className="bg-root" aria-hidden="true">
        <div className="bg-particles">
          {Array.from({ length: 36 }).map((_, i) => (
            <span key={i} style={{
              left: `${(i * 137) % 100}%`,
              top: `${(i * 73) % 100}%`,
              animationDelay: `${(i * 0.4) % 8}s`,
              animationDuration: `${10 + (i % 6) * 2}s`,
            }} />
          ))}
        </div>
        <div className="bg-vignette" />
      </div>
    );
  }

  if (motion === "blobs") {
    return (
      <div className="bg-root" aria-hidden="true">
        <div className="bg-blobs">
          <span className="b1" />
          <span className="b2" />
          <span className="b3" />
        </div>
        <div className="bg-vignette" />
      </div>
    );
  }

  // default: grid-streaks (perspective road + flowing lines)
  return (
    <div className="bg-root" ref={wrapRef} aria-hidden="true">
      <div className="bg-grid-top">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="streak" style={{
            left: `${(i * 7.3) % 100}%`,
            animationDelay: `${(i * 0.7) % 9}s`,
            animationDuration: `${6 + (i % 4) * 1.2}s`,
            opacity: 0.4 + (i % 3) * 0.2,
          }} />
        ))}
      </div>
      <div className="bg-grid-floor">
        <div className="bg-grid-plane" />
        <div className="bg-streaks-floor">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="floor-streak" style={{
              left: `${10 + (i * 9) % 80}%`,
              animationDelay: `${(i * 0.8) % 7}s`,
              animationDuration: `${4 + (i % 3) * 0.8}s`,
            }} />
          ))}
        </div>
      </div>
      <div className="bg-vignette" />
    </div>
  );
};

const BG_STYLE = `
.bg-root{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;background:var(--bg)}
.bg-vignette{position:absolute;inset:0;background:
  radial-gradient(80% 60% at 50% 35%, transparent 0%, var(--bg) 75%),
  linear-gradient(180deg, transparent 50%, var(--bg) 95%);
  pointer-events:none}

/* perspective floor */
.bg-grid-floor{position:absolute;left:50%;bottom:-5%;width:280%;height:65%;
  transform:translateX(-50%) perspective(900px) rotateX(62deg);
  transform-origin:50% 0%}
.bg-grid-plane{position:absolute;inset:0;
  background-image:
    linear-gradient(to right, var(--grid) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-strong) 1px, transparent 1px);
  background-size:80px 80px;
  background-position: 0 calc(var(--scroll, 0px));
  mask-image:radial-gradient(ellipse 70% 80% at 50% 0%, #000 30%, transparent 70%);
  -webkit-mask-image:radial-gradient(ellipse 70% 80% at 50% 0%, #000 30%, transparent 70%)}

.bg-streaks-floor{position:absolute;inset:0;mask-image:radial-gradient(ellipse 70% 80% at 50% 0%, #000 30%, transparent 70%);
  -webkit-mask-image:radial-gradient(ellipse 70% 80% at 50% 0%, #000 30%, transparent 70%)}
.floor-streak{position:absolute;top:-10%;width:2px;height:18%;
  background:linear-gradient(180deg, transparent, var(--accent) 80%, transparent);
  filter:blur(0.5px);
  box-shadow:0 0 12px var(--accent-glow);
  animation:floorStreak linear infinite}
@keyframes floorStreak{
  0%{transform:translateY(0) scaleY(0.6);opacity:0}
  10%{opacity:1}
  90%{opacity:1}
  100%{transform:translateY(420%) scaleY(1.6);opacity:0}
}

/* top grid (subtle) */
.bg-grid-top{position:absolute;inset:0;
  background-image:
    linear-gradient(to right, var(--grid) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid) 1px, transparent 1px);
  background-size:60px 60px;
  mask-image:radial-gradient(ellipse 100% 60% at 50% 0%, #000, transparent 70%);
  -webkit-mask-image:radial-gradient(ellipse 100% 60% at 50% 0%, #000, transparent 70%);
  opacity:0.6}
.streak{position:absolute;top:-10%;width:1px;height:14%;
  background:linear-gradient(180deg, transparent, var(--accent) 50%, transparent);
  box-shadow:0 0 10px var(--accent-glow);
  animation:streakFall linear infinite}
@keyframes streakFall{
  0%{transform:translateY(0);opacity:0}
  15%{opacity:1}
  85%{opacity:1}
  100%{transform:translateY(900%);opacity:0}
}

/* particles */
.bg-particles{position:absolute;inset:0}
.bg-particles span{position:absolute;width:2px;height:2px;border-radius:50%;
  background:var(--accent);box-shadow:0 0 8px var(--accent-glow);
  animation:floatUp linear infinite}
@keyframes floatUp{
  0%{transform:translateY(20vh) scale(0.4);opacity:0}
  10%{opacity:0.8}
  90%{opacity:0.8}
  100%{transform:translateY(-120vh) scale(1);opacity:0}
}

/* blobs */
.bg-blobs{position:absolute;inset:0;filter:blur(60px)}
.bg-blobs span{position:absolute;border-radius:50%;opacity:0.35}
.bg-blobs .b1{width:520px;height:520px;left:-10%;top:-10%;
  background:var(--accent);animation:drift1 22s ease-in-out infinite}
.bg-blobs .b2{width:420px;height:420px;right:-5%;top:30%;
  background:oklch(0.65 0.18 calc(var(--accent-h) + 60));animation:drift2 28s ease-in-out infinite}
.bg-blobs .b3{width:380px;height:380px;left:30%;bottom:-20%;
  background:oklch(0.72 0.16 calc(var(--accent-h) - 40));animation:drift3 26s ease-in-out infinite}
@keyframes drift1{50%{transform:translate(60px,40px) scale(1.1)}}
@keyframes drift2{50%{transform:translate(-50px,30px) scale(1.05)}}
@keyframes drift3{50%{transform:translate(40px,-50px) scale(1.08)}}

[data-theme="light"] .floor-streak,
[data-theme="light"] .streak{filter:blur(0.3px);opacity:0.6}
`;

window.Background = Background;
window.BG_STYLE = BG_STYLE;
