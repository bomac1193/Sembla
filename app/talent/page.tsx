import Link from "next/link";

const controlPoints = [
  {
    title: "Approval stays with talent",
    body: "No digital use moves forward without defined talent-side sign-off, manager review, and scope control.",
  },
  {
    title: "Restrictions are written in",
    body: "Blocked categories, competitor conflicts, edit boundaries, and renewal triggers are set before commercial use.",
  },
  {
    title: "Reuse is governed",
    body: "New markets, new media, and term extensions are handled as controlled renewals, not silent reuse.",
  },
  {
    title: "Value compounds",
    body: "One represented face can create new revenue without requiring constant travel, reshoots, or uncontrolled overexposure.",
  },
] as const;

const deliverables = [
  "Digital rights structure per talent",
  "Category and competitor restrictions",
  "Approval and renewal logic",
  "Usage and provenance record",
  "Governed brand-side inquiry path",
] as const;

export default function TalentPage() {
  return (
    <main className="min-h-screen bg-black text-platinum">
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center border-b border-platinum/10 bg-black/95 px-6 backdrop-blur-sm sm:px-12">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
          <Link href="/" className="font-canela-display text-[30px] leading-none tracking-[-0.04em] text-platinum">
            Sembla
          </Link>
          <div className="flex items-center gap-6 text-[11px] tracking-[0.18em] sm:gap-8">
            <Link href="/offerings" className="text-platinum/50 transition-colors hover:text-platinum">
              Offerings
            </Link>
            <Link href="/inquiry" className="text-platinum/50 transition-colors hover:text-platinum">
              Inquiry
            </Link>
          </div>
        </div>
      </header>

      <section className="px-6 pb-20 pt-32 sm:px-12 lg:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-[980px]">
            <p className="text-[11px] uppercase tracking-[0.3em] text-platinum/35">
              For managers, agents, and represented talent
            </p>
            <h1 className="mt-5 font-canela-display text-[clamp(48px,7vw,100px)] leading-[0.92] tracking-[-0.05em] text-platinum">
              Digital rights representation without losing control.
            </h1>
            <p className="mt-8 max-w-[760px] text-[18px] leading-[1.8] text-platinum/58">
              Sembla is not a volume marketplace. The role is to protect likeness value, structure brand use,
              and keep approvals, restrictions, and renewals attached as campaigns scale.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/inquiry?service=Digital%20Rights%20Representation"
                className="border border-blood/50 px-8 py-4 text-[14px] tracking-[0.12em] text-blood transition-all hover:bg-blood hover:text-black"
              >
                Start private conversation
              </Link>
              <a
                href="mailto:hello@sembla.agency?subject=Talent%20Representation%20Inquiry"
                className="text-[14px] tracking-[0.12em] text-platinum/40 transition-colors hover:text-platinum"
              >
                Email directly
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-platinum/10 px-6 py-20 sm:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-platinum/10 md:grid-cols-2 xl:grid-cols-4">
          {controlPoints.map((item) => (
            <article key={item.title} className="bg-black px-8 py-10">
              <h2 className="font-canela-display text-[32px] leading-[0.96] tracking-[-0.04em] text-platinum">
                {item.title}
              </h2>
              <p className="mt-5 text-[15px] leading-[1.8] text-platinum/55">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-platinum/10 px-6 py-20 sm:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-platinum/10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="bg-black px-8 py-10 lg:px-10 lg:py-12">
            <h2 className="font-canela-display text-[clamp(34px,4vw,64px)] leading-[0.94] tracking-[-0.045em] text-platinum">
              What talent receives
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
      </section>
    </main>
  );
}
