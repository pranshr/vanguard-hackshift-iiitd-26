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
    <div className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--ink)]">
      {/* 1. Black Marquee Ticker */}
      <MarqueeTicker />

      {/* 2. Global Header */}
      <StorefrontHeader />

      <main className="flex-1">
        {/* 3. Full-Bleed Hero with Generated Product Photography */}
        <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center border-b border-[var(--line)] overflow-hidden bg-radial from-[var(--sand)] to-[var(--paper)]">
          <div className="relative max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-16 sm:py-24 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Mission & CTAs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[var(--verified)] bg-[var(--verified)]/15 border border-[var(--verified)]/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified by HoneyChain & IoT Telemetry</span>
                </div>

                <h1 className="headline-display text-4xl sm:text-6xl lg:text-7xl text-[var(--ink)]">
                  Most honey in India is syrup. Ours comes with proof.
                </h1>

                <p className="text-base sm:text-xl text-[var(--ink)]/80 font-sans leading-relaxed max-w-xl">
                  BEE safe monitors every colony with continuous IoT load scales and acoustic sensors. Real-time telemetry anchors directly to on-chain batch records.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Link
                    href="/shop"
                    className="btn-pill-primary shadow-xs"
                  >
                    <span>Shop honey</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>

                  <Link
                    href="/sensors"
                    className="btn-pill-secondary flex items-center gap-2"
                  >
                    <Radio className="w-4 h-4 text-[var(--verified)] animate-pulse" />
                    <span>Live IoT Telemetry</span>
                  </Link>
                </div>

                {/* CSE Citation Callout */}
                <div className="pt-6 border-t border-[var(--line)]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted-ink)]">
                    <span>{CSE_STUDY_DATA.headline}</span>
                    <a
                      href={CSE_STUDY_DATA.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--ink)] underline hover:text-[var(--signature)] transition-colors"
                    >
                      <span>Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Product Image with Golden Light */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border border-[var(--line)] group">
                  <ProductImage
                    src="/images/iot-hive-hero.jpg"
                    alt="Smart Langstroth Beehive with IoT Telemetry Node in Orchard"
                    colorHex="var(--signature)"
                    productName="IoT Smart Beehive"
                    aspectRatio="aspect-square"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Subtle Floating Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex items-center justify-between text-white text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                      <span>IoT Smart Node · Live</span>
                    </div>
                    <span className="text-[var(--signature)] font-semibold">24/7 Hive Telemetry</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. "Start with an origin" 3 Product Cards */}
        <OriginCardsSection />

        {/* 5. "Meet BEE safe" Statement with Inline Chips */}
        <section className="py-16 sm:py-24 max-w-[1100px] mx-auto px-4 sm:px-6 text-center border-y border-[var(--line)]">
          <p className="headline-display text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)] leading-snug">
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
        <section className="py-14 sm:py-20 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="rounded-3xl sm:rounded-[32px] bg-[var(--sand)] border border-[var(--line)] p-8 sm:p-12 lg:p-14 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Text Left */}
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-block text-xs font-mono uppercase tracking-widest text-[var(--muted-ink)]">
                  Tasting Flight
                </div>

                <h2 className="headline-display text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)]">
                  Three origins, one box.
                </h2>

                <p className="text-base text-[var(--muted-ink)] leading-relaxed">
                  Compare how regional flower blossoms shape the color and character of honest honey. Features 3 × 150g jars of Litchi Blossom, White Acacia, and Wild Mangrove, each linked to its verified smart hive record.
                </p>

                <div className="flex items-baseline gap-2 pt-1 font-mono">
                  <span className="text-2xl font-bold text-[var(--ink)]">
                    ₹{trioProduct.sizes[0].price}
                  </span>
                  <span className="text-xs text-[var(--muted-ink)]">
                    / 3 × 150g glass jars
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/shop/${trioProduct.slug}`}
                    className="btn-pill-primary shadow-xs"
                  >
                    <span>Shop the trio</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>

              {/* Product Photo Right */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-md">
                  <ProductImage
                    src="/images/starter-kit.jpg"
                    alt="BEE safe Terroir Tasting Trio Starter Kit"
                    colorHex="var(--honey)"
                    productName="Tasting Trio Flight"
                    aspectRatio="aspect-[4/3]"
                    className="rounded-3xl shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Ethics Statement with Inline Chips */}
        <section className="py-16 sm:py-24 max-w-[1000px] mx-auto px-4 sm:px-6 text-center">
          <p className="headline-display text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)] leading-snug">
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
        <section className="py-14 sm:py-20 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="rounded-3xl sm:rounded-[32px] bg-[var(--sand)] border border-[var(--line)] p-8 sm:p-12 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Photo Card Left */}
              <div className="md:col-span-5">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--line)] shadow-xs">
                  <ProductImage
                    src="/images/beekeeper-ramdas.jpg"
                    alt="Ramdas Mahato, Lead Apiarist"
                    colorHex="var(--honey)"
                    productName="Ramdas Mahato"
                    aspectRatio="aspect-[4/5]"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono">
                    <span className="bg-black/60 text-white px-2.5 py-1 rounded-full backdrop-blur-xs">
                      Muzaffarpur Yard
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[var(--signature)] text-[var(--ink)] font-semibold">
                      IoT Operator
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md rounded-xl p-3 text-white text-xs font-mono">
                    <span className="font-bold block text-sm">Ramdas Mahato</span>
                    <span className="text-[var(--text-light)] text-[11px] block">
                      14 Years Experience · Hive #H-04
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote & Signature Right */}
              <div className="md:col-span-7 space-y-6">
                <div className="inline-block text-xs font-mono uppercase tracking-widest text-[var(--muted-ink)]">
                  Our Beekeepers
                </div>

                <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-[var(--ink)] italic leading-relaxed">
                  &ldquo;{demoBatch.beekeeper.quote}&rdquo;
                </blockquote>

                <div className="space-y-1">
                  <span className="font-serif text-lg font-bold text-[var(--ink)] block">
                    — {demoBatch.beekeeper.name}
                  </span>
                  <span className="text-xs font-mono text-[var(--muted-ink)] block">
                    Lead Apiarist, Muzaffarpur Regional Yard
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    href="/our-story"
                    className="btn-pill-secondary"
                  >
                    <span>Our story</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Two Large Split Image Tiles */}
        <section className="py-10 sm:py-16 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Tile 1: Emotional breakfast honey drizzle */}
            <Link
              href="/shop"
              className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden bg-[var(--dark-card)] p-8 flex flex-col justify-end text-white shadow-sm border border-black/10"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-60"
                style={{
                  backgroundImage: "url('/images/honey-breakfast-emotion.jpg'), radial-gradient(circle, var(--amber-deep), var(--ink))",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--signature)] font-semibold block">
                  Pure Raw Ritual
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold block">
                  Shop the origins →
                </span>
              </div>
            </Link>

            {/* Tile 2: IoT Smart Hive Telemetry */}
            <Link
              href="/sensors"
              className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden bg-[var(--dark-card-subtle)] p-8 flex flex-col justify-end text-white shadow-sm border border-black/10"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-50"
                style={{
                  backgroundImage: "url('/images/iot-smart-hive.jpg'), radial-gradient(circle, var(--verified), var(--ink))",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--signature)] font-semibold block">
                  IoT Hardware MVP
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold block">
                  Live sensor dashboard →
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* 13. 3 Learn / Blog Cards */}
        <LearnCards />

        {/* 14. "Not sure where to start?" Banner */}
        <section className="py-16 sm:py-24 text-center max-w-[800px] mx-auto px-4 sm:px-6">
          <div className="space-y-4">
            <h2 className="headline-display text-3xl sm:text-4xl text-[var(--ink)]">
              Not sure where to start?
            </h2>
            <p className="text-sm sm:text-base text-[var(--muted-ink)]">
              Experience all three Indian harvest profiles side by side in our flight box.
            </p>
            <div className="pt-3">
              <Link
                href="/shop/terroir-tasting-trio"
                className="btn-pill-primary shadow-xs"
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
