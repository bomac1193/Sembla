# SEMBLA — Face Value (MVP)

Next.js + Tailwind SEMBLA prototype with Supabase + Replicate hooks for selfie intake, consent logging, AI avatar generation, and admin oversight.

## Stack
- Next.js 16 (App Router) + React + Tailwind
- Supabase (Auth/DB/Storage) — avatars table + `faces` storage bucket
- Replicate API for SDXL/StyleGAN renders
- Face detection via `@vladmandic/face-api`
- Discord webhook alert on new avatars

## Brand surface (landing)
- Palette only: Core Black `#000000`, Surgical Platinum `#D8D8D8`, Deep Blood Red `#9B0000`, Pure White `#FFFFFF` (single-use per page)
- Typography: Helvetica Now Display / Text, GT America Mono for data
- Cursor: platinum crosshair → blood red on hover
- Layout: 12-col rigid grid, heavy negative space, zero rounded corners, type-led screens in the order specified (hero, nav on scroll, Face value, Live Rates, For Models/Clients, Valuation Tool, footer)
- Model imagery: place roster frames in `public/models/` as `model-a.png` … `model-f.png`; repo ignores these files by default (`.gitkeep` only)

## Getting started
1) Install deps
```bash
cd sembla
npm install
```
2) Configure env vars by copying `.env.example` → `.env.local` and filling Supabase + Replicate + Discord values. Set `NEXT_PUBLIC_FACE_API_MODEL_URL=/models` (or CDN) and drop TinyFaceDetector weights into `public/models`.
3) Create Supabase resources:
```sql
create table public.avatars (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  email text,
  gender text,
  skin_tone text,
  vibe text,
  base_image_url text,
  output_url text,
  license_token text,
  consent_json jsonb,
  consent_name text,
  qr_campaign text
);
```
Create storage bucket `faces` (public) for uploads.
4) Run dev server
```bash
npm run dev
```

## Key routes
- `/` Landing with SEMBLA brand + CTA
- `/onboarding` Selfie capture/upload, face detection overlay, style toggles, consent JSON, QR param intake
- `/result` Render display with watermark note, license token, share/download + “Book this face”
- `/admin` Live uploads table (Supabase-backed) with CSV export
- `/api/generate` FormData endpoint: uploads selfie to Supabase storage, calls Replicate, writes consent + metadata, fires Discord webhook
- `/api/admin/uploads` Fetches latest avatar rows for dashboard

## Replicate wiring
- Set `REPLICATE_API_TOKEN` and (optionally) `REPLICATE_MODEL_VERSION` for the model version ID.
- The helper in `lib/replicate.ts` posts a prediction and polls until completion.
- Without a token, the route returns the base image/placeholder so the flow still works locally.

## Face detection
- `components/face-capture.tsx` uses `@vladmandic/face-api` TinyFaceDetector. Host model weights at `NEXT_PUBLIC_FACE_API_MODEL_URL` (default `/models` under `public/`).
- Live overlay informs when a face is locked before capture.

## QR & consent
- Append `?qr=channel-name` to `/onboarding` to attribute a run.
- Consent JSON is generated on the client, submitted alongside the upload, and stored with the avatar row for auditability.

## Deploy
- Ready for Vercel/Netlify; ensure env vars are added and the Supabase storage bucket is public or signed URLs are used.
- Discord webhook optional; remove `DISCORD_WEBHOOK_URL` to disable alerts.
