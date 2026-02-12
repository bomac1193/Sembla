"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const roster = [
  {
    name: "NANO-01",
    discipline: "DJ / Visual Artist",
    city: "Paris",
    token: "FX-91A",
    image: "/models/model-a.png",
    status: "Available"
  },
  {
    name: "NANO-02",
    discipline: "DJ / Model",
    city: "New York",
    token: "FX-17C",
    image: "/models/model-b.png",
    status: "Booked"
  },
  {
    name: "NANO-03",
    discipline: "Producer / Model",
    city: "Tokyo",
    token: "FX-44B",
    image: "/models/model-c.png",
    status: "Available"
  },
  {
    name: "NANO-04",
    discipline: "DJ / Creative Director",
    city: "Berlin",
    token: "FX-28D",
    image: "/models/model-d.png",
    status: "Available"
  },
  {
    name: "NANO-06",
    discipline: "DJ / Model",
    city: "Milan",
    token: "FX-75F",
    image: "/models/model-f.png",
    status: "On Hold"
  }
];

export default function LandingPage() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowNav(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-black text-platinum editorial-scroll">
      {showNav && <NavBar />}

      {/* ── HERO ── */}
      <section className="relative h-screen flex flex-col justify-end pb-16 px-6 sm:px-12 editorial-section overflow-hidden">
        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="scan-line w-full" />
        </div>

        <div className="relative z-10 max-w-[1400px]">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-2 bg-blood badge-glow" />
            <span className="text-[11px] uppercase tracking-[0.5em] text-platinum/50 font-mono">
              Exclusive Digital Agency
            </span>
          </div>

          <h1 className="text-[clamp(60px,12vw,200px)] font-black uppercase leading-[0.85] tracking-tight">
            SEMBLA
          </h1>

          <div className="mt-8 flex items-center gap-8">
            <div className="rule flex-1 max-w-[200px]" />
            <p className="text-[14px] sm:text-[16px] uppercase tracking-[0.4em] text-platinum/60">
              Supermodel DJs &middot; AI Likeness &middot; Consent-as-Code
            </p>
          </div>

          <p className="mt-12 text-[18px] sm:text-[22px] leading-relaxed text-platinum/50 max-w-2xl font-legal">
            We represent a curated roster of supermodel DJs whose digital likeness
            is licensed exclusively through auditable consent chains. Not an open
            marketplace. An agency.
          </p>

          <div className="mt-12 flex items-center gap-6">
            <Link
              href="/models"
              className="border border-platinum/40 px-8 py-4 text-[13px] uppercase tracking-[0.4em] hover:border-blood hover:text-blood transition-colors"
            >
              View Roster
            </Link>
            <Link
              href="#inquiry"
              className="text-[13px] uppercase tracking-[0.4em] text-platinum/40 hover:text-platinum transition-colors"
            >
              Brand Inquiry &rarr;
            </Link>
          </div>
        </div>

        {/* Bottom index */}
        <div className="absolute bottom-6 right-6 sm:right-12 text-[11px] font-mono text-platinum/20 uppercase tracking-[0.3em]">
          {roster.length} on roster
        </div>
      </section>

      {/* ── ROSTER PREVIEW ── */}
      {roster.map((model, idx) => (
        <ModelSection key={model.token} model={model} index={idx + 1} />
      ))}

      {/* ── FOR BRANDS ── */}
      <section id="inquiry" className="min-h-screen flex items-center editorial-section border-t border-platinum/5">
        <div className="w-full px-6 sm:px-12 py-24 max-w-[1400px]">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-2 h-2 bg-platinum/30" />
            <span className="text-[11px] uppercase tracking-[0.5em] text-platinum/40 font-mono">
              For Brands &amp; Agencies
            </span>
          </div>

          <h2 className="text-[clamp(36px,6vw,80px)] font-black uppercase leading-[0.9]">
            License a face.<br />
            <span className="text-platinum/30">Not a stock photo.</span>
          </h2>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-px bg-platinum/10">
            {[
              {
                title: "Auditable Consent",
                desc: "Every avatar carries a signed consent JSON — signer, timestamp, rights granted, campaign attribution. Immutable."
              },
              {
                title: "Provenance Chain",
                desc: "From selfie to generated asset: full chain-of-custody. License token, watermark, revocation capability."
              },
              {
                title: "Direct Economics",
                desc: "Zero commission. Models set rates. Same-day settlement in EUR or USDC. No intermediary markup."
              }
            ].map((item) => (
              <div key={item.title} className="bg-black p-8 lg:p-12">
                <p className="text-[13px] uppercase tracking-[0.4em] text-blood mb-4">{item.title}</p>
                <p className="text-[15px] text-platinum/60 leading-relaxed font-legal">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <a
              href="mailto:hello@sembla.agency"
              className="inline-block border border-blood/50 px-10 py-5 text-[13px] uppercase tracking-[0.4em] text-blood hover:bg-blood hover:text-black transition-all"
            >
              Request Access
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ModelSection({ model, index }: { model: typeof roster[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="editorial-section border-t border-platinum/5 relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Image — takes full height on mobile, 8 cols on desktop */}
        <div className="lg:col-span-7 relative h-[70vh] lg:h-auto overflow-hidden bg-smoke">
          <img
            src={model.image}
            alt={model.name}
            className={`model-portrait w-full h-full transition-all duration-1000 ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
          {/* Gradient overlay bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black" />

          {/* Index number overlay */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
            <span className="index-num text-[11px] font-mono text-platinum/30 uppercase tracking-[0.3em]">
              {String(index).padStart(2, "0")} / {String(roster.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Details — vertical centered on right */}
        <div className="lg:col-span-5 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 lg:py-24">
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            {/* Status badge */}
            <div className="flex items-center gap-3">
              <div className={`w-1.5 h-1.5 ${
                model.status === "Available" ? "bg-green-500" :
                model.status === "Booked" ? "bg-blood" : "bg-yellow-500"
              }`} />
              <span className="text-[11px] uppercase tracking-[0.5em] text-platinum/40 font-mono">
                {model.status}
              </span>
            </div>

            {/* Name */}
            <h2 className="text-[clamp(36px,5vw,72px)] font-black uppercase leading-[0.9] tracking-tight">
              {model.name}
            </h2>

            {/* Discipline */}
            <p className="text-[16px] sm:text-[18px] uppercase tracking-[0.3em] text-platinum/50">
              {model.discipline}
            </p>

            {/* Metadata */}
            <div className="space-y-3 pt-4 border-t border-platinum/10">
              <div className="flex justify-between text-[12px] uppercase tracking-[0.3em]">
                <span className="text-platinum/40">City</span>
                <span className="text-platinum/70">{model.city}</span>
              </div>
              <div className="flex justify-between text-[12px] uppercase tracking-[0.3em]">
                <span className="text-platinum/40">License</span>
                <span className="font-mono text-platinum/70">{model.token}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                href={`/models#${model.token}`}
                className="border border-platinum/30 px-6 py-3 text-[12px] uppercase tracking-[0.4em] hover:border-blood hover:text-blood transition-colors inline-block"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NavBar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-black/95 backdrop-blur-sm border-b border-platinum/10 flex items-center px-6 sm:px-12 z-50">
      <div className="w-full flex items-center justify-between max-w-[1400px] mx-auto">
        <Link href="/" className="text-platinum text-[18px] font-bold tracking-[0.5em] uppercase">
          SEMBLA
        </Link>
        <nav className="flex items-center gap-8 text-[11px] uppercase tracking-[0.4em]">
          <Link href="/models" className="text-platinum/50 hover:text-platinum transition-colors">Roster</Link>
          <Link href="#inquiry" className="text-platinum/50 hover:text-platinum transition-colors">Brands</Link>
          <Link href="/roster/upload" className="text-blood/70 hover:text-blood transition-colors">Admin</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-platinum/10 bg-black py-12 px-6 sm:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[18px] font-bold tracking-[0.5em] uppercase text-platinum/30">SEMBLA</span>
        <p className="text-[11px] text-platinum/30 uppercase tracking-[0.3em] font-mono">
          &copy; 2026 &middot; Exclusive Digital Agency &middot; Consent-as-Code
        </p>
      </div>
    </footer>
  );
}
