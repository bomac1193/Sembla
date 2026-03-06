"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { type RosterModel, DEFAULT_ROSTER, loadRoster, saveRoster } from "./roster";

interface RosterContextValue {
  roster: RosterModel[];
  isLoaded: boolean;
  updateModel: (id: string, updates: Partial<RosterModel>) => void;
  addModel: (model: RosterModel) => void;
  deleteModel: (id: string) => void;
  resetToDefaults: () => void;
}

const RosterContext = createContext<RosterContextValue | null>(null);

export function RosterProvider({ children }: { children: ReactNode }) {
  const [roster, setRoster] = useState<RosterModel[]>(DEFAULT_ROSTER);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadRoster();
    if (saved && saved.length > 0) {
      setRoster(saved);
    }
    setIsLoaded(true);
  }, []);

  // Persist to localStorage on change (skip initial mount)
  useEffect(() => {
    if (isLoaded) {
      saveRoster(roster);
    }
  }, [roster, isLoaded]);

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

  const addModel = useCallback((model: RosterModel) => {
    setRoster((prev) => [...prev, model]);
  }, []);

  const deleteModel = useCallback((id: string) => {
    setRoster((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const resetToDefaults = useCallback(() => {
    setRoster(DEFAULT_ROSTER);
  }, []);

  return (
    <RosterContext.Provider value={{ roster, isLoaded, updateModel, addModel, deleteModel, resetToDefaults }}>
      {children}
    </RosterContext.Provider>
  );
}

export function useRoster(): RosterContextValue {
  const ctx = useContext(RosterContext);
  if (!ctx) throw new Error("useRoster must be used within a RosterProvider");
  return ctx;
}
