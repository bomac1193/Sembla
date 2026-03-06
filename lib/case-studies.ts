export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  ctaSector: string;
  ctaService: string;
  snapshot: readonly (readonly [string, string])[];
  sections: readonly {
    title: string;
    body: string;
  }[];
  deliverables: readonly string[];
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "beauty-launch",
    title: "Beauty launch across three markets",
    subtitle: "One represented face, one rights structure, and a controlled output package built for repeat use.",
    ctaSector: "Beauty",
    ctaService: "Likeness Licensing",
    snapshot: [
      ["Sector", "Beauty"],
      ["Markets", "UK, EU, UAE"],
      ["Term", "12 months"],
      ["Outputs", "Hero stills, retail, paid social"],
    ],
    sections: [
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
    ],
    deliverables: [
      "Talent selection and usage memo",
      "Consent and approval pack",
      "Usage scope by territory, term, media, and restrictions",
      "Hero stills, market variants, and cutdowns",
      "Renewal logic and provenance handoff",
    ],
  },
  {
    slug: "hospitality-rollout",
    title: "Hospitality rollout across regional campaigns",
    subtitle: "A controlled likeness system for regional launch, digital, and property storytelling without repeat reshoots.",
    ctaSector: "Hospitality",
    ctaService: "Stewardship & Governance",
    snapshot: [
      ["Sector", "Hospitality"],
      ["Markets", "Singapore, Dubai, London"],
      ["Term", "9 months"],
      ["Outputs", "Brand stills, digital, property use"],
    ],
    sections: [
      {
        title: "Challenge",
        body: "A luxury hospitality group needed one face to anchor regional brand storytelling across launch, digital, and property touchpoints without repeated travel production.",
      },
      {
        title: "Structure",
        body: "Sembla licensed the likeness, set territory and property-use rules, defined guest-facing boundaries, and mapped the approval logic across regional teams.",
      },
      {
        title: "Outputs",
        body: "The group received master stills, market-specific crops, digital homepage variants, and property-ready image sets from one approved source package.",
      },
      {
        title: "Governance",
        body: "As the rollout expanded, Sembla managed localized approvals, term extensions, and version control so each property stayed inside the approved scope.",
      },
    ],
    deliverables: [
      "Regional usage memo and property-use structure",
      "Consent and guest-facing approval notes",
      "Master stills and market variants",
      "Property-ready image sets",
      "Localized renewal and version-control record",
    ],
  },
  {
    slug: "spirits-activation",
    title: "Spirits activation with tightly scoped use",
    subtitle: "A premium activation package built around one approved face, one territory structure, and clear restriction logic.",
    ctaSector: "Spirits",
    ctaService: "Likeness Licensing",
    snapshot: [
      ["Sector", "Spirits"],
      ["Markets", "UK, France, UAE"],
      ["Term", "6 months"],
      ["Outputs", "Ambassador stills, retail, social"],
    ],
    sections: [
      {
        title: "Challenge",
        body: "A premium spirits brand needed ambassador-facing content for a launch and retail push across multiple markets with category restrictions and territory sensitivity built in.",
      },
      {
        title: "Structure",
        body: "Sembla licensed the likeness, defined the permitted channels, set alcohol-category boundaries, and locked the term and territory logic before delivery.",
      },
      {
        title: "Outputs",
        body: "The brand received hero stills, activation variants, retail crops, and selective paid-social assets structured around one controlled rights package.",
      },
      {
        title: "Governance",
        body: "When distribution widened, Sembla handled renewal review, added-market approvals, and updated disclosure and provenance notes for each extension.",
      },
    ],
    deliverables: [
      "Territory and term usage scope",
      "Category-restriction and approval pack",
      "Ambassador stills and activation variants",
      "Retail and paid-social delivery set",
      "Renewal and disclosure record",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | null {
  return caseStudies.find((study) => study.slug === slug) ?? null;
}
