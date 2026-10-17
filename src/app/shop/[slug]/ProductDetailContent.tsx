"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/data/types";
import { getBatchById } from "@/data/batches";
import { PRODUCTS } from "@/data/storefront";
import { useCart } from "@/context/CartContext";
import { StorefrontHeader } from "@/components/storefront/Header";
import { StorefrontFooter } from "@/components/storefront/Footer";
import {
  Check,
  Plus,
  Minus,
  ArrowRight,
  Gift,
} from "lucide-react";

interface Props {
  product: Product;
}

export function ProductDetailContent({ product }: Props) {
  const { addItem } = useCart();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isGift, setIsGift] = useState(false);

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const batch = getBatchById(product.activeBatchId);

  // "Taste Next" recommendations (other honeys)
  const tasteNextProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 2);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      origin: product.region,
      size: selectedSize.size,
      price: selectedSize.price,
      quantity,
      batchId: product.activeBatchId,
      colorSwatch: product.colorHex,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#1C1A17]">
      <StorefrontHeader />

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#665E55]">
          <Link href="/" className="hover:text-[#1C1A17]">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#1C1A17]">
            Shop
          </Link>
          <span>/</span>
          <span className="text-[#1C1A17] font-semibold truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Big Jar Display */}
          <div className="lg:col-span-6 space-y-4">
            <div
              className="w-full aspect-[4/5] rounded-2xl border border-[#E3DACB] flex flex-col items-center justify-between p-8 relative overflow-hidden shadow-xs"
              style={{
                background: `linear-gradient(145deg, ${product.colorHex}25 0%, #FAF6EF 70%, #EFE8DA 100%)`,
              }}
            >
              {/* Top tags */}
              <div className="w-full flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3 py-1 rounded border border-[#E3DACB]">
                  <span
                    className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: product.colorHex }}
                  />
                  <span className="font-semibold text-[#1C1A17]">{product.colorName}</span>
                </div>

                <Link
                  href={`/verify/${product.activeBatchId}`}
                  className="bg-[#FAF0E6] text-[#8A4B12] hover:underline px-2.5 py-1 rounded text-xs font-bold border border-[#F0D5C0]"
                >
                  Batch #{product.activeBatchId}
                </Link>
              </div>

              {/* Large Backlit Jar Element */}
              <div className="my-auto text-center space-y-3">
                <div
                  className="w-44 h-60 rounded-2xl mx-auto shadow-md border border-black/15 flex flex-col justify-between p-4 relative"
                  style={{
                    background: `linear-gradient(to top, ${product.colorHex}, #FAF6EF)`,
                  }}
                >
                  {/* Jar Lid with QR seal cue */}
                  <div className="w-28 h-5 bg-[#FAF7F0] rounded-t mx-auto border border-[#CFC3AE] flex items-center justify-center">
                    <span className="text-[8px] font-mono text-[#786E64] uppercase tracking-widest font-bold">
                      QR SEALED
                    </span>
                  </div>

                  {/* Minimalist label */}
                  <div className="bg-[#FAF7F0] border border-[#E3DACB] rounded-lg p-2.5 text-center shadow-xs">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#786E64] block">
                      MADHUVAN
                    </span>
                    <span className="font-serif text-sm font-bold text-[#1C1A17] block leading-tight">
                      {product.name.replace(" Raw Honey", "")}
                    </span>
                    <span className="text-[9px] font-mono text-[#8A4B12] block mt-1 font-semibold">
                      {selectedSize.size} · 100% RAW
                    </span>
                  </div>

                  <div className="text-[9px] font-mono text-black/60 font-semibold tracking-wider">
                    {product.botanicalOrigin}
                  </div>
                </div>
              </div>

              {/* Jar Footer Caption */}
              <div className="text-center text-xs font-mono text-[#665E55]">
                <span>Natural nectar crystallization is guaranteed · Unpasteurized</span>
              </div>
            </div>
          </div>

          {/* Right Column: Spec, Size Picker & Batch Panel */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono text-[#3F4A3A] uppercase tracking-wider block font-semibold">
                {product.botanicalOrigin}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1A17] tracking-tight mt-1">
                {product.name}
              </h1>
              <p className="text-xs font-mono text-[#665E55] mt-1.5 flex items-center gap-2">
                <span>Origin: <strong className="text-[#1C1A17]">{product.region}</strong></span>
              </p>
            </div>

            <p className="text-sm text-[#665E55] leading-relaxed">
              {product.description}
            </p>

            {/* Taste Intensity & Flavor Bar */}
            <div className="p-4 rounded-lg bg-[#FAF6EF] border border-[#E3DACB] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#786E64]">Taste Profile:</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[#786E64]">Mild</span>
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <span
                      key={lvl}
                      className={`w-2.5 h-2.5 rounded-full ${
                        lvl <= product.tasteIntensity ? "bg-[#8A4B12]" : "bg-[#E3DACB]"
                      }`}
                    />
                  ))}
                  <span className="text-[11px] text-[#786E64]">Bold</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-[#786E64] block mb-1.5">Tasting Notes:</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.tasteNotes.map((note) => (
                    <span
                      key={note}
                      className="text-xs font-mono text-[#1C1A17] bg-white border border-[#E3DACB] px-2.5 py-1 rounded"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#E3DACB] text-xs text-[#665E55]">
                <strong className="text-[#1C1A17] font-mono">Pairings:</strong>{" "}
                {product.pairings.join(" · ")}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#786E64] font-semibold">
                Select Jar Size
              </label>
              <div className="grid grid-cols-2 gap-3">
                {product.sizes.map((s, idx) => {
                  const isSelected = selectedSizeIndex === idx;
                  return (
                    <button
                      key={s.size}
                      type="button"
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#8A4B12] bg-white ring-1 ring-[#8A4B12]"
                          : "border-[#E3DACB] bg-[#FAF6EF] hover:bg-white"
                      }`}
                    >
                      <span className="text-xs font-mono font-bold text-[#1C1A17] block">
                        {s.size}
                      </span>
                      <span className="font-mono text-base font-bold text-[#8A4B12] block mt-0.5">
                        ₹{s.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity stepper */}
                <div className="flex items-center border border-[#E3DACB] rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-[#665E55] hover:text-[#1C1A17] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono text-sm font-bold text-[#1C1A17]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 text-[#665E55] hover:text-[#1C1A17] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-[#8A4B12] hover:bg-[#703C0D] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added {quantity} to Cart</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart · ₹{selectedSize.price * quantity}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Gift option */}
              <label className="flex items-center gap-2 text-xs font-mono text-[#665E55] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                  className="accent-[#8A4B12] rounded"
                />
                <Gift className="w-3.5 h-3.5 text-[#8A4B12]" />
                <span>Pack in an untreated kraft gift sleeve with sealed lid passport</span>
              </label>
            </div>

            {/* BATCH PANEL (Monospace, mandated in Section 6) */}
            {batch && (
              <div className="bg-white border-2 border-[#E3DACB] rounded-xl p-5 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#E3DACB]">
                  <span className="text-[#8A4B12] font-bold uppercase tracking-wider text-[11px]">
                    Current Batch Passport
                  </span>
                  <span className="text-[#2F6B3A] font-bold bg-[#EBF2EB] px-2 py-0.5 rounded border border-[#CDE0CD] text-[10px]">
                    NMR TESTED · SEPOLIA CONFIRMED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#665E55]">
                  <div>
                    <span className="text-[#786E64] block">Batch Code:</span>
                    <strong className="text-[#1C1A17] font-semibold">{batch.id}</strong>
                  </div>
                  <div>
                    <span className="text-[#786E64] block">Harvest Date:</span>
                    <strong className="text-[#1C1A17]">{batch.harvestDate}</strong>
                  </div>
                  <div>
                    <span className="text-[#786E64] block">Smart Hive:</span>
                    <strong className="text-[#1C1A17]">{batch.hiveId} ({batch.district})</strong>
                  </div>
                  <div>
                    <span className="text-[#786E64] block">Master Beekeeper:</span>
                    <strong className="text-[#1C1A17]">{batch.beekeeper.name}</strong>
                  </div>
                  <div>
                    <span className="text-[#786E64] block">Lab NMR Status:</span>
                    <strong className="text-[#2F6B3A]">Passed ({batch.labReport.status})</strong>
                  </div>
                  <div>
                    <span className="text-[#786E64] block">Sepolia Block:</span>
                    <strong className="text-[#1C1A17]">#{batch.blockchain.blockNumber}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E3DACB] flex items-center justify-between">
                  <span className="text-[10px] text-[#786E64]">
                    Live telemetry curve available
                  </span>
                  <Link
                    href={`/verify/${batch.id}`}
                    className="text-[#8A4B12] hover:underline font-bold flex items-center gap-1 text-[11px]"
                  >
                    <span>View full batch record</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}

            {/* Crystallization & Storage Note */}
            <div className="bg-[#FAF6EF] p-4 rounded-lg border border-[#E3DACB] space-y-1.5 text-xs">
              <span className="font-serif font-bold text-[#1C1A17] block">
                Crystallisation & Ingredients
              </span>
              <p className="text-[#665E55] leading-relaxed">
                <strong className="text-[#1C1A17]">Ingredients:</strong> 100% Raw Unpasteurized Honey. {product.crystallisationNote}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: TASTE NEXT (Recommendations) */}
        <section className="pt-8 border-t border-[#E3DACB] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
                Compare Regional Terroirs
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1C1A17]">
                Taste Next
              </h3>
            </div>
            <Link href="/shop" className="text-xs font-mono text-[#8A4B12] hover:underline">
              View all harvests →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasteNextProducts.map((nextProd) => (
              <Link
                key={nextProd.id}
                href={`/shop/${nextProd.slug}`}
                className="bg-white border border-[#E3DACB] rounded-xl p-5 flex items-center justify-between gap-4 hover:border-[#8A4B12] transition-colors group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: nextProd.colorHex }}
                    />
                    <span className="text-xs font-mono text-[#665E55]">
                      {nextProd.colorName} · {nextProd.region}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1C1A17] group-hover:text-[#8A4B12] transition-colors">
                    {nextProd.name}
                  </h4>
                  <p className="text-xs text-[#665E55]">
                    {nextProd.tasteNotes.join(" · ")}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-base font-bold text-[#1C1A17] block">
                    ₹{nextProd.sizes[0].price}
                  </span>
                  <span className="text-xs font-mono text-[#8A4B12] group-hover:underline flex items-center gap-1 justify-end mt-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <StorefrontFooter />
    </div>
  );
}
