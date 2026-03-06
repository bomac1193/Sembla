import Link from "next/link";

const snapshot = [
  ["Sector", "Beauty"],
  ["Markets", "UK, EU, UAE"],
  ["Term", "12 months"],
  ["Outputs", "Hero stills, retail, paid social"],
] as const;

const sections = [
  {
    title: "Challenge",
    body: "A premium beauty brand needed one represented face for a launch across three markets, with paid, retail, and social use aligned before production began.",
  },
  {
    title: "Structure",
    body: "Sembla cleared the likeness, defined the term, territories, retail use, edit boundaries, and category restrictions, then locked the approval path before any final output moved.",
  },
  {
    title: "Outputs",
    body: "The brand received hero stills, market variants, retail crops, and short cutdowns built from one approved face and one controlled rights package.",
  },
  {
    title: "Governance",
    body: "When the campaign extended, Sembla managed renewals, localized approvals, updated asset versions, and the provenance record without reopening the whole production chain.",
  },
] as const;

const deliverables = [
  "Talent selection and usage memo",
  "Consent and approval pack",
  "Usage scope by territory, term, media, and restrictions",
  "Hero stills, market variants, and cutdowns",
  "Renewal logic and provenance handoff",
] as const;

export default function BeautyLaunchCaseStudyPage() {
  return (
    <main className="min-h-screen bg-black text-platinum">
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center border-b border-platinum/10 bg-black/95 px-6 backdrop-blur-sm sm:px-12">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
          <Link href="/" className="font-canela-display text-[30px] leading-none tracking-[-0.04em] text-platinum">
            Sembla
          </Link>
          <nav className="flex items-center gap-6 text-[11px] tracking-[0.18em] sm:gap-8">
            <Link href="/offerings" className="text-platinum transition-colors">
              Offerings
            </Link>
            <Link href="/models" className="text-platinum/50 transition-colors hover:text-platinum">
              Selected Talent
            </Link>
            <Link href="/inquiry" className="text-platinum/50 transition-colors hover:text-platinum">
              Inquiry
            </Link>
          </nav>
        </div>
      </header>

      <section className="px-6 pb-16 pt-32 sm:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="/offerings"
            className="text-[11px] uppercase tracking-[0.28em] text-platinum/35 transition-colors hover:text-platinum/60"
          >
            Back to offerings
          </Link>
          <div className="mt-8 max-w-[920px]">
            <h1 className="font-canela-display text-[clamp(48px,7vw,96px)] leading-[0.92] tracking-[-0.05em] text-platinum">
              Beauty launch across three markets
            </h1>
            <p className="mt-6 max-w-[760px] text-[18px] leading-[1.8] text-platinum/58">
              One represented face, one rights structure, and a controlled output package built for repeat use.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/inquiry?sector=Beauty&service=Campaign%20Licensing"
              className="border border-blood/50 px-6 py-3 text-[12px] tracking-[0.14em] text-blood transition-colors hover:bg-blood hover:text-black"
            >
              Start beauty inquiry
            </Link>
            <Link
              href="/proof/usage-scope"
              className="border border-platinum/20 px-6 py-3 text-[12px] tracking-[0.14em] text-platinum/70 transition-colors hover:border-blood hover:text-blood"
            >
              View proof sample
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-platinum/10 px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-px bg-platinum/10 md:grid-cols-2 xl:grid-cols-4">
            {snapshot.map(([label, value]) => (
              <article key={label} className="bg-black px-6 py-8">
                <p className="text-[11px] uppercase tracking-[0.28em] text-platinum/30">{label}</p>
                <p className="mt-4 font-canela-display text-[28px] leading-[0.98] tracking-[-0.035em] text-platinum">
                  {value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-platinum/10 px-6 py-20 sm:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-platinum/10 md:grid-cols-2 xl:grid-cols-4">
          {sections.map((section) => (
            <article key={section.title} className="bg-black px-8 py-10">
              <h2 className="font-canela-display text-[32px] leading-[0.96] tracking-[-0.04em] text-platinum">
                {section.title}
              </h2>
              <p className="mt-5 text-[15px] leading-[1.8] text-platinum/55">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-platinum/10 px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-px bg-platinum/10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-black px-8 py-10 lg:px-10 lg:py-12">
              <h2 className="font-canela-display text-[clamp(34px,4vw,64px)] leading-[0.94] tracking-[-0.045em] text-platinum">
                Deliverables
              </h2>
            </div>
            <div className="bg-black px-8 py-10 lg:px-10 lg:py-12">
              <div className="space-y-4">
                {deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3 border-b border-platinum/6 pb-4">
                    <span className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full bg-blood/70" />
                    <p className="text-[15px] leading-[1.75] text-platinum/58">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
