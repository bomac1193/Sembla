import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Camera, Cpu, Shield, Sparkles } from "lucide-react";

const stats = [
  { label: "Model-Grade Renders", value: "4K+" },
  { label: "Consent-Backed", value: "100%" },
  { label: "Turnaround", value: "<60s" }
];

export default function LandingPage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden px-6 py-20 sm:py-28 lg:px-16">
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.28em]">
              <span className="tag">SEMBLA</span>
              <span className="tag">Face Value</span>
            </div>
            <div className="space-y-6">
              <p className="text-5xl sm:text-6xl font-semibold leading-[1.05] glitch">
                Face Value.
              </p>
              <p className="text-lg text-white/70 max-w-2xl">
                Global model AI-gency. Capture a selfie, sign consent, and spin up
                a licensable, watermark-safe avatar in seconds. Designed for brand
                scouting, creator collabs, and rapid campaign testing.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-ink font-semibold transition hover:-translate-y-0.5 hover:bg-accent-deep"
              >
                Enter
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm text-white/80 hover:border-white/40"
              >
                Admin / Ops
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((item) => (
                <div key={item.label} className="card px-4 py-3">
                  <p className="text-xl font-semibold">{item.value}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="card relative overflow-hidden border-white/15 bg-gradient-to-br from-white/5 via-chrome/80 to-black/60 p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-white/5" />
            <div className="relative flex flex-col gap-6">
              <p className="uppercase tracking-[0.28em] text-xs text-white/60">Pipeline</p>
              <div className="space-y-4">
                <Feature icon={<Camera />} title="Selfie intake">
                  Live preview, face detection overlay, and consent capture.
                </Feature>
                <Feature icon={<Cpu />} title="Model spin-up">
                  Replicate-powered render jobs with SDXL / StyleGAN presets and QR-tagged runs.
                </Feature>
                <Feature icon={<Shield />} title="Governance">
                  UUID license token, watermark, and Supabase-backed audit trail.
                </Feature>
                <Feature icon={<Sparkles />} title="Share">
                  Export to TikTok/IG, bookable CTA, and Discord alerts for new avatars.
                </Feature>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-white/70">
                  Scan QR campaigns with <span className="font-semibold">?qr=</span> params
                  to attribute signups and renders per channel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10">
        <span className="text-accent">{icon}</span>
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-white/60">{children}</p>
      </div>
    </div>
  );
}
