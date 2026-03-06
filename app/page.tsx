"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toDisplayCase } from "@/lib/display";
import { homepageContent } from "@/lib/homepage";
import { useRoster } from "@/lib/RosterContext";
import type { RosterModel } from "@/lib/roster";

export default function LandingPage() {
  const { roster, isLoaded } = useRoster();
  const [showNav, setShowNav] = useState(false);
  const showRosterPreview = homepageContent.showRosterPreview;
  const hasClients = homepageContent.clients.length > 0;
  const hasTestimonials = homepageContent.testimonials.length > 0;

  useEffect(() => {
    const onScroll = () => setShowNav(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isLoaded) return null;

  return (
    <main className={`bg-black text-platinum ${showRosterPreview ? "editorial-scroll" : ""}`}>
      {showNav && <NavBar />}

      {/* ── HERO ── */}
      <section className="relative flex min-h-[92svh] items-center overflow-hidden px-6 py-24 sm:px-12 lg:py-32 editorial-section">
        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="scan-line w-full" />
        </div>

        <div className="relative z-10 w-full max-w-[1320px]">
          <div className="max-w-[980px]">
            <h1 className="font-canela-display text-[clamp(70px,12vw,180px)] leading-[0.88] tracking-[-0.05em] text-platinum">
              Sembla
            </h1>

            <p className="mt-6 max-w-[880px] font-canela-text text-[clamp(28px,4vw,54px)] leading-[0.98] tracking-[-0.04em] text-platinum/92">
              Face Value.
            </p>

            <p className="mt-8 max-w-[700px] text-[17px] leading-[1.8] text-platinum/58 sm:text-[20px]">
              Most teams can generate an image. Far fewer can clear the rights
              behind it. Sembla gives brands a direct route to represented
              talent, documented consent, and commercial usage they can actually use.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href="/offerings"
                className="border border-platinum/40 px-8 py-4 text-[14px] tracking-[0.12em] hover:border-blood hover:text-blood transition-colors"
              >
                View offerings
              </Link>
              <Link
                href="/inquiry"
                className="text-[14px] tracking-[0.12em] text-platinum/40 hover:text-platinum transition-colors"
              >
                Inquiry &rarr;
              </Link>
            </div>

            <div className="mt-16 grid max-w-[980px] gap-px bg-platinum/10 sm:grid-cols-3">
              <div className="bg-black px-6 py-6">
                <p className="text-[15px] leading-[1.7] text-platinum/55">
                  Generation is easy. Approval, provenance, and usage rights are not.
                </p>
              </div>

              <div className="bg-black px-6 py-6">
                <p className="text-[15px] leading-[1.7] text-platinum/55">
                  Campaign licensing, digital twin builds, and commercial use structured from the outset.
                </p>
              </div>

              <div className="bg-black px-6 py-6">
                <p className="text-[15px] leading-[1.7] text-platinum/55">
                  Represented talent with documented consent, provenance, and governed brand use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROSTER PREVIEW ── */}
      {showRosterPreview && roster.map((model, idx) => (
        <ModelSection key={model.id} model={model} index={idx + 1} total={roster.length} />
      ))}

      {(hasClients || hasTestimonials) && (
        <section className="border-t border-platinum/5">
          <div className="w-full px-6 sm:px-12 py-24 max-w-[1400px] mx-auto space-y-20">
            {hasClients && (
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-platinum/30" />
                  <span className="text-[11px] uppercase tracking-[0.5em] text-platinum/40 font-mono">
                    Selected Collaborations
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-px bg-platinum/10 md:grid-cols-2 lg:grid-cols-4">
                  {homepageContent.clients.map((client) => (
                    <div key={client.name} className="bg-black px-6 py-8">
                      <p className="font-canela-display text-[28px] leading-none text-platinum">
                        {client.name}
                      </p>
                      {client.context && (
                        <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-platinum/35">
                          {client.context}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasTestimonials && (
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-platinum/30" />
                  <span className="text-[11px] uppercase tracking-[0.5em] text-platinum/40 font-mono">
                    Private Endorsements
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-px bg-platinum/10 lg:grid-cols-2">
                  {homepageContent.testimonials.map((item) => (
                    <figure key={`${item.author}-${item.title}`} className="bg-black p-8 lg:p-12">
                      <blockquote className="font-canela-text text-[26px] leading-[1.15] text-platinum">
                        "{item.quote}"
                      </blockquote>
                      <figcaption className="mt-8 text-[11px] uppercase tracking-[0.3em] text-platinum/45">
                        {item.author} · {item.title}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

function ModelSection({ model, index, total }: { model: RosterModel; index: number; total: number }) {
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
        {/* Image — takes full height on mobile, 7 cols on desktop */}
        <div className="lg:col-span-7 relative h-[70vh] lg:h-auto overflow-hidden bg-smoke">
          <Image
            src={model.image}
            alt={model.name}
            fill
            unoptimized
            sizes="(min-width: 1024px) 58vw, 100vw"
            className={`model-portrait w-full h-full transition-all duration-1000 ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
          {/* Gradient overlay bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black" />

          {/* Index number overlay */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
            <span className="index-num text-[11px] font-mono text-platinum/30 uppercase tracking-[0.3em]">
              {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Details — vertical centered on right */}
        <div className="lg:col-span-5 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 lg:py-24">
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            {/* Name */}
            <h2 className="font-canela-display text-[clamp(36px,5vw,72px)] leading-[0.94] tracking-[-0.04em] text-platinum">
              {model.name}
            </h2>

            {/* Discipline */}
            <p className="text-[16px] sm:text-[18px] tracking-[0.14em] text-platinum/50">
              {toDisplayCase(model.discipline)}
            </p>

            {/* Metadata */}
            <div className="space-y-3 pt-4 border-t border-platinum/10">
              <div className="flex justify-between text-[12px] uppercase tracking-[0.3em]">
                <span className="text-platinum/40">Location</span>
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
        <Link href="/" className="font-canela-display text-[30px] leading-none tracking-[-0.04em] text-platinum">
          Sembla
        </Link>
        <nav className="flex items-center gap-6 text-[11px] tracking-[0.18em] sm:gap-8">
          <Link href="/offerings" className="text-platinum/50 hover:text-platinum transition-colors">Offerings</Link>
          <Link href="/models" className="text-platinum/50 hover:text-platinum transition-colors">Selected Talent</Link>
          <Link href="/inquiry" className="text-platinum/50 hover:text-platinum transition-colors">Inquiry</Link>
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
        <span className="font-canela-display text-[30px] leading-none tracking-[-0.04em] text-platinum/30">Sembla</span>
        <p className="text-[11px] text-platinum/30 tracking-[0.12em] font-mono">
          &copy; 2026 Sembla
        </p>
      </div>
    </footer>
  );
}
