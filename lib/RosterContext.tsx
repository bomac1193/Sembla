"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { type RosterModel, DEFAULT_ROSTER, loadRoster, saveRoster } from "./roster";
import {
  type LikenessPassport,
  createPassportFromModel,
  loadPassports,
  savePassports,
  syncPassportsWithRoster,
} from "./likeness-passport";

interface RosterContextValue {
  roster: RosterModel[];
  passports: LikenessPassport[];
  isLoaded: boolean;
  updateModel: (id: string, updates: Partial<RosterModel>) => void;
  updatePassport: (modelId: string, updates: Partial<LikenessPassport>) => void;
  addModel: (model: RosterModel) => void;
  deleteModel: (id: string) => void;
  resetToDefaults: () => void;
}

const RosterContext = createContext<RosterContextValue | null>(null);

export function RosterProvider({ children }: { children: ReactNode }) {
  const [roster, setRoster] = useState<RosterModel[]>(DEFAULT_ROSTER);
  const [passports, setPassports] = useState<LikenessPassport[]>(() =>
    DEFAULT_ROSTER.map((model) => createPassportFromModel(model)),
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadRoster();
    const nextRoster = saved && saved.length > 0 ? saved : DEFAULT_ROSTER;
    setRoster(nextRoster);

    const savedPassports = loadPassports();
    setPassports(syncPassportsWithRoster(nextRoster, savedPassports ?? []));
    setIsLoaded(true);
  }, []);

  // Persist to localStorage on change (skip initial mount)
  useEffect(() => {
    if (isLoaded) {
      saveRoster(roster);
    }
  }, [roster, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    setPassports((prev) => {
      const synced = syncPassportsWithRoster(roster, prev);
      return JSON.stringify(prev) === JSON.stringify(synced) ? prev : synced;
    });
  }, [roster, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      savePassports(passports);
    }
  }, [passports, isLoaded]);

  // Cross-tab sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "sembla-roster" && e.newValue) {
        try {
          setRoster(JSON.parse(e.newValue));
        } catch { /* ignore parse errors */ }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const updateModel = useCallback((id: string, updates: Partial<RosterModel>) => {
    setRoster((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  }, []);

  const updatePassport = useCallback((modelId: string, updates: Partial<LikenessPassport>) => {
    setPassports((prev) =>
      prev.map((passport) => (
        passport.modelId === modelId ? { ...passport, ...updates } : passport
      )),
    );
  }, []);

  const addModel = useCallback((model: RosterModel) => {
    setRoster((prev) => [...prev, model]);
    setPassports((prev) => [...prev, createPassportFromModel(model)]);
  }, []);

  const deleteModel = useCallback((id: string) => {
    setRoster((prev) => prev.filter((m) => m.id !== id));
    setPassports((prev) => prev.filter((passport) => passport.modelId !== id));
  }, []);

  const resetToDefaults = useCallback(() => {
    setRoster(DEFAULT_ROSTER);
    setPassports(DEFAULT_ROSTER.map((model) => createPassportFromModel(model)));
  }, []);

  return (
    <RosterContext.Provider
      value={{ roster, passports, isLoaded, updateModel, updatePassport, addModel, deleteModel, resetToDefaults }}
    >
      {children}
    </RosterContext.Provider>
  );
}

export function useRoster(): RosterContextValue {
  const ctx = useContext(RosterContext);
  if (!ctx) throw new Error("useRoster must be used within a RosterProvider");
  return ctx;
}
