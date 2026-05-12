export function Logo({ size = "1.05rem" }: { size?: string }) {
  return (
    <span className="nav-logo" style={{ fontSize: size }}>
      <span>maz</span>
      <span className="nav-logo-dot" />
      <span style={{ marginLeft: "1px" }} />
    </span>
  );
}
