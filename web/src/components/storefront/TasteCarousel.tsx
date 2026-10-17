"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/storefront";
import { useCart } from "@/context/CartContext";
import { ProductImage } from "./ProductImage";
import { Check, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";

export function TasteCarousel() {
  const { addItem } = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  // Honeys ordered mild -> bold
  const orderedHoneys = [
    PRODUCTS.find((p) => p.slug === "kashmir-white-acacia")!,
    PRODUCTS.find((p) => p.slug === "muzaffarpur-litchi")!,
    PRODUCTS.find((p) => p.slug === "sundarbans-wild-mangrove")!,
  ].filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(1); // 1 = Litchi (center card)

  const handleAdd = (product: (typeof PRODUCTS)[0], e?: React.MouseEvent) => {
    const size = product.sizes[0];
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        origin: product.region,
        size: size.size,
        price: size.price,
        quantity: 1,
        batchId: product.activeBatchId,
        colorSwatch: product.colorHex,
      },
      e
    );
    setAddedSlug(product.slug);
    setTimeout(() => setAddedSlug(null), 1800);
  };

  const checklistItems = [
    "Never blended with commercial corn or beet syrups",
    "Cold-harvested without heating to protect wild enzymes",
    "Every harvest links directly to its smart hive record",
  ];

  return (
    <section className="py-16 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Explainer & Checklist */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-[var(--muted-ink)]">
            Origin Spectrum
          </div>
          <h2 className="headline-display text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)]">
            Find your taste.
          </h2>
          <p className="text-base sm:text-lg text-[var(--muted-ink)] leading-relaxed">
            Colour and taste come from the flower, not a factory. As nectar sources shift across Indian landscapes, flavor evolves from crystal-clear floral sweetness to bold coastal minerals.
          </p>

          <div className="space-y-3.5 pt-2">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-[var(--ink)]">
                <span className="w-5 h-5 rounded-full bg-[var(--signature)] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[var(--ink)]" />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center text-xs font-mono font-medium text-[var(--ink)] underline hover:text-[var(--signature)] transition-colors"
            >
              Explore all regional harvests →
            </Link>
          </div>
        </div>

        {/* Right Column: 3-Card Carousel */}
        <div className="lg:col-span-7">
          <div className="relative">
            {/* Desktop 3-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
              {orderedHoneys.map((honey, index) => {
                const isCenter = index === activeIndex;
                const isSelected = isCenter;

                return (
                  <div
                    key={honey.id}
                    onClick={() => setActiveIndex(index)}
                    className={`rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-[var(--signature)] text-[var(--ink)] shadow-md md:scale-105 z-10"
                        : "bg-[var(--card-tint)] text-[var(--ink)] hover:bg-[var(--tag-bg)]"
                    }`}
                  >
                    {/* Top tag */}
                    <div className="flex items-center justify-between gap-1 text-[11px] font-mono mb-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          isSelected ? "bg-black/10 text-[var(--ink)]" : "bg-white/70 text-[var(--muted-ink)]"
                        }`}
                      >
                        {honey.bestFor ? honey.bestFor.replace("Best for ", "") : honey.shortTag}
                      </span>
                      <span className="text-[10px] opacity-75">
                        Level {honey.tasteIntensity}/5
                      </span>
                    </div>

                    {/* Jar Image */}
                    <div className="my-3">
                      <ProductImage
                        src={honey.image}
                        alt={honey.name}
                        colorHex={honey.colorHex}
                        productName={honey.name}
                        aspectRatio="aspect-[4/5]"
                        className="rounded-xl shadow-2xs"
                      />
                    </div>

                    {/* Honey Details */}
                    <div className="space-y-2 mt-2">
                      <h3 className="font-serif text-base font-bold leading-tight">
                        <Link href={`/shop/${honey.slug}`} className="hover:underline">
                          {honey.name}
                        </Link>
                      </h3>
                      <p
                        className={`text-xs line-clamp-2 ${
                          isSelected ? "text-[var(--ink)]/80" : "text-[var(--muted-ink)]"
                        }`}
                      >
                        {honey.tasteNotes.join(" · ")}
                      </p>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold">
                          ₹{honey.sizes[0].price} <span className="text-[10px] font-normal opacity-70">/ {honey.sizes[0].size}</span>
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdd(honey, e);
                        }}
                        className={`w-full mt-3 h-10 rounded-full font-sans text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[var(--ink)] text-[var(--paper)] hover:bg-black"
                            : "bg-white text-[var(--ink)] border border-black/15 hover:border-black"
                        }`}
                      >
                        {addedSlug === honey.slug ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added to cart</span>
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
                );
              })}
            </div>

            {/* Mobile Carousel Controls */}
            <div className="flex md:hidden items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : orderedHoneys.length - 1))}
                className="w-10 h-10 rounded-full border border-[var(--line)] bg-white flex items-center justify-center text-[var(--ink)] cursor-pointer"
                aria-label="Previous origin"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-[var(--muted-ink)]">
                {activeIndex + 1} of {orderedHoneys.length}
              </span>
              <button
                onClick={() => setActiveIndex((prev) => (prev < orderedHoneys.length - 1 ? prev + 1 : 0))}
                className="w-10 h-10 rounded-full border border-[var(--line)] bg-white flex items-center justify-center text-[var(--ink)] cursor-pointer"
                aria-label="Next origin"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
