"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import {
  ARTISANAL_ACCESSORIES,
  getRecommendedAdditions,
  LastMinuteRecommendation,
} from "@/data/recommendations";
import { Sparkles, Plus, Check } from "lucide-react";

interface CartRecommendationsProps {
  variant?: "inline" | "compact";
  compact?: boolean;
  title?: string;
  className?: string;
  limit?: number;
}

export function CartRecommendations({
  variant,
  compact = false,
  title,
  className = "",
  limit = 3,
}: CartRecommendationsProps) {
  const effectiveVariant = variant || (compact ? "compact" : "inline");
  const { items, addItem, updateQuantity } = useCart();
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Extract current product IDs in cart
  const cartProductIds = items.map((i) => i.productId);
  const allRecs = getRecommendedAdditions(cartProductIds);

  // Filter recommendations to prioritize items NOT yet in the cart
  const notInCartRecs = allRecs.filter(
    (rec) => !items.some((it) => it.productId === rec.productId && it.size === rec.size)
  );
  const inCartRecs = allRecs.filter((rec) =>
    items.some((it) => it.productId === rec.productId && it.size === rec.size)
  );

  // Pool: prioritize not-yet-added items, then already-added items if needed
  const candidateRecs = [...notInCartRecs, ...inCartRecs];
  const displayedRecs = candidateRecs.slice(0, limit);

  const handleQuickAdd = (
    rec: LastMinuteRecommendation,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    addItem(
      {
        productId: rec.productId,
        slug: rec.slug,
        name: rec.name,
        origin: rec.origin,
        size: rec.size,
        price: rec.price,
        quantity: 1,
        batchId: rec.batchId,
        colorSwatch: rec.colorSwatch,
      },
      e
    );

    setJustAddedId(rec.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === rec.id ? null : curr));
    }, 1800);
  };

  const getExistingCartItem = (rec: LastMinuteRecommendation) => {
    return items.find((i) => i.productId === rec.productId && i.size === rec.size);
  };

  // COMPACT PRESENTATION (for Checkout right column sidebar)
  if (effectiveVariant === "compact") {
    const compactItems = candidateRecs.slice(0, limit || 2);
    return (
      <div
        className={`bg-[#FAF6EF] border border-[#E3DACB] rounded-xl p-4 space-y-3 ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#8A4B12]">
            <Sparkles className="w-3.5 h-3.5 text-[#F2A007]" />
            <span>{title || "Add to Carton Before Dispatch"}</span>
          </div>
          <span className="text-[10px] font-mono text-[#2F6B3A] bg-[#EBF2EB] px-1.5 py-0.5 rounded">
            Free shipping
          </span>
        </div>

        <p className="text-[11px] text-[#665E55] leading-snug">
          Slip a handcrafted tasting accessory into your package before dispatch.
        </p>

        <div className="space-y-2.5 pt-1">
          {compactItems.map((rec) => {
            const inCartItem = getExistingCartItem(rec);
            const isJustAdded = justAddedId === rec.id;

            return (
              <div
                key={rec.id}
                className="bg-white border border-[#E3DACB] rounded-lg p-2.5 flex items-center justify-between gap-3 shadow-2xs hover:border-[#8A4B12]/40 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-11 h-11 rounded-md overflow-hidden bg-[#F6F1E7] shrink-0 border border-[#E3DACB]">
                    <Image
                      src={rec.image}
                      alt={rec.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="font-serif text-xs font-bold text-[#1C1A17] block truncate">
                      {rec.name}
                    </span>
                    <span className="font-mono text-[11px] text-[#8A4B12] font-semibold block">
                      +₹{rec.price}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  {inCartItem ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold text-[#2F6B3A] bg-[#EBF2EB] border border-[#CDE0CD] px-2 py-1 rounded">
                        ✓ Added ({inCartItem.quantity})
                      </span>
                      <button
                        onClick={(e) => handleQuickAdd(rec, e)}
                        className="w-6 h-6 rounded bg-[#FAF6EF] border border-[#E3DACB] hover:bg-[#8A4B12] hover:text-white text-[#1C1A17] flex items-center justify-center text-xs font-mono font-bold cursor-pointer transition-colors"
                        title="Add one more"
                        aria-label="Add one more"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => handleQuickAdd(rec, e)}
                      disabled={isJustAdded}
                      className="px-3 py-1.5 bg-[#8A4B12] hover:bg-[#703C0D] active:scale-95 text-white text-[11px] font-mono font-semibold rounded-md flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3 h-3 text-[#EBF2EB]" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>+ Add</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // INLINE PRESENTATION (specifically fills the empty space below or between cart items)
  return (
    <div
      className={`bg-white border border-[#E3DACB] rounded-xl p-4 sm:p-5 shadow-xs space-y-4 ${className}`}
    >
      {/* Subtle inline header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E3DACB]/80">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#F2A007]" />
          <h3 className="font-serif text-sm sm:text-base font-bold text-[#1C1A17]">
            {title || "Last-Minute Additions"}
          </h3>
          <span className="text-[11px] font-mono text-[#665E55] hidden sm:inline">
            · Ships in your carton with zero extra freight
          </span>
        </div>
        <span className="text-[10px] font-mono font-semibold text-[#2F6B3A] bg-[#EBF2EB] border border-[#CDE0CD] px-2 py-0.5 rounded">
          No Extra Shipping
        </span>
      </div>

      {/* Compact 3-card inline grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {displayedRecs.map((rec) => {
          const inCartItem = getExistingCartItem(rec);
          const isJustAdded = justAddedId === rec.id;

          return (
            <div
              key={rec.id}
              className="bg-[#FAF6EF]/70 hover:bg-[#FAF6EF] border border-[#E3DACB] rounded-xl p-3 flex flex-col justify-between transition-all duration-200 hover:border-[#8A4B12]/40 group"
            >
              <div className="space-y-2">
                {/* Thumbnail image with subtle tag */}
                <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-white border border-[#E3DACB]/60">
                  <Image
                    src={rec.image}
                    alt={rec.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  {rec.badge && (
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-[#1C1A17]/80 text-white backdrop-blur-xs">
                      {rec.badge}
                    </span>
                  )}
                </div>

                {/* Title & Short Benefit */}
                <div className="space-y-0.5">
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-[#1C1A17] line-clamp-1 group-hover:text-[#8A4B12] transition-colors">
                    {rec.name}
                  </h4>
                  <p className="text-[11px] text-[#665E55] line-clamp-1 font-mono">
                    {rec.whyPair}
                  </p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-2.5 mt-2 border-t border-[#E3DACB]/60 flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-[#1C1A17]">
                  ₹{rec.price}
                </span>

                {inCartItem ? (
                  <div className="flex items-center border border-[#2F6B3A] rounded-md bg-[#EBF2EB] overflow-hidden">
                    <button
                      onClick={(e) => updateQuantity(inCartItem.id, -1, e)}
                      className="px-1.5 py-0.5 text-[11px] font-mono font-bold text-[#2F6B3A] hover:bg-[#D7E8D7] cursor-pointer"
                      title="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#2F6B3A]">
                      {inCartItem.quantity} in cart
                    </span>
                    <button
                      onClick={(e) => handleQuickAdd(rec, e)}
                      className="px-1.5 py-0.5 text-[11px] font-mono font-bold text-[#2F6B3A] hover:bg-[#D7E8D7] cursor-pointer"
                      title="Add one more"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => handleQuickAdd(rec, e)}
                    disabled={isJustAdded}
                    className="py-1 px-2.5 bg-[#8A4B12] hover:bg-[#703C0D] active:scale-95 text-white text-[11px] font-mono font-semibold rounded-md flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3 h-3 text-[#EBF2EB]" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>+ Add</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
