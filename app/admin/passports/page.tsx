"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRoster } from "@/lib/RosterContext";

const fieldGroups = [
  {
    title: "Commercial scope",
    fields: [
      ["territory", "Territory", "UK, EU, UAE"],
      ["term", "Term", "12 months"],
      ["media", "Media", "Stills / paid social / retail"],
      ["exclusivity", "Exclusivity", "Premium beauty only"],
    ],
  },
  {
    title: "Restrictions",
    fields: [
      ["blockedCategories", "Blocked categories", "Alcohol / gambling / political"],
      ["competitorExclusions", "Competitor exclusions", "Direct competitor list"],
      ["editBoundaries", "Edit boundaries", "No facial restructuring or body alteration"],
      ["disclosureRequirements", "Disclosure requirements", "Disclosure note if required"],
    ],
  },
  {
    title: "Approval logic",
    fields: [
      ["talentApprovalRequired", "Talent sign-off", "Yes"],
      ["managerApprovalRequired", "Manager sign-off", "Yes"],
      ["brandApprovalRequired", "Brand sign-off", "Yes"],
      ["newMarketTrigger", "New market trigger", "Requires fresh approval"],
      ["newMediaTrigger", "New media trigger", "Requires scope amendment"],
      ["reuseTrigger", "Reuse trigger", "Requires renewal review"],
    ],
  },
  {
    title: "Operations",
    fields: [
      ["availableFrom", "Available from", "2026-04-01"],
      ["restrictedFrom", "Restricted from", "2026-10-01"],
      ["renewalReminderDate", "Renewal reminder", "2026-11-15"],
      ["approvedLooks", "Approved looks", "Beauty clean / evening / editorial gloss"],
      ["provenanceAttached", "Provenance attached", "Yes"],
      ["notes", "Notes", "Manager wants final approval on market extensions"],
    ],
  },
] as const;

export default function AdminPassportsPage() {
  const { roster, passports, updatePassport, isLoaded } = useRoster();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);

  const selectedPassport = useMemo(() => {
    const activeId = selectedId ?? roster[0]?.id ?? null;
    return passports.find((passport) => passport.modelId === activeId) ?? null;
  }, [passports, roster, selectedId]);

  const selectedModel = useMemo(() => {
    if (!selectedPassport) return null;
    return roster.find((model) => model.id === selectedPassport.modelId) ?? null;
  }, [roster, selectedPassport]);

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-black px-6 pb-20 pt-24 text-platinum sm:px-12">
      <div className="mx-auto max-w-[1400px] space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-platinum/10 pb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-platinum/35">Ops</p>
            <h1 className="mt-3 font-canela-display text-[clamp(34px,4vw,52px)] leading-[0.96] tracking-[-0.04em] text-platinum">
              Likeness Passport Ops
            </h1>
            <p className="mt-4 max-w-[42rem] text-[14px] leading-[1.8] text-platinum/55">
              One record per represented face, tied to approvals, restrictions, usage logic, and renewal control.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/admin"
              className="text-[12px] tracking-[0.14em] text-platinum/35 transition-colors hover:text-platinum"
            >
              Back to admin
            </Link>
            <Link
              href="/models"
              className="text-[12px] tracking-[0.14em] text-platinum/35 transition-colors hover:text-platinum"
            >
              Open selected talent
            </Link>
          </div>
        </div>

        <div className="grid gap-px bg-platinum/10 lg:grid-cols-[0.38fr_0.62fr]">
          <aside className="bg-black px-6 py-6 sm:px-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-platinum/35">Represented faces</p>
            <div className="mt-6 space-y-3">
              {roster.map((model) => {
                const isSelected = model.id === (selectedPassport?.modelId ?? roster[0]?.id);

                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setSelectedId(model.id)}
                    className={`w-full border px-4 py-4 text-left transition-colors ${
                      isSelected
                        ? "border-blood/50 bg-blood/5"
                        : "border-platinum/10 hover:border-platinum/25"
                    }`}
                  >
                    <p className="font-canela-display text-[28px] leading-[0.96] tracking-[-0.035em] text-platinum">
                      {model.name}
                    </p>
                    <div className="mt-4 grid gap-2 text-[12px]">
                      <div className="flex items-center justify-between gap-4">
                        <span className="uppercase tracking-[0.22em] text-platinum/30">License</span>
                        <span className="font-mono text-platinum/58">{model.token}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="uppercase tracking-[0.22em] text-platinum/30">Location</span>
                        <span className="text-platinum/58">{model.city}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="bg-black px-6 py-6 sm:px-8">
            {selectedPassport && selectedModel ? (
              <div className="space-y-8">
                <div className="grid gap-px bg-platinum/10 md:grid-cols-4">
                  <ReadOnlyCard label="Talent" value={selectedPassport.talentName} />
                  <ReadOnlyCard label="License" value={selectedPassport.licenseId} mono />
                  <ReadOnlyCard label="Base" value={selectedPassport.baseLocation} />
                  <ReadOnlyCard label="Discipline" value={selectedPassport.primaryDisciplines} />
                </div>

                <div className="grid gap-px bg-platinum/10 md:grid-cols-2">
                  {fieldGroups.map((group) => (
                    <article key={group.title} className="bg-black px-6 py-6">
                      <h2 className="font-canela-display text-[30px] leading-[0.96] tracking-[-0.04em] text-platinum">
                        {group.title}
                      </h2>
                      <div className="mt-6 space-y-4 border-t border-platinum/10 pt-6">
                        {group.fields.map(([field, label, placeholder]) => (
                          <label key={field} className="block">
                            <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-platinum/35">
                              {label}
                            </span>
                            <textarea
                              rows={field === "notes" || field === "editBoundaries" || field === "approvedLooks" ? 3 : 2}
                              value={selectedPassport[field]}
                              onChange={(event) => {
                                updatePassport(selectedPassport.modelId, { [field]: event.target.value });
                                setSavedFlash(true);
                                window.clearTimeout((window as Window & { __passportSaved?: number }).__passportSaved);
                                (window as Window & { __passportSaved?: number }).__passportSaved = window.setTimeout(() => {
                                  setSavedFlash(false);
                                }, 1500);
                              }}
                              placeholder={placeholder}
                              className="w-full resize-none border border-platinum/15 bg-black px-4 py-3 text-[14px] leading-[1.7] text-platinum outline-none transition-colors focus:border-blood/40"
                            />
                          </label>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-platinum/10 pt-5">
                  <p className="text-[13px] leading-[1.7] text-platinum/38">
                    Model names, location, discipline, and license stay synced from the roster.
                  </p>
                  {savedFlash ? (
                    <span className="text-[11px] uppercase tracking-[0.3em] text-green-500">Saved</span>
                  ) : null}
                </div>
              </div>
            ) : (
              <p className="text-[14px] text-platinum/55">No passport selected.</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function ReadOnlyCard({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <article className="bg-black px-5 py-6">
      <p className="text-[11px] uppercase tracking-[0.24em] text-platinum/30">{label}</p>
      <p className={`mt-4 text-[15px] leading-[1.7] text-platinum/60 ${mono ? "font-mono" : ""}`}>
        {value}
      </p>
    </article>
  );
}
