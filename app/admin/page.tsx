import AdminDashboard from "@/components/admin-dashboard";

export default function AdminPage() {
  return (
    <main className="flex-1 px-6 pb-16 pt-12 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/60">Ops</p>
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-white/65">
            Monitor uploads, consent, and QR performance. Export CSV for brand delivery.
          </p>
        </div>
        <AdminDashboard />
      </div>
    </main>
  );
}
