import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BEE-Safe | Smart Beekeeping & Hive Monitoring",
  description: "Next-generation smart apiculture monitoring system with live acoustic, weight, and environmental telemetry.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#faf8f5] text-[#24201d]">
        {children}
      </body>
    </html>
  );
}
