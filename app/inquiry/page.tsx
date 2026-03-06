"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type InquiryForm = {
  name: string;
  company: string;
  email: string;
  campaign: string;
  usage: string;
  notes: string;
};

const initialForm: InquiryForm = {
  name: "",
  company: "",
  email: "",
  campaign: "",
  usage: "",
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
    `Campaign: ${form.campaign || "-"}`,
    `Usage: ${form.usage || "-"}`,
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

  const updateField = (field: keyof InquiryForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!service) return;
    setForm((prev) => (
      prev.campaign
        ? prev
        : { ...prev, campaign: service }
    ));
  }, [service]);

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
            <Link href="/roster/upload" className="text-blood/70 hover:text-blood transition-colors">Admin</Link>
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
              Tell us who you are, what you need, and the usage you are considering.
              We will respond directly.
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

              <label className="block">
                <span className="mb-2 block text-[11px] tracking-[0.18em] text-platinum/38">Campaign</span>
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
