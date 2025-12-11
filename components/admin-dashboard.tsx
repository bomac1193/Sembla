"use client";

import useSWR from "swr";
import { Download, RefreshCcw } from "lucide-react";

type Upload = {
  id: string;
  email?: string | null;
  vibe?: string | null;
  skin_tone?: string | null;
  gender?: string | null;
  output_url?: string | null;
  license_token?: string | null;
  qr_campaign?: string | null;
  consent_name?: string | null;
  created_at?: string | null;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PLACEHOLDER =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80";

const fallbackUploads: Upload[] = [
  {
    id: "demo-1",
    email: "demo@sembla.ai",
    vibe: "edgy",
    skin_tone: "olive",
    gender: "androgynous",
    output_url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80",
    license_token: "demo-license",
    qr_campaign: "organic",
    consent_name: "Demo User",
    created_at: new Date().toISOString()
  }
];

export default function AdminDashboard() {
  const { data, isLoading, mutate } = useSWR("/api/admin/uploads", fetcher, { refreshInterval: 30_000 });
  const uploads: Upload[] = data?.uploads ?? fallbackUploads;

  const exportCsv = () => {
    const header = "id,email,vibe,skin_tone,gender,output_url,license_token,qr_campaign,consent_name,created_at";
    const rows = uploads
      .map((u) =>
        [
          u.id,
          u.email,
          u.vibe,
          u.skin_tone,
          u.gender,
          u.output_url,
          u.license_token,
          u.qr_campaign,
          u.consent_name,
          u.created_at
        ]
          .map((value) => `"${(value ?? "").toString().replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");
    const csv = `${header}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sembla-licenses.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card p-4 lg:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/60">Live</p>
          <p className="text-sm text-white/70">
            {data?.uploads ? `${data.uploads.length} records` : "Demo data until Supabase is configured"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => mutate()}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-sm text-white/80 hover:border-white/35"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </button>
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-ink hover:bg-accent-deep"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="min-w-full text-sm text-white/80">
          <thead className="bg-white/5 uppercase tracking-[0.12em] text-xs text-white/60">
            <tr>
              <th className="px-4 py-3 text-left">Avatar</th>
              <th className="px-4 py-3 text-left">Vibe</th>
              <th className="px-4 py-3 text-left">License</th>
              <th className="px-4 py-3 text-left">QR</th>
              <th className="px-4 py-3 text-left">Consent</th>
              <th className="px-4 py-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((upload) => (
              <tr key={upload.id} className="border-t border-white/10">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-10 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={upload.output_url ?? PLACEHOLDER}
                        alt="avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{upload.email || "anon"}</p>
                      <p className="text-xs text-white/50">{upload.gender}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-white/70">
                  {upload.vibe}
                  <span className="block text-xs text-white/50">{upload.skin_tone}</span>
                </td>
                <td className="px-4 py-3 font-mono text-xs">{upload.license_token}</td>
                <td className="px-4 py-3 text-white/70">{upload.qr_campaign}</td>
                <td className="px-4 py-3 text-white/70">{upload.consent_name || "N/A"}</td>
                <td className="px-4 py-3 text-white/60">{formatDate(upload.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isLoading ? <p className="text-sm text-white/60">Loading live data…</p> : null}
    </div>
  );
}

function formatDate(value?: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
