import Link from "next/link";
import { cookies } from "next/headers";
import AdminDashboard from "@/components/admin-dashboard";
import AdminLoginForm from "@/components/admin-login-form";
import { ADMIN_COOKIE_NAME, hasAdminConfig, isAdminSessionToken } from "@/lib/admin";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = isAdminSessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  const configured = hasAdminConfig();

  return (
    <main className="min-h-screen bg-black px-6 pb-20 pt-24 text-platinum sm:px-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between gap-6 border-b border-platinum/10 pb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-platinum/35">Ops</p>
            <h1 className="mt-3 font-canela-display text-[clamp(34px,4vw,52px)] leading-[0.96] tracking-[-0.04em] text-platinum">
              Admin
            </h1>
          </div>
          <Link
            href="/"
            className="text-[12px] tracking-[0.14em] text-platinum/35 transition-colors hover:text-platinum"
          >
            Return to site
          </Link>
        </div>

        {isAuthenticated ? (
          <>
            <div className="grid gap-px bg-platinum/10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="bg-black px-6 py-6 sm:px-8">
                <p className="text-[11px] uppercase tracking-[0.3em] text-platinum/35">Access</p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/roster/upload"
                    className="border border-blood/50 px-6 py-3 text-[13px] tracking-[0.12em] text-blood transition-all hover:bg-blood hover:text-black"
                  >
                    Open roster ops
                  </Link>
                  <Link
                    href="/admin/passports"
                    className="border border-platinum/20 px-6 py-3 text-[13px] tracking-[0.12em] text-platinum/70 transition-colors hover:border-blood hover:text-blood"
                  >
                    Open passport ops
                  </Link>
                  <Link
                    href="/models"
                    className="text-[13px] tracking-[0.12em] text-platinum/40 transition-colors hover:text-platinum"
                  >
                    Open selected talent
                  </Link>
                </div>
              </div>

              <div className="bg-black px-6 py-6 sm:px-8">
                <p className="text-[11px] uppercase tracking-[0.3em] text-platinum/35">Reminder</p>
                <p className="mt-4 max-w-[34rem] text-[14px] leading-[1.8] text-platinum/58">
                  This keeps admin out of the public site for now, but it is still a lightweight gate.
                  Before deployment, replace or harden this auth flow and confirm secure admin env values are set.
                </p>
                <form action="/api/admin/logout" method="post" className="mt-5">
                  <button
                    type="submit"
                    className="text-[12px] tracking-[0.14em] text-platinum/35 transition-colors hover:text-platinum"
                  >
                    Log out
                  </button>
                </form>
              </div>
            </div>

            <AdminDashboard />
          </>
        ) : (
          <AdminLoginForm configured={configured} />
        )}
      </div>
    </main>
  );
}
