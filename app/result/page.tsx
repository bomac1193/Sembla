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
    <main className="flex-1 px-6 pb-16 pt-12 lg:px-16 bg-black text-platinum">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden border border-platinum/20 bg-black/80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Generated avatar" className="w-full object-cover" />
          <div className="flex items-center justify-between px-4 py-3 border-t border-platinum/20 text-xs uppercase tracking-[0.18em] text-platinum/70">
            <span>Face value: {descriptor}</span>
            <span>QR: {qr}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border border-platinum/30 bg-black/80 p-6 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-platinum/70">Result</p>
              <h1 className="text-3xl font-semibold text-platinum">Your face value is… {descriptor}</h1>
              <p className="text-sm text-platinum/70">
                We watermark every render and attach a UUID license token for bookings and exports.
              </p>
            </div>
            <div className="border border-platinum/20 bg-black/70 p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-platinum/80">
                <ShieldCheck className="h-4 w-4 text-blood" />
                License token: <span className="font-mono text-platinum">{license}</span>
              </div>
              <div className="flex items-center gap-2 text-platinum/80">
                <CheckCircle className="h-4 w-4 text-blood" />
                Consent JSON saved to Supabase audit log.
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={imageUrl}
                download
                className="inline-flex items-center gap-2 bg-blood px-4 py-3 text-platinum font-semibold hover:opacity-80"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
              <ShareButton imageUrl={imageUrl} descriptor={descriptor} />
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 border border-platinum/30 px-4 py-3 text-platinum/80 hover:border-blood hover:text-blood"
              >
                Run again
              </Link>
            </div>
            <div className="border border-platinum/20 bg-black/70 p-4">
              <p className="text-sm font-semibold text-platinum">Book this face</p>
              <p className="text-sm text-platinum/70">
                Send to the agency inbox with the token above to request rights and campaign usage.
              </p>
              <a
                href={`mailto:agency@sembla.ai?subject=Booking ${license}&body=Hi SEMBLA team,%0D%0AWe want to book this avatar (${license}) for our campaign.`}
                className="mt-3 inline-flex items-center gap-2 border border-platinum/30 px-3 py-2 text-sm text-platinum hover:border-blood hover:text-blood"
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
      className="inline-flex items-center gap-2 border border-platinum/30 px-4 py-3 text-platinum/80 hover:border-blood hover:text-blood"
    >
      <Share2 className="h-4 w-4" />
      Share to IG/TikTok
    </a>
  );
}
