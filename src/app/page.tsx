"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront/Header";
import { StorefrontFooter } from "@/components/storefront/Footer";
import { PRODUCTS, CSE_STUDY_DATA, FAQS } from "@/data/storefront";
import { DEMO_BATCHES } from "@/data/batches";
import { useCart } from "@/context/CartContext";
import {
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Check,
  Scale,
  Thermometer,
  Activity,
  Plus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function HomePage() {
  const { addItem } = useCart();
  const [addedItemSlug, setAddedItemSlug] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Active showcase demo batch
  const liveBatch = DEMO_BATCHES["HC-2026-MUS-014"];
  const singleOriginHoneys = PRODUCTS.filter((p) => !p.isTastingBox);
  const giftBox = PRODUCTS.find((p) => p.isTastingBox);

  const handleQuickAdd = (product: (typeof PRODUCTS)[0]) => {
    const selectedSize = product.sizes[0];
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      origin: product.region,
      size: selectedSize.size,
      price: selectedSize.price,
      quantity: 1,
      batchId: product.activeBatchId,
      colorSwatch: product.colorHex,
    });
    setAddedItemSlug(product.slug);
    setTimeout(() => setAddedItemSlug(null), 1800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#1C1A17]">
      <StorefrontHeader />

      <main className="flex-1">
        {/* SECTION 1: HERO */}
        <section className="border-b border-[#E3DACB] pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Story Headline & CTAs */}
              <div className="lg:col-span-7 space-y-6 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-medium text-[#2F6B3A] bg-[#DFEBDC] border border-[#C5DBC0] rounded">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Single-Origin Indian Apiculture · Verified by HoneyChain</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-[56px] font-bold text-[#1C1A17] tracking-tight leading-[1.12]">
                  Most honey in India is syrup. Ours comes with proof.
                </h1>

                <p className="text-base sm:text-lg text-[#665E55] leading-relaxed">
                  Every jar links directly to the smart hive it came from, the weight curve of its nectar flow, and the laboratory NMR test it passed.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Link
                    href="/shop"
                    className="px-7 py-3.5 bg-[#8A4B12] hover:bg-[#703C0D] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>Shop Raw Honey</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/verify/${liveBatch.id}`}
                    className="px-6 py-3.5 bg-white hover:bg-[#FAF6EF] text-[#1C1A17] border border-[#E3DACB] hover:border-[#8A4B12] text-sm font-mono font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#2F6B3A]" />
                    <span>Verify Batch #{liveBatch.id}</span>
                  </Link>
                </div>

                {/* Proof Strip under Hero */}
                <div className="pt-6 border-t border-[#E3DACB] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[#665E55]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F6B3A]" />
                    NMR-tested batch
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A4B12]" />
                    Single-origin terroir
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3F4A3A]" />
                    Raw, unheated
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F6B3A]" />
                    Tamper-evident record
                  </span>
                </div>
              </div>

              {/* Right Column: Backlit Jar Photo Display */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm aspect-[4/5] bg-gradient-to-b from-[#EBE2D3] to-[#DDD2C0] border border-[#DDD3C2] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                  {/* Jar visual representation */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#665E55]">
                    <span className="bg-white/80 px-2 py-0.5 rounded border border-[#E3DACB]">
                      Harvest {liveBatch.harvestDate}
                    </span>
                    <span className="text-[#8A4B12] font-semibold">
                      {liveBatch.id}
                    </span>
                  </div>

                  {/* Amber Backlit Jar Graphic */}
                  <div className="my-auto text-center space-y-3">
                    <div className="relative w-36 h-48 mx-auto bg-gradient-to-t from-[#B46214] via-[#D89333] to-[#E8AC41] rounded-2xl shadow-inner border border-[#C6852A]/50 flex flex-col justify-between p-3">
                      {/* Jar Lid */}
                      <div className="w-24 h-4 bg-[#EDE5D6] rounded-t mx-auto border border-[#CFC3AE] flex items-center justify-center">
                        <span className="text-[7px] font-mono text-[#786E64] uppercase tracking-wider">
                          QR SEAL
                        </span>
                      </div>

                      {/* Apothecary Minimal Label */}
                      <div className="bg-[#FAF7F0] border border-[#E3DACB] rounded p-2 text-center shadow-xs">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#786E64] block">
                          MADHUVAN
                        </span>
                        <span className="font-serif text-xs font-bold text-[#1C1A17] block leading-tight">
                          Litchi Blossom
                        </span>
                        <span className="text-[8px] font-mono text-[#8A4B12] block mt-0.5">
                          Muzaffarpur · 500g
                        </span>
                      </div>

                      {/* Jar Base glow */}
                      <div className="text-[8px] font-mono text-white/90">
                        100% RAW HONEY
                      </div>
                    </div>
                    <span className="text-xs font-serif italic text-[#665E55] block">
                      Naturally amber, cold-spun from orchard comb
                    </span>
                  </div>

                  {/* Lid QR Scan Notice */}
                  <div className="bg-white p-3 rounded-lg border border-[#E3DACB] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-[#1C1A17] block">
                        Lid QR = Live Hive Record
                      </span>
                      <span className="text-[11px] text-[#665E55]">
                        Inspect nectar flow & NMR purity
                      </span>
                    </div>
                    <Link
                      href={`/verify/${liveBatch.id}`}
                      className="text-[#8A4B12] hover:underline font-mono text-xs font-semibold"
                    >
                      Scan →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE PROBLEM IN ONE STAT */}
        <section className="border-b border-[#E3DACB] bg-[#EFE9DD] py-14 sm:py-20">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
            <div className="bg-[#FAF6EF] border border-[#E3DACB] rounded-xl p-8 sm:p-12 space-y-5 text-center">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold">
                The Adulteration Reality
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1A17] leading-tight max-w-2xl mx-auto">
                {CSE_STUDY_DATA.headline}
              </h2>

              <p className="text-sm sm:text-base text-[#665E55] max-w-2xl mx-auto leading-relaxed">
                A landmark investigation by the Centre for Science and Environment (CSE) revealed that 77% of commercial Indian honey samples failed nuclear magnetic resonance (NMR) purity profiling due to adulteration with modified high-fructose syrups.
              </p>

              <div className="pt-2">
                <a
                  href={CSE_STUDY_DATA.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8A4B12] hover:underline"
                >
                  <span>Source: {CSE_STUDY_DATA.source}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: VERIFY, LIVE (Conversion Engine) */}
        <section className="border-b border-[#E3DACB] py-14 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
                  Interactive Live Proof
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1A17]">
                  Verify, Live: Batch #{liveBatch.id}
                </h2>
              </div>
              <Link
                href={`/verify/${liveBatch.id}`}
                className="inline-flex items-center gap-1.5 text-sm font-mono font-semibold text-[#8A4B12] hover:underline shrink-0"
              >
                <span>See the full record</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Live Verification Timeline Preview Card */}
            <div className="bg-white border border-[#E3DACB] rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E3DACB] text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[#2F6B3A] font-bold bg-[#EBF2EB] border border-[#CDE0CD] px-2 py-0.5 rounded">
                    <Check className="w-3 h-3" />
                    VERIFIED
                  </span>
                  <span className="text-[#1C1A17] font-semibold">{liveBatch.productName}</span>
                </div>
                <div className="text-[#665E55]">
                  <span>{liveBatch.district}</span> · <span>Packed {liveBatch.packDate}</span>
                </div>
              </div>

              {/* 3 Live Milestones */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[#FAF6EF] border border-[#E3DACB] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#786E64]">STAGE 1: SMART HIVE</span>
                    <span className="text-[#2F6B3A] font-bold">12.4kg Harvested</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#1C1A17]">
                    Flow Monitored: {liveBatch.hiveId}
                  </h4>
                  <p className="text-xs text-[#665E55] leading-relaxed">
                    Continuous load cell recorded steady weight rise from 22.1kg to 38.6kg during the 18-day bloom.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#FAF6EF] border border-[#E3DACB] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#786E64]">STAGE 4: LAB NMR</span>
                    <span className="text-[#2F6B3A] font-bold">Passed</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#1C1A17]">
                    400 MHz Spectroscopy
                  </h4>
                  <p className="text-xs text-[#665E55] leading-relaxed">
                    Moisture: 16.4% · C4 isotope: 1.1% (negative). Free from modified rice or beet syrups.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#FAF6EF] border border-[#E3DACB] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#786E64]">STAGE 6: BLOCKCHAIN</span>
                    <span className="text-[#2F6B3A] font-bold">Sepolia Block #5489120</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#1C1A17]">
                    Cryptographic Ledger Seal
                  </h4>
                  <p className="text-xs text-[#665E55] leading-relaxed">
                    Merkle root hash sealed on Ethereum Sepolia testnet. Tamper-evident and permanently auditable.
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#665E55]">
                <span>
                  Anchor Hash: <span className="text-[#1C1A17]">{liveBatch.blockchain.txHash.slice(0, 24)}...</span>
                </span>
                <Link
                  href={`/verify/${liveBatch.id}`}
                  className="text-[#8A4B12] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Inspect full 75-day weight curve & lab PDF</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SHOP BY ORIGIN */}
        <section className="border-b border-[#E3DACB] py-14 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
                  Regional Terroir
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1A17]">
                  Shop by Origin
                </h2>
                <p className="text-sm text-[#665E55] mt-1">
                  Pure, unblended Indian honeys. Flavors shaped entirely by soil, altitude, and nectar source.
                </p>
              </div>
              <Link
                href="/shop"
                className="text-xs font-mono font-semibold text-[#8A4B12] hover:underline"
              >
                View full catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {singleOriginHoneys.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-[#E3DACB] rounded-xl p-6 flex flex-col justify-between hover:border-[#CFC3AE] transition-all shadow-xs group"
                >
                  <div>
                    {/* Terroir Swatch Bar */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: prod.colorHex }}
                        />
                        <span className="text-xs font-mono text-[#665E55]">
                          {prod.colorName}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#8A4B12] bg-[#FAF0E6] px-2 py-0.5 rounded">
                        Batch {prod.activeBatchId}
                      </span>
                    </div>

                    <Link href={`/shop/${prod.slug}`}>
                      <h3 className="font-serif text-xl font-bold text-[#1C1A17] group-hover:text-[#8A4B12] transition-colors">
                        {prod.name}
                      </h3>
                    </Link>

                    <p className="text-xs font-mono text-[#3F4A3A] mt-1">
                      {prod.region}
                    </p>

                    <p className="text-xs text-[#665E55] leading-relaxed mt-3 mb-4">
                      {prod.description}
                    </p>

                    {/* Tasting notes */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {prod.tasteNotes.map((note) => (
                        <span
                          key={note}
                          className="text-[11px] font-mono text-[#1C1A17] bg-[#FAF6EF] border border-[#E3DACB] px-2 py-0.5 rounded"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-4 border-t border-[#E3DACB] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-[#665E55] block">
                        250g Jar
                      </span>
                      <span className="font-mono text-lg font-bold text-[#1C1A17]">
                        ₹{prod.sizes[0].price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleQuickAdd(prod)}
                      className="px-4 py-2 bg-[#8A4B12] hover:bg-[#703C0D] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {addedItemSlug === prod.slug ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: WE LISTEN TO OUR HIVES */}
        <section className="border-b border-[#E3DACB] bg-[#FAF6EF] py-14 sm:py-20">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
                  Smart Apiculture Story
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1A17] leading-tight">
                  We listen to our hives.
                </h2>
                <p className="text-base text-[#1C1A17] leading-relaxed font-medium">
                  Sensors weigh the hive, check its temperature, and listen to the colony. When something sounds wrong, the beekeeper knows the same day.
                </p>
                <p className="text-sm text-[#665E55] leading-relaxed">
                  During the nectar bloom, honeybees can add up to 2 kilograms of nectar in a single sunny afternoon. By monitoring hive weight continuously, beekeepers harvest only fully ripened, capped comb when natural moisture drops below 18% — without stressing the brood nest.
                </p>

                <div className="pt-2">
                  <Link
                    href="/our-hives"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#8A4B12] hover:underline"
                  >
                    <span>Read how HoneyChain watches the hives →</span>
                  </Link>
                </div>
              </div>

              {/* Simple illustrative telemetry cards */}
              <div className="md:col-span-5 space-y-3">
                <div className="bg-white p-4 rounded-lg border border-[#E3DACB] flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-[#FAF6EF] border border-[#E3DACB] flex items-center justify-center text-[#8A4B12] shrink-0">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold font-serif text-[#1C1A17] block">Continuous Weight</span>
                    <span className="text-[11px] text-[#665E55] leading-tight block">Tracks the exact afternoon the flow starts and peaks.</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-[#E3DACB] flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-[#FAF6EF] border border-[#E3DACB] flex items-center justify-center text-[#3F4A3A] shrink-0">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold font-serif text-[#1C1A17] block">Brood Temperature</span>
                    <span className="text-[11px] text-[#665E55] leading-tight block">Healthy colonies thermoregulate their nursery at ~34.5°C.</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-[#E3DACB] flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-[#FAF6EF] border border-[#E3DACB] flex items-center justify-center text-[#2F6B3A] shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold font-serif text-[#1C1A17] block">Colony Acoustics</span>
                    <span className="text-[11px] text-[#665E55] leading-tight block">Listens to vibrational harmonics to detect early swarming.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: THE BEEKEEPER */}
        <section className="border-b border-[#E3DACB] py-14 sm:py-20">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6">
            <div className="bg-white border border-[#E3DACB] rounded-xl p-8 sm:p-12 space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
                Meet the Producer
              </span>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-[#E3DACB]">
                <div className="w-14 h-14 rounded-full bg-[#FAF6EF] border border-[#E3DACB] flex items-center justify-center text-[#8A4B12] font-serif text-2xl font-bold shrink-0">
                  R
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1C1A17]">
                    Ramdas Mahato
                  </h3>
                  <span className="text-xs font-mono text-[#665E55]">
                    Muzaffarpur District, Bihar · 18 Years Apiculture Practice
                  </span>
                </div>
              </div>

              <blockquote className="font-serif text-lg sm:text-xl text-[#1C1A17] italic leading-relaxed">
                &ldquo;When the litchi bloom opens across Bochaha, you smell the blossoms for miles. With the HoneyChain scale under Hive #04, we knew the exact afternoon the nectar flow stalled, so we harvested the honey supers without disturbing the nursery brood below.&rdquo;
              </blockquote>

              <p className="text-xs font-mono text-[#3F4A3A]">
                Harvested batch: <strong className="text-[#8A4B12]">HC-2026-MUS-014</strong> · Paid direct fair living wage
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: GIFT BOX (TASTING TRIO) */}
        {giftBox && (
          <section className="border-b border-[#E3DACB] bg-[#EFE9DD] py-14 sm:py-20">
            <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
              <div className="bg-[#FAF6EF] border border-[#E3DACB] rounded-xl p-8 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xs">
                <div className="md:col-span-7 space-y-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
                    Curated Gift Set
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17]">
                    The Terroir Tasting Trio
                  </h3>
                  <p className="text-sm text-[#665E55] leading-relaxed">
                    Compare how soil, altitude, and blossom variety shape the taste of raw Indian honey. Three 150g glass jars packed in an untreated kraft sleeve: Litchi Blossom (Bihar), White Acacia (Kashmir), and Wild Mangrove (Sundarbans).
                  </p>
                  <p className="text-xs font-mono text-[#3F4A3A]">
                    Each jar includes its own lid QR code linking to its smart hive record.
                  </p>
                </div>

                <div className="md:col-span-5 bg-white p-6 rounded-lg border border-[#E3DACB] text-center space-y-4">
                  <div>
                    <span className="text-xs font-mono text-[#665E55] block">Gift Box (3 × 150g)</span>
                    <span className="font-mono text-2xl font-bold text-[#1C1A17]">₹1,450</span>
                  </div>

                  <button
                    onClick={() => handleQuickAdd(giftBox)}
                    className="w-full py-3 bg-[#8A4B12] hover:bg-[#703C0D] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {addedItemSlug === giftBox.slug ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add Tasting Trio</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/shop/${giftBox.slug}`}
                    className="text-xs font-mono text-[#8A4B12] hover:underline block"
                  >
                    View gift box specs →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 8: FAQ */}
        <section className="py-14 sm:py-20 border-b border-[#E3DACB]">
          <div className="max-w-[850px] mx-auto px-4 sm:px-6 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold">
                Purity & Science
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1A17]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-[#E3DACB] rounded-lg transition-colors overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer hover:bg-[#FAF6EF]"
                    >
                      <span className="font-serif text-base sm:text-lg font-bold text-[#1C1A17]">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#8A4B12] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#786E64] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-[#665E55] leading-relaxed border-t border-[#E3DACB] pt-4 bg-[#FAF6EF]/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* SECTION 9: FOOTER */}
      <StorefrontFooter />
    </div>
  );
}
