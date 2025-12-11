"use client";

import { useMemo, useState } from "react";

const roster = [
  {
    name: "NANO-01",
    rate: "€87,400",
    city: "Paris",
    token: "FX-91A",
    image: "/models/model-a.png",
    bio: "Chromatic androgyny, angular bone structure, editorial lighting friendly."
  },
  {
    name: "NANO-02",
    rate: "€112,200",
    city: "New York",
    token: "FX-17C",
    image: "/models/model-b.png",
    bio: "Steel gaze, sharp jawline, urban luxury tone calibrated for campaign hero frames."
  },
  {
    name: "NANO-03",
    rate: "€68,900",
    city: "Tokyo",
    token: "FX-44B",
    image: "/models/model-c.png",
    bio: "Porcelain clarity, balanced symmetry, excels in monochrome high-contrast sets."
  },
  {
    name: "NANO-04",
    rate: "€94,200",
    city: "Berlin",
    token: "FX-28D",
    image: "/models/model-d.png",
    bio: "Architectural profile, minimal expression set, engineered for luxe tech crossovers."
  },
  {
    name: "NANO-06",
    rate: "€101,300",
    city: "Milan",
    token: "FX-75F",
    image: "/models/model-f.png",
    bio: "High-contrast silhouette, confident stare, tailored for couture and luxury tech fusions."
  }
];

export default function ModelsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return roster.filter((m) => m.name.toLowerCase().includes(q) || m.city.toLowerCase().includes(q) || m.token.toLowerCase().includes(q));
  }, [query]);

  return (
    <main className="min-h-screen bg-black text-platinum px-[5vw] py-24">
      <header className="space-y-4 border-b border-platinum/20 pb-8">
        <p className="text-[32px] font-medium uppercase tracking-[0.3em]">Models</p>
        <p className="text-platinum/70 text-[16px]">Roster. Direct booking. Face value.</p>
        <div className="flex items-center gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by code, city, token"
            className="w-full max-w-md border border-platinum/30 bg-black/70 px-4 py-3 text-platinum"
          />
        </div>
      </header>

      <section className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {filtered.map((m) => (
          <article
            key={m.token}
            className="border border-platinum/30 bg-black/80 p-4 flex flex-col gap-4"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.85), rgba(0,0,0,0.95)), url(${m.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="flex items-center justify-between uppercase tracking-[0.2em] text-sm">
              <span>{m.name}</span>
              <span className="text-platinum/60">{m.city}</span>
            </div>
            <div className="text-blood text-[36px] font-black">{m.rate}</div>
            <div className="font-mono text-sm text-platinum/80">Token: {m.token}</div>
            <p className="text-sm text-platinum/75 leading-relaxed">{m.bio}</p>
            <button className="self-start border border-platinum/40 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-blood hover:text-blood">
              Book
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
