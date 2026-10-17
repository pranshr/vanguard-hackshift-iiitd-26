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
  const [selectedFilter, setSelectedFilter] = useState<"all" | "mild" | "bold" | "gifts">("all");
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedFilter === "mild") return p.tasteIntensity <= 2 && !p.isTastingBox;
    if (selectedFilter === "bold") return p.tasteIntensity >= 4 && !p.isTastingBox;
    if (selectedFilter === "gifts") return p.isTastingBox;
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
        quantity: 1,
        batchId: product.activeBatchId,
        colorSwatch: product.colorHex,
      },
      e
    );
    setAddedSlug(product.slug);
    setTimeout(() => setAddedSlug(null), 1800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--ink)]">
      <StorefrontHeader />

      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
        {/* Catalog Header */}
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-[var(--forest)] bg-[var(--tag-bg)] border border-[var(--tag-border)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--verified)]" />
            <span>Single-Origin Indian Apiculture</span>
          </div>

          <h1 className="headline-display text-4xl sm:text-5xl text-[var(--ink)]">
            Raw Honeys by Origin.
          </h1>

          <p className="text-base text-[var(--muted-ink)] leading-relaxed">
            Unpasteurized, coarse-filtered, and never blended with bulk commercial syrup. Every harvest is tied to the smart hive telemetry and independent laboratory test summary of its batch.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-[var(--line)] pb-4">
          {[
            { id: "all", label: `All Harvests (${PRODUCTS.length})` },
            { id: "mild", label: "Mild & Floral Terroirs" },
            { id: "bold", label: "Bold & Earthy Terroirs" },
            { id: "gifts", label: "Tasting Gift Sets" },
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
                  <span className="px-3 py-1 rounded-full bg-white/80 text-[var(--ink)] shadow-2xs">
                    {prod.shortTag}
                  </span>
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
                  <span className="font-sans text-base font-bold text-[var(--ink)] block">
                    From ₹{prod.sizes[0].price}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--muted-ink)]">
                    ({prod.sizes[0].size})
                  </span>
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
