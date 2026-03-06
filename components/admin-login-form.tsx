"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const next = searchParams.get("next") ?? "/admin";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!configured) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode, next })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Access denied.");
        setSubmitting(false);
        return;
      }

      router.replace(data.redirectTo ?? "/admin");
      router.refresh();
    } catch {
      setError("Login failed.");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-[11px] uppercase tracking-[0.3em] text-platinum/35">
          Admin access
        </p>
        <h1 className="font-canela-display text-[clamp(34px,4vw,52px)] leading-[0.96] tracking-[-0.04em] text-platinum">
          Private ops login
        </h1>
        <p className="max-w-[36rem] text-[15px] leading-[1.8] text-platinum/58">
          Hidden for now. Use the admin access code to reach operations and edit controls.
        </p>
      </div>

      {!configured ? (
        <div className="border border-blood/25 bg-blood/5 p-5 text-[14px] leading-[1.8] text-platinum/68">
          Set <code className="font-mono text-[13px] text-platinum">ADMIN_ACCESS_CODE</code> and{" "}
          <code className="font-mono text-[13px] text-platinum">ADMIN_SESSION_TOKEN</code> before deployment.
          This is a lightweight gate, not a full auth system.
        </div>
      ) : (
        <form className="space-y-5 border border-platinum/10 p-6 sm:p-8" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-[11px] tracking-[0.18em] text-platinum/38">Access code</span>
            <input
              type="password"
              value={accessCode}
              onChange={(event) => setAccessCode(event.target.value)}
              className="w-full border border-platinum/15 bg-black px-4 py-3 text-[14px] text-platinum outline-none transition-colors focus:border-blood/40"
            />
          </label>

          {error ? (
            <p className="text-[13px] leading-[1.7] text-blood/80">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={!accessCode || submitting}
              className="border border-blood/50 px-8 py-4 text-[14px] tracking-[0.12em] text-blood transition-all hover:bg-blood hover:text-black disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-blood"
            >
              {submitting ? "Entering..." : "Enter admin"}
            </button>
            <p className="text-[13px] leading-[1.7] text-platinum/35">
              Replace or harden this gate before production launch.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
