import type { Metadata } from "next";
import { RosterProvider } from "@/lib/RosterContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sembla",
  description: "Curated roster of supermodel DJs. AI likeness licensing with auditable consent chains. Not a marketplace. An agency."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-platinum antialiased">
        <RosterProvider>
          <div className="relative min-h-screen flex flex-col">{children}</div>
        </RosterProvider>
      </body>
    </html>
  );
}
