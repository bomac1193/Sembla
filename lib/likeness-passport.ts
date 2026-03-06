import type { RosterModel } from "./roster";

export interface LikenessPassport {
  modelId: string;
  talentName: string;
  licenseId: string;
  baseLocation: string;
  primaryDisciplines: string;
  currentStatus: RosterModel["status"];
  availableFrom: string;
  restrictedFrom: string;
  renewalReminderDate: string;
  approvedLooks: string;
  territory: string;
  term: string;
  media: string;
  exclusivity: string;
  blockedCategories: string;
  competitorExclusions: string;
  editBoundaries: string;
  disclosureRequirements: string;
  talentApprovalRequired: string;
  managerApprovalRequired: string;
  brandApprovalRequired: string;
  newMarketTrigger: string;
  newMediaTrigger: string;
  reuseTrigger: string;
  provenanceAttached: string;
  notes: string;
}

const STORAGE_KEY = "sembla-passports";

export function createPassportFromModel(model: RosterModel): LikenessPassport {
  return {
    modelId: model.id,
    talentName: model.name,
    licenseId: model.token,
    baseLocation: model.city,
    primaryDisciplines: model.discipline,
    currentStatus: model.status,
    availableFrom: "",
    restrictedFrom: "",
    renewalReminderDate: "",
    approvedLooks: "Beauty clean / evening / editorial gloss",
    territory: "Defined per campaign",
    term: "Defined per campaign",
    media: "Stills / paid social / retail",
    exclusivity: "Scoped privately",
    blockedCategories: "Alcohol / gambling / political",
    competitorExclusions: "",
    editBoundaries: "No facial restructuring or body alteration",
    disclosureRequirements: "Attached where required",
    talentApprovalRequired: "Yes",
    managerApprovalRequired: "Yes",
    brandApprovalRequired: "Yes",
    newMarketTrigger: "Requires fresh approval",
    newMediaTrigger: "Requires scope amendment",
    reuseTrigger: "Requires renewal review",
    provenanceAttached: "Yes",
    notes: "",
  };
}

export function syncPassportsWithRoster(
  roster: RosterModel[],
  existing: LikenessPassport[],
): LikenessPassport[] {
  const byModelId = new Map(existing.map((passport) => [passport.modelId, passport]));

  return roster.map((model) => {
    const current = byModelId.get(model.id);
    const base = current ?? createPassportFromModel(model);

    return {
      ...base,
      modelId: model.id,
      talentName: model.name,
      licenseId: model.token,
      baseLocation: model.city,
      primaryDisciplines: model.discipline,
      currentStatus: model.status,
    };
  });
}

export function loadPassports(): LikenessPassport[] | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LikenessPassport[];
  } catch {
    return null;
  }
}

export function savePassports(passports: LikenessPassport[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(passports));
  } catch {
    // localStorage full — silent fail
  }
}
