"use client";

import { Suspense, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, Upload, Wand2 } from "lucide-react";
import FaceCapture from "@/components/face-capture";

type FormValues = {
  gender: string;
  skinTone: string;
  vibe: string;
  email: string;
  consentName: string;
  consentAgree: boolean;
};

const vibes = ["edgy", "classic", "surreal", "studio", "natural"];
const skinTones = ["porcelain", "beige", "olive", "caramel", "deep"];

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <OnboardingContent />
    </Suspense>
  );
}

function OnboardingContent() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const qrCampaign = params.get("qr") || "organic";

  const form = useForm<FormValues>({
    defaultValues: {
      gender: "androgynous",
      skinTone: "olive",
      vibe: "edgy",
      email: "",
      consentName: "",
      consentAgree: false
    }
  });

  const consentName = form.watch("consentName");
  const email = form.watch("email");

  const consentJson = useMemo(
    () =>
      JSON.stringify(
        {
          signer: consentName || "Pending signer",
          email,
          timestamp: new Date().toISOString(),
          rights: "Limited license granting SEMBLA the right to render and display AI avatars derived from this selfie for campaign previews and booking inquiries.",
          retention: "Removable on request; default retention 30 days.",
          qrCampaign
        },
        null,
        2
      ),
    [consentName, email, qrCampaign]
  );

  const handleFile = (input: File | null) => {
    if (!input) return;
    const isImage = input.type.startsWith("image/");
    if (!isImage) {
      setUploadError("Please upload an image file.");
      return;
    }
    setUploadError(null);
    setFile(input);
    setPreview(URL.createObjectURL(input));
  };

  const onSubmit = async (values: FormValues) => {
    if (!file) {
      setUploadError("Upload or capture a selfie to continue.");
      return;
    }
    if (!values.consentAgree) {
      setUploadError("Consent is required to proceed.");
      return;
    }
    setIsSubmitting(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append(
        "options",
        JSON.stringify({
          gender: values.gender,
          skinTone: values.skinTone,
          vibe: values.vibe,
          email: values.email,
          consentName: values.consentName,
          consentAgree: values.consentAgree,
          consentJson,
          qr: qrCampaign
        })
      );

      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Generation failed. Please try again.");
      }

      const payload = await res.json();
      router.push(
        `/result?image=${encodeURIComponent(payload.outputUrl)}&license=${payload.licenseToken}&descriptor=${encodeURIComponent(payload.descriptor)}&qr=${qrCampaign}`
      );
    } catch (err: any) {
      setUploadError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 px-6 pb-20 pt-12 lg:px-16 bg-black text-platinum">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex items-center gap-3 text-sm text-platinum/80">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 border border-platinum/30 px-3 py-1 text-xs uppercase tracking-[0.18em] hover:border-blood"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </button>
          <span className="px-3 py-1 text-xs uppercase tracking-[0.18em] border border-platinum/30">QR: {qrCampaign}</span>
          <span className="px-3 py-1 text-xs uppercase tracking-[0.18em] border border-platinum/30">Consent-ready</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border border-platinum/30 bg-black/80 p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="uppercase tracking-[0.18em] text-xs text-platinum/70">
                  Capture
                </p>
                <h1 className="text-3xl font-semibold">Upload or shoot a selfie</h1>
              </div>
              <span className="px-3 py-1 text-xs uppercase tracking-[0.18em] border border-platinum/30 text-platinum">
                Live
              </span>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <FaceCapture
                  onCapture={(captured) => {
                    handleFile(captured);
                  }}
                  onFaceReady={() => setUploadError(null)}
                />
                <label className="flex cursor-pointer items-center justify-between border border-dashed border-platinum/30 px-4 py-3 hover:border-blood">
                  <div className="flex items-center gap-3 text-sm">
                    <Upload className="h-4 w-4 text-blood" />
                    <span>Upload image</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                  />
                </label>
                {uploadError && <p className="text-sm text-blood">{uploadError}</p>}
                {preview && (
                  <div className="relative overflow-hidden border border-platinum/20 bg-black/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Preview" className="w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                    <span className="absolute bottom-2 left-3 text-xs uppercase tracking-[0.18em] text-platinum/70">
                      Base frame
                    </span>
                  </div>
                )}
              </div>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 border border-platinum/30 bg-black/70 p-4"
              >
                <p className="text-sm uppercase tracking-[0.18em] text-platinum/70">Style</p>
                <div className="grid grid-cols-2 gap-3">
                  {vibes.map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => form.setValue("vibe", v)}
                      className={`border px-4 py-3 text-sm capitalize transition ${
                        form.watch("vibe") === v
                          ? "border-blood text-blood"
                          : "border-platinum/20 bg-black/40 text-platinum/80 hover:border-platinum/60"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                <label className="text-sm">
                  Gender
                  <select
                    {...form.register("gender")}
                    className="mt-1 w-full border border-platinum/20 bg-black/60 px-3 py-2 text-platinum/90"
                  >
                    <option value="androgynous">Androgynous</option>
                    <option value="feminine">Feminine</option>
                    <option value="masculine">Masculine</option>
                    <option value="fluid">Fluid</option>
                  </select>
                </label>

                <label className="text-sm">
                  Skin tone
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {skinTones.map((tone) => (
                      <button
                        type="button"
                        key={tone}
                        onClick={() => form.setValue("skinTone", tone)}
                        className={`border px-3 py-2 text-xs capitalize ${
                          form.watch("skinTone") === tone
                            ? "border-blood text-blood"
                            : "border-platinum/20 bg-black/40 text-platinum/70"
                        }`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </label>

                <label className="text-sm">
                  Email (for delivery)
                  <input
                    type="email"
                    placeholder="you@brand.co"
                    {...form.register("email")}
                    className="mt-1 w-full border border-platinum/20 bg-black/60 px-3 py-2 text-platinum/90"
                  />
                </label>

                <div className="border border-platinum/20 bg-black/60 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-semibold">Consent</p>
                      <p className="text-platinum/70">Sign and approve the license JSON.</p>
                    </div>
                    <Wand2 className="h-4 w-4 text-blood" />
                  </div>
                  <textarea
                    readOnly
                    value={consentJson}
                    className="mt-3 h-40 w-full border border-platinum/20 bg-black/70 p-3 text-xs font-mono text-platinum/80"
                  />
                  <div className="mt-3 flex flex-col gap-2 text-sm">
                    <input
                      type="text"
                      placeholder="Signer full name"
                      {...form.register("consentName")}
                      className="w-full border border-platinum/20 bg-black/60 px-3 py-2 text-platinum/90"
                    />
                    <label className="flex items-center gap-2 text-xs text-platinum/80">
                      <input type="checkbox" {...form.register("consentAgree", { required: true })} />
                      I agree to the consent terms for this upload.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex items-center justify-center gap-2 bg-blood px-4 py-3 font-semibold text-platinum transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Launch render
                </button>
              </form>
            </div>
          </div>

          <div className="border border-platinum/30 bg-black/80 p-6 lg:p-8 space-y-6">
            <div>
              <p className="uppercase tracking-[0.18em] text-xs text-platinum/70">Preview</p>
              <h2 className="text-2xl font-semibold text-platinum">AI Avatar Result</h2>
              <p className="text-sm text-platinum/70">
                We&apos;ll watermark and mint a license token automatically. Expect delivery in
                under a minute.
              </p>
            </div>
            <div className="overflow-hidden border border-platinum/20 bg-black">
              <div className="aspect-[4/5] w-full bg-black" />
              <div className="flex items-center justify-between px-4 py-3 text-xs uppercase tracking-[0.18em] text-platinum/70 border-t border-platinum/10">
                <span>Face value</span>
                <span>Watermarked</span>
              </div>
            </div>

            <div className="border border-platinum/20 bg-black/70 p-4 space-y-3">
              <p className="text-sm font-semibold text-platinum">Why we ask for consent</p>
              <ul className="space-y-2 text-sm text-platinum/65">
                <li>• Generates a signed JSON stored with your upload for auditability.</li>
                <li>• Enables brand-safe licensing with UUID token and revocation.</li>
                <li>• Supports QR attribution for campaign-level reporting.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
