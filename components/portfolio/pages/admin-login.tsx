"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { adminLoginAction, type AdminLoginState } from "@/app/actions/admin";
import { Icon } from "../icon";

const initial: AdminLoginState = { ok: true };

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" disabled={pending} style={{ width: "100%" }}>
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export function AdminLoginForm() {
  const [state, formAction] = useFormState(adminLoginAction, initial);

  return (
    <main
      className="page-anim"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div className="card" style={{ width: "100%", maxWidth: 400, padding: "2rem" }}>
        <div className="eyebrow" style={{ marginBottom: "0.5rem" }}>
          Admin
        </div>
        <h1 className="h-1 text-grad" style={{ marginBottom: "0.5rem", fontSize: "1.75rem" }}>
          Sign in
        </h1>
        <p className="muted text-2" style={{ marginBottom: "1.75rem", fontSize: "0.9rem" }}>
          Minimal gate: password from <span className="mono">ADMIN_PASSWORD</span>. Not full auth.
        </p>
        <form action={formAction} className="stack" style={{ gap: "1rem" }}>
          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="input"
              required
              autoComplete="current-password"
            />
          </div>
          {!state.ok ? (
            <p className="mono" style={{ color: "oklch(0.65 0.2 25)", fontSize: "0.85rem" }}>
              {state.error}
            </p>
          ) : null}
          <Submit />
        </form>
        <p style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link href="/" className="muted mono" style={{ fontSize: "0.82rem" }}>
            <Icon name="arrow-left" size={12} /> Back to site
          </Link>
        </p>
      </div>
    </main>
  );
}
