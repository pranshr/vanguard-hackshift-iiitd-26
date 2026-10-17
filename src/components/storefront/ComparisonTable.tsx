import React from "react";
import Link from "next/link";
import { COMPARISON_ROWS, CSE_STUDY_DATA } from "@/data/storefront";
import { Check, X, ExternalLink } from "lucide-react";
import { ProductImage } from "./ProductImage";

export function ComparisonTable() {
  return (
    <section className="py-16 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Title & Context */}
        <div className="lg:col-span-5 space-y-5">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-[var(--muted-ink)]">
            Transparent Comparison
          </div>
          <h2 className="headline-display text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)]">
            Why BEE safe is different.
          </h2>
          <p className="text-base text-[var(--muted-ink)] leading-relaxed">
            Commercial honey brands prioritize permanent shelf-life and uniform sweetness. BEE safe prioritizes single-origin truth: raw apiculture that links directly from IoT smart hives to laboratory verification.
          </p>

          <div className="p-4 rounded-2xl bg-[var(--card-tint)] border border-[var(--tag-border)] text-xs text-[var(--ink)]/80 space-y-2">
            <span className="font-semibold text-[var(--ink)] block">
              The Indian Honey Testing Reality:
            </span>
            <p>
              Traditional standard tests can miss modern high-fructose syrups. In 2020, the Centre for Science and Environment evaluated top Indian brands: 10 of 13 failed laboratory NMR testing.
            </p>
            <a
              href={CSE_STUDY_DATA.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[var(--ink)] underline hover:text-[var(--signature)]"
            >
              <span>Read the CSE 2020 report</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right Column: Comparison Table with Highlighted Column */}
        <div className="lg:col-span-7 overflow-x-auto">
          <div className="min-w-[480px] bg-[var(--sand)] rounded-3xl p-6 sm:p-8 border border-[var(--line)] shadow-2xs">
            <div className="grid grid-cols-12 gap-3 pb-6 border-b border-[var(--line)] items-end">
              <div className="col-span-6 text-xs font-mono uppercase tracking-wider text-[var(--muted-ink)]">
                Standards
              </div>

              {/* BEE safe Column Header */}
              <div className="col-span-3 text-center">
                <div className="w-14 h-16 mx-auto mb-2 relative">
                  <ProductImage
                    src="/images/honey-jar-hero.jpg"
                    alt="BEE safe Jar"
                    colorHex="var(--signature)"
                    productName="BEE safe"
                    aspectRatio="aspect-square"
                    className="rounded-xl shadow-2xs"
                  />
                </div>
                <span className="font-serif text-sm font-bold text-[var(--ink)] block">
                  BEE safe
                </span>
                <span className="text-[10px] font-mono text-[var(--verified)] block mt-0.5">
                  Verified Raw
                </span>
              </div>

              {/* Supermarket Column Header */}
              <div className="col-span-3 text-center">
                <div className="w-14 h-16 mx-auto mb-2 bg-[var(--tag-bg)] rounded-xl flex items-center justify-center text-[10px] font-mono text-[var(--text-subtle)]">
                  Supermarket
                </div>
                <span className="font-serif text-sm text-[var(--muted-ink)] block">
                  Typical Honey
                </span>
                <span className="text-[10px] font-mono text-[var(--text-subtle)] block mt-0.5">
                  Blended Lots
                </span>
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-[var(--line)]">
              {COMPARISON_ROWS.map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-3 py-4 items-center text-xs">
                  <div className="col-span-6 font-medium text-[var(--ink)]">
                    {row.feature}
                  </div>

                  {/* BEE safe Cell (Highlighted in soft signature tint) */}
                  <div className="col-span-3 text-center bg-[var(--signature)]/20 rounded-xl py-2 px-1 font-semibold text-[var(--ink)]">
                    <span className="flex items-center justify-center gap-1">
                      <Check className="w-3.5 h-3.5 text-[var(--verified)] shrink-0" />
                      <span className="text-[11px]">{row.beeSafe}</span>
                    </span>
                  </div>

                  {/* Supermarket Cell */}
                  <div className="col-span-3 text-center py-2 px-1 text-[var(--muted-ink)]">
                    <span className="flex items-center justify-center gap-1">
                      <X className="w-3.5 h-3.5 text-[var(--text-subtle)] shrink-0" />
                      <span className="text-[11px]">{row.supermarket}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footnote */}
            <div className="pt-6 mt-4 border-t border-[var(--line)] flex items-center justify-between text-[11px] font-mono text-[var(--text-subtle)]">
              <span>Live smart contract verification on Ethereum Sepolia</span>
              <Link href="/beekeeper" className="underline hover:text-[var(--ink)]">
                Beekeepers Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
