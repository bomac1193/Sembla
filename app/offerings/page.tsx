import Link from "next/link";

const offeringGroups = [
  {
    slug: "Likeness Licensing",
    title: "Likeness Licensing",
    summary: "Clear represented talent for a campaign with defined rights, approvals, and commercial use.",
    deliverables: [
      "Talent selection or shortlist",
      "Consent and approval pack",
      "Usage scope by territory, term, media, and exclusivity",
      "Booking memo and final agreed outputs"
    ]
  },
  {
    slug: "Digital Twin Build",
    title: "Digital Twin Build",
    summary: "Build an approved digital twin for repeatable campaign use across formats, timelines, and markets.",
    deliverables: [
      "Approved digital twin",
      "Guardrail and usage notes",
      "Test outputs and approval rounds",
      "Initial production-ready outputs"
    ]
  },
  {
    slug: "Stewardship and Governance",
    title: "Stewardship & Governance",
    summary: "Manage reuse, localization, renewals, provenance, and approvals as campaigns scale.",
    deliverables: [
      "Updated and localized assets",
      "Market, language, and channel versioning",
      "Renewed approval trail and usage renewals",
      "Provenance and disclosure support"
    ]
  }
];

const foundations = [
  {
    title: "Rights Clarity",
    body: "Usage is defined before delivery."
  },
  {
    title: "Faster Campaigns",
    body: "Cleared inputs reduce production drag."
  },
  {
    title: "Controlled Reuse",
    body: "Approved faces extend across markets and versions."
  },
  {
    title: "Brand-Safe Governance",
    body: "Approvals and provenance stay attached."
  }
];

export default function OfferingsPage() {
  return (
    <main className="min-h-screen bg-black text-platinum">
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center border-b border-platinum/10 bg-black/95 px-6 backdrop-blur-sm sm:px-12">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
          <Link href="/" className="font-canela-display text-[30px] leading-none tracking-[-0.04em] text-platinum">
            Sembla
          </Link>
          <nav className="flex items-center gap-6 text-[11px] tracking-[0.18em] sm:gap-8">
            <Link href="/offerings" className="text-platinum transition-colors">Offerings</Link>
            <Link href="/models" className="text-platinum/50 transition-colors hover:text-platinum">Selected Talent</Link>
            <Link href="/inquiry" className="text-platinum/50 transition-colors hover:text-platinum">Inquiry</Link>
            <Link href="/roster/upload" className="text-blood/70 transition-colors hover:text-blood">Admin</Link>
          </nav>
        </div>
      </header>

      <section className="px-6 pb-20 pt-32 sm:px-12 lg:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-[980px]">
            <h1 className="font-canela-display text-[clamp(50px,8vw,110px)] leading-[0.9] tracking-[-0.05em] text-platinum">
              Commercial Access
            </h1>
            <p className="mt-8 max-w-[760px] text-[17px] leading-[1.8] text-platinum/58 sm:text-[20px]">
              For premium brands that need represented talent, clear rights, and repeatable commercial use.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/inquiry"
                className="border border-blood/50 px-8 py-4 text-[14px] tracking-[0.12em] text-blood transition-all hover:bg-blood hover:text-black"
              >
                Start private inquiry
              </Link>
              <Link
                href="/models"
                className="text-[14px] tracking-[0.12em] text-platinum/40 transition-colors hover:text-platinum"
              >
                View selected talent
              </Link>
            </div>
            <p className="mt-5 text-[13px] leading-[1.7] text-platinum/38">
              Scoped privately by talent, usage, and term.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-platinum/10 lg:grid-cols-3">
          {offeringGroups.map((group) => (
            <article key={group.title} className="flex h-full flex-col bg-black px-8 py-10 lg:px-10 lg:py-12">
              <h2 className="font-canela-display text-[34px] leading-[0.94] tracking-[-0.04em] text-platinum lg:min-h-[4.75rem]">
                {group.title}
              </h2>
              <div className="mt-8 flex flex-1 flex-col border-t border-platinum/10 pt-6">
                <p className="text-[15px] leading-[1.8] text-platinum/58 lg:min-h-[8.5rem]">
                  {group.summary}
                </p>

                <div className="mt-6 flex-1 border-t border-platinum/10 pt-5">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-platinum/35">
                    Deliverables
                  </p>
                  <div className="mt-4 space-y-3">
                    {group.deliverables.map((detail) => (
                      <div key={detail} className="flex items-start gap-3">
                        <span className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full bg-blood/70" />
                        <p className="text-[14px] leading-[1.7] text-platinum/55">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 border-t border-platinum/10 pt-5">
                  <Link
                    href={`/inquiry?service=${encodeURIComponent(group.slug)}`}
                    className="inline-block border border-platinum/20 px-5 py-3 text-[12px] tracking-[0.14em] text-platinum/70 transition-colors hover:border-blood hover:text-blood"
                  >
                    Inquire about this
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-platinum/10 px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-px bg-platinum/10 md:grid-cols-2 xl:grid-cols-4">
            {foundations.map((item) => (
              <article key={item.title} className="bg-black px-6 py-8">
                <h3 className="font-canela-display text-[28px] leading-[0.98] tracking-[-0.035em] text-platinum">
                  {item.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.8] text-platinum/52">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-platinum/10 px-6 py-24 sm:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-platinum/10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-black px-8 py-10 lg:px-12 lg:py-14">
            <h2 className="font-canela-display text-[clamp(38px,5vw,76px)] leading-[0.94] tracking-[-0.045em] text-platinum">
              Private inquiry for brand teams
            </h2>
            <p className="mt-6 max-w-[34rem] text-[16px] leading-[1.8] text-platinum/58 sm:text-[18px]">
              Tell us the brand, usage, territory, term, and whether you need likeness licensing,
              a digital twin build, or ongoing stewardship and governance.
            </p>
          </div>

          <div className="bg-black px-8 py-10 lg:px-12 lg:py-14">
            <div className="space-y-6 border-t border-platinum/10 pt-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-platinum/35">
                  Direct path
                </p>
                <p className="mt-3 text-[15px] leading-[1.8] text-platinum/55">
                  Use the inquiry form for a scoped brief, or email directly if you already know the campaign need.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/inquiry"
                  className="border border-blood/50 px-8 py-4 text-[14px] tracking-[0.12em] text-blood transition-all hover:bg-blood hover:text-black"
                >
                  Start private inquiry
                </Link>
                <a
                  href="mailto:hello@sembla.agency"
                  className="text-[14px] tracking-[0.12em] text-platinum/40 transition-colors hover:text-platinum"
                >
                  Email directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-platinum/10 bg-black px-6 py-12 sm:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 sm:flex-row">
          <Link href="/" className="font-canela-display text-[30px] leading-none tracking-[-0.04em] text-platinum/30">
            Sembla
          </Link>
          <p className="text-[11px] font-mono tracking-[0.12em] text-platinum/30">
            &copy; 2026 Sembla
          </p>
        </div>
      </footer>
    </main>
  );
}
