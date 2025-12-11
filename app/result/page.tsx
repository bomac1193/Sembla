import Link from "next/link";
import { CheckCircle, Download, Share2, ShieldCheck } from "lucide-react";

type Props = {
  searchParams: {
    image?: string;
    license?: string;
    descriptor?: string;
    qr?: string;
  };
};

export default function ResultPage({ searchParams }: Props) {
  const imageUrl =
    searchParams.image ||
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80";
  const descriptor = searchParams.descriptor || "chromatic confidence";
  const license = searchParams.license || "pending-license";
  const qr = searchParams.qr || "organic";

  return (
    <main className="flex-1 px-6 pb-16 pt-12 lg:px-16">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Generated avatar" className="w-full object-cover" />
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 text-xs uppercase tracking-[0.18em] text-white/70">
            <span>Face value: {descriptor}</span>
            <span>QR: {qr}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-6 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/60">Result</p>
              <h1 className="text-3xl font-semibold">Your face value is… {descriptor}</h1>
              <p className="text-sm text-white/65">
                We watermark every render and attach a UUID license token for bookings and exports.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <ShieldCheck className="h-4 w-4 text-accent" />
                License token: <span className="font-mono">{license}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Consent JSON saved to Supabase audit log.
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={imageUrl}
                download
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-ink font-semibold hover:-translate-y-0.5 hover:bg-accent-deep"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
              <ShareButton imageUrl={imageUrl} descriptor={descriptor} />
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-3 text-white/80 hover:border-white/40"
              >
                Run again
              </Link>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-sm font-semibold">Book this face</p>
              <p className="text-sm text-white/70">
                Send to the agency inbox with the token above to request rights and campaign usage.
              </p>
              <a
                href={`mailto:agency@sembla.ai?subject=Booking ${license}&body=Hi SEMBLA team,%0D%0AWe want to book this avatar (${license}) for our campaign.`}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white/90 hover:bg-white/15"
              >
                Email agency inbox
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ShareButton({ imageUrl, descriptor }: { imageUrl: string; descriptor: string }) {
  const caption = encodeURIComponent(`My SEMBLA face value is ${descriptor}. #SEMBLA #FaceValue`);
  const shareUrl = encodeURIComponent(imageUrl);
  return (
    <a
      href={`https://www.instagram.com/create/story/?caption=${caption}&media=${shareUrl}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-3 text-white/80 hover:border-white/40"
    >
      <Share2 className="h-4 w-4" />
      Share to IG/TikTok
    </a>
  );
}
