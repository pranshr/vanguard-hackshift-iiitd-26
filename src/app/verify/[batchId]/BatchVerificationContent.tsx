"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront/Header";
import { StorefrontFooter } from "@/components/storefront/Footer";
import { HiveWeightChart } from "@/components/storefront/HiveWeightChart";
import { JourneyTimeline } from "@/components/storefront/JourneyTimeline";
import { getBatchById, getAllBatches } from "@/data/batches";
import { PRODUCTS } from "@/data/storefront";
import {
  ShieldCheck,
  Activity,
  Blocks,
  FlaskConical,
  ExternalLink,
  ArrowRight,
  AlertTriangle,
  FileText,
  MapPin,
  Share2,
  Check,
} from "lucide-react";

export function BatchVerificationContent({ batchId }: { batchId: string }) {
  const batch = getBatchById(batchId);
  const allBatches = getAllBatches();

  const [copiedLink, setCopiedLink] = useState(false);

  // Find linked product for shop CTA
  const linkedProduct = batch
    ? PRODUCTS.find((p) => p.id === batch.productId) || PRODUCTS[0]
    : null;

  const handleShare = () => {
    try {
      if (typeof window !== "undefined") {
        navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  // 404 Not Found State
  if (!batch) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#1C1A17]">
        <StorefrontHeader />
        <main className="flex-1 max-w-[700px] w-full mx-auto px-4 py-16 text-center">
          <div className="bg-white border border-[#E3DACB] rounded-xl p-8 sm:p-10 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF0F0] border border-[#F5D5D5] flex items-center justify-center text-[#DC2626] mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17]">
              Batch Not Found
            </h1>
            <p className="text-sm text-[#665E55] leading-relaxed max-w-md mx-auto">
              We couldn&apos;t locate an on-chain or lab record for batch code{" "}
              <strong className="font-mono text-[#1C1A17] bg-[#EDE4D4] px-1.5 py-0.5 rounded">
                {batchId}
              </strong>
              . Please check the spelling on your jar lid or explore one of our verified demo batches:
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left">
              {allBatches.map((b) => (
                <Link
                  key={b.id}
                  href={`/verify/${b.id}`}
                  className="p-3 rounded border border-[#E3DACB] bg-[#FAF6EF] hover:bg-white hover:border-[#8A4B12] transition-all group"
                >
                  <span className="text-xs font-mono font-bold text-[#8A4B12] block group-hover:underline">
                    {b.id}
                  </span>
                  <span className="text-[11px] font-serif text-[#1C1A17] block truncate mt-0.5">
                    {b.flora}
                  </span>
                </Link>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/verify"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#8A4B12] hover:underline"
              >
                <span>← Return to batch lookup</span>
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

      <main className="flex-1 max-w-[1100px] w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        {/* Verification Status Header Card */}
        <section className="bg-white border border-[#E3DACB] rounded-xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E3DACB]">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-bold text-[#2F6B3A] bg-[#DFEBDC] border border-[#C5DBC0]">
                  <ShieldCheck className="w-4 h-4" />
                  VERIFIED BATCH PASSPORT
                </span>
                <span className="text-xs font-mono text-[#665E55] bg-[#EDE4D4] border border-[#DDD3C2] px-2 py-1 rounded">
                  {batch.blockchain.network}
                </span>
                {batch.isDemo && (
                  <span className="text-[10px] font-mono text-[#8A4B12] bg-[#FAF0E6] border border-[#F0D5C0] px-2 py-0.5 rounded">
                    SIH 2026 Demo Batch
                  </span>
                )}
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1C1A17]">
                {batch.productName}
              </h1>
              <p className="text-sm font-mono text-[#665E55] mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>Batch: <strong className="text-[#8A4B12] font-semibold">{batch.id}</strong></span>
                <span>•</span>
                <span>Harvested: {batch.harvestDate}</span>
                <span>•</span>
                <span>Packed: {batch.packDate}</span>
              </p>
            </div>

            {/* Quick Share / Action */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded border border-[#E3DACB] bg-[#FAF6EF] hover:bg-white text-[#1C1A17] transition-colors"
                title="Copy shareable link"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2F6B3A]" />
                    <span className="text-[#2F6B3A]">Copied Link</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#786E64]" />
                    <span>Share Record</span>
                  </>
                )}
              </button>

              {linkedProduct && (
                <Link
                  href={`/shop/${linkedProduct.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded bg-[#8A4B12] hover:bg-[#703C0D] text-white transition-colors shadow-xs"
                >
                  <span>Buy This Honey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>

          {/* 3 Verification Checkmarks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6">
            <div className="flex items-start gap-3 p-3 rounded bg-[#FAF6EF] border border-[#E3DACB]">
              <div className="w-6 h-6 rounded bg-[#DFEBDC] border border-[#C5DBC0] flex items-center justify-center text-[#2F6B3A] shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-mono font-semibold text-[#1C1A17] block">
                  1. IoT Smart Hive
                </span>
                <span className="text-[#665E55] text-[11px]">
                  75-day weight accumulation & harvest drop confirmed.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded bg-[#FAF6EF] border border-[#E3DACB]">
              <div className="w-6 h-6 rounded bg-[#DFEBDC] border border-[#C5DBC0] flex items-center justify-center text-[#2F6B3A] shrink-0 mt-0.5">
                <FlaskConical className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-mono font-semibold text-[#1C1A17] block">
                  2. NMR Spectrometry
                </span>
                <span className="text-[#665E55] text-[11px]">
                  Bruker 400 MHz pure nectar spectrum; C4 negative.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded bg-[#FAF6EF] border border-[#E3DACB]">
              <div className="w-6 h-6 rounded bg-[#DFEBDC] border border-[#C5DBC0] flex items-center justify-center text-[#2F6B3A] shrink-0 mt-0.5">
                <Blocks className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-mono font-semibold text-[#1C1A17] block">
                  3. Sepolia Testnet
                </span>
                <span className="text-[#665E55] text-[11px]">
                  Immutable Merkle hash mined in Block #{batch.blockchain.blockNumber}.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: Meet the Hive Your Jar Came From */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
                Origin & Smart Apiary
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17]">
                Meet the Hive Your Jar Came From
              </h2>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#3F4A3A] bg-[#EDE4D4] px-2.5 py-1 rounded border border-[#DDD3C2]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{batch.district}</span>
            </span>
          </div>

          {/* Interactive Weight Chart */}
          <HiveWeightChart data={batch.telemetry} hiveId={batch.hiveId} />

          {/* Colony Acoustic Status & Beekeeper Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Colony Acoustic AI Card */}
            <div className="md:col-span-6 bg-white border border-[#E3DACB] rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E3DACB]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[#EBF2EB] border border-[#CDE0CD] flex items-center justify-center text-[#2F6B3A]">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#786E64] block">
                      Acoustic Telemetry (INMP441)
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#1C1A17]">
                      Colony Acoustic Health
                    </h4>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#2F6B3A] bg-[#EBF2EB] border border-[#CDE0CD] px-2 py-0.5 rounded">
                  {batch.acousticStatus.confidencePercent}% Confidence
                </span>
              </div>

              <div className="p-3 rounded bg-[#FAF6EF] border border-[#E3DACB]">
                <span className="text-xs font-mono font-semibold text-[#1C1A17] block">
                  Status: {batch.acousticStatus.health}
                </span>
                <p className="text-xs text-[#665E55] mt-1 leading-relaxed">
                  Colony frequency harmonics analyzed continuously. No high-frequency queen piping (pre-swarm alert) or low-frequency brood ventilation stress was recorded during the nectar flow.
                </p>
              </div>

              <div className="text-[11px] font-mono text-[#786E64] flex items-center justify-between pt-1">
                <span>Model: {batch.acousticStatus.model}</span>
              </div>
            </div>

            {/* Beekeeper Profile Card */}
            <div className="md:col-span-6 bg-white border border-[#E3DACB] rounded-lg p-5 space-y-3">
              <div className="flex items-center gap-3 pb-2 border-b border-[#E3DACB]">
                <div className="w-10 h-10 rounded-full bg-[#FAF6EF] border border-[#E3DACB] flex items-center justify-center text-[#8A4B12] font-serif font-bold text-base shrink-0">
                  {batch.beekeeper.name.charAt(0)}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#786E64] block">
                    Certified Apiary Partner
                  </span>
                  <h4 className="font-serif text-sm sm:text-base font-bold text-[#1C1A17]">
                    {batch.beekeeper.name}
                  </h4>
                  <span className="text-xs font-mono text-[#665E55]">
                    {batch.beekeeper.region} · {batch.beekeeper.experienceYears} Years Apiculture
                  </span>
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm text-[#1C1A17] italic bg-[#FAF6EF] p-3 rounded border border-[#E3DACB] leading-relaxed">
                &ldquo;{batch.beekeeper.quote}&rdquo;
              </blockquote>

              <div className="text-[11px] font-mono text-[#2F6B3A] flex items-center gap-1.5 pt-1">
                <Check className="w-3.5 h-3.5" />
                <span>Fair-trade living wage contract verified on-chain</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Journey Timeline */}
        <section className="space-y-4 pt-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
              Supply Chain Audit Trail
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17]">
              The 6-Stage Journey of This Jar
            </h2>
          </div>

          <JourneyTimeline events={batch.events} />
        </section>

        {/* SECTION 3: NMR Lab Report & Purity Analysis */}
        <section className="space-y-4 pt-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
              Analytical Chemistry
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17]">
              Laboratory NMR Spectrometry Report
            </h2>
          </div>

          <div className="bg-white border border-[#E3DACB] rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E3DACB]">
              <div>
                <span className="text-xs font-mono text-[#665E55] block">
                  {batch.labReport.labName}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1C1A17]">
                  {batch.labReport.testType}
                </h3>
                <span className="text-xs font-mono text-[#3F4A3A]">
                  Accreditation: {batch.labReport.accreditation} · Tested {batch.labReport.date}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#DFEBDC] border border-[#C5DBC0] text-[#2F6B3A] font-mono font-bold text-xs shrink-0">
                <Check className="w-4 h-4" />
                <span>{batch.labReport.status}</span>
              </div>
            </div>

            {/* Chemical Test Parameters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded bg-[#FAF6EF] border border-[#E3DACB]">
                <span className="text-[10px] font-mono uppercase text-[#786E64] block">
                  Moisture Content
                </span>
                <span className="font-mono text-base sm:text-lg font-bold text-[#1C1A17]">
                  {batch.labReport.moisturePercent}%
                </span>
                <span className="text-[10px] text-[#2F6B3A] font-mono block mt-0.5">
                  Natural (Limit &lt; 20%)
                </span>
              </div>

              <div className="p-3 rounded bg-[#FAF6EF] border border-[#E3DACB]">
                <span className="text-[10px] font-mono uppercase text-[#786E64] block">
                  C4 Carbon Isotope
                </span>
                <span className="font-mono text-base sm:text-lg font-bold text-[#2F6B3A]">
                  {batch.labReport.c4SugarsPercent}%
                </span>
                <span className="text-[10px] text-[#665E55] font-mono block mt-0.5">
                  CSE standard &lt; 7.0%
                </span>
              </div>

              <div className="p-3 rounded bg-[#FAF6EF] border border-[#E3DACB]">
                <span className="text-[10px] font-mono uppercase text-[#786E64] block">
                  Fructose / Glucose
                </span>
                <span className="font-mono text-base sm:text-lg font-bold text-[#1C1A17]">
                  {batch.labReport.fructoseGlucoseRatio}
                </span>
                <span className="text-[10px] text-[#665E55] font-mono block mt-0.5">
                  Normal floral balance
                </span>
              </div>

              <div className="p-3 rounded bg-[#FAF6EF] border border-[#E3DACB]">
                <span className="text-[10px] font-mono uppercase text-[#786E64] block">
                  Native Pollen Density
                </span>
                <span className="font-mono text-base sm:text-lg font-bold text-[#1C1A17]">
                  {batch.labReport.pollenCountPer10g.toLocaleString()} / 10g
                </span>
                <span className="text-[10px] text-[#2F6B3A] font-mono block mt-0.5">
                  Single-origin confirmed
                </span>
              </div>
            </div>

            {/* IPFS Decentralized Report Link */}
            <div className="p-4 rounded-lg bg-[#FAF6EF] border border-[#E3DACB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#786E64] uppercase block">
                  Decentralized Storage (IPFS)
                </span>
                <span className="text-[#1C1A17] select-all break-all text-[11px]">
                  ipfs://{batch.labReport.ipfsCid}
                </span>
              </div>
              <a
                href={`https://ipfs.io/ipfs/${batch.labReport.ipfsCid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#E3DACB] bg-white text-[#8A4B12] hover:border-[#8A4B12] transition-colors shrink-0 text-xs font-semibold"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full Lab Certificate</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 4: Ethereum Sepolia Blockchain Record */}
        <section className="space-y-4 pt-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
              Cryptographic Immutability
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17]">
              Ethereum Sepolia Testnet Record
            </h2>
          </div>

          <div className="bg-white border border-[#E3DACB] rounded-xl p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E3DACB]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-[#FAF6EF] border border-[#E3DACB] flex items-center justify-center text-[#8A4B12]">
                  <Blocks className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#1C1A17]">
                    HoneyChain Smart Contract v1.2
                  </h3>
                  <span className="text-xs font-mono text-[#665E55]">
                    Network: {batch.blockchain.network} · Block #{batch.blockchain.blockNumber}
                  </span>
                </div>
              </div>

              <a
                href={batch.blockchain.etherscanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#E3DACB] bg-[#FAF6EF] hover:bg-white text-[#8A4B12] transition-colors text-xs font-mono shrink-0"
              >
                <span>View on Sepolia Etherscan</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded bg-[#FAF6EF] border border-[#E3DACB]">
                <span className="text-[10px] text-[#786E64] uppercase block">
                  Contract Address
                </span>
                <span className="text-[#1C1A17] select-all break-all">
                  {batch.blockchain.contractAddress}
                </span>
              </div>

              <div className="p-3 rounded bg-[#FAF6EF] border border-[#E3DACB]">
                <span className="text-[10px] text-[#786E64] uppercase block">
                  Transaction Hash
                </span>
                <span className="text-[#8A4B12] select-all break-all">
                  {batch.blockchain.txHash}
                </span>
              </div>

              <div className="p-3 rounded bg-[#FAF6EF] border border-[#E3DACB] md:col-span-2">
                <span className="text-[10px] text-[#786E64] uppercase block">
                  Batch Merkle Root (Keccak-256)
                </span>
                <span className="text-[#1C1A17] select-all break-all">
                  {batch.blockchain.merkleRoot}
                </span>
              </div>
            </div>

            {/* Immutability statement */}
            <div className="p-3.5 rounded bg-[#FAF6EF] border border-[#E3DACB] text-xs text-[#665E55] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#2F6B3A] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-[#1C1A17]">Tamper-Evident Guarantee:</strong>{" "}
                {batch.blockchain.tamperEvidentNote} The blockchain does not test the honey — accredited laboratory NMR instruments do. What Ethereum Sepolia guarantees is that the telemetry curves, harvest weight, and lab results were recorded immutably and cannot be altered or substituted after the harvest date.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Conversion Bottom Bar */}
        {linkedProduct && (
          <section className="bg-[#FAF6EF] border-2 border-[#8A4B12]/20 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
                Experience the Terroir
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A17]">
                Order {linkedProduct.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#665E55]">
                Raw, unpasteurized honey directly from {batch.district}. Includes the serialized lid QR code.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/shop/${linkedProduct.slug}`}
                className="px-6 py-3 bg-[#8A4B12] hover:bg-[#703C0D] text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-xs"
              >
                <span>Shop This Harvest</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}
      </main>

      <StorefrontFooter />
    </div>
  );
}
