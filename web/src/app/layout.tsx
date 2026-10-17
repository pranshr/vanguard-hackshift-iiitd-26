import type { Metadata } from "next";
import { Playfair_Display, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { GoogleTranslateScript } from "@/components/GoogleTranslateScript";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BEE safe | IoT Verified Raw Honey",
  description: "Single-origin raw Indian honey monitored by IoT smart hive telemetry and verified from hive to jar on the HoneyChain ledger.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="antialiased min-h-screen bg-[var(--paper)] text-[var(--ink)] font-sans">
        <CartProvider>
          {children}
        </CartProvider>
        <GoogleTranslateScript />
      </body>
    </html>
  );
}
