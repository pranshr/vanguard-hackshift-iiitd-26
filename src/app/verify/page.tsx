"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront/Header";
import { StorefrontFooter } from "@/components/storefront/Footer";
import { getAllBatches } from "@/data/batches";
import {
  ShieldCheck,
  Search,
  ArrowRight,
  Scale,
  FlaskConical,
  Blocks,
  AlertCircle,
} from "lucide-react";

export default function VerifySearchPage() {
  const router = useRouter();
  const [batchInput, setBatchInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const demoBatches = getAllBatches();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = batchInput.trim().toUpperCase();
    if (!clean) {
      setErrorMsg("Please enter a valid batch code.");
      return;
    }
    setErrorMsg("");
    router.push(`/verify/${clean}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#1C1A17]">
      <StorefrontHeader />

      <main className="flex-1 max-w-[900px] w-full mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-medium text-[#2F6B3A] bg-[#EBF2EB] border border-[#CDE0CD]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>HoneyChain Proof Engine</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1A17]">
            Verify Your Honey Jar
          </h1>
          <p className="text-sm sm:text-base text-[#665E55] leading-relaxed">
            Enter the alphanumeric batch code printed on your lid label, or select an active demo batch below to inspect the hive data, lab test, and blockchain audit trail.
          </p>
        </div>

        {/* Input Form Box */}
        <div className="bg-white border border-[#E3DACB] rounded-xl p-6 sm:p-8 shadow-xs max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label
                htmlFor="batchCode"
                className="block text-xs font-mono uppercase tracking-wider text-[#786E64] mb-2 font-semibold"
              >
                Batch Code (Printed on Jar Lid)
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#786E64] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="batchCode"
                    type="text"
                    value={batchInput}
                    onChange={(e) => {
                      setBatchInput(e.target.value);
                      if (errorMsg) setErrorMsg("");
                    }}
                    placeholder="e.g. HC-2026-MUS-014"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF6EF] border border-[#E3DACB] rounded-lg text-sm sm:text-base font-mono text-[#1C1A17] placeholder:text-[#A89E92] focus:outline-none focus:border-[#8A4B12] focus:bg-white transition-all uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#8A4B12] hover:bg-[#703C0D] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs cursor-pointer"
                >
                  <span>Inspect Record</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {errorMsg && (
                <p className="mt-2 text-xs font-mono text-[#DC2626] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errorMsg}</span>
                </p>
              )}
            </div>
          </form>

          {/* Quick Select Demo Batches */}
          <div className="mt-6 pt-5 border-t border-[#E3DACB]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#786E64] block mb-2.5">
              Or inspect an active SIH 2026 demo batch:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {demoBatches.map((b) => (
                <Link
                  key={b.id}
                  href={`/verify/${b.id}`}
                  className="flex flex-col text-left p-3 rounded border border-[#E3DACB] bg-[#FAF6EF] hover:bg-white hover:border-[#8A4B12] transition-all group"
                >
                  <span className="text-xs font-mono font-bold text-[#8A4B12] group-hover:underline">
                    {b.id}
                  </span>
                  <span className="text-[11px] font-serif font-medium text-[#1C1A17] truncate mt-0.5">
                    {b.productName.replace(" Raw Honey", "")}
                  </span>
                  <span className="text-[10px] text-[#665E55] mt-1 font-mono">
                    {b.district}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Pillars of HoneyChain Proof */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 text-left">
          <div className="p-4 rounded border border-[#E3DACB] bg-[#FAF6EF] space-y-2">
            <div className="w-8 h-8 rounded bg-white border border-[#E3DACB] flex items-center justify-center text-[#8A4B12]">
              <Scale className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#1C1A17]">1. Live Smart Hive</h4>
            <p className="text-xs text-[#665E55] leading-relaxed">
              75-day weight curve tracks nectar flow rise and the harvest day drop; acoustic sensors monitor colony health.
            </p>
          </div>

          <div className="p-4 rounded border border-[#E3DACB] bg-[#FAF6EF] space-y-2">
            <div className="w-8 h-8 rounded bg-white border border-[#E3DACB] flex items-center justify-center text-[#2F6B3A]">
              <FlaskConical className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#1C1A17]">2. NMR Spectroscopy</h4>
            <p className="text-xs text-[#665E55] leading-relaxed">
              Every batch undergoes 400 MHz NMR profiling and C4 isotope testing in accredited partner laboratories.
            </p>
          </div>

          <div className="p-4 rounded border border-[#E3DACB] bg-[#FAF6EF] space-y-2">
            <div className="w-8 h-8 rounded bg-white border border-[#E3DACB] flex items-center justify-center text-[#3F4A3A]">
              <Blocks className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-bold text-[#1C1A17]">3. Sepolia Testnet</h4>
            <p className="text-xs text-[#665E55] leading-relaxed">
              Merkle root hashes anchored on Ethereum Sepolia testnet guarantee records cannot be altered or fabricated.
            </p>
          </div>
        </div>
      </main>

      <StorefrontFooter />
    </div>
  );
}
