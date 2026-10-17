"use client";

import React, { useState } from "react";
import { PRODUCTS } from "@/data/storefront";
import { useCart } from "@/context/CartContext";
import { ProductImage } from "./ProductImage";
import { ShoppingBag, Check, ShieldCheck } from "lucide-react";

export function StarterKitModule() {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const trio = PRODUCTS.find((p) => p.isTastingBox) || PRODUCTS[3];

  const handleAddToCart = (e?: React.MouseEvent<HTMLButtonElement>) => {
    const size = trio.sizes[0];
    addItem(
      {
        productId: trio.id,
        slug: trio.slug,
        name: trio.name,
        origin: trio.region,
        size: size.size,
        price: size.price,
        quantity: 1,
        batchId: trio.activeBatchId,
        colorSwatch: trio.colorHex,
      },
      e
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const includedItems = [
    "Muzaffarpur Litchi Blossom (150g glass jar)",
    "Kashmir White Acacia (150g glass jar)",
    "Sundarbans Wild Mangrove (150g glass jar)",
    "3 batch verification codes linked to distinct IoT hive records",
    "Untreated kraft protective sleeve with zero plastic bubble wrap",
  ];

  return (
    <section className="py-16 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6">
      <div className="rounded-3xl sm:rounded-[36px] bg-[var(--sand)] border border-[var(--line)] p-8 sm:p-12 lg:p-16 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Tasting Trio Image */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg">
              <ProductImage
                src="/images/honey-trio.jpg"
                alt="BEE safe Terroir Tasting Trio Starter Kit"
                colorHex="var(--honey)"
                productName="Terroir Tasting Trio"
                aspectRatio="aspect-[4/3]"
                className="rounded-3xl shadow-md"
              />
            </div>
          </div>

          {/* Right Column: In the Box Details & Honest Price */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-[var(--forest)] bg-[var(--tag-bg)] border border-[var(--tag-border)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--verified)]" />
              <span>Complete Terroir Starter Set</span>
            </div>

            <h2 className="headline-display text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)]">
              The Terroir Tasting Trio
            </h2>

            <p className="text-base text-[var(--muted-ink)] leading-relaxed">
              Experience the full diversity of Indian apiculture in one curated box. Compare the light floral notes of Muzaffarpur litchi against high-altitude white acacia and the bold coastal minerals of the Sundarbans.
            </p>

            {/* In the box list */}
            <div className="space-y-2.5 pt-2 border-t border-[var(--line)]">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--ink)] font-semibold block">
                In the box:
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-[var(--ink)]/80">
                {includedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--signature)] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Honest Price & Full-Width Pill CTA */}
            <div className="pt-4 border-t border-[var(--line)] space-y-4">
              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-3xl font-bold text-[var(--ink)]">
                  ₹{trio.sizes[0].price}
                </span>
                <span className="text-xs text-[var(--muted-ink)]">
                  Honest pricing · No fake discounts
                </span>
              </div>

              <button
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
                    <span>Add to cart — ₹{trio.sizes[0].price}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
