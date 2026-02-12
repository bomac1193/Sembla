import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEMBLA — Exclusive Digital Agency",
  description: "Curated roster of supermodel DJs. AI likeness licensing with auditable consent chains. Not a marketplace. An agency."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-platinum antialiased">
        <div className="relative min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
