import Link from "next/link";
import { notFound } from "next/navigation";
import { getProofArtifact } from "@/lib/proof-package";

export default async function ProofArtifactPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artifact = getProofArtifact(slug);

  if (!artifact) {
    notFound();
  }

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
          <div className="mt-8 max-w-[900px]">
            <h1 className="font-canela-display text-[clamp(46px,7vw,96px)] leading-[0.92] tracking-[-0.05em] text-platinum">
              {artifact.title}
            </h1>
            <p className="mt-6 max-w-[760px] text-[18px] leading-[1.8] text-platinum/58">
              {artifact.summary}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`/proof/${artifact.slug}/download`}
              className="border border-blood/50 px-6 py-3 text-[12px] tracking-[0.14em] text-blood transition-colors hover:bg-blood hover:text-black"
            >
              Download sample summary
            </a>
            <Link
              href={`/inquiry?service=${encodeURIComponent(`Redacted ${artifact.title} sample`)}`}
              className="border border-platinum/20 px-6 py-3 text-[12px] tracking-[0.14em] text-platinum/70 transition-colors hover:border-blood hover:text-blood"
            >
              Request full redacted pack
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-platinum/10 px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-px bg-platinum/10 lg:grid-cols-4">
            {artifact.lines.map(([label, value]) => (
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
        <div className="mx-auto grid max-w-[1400px] gap-px bg-platinum/10 lg:grid-cols-3">
          {artifact.sections.map((section) => (
            <article key={section.title} className="bg-black px-8 py-10 lg:px-10 lg:py-12">
              <h2 className="font-canela-display text-[34px] leading-[0.96] tracking-[-0.04em] text-platinum">
                {section.title}
              </h2>
              <div className="mt-6 space-y-4 border-t border-platinum/10 pt-6">
                {section.rows.map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-6 border-b border-platinum/6 pb-4 text-[13px]">
                    <span className="shrink-0 uppercase tracking-[0.22em] text-platinum/32">{label}</span>
                    <span className="max-w-[18rem] text-right leading-[1.7] text-platinum/58">{value}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
