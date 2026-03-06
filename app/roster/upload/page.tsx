"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { normalizeDiscipline, toDisplayCase } from "@/lib/display";
import { useRoster } from "@/lib/RosterContext";
import { generateToken, generateId, compressImage } from "@/lib/roster";
import type { RosterModel } from "@/lib/roster";

async function uploadImage(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch("/api/roster/upload", { method: "POST", body: formData });
    if (res.ok) {
      const data = await res.json();
      return data.path;
    }
  } catch { /* fall through */ }
  return compressImage(file, 800, 0.7);
}

export default function RosterUploadPage() {
  const { roster, addModel, deleteModel, updateModel, resetToDefaults, isLoaded } = useRoster();
  const [name, setName] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAdd = async () => {
    if (!name || !selectedFile) return;
    setUploading(true);
    setFeedback(null);

    let imagePath = "";

    // Try filesystem upload first
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      const res = await fetch("/api/roster/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        imagePath = data.path;
      }
    } catch {
      // Filesystem upload failed — fall through to base64
    }

    // Fallback: compress to base64
    if (!imagePath) {
      try {
        imagePath = await compressImage(selectedFile, 800, 0.7);
      } catch {
        setFeedback("Failed to process image.");
        setUploading(false);
        return;
      }
    }

    const newModel: RosterModel = {
      id: generateId(),
      name,
      discipline: discipline ? normalizeDiscipline(discipline) : "DJ / Model",
      city: city || "—",
      token: generateToken(),
      image: imagePath,
      status: "Available",
      bio: bio || "",
    };

    addModel(newModel);
    setFeedback(`${name} added to roster.`);

    // Reset form
    setName("");
    setDiscipline("");
    setCity("");
    setBio("");
    setImagePreview(null);
    setSelectedFile(null);
    if (fileRef.current) fileRef.current.value = "";
    setUploading(false);
  };

  const handleDelete = (id: string) => {
    deleteModel(id);
    setConfirmDelete(null);
    setFeedback("Model removed from roster.");
  };

  const handleReset = () => {
    resetToDefaults();
    setConfirmReset(false);
    setFeedback("Roster reset to defaults.");
  };

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-black text-platinum">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-black/95 backdrop-blur-sm border-b border-platinum/10 flex items-center px-6 sm:px-12 z-50">
        <div className="w-full flex items-center justify-between max-w-[1400px] mx-auto">
          <Link href="/" className="font-canela-display text-[30px] leading-none tracking-[-0.04em] text-platinum">
            Sembla
          </Link>
          <nav className="flex items-center gap-6 text-[11px] tracking-[0.18em] sm:gap-8">
            <Link href="/offerings" className="text-platinum/50 hover:text-platinum transition-colors">Offerings</Link>
            <Link href="/models" className="text-platinum/50 hover:text-platinum transition-colors">Selected Talent</Link>
            <Link href="/inquiry" className="text-platinum/50 hover:text-platinum transition-colors">Inquiry</Link>
            <Link href="/roster/upload" className="text-blood transition-colors">Admin</Link>
          </nav>
        </div>
      </header>

      <div className="pt-32 pb-24 px-6 sm:px-12 max-w-[1400px] mx-auto">
        {/* Page title */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 bg-blood" />
            <span className="text-[11px] uppercase tracking-[0.5em] text-platinum/40 font-mono">
              Admin
            </span>
          </div>
          <h1 className="font-canela-display text-[clamp(36px,5vw,64px)] leading-[0.94] tracking-[-0.04em] text-platinum">
            Roster Management
          </h1>
          <p className="mt-4 text-[14px] text-platinum/40 font-legal">
            Add, remove, and manage models on the agency roster. Changes persist in browser storage.
          </p>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="mb-8 border border-platinum/10 p-4 text-[13px] text-platinum/60 font-mono flex items-center justify-between">
            <span>{feedback}</span>
            <button onClick={() => setFeedback(null)} className="text-platinum/30 hover:text-platinum text-[16px]">&times;</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Upload form */}
          <div className="lg:col-span-5">
            <div className="border border-platinum/10 p-8 space-y-6">
              <p className="text-[12px] uppercase tracking-[0.4em] text-platinum/50 mb-6">New Model</p>

              {/* Image upload */}
              <div
                onClick={() => fileRef.current?.click()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleImageSelect(file);
                }}
                onDragOver={(e) => e.preventDefault()}
                className="relative aspect-[3/4] border border-dashed border-platinum/20 bg-smoke overflow-hidden hover:border-blood/40 transition-colors"
              >
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="model-portrait w-full h-full"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border border-platinum/20 flex items-center justify-center">
                      <span className="text-platinum/30 text-[18px]">+</span>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.4em] text-platinum/30">
                      Drop portrait or click
                    </span>
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageSelect(file);
                }}
              />

              {/* Fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-[0.3em] text-platinum/40 block mb-2">Name / Code</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. SPHINX-01"
                    className="w-full bg-black border border-platinum/15 px-4 py-3 text-[14px] text-platinum placeholder:text-platinum/20 focus:border-blood/40 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[0.3em] text-platinum/40 block mb-2">Discipline</label>
                  <input
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    placeholder="e.g. DJ / Model"
                    className="w-full bg-black border border-platinum/15 px-4 py-3 text-[14px] text-platinum placeholder:text-platinum/20 focus:border-blood/40 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[0.3em] text-platinum/40 block mb-2">City</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Lagos"
                    className="w-full bg-black border border-platinum/15 px-4 py-3 text-[14px] text-platinum placeholder:text-platinum/20 focus:border-blood/40 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[0.3em] text-platinum/40 block mb-2">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Short editorial bio..."
                    rows={3}
                    className="w-full bg-black border border-platinum/15 px-4 py-3 text-[14px] text-platinum placeholder:text-platinum/20 focus:border-blood/40 outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleAdd}
                disabled={!name || !selectedFile || uploading}
                className="w-full border border-platinum/30 py-3.5 text-[12px] uppercase tracking-[0.4em] hover:border-blood hover:text-blood transition-colors disabled:opacity-20 disabled:hover:border-platinum/30 disabled:hover:text-platinum"
              >
                {uploading ? "Adding..." : "Add to Roster"}
              </button>
            </div>
          </div>

          {/* Roster list */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[12px] uppercase tracking-[0.4em] text-platinum/50">
                Current roster
              </p>

              {/* Reset button */}
              {confirmReset ? (
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-platinum/40">Reset all to defaults?</span>
                  <button
                    onClick={handleReset}
                    className="text-[11px] uppercase tracking-[0.3em] text-blood border border-blood/40 px-3 py-1"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="text-[11px] uppercase tracking-[0.3em] text-platinum/40 border border-platinum/10 px-3 py-1"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="text-[11px] uppercase tracking-[0.3em] text-platinum/30 hover:text-platinum/60 transition-colors"
                >
                  Reset to Defaults
                </button>
              )}
            </div>

            {roster.length === 0 ? (
              <div className="border border-platinum/5 bg-smoke/50 py-24 flex items-center justify-center">
                <span className="text-[12px] uppercase tracking-[0.4em] text-platinum/15">
                  Roster empty
                </span>
              </div>
            ) : (
              <div className="space-y-3">
                {roster.map((model) => (
                  <RosterItem
                    key={model.id}
                    model={model}
                    onUpdate={(field, value) => {
                      updateModel(model.id, { [field]: value });
                      setFeedback(`${model.name} updated.`);
                    }}
                    onDelete={() => handleDelete(model.id)}
                    confirmingDelete={confirmDelete === model.id}
                    onConfirmDelete={() => setConfirmDelete(model.id)}
                    onCancelDelete={() => setConfirmDelete(null)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── Inline editable text field for admin list ── */
function InlineEdit({
  value,
  displayValue,
  onSave,
  className = "",
}: {
  value: string;
  displayValue?: string;
  onSave: (val: string) => void;
  className?: string;
}) {
  const editableValue = displayValue ?? value;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(editableValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setDraft(editableValue); }, [editableValue]);
  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          setEditing(false);
          if (draft !== editableValue) onSave(draft);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") { setEditing(false); if (draft !== editableValue) onSave(draft); }
          if (e.key === "Escape") { setEditing(false); setDraft(editableValue); }
        }}
        className={`bg-transparent border-b border-blood/40 outline-none ${className}`}
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      className={`editable-hover cursor-text ${className}`}
    >
      {editableValue}
    </span>
  );
}

/* ── Single roster item row with clickable photo + inline editing ── */
function RosterItem({
  model,
  onUpdate,
  onDelete,
  confirmingDelete,
  onConfirmDelete,
  onCancelDelete,
}: {
  model: RosterModel;
  onUpdate: (field: keyof RosterModel, value: string) => void;
  onDelete: () => void;
  confirmingDelete: boolean;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}) {
  const photoRef = useRef<HTMLInputElement>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const handlePhotoChange = async (file: File) => {
    setUploadingPhoto(true);
    try {
      const path = await uploadImage(file);
      onUpdate("image", path);
    } catch { /* silent */ }
    setUploadingPhoto(false);
  };

  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="border border-platinum/10 bg-smoke/30 flex items-stretch overflow-hidden">
      {/* Clickable + droppable thumbnail */}
      <div
        className={`w-20 sm:w-28 flex-shrink-0 relative group cursor-pointer ${dragOver ? "ring-2 ring-blood ring-inset" : ""}`}
        onClick={() => photoRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file && file.type.startsWith("image/")) handlePhotoChange(file);
        }}
      >
        <Image
          src={model.image}
          alt={model.name}
          fill
          unoptimized
          sizes="112px"
          className="model-portrait w-full h-full min-h-[100px]"
        />
        <div className={`absolute inset-0 flex items-center justify-center transition-colors ${dragOver ? "bg-black/60" : "bg-black/0 group-hover:bg-black/50"}`}>
          <span className={`text-[9px] uppercase tracking-[0.2em] transition-opacity ${dragOver ? "opacity-100 text-blood" : "opacity-0 group-hover:opacity-100"} ${uploadingPhoto ? "text-blood" : "text-platinum/70"}`}>
            {uploadingPhoto ? "..." : dragOver ? "Drop" : "Replace"}
          </span>
        </div>
        <input
          ref={photoRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handlePhotoChange(file);
          }}
        />
      </div>

      {/* Editable info */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-center gap-1">
        <InlineEdit
          value={model.name}
          onSave={(val) => onUpdate("name", val)}
          className="font-canela-text text-[20px] leading-none tracking-[-0.03em]"
        />
        <InlineEdit
          value={model.discipline}
          displayValue={toDisplayCase(model.discipline)}
          onSave={(val) => onUpdate("discipline", normalizeDiscipline(val))}
          className="text-[11px] text-platinum/40 tracking-[0.14em]"
        />
        <div className="mt-1 flex items-center gap-4">
          <InlineEdit
            value={model.city}
            displayValue={toDisplayCase(model.city)}
            onSave={(val) => onUpdate("city", val)}
            className="min-w-[6rem] px-1 text-[10px] tracking-[0.1em] text-platinum/30"
          />
          <span className="shrink-0 border-l border-platinum/10 pl-4 text-[10px] text-platinum/20 font-mono">
            {model.token}
          </span>
          <select
            value={model.status}
            onChange={(e) => onUpdate("status", e.target.value)}
            className="bg-transparent text-[10px] text-platinum/30 uppercase outline-none border-none cursor-pointer"
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>
      </div>

      {/* Delete */}
      {confirmingDelete ? (
        <div className="flex flex-col items-center justify-center gap-1 px-4">
          <button
            onClick={onDelete}
            className="text-[10px] uppercase tracking-[0.2em] text-blood border border-blood/40 px-3 py-1 hover:bg-blood hover:text-black transition-all"
          >
            Delete
          </button>
          <button
            onClick={onCancelDelete}
            className="text-[10px] uppercase tracking-[0.2em] text-platinum/30 px-3 py-1"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={onConfirmDelete}
          className="px-4 text-platinum/20 hover:text-blood transition-colors text-[18px]"
          title="Remove from roster"
        >
          &times;
        </button>
      )}
    </div>
  );
}
