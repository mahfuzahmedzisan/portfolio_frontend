import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <h1>Frontend</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}
