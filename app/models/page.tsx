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
    status: "Available",
    bio: "Chromatic androgyny, angular bone structure. Splits time between editorial campaigns and underground DJ sets across Paris and Berlin. Known for cross-modal work bridging sonic and visual identity."
  },
  {
    name: "NANO-02",
    discipline: "DJ / Model",
    city: "New York",
    token: "FX-17C",
    image: "/models/model-b.png",
    status: "Booked",
    bio: "Steel gaze, sharp jawline, urban luxury tone. Campaign hero frames for luxury fashion meets nightlife. Resident at three NYC venues, editorial face for two global campaigns."
  },
  {
    name: "NANO-03",
    discipline: "Producer / Model",
    city: "Tokyo",
    token: "FX-44B",
    image: "/models/model-c.png",
    status: "Available",
    bio: "Porcelain clarity, balanced symmetry. Excels in monochrome high-contrast sets. Produces ambient-electronic under a separate alias. Cross-modal coherence score: 94."
  },
  {
    name: "NANO-04",
    discipline: "DJ / Creative Director",
    city: "Berlin",
    token: "FX-28D",
    image: "/models/model-d.png",
    status: "Available",
    bio: "Architectural profile, minimal expression set. Creative directs for luxe tech crossovers. Known for brutalist visual language and deep techno sets."
  },
  {
    name: "NANO-06",
    discipline: "DJ / Model",
    city: "Milan",
    token: "FX-75F",
    image: "/models/model-f.png",
    status: "On Hold",
    bio: "High-contrast silhouette, confident stare. Tailored for couture and luxury tech fusions. Milan fashion week regular, Ibiza residency holder."
  }
];

export default function ModelsPage() {
  return (
    <main className="min-h-screen bg-black text-platinum">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-black/95 backdrop-blur-sm border-b border-platinum/10 flex items-center px-6 sm:px-12 z-50">
        <div className="w-full flex items-center justify-between max-w-[1400px] mx-auto">
          <Link href="/" className="text-platinum text-[18px] font-bold tracking-[0.5em] uppercase">
            SEMBLA
          </Link>
          <nav className="flex items-center gap-8 text-[11px] uppercase tracking-[0.4em]">
            <Link href="/" className="text-platinum/50 hover:text-platinum transition-colors">Home</Link>
            <Link href="/models" className="text-platinum transition-colors">Roster</Link>
            <Link href="/roster/upload" className="text-blood/70 hover:text-blood transition-colors">Admin</Link>
          </nav>
        </div>
      </header>

      {/* Title section */}
      <section className="pt-32 pb-16 px-6 sm:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 bg-blood badge-glow" />
            <span className="text-[11px] uppercase tracking-[0.5em] text-platinum/40 font-mono">
              {roster.length} Represented
            </span>
          </div>
          <h1 className="text-[clamp(48px,8vw,120px)] font-black uppercase leading-[0.85] tracking-tight">
            Roster
          </h1>
          <p className="mt-6 text-[15px] text-platinum/40 max-w-xl font-legal leading-relaxed">
            Each talent is represented exclusively. Digital likeness licensed only through
            auditable consent chains. Direct booking, zero commission.
          </p>
        </div>
      </section>

      {/* Vertical roster */}
      <section className="pb-24">
        {roster.map((model, idx) => (
          <ModelCard key={model.token} model={model} index={idx + 1} total={roster.length} />
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-platinum/10 bg-black py-12 px-6 sm:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-[18px] font-bold tracking-[0.5em] uppercase text-platinum/30">SEMBLA</Link>
          <p className="text-[11px] text-platinum/30 uppercase tracking-[0.3em] font-mono">
            &copy; 2026 &middot; Exclusive Digital Agency
          </p>
        </div>
      </footer>
    </main>
  );
}

function ModelCard({ model, index, total }: { model: typeof roster[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      id={model.token}
      className="border-t border-platinum/5 scroll-mt-20"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12 py-12 lg:py-0">

          {/* Image column — tall portrait */}
          <div className="lg:col-span-6 relative overflow-hidden">
            <div className="aspect-[3/4] lg:aspect-auto lg:h-[85vh] relative bg-smoke">
              <img
                src={model.image}
                alt={model.name}
                className={`model-portrait w-full h-full transition-all duration-1000 ${
                  visible ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
                }`}
              />
              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent lg:hidden" />
            </div>
          </div>

          {/* Details column */}
          <div className="lg:col-span-6 flex flex-col justify-center py-8 lg:py-24">
            <div className={`transition-all duration-1000 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}>
              {/* Index */}
              <span className="index-num text-[11px] font-mono text-platinum/20 uppercase tracking-[0.3em]">
                {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>

              {/* Status */}
              <div className="flex items-center gap-3 mt-6">
                <div className={`w-1.5 h-1.5 ${
                  model.status === "Available" ? "bg-green-500" :
                  model.status === "Booked" ? "bg-blood" : "bg-yellow-500"
                }`} />
                <span className="text-[11px] uppercase tracking-[0.5em] text-platinum/40 font-mono">
                  {model.status}
                </span>
              </div>

              {/* Name */}
              <h2 className="mt-6 text-[clamp(32px,4vw,64px)] font-black uppercase leading-[0.9] tracking-tight">
                {model.name}
              </h2>

              {/* Discipline */}
              <p className="mt-4 text-[14px] sm:text-[16px] uppercase tracking-[0.3em] text-blood/70">
                {model.discipline}
              </p>

              {/* Bio */}
              <p className="mt-8 text-[14px] sm:text-[15px] text-platinum/50 leading-relaxed font-legal max-w-md">
                {model.bio}
              </p>

              {/* Metadata grid */}
              <div className="mt-10 space-y-3 border-t border-platinum/10 pt-6">
                <div className="flex justify-between text-[12px] uppercase tracking-[0.3em]">
                  <span className="text-platinum/30">Base</span>
                  <span className="text-platinum/60">{model.city}</span>
                </div>
                <div className="flex justify-between text-[12px] uppercase tracking-[0.3em]">
                  <span className="text-platinum/30">License Token</span>
                  <span className="font-mono text-platinum/60">{model.token}</span>
                </div>
                <div className="flex justify-between text-[12px] uppercase tracking-[0.3em]">
                  <span className="text-platinum/30">Consent</span>
                  <span className="text-platinum/60">Auditable</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-10 flex items-center gap-6">
                <button className="border border-platinum/30 px-8 py-3.5 text-[12px] uppercase tracking-[0.4em] hover:border-blood hover:text-blood transition-colors">
                  Inquire
                </button>
                <span className="text-[11px] uppercase tracking-[0.3em] text-platinum/20 font-mono">
                  Booking via agency only
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
