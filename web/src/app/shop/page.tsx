"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront/Header";
import { StorefrontFooter } from "@/components/storefront/Footer";
import { PRODUCTS } from "@/data/storefront";
import { useCart } from "@/context/CartContext";
import { ProductImage } from "@/components/storefront/ProductImage";
import { ShieldCheck, ShoppingBag, Check } from "lucide-react";

export function ShopCatalogPage() {
  const { addItem } = useCart();
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "single-origin" | "complements" | "gifts"
  >("all");
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  // Core rule: The top three single-origin honeys MUST strictly be at the front
  const TOP_THREE_IDS = ["prod-litchi", "prod-acacia", "prod-mangrove"];
  const sortedProducts = [...PRODUCTS].sort((a, b) => {
    const aIdx = TOP_THREE_IDS.indexOf(a.id);
    const bIdx = TOP_THREE_IDS.indexOf(b.id);
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return 0;
  });

  const filteredProducts = sortedProducts.filter((p) => {
    if (selectedFilter === "single-origin") {
      return (!p.category || p.category === "Honey") && !p.isTastingBox;
    }
    if (selectedFilter === "complements") {
      return p.category && p.category !== "Honey";
    }
    if (selectedFilter === "gifts") {
      return p.isTastingBox;
    }
    return true;
  });

  const handleQuickAdd = (product: (typeof PRODUCTS)[0], e?: React.MouseEvent) => {
    const defaultSize = product.sizes[0];
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        origin: product.region,
        size: defaultSize.size,
        price: defaultSize.price,
        marketPrice: defaultSize.marketPrice,
        quantity: 1,
        batchId: product.activeBatchId,
        colorSwatch: product.colorHex,
      },
      e
    );
    setAddedSlug(product.slug);
    setTimeout(() => setAddedSlug(null), 1800);
  };

  const honeysCount = PRODUCTS.filter((p) => (!p.category || p.category === "Honey") && !p.isTastingBox).length;
  const complementsCount = PRODUCTS.filter((p) => p.category && p.category !== "Honey").length;
  const giftsCount = PRODUCTS.filter((p) => p.isTastingBox).length;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--ink)]">
      <StorefrontHeader />

      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
        {/* Catalog Header */}
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-[var(--forest)] bg-[var(--tag-bg)] border border-[var(--tag-border)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--verified)]" />
            <span>Single-Origin Indian Apiculture & Essentials</span>
          </div>

          <h1 className="headline-display text-4xl sm:text-5xl text-[var(--ink)]">
            Raw Honeys & Complements.
          </h1>

          <p className="text-base text-[var(--muted-ink)] leading-relaxed">
            Unpasteurized raw harvests, hand-turned rosewood tasting dippers, virgin honeycomb, and pure hive superfoods. Every harvest is tied to real smart-hive IoT telemetry and cryptographic batch verification.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-[var(--line)] pb-4">
          {[
            { id: "all", label: `All Offerings (${PRODUCTS.length})` },
            { id: "single-origin", label: `Single-Origin Honeys (${honeysCount})` },
            { id: "complements", label: `Tasting Tools & Superfoods (${complementsCount})` },
            { id: "gifts", label: `Gift Sets (${giftsCount})` },
          ].map((tab) => {
            const isSelected = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as typeof selectedFilter)}
                className={`h-9 px-4 rounded-full text-xs font-sans font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-[var(--signature)] text-[var(--ink)] font-semibold shadow-2xs"
                    : "bg-white text-[var(--muted-ink)] border border-[var(--line)] hover:text-[var(--ink)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xs group"
              style={{
                backgroundColor: `${prod.colorHex}15`,
              }}
            >
              <div className="space-y-4">
                {/* Visual Header */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {prod.category && prod.category !== "Honey" && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[var(--forest)] text-white text-[10px] font-semibold uppercase tracking-wider">
                        {prod.category}
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full bg-white/80 text-[var(--ink)] shadow-2xs">
                      {prod.shortTag}
                    </span>
                  </div>
                  <Link
                    href="/beekeeper"
                    className="text-[11px] font-mono text-[var(--muted-ink)] underline hover:text-[var(--ink)]"
                    title="Open Beekeepers Dashboard"
                  >
                    Batch #{prod.activeBatchId.split("-").slice(-1)}
                  </Link>
                </div>

                {/* Product Image */}
                <Link href={`/shop/${prod.slug}`} className="block">
                  <ProductImage
                    src={prod.image}
                    alt={prod.name}
                    colorHex={prod.colorHex}
                    productName={prod.name}
                    aspectRatio="aspect-[4/5]"
                    className="rounded-2xl shadow-xs transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </Link>

                {/* Product Details */}
                <div className="space-y-2 pt-2">
                  <h2 className="font-serif text-xl font-bold text-[var(--ink)] leading-snug">
                    <Link href={`/shop/${prod.slug}`} className="hover:underline">
                      {prod.name}
                    </Link>
                  </h2>

                  <p className="text-xs font-mono text-[var(--muted-ink)]">
                    {prod.region} · {prod.botanicalOrigin}
                  </p>

                  <p className="text-xs text-[var(--ink)]/80 line-clamp-2 pt-1 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="pt-6 mt-4 border-t border-black/5 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-sans text-base font-bold text-[var(--ink)] block">
                      Our Price: ₹{prod.sizes[0].price}
                    </span>
                    {prod.sizes[0].marketPrice && (
                      <span className="text-xs line-through text-[var(--muted-ink)] font-mono">
                        Market: ₹{prod.sizes[0].marketPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-[10px] text-[var(--muted-ink)]">
                      ({prod.sizes[0].size})
                    </span>
                    {prod.sizes[0].marketPrice && (
                      <span className="text-[10px] font-bold text-[#15803d]">
                        Save ₹{prod.sizes[0].marketPrice - prod.sizes[0].price}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/shop/${prod.slug}`}
                    className="h-10 px-4 rounded-full border border-[var(--ink)] text-xs font-sans font-medium text-[var(--ink)] hover:bg-black/5 transition-all flex items-center"
                  >
                    Details
                  </Link>

                  <button
                    onClick={(e) => handleQuickAdd(prod, e)}
                    className="h-10 px-4 rounded-full bg-[var(--signature)] text-[var(--ink)] text-xs font-sans font-semibold hover:brightness-95 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    aria-label={`Add ${prod.name} to cart`}
                  >
                    {addedSlug === prod.slug ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[var(--verified)]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <StorefrontFooter />
    </div>
  );
}

export default ShopCatalogPage;
