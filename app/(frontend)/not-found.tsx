import Link from "next/link";
import { Icon } from "@/components/portfolio/icon";

export default function NotFound() {
  return (
    <main
      className="page-anim section"
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "8rem",
      }}
    >
      <div className="shell" style={{ textAlign: "center", maxWidth: 520 }}>
        <p className="eyebrow" style={{ marginBottom: "1rem" }}>
          404
        </p>
        <h1 className="h-display text-grad" style={{ marginBottom: "1rem", fontSize: "clamp(2rem, 5vw, 3rem)" }}>
          Lost in the grid.
        </h1>
        <p className="text-2 muted" style={{ marginBottom: "2rem", lineHeight: 1.65 }}>
          That route does not exist (yet). Head home or open the sitemap from the footer.
        </p>
        <Link href="/" className="btn btn-primary">
          <Icon name="arrow-left" size={14} /> Back home
        </Link>
      </div>
    </main>
  );
}
