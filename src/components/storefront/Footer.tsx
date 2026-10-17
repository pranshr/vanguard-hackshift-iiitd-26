import React from "react";
import Link from "next/link";
import { ShieldCheck, ExternalLink, ArrowRight } from "lucide-react";
import { CSE_STUDY_DATA } from "@/data/storefront";

export function StorefrontFooter() {
  return (
    <footer className="relative bg-[var(--dark-card)] text-[var(--paper)] pt-16 sm:pt-20 overflow-hidden">
      {/* Top Navigation Grid */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: For Beekeepers & Partners */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--signature)] font-semibold block">
              For Beekeepers & Partners
            </span>
            <p className="text-xs sm:text-sm text-[var(--tag-border)]/80 leading-relaxed max-w-sm">
              BEE safe equips cooperative apiaries across India with IoT weight telemetry and direct testnet verification records.
            </p>
            <ul className="space-y-2.5 pt-1 text-xs font-mono">
              <li>
                <Link
                  href="/beekeeper"
                  className="inline-flex items-center gap-1.5 text-white hover:text-[var(--signature)] transition-colors"
                >
                  <span>Beekeeper Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link
                  href="/sensors"
                  className="inline-flex items-center gap-1.5 text-white hover:text-[var(--signature)] transition-colors"
                >
                  <span>Live Telemetry Streams</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace"
                  className="inline-flex items-center gap-1.5 text-white hover:text-[var(--signature)] transition-colors"
                >
                  <span>Apiary Supplies</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Storefront Origins */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-light)] block">
              Storefront
            </span>
            <ul className="space-y-2 text-xs text-[var(--tag-border)]/90">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Shop All Origins
                </Link>
              </li>
              <li>
                <Link href="/shop/muzaffarpur-litchi" className="hover:text-white transition-colors">
                  Muzaffarpur Litchi Blossom
                </Link>
              </li>
              <li>
                <Link href="/shop/kashmir-white-acacia" className="hover:text-white transition-colors">
                  Kashmir White Acacia
                </Link>
              </li>
              <li>
                <Link href="/shop/sundarbans-wild-mangrove" className="hover:text-white transition-colors">
                  Sundarbans Wild Mangrove
                </Link>
              </li>
              <li>
                <Link href="/shop/terroir-tasting-trio" className="hover:text-white transition-colors">
                  The Terroir Tasting Trio
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Beekeeper & IoT */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-light)] block">
              Beekeeper & Telemetry
            </span>
            <ul className="space-y-2 text-xs text-[var(--tag-border)]/90">
              <li>
                <Link href="/beekeeper" className="hover:text-white transition-colors">
                  Beekeepers Dashboard
                </Link>
              </li>
              <li>
                <Link href="/our-hives" className="hover:text-white transition-colors">
                  Our Hives & IoT Scales
                </Link>
              </li>
              <li>
                <a
                  href={CSE_STUDY_DATA.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>CSE 2020 Honey Report</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link href="/sensors" className="hover:text-white transition-colors">
                  Live Sensor Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: About & Learn */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-light)] block">
              About
            </span>
            <ul className="space-y-2 text-xs text-[var(--tag-border)]/90">
              <li>
                <Link href="/our-story" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/our-story#faq" className="hover:text-white transition-colors">
                  FAQ & Guides
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Full-Bleed Photo Area with Giant "BEE safe" Wordmark Across the Bottom */}
      <div className="relative border-t border-white/10 pt-16 sm:pt-24 pb-8 overflow-hidden">
        {/* Background photo overlay */}
        <div
          className="absolute inset-0 bg-cover bg-bottom opacity-15 pointer-events-none"
          style={{
            backgroundImage: "url('/images/iot-smart-hive.jpg'), radial-gradient(circle at 50% 100%, var(--amber-deep) 0%, var(--dark-card) 80%)",
          }}
          aria-hidden="true"
        />

        {/* Edge-to-edge Giant Wordmark matching Manukora reference */}
        <div className="relative max-w-full px-4 text-center select-none pointer-events-none">
          <span className="font-serif text-[18vw] leading-none font-bold tracking-tight text-white/90 block drop-shadow-sm whitespace-nowrap">
            BEE safe
          </span>
        </div>

        {/* Legal & Attribution Bar */}
        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 pt-6 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[var(--text-subtle)]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[var(--signature)]" />
            <span>Every Batch Traceable · Verified by HoneyChain</span>
          </div>

          <div className="text-[11px] text-[var(--text-subtle)]">
            Precision Apiculture · Real-Time IoT Telemetry & Blockchain Proof
          </div>
        </div>
      </div>
    </footer>
  );
}
