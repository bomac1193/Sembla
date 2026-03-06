export interface RosterModel {
  id: string;
  name: string;
  discipline: string;
  city: string;
  token: string;
  image: string;
  status: "Available" | "Booked" | "On Hold";
  bio: string;
}

export const DEFAULT_ROSTER: RosterModel[] = [
  {
    id: "nano-01",
    name: "NANO-01",
    discipline: "DJ / Visual Artist",
    city: "Paris",
    token: "FX-91A",
    image: "/models/model-a.png",
    status: "Available",
    bio: "Chromatic androgyny, angular bone structure. Splits time between editorial campaigns and underground DJ sets across Paris and Berlin. Known for cross-modal work bridging sonic and visual identity."
  },
  {
    id: "nano-02",
    name: "NANO-02",
    discipline: "DJ / Model",
    city: "New York",
    token: "FX-17C",
    image: "/models/model-b.png",
    status: "Booked",
    bio: "Steel gaze, sharp jawline, urban luxury tone. Campaign hero frames for luxury fashion meets nightlife. Resident at three NYC venues, editorial face for two global campaigns."
  },
  {
    id: "nano-03",
    name: "NANO-03",
    discipline: "Producer / Model",
    city: "Tokyo",
    token: "FX-44B",
    image: "/models/model-c.png",
    status: "Available",
    bio: "Porcelain clarity, balanced symmetry. Excels in monochrome high-contrast sets. Produces ambient-electronic under a separate alias. Cross-modal coherence score: 94."
  },
  {
    id: "nano-04",
    name: "NANO-04",
    discipline: "DJ / Creative Director",
    city: "Berlin",
    token: "FX-28D",
    image: "/models/model-d.png",
    status: "Available",
    bio: "Architectural profile, minimal expression set. Creative directs for luxe tech crossovers. Known for brutalist visual language and deep techno sets."
  },
  {
    id: "nano-06",
    name: "NANO-06",
    discipline: "DJ / Model",
    city: "Milan",
    token: "FX-75F",
    image: "/models/model-f.png",
    status: "On Hold",
    bio: "High-contrast silhouette, confident stare. Tailored for couture and luxury tech fusions. Milan fashion week regular, Ibiza residency holder."
  }
];

const STORAGE_KEY = "sembla-roster";

export function loadRoster(): RosterModel[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as RosterModel[];
  } catch {
    return null;
  }
}

export function saveRoster(roster: RosterModel[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roster));
  } catch {
    // localStorage full — silent fail
  }
}

export function generateToken(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = String(Math.floor(Math.random() * 100)).padStart(2, "0");
  const letter = letters[Math.floor(Math.random() * letters.length)];
  return `FX-${num}${letter}`;
}

export function generateId(): string {
  return `model-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export async function compressImage(file: File, maxWidth = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ratio = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas not supported")); return; }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}
