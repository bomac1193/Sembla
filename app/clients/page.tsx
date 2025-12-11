const clients = [
  { name: "ARKHAM LABS", industry: "Blockchain infrastructure", city: "Berlin", value: "€312,000" },
  { name: "MONOCHROME HOUSE", industry: "Luxury fashion collective", city: "Paris", value: "€187,400" },
  { name: "SENSORIUM", industry: "Immersive media", city: "New York", value: "€224,900" }
];

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-black text-platinum px-[5vw] py-24">
      <header className="space-y-4 border-b border-platinum/20 pb-8">
        <p className="text-[32px] font-medium uppercase tracking-[0.3em]">Clients</p>
        <p className="text-platinum/70 text-[16px]">Active engagements. Face value deals. Zero negotiation.</p>
      </header>

      <section className="mt-12 grid grid-cols-1 gap-6">
        {clients.map((c) => (
          <article key={c.name} className="border border-platinum/30 bg-black/80 p-6 flex justify-between items-center">
            <div className="space-y-2">
              <p className="text-[22px] font-semibold uppercase tracking-[0.18em]">{c.name}</p>
              <p className="text-platinum/70 text-sm">{c.industry}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-platinum/60 text-sm uppercase tracking-[0.18em]">{c.city}</p>
              <p className="text-blood text-[28px] font-black">{c.value}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
