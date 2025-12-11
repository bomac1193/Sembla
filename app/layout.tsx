import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEMBLA — Face Value",
  description: "AI-native model agency MVP for rapid avatar generation and licensing."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-ink text-white antialiased">
        <div className="fixed inset-0 opacity-30 pointer-events-none mix-blend-screen bg-grid" />
        <div className="relative min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
