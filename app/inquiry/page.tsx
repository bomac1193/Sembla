"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type InquiryForm = {
  name: string;
  company: string;
  email: string;
  sector: string;
  need: string;
  campaign: string;
  usage: string;
  territory: string;
  term: string;
  notes: string;
};

const initialForm: InquiryForm = {
  name: "",
  company: "",
  email: "",
  sector: "",
  need: "",
  campaign: "",
  usage: "",
  territory: "",
  term: "",
  notes: ""
};

function buildMailto(form: InquiryForm): string {
  const subject = form.company
    ? `Inquiry — ${form.company}`
    : "Inquiry — Sembla";

  const body = [
    `Name: ${form.name || "-"}`,
    `Company: ${form.company || "-"}`,
    `Email: ${form.email || "-"}`,
    `Sector: ${form.sector || "-"}`,
    `Need now: ${form.need || "-"}`,
    `Campaign: ${form.campaign || "-"}`,
    `Usage: ${form.usage || "-"}`,
    `Territory: ${form.territory || "-"}`,
    `Term: ${form.term || "-"}`,
    "",
    "Notes:",
    form.notes || "-"
  ].join("\n");

  return `mailto:hello@sembla.agency?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function InquiryPage() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<InquiryForm>(initialForm);
  const service = searchParams.get("service");
  const sector = searchParams.get("sector");

  const updateField = (field: keyof InquiryForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!service) return;
    setForm((prev) => (
      prev.need
        ? prev
        : { ...prev, need: service }
    ));
  }, [service]);

  useEffect(() => {
    if (!sector) return;
    setForm((prev) => (
      prev.sector
        ? prev
        : { ...prev, sector }
    ));
  }, [sector]);

  return (
    <main className="min-h-screen bg-black text-platinum">
      <header className="fixed top-0 left-0 right-0 h-16 bg-black/95 backdrop-blur-sm border-b border-platinum/10 flex items-center px-6 sm:px-12 z-50">
        <div className="w-full flex items-center justify-between max-w-[1400px] mx-auto">
          <Link href="/" className="font-canela-display text-[30px] leading-none tracking-[-0.04em] text-platinum">
            Sembla
          </Link>
          <nav className="flex items-center gap-6 text-[11px] tracking-[0.18em] sm:gap-8">
            <Link href="/offerings" className="text-platinum/50 hover:text-platinum transition-colors">Offerings</Link>
            <Link href="/models" className="text-platinum/50 hover:text-platinum transition-colors">Selected Talent</Link>
            <Link href="/inquiry" className="text-platinum transition-colors">Inquiry</Link>
          </nav>
        </div>
      </header>

      <section className="px-6 pb-24 pt-32 sm:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-platinum/10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-black px-8 py-10 lg:px-12 lg:py-14">
            <p className="text-[11px] uppercase tracking-[0.4em] text-platinum/35">
              Private inquiry
            </p>
            <h1 className="mt-5 font-canela-display text-[clamp(40px,5vw,76px)] leading-[0.94] tracking-[-0.045em] text-platinum">
              Access for campaigns, licensing, and selected talent requests.
            </h1>
            <p className="mt-6 max-w-[34rem] text-[16px] leading-[1.8] text-platinum/58 sm:text-[18px]">
              Share the sector, need, usage, territory, and term. We will respond directly.
            </p>

            <div className="mt-12 space-y-6 border-t border-platinum/10 pt-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-platinum/35">
                  Direct email
                </p>
                <a
                  href="mailto:hello@sembla.agency"
                  className="mt-2 inline-block text-[15px] tracking-[0.08em] text-platinum hover:text-blood transition-colors"
                >
                  hello@sembla.agency
                </a>
              </div>
            </div>
          </div>

          <div className="bg-black px-8 py-10 lg:px-12 lg:py-14">
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = buildMailto(form);
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[11px] tracking-[0.18em] text-platinum/38">Name</span>
                  <input
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full border border-platinum/15 bg-black px-4 py-3 text-[14px] text-platinum outline-none transition-colors focus:border-blood/40"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[11px] tracking-[0.18em] text-platinum/38">Company</span>
                  <input
                    value={form.company}
                    onChange={(e) => updateField("company", e.target.value)}
                    className="w-full border border-platinum/15 bg-black px-4 py-3 text-[14px] text-platinum outline-none transition-colors focus:border-blood/40"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-[11px] tracking-[0.18em] text-platinum/38">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full border border-platinum/15 bg-black px-4 py-3 text-[14px] text-platinum outline-none transition-colors focus:border-blood/40"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[11px] tracking-[0.18em] text-platinum/38">Sector</span>
                  <select
                    value={form.sector}
                    onChange={(e) => updateField("sector", e.target.value)}
                    className="w-full border border-platinum/15 bg-black px-4 py-3 text-[14px] text-platinum outline-none transition-colors focus:border-blood/40"
                  >
                    <option value="">Select sector</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Spirits">Spirits</option>
                    <option value="Other premium sector">Other premium sector</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-[11px] tracking-[0.18em] text-platinum/38">Need now</span>
                  <select
                    value={form.need}
                    onChange={(e) => updateField("need", e.target.value)}
                    className="w-full border border-platinum/15 bg-black px-4 py-3 text-[14px] text-platinum outline-none transition-colors focus:border-blood/40"
                  >
                    <option value="">Select need</option>
                    <option value="Campaign Licensing">Campaign Licensing</option>
                    <option value="Repeat Use">Repeat Use</option>
                    <option value="Governance">Governance</option>
                    <option value="Digital Rights Representation">Digital Rights Representation</option>
                    <option value="Selected Talent Request">Selected Talent Request</option>
                    <option value="Full Redacted Proof Pack">Full Redacted Proof Pack</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-[11px] tracking-[0.18em] text-platinum/38">Campaign or brief</span>
                <input
                  value={form.campaign}
                  onChange={(e) => updateField("campaign", e.target.value)}
                  placeholder="Editorial, launch, licensing inquiry, talent shortlist..."
                  className="w-full border border-platinum/15 bg-black px-4 py-3 text-[14px] text-platinum placeholder:text-platinum/18 outline-none transition-colors focus:border-blood/40"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[11px] tracking-[0.18em] text-platinum/38">Usage</span>
                <input
                  value={form.usage}
                  onChange={(e) => updateField("usage", e.target.value)}
                  placeholder="Territory, term, channels, exclusivity..."
                  className="w-full border border-platinum/15 bg-black px-4 py-3 text-[14px] text-platinum placeholder:text-platinum/18 outline-none transition-colors focus:border-blood/40"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[11px] tracking-[0.18em] text-platinum/38">Territory</span>
                  <input
                    value={form.territory}
                    onChange={(e) => updateField("territory", e.target.value)}
                    placeholder="UK, EU, GCC, global..."
                    className="w-full border border-platinum/15 bg-black px-4 py-3 text-[14px] text-platinum placeholder:text-platinum/18 outline-none transition-colors focus:border-blood/40"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[11px] tracking-[0.18em] text-platinum/38">Term</span>
                  <input
                    value={form.term}
                    onChange={(e) => updateField("term", e.target.value)}
                    placeholder="3 months, 12 months, seasonal..."
                    className="w-full border border-platinum/15 bg-black px-4 py-3 text-[14px] text-platinum placeholder:text-platinum/18 outline-none transition-colors focus:border-blood/40"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-[11px] tracking-[0.18em] text-platinum/38">Notes</span>
                <textarea
                  rows={7}
                  value={form.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  placeholder="Share what you need and the stage you are at."
                  className="w-full resize-none border border-platinum/15 bg-black px-4 py-3 text-[14px] text-platinum placeholder:text-platinum/18 outline-none transition-colors focus:border-blood/40"
                />
              </label>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <button
                  type="submit"
                  className="border border-blood/50 px-8 py-4 text-[14px] tracking-[0.12em] text-blood hover:bg-blood hover:text-black transition-all"
                >
                  Continue via email
                </button>
                <p className="text-[13px] leading-[1.7] tracking-[0.08em] text-platinum/35">
                  This opens your email client with the inquiry prefilled.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
