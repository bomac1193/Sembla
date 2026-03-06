import Link from "next/link";
import { proofArtifacts } from "@/lib/proof-package";

const offeringGroups = [
  {
    slug: "Campaign Licensing",
    title: "Campaign Licensing",
    summary: "Clear represented talent for a campaign with defined rights, approvals, and commercial use.",
    deliverables: [
      "Talent selection or shortlist",
      "Consent and approval pack",
      "Usage scope by territory, term, media, and exclusivity",
      "Booking memo and final agreed outputs"
    ]
  },
  {
    slug: "Repeat Use",
    title: "Repeat Use",
    summary: "Extend an approved face across formats, timelines, and markets through digital twin production and governed reuse.",
    deliverables: [
      "Approved digital twin",
      "Guardrail and usage notes",
      "Test outputs and approval rounds",
      "Initial production-ready outputs"
    ]
  },
  {
    slug: "Governance",
    title: "Governance",
    summary: "Manage reuse, localization, renewals, provenance, and approvals as campaigns scale.",
    deliverables: [
      "Updated and localized assets",
      "Market, language, and channel versioning",
      "Renewed approval trail and usage renewals",
      "Provenance and disclosure support"
    ]
  }
];

const processSteps = [
  {
    title: "Brief",
    body: "Share the brand, talent profile, usage, territory, term, and the campaign need."
  },
  {
    title: "Scope and approval",
    body: "We structure rights, shortlist talent, define restrictions, and lock approvals before delivery."
  },
  {
    title: "Deliver and govern",
    body: "We deliver the assets, usage record, and governance needed for reuse, renewals, and localization."
  }
];

const sectorUseCases = [
  {
    title: "Fashion",
    body: "Seasonal launches, capsule collaborations, campaign extensions, and market-specific stills.",
    problem: "Solve ambassador access, rights ambiguity, and launch reuse without reopening production.",
    href: "/inquiry?sector=Fashion&service=Campaign%20Licensing"
  },
  {
    title: "Beauty",
    body: "Ambassador campaigns, launch visuals, repeat brand storytelling, and controlled product-category use.",
    problem: "Solve repeated launch content and category control around one approved face.",
    href: "/inquiry?sector=Beauty&service=Campaign%20Licensing"
  },
  {
    title: "Hospitality",
    body: "Regional brand campaigns, guest storytelling, and repeat luxury image systems without constant reshoots.",
    problem: "Solve regional rollout and guest-facing storytelling without constant travel and reshoots.",
    href: "/inquiry?sector=Hospitality&service=Governance"
  },
  {
    title: "Spirits",
    body: "Ambassador activations, market rollouts, and tightly scoped premium use across channels and territories.",
    problem: "Solve cultural activation with tighter territory, term, and category restrictions attached.",
    href: "/inquiry?sector=Spirits&service=Campaign%20Licensing"
  }
];

const caseStudy = [
  {
    title: "Challenge",
    body: "A premium beauty brand needs one represented face for a launch across three markets with paid, retail, and social use."
  },
  {
    title: "Structure",
    body: "Sembla licenses the likeness, defines the usage window, captures restrictions, and clears the approval path before output."
  },
  {
    title: "Outputs",
    body: "The brand receives hero stills, market variants, and selective cutdowns built from one approved face."
  },
  {
    title: "Governance",
    body: "When the campaign extends, Sembla manages renewals, localized approvals, updated assets, and the provenance record."
  }
];

const guardrails = [
  {
    title: "Talent approval",
    body: "Faces do not move into commercial use without defined sign-off from the talent side.",
  },
  {
    title: "Category restrictions",
    body: "Blocked sectors, competitor conflicts, and edit boundaries are defined before final delivery.",
  },
  {
    title: "Reuse control",
    body: "New markets, new media, and term extensions trigger review instead of silent reuse drift.",
  },
  {
    title: "Provenance and disclosure",
    body: "Usage records, approvals, and disclosure notes stay attached as campaigns scale.",
  },
] as const;

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
          </nav>
        </div>
      </header>

      <section className="px-6 pb-20 pt-32 sm:px-12 lg:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-[980px]">
            <h1 className="font-canela-display text-[clamp(50px,8vw,110px)] leading-[0.9] tracking-[-0.05em] text-platinum">
              Commercial Access
            </h1>
            <p className="mt-5 text-[13px] leading-[1.7] tracking-[0.08em] text-platinum/42">
              A private likeness partner for premium brands.
            </p>
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
        <div className="mx-auto max-w-[1400px] pb-20">
          <div className="max-w-[720px]">
            <h2 className="font-canela-display text-[clamp(34px,4vw,64px)] leading-[0.94] tracking-[-0.045em] text-platinum">
              How it works
            </h2>
          </div>

          <div className="mt-10 grid gap-px bg-platinum/10 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <article key={step.title} className="bg-black px-8 py-8 lg:px-10 lg:py-10">
                <p className="text-[11px] uppercase tracking-[0.3em] text-platinum/32">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-canela-display text-[30px] leading-[0.96] tracking-[-0.04em] text-platinum">
                  {step.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.8] text-platinum/55">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>

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
          <div className="max-w-[760px]">
            <h2 className="font-canela-display text-[clamp(34px,4vw,64px)] leading-[0.94] tracking-[-0.045em] text-platinum">
              Sample proof package
            </h2>
            <p className="mt-5 text-[16px] leading-[1.8] text-platinum/55">
              A redacted Sembla engagement should travel with the usage scope, consent state, and deliverable record attached.
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-platinum/10 lg:grid-cols-3">
            {proofArtifacts.map((item) => (
              <article key={item.slug} className="bg-black px-6 py-8">
                <h3 className="font-canela-display text-[28px] leading-[0.98] tracking-[-0.035em] text-platinum">
                  {item.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.8] text-platinum/52">
                  {item.summary}
                </p>
                <div className="mt-5 space-y-3 border-t border-platinum/10 pt-5">
                  {item.lines.map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 text-[12px]">
                      <span className="uppercase tracking-[0.24em] text-platinum/30">{label}</span>
                      <span className="text-right text-platinum/58">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-platinum/10 pt-5">
                  <Link
                    href={`/proof/${item.slug}`}
                    className="text-[12px] tracking-[0.14em] text-platinum/70 transition-colors hover:text-platinum"
                  >
                    View sample
                  </Link>
                  <a
                    href={`/proof/${item.slug}/download`}
                    className="text-[12px] tracking-[0.14em] text-platinum/35 transition-colors hover:text-blood"
                  >
                    Download summary
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/inquiry?service=Full%20Redacted%20Proof%20Pack"
              className="border border-platinum/20 px-5 py-3 text-[12px] tracking-[0.14em] text-platinum/70 transition-colors hover:border-blood hover:text-blood"
            >
              Request the full redacted pack
            </Link>
            <p className="text-[13px] leading-[1.7] text-platinum/38">
              View a sample artifact or request the full pack privately.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-platinum/10 px-6 py-24 sm:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-platinum/10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-black px-8 py-10 lg:col-span-2 lg:px-12 lg:py-14">
            <h2 className="font-canela-display text-[clamp(34px,4vw,64px)] leading-[0.94] tracking-[-0.045em] text-platinum">
              Where we work best
            </h2>
            <p className="mt-5 max-w-[42rem] text-[15px] leading-[1.8] text-platinum/42">
              Also relevant for adjacent premium sectors and cultural partnerships on request.
            </p>
            <div className="mt-10 grid gap-px bg-platinum/10 md:grid-cols-2 xl:grid-cols-4">
              {sectorUseCases.map((item) => (
                <article key={item.title} className="bg-black px-6 py-8">
                  <h3 className="font-canela-display text-[28px] leading-[0.98] tracking-[-0.035em] text-platinum">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.8] text-platinum/52">
                    {item.body}
                  </p>
                  <p className="mt-4 border-t border-platinum/10 pt-4 text-[13px] leading-[1.75] text-platinum/38">
                    {item.problem}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-5 inline-block text-[12px] tracking-[0.14em] text-platinum/70 transition-colors hover:text-blood"
                  >
                    Start {item.title.toLowerCase()} inquiry
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <div className="bg-black px-8 py-10 lg:col-span-2 lg:px-12 lg:py-14">
            <h2 className="font-canela-display text-[clamp(34px,4vw,64px)] leading-[0.94] tracking-[-0.045em] text-platinum">
              Case study
            </h2>
            <p className="mt-5 max-w-[42rem] text-[16px] leading-[1.8] text-platinum/55">
              Beauty launch across three markets, structured around one represented face, defined rights, and governed reuse.
            </p>
            <div className="mt-10 grid gap-px bg-platinum/10 md:grid-cols-2 xl:grid-cols-4">
              {caseStudy.map((item) => (
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
            <div className="mt-8">
              <Link
                href="/case-studies/beauty-launch"
                className="inline-block border border-platinum/20 px-5 py-3 text-[12px] tracking-[0.14em] text-platinum/70 transition-colors hover:border-blood hover:text-blood"
              >
                View full case study
              </Link>
            </div>
          </div>

          <div className="bg-black px-8 py-10 lg:col-span-2 lg:px-12 lg:py-14">
            <h2 className="font-canela-display text-[clamp(34px,4vw,64px)] leading-[0.94] tracking-[-0.045em] text-platinum">
              What stays controlled
            </h2>
            <div className="mt-10 grid gap-px bg-platinum/10 md:grid-cols-2 xl:grid-cols-4">
              {guardrails.map((item) => (
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

          <div className="bg-black px-8 py-10 lg:px-12 lg:py-14">
            <h2 className="font-canela-display text-[clamp(38px,5vw,76px)] leading-[0.94] tracking-[-0.045em] text-platinum">
              Private inquiry for brand teams
            </h2>
            <p className="mt-6 max-w-[34rem] text-[16px] leading-[1.8] text-platinum/58 sm:text-[18px]">
              Tell us the brand, usage, territory, term, and whether you need campaign licensing,
              repeat use, or governance.
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
