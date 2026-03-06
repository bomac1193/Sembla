"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, Rows3 } from "lucide-react";
import { normalizeDiscipline, toDisplayCase } from "@/lib/display";
import { useRoster } from "@/lib/RosterContext";
import { compressImage, generateToken, generateId } from "@/lib/roster";
import type { RosterModel } from "@/lib/roster";

type ViewMode = "editorial" | "grid";

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

export default function ModelsPage() {
  const { roster, isLoaded, updateModel, addModel } = useRoster();
  const [view, setView] = useState<ViewMode>("editorial");
  const [scale, setScale] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  const flashSaved = useCallback(() => {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  }, []);

  const handleFieldSave = useCallback((id: string, field: keyof RosterModel, value: string) => {
    updateModel(id, { [field]: value });
    flashSaved();
  }, [updateModel, flashSaved]);

  const handleAddPhoto = useCallback((imagePath: string) => {
    const newModel: RosterModel = {
      id: generateId(),
      name: `MODEL-${String(roster.length + 1).padStart(2, "0")}`,
      discipline: "DJ / Model",
      city: "\u2014",
      token: generateToken(),
      image: imagePath,
      status: "Available",
      bio: "",
    };
    addModel(newModel);
    flashSaved();
  }, [addModel, flashSaved, roster.length]);

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
            <Link href="/models" className="text-platinum transition-colors">Selected Talent</Link>
            <Link href="/inquiry" className="text-platinum/50 hover:text-platinum transition-colors">Inquiry</Link>
            <Link href="/roster/upload" className="text-blood/70 hover:text-blood transition-colors">Admin</Link>
          </nav>
        </div>
      </header>

      {/* Title section */}
      <section className="pt-32 pb-8 px-6 sm:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="font-canela-display text-[clamp(48px,8vw,120px)] leading-[0.88] tracking-[-0.045em] text-platinum">
            Selected Talent
          </h1>
          <p className="mt-6 text-[15px] text-platinum/40 max-w-xl font-legal leading-relaxed">
            Each talent is represented exclusively. Digital likeness licensed only through
            auditable consent chains. Direct booking, zero commission.
          </p>
        </div>
      </section>

      {/* Control bar */}
      <section className="px-6 sm:px-12 pb-12">
        <div className="max-w-[1400px] mx-auto border border-platinum/10 bg-black/40 backdrop-blur-sm px-4 py-3 flex flex-wrap items-center gap-4 sm:px-5">
          {/* View toggle */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-platinum/30">View</span>
            <div className="flex items-center gap-1 border border-platinum/10 bg-black/50 p-0.5">
              <button
                type="button"
                onClick={() => setView("editorial")}
                aria-label="Editorial view"
                aria-pressed={view === "editorial"}
                title="Editorial view"
                className={`flex h-7 w-7 items-center justify-center border transition-colors ${
                  view === "editorial"
                    ? "border-platinum/20 bg-platinum/10 text-platinum"
                    : "border-transparent text-platinum/30 hover:text-platinum/60"
                }`}
              >
                <Rows3 className="h-3.5 w-3.5" strokeWidth={1.6} />
              </button>
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-label="Grid view"
                aria-pressed={view === "grid"}
                title="Grid view"
                className={`flex h-7 w-7 items-center justify-center border transition-colors ${
                  view === "grid"
                    ? "border-platinum/20 bg-platinum/10 text-platinum"
                    : "border-transparent text-platinum/30 hover:text-platinum/60"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" strokeWidth={1.6} />
              </button>
            </div>
          </div>

          {/* Scale slider */}
          <div className="flex items-center gap-3 flex-1 max-w-[170px]">
            <span className="text-[10px] uppercase tracking-[0.3em] text-platinum/30">Scale</span>
            <input
              type="range"
              min="0.6"
              max="1.4"
              step="0.05"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="text-[10px] font-mono text-platinum/30 w-8 text-right">
              {scale.toFixed(1)}x
            </span>
          </div>

          {/* Edit mode toggle */}
          <button
            onClick={() => setEditMode(!editMode)}
            className={`text-[11px] tracking-[0.14em] px-3 py-1.5 border transition-colors ${
              editMode
                ? "border-blood text-blood bg-blood/10"
                : "border-platinum/10 text-platinum/30 hover:text-platinum/60"
            }`}
          >
            {editMode ? "Editing" : "Edit Mode"}
          </button>

          {/* Saved indicator */}
          {savedFlash && (
            <span className="saved-flash text-[11px] uppercase tracking-[0.3em] text-green-500 font-mono">
              Saved
            </span>
          )}
        </div>
      </section>

      {/* Roster content */}
      <section className="pb-24">
        {view === "editorial" ? (
          <div>
            {roster.map((model, idx) => (
              <ModelCard
                key={model.id}
                model={model}
                index={idx + 1}
                total={roster.length}
                editMode={editMode}
                onSave={handleFieldSave}
                scale={scale}
              />
            ))}
            {editMode && <AddPhotoCard onAdd={handleAddPhoto} variant="editorial" />}
          </div>
        ) : (
          <div
            className="max-w-[1400px] mx-auto px-6 sm:px-12 grid gap-6"
            style={{
              gridTemplateColumns: `repeat(auto-fill, minmax(${Math.round(280 * scale)}px, 1fr))`
            }}
          >
            {roster.map((model, idx) => (
              <GridCard
                key={model.id}
                model={model}
                index={idx + 1}
                total={roster.length}
                editMode={editMode}
                onSave={handleFieldSave}
                scale={scale}
              />
            ))}
            {editMode && <AddPhotoCard onAdd={handleAddPhoto} variant="grid" />}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-platinum/10 bg-black py-12 px-6 sm:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-canela-display text-[30px] leading-none tracking-[-0.04em] text-platinum/30">Sembla</Link>
          <p className="text-[11px] text-platinum/30 tracking-[0.12em] font-mono">
            &copy; 2026 Sembla
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ── Editable Field ── */
function EditableField({
  value,
  displayValue,
  onSave,
  editMode,
  className = "",
  tag: Tag = "span",
}: {
  value: string;
  displayValue?: string;
  onSave: (val: string) => void;
  editMode: boolean;
  className?: string;
  tag?: "span" | "p" | "h2";
}) {
  const editableValue = displayValue ?? value;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(editableValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setDraft(editableValue); }, [editableValue]);
  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  if (editing && editMode) {
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
          if (e.key === "Enter") {
            setEditing(false);
            if (draft !== editableValue) onSave(draft);
          }
          if (e.key === "Escape") {
            setEditing(false);
            setDraft(editableValue);
          }
        }}
        className={`bg-transparent border-b border-blood/40 outline-none w-full ${className}`}
      />
    );
  }

  return (
    <Tag
      onClick={() => editMode && setEditing(true)}
      className={`${className} ${editMode ? "editable-hover cursor-text" : ""}`}
    >
      {editableValue}
    </Tag>
  );
}

/* ── Editable Textarea ── */
function EditableTextarea({
  value,
  onSave,
  editMode,
  className = "",
}: {
  value: string;
  onSave: (val: string) => void;
  editMode: boolean;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { setDraft(value); }, [value]);
  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);

  if (editing && editMode) {
    return (
      <textarea
        ref={ref}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          setEditing(false);
          if (draft !== value) onSave(draft);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setEditing(false);
            setDraft(value);
          }
        }}
        rows={4}
        className={`bg-transparent border border-blood/30 outline-none w-full resize-none p-2 ${className}`}
      />
    );
  }

  return (
    <p
      onClick={() => editMode && setEditing(true)}
      className={`${className} ${editMode ? "editable-hover cursor-text" : ""}`}
    >
      {value}
    </p>
  );
}

/* ── Editable Status Select ── */
function EditableStatus({
  value,
  onSave,
  editMode,
}: {
  value: string;
  onSave: (val: string) => void;
  editMode: boolean;
}) {
  if (!editMode) {
    return (
      <span className="text-[11px] uppercase tracking-[0.5em] text-platinum/40 font-mono">
        {value}
      </span>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => onSave(e.target.value)}
      className="bg-black border border-platinum/20 text-[11px] uppercase tracking-[0.3em] text-platinum/60 font-mono px-2 py-1 outline-none"
    >
      <option value="Available">Available</option>
      <option value="Booked">Booked</option>
      <option value="On Hold">On Hold</option>
    </select>
  );
}

/* ── Editable Photo ── */
function EditablePhoto({
  src,
  alt,
  onSave,
  editMode,
  className = "",
}: {
  src: string;
  alt: string;
  onSave: (newSrc: string) => void;
  editMode: boolean;
  className?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const path = await uploadImage(file);
      onSave(path);
    } catch { /* silent */ }
    setUploading(false);
  };

  return (
    <div
      className={`relative w-full h-full ${editMode && dragOver ? "ring-2 ring-blood ring-inset" : ""}`}
      onDragOver={(e) => { if (editMode) { e.preventDefault(); setDragOver(true); } }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        if (!editMode) return;
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) handleFile(file);
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes="(min-width: 1024px) 33vw, 100vw"
        className={className}
      />
      {editMode && (
        <>
          <div className={`absolute inset-0 flex items-center justify-center transition-colors ${dragOver ? "bg-black/60" : "bg-black/0 hover:bg-black/50"} group`}>
            {uploading ? (
              <span className="text-[12px] uppercase tracking-[0.3em] text-blood">Uploading...</span>
            ) : dragOver ? (
              <span className="text-[12px] uppercase tracking-[0.3em] text-blood border border-blood/40 px-4 py-2">Drop to Replace</span>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                className="text-[12px] uppercase tracking-[0.3em] border border-platinum/40 px-4 py-2 text-platinum opacity-0 group-hover:opacity-100 transition-opacity hover:border-blood hover:text-blood"
              >
                Replace Photo
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </>
      )}
    </div>
  );
}

/* ── Add Photo Card (creates a new model from a dropped/selected image) ── */
function AddPhotoCard({
  onAdd,
  variant,
}: {
  onAdd: (imagePath: string) => void;
  variant: "editorial" | "grid";
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const path = await uploadImage(file);
      onAdd(path);
    } catch { /* silent */ }
    setUploading(false);
  };

  const handleFiles = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) await handleFile(file);
    }
  };

  if (variant === "grid") {
    return (
      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
        }}
        className={`border border-dashed aspect-[3/4] flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer ${
          dragOver ? "border-blood bg-blood/5" : "border-platinum/15 hover:border-blood/40"
        }`}
      >
        {uploading ? (
          <span className="text-[11px] uppercase tracking-[0.3em] text-blood">Adding...</span>
        ) : (
          <>
            <div className="w-10 h-10 border border-platinum/20 flex items-center justify-center">
              <span className="text-platinum/30 text-[22px]">+</span>
            </div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-platinum/25">
              Add Photo
            </span>
            <span className="text-[9px] text-platinum/15 uppercase tracking-[0.2em]">
              Drop or click
            </span>
          </>
        )}
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files?.length) handleFiles(e.target.files);
          }}
        />
      </div>
    );
  }

  // Editorial variant — full-width drop strip
  return (
    <div
      onClick={() => fileRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
      }}
      className={`max-w-[1400px] mx-auto px-6 sm:px-12 py-16 border-t border-dashed flex items-center justify-center gap-4 transition-colors cursor-pointer ${
        dragOver ? "border-blood bg-blood/5" : "border-platinum/10 hover:border-blood/30"
      }`}
    >
      {uploading ? (
        <span className="text-[12px] uppercase tracking-[0.3em] text-blood">Adding...</span>
      ) : (
        <>
          <div className="w-8 h-8 border border-platinum/20 flex items-center justify-center">
            <span className="text-platinum/30 text-[18px]">+</span>
          </div>
          <span className="text-[12px] uppercase tracking-[0.3em] text-platinum/25">
            Add Photo &mdash; drop or click
          </span>
        </>
      )}
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={(e) => {
          if (e.target.files?.length) handleFiles(e.target.files);
        }}
      />
    </div>
  );
}

/* ── Editorial Model Card (Vertical view) ── */
function ModelCard({
  model,
  index,
  total,
  editMode,
  onSave,
  scale,
}: {
  model: RosterModel;
  index: number;
  total: number;
  editMode: boolean;
  onSave: (id: string, field: keyof RosterModel, value: string) => void;
  scale: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      id={model.token}
      className="border-t border-platinum/5 scroll-mt-20"
      style={{ marginBottom: `${Math.round(48 * scale)}px` }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12 py-16 lg:py-0">

          {/* Image column */}
          <div className="lg:col-span-6 relative overflow-hidden">
            <div
              className="aspect-[3/4] lg:aspect-auto relative bg-smoke"
              style={{ height: `${Math.round(78 * scale)}vh` }}
            >
              <EditablePhoto
                src={model.image}
                alt={model.name}
                onSave={(val) => onSave(model.id, "image", val)}
                editMode={editMode}
                className={`model-portrait w-full h-full transition-all duration-1000 ${
                  visible ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
                }`}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent lg:hidden" />
            </div>
          </div>

          {/* Details column */}
          <div className="lg:col-span-6 flex flex-col justify-center py-12 lg:py-24">
            <div className={`transition-all duration-1000 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}>
              {/* Index */}
              <span className="index-num text-[11px] font-mono text-platinum/20 uppercase tracking-[0.3em]">
                {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>

              {editMode && (
                <div className="mt-6">
                  <EditableStatus
                    value={model.status}
                    onSave={(val) => onSave(model.id, "status", val)}
                    editMode={editMode}
                  />
                </div>
              )}

              {/* Name */}
              <div className="mt-6">
                <EditableField
                  value={model.name}
                  onSave={(val) => onSave(model.id, "name", val)}
                  editMode={editMode}
                  className="font-canela-display text-[clamp(32px,4vw,64px)] leading-[0.94] tracking-[-0.04em] block"
                  tag="h2"
                />
              </div>

              {/* Discipline */}
              <div className="mt-4">
                <EditableField
                  value={model.discipline}
                  displayValue={toDisplayCase(model.discipline)}
                  onSave={(val) => onSave(model.id, "discipline", normalizeDiscipline(val))}
                  editMode={editMode}
                  className="text-[14px] sm:text-[16px] tracking-[0.12em] text-blood/70 block"
                />
              </div>

              {/* Bio */}
              <div className="mt-8">
                <EditableTextarea
                  value={model.bio}
                  onSave={(val) => onSave(model.id, "bio", val)}
                  editMode={editMode}
                  className="text-[14px] sm:text-[15px] text-platinum/50 leading-relaxed font-legal max-w-md"
                />
              </div>

              {/* Metadata grid */}
              <div className="mt-10 space-y-3 border-t border-platinum/10 pt-6">
                <div className="flex items-center justify-between gap-6 text-[12px]">
                  <span className="shrink-0 uppercase tracking-[0.3em] text-platinum/30">Location</span>
                  <EditableField
                    value={model.city}
                    displayValue={toDisplayCase(model.city)}
                    onSave={(val) => onSave(model.id, "city", val)}
                    editMode={editMode}
                    className="min-w-[9rem] text-right text-[13px] tracking-[0.08em] text-platinum/60 sm:min-w-[12rem]"
                  />
                </div>
                <div className="flex items-center justify-between gap-6 text-[12px]">
                  <span className="shrink-0 uppercase tracking-[0.3em] text-platinum/30">License</span>
                  <span className="min-w-[9rem] text-right font-mono text-platinum/60 sm:min-w-[12rem]">
                    {model.token}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-10 flex items-center gap-6">
                <button className="border border-platinum/30 px-8 py-3.5 text-[12px] uppercase tracking-[0.4em] hover:border-blood hover:text-blood transition-colors">
                  Inquire
                </button>
                <span className="text-[11px] uppercase tracking-[0.3em] text-platinum/20 font-mono">
                  Booking via agency only
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Grid Card (Horizontal view) ── */
function GridCard({
  model,
  index,
  total,
  editMode,
  onSave,
  scale,
}: {
  model: RosterModel;
  index: number;
  total: number;
  editMode: boolean;
  onSave: (id: string, field: keyof RosterModel, value: string) => void;
  scale: number;
}) {
  return (
    <article
      id={`grid-${model.token}`}
      className="border border-platinum/10 overflow-hidden group"
    >
      {/* Portrait */}
      <div className="relative aspect-[3/4] bg-smoke overflow-hidden">
        <EditablePhoto
          src={model.image}
          alt={model.name}
          onSave={(val) => onSave(model.id, "image", val)}
          editMode={editMode}
          className="model-portrait w-full h-full transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay on hover (only when not in edit mode to avoid conflict) */}
        {!editMode && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        {/* Index badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-mono text-platinum/30 uppercase tracking-[0.2em]">
            {String(index).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
        </div>

        {editMode && (
          <div className="absolute top-3 right-3">
            <EditableStatus
              value={model.status}
              onSave={(val) => onSave(model.id, "status", val)}
              editMode={editMode}
            />
          </div>
        )}

        {/* Bottom overlay details */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-[12px] text-platinum/50 leading-relaxed font-legal line-clamp-3">
            {model.bio}
          </p>
        </div>
      </div>

      {/* Card details */}
      <div className="p-4 space-y-2">
        <EditableField
          value={model.name}
          onSave={(val) => onSave(model.id, "name", val)}
          editMode={editMode}
          className="font-canela-text text-[22px] leading-none tracking-[-0.03em] block"
        />
        <EditableField
          value={model.discipline}
          displayValue={toDisplayCase(model.discipline)}
          onSave={(val) => onSave(model.id, "discipline", normalizeDiscipline(val))}
          editMode={editMode}
          className="text-[11px] tracking-[0.14em] text-blood/60 block"
        />
        <div className="flex items-center justify-between gap-4 pt-2 border-t border-platinum/5">
          <EditableField
            value={model.city}
            displayValue={toDisplayCase(model.city)}
            onSave={(val) => onSave(model.id, "city", val)}
            editMode={editMode}
            className="min-w-0 flex-1 text-[11px] tracking-[0.12em] text-platinum/30"
          />
          <span className="shrink-0 pl-4 text-[10px] font-mono text-platinum/20">{model.token}</span>
        </div>
      </div>
    </article>
  );
}
