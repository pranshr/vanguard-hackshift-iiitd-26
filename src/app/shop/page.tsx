"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront/Header";
import { StorefrontFooter } from "@/components/storefront/Footer";
import { PRODUCTS } from "@/data/storefront";
import { useCart } from "@/context/CartContext";
import {
  ShieldCheck,
  Plus,
  Check,
} from "lucide-react";

export default function ShopCatalogPage() {
  const { addItem } = useCart();
  const [selectedFilter, setSelectedFilter] = useState<"all" | "mild" | "bold" | "gifts">("all");
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedFilter === "mild") return p.tasteIntensity <= 2 && !p.isTastingBox;
    if (selectedFilter === "bold") return p.tasteIntensity >= 4 && !p.isTastingBox;
    if (selectedFilter === "gifts") return p.isTastingBox;
    return true;
  });

  const handleQuickAdd = (product: (typeof PRODUCTS)[0]) => {
    const defaultSize = product.sizes[0];
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      origin: product.region,
      size: defaultSize.size,
      price: defaultSize.price,
      quantity: 1,
      batchId: product.activeBatchId,
      colorSwatch: product.colorHex,
    });
    setAddedSlug(product.slug);
    setTimeout(() => setAddedSlug(null), 1800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#1C1A17]">
      <StorefrontHeader />

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
        {/* Catalog Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-medium text-[#2F6B3A] bg-[#DFEBDC] border border-[#C5DBC0]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Single-Origin Indian Apiculture</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1A17]">
            Raw Honeys by Origin
          </h1>
          <p className="text-sm sm:text-base text-[#665E55] leading-relaxed">
            Unpasteurized, coarse-filtered, and never blended with bulk commercial syrup. Every harvest is tied to the smart hive telemetry and accredited NMR laboratory test of its batch.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-[#E3DACB] pb-4">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-3.5 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
              selectedFilter === "all"
                ? "bg-[#1C1A17] text-white font-semibold"
                : "bg-white text-[#665E55] border border-[#E3DACB] hover:text-[#1C1A17]"
            }`}
          >
            All Harvests ({PRODUCTS.length})
          </button>
          <button
            onClick={() => setSelectedFilter("mild")}
            className={`px-3.5 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
              selectedFilter === "mild"
                ? "bg-[#1C1A17] text-white font-semibold"
                : "bg-white text-[#665E55] border border-[#E3DACB] hover:text-[#1C1A17]"
            }`}
          >
            Mild & Floral Terroirs
          </button>
          <button
            onClick={() => setSelectedFilter("bold")}
            className={`px-3.5 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
              selectedFilter === "bold"
                ? "bg-[#1C1A17] text-white font-semibold"
                : "bg-white text-[#665E55] border border-[#E3DACB] hover:text-[#1C1A17]"
            }`}
          >
            Bold & Earthy Terroirs
          </button>
          <button
            onClick={() => setSelectedFilter("gifts")}
            className={`px-3.5 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
              selectedFilter === "gifts"
                ? "bg-[#1C1A17] text-white font-semibold"
                : "bg-white text-[#665E55] border border-[#E3DACB] hover:text-[#1C1A17]"
            }`}
          >
            Tasting Gift Sets
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border border-[#E3DACB] rounded-xl p-6 flex flex-col justify-between hover:border-[#CFC3AE] transition-all shadow-xs group"
            >
              <div className="space-y-4">
                {/* Visual Jar Header */}
                <div
                  className="w-full aspect-[4/3] rounded-lg border border-[#E3DACB] flex flex-col items-center justify-center p-4 relative overflow-hidden transition-transform group-hover:scale-[1.01]"
                  style={{
                    background: `linear-gradient(135deg, ${prod.colorHex}15 0%, #FAF6EF 100%)`,
                  }}
                >
                  <div className="flex items-center gap-1.5 absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-mono text-[#1C1A17] border border-[#E3DACB]">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: prod.colorHex }}
                    />
                    <span>{prod.colorName}</span>
                  </div>

                  <Link
                    href={`/verify/${prod.activeBatchId}`}
                    className="absolute top-3 right-3 bg-[#FAF0E6] text-[#8A4B12] hover:underline px-2 py-0.5 rounded text-[10px] font-mono font-bold border border-[#F0D5C0]"
                    title="Inspect live batch passport"
                  >
                    Batch #{prod.activeBatchId}
                  </Link>

                  {/* Stylized Jar Silhouette */}
                  <div className="text-center space-y-1 my-auto">
                    <div
                      className="w-20 h-28 rounded-xl mx-auto border border-black/10 shadow-sm flex flex-col justify-between p-2"
                      style={{
                        background: `linear-gradient(to top, ${prod.colorHex}, #FAF6EF)`,
                      }}
                    >
                      <div className="w-12 h-2 bg-[#FAF6EF] rounded-t mx-auto border border-[#E3DACB]" />
                      <div className="bg-white/90 rounded p-1 text-[7px] font-mono text-center">
                        {prod.shortTag}
                      </div>
                      <div className="text-[6px] font-mono text-black/60">RAW HONEY</div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <span className="text-[10px] font-mono text-[#3F4A3A] uppercase tracking-wider block">
                    {prod.botanicalOrigin}
                  </span>
                  <Link href={`/shop/${prod.slug}`}>
                    <h2 className="font-serif text-xl font-bold text-[#1C1A17] group-hover:text-[#8A4B12] transition-colors mt-0.5">
                      {prod.name}
                    </h2>
                  </Link>
                  <span className="text-xs font-mono text-[#665E55] block mt-0.5">
                    {prod.region}
                  </span>
                </div>

                <p className="text-xs text-[#665E55] leading-relaxed line-clamp-2">
                  {prod.description}
                </p>

                {/* Terroir Profile Dots */}
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#E3DACB]">
                  <span className="text-[#786E64]">Taste Profile:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <span
                        key={level}
                        className={`w-2 h-2 rounded-full ${
                          level <= prod.tasteIntensity
                            ? "bg-[#8A4B12]"
                            : "bg-[#E3DACB]"
                        }`}
                      />
                    ))}
                    <span className="text-[11px] text-[#665E55] ml-1">
                      {prod.tasteIntensity <= 2 ? "Mild" : prod.tasteIntensity >= 4 ? "Bold" : "Medium"}
                    </span>
                  </div>
                </div>

                {/* Tasting notes pills */}
                <div className="flex flex-wrap gap-1.5">
                  {prod.tasteNotes.map((note) => (
                    <span
                      key={note}
                      className="text-[10px] font-mono text-[#1C1A17] bg-[#FAF6EF] border border-[#E3DACB] px-2 py-0.5 rounded"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Actions */}
              <div className="pt-5 border-t border-[#E3DACB] flex items-center justify-between mt-4">
                <div>
                  <span className="text-[11px] font-mono text-[#665E55] block">
                    {prod.sizes[0].size}
                  </span>
                  <span className="font-mono text-lg font-bold text-[#1C1A17]">
                    ₹{prod.sizes[0].price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/shop/${prod.slug}`}
                    className="px-3 py-2 text-xs font-mono text-[#665E55] hover:text-[#1C1A17] border border-[#E3DACB] hover:border-[#8A4B12] rounded-lg transition-colors"
                  >
                    Details
                  </Link>

                  <button
                    onClick={() => handleQuickAdd(prod)}
                    className="px-3.5 py-2 bg-[#8A4B12] hover:bg-[#703C0D] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    {addedSlug === prod.slug ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Unblended Origin Matters Notice */}
        <div className="bg-[#FAF6EF] border border-[#E3DACB] rounded-xl p-6 sm:p-8 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
            The Terroir Difference
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A17]">
            Why we never blend honeys across seasons or regions
          </h3>
          <p className="text-xs sm:text-sm text-[#665E55] leading-relaxed max-w-3xl">
            Commercial honey brands pool millions of kilograms of unverified honey into industrial heating tanks to achieve a uniform color and high sweetness. Madhuvan honeys are single-origin: each jar represents one apiary yard, one floral nectar flow, and one harvest window, verified by continuous weight telemetry and laboratory NMR spectrometry.
          </p>
        </div>
      </main>

      <StorefrontFooter />
    </div>
  );
}
