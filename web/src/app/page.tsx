import React from "react";
import Link from "next/link";
import { MarqueeTicker } from "@/components/storefront/MarqueeTicker";
import { StorefrontHeader } from "@/components/storefront/Header";
import { StorefrontFooter } from "@/components/storefront/Footer";
import { OriginCardsSection } from "@/components/storefront/OriginCardsSection";
import { InlineChip } from "@/components/storefront/InlineChip";
import { TasteCarousel } from "@/components/storefront/TasteCarousel";
import { ComparisonTable } from "@/components/storefront/ComparisonTable";
import { LearnCards } from "@/components/storefront/LearnCards";
import { ProductImage } from "@/components/storefront/ProductImage";
import { CSE_STUDY_DATA, PRODUCTS } from "@/data/storefront";
import { DEMO_BATCHES } from "@/data/batches";
import { ArrowRight, ExternalLink, ShieldCheck, Radio } from "lucide-react";

export default function HomePage() {
  const trioProduct = PRODUCTS.find((p) => p.isTastingBox) || PRODUCTS[3];
  const demoBatch = DEMO_BATCHES["HC-2026-MUS-014"];

  return (
    <div className="flex flex-col bg-[var(--paper)] min-h-screen text-[var(--ink)]">
      {/* 1. Black Marquee Ticker */}
      <MarqueeTicker />

      {/* 2. Global Header */}
      <StorefrontHeader />

      <main className="flex-1">
        {/* 3. Full-Bleed Hero with Generated Product Photography */}
        <section className="relative flex items-center bg-radial from-[var(--sand)] to-[var(--paper)] border-[var(--line)] border-b min-h-[580px] sm:min-h-[640px] overflow-hidden">
          <div className="z-10 relative mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full max-w-[1240px]">
            <div className="items-center gap-10 lg:gap-14 grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Mission & CTAs */}
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 bg-[var(--verified)]/15 px-3.5 py-1.5 border border-[var(--verified)]/30 rounded-full font-mono font-medium text-[var(--verified)] text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified by HoneyChain & IoT Telemetry</span>
                </div>

                <h1 className="text-[var(--ink)] text-4xl sm:text-6xl lg:text-7xl headline-display">
                  Most honey in India is syrup. Ours comes with proof.
                </h1>

                <p className="max-w-xl font-sans text-[var(--ink)]/80 text-base sm:text-xl leading-relaxed">
                  BEE safe monitors every colony with continuous IoT load scales and acoustic sensors. Real-time telemetry anchors directly to on-chain batch records.
                </p>

                {/* Action Buttons */}
                <div className="flex sm:flex-row flex-col items-stretch sm:items-center gap-3.5 pt-2">
                  <Link
                    href="/shop"
                    className="shadow-xs btn-pill-primary"
                  >
                    <span>Shop honey</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>

                  <Link
                    href="/beekeeper/login"
                    className="flex items-center gap-2 btn-pill-secondary"
                  >
                    <span>Beekeeper Dashboard</span>
                  </Link>
                </div>

                {/* CSE Citation Callout */}
                <div className="pt-6 border-[var(--line)] border-t">
                  <div className="flex items-center gap-2 font-mono text-[var(--muted-ink)] text-xs">
                    <span>{CSE_STUDY_DATA.headline}</span>
                    <a
                      href={CSE_STUDY_DATA.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--ink)] hover:text-[var(--signature)] underline transition-colors"
                    >
                      <span>Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Product Image with Golden Light */}
              <div className="flex justify-center lg:col-span-5">
                <div className="group relative shadow-2xl border border-[var(--line)] rounded-3xl w-full max-w-md aspect-square overflow-hidden">
                  <ProductImage
                    src="/images/iot-hive-hero.jpg"
                    alt="Smart Langstroth Beehive with IoT Telemetry Node in Orchard"
                    colorHex="var(--signature)"
                    productName="IoT Smart Beehive"
                    aspectRatio="aspect-square"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  {/* Subtle Floating Badge */}
                  <div className="right-4 bottom-4 left-4 absolute flex justify-between items-center bg-black/60 backdrop-blur-md p-3 border border-white/20 rounded-2xl font-mono text-white text-xs">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#16a34a] rounded-full w-2 h-2 animate-pulse" />
                      <span>IoT Smart Node · Live</span>
                    </div>
                    <span className="font-semibold text-[var(--signature)]">24/7 Hive Telemetry</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. "Start with an origin" 3 Product Cards */}
        <OriginCardsSection />

        {/* 5. "Meet BEE safe" Statement with Inline Chips */}
        <section className="mx-auto px-4 sm:px-6 py-16 sm:py-24 border-[var(--line)] border-y max-w-[1100px] text-center">
          <p className="text-[var(--ink)] text-2xl sm:text-3xl lg:text-4xl leading-snug headline-display">
            BEE safe is raw, single-origin honey from
            <InlineChip colorHex="var(--honey)" title="Bihar litchi groves" />
            Bihar&apos;s litchi groves,
            <InlineChip colorHex="var(--paper)" title="Kashmir acacia valleys" />
            Kashmir&apos;s acacia valleys and
            <InlineChip colorHex="var(--ink)" title="Sundarbans mangroves" />
            the Sundarbans — with every harvest protected by real-time IoT hive intelligence.
          </p>
        </section>

        {/* 6. "Find your taste" Origin Selector */}
        <TasteCarousel />

        {/* 7. Comparison Table */}
        <ComparisonTable />

        {/* 8. Tasting Trio Split Promo */}
        <section className="mx-auto px-4 sm:px-6 py-14 sm:py-20 max-w-[1240px]">
          <div className="bg-[var(--sand)] p-8 sm:p-12 lg:p-14 border border-[var(--line)] rounded-3xl sm:rounded-[32px] overflow-hidden">
            <div className="items-center gap-10 grid grid-cols-1 lg:grid-cols-12">
              {/* Text Left */}
              <div className="space-y-5 lg:col-span-6">
                <div className="inline-block font-mono text-[var(--muted-ink)] text-xs uppercase tracking-widest">
                  Tasting Flight
                </div>

                <h2 className="text-[var(--ink)] text-3xl sm:text-4xl lg:text-5xl headline-display">
                  Three origins, one box.
                </h2>

                <p className="text-[var(--muted-ink)] text-base leading-relaxed">
                  Compare how regional flower blossoms shape the color and character of honest honey. Features 3 × 150g jars of Litchi Blossom, White Acacia, and Wild Mangrove, each linked to its verified smart hive record.
                </p>

                <div className="flex flex-wrap items-baseline gap-3 pt-1 font-mono">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-[#b45309] text-[11px] uppercase tracking-wider">Our Price</span>
                    <span className="font-bold text-[var(--ink)] text-2xl">
                      ₹{trioProduct.sizes[0].price}
                    </span>
                  </div>
                  {trioProduct.sizes[0].marketPrice && (
                    <div className="flex items-baseline gap-1.5 pl-2.5 border-[var(--line)] border-l">
                      <span className="text-[11px] text-[var(--muted-ink)] uppercase tracking-wider">Market</span>
                      <span className="font-semibold text-[var(--muted-ink)] text-base line-through">
                        ₹{trioProduct.sizes[0].marketPrice}
                      </span>
                      <span className="bg-[#fef3c7] px-1.5 py-0.2 rounded-full font-bold text-[#92400e] text-[10px]">
                        Save ₹150
                      </span>
                    </div>
                  )}
                  <span className="text-[var(--muted-ink)] text-xs">
                    / 3 × 150g glass jars
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/shop/${trioProduct.slug}`}
                    className="shadow-xs btn-pill-primary"
                  >
                    <span>Shop the trio</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Product Photo Right */}
              <div className="flex justify-center lg:col-span-6">
                <div className="w-full max-w-md">
                  <ProductImage
                    src="/images/starter-kit.jpg"
                    alt="BEE safe Terroir Tasting Trio Starter Kit"
                    colorHex="var(--honey)"
                    productName="Tasting Trio Flight"
                    aspectRatio="aspect-[4/3]"
                    className="shadow-md rounded-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Ethics Statement with Inline Chips */}
        <section className="mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-[1000px] text-center">
          <p className="text-[var(--ink)] text-2xl sm:text-3xl lg:text-4xl leading-snug headline-display">
            Every batch is recorded from
            <InlineChip colorHex="var(--verified)" title="The IoT hive scale" />
            the smart hive, through
            <InlineChip colorHex="var(--amber-deep)" title="The laboratory" />
            the lab, to
            <InlineChip colorHex="var(--signature)" title="Your jar" />
            your jar.
          </p>
        </section>

        {/* 11. "Meet Ramdas Mahato" Beekeeper Feature */}
        <section className="mx-auto px-4 sm:px-6 py-14 sm:py-20 max-w-[1240px]">
          <div className="bg-[var(--sand)] p-8 sm:p-12 border border-[var(--line)] rounded-3xl sm:rounded-[32px] overflow-hidden">
            <div className="items-center gap-8 lg:gap-12 grid grid-cols-1 md:grid-cols-12">
              {/* Photo Card Left */}
              <div className="md:col-span-5">
                <div className="relative shadow-xs border border-[var(--line)] rounded-2xl aspect-[4/5] overflow-hidden">
                  <ProductImage
                    src="/images/beekeeper-ramdas.jpg"
                    alt="Ramdas Mahato, Lead Apiarist"
                    colorHex="var(--honey)"
                    productName="Ramdas Mahato"
                    aspectRatio="aspect-[4/5]"
                    className="w-full h-full object-cover"
                  />
                  <div className="top-4 right-4 left-4 absolute flex justify-between items-center font-mono text-[10px]">
                    <span className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-white">
                      Muzaffarpur Yard
                    </span>
                    <span className="bg-[var(--signature)] px-2 py-0.5 rounded-full font-semibold text-[var(--ink)]">
                      IoT Operator
                    </span>
                  </div>
                  <div className="right-4 bottom-4 left-4 absolute bg-black/70 backdrop-blur-md p-3 rounded-xl font-mono text-white text-xs">
                    <span className="block font-bold text-sm">Ramdas Mahato</span>
                    <span className="block text-[11px] text-[var(--text-light)]">
                      14 Years Experience · Hive #H-04
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote & Signature Right */}
              <div className="space-y-6 md:col-span-7">
                <div className="inline-block font-mono text-[var(--muted-ink)] text-xs uppercase tracking-widest">
                  Our Beekeepers
                </div>

                <blockquote className="font-serif text-[var(--ink)] text-xl sm:text-2xl lg:text-3xl italic leading-relaxed">
                  &ldquo;{demoBatch.beekeeper.quote}&rdquo;
                </blockquote>

                <div className="space-y-1">
                  <span className="block font-serif font-bold text-[var(--ink)] text-lg">
                    — {demoBatch.beekeeper.name}
                  </span>
                  <span className="block font-mono text-[var(--muted-ink)] text-xs">
                    Lead Apiarist, Muzaffarpur Regional Yard
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    href="/our-story"
                    className="btn-pill-secondary"
                  >
                    <span>Our story</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Two Large Split Image Tiles */}
        <section className="mx-auto px-4 sm:px-6 py-10 sm:py-16 max-w-[1240px]">
          <div className="gap-6 sm:gap-8 grid grid-cols-1 md:grid-cols-2">
            {/* Tile 1: Emotional breakfast honey drizzle */}
            <Link
              href="/shop"
              className="group relative flex flex-col justify-end bg-[var(--dark-card)] shadow-sm p-8 border border-black/10 rounded-3xl h-72 sm:h-80 overflow-hidden text-white"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage: "url('/images/honey-breakfast-emotion.jpg'), radial-gradient(circle, var(--amber-deep), var(--ink))",
                }}
                aria-hidden="true"
              />
              <div className="z-10 relative space-y-2">
                <span className="block font-mono font-semibold text-[var(--signature)] text-xs uppercase tracking-widest">
                  Pure Raw Ritual
                </span>
                <span className="block font-serif font-bold text-2xl sm:text-3xl">
                  Shop the origins →
                </span>
              </div>
            </Link>

            {/* Tile 2: IoT Smart Hive Telemetry */}
            <Link
              href="/sensors"
              className="group relative flex flex-col justify-end bg-[var(--dark-card-subtle)] shadow-sm p-8 border border-black/10 rounded-3xl h-72 sm:h-80 overflow-hidden text-white"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage: "url('/images/iot-smart-hive.jpg'), radial-gradient(circle, var(--verified), var(--ink))",
                }}
                aria-hidden="true"
              />
              <div className="z-10 relative space-y-2">
                <span className="block font-mono font-semibold text-[var(--signature)] text-xs uppercase tracking-widest">
                  IoT Hardware MVP
                </span>
                <span className="block font-serif font-bold text-2xl sm:text-3xl">
                  Live sensor dashboard →
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* 13. 3 Learn / Blog Cards */}
        <LearnCards />

        {/* 14. "Not sure where to start?" Banner */}
        <section className="mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-[800px] text-center">
          <div className="space-y-4">
            <h2 className="text-[var(--ink)] text-3xl sm:text-4xl headline-display">
              Not sure where to start?
            </h2>
            <p className="text-[var(--muted-ink)] text-sm sm:text-base">
              Experience all three Indian harvest profiles side by side in our flight box.
            </p>
            <div className="pt-3">
              <Link
                href="/shop/terroir-tasting-trio"
                className="shadow-xs btn-pill-primary"
              >
                <span>Try the Tasting Trio</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 15. Footer */}
      <StorefrontFooter />
    </div>
  );
}
