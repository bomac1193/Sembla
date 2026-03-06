import AdminDashboard from "@/components/admin-dashboard";

export default function AdminPage() {
  return (
    <main className="flex-1 px-6 pb-16 pt-12 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-platinum/60">Ops</p>
          <h1 className="font-canela-display text-[clamp(34px,4vw,48px)] leading-[0.96] tracking-[-0.04em] text-platinum">Admin dashboard</h1>
          <p className="text-sm text-platinum/70">
            Monitor uploads, consent, and QR performance. Export CSV for brand delivery.
          </p>
        </div>
        <AdminDashboard />
      </div>
    </main>
  );
}
