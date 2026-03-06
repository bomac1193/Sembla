export type ProofArtifactRow = readonly [string, string];

export type ProofArtifactSection = {
  title: string;
  rows: ProofArtifactRow[];
};

export type ProofArtifact = {
  slug: string;
  title: string;
  summary: string;
  lines: ProofArtifactRow[];
  sections: ProofArtifactSection[];
};

export const proofArtifacts: ProofArtifact[] = [
  {
    slug: "usage-scope",
    title: "Usage scope",
    summary: "Defined commercial use before delivery, covering territory, term, media, restrictions, and renewal logic.",
    lines: [
      ["Territory", "UK, EU, UAE"],
      ["Term", "12 months"],
      ["Media", "Stills, paid social, retail"],
      ["Exclusivity", "Premium beauty"],
    ],
    sections: [
      {
        title: "Campaign scope",
        rows: [
          ["Brand", "Maison Verre Beauty"],
          ["Campaign", "Holiday complexion launch"],
          ["Talent", "One represented likeness"],
          ["Use window", "Launch plus seasonal extension"],
        ],
      },
      {
        title: "Restrictions",
        rows: [
          ["Blocked categories", "Alcohol, gambling, political"],
          ["Edit boundaries", "No facial restructuring or body alteration"],
          ["Retail use", "Counters, paid media, ecommerce PDP"],
          ["New market trigger", "Requires fresh approval"],
        ],
      },
      {
        title: "Renewal logic",
        rows: [
          ["Extension notice", "30 days before term end"],
          ["Additional media", "Requires scope amendment"],
          ["Exclusivity", "Premium beauty only"],
          ["Audit trail", "Maintained by Sembla"],
        ],
      },
    ],
  },
  {
    slug: "consent-pack",
    title: "Consent pack",
    summary: "Approved source material, protected edit boundaries, and the sign-off record attached to the face.",
    lines: [
      ["Approved looks", "3"],
      ["Restrictions", "Alcohol, political"],
      ["Edit limits", "Body and face guarded"],
      ["Status", "Cleared for use"],
    ],
    sections: [
      {
        title: "Approved source set",
        rows: [
          ["Capture type", "Studio stills and motion reference"],
          ["Looks approved", "Beauty clean, evening, editorial gloss"],
          ["Hair and makeup", "Locked by look"],
          ["Wardrobe notes", "Metallic and black only"],
        ],
      },
      {
        title: "Edit boundaries",
        rows: [
          ["Allowed", "Lighting, crop, background, product integration"],
          ["Restricted", "Body reshaping, facial reconstruction"],
          ["Retouch policy", "Premium finish only, likeness preserved"],
          ["Escalation", "Manager sign-off on edge cases"],
        ],
      },
      {
        title: "Approval trail",
        rows: [
          ["Talent sign-off", "Completed"],
          ["Manager sign-off", "Completed"],
          ["Brand sign-off", "Pending final selects"],
          ["Record owner", "Sembla governance file"],
        ],
      },
    ],
  },
  {
    slug: "deliverable-inventory",
    title: "Deliverable inventory",
    summary: "A delivery record that keeps asset versions, market variants, and the license reference attached.",
    lines: [
      ["Hero stills", "6"],
      ["Market variants", "12"],
      ["Cutdowns", "4"],
      ["License ID", "SL-24A"],
    ],
    sections: [
      {
        title: "Asset summary",
        rows: [
          ["Master selects", "6 hero stills"],
          ["Retail crops", "8"],
          ["Paid social variants", "12"],
          ["Motion cutdowns", "4 short edits"],
        ],
      },
      {
        title: "Delivery structure",
        rows: [
          ["Folder logic", "Master / market / channel"],
          ["Naming", "License ID attached to all exports"],
          ["Approval state", "Final approved only"],
          ["Version control", "Logged by Sembla"],
        ],
      },
      {
        title: "Commercial handoff",
        rows: [
          ["Usage summary", "Included"],
          ["Renewal reminder", "Included"],
          ["Disclosure note", "Included if required"],
          ["Provenance record", "Attached on handoff"],
        ],
      },
    ],
  },
];

export function getProofArtifact(slug: string): ProofArtifact | null {
  return proofArtifacts.find((artifact) => artifact.slug === slug) ?? null;
}

export function buildProofArtifactDownload(artifact: ProofArtifact): string {
  const header = [
    "Sembla Redacted Proof Sample",
    artifact.title,
    "",
    artifact.summary,
    "",
    "Snapshot",
    ...artifact.lines.map(([label, value]) => `${label}: ${value}`),
    "",
  ];

  const sections = artifact.sections.flatMap((section) => [
    section.title,
    ...section.rows.map(([label, value]) => `${label}: ${value}`),
    "",
  ]);

  return [...header, ...sections].join("\n");
}
