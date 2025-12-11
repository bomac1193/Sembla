import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { runReplicate } from "@/lib/replicate";
import { insertAvatar, uploadToStorage } from "@/lib/supabaseServer";
import { sendDiscordWebhook } from "@/lib/notifications";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("image");
  const optionsRaw = formData.get("options") as string | null;
  const options = optionsRaw ? JSON.parse(optionsRaw) : {};

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Image is required" }, { status: 400 });
  }

  const licenseToken = nanoid(10);
  const qr = options.qr || "organic";
  const prompt = buildPrompt(options);

  let baseUrl: string | null = null;
  try {
    baseUrl = await uploadToStorage(file, `faces/${licenseToken}.jpg`);
  } catch (err) {
    console.warn("Storage upload skipped", err);
  }

  let outputUrl = baseUrl || PLACEHOLDER;
  let descriptor = options.vibe || "signature";

  try {
    const result = await runReplicate({
      imageUrl: baseUrl || PLACEHOLDER,
      prompt,
      style: options.vibe
    });
    outputUrl = result.output;
    descriptor = result.descriptor;
  } catch (err) {
    console.warn("Replicate generation skipped", err);
  }

  try {
    await insertAvatar({
      email: options.email,
      gender: options.gender,
      skin_tone: options.skinTone,
      vibe: options.vibe,
      base_image_url: baseUrl,
      output_url: outputUrl,
      license_token: licenseToken,
      consent_json: options.consentJson,
      consent_name: options.consentName,
      qr_campaign: qr
    });
  } catch (err) {
    console.warn("Supabase insert skipped", err);
  }

  await sendDiscordWebhook({
    imageUrl: outputUrl,
    licenseToken,
    descriptor,
    qr
  });

  return NextResponse.json({
    outputUrl,
    licenseToken,
    descriptor,
    qr
  });
}

const buildPrompt = (options: any) => {
  const gender = options.gender || "androgynous";
  const tone = options.skinTone || "neutral skin tone";
  const vibe = options.vibe || "editorial";
  return `${vibe} portrait of a ${gender} model, ${tone}, glossy magazine lighting, ultra-detailed, fashion editorial, cinematic`;
};
