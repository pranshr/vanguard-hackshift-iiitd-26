"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront/Header";
import { StorefrontFooter } from "@/components/storefront/Footer";
import {
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface OrderData {
  orderId: string;
  date: string;
  timestamp: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
  };
  items: Array<{
    id: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
    batchId: string;
    colorSwatch: string;
  }>;
  total: number;
  paymentMethod: string;
}

export function OrderConfirmationContent({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    let active = true;
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(`order_${orderId}`) || localStorage.getItem("honeychain_last_order");
        if (stored && active) {
          const parsed = JSON.parse(stored);
          queueMicrotask(() => {
            if (active) setOrder(parsed);
          });
        }
      }
    } catch (err) {
      console.warn("Failed to load order from localStorage:", err);
    }
    return () => {
      active = false;
    };
  }, [orderId]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#1C1A17]">
      <StorefrontHeader />

      <main className="flex-1 max-w-[900px] w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
        {/* Success Header Card */}
        <div className="bg-white border border-[#E3DACB] rounded-xl p-8 sm:p-10 shadow-xs text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#DFEBDC] border border-[#C5DBC0] flex items-center justify-center text-[#2F6B3A] mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#2F6B3A] font-bold">
              Order Confirmed · Batch Passport Linked
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1A17]">
              Thank You for Your Order
            </h1>
            <p className="text-sm text-[#665E55] max-w-lg mx-auto">
              Your order has been recorded. Each jar is assigned its verified batch passport linking directly to its smart hive telemetry record.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-3 text-xs font-mono text-[#665E55]">
            <span className="bg-[#FAF6EF] border border-[#E3DACB] px-3 py-1.5 rounded">
              Order ID: <strong className="text-[#8A4B12]">{order?.orderId || orderId}</strong>
            </span>
            <span className="bg-[#FAF6EF] border border-[#E3DACB] px-3 py-1.5 rounded">
              Status: <strong className="text-[#2F6B3A]">Ready for Packing</strong>
            </span>
          </div>
        </div>

        {/* PRIMARY CONVERSION HOOK: "See Your Jar's Journey" */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
              Immediate Verification
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17]">
              See Your Jar&apos;s Journey Right Now
            </h2>
            <p className="text-xs sm:text-sm text-[#665E55] mt-0.5">
              While your jar is prepared for dispatch, you can inspect the exact hive telemetry and laboratory report of the batch that filled it.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {order && order.items.length > 0 ? (
              order.items.map((it) => (
                <div
                  key={it.id}
                  className="bg-white border-2 border-[#8A4B12]/30 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: it.colorSwatch }}
                      />
                      <h3 className="font-serif text-lg font-bold text-[#1C1A17]">
                        {it.name}
                      </h3>
                      <span className="text-xs font-mono text-[#665E55]">
                        ({it.size} × {it.quantity})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#665E55]">
                      <span>Cryptographic Batch:</span>
                      <strong className="text-[#8A4B12] bg-[#FAF0E6] px-1.5 py-0.5 rounded">
                        #{it.batchId}
                      </strong>
                    </div>

                    <p className="text-xs text-[#786E64] max-w-xl">
                      View the 75-day weight curve (nectar rise and harvest drop), colony acoustic health classification, Bruker NMR lab report, and Sepolia testnet transaction.
                    </p>
                  </div>

                  <Link
                    href="/beekeeper"
                    className="px-5 py-3 bg-[#8A4B12] hover:bg-[#703C0D] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Open Beekeepers Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))
            ) : (
              /* Fallback if order storage was empty */
              <div className="bg-white border border-[#E3DACB] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-[#1C1A17]">
                    Muzaffarpur Litchi Blossom Raw Honey
                  </h3>
                  <span className="text-xs font-mono text-[#8A4B12]">
                    Batch #HC-2026-MUS-014
                  </span>
                </div>
                <Link
                  href="/beekeeper"
                  className="px-4 py-2.5 bg-[#8A4B12] text-white text-xs font-semibold rounded-lg flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Open Beekeepers Dashboard</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Dispatch Details Card */}
        {order && (
          <div className="bg-white border border-[#E3DACB] rounded-xl p-6 sm:p-8 space-y-4 shadow-xs text-xs font-mono">
            <h3 className="font-serif text-base font-bold text-[#1C1A17] pb-3 border-b border-[#E3DACB]">
              Simulated Dispatch Receipt
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#665E55]">
              <div>
                <span className="text-[#786E64] block">Customer Name:</span>
                <strong className="text-[#1C1A17]">{order.customer.name}</strong>
              </div>
              <div>
                <span className="text-[#786E64] block">Delivery Location:</span>
                <strong className="text-[#1C1A17]">
                  {order.customer.address}, {order.customer.city} - {order.customer.pinCode}
                </strong>
              </div>
              <div>
                <span className="text-[#786E64] block">Courier Method:</span>
                <strong className="text-[#2F6B3A]">Temperature-Controlled Ground Insured (Simulated)</strong>
              </div>
              <div>
                <span className="text-[#786E64] block">Total Amount (Mock):</span>
                <strong className="text-[#8A4B12] text-sm">₹{order.total}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Return Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 text-xs font-mono">
          <Link
            href="/shop"
            className="text-[#8A4B12] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Browse more single-origin harvests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="hidden sm:inline text-[#DDD3C2]">|</span>
          <Link
            href="/"
            className="text-[#665E55] hover:text-[#1C1A17]"
          >
            Return to Storefront Home
          </Link>
        </div>
      </main>

      <StorefrontFooter />
    </div>
  );
}
