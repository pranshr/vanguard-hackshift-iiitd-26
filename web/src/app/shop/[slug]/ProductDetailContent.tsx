"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Product } from "@/data/types";
import { getBatchById, DEMO_BATCHES } from "@/data/batches";
import { PRODUCTS } from "@/data/storefront";
import { useCart } from "@/context/CartContext";
import { StorefrontHeader } from "@/components/storefront/Header";
import { StorefrontFooter } from "@/components/storefront/Footer";
import { ProductImage } from "@/components/storefront/ProductImage";
import { ComparisonTable } from "@/components/storefront/ComparisonTable";
import { TasteCarousel } from "@/components/storefront/TasteCarousel";
import { HiveWeightChart } from "@/components/storefront/HiveWeightChart";
import {
  Check,
  ShoppingBag,
  ShieldCheck,
  ChevronDown,
  Calendar,
  Layers,
  FileText,
  User,
  Hash,
} from "lucide-react";

interface Props {
  product: Product;
}

export function ProductDetailContent({ product }: Props) {
  const { addItem } = useCart();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const buyButtonRef = useRef<HTMLButtonElement>(null);

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const batch = getBatchById(product.activeBatchId) || DEMO_BATCHES["HC-2026-MUS-014"];

  // Other single-origin honeys for the "Choose your honey" selector
  const otherHoneys = PRODUCTS.filter(
    (p) => (!p.category || p.category === "Honey") && !p.isTastingBox
  );

  // Price per 100g calculation
  const getPricePer100g = (sizeStr: string, price: number) => {
    if (sizeStr === "250g") return Math.round((price / 250) * 100);
    if (sizeStr === "500g") return Math.round((price / 500) * 100);
    if (sizeStr.includes("3x150g")) return Math.round((price / 450) * 100);
    if (sizeStr.includes("100g")) return price;
    if (sizeStr.includes("120g")) return Math.round((price / 120) * 100);
    return null;
  };

  const handleAddToCart = (e?: React.MouseEvent) => {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        origin: product.region,
        size: selectedSize.size,
        price: selectedSize.price,
        marketPrice: selectedSize.marketPrice,
        quantity: 1,
        batchId: product.activeBatchId,
        colorSwatch: product.colorHex,
      },
      e
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // IntersectionObserver to show/hide sticky bottom ATC bar
  useEffect(() => {
    const target = buyButtonRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when the main ATC button is scrolled out of view
        setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const pdpFaqs = [
    {
      q: "Taste & Regional Floral Pairings",
      a: `Notes: ${product.tasteNotes.join(", ")}. Recommended pairings: ${product.pairings.join(", ")}. Because this is raw honey, aromatics are vibrant and clean.`,
    },
    {
      q: "Crystallisation & Proper Storage",
      a: `${product.crystallisationNote} Keep tightly sealed at room temperature away from moisture.`,
    },
    {
      q: "How to Trace Your Batch on HoneyChain",
      a: `Each jar features batch code #${product.activeBatchId}. Look up this batch hash on HoneyChain to view continuous scale weight curves from Hive #${batch.hiveId}, harvest date (${batch.harvestDate}), brood thermoregulation, and the laboratory test summary.`,
    },
    {
      q: "Packaging & Dispatch Verification",
      a: "Every glass jar is packaged in sustainable shock-proof molded pulp cartons. Your package includes an authentic Certificate of Origin linking directly to its cryptographic batch passport.",
    },
  ];

  const whatWeCanShowYou = [
    { label: "Hive ID", value: batch.hiveId, icon: Layers },
    { label: "Harvest Date", value: batch.harvestDate, icon: Calendar },
    { label: "Lab Test Record", value: "Laboratory Tested", icon: FileText },
    { label: "Sepolia tx", value: `${batch.blockchain.txHash.slice(0, 10)}...`, icon: Hash },
    { label: "Beekeeper", value: batch.beekeeper.name, icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--ink)]">
      <StorefrontHeader />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-xs font-mono text-[var(--muted-ink)]">
            <Link href="/" className="hover:text-[var(--ink)]">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[var(--ink)]">
              Shop
            </Link>
            <span>/</span>
            <span className="text-[var(--ink)] font-semibold truncate max-w-xs">
              {product.name}
            </span>
          </nav>
        </div>

        {/* TOP: TWO-COLUMN BUY BOX */}
        <section className="py-6 sm:py-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* LEFT: GALLERY */}
            <div className="lg:col-span-7 space-y-4">
              <div
                className="relative w-full aspect-[4/5] sm:aspect-[1/1] rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center overflow-hidden shadow-xs border border-[var(--line)]"
                style={{
                  backgroundColor: `${product.colorHex}15`,
                }}
              >
                {/* Main Product Image Container */}
                <div className="w-full max-w-sm aspect-[4/5] relative">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    colorHex={product.colorHex}
                    productName={product.name}
                    aspectRatio="aspect-[4/5]"
                    className="w-full h-full object-cover rounded-2xl shadow-sm"
                    priority
                  />
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                <div className="w-20 h-20 rounded-2xl p-1 bg-white border-2 border-[var(--signature)] cursor-pointer shrink-0">
                  <ProductImage
                    src={product.image}
                    alt={`${product.name} thumbnail`}
                    colorHex={product.colorHex}
                    productName={product.name}
                    aspectRatio="aspect-square"
                    className="w-full h-full rounded-xl"
                  />
                </div>
                <div className="w-20 h-20 rounded-2xl p-1 bg-white border border-[var(--line)] cursor-pointer opacity-70 hover:opacity-100 shrink-0">
                  <ProductImage
                    src="/images/iot-smart-hive.jpg"
                    alt="IoT Smart Hive Telemetry thumbnail"
                    colorHex="var(--signature)"
                    productName="IoT Hive"
                    aspectRatio="aspect-square"
                    className="w-full h-full rounded-xl"
                  />
                </div>
                <div className="w-20 h-20 rounded-2xl p-1 bg-white border border-[var(--line)] cursor-pointer opacity-70 hover:opacity-100 shrink-0">
                  <ProductImage
                    src="/images/spoon.jpg"
                    alt="Honey texture thumbnail"
                    colorHex={product.colorHex}
                    productName="Texture"
                    aspectRatio="aspect-square"
                    className="w-full h-full rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: BUY PANEL IN EXACT ORDER */}
            <div className="lg:col-span-5 space-y-6">
              {/* 1. Badge row: Category / Origin + taste badge */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[var(--tag-bg)] text-[var(--forest)] border border-[var(--tag-border)]">
                  {product.category === "Accessory"
                    ? "Tasting Tool"
                    : product.category === "Superfood"
                    ? "Bee Superfood"
                    : product.category === "Pantry"
                    ? "Raw Pantry"
                    : product.isTastingBox
                    ? "Gift Set"
                    : "Single origin"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white text-[var(--ink)] border border-[var(--line)]">
                  {product.shortTag}
                </span>
              </div>

              {/* 2. Name (Fraunces) + origin line. NO stars. */}
              <div className="space-y-1.5">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--ink)] tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm font-mono text-[var(--muted-ink)]">
                  {product.region} · {product.botanicalOrigin}
                </p>
              </div>

              {/* 3. Three short bullet facts from data (true only) */}
              {product.bullets && product.bullets.length > 0 && (
                <ul className="space-y-2 py-3 border-y border-[var(--line)] text-xs sm:text-sm text-[var(--ink)]/80">
                  {product.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--signature)] mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* 4. "Choose your honey": 3 small tiles to switch origin */}
              <div className="space-y-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--ink)] font-semibold block">
                  {product.category && product.category !== "Honey" ? "Explore Single-Origin Honeys" : "Choose your honey"}
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {otherHoneys.map((honey) => {
                    const isCurrent = honey.slug === product.slug;
                    return (
                      <Link
                        key={honey.id}
                        href={`/shop/${honey.slug}`}
                        className={`p-2.5 rounded-2xl flex flex-col items-center text-center transition-all ${
                          isCurrent
                            ? "bg-[var(--signature)] text-[var(--ink)] font-semibold shadow-2xs"
                            : "bg-white hover:bg-[var(--sand)] border border-[var(--line)] text-[var(--muted-ink)]"
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full mb-1.5 border border-black/10"
                          style={{ backgroundColor: honey.colorHex }}
                        />
                        <span className="text-[11px] leading-tight line-clamp-1">
                          {honey.name.split(" ")[0]}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* 5. "Choose your size": Option tiles showing price & ₹/100g */}
              <div className="space-y-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--ink)] font-semibold block">
                  Choose your size
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {product.sizes.map((sz, idx) => {
                    const isSelected = idx === selectedSizeIndex;
                    const per100g = getPricePer100g(sz.size, sz.price);
                    return (
                      <button
                        key={sz.size}
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[var(--signature)] text-[var(--ink)] shadow-2xs border-2 border-black/10"
                            : "bg-white hover:bg-[var(--sand)] border border-[var(--line)] text-[var(--ink)]"
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono text-xs mb-1">
                          <span className="font-semibold">{sz.size}</span>
                          <div className="text-right">
                            {sz.marketPrice && (
                              <span className="text-[10px] line-through text-[var(--muted-ink)] mr-1.5 font-normal">
                                ₹{sz.marketPrice}
                              </span>
                            )}
                            <span className="font-bold">₹{sz.price}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          {per100g && (
                            <span
                              className={`text-[10px] font-mono block ${
                                isSelected ? "text-[var(--ink)]/80" : "text-[var(--muted-ink)]"
                              }`}
                            >
                              ₹{per100g}/100g
                            </span>
                          )}
                          {sz.marketPrice && (
                            <span className="text-[9px] font-bold text-[#15803d]">
                              Save ₹{sz.marketPrice - sz.price}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Price: Our Price and Market Price */}
              <div className="space-y-1 font-mono">
                <div className="flex flex-wrap items-baseline gap-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs uppercase tracking-wider text-[#b45309] font-bold">Our Price</span>
                    <span className="text-3xl font-bold text-[var(--ink)]">
                      ₹{selectedSize.price}
                    </span>
                  </div>
                  {selectedSize.marketPrice && (
                    <div className="flex items-baseline gap-2 pl-3 border-l border-[var(--line)]">
                      <span className="text-xs uppercase tracking-wider text-[var(--muted-ink)]">Market Price</span>
                      <span className="text-xl line-through text-[var(--muted-ink)] font-semibold">
                        ₹{selectedSize.marketPrice}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fde68a]">
                        Save ₹{selectedSize.marketPrice - selectedSize.price}
                      </span>
                    </div>
                  )}
                  <span className="text-xs text-[var(--muted-ink)]">
                    ({selectedSize.size})
                  </span>
                </div>
              </div>

              {/* 7. "In the box": jar + lid QR linked to its batch */}
              <div className="p-3.5 rounded-2xl bg-[var(--card-tint)] border border-[var(--tag-border)] text-xs font-mono text-[var(--ink)]/80 space-y-1">
                <span className="font-semibold text-[var(--ink)] block">
                  In the box:
                </span>
                <p>
                  1 × {selectedSize.size} sealed glass jar with batch record #{product.activeBatchId} verified by IoT telemetry.
                </p>
              </div>

              {/* 8. Full-width signature pill Add to cart */}
              <div>
                <button
                  ref={buyButtonRef}
                  onClick={handleAddToCart}
                  className="w-full h-12 rounded-full font-sans text-sm font-semibold bg-[var(--signature)] text-[var(--ink)] hover:brightness-95 transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-[var(--verified)]" />
                      <span>Added to cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to cart — ₹{selectedSize.price}</span>
                    </>
                  )}
                </button>
              </div>

              {/* 9. Trust row with 3 small icons */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-[var(--line)] text-center text-[10px] font-mono text-[var(--muted-ink)]">
                <div className="space-y-1">
                  <ShieldCheck className="w-4 h-4 text-[var(--verified)] mx-auto" />
                  <span>Lab-tested batch</span>
                </div>
                <div className="space-y-1">
                  <Layers className="w-4 h-4 text-[var(--forest)] mx-auto" />
                  <span>Traceable to hive</span>
                </div>
                <div className="space-y-1">
                  <Hash className="w-4 h-4 text-[var(--signature)] mx-auto" />
                  <span>Tamper-evident record</span>
                </div>
              </div>

              {/* 10. Outline button: Open Beekeepers Dashboard */}
              <div>
                <Link
                  href="/beekeeper"
                  className="w-full h-11 rounded-full border border-[var(--ink)] font-sans text-xs font-semibold text-[var(--ink)] hover:bg-black/5 transition-all flex items-center justify-center gap-2"
                >
                  <span>Open Beekeepers Dashboard →</span>
                </Link>
              </div>

              {/* FAQ Accordion immediately below buy box */}
              <div className="pt-4 space-y-2.5">
                {pdpFaqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl transition-colors border ${
                        isOpen
                          ? "bg-[var(--signature)]/15 border-[var(--signature)]/40 text-[var(--ink)]"
                          : "bg-white/80 hover:bg-white border-[var(--line)] text-[var(--ink)]/80"
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 flex items-center justify-between text-left text-xs font-semibold cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                            isOpen ? "rotate-180 text-[var(--signature)]" : "text-[var(--muted-ink)]"
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-[var(--ink)]/80 leading-relaxed border-t border-black/5 pt-2">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* BELOW THE FOLD */}

        {/* 1. "How to use" (photo left, signature card right with 2x2 icon grid) */}
        <section className="py-14 sm:py-20 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="rounded-3xl sm:rounded-[36px] bg-[var(--sand)] border border-[var(--line)] p-8 sm:p-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Photo */}
              <div className="lg:col-span-5">
                <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xs border border-[var(--line)]">
                  <ProductImage
                    src="/images/hand-jar.jpg"
                    alt="Hand holding raw honey jar with wooden spoon"
                    colorHex={product.colorHex}
                    productName={product.name}
                    aspectRatio="aspect-[4/5]"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
              </div>

              {/* Right Signature 2x2 Grid Card */}
              <div className="lg:col-span-7 bg-[var(--signature)] text-[var(--ink)] rounded-3xl p-8 sm:p-10 space-y-6 shadow-sm">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest font-semibold block text-black/70">
                    Daily Rituals
                  </span>
                  <h2 className="headline-display text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)] mt-1">
                    How to use.
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Cell 1: Taste */}
                  <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xs space-y-1">
                    <span className="text-xs font-mono uppercase font-bold text-[var(--ink)] block">
                      Taste
                    </span>
                    <p className="text-xs text-[var(--ink)]/80 leading-snug">
                      Intensity {product.tasteIntensity}/5. Notes of {product.tasteNotes.slice(0, 2).join(" and ")}.
                    </p>
                  </div>

                  {/* Cell 2: Pair */}
                  <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xs space-y-1">
                    <span className="text-xs font-mono uppercase font-bold text-[var(--ink)] block">
                      Pair
                    </span>
                    <p className="text-xs text-[var(--ink)]/80 leading-snug">
                      {product.pairings.slice(0, 2).join(", ")}.
                    </p>
                  </div>

                  {/* Cell 3: Store */}
                  <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xs space-y-1">
                    <span className="text-xs font-mono uppercase font-bold text-[var(--ink)] block">
                      Store
                    </span>
                    <p className="text-xs text-[var(--ink)]/80 leading-snug">
                      Airtight at room temperature away from direct sun.
                    </p>
                  </div>

                  {/* Cell 4: If it crystallises */}
                  <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xs space-y-1">
                    <span className="text-xs font-mono uppercase font-bold text-[var(--ink)] block">
                      If it crystallises
                    </span>
                    <p className="text-xs text-[var(--ink)]/80 leading-snug">
                      Enjoy buttery spread, or warm gently in water under 40°C.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Experts: REMOVED */}

        {/* 3. Comparison table */}
        <ComparisonTable />

        {/* 4. "What we can show you" verification banner */}
        <section className="py-12 sm:py-16 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-[var(--sand)] border border-[var(--line)] space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--muted-ink)] block">
                Batch Verification Standard
              </span>
              <h2 className="headline-display text-2xl sm:text-3xl text-[var(--ink)]">
                What we can show you.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted-ink)]">
                Only verifiable parameters present on our testnet passport. No empty certifications.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
              {whatWeCanShowYou.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-[var(--line)] text-center space-y-1.5 shadow-2xs"
                  >
                    <Icon className="w-4 h-4 text-[var(--signature)] mx-auto" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-ink)] block">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs font-bold text-[var(--ink)] block truncate">
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. "This jar's hive": Compact weight curve preview using read-only HiveWeightChart */}
        <section className="py-12 sm:py-16 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--forest)] block">
                  IoT Sensor Telemetry
                </span>
                <h2 className="headline-display text-2xl sm:text-3xl text-[var(--ink)]">
                  This jar&apos;s hive weight curve.
                </h2>
              </div>

              <Link
                href="/beekeeper"
                className="text-xs font-mono font-medium text-[var(--ink)] underline hover:text-[var(--signature)]"
              >
                Inspect telemetry on Beekeepers Dashboard →
              </Link>
            </div>

            {/* Read-only HiveWeightChart integration */}
            <div className="rounded-3xl overflow-hidden border border-[var(--line)] shadow-xs">
              <HiveWeightChart data={batch.telemetry} hiveId={batch.hiveId} />
            </div>
          </div>
        </section>

        {/* 6. MGO Selector / Taste Carousel */}
        <TasteCarousel />

        {/* 7. FAQ Grid (Learn Cards) */}
        <section className="py-12 sm:py-16 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--muted-ink)] block">
              Knowledge Base
            </span>
            <h2 className="headline-display text-2xl sm:text-3xl text-[var(--ink)]">
              Questions & Transparency.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdpFaqs.concat([
              {
                q: "Why are Indian honeys often adulterated?",
                a: "Industrial demand leads commercial packers to blend bulk batches with rice and corn syrups. BEE safe operates single-origin harvest lots verified by laboratory testing.",
              },
              {
                q: "What does cold-filtered mean?",
                a: "Our honey passes only through coarse 400-micron stainless screens to remove beeswax cappings while leaving natural pollen grains and aromatics intact.",
              },
            ]).map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[var(--sand)] border border-[var(--line)] space-y-2"
              >
                <h3 className="font-serif text-base font-bold text-[var(--ink)]">
                  {faq.q}
                </h3>
                <p className="text-xs text-[var(--ink)]/80 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Reviews: REMOVED */}

        {/* 9. Two Image Tiles */}
        <section className="py-10 sm:py-16 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Link
              href="/our-story"
              className="group relative h-64 rounded-3xl overflow-hidden bg-[var(--dark-card)] p-8 flex flex-col justify-end text-white shadow-sm border border-black/10"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-40"
                style={{
                  backgroundImage: "url('/images/beekeeper-ramdas.jpg'), radial-gradient(circle, var(--amber-deep), var(--ink))",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--signature)] font-semibold block">
                  Origin Mission
                </span>
                <span className="font-serif text-2xl font-bold block">
                  Our story →
                </span>
              </div>
            </Link>

            <Link
              href="/beekeeper"
              className="group relative h-64 rounded-3xl overflow-hidden bg-[var(--dark-card-subtle)] p-8 flex flex-col justify-end text-white shadow-sm border border-black/10"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-40"
                style={{
                  backgroundImage: "url('/images/iot-smart-hive.jpg'), radial-gradient(circle, var(--verified), var(--ink))",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--signature)] font-semibold block">
                  IoT Dashboard
                </span>
                <span className="font-serif text-2xl font-bold block">
                  Beekeepers Dashboard →
                </span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* 10. Sticky Bottom Bar across all viewports */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--sand)]/95 backdrop-blur-md border-t border-[var(--line)] py-3 px-4 shadow-lg transition-transform duration-200">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4">
            <div className="min-w-0">
              <span className="font-serif text-sm font-bold text-[var(--ink)] block truncate">
                {product.name}
              </span>
              <div className="text-xs font-mono">
                <span className="text-[var(--muted-ink)]">Our Price: </span>
                <strong className="text-[var(--ink)] font-bold">₹{selectedSize.price}</strong>
                {selectedSize.marketPrice && (
                  <span className="text-[var(--muted-ink)] ml-1 line-through">
                    ₹{selectedSize.marketPrice}
                  </span>
                )}
                <span className="text-[var(--muted-ink)] ml-1">({selectedSize.size})</span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="h-10 px-6 rounded-full font-sans text-xs font-semibold bg-[var(--signature)] text-[var(--ink)] hover:brightness-95 transition-all shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[var(--verified)]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <StorefrontFooter />
    </div>
  );
}
