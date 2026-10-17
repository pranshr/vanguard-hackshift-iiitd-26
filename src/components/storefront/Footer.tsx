import React from "react";
import Link from "next/link";
import { ShieldCheck, ExternalLink, ArrowRight } from "lucide-react";

export function StorefrontFooter() {
  return (
    <footer className="border-t border-[#E3DACB] bg-[#EFE9DD] text-[#1C1A17] pt-14 pb-12 mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#DDD3C2]">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-2.5">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1C1A17]">
                Madhuvan
              </span>
              <span className="text-[11px] font-mono text-[#3F4A3A] bg-[#DFD5C2] border border-[#CFC3AE] px-1.5 py-0.5 rounded">
                Raw Honey
              </span>
            </div>
            <p className="text-sm text-[#665E55] leading-relaxed max-w-md">
              Single-origin raw honey harvested across regional Indian floral flows. Unheated, coarse-filtered, and verified from the smart hive scale to the laboratory NMR report.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#2F6B3A] bg-[#DFEBDC] border border-[#C5DBC0] rounded">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified by HoneyChain
              </span>
              <span className="text-xs text-[#665E55] font-mono">
                Ethereum Sepolia Testnet
              </span>
            </div>
          </div>

          {/* CSE 2020 Study Card */}
          <div className="md:col-span-4 bg-[#F6F1E7] border border-[#E3DACB] rounded p-4 space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
              Why Verification Matters
            </span>
            <p className="text-xs text-[#1C1A17] leading-relaxed font-medium">
              In 2020, the Centre for Science and Environment (CSE) tested major Indian honey brands with Nuclear Magnetic Resonance (NMR) spectroscopy: <strong className="text-[#8A4B12]">10 of 13 brands failed</strong> due to adulteration with modified sugar syrups.
            </p>
            <a
              href="https://www.cseindia.org/cse-investigation-finds-adulterated-honey-in-indian-market-10519"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[#8A4B12] hover:underline"
            >
              <span>Read the CSE 2020 study</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 grid grid-cols-2 gap-6 text-xs">
            <div>
              <p className="font-mono font-semibold uppercase tracking-wider text-[#3F4A3A] mb-3">
                Storefront
              </p>
              <ul className="space-y-2 text-[#665E55]">
                <li>
                  <Link href="/shop" className="hover:text-[#1C1A17] transition-colors">
                    Shop Origins
                  </Link>
                </li>
                <li>
                  <Link href="/verify" className="hover:text-[#1C1A17] transition-colors">
                    Verify a Jar
                  </Link>
                </li>
                <li>
                  <Link href="/our-hives" className="hover:text-[#1C1A17] transition-colors">
                    Our Hives & IoT
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-[#1C1A17] transition-colors">
                    View Cart
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono font-semibold uppercase tracking-wider text-[#3F4A3A] mb-3">
                Partners
              </p>
              <ul className="space-y-2 text-[#665E55]">
                <li>
                  <Link href="/beekeeper" className="hover:text-[#1C1A17] transition-colors flex items-center gap-1">
                    <span>Beekeeper Portal</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-[#1C1A17] transition-colors">
                    Equipment Catalog
                  </Link>
                </li>
                <li>
                  <a
                    href="https://sepolia.etherscan.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1C1A17] transition-colors flex items-center gap-1"
                  >
                    <span>Sepolia Explorer</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SIH Note & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#786E64]">
          <p>
            Smart India Hackathon 2026 · Problem SIH26021 · Team Vanguard15
          </p>
          <p className="text-[11px] text-[#8C8276]">
            Demo batches for SIH judging · Sepolia testnet ledger · NMR testing by accredited partner laboratories
          </p>
        </div>
      </div>
    </footer>
  );
}
