"use client";

import { useRef, useState } from "react";
import Link from "next/link";

interface RosterEntry {
  name: string;
  discipline: string;
  city: string;
  bio: string;
  imagePreview: string;
  file: File;
}

export default function RosterUploadPage() {
  const [entries, setEntries] = useState<RosterEntry[]>([]);
  const [name, setName] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!name || !selectedFile || !imagePreview) return;

    setEntries((prev) => [
      ...prev,
      {
        name,
        discipline: discipline || "DJ / Model",
        city: city || "—",
        bio: bio || "",
        imagePreview,
        file: selectedFile
      }
    ]);

    // Reset form
    setName("");
    setDiscipline("");
    setCity("");
    setBio("");
    setImagePreview(null);
    setSelectedFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleRemove = (idx: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== idx));
  };

  const handlePublish = async () => {
    setUploading(true);
    setUploadResult(null);

    try {
      for (const entry of entries) {
        const formData = new FormData();
        formData.append("image", entry.file);
        formData.append(
          "options",
          JSON.stringify({
            name: entry.name,
            discipline: entry.discipline,
            city: entry.city,
            bio: entry.bio,
            gender: "androgynous",
            skinTone: "neutral",
            vibe: "editorial",
            email: "",
            consentName: entry.name,
            consentAgree: true,
            consentJson: JSON.stringify({
              signer: entry.name,
              timestamp: new Date().toISOString(),
              rights: "digital_likeness",
              retention: "indefinite",
              agency: "SEMBLA"
            }),
            qr: "roster-upload"
          })
        );

        await fetch("/api/generate", { method: "POST", body: formData });
      }

      setUploadResult(`${entries.length} model(s) published to roster.`);
      setEntries([]);
    } catch {
      setUploadResult("Upload failed. Check Supabase/Replicate config.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-platinum">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-black/95 backdrop-blur-sm border-b border-platinum/10 flex items-center px-6 sm:px-12 z-50">
        <div className="w-full flex items-center justify-between max-w-[1400px] mx-auto">
          <Link href="/" className="text-platinum text-[18px] font-bold tracking-[0.5em] uppercase">
            SEMBLA
          </Link>
          <nav className="flex items-center gap-8 text-[11px] uppercase tracking-[0.4em]">
            <Link href="/" className="text-platinum/50 hover:text-platinum transition-colors">Home</Link>
            <Link href="/models" className="text-platinum/50 hover:text-platinum transition-colors">Roster</Link>
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
          <h1 className="text-[clamp(36px,5vw,64px)] font-black uppercase leading-[0.9] tracking-tight">
            Roster Upload
          </h1>
          <p className="mt-4 text-[14px] text-platinum/40 font-legal">
            Add models to the agency roster. Each upload generates a consent chain and license token.
          </p>
        </div>

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
                  <img src={imagePreview} alt="Preview" className="model-portrait w-full h-full" />
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
                disabled={!name || !selectedFile}
                className="w-full border border-platinum/30 py-3.5 text-[12px] uppercase tracking-[0.4em] hover:border-blood hover:text-blood transition-colors disabled:opacity-20 disabled:hover:border-platinum/30 disabled:hover:text-platinum"
              >
                Add to Queue
              </button>
            </div>
          </div>

          {/* Queue / Preview */}
          <div className="lg:col-span-7">
            <p className="text-[12px] uppercase tracking-[0.4em] text-platinum/50 mb-6">
              Queue &middot; {entries.length} model{entries.length !== 1 ? "s" : ""}
            </p>

            {entries.length === 0 ? (
              <div className="border border-platinum/5 bg-smoke/50 aspect-[3/4] max-h-[400px] flex items-center justify-center">
                <span className="text-[12px] uppercase tracking-[0.4em] text-platinum/15">
                  No models queued
                </span>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.map((entry, idx) => (
                  <div key={idx} className="border border-platinum/10 bg-smoke/30 flex items-stretch overflow-hidden">
                    {/* Thumbnail */}
                    <div className="w-24 sm:w-32 flex-shrink-0">
                      <img
                        src={entry.imagePreview}
                        alt={entry.name}
                        className="model-portrait w-full h-full min-h-[120px]"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center gap-1">
                      <p className="text-[16px] font-bold uppercase tracking-[0.2em]">{entry.name}</p>
                      <p className="text-[12px] text-platinum/40 uppercase tracking-[0.2em]">{entry.discipline}</p>
                      <p className="text-[11px] text-platinum/30 font-mono">{entry.city}</p>
                    </div>
                    {/* Remove */}
                    <button
                      onClick={() => handleRemove(idx)}
                      className="px-4 text-platinum/20 hover:text-blood transition-colors text-[18px]"
                      title="Remove"
                    >
                      &times;
                    </button>
                  </div>
                ))}

                {/* Publish */}
                <div className="pt-6 border-t border-platinum/10">
                  <button
                    onClick={handlePublish}
                    disabled={uploading}
                    className="border border-blood/50 px-10 py-4 text-[12px] uppercase tracking-[0.4em] text-blood hover:bg-blood hover:text-black transition-all disabled:opacity-40"
                  >
                    {uploading ? "Publishing..." : `Publish ${entries.length} to Roster`}
                  </button>
                </div>
              </div>
            )}

            {uploadResult && (
              <div className="mt-6 border border-platinum/10 p-4 text-[13px] text-platinum/60 font-mono">
                {uploadResult}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
