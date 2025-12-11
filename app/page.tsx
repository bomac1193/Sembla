"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";

const liveRates = [
  { city: "Paris", time: "17:43", value: "€87,400" },
  { city: "New York", time: "12:09", value: "€112,200" },
  { city: "Tokyo", time: "01:12", value: "€68,900" }
];

const cardsModels = ["You set the rate", "0 % commission taken ever", "Paid same day in EUR or USDC"];
const modelShots = [
  { src: "/models/model-1.png", label: "You set the rate" },
  { src: "/models/model-2.png", label: "0 % commission taken ever" },
  { src: "/models/model-3.png", label: "Paid same day in EUR or USDC" }
];

export default function LandingPage() {
  const [showNav, setShowNav] = useState(false);
  const [lineReady, setLineReady] = useState(false);
  const [valuationState, setValuationState] = useState<"idle" | "scanning" | "ready">("idle");

  useEffect(() => {
    const onScroll = () => setShowNav(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLineReady(true), 10_000);
    return () => clearTimeout(timer);
  }, []);

  const valuationValue = useMemo(() => "€________", []);

  return (
    <main className="bg-black text-platinum">
      {showNav ? <NavBar /> : null}

      <Hero />

      <section id="face-value" className="min-h-screen flex items-center justify-center border-t border-platinum/10 scroll-mt-24">
        <div className="text-center">
          <p className="text-[120px] leading-[0.9] sm:text-[180px] font-black uppercase">Face value.</p>
          <div className="mt-16 h-[2px] w-full max-w-5xl mx-auto bg-platinum/10" />
          <div className="mt-16 h-[2px] w-full max-w-5xl mx-auto bg-blood">
            {lineReady ? <div className="h-[2px] w-full bg-blood animate-drawLine origin-left" /> : null}
          </div>
          {lineReady ? (
            <p className="mt-10 text-[80px] font-black text-blood leading-none">€________</p>
          ) : null}
        </div>
      </section>

      <LiveRates />

      <section id="models" className="min-h-screen flex items-center border-t border-platinum/10 scroll-mt-24">
        <div className="w-full grid-12 px-[5vw]" style={{ "--gutter": "8.75rem" } as any}>
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <p className="text-[32px] font-medium uppercase tracking-[0.3em]">For Models</p>
          </div>
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 gap-12">
            {cardsModels.map((text, idx) => {
              const shot = modelShots[idx]?.src;
              return (
                <div
                  key={text}
                  className="border border-platinum/30 bg-black/90 p-8 lg:p-10 relative overflow-hidden"
                  style={
                    shot
                      ? {
                          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.95)), url(${shot})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }
                      : undefined
                  }
                >
                  <div className="relative space-y-6">
                    <p className="text-[28px] font-medium leading-tight">{text}</p>
                    <p className="text-blood text-[36px] font-black animate-pulseOpacity">€________</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="clients" className="min-h-screen flex items-center justify-center border-t border-platinum/10 scroll-mt-24">
        <div className="text-center space-y-8 px-[5vw]">
          <p className="text-[120px] leading-[0.9] font-black uppercase">Book direct. Pay face value. No negotiation.</p>
        </div>
      </section>

      <section id="valuation" className="min-h-screen border-t border-platinum/10 flex items-center scroll-mt-24">
        <div className="w-full grid-12 px-[5vw]" style={{ "--gutter": "8.75rem" } as any}>
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <p className="text-[32px] font-medium uppercase tracking-[0.3em]">Valuation Tool</p>
            <p className="text-[18px] text-platinum/70 leading-relaxed font-legal">
              Drop file or activate camera. Three-second scan. We return the live face value and bind it to your wallet.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <DropZone
              state={valuationState}
              onStart={() => setValuationState("scanning")}
              onComplete={() => setTimeout(() => setValuationState("ready"), 3000)}
            />
            <div className="border border-platinum/30 p-8 lg:p-10 flex flex-col gap-6">
              <p className="text-[24px] font-medium uppercase tracking-[0.2em]">Your current face value</p>
              <p className="text-blood text-[120px] sm:text-[180px] leading-none font-black animate-pulseOpacity">
                {valuationState === "ready" ? valuationValue : "€________"}
              </p>
              <button className="self-start border border-platinum/50 px-6 py-3 text-[16px] uppercase tracking-[0.24em] hover:text-blood hover:border-blood">
                Claim rate → wallet connect
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function NavBar() {
  const navItems = [
    { label: "Models", href: "#models" },
    { label: "Clients", href: "#clients" },
    { label: "Rates", href: "#live-rates" },
    { label: "Join", href: "/onboarding" }
  ];
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-black/90 border-b border-platinum/20 flex items-center px-[5vw] z-40">
      <div className="w-full flex items-center justify-between">
        <span className="text-platinum text-[24px] font-bold tracking-[0.4em] uppercase">SEMBLA</span>
        <nav className="flex items-center gap-10 text-[16px] uppercase tracking-[0.4em]">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-platinum hover:text-blood transition-colors">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden scroll-mt-24">
      <div className="px-[5vw] space-y-16">
        <p className="text-[120px] leading-[1] sm:text-[180px] lg:text-[240px] font-black uppercase">
          Someone just booked your exact face for{" "}
          <span className="text-blood animate-pulseOpacity">€________.</span>
        </p>
        <p className="text-[48px] sm:text-[60px] font-medium uppercase text-white no-highlight">Find out.</p>
      </div>
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[40%] max-w-[360px] min-w-[180px] aspect-square qr-noise" />
      <div className="absolute inset-0 pointer-events-none" />
    </section>
  );
}

function LiveRates() {
  return (
    <section id="live-rates" className="relative min-h-screen border-t border-platinum/10 overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-30">
        <MatrixRain />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="grid gap-6 text-[22px] font-mono">
          {liveRates.map((item) => (
            <div key={item.city} className="flex items-center gap-6 uppercase tracking-[0.2em]">
              <span className="w-28 text-platinum">{item.city}</span>
              <span className="w-20 text-platinum/70">{item.time}</span>
              <span className="text-platinum">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MatrixRain() {
  const columns = new Array(12).fill(null);
  const stream = useMemo(
    () =>
      Array.from({ length: 64 })
        .map((_, i) => `€${(87400 + i * 7).toString().slice(-3).padStart(3, "0")}`)
        .join(" · "),
    []
  );
  return (
    <div className="grid grid-cols-6 sm:grid-cols-12 gap-6 h-full px-[5vw]" style={{ "--gutter": "8.75rem" } as any}>
      {columns.map((_, idx) => (
        <div key={idx} className="overflow-hidden">
          <div
            className="text-platinum/40 font-mono text-[14px] leading-[18px] animate-rain"
            style={{ animationDelay: `${idx * 0.3}s` }}
          >
            {stream}
          </div>
        </div>
      ))}
    </div>
  );
}

function DropZone({
  state,
  onStart,
  onComplete
}: {
  state: "idle" | "scanning" | "ready";
  onStart: () => void;
  onComplete: () => void;
}) {
  const handleClick = () => {
    if (state === "idle") {
      onStart();
      onComplete();
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (state === "idle") {
      onStart();
      onComplete();
    }
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border border-dashed border-platinum/40 p-12 text-center uppercase tracking-[0.2em] text-[16px] hover:border-blood transition-colors"
    >
      {state === "idle" && <p>Drop file or activate camera</p>}
      {state === "scanning" && <p className="text-blood animate-pulseOpacity">Scanning…</p>}
      {state === "ready" && <p>Scan complete</p>}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-platinum/20 bg-black py-10">
      <p className="text-center text-[14px] text-platinum">
        © 2026 SEMBLA • Face value. • All rights reserved.
      </p>
    </footer>
  );
}
