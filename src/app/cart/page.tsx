"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { StorefrontHeader } from "@/components/storefront/Header";
import { StorefrontFooter } from "@/components/storefront/Footer";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  ArrowLeft,
} from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalCount, isHydrated } = useCart();

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#1C1A17]">
        <StorefrontHeader />
        <main className="flex-1 max-w-[1000px] w-full mx-auto px-4 py-16 text-center font-mono text-xs text-[#665E55]">
          Loading cart items...
        </main>
        <StorefrontFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#1C1A17]">
      <StorefrontHeader />

      <main className="flex-1 max-w-[1100px] w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
            Your Selection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1A17] mt-0.5">
            Shopping Cart ({totalCount} {totalCount === 1 ? "Jar" : "Jars"})
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white border border-[#E3DACB] rounded-xl p-10 sm:p-14 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#FAF6EF] border border-[#E3DACB] flex items-center justify-center text-[#8A4B12] mx-auto">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1C1A17]">
              Your cart is empty
            </h2>
            <p className="text-sm text-[#665E55] max-w-md mx-auto">
              You haven&apos;t added any raw honey to your cart yet. Explore our single-origin harvests from Bihar, Kashmir, and the Sundarbans.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#8A4B12] hover:bg-[#703C0D] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
              >
                <span>Browse Single-Origin Honeys</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border border-[#E3DACB] rounded-xl p-5 sm:p-6 shadow-xs divide-y divide-[#E3DACB]">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    {/* Item info */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: item.colorSwatch }}
                        />
                        <Link
                          href={`/shop/${item.slug}`}
                          className="font-serif text-base sm:text-lg font-bold text-[#1C1A17] hover:text-[#8A4B12] transition-colors"
                        >
                          {item.name}
                        </Link>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#665E55]">
                        <span>Size: <strong className="text-[#1C1A17]">{item.size}</strong></span>
                        <span>•</span>
                        <span>Unit: ₹{item.price}</span>
                        <span>•</span>
                        <span>{item.origin}</span>
                      </div>

                      {/* Batch Provenance Link */}
                      <div className="pt-1">
                        <Link
                          href="/beekeeper"
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#2F6B3A] hover:underline bg-[#EBF2EB] border border-[#CDE0CD] px-2 py-0.5 rounded"
                          title="Inspect hive telemetry on Beekeepers Dashboard"
                        >
                          <ShieldCheck className="w-3 h-3" />
                          <span>Batch #{item.batchId} · Beekeepers Dashboard →</span>
                        </Link>
                      </div>
                    </div>

                    {/* Quantity & Price Controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E3DACB]">
                      <div className="flex items-center border border-[#E3DACB] rounded-lg bg-[#FAF6EF]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 text-[#665E55] hover:text-[#1C1A17] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-mono text-xs font-bold text-[#1C1A17]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 text-[#665E55] hover:text-[#1C1A17] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-base font-bold text-[#1C1A17] min-w-[70px] text-right">
                        ₹{item.price * item.quantity}
                      </span>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-[#8C8276] hover:text-[#DC2626] transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Back to shopping link */}
              <div className="flex items-center justify-between text-xs font-mono">
                <Link
                  href="/shop"
                  className="text-[#8A4B12] hover:underline flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue shopping</span>
                </Link>
                <span className="text-[#786E64]">
                  Every jar includes its cryptographic QR seal
                </span>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-[#E3DACB] rounded-xl p-6 space-y-4 shadow-xs">
                <h3 className="font-serif text-lg font-bold text-[#1C1A17] pb-3 border-b border-[#E3DACB]">
                  Order Summary
                </h3>

                <div className="space-y-2.5 text-xs font-mono text-[#665E55]">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalCount} items)</span>
                    <span className="text-[#1C1A17] font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temperature-Safe Insured Delivery</span>
                    <span className="text-[#2F6B3A] font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cryptographic Batch Serialization</span>
                    <span className="text-[#2F6B3A] font-bold">INCLUDED</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E3DACB] flex justify-between items-baseline font-mono">
                  <span className="text-sm font-semibold text-[#1C1A17]">Estimated Total</span>
                  <span className="text-2xl font-bold text-[#8A4B12]">₹{subtotal}</span>
                </div>

                <div className="pt-2">
                  <Link
                    href="/checkout"
                    className="w-full py-3.5 px-4 bg-[#8A4B12] hover:bg-[#703C0D] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>Proceed to Mock Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="p-3 rounded bg-[#FAF6EF] border border-[#E3DACB] space-y-1 text-[11px] text-[#665E55]">
                  <div className="flex items-center gap-1.5 text-[#2F6B3A] font-mono font-semibold">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Free Shipping Across India</span>
                  </div>
                  <p className="leading-tight">
                    Packed in shock-absorbing kraft pulp cartons to protect raw honey from heat and sunlight.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <StorefrontFooter />
    </div>
  );
}
