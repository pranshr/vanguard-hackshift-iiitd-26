"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { StorefrontHeader } from "@/components/storefront/Header";
import { StorefrontFooter } from "@/components/storefront/Footer";
import {
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Lock,
  Check,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, totalCount, clearCart, isHydrated } = useCart();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim() || !city.trim() || !pinCode.trim()) {
      setErrorMsg("Please fill in all required shipping fields.");
      return;
    }

    if (phone.trim().replace(/\D/g, "").length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    const orderId = `ORD-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderData = {
      orderId,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      timestamp: new Date().toISOString(),
      customer: {
        name: fullName,
        email,
        phone,
        address,
        city,
        state: stateName || "India",
        pinCode,
      },
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        size: i.size,
        price: i.price,
        quantity: i.quantity,
        batchId: i.batchId,
        colorSwatch: i.colorSwatch,
      })),
      total: subtotal,
      paymentMethod: "Direct Dispatch (Prepaid)",
    };

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));
        localStorage.setItem("honeychain_last_order", JSON.stringify(orderData));
      }
    } catch (err) {
      console.warn("Failed to persist order to storage:", err);
    }

    // Clear cart and redirect
    clearCart();
    setTimeout(() => {
      router.push(`/order/${orderId}`);
    }, 400);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#1C1A17]">
        <StorefrontHeader />
        <main className="flex-1 max-w-[800px] w-full mx-auto px-4 py-16 text-center font-mono text-xs text-[#665E55]">
          Preparing checkout...
        </main>
        <StorefrontFooter />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#1C1A17]">
        <StorefrontHeader />
        <main className="flex-1 max-w-[600px] w-full mx-auto px-4 py-16 text-center space-y-4">
          <div className="bg-white border border-[#E3DACB] rounded-xl p-8 shadow-xs space-y-3">
            <h1 className="font-serif text-2xl font-bold text-[#1C1A17]">No Items in Cart</h1>
            <p className="text-sm text-[#665E55]">
              Your cart is currently empty. Please add raw honey from our catalog to proceed to checkout.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8A4B12] text-white text-xs font-semibold rounded-lg"
              >
                <span>Browse Single-Origin Honeys</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </main>
        <StorefrontFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#1C1A17]">
      <StorefrontHeader />

      <main className="flex-1 max-w-[1100px] w-full mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-8">
        {/* Order Verification Notice Banner */}
        <div className="bg-[#FAF0E6] border-2 border-[#8A4B12]/30 rounded-xl p-4 sm:p-5 text-xs text-[#8A4B12] font-mono space-y-1">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm">
            <ShieldCheck className="w-4 h-4 text-[#2F6B3A]" />
            <span>Cryptographic Order Protection</span>
          </div>
          <p className="text-[#665E55] leading-relaxed">
            Placing this order creates an immutable batch record on the HoneyChain ledger, linking every jar in your carton directly to its origin smart hive telemetry passport.
          </p>
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1A17]">
            Shipping & Dispatch Details
          </h1>
          <p className="text-xs font-mono text-[#665E55] mt-1">
            Complete your mock delivery order to view the batch traceability confirmation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSubmit} className="bg-white border border-[#E3DACB] rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
              {/* Contact Information */}
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
                  1. Contact Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-[#786E64] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Priyanshu Sharma"
                      className="w-full px-3 py-2.5 bg-[#FAF6EF] border border-[#E3DACB] rounded-lg text-sm text-[#1C1A17] focus:outline-none focus:border-[#8A4B12] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#786E64] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aarav.sharma@example.com"
                      className="w-full px-3 py-2.5 bg-[#FAF6EF] border border-[#E3DACB] rounded-lg text-sm text-[#1C1A17] focus:outline-none focus:border-[#8A4B12] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#786E64] mb-1">
                      Phone Number (for SMS Tracking) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2.5 bg-[#FAF6EF] border border-[#E3DACB] rounded-lg text-sm text-[#1C1A17] focus:outline-none focus:border-[#8A4B12] focus:bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4 pt-4 border-t border-[#E3DACB]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
                  2. Delivery Address
                </span>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[#786E64] mb-1">
                      Street Address & Premise *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 42 Bloom Orchard Lane"
                      className="w-full px-3 py-2.5 bg-[#FAF6EF] border border-[#E3DACB] rounded-lg text-sm text-[#1C1A17] focus:outline-none focus:border-[#8A4B12] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-[#786E64] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="New Delhi"
                        className="w-full px-3 py-2.5 bg-[#FAF6EF] border border-[#E3DACB] rounded-lg text-sm text-[#1C1A17] focus:outline-none focus:border-[#8A4B12] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#786E64] mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        placeholder="Delhi"
                        className="w-full px-3 py-2.5 bg-[#FAF6EF] border border-[#E3DACB] rounded-lg text-sm text-[#1C1A17] focus:outline-none focus:border-[#8A4B12] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#786E64] mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        placeholder="110020"
                        className="w-full px-3 py-2.5 bg-[#FAF6EF] border border-[#E3DACB] rounded-lg text-sm text-[#1C1A17] focus:outline-none focus:border-[#8A4B12] focus:bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment simulation */}
              <div className="space-y-3 pt-4 border-t border-[#E3DACB]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
                  3. Payment Method
                </span>

                <div className="p-3.5 rounded-lg border-2 border-[#8A4B12] bg-[#FAF6EF] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#8A4B12] flex items-center justify-center text-white">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                    <strong className="text-[#1C1A17]">Verified Direct Dispatch</strong>
                  </div>
                  <span className="text-[#2F6B3A] font-bold">Complimentary / Instant</span>
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs font-mono text-[#DC2626] flex items-center gap-1.5 p-2.5 bg-[#FAF0F0] rounded border border-[#F5D5D5]">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </p>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#8A4B12] hover:bg-[#703C0D] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? "Generating Batch Traceability Receipt..."
                      : `Confirm Order · ₹${subtotal}`}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-[#E3DACB] rounded-xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E3DACB]">
                <h3 className="font-serif text-lg font-bold text-[#1C1A17]">
                  Order Items ({totalCount})
                </h3>
                <Link href="/cart" className="text-xs font-mono text-[#8A4B12] hover:underline">
                  Edit Cart
                </Link>
              </div>

              <div className="space-y-3 divide-y divide-[#E3DACB]/60 text-xs">
                {items.map((it) => (
                  <div key={it.id} className="pt-3 first:pt-0 flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="font-serif font-bold text-[#1C1A17] block">
                        {it.name}
                      </span>
                      <span className="font-mono text-[#665E55] text-[11px] block">
                        {it.size} × {it.quantity}
                      </span>
                      <span className="text-[10px] font-mono text-[#2F6B3A] bg-[#EBF2EB] px-1.5 py-0.2 rounded inline-block mt-0.5">
                        Batch #{it.batchId}
                      </span>
                    </div>

                    <span className="font-mono font-bold text-[#1C1A17] shrink-0">
                      ₹{it.price * it.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E3DACB] space-y-2 text-xs font-mono text-[#665E55]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1C1A17]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Temperature Insured Shipping</span>
                  <span className="text-[#2F6B3A] font-bold">FREE</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E3DACB] text-base font-bold text-[#1C1A17]">
                  <span>Total Due</span>
                  <span className="text-[#8A4B12]">₹{subtotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <StorefrontFooter />
    </div>
  );
}
