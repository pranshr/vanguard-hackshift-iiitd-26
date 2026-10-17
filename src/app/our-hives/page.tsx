"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront/Header";
import { StorefrontFooter } from "@/components/storefront/Footer";
import {
  Scale,
  Activity,
  Thermometer,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Cpu,
  Binary,
  Blocks,
} from "lucide-react";

export default function OurHivesPage() {
  const [techDetailsOpen, setTechDetailsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#1C1A17]">
      <StorefrontHeader />

      <main className="flex-1 max-w-[1100px] w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16">
        {/* Hero Section */}
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-medium text-[#2F6B3A] bg-[#DFEBDC] border border-[#C5DBC0]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Smart Apiculture Ecosystem</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1A17] leading-tight">
            How HoneyChain Watches Over Our Hives
          </h1>
          <p className="text-base sm:text-lg text-[#665E55] leading-relaxed">
            Smart apiculture isn&apos;t about industrializing bees — it&apos;s about listening to them. Continuous telemetry lets colonies forage naturally without intrusive hive inspections.
          </p>
        </div>

        {/* SECTION 1: THE PHILOSOPHY (Why Non-Intrusive Monitoring Matters) */}
        <section className="bg-white border border-[#E3DACB] rounded-xl p-8 sm:p-10 space-y-4 shadow-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
            Apicultural Philosophy
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17]">
            Why opening a hive does more harm than good
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#665E55] leading-relaxed pt-2">
            <p>
              Traditional beekeeping requires apiarists to repeatedly smoke colonies and pry apart wooden frames to estimate honey maturity. Each inspection breaks the bees&apos; natural propolis seals, releases the carefully regulated brood nest warmth (~34.5°C), and triggers defensive stress that can set colony productivity back by days.
            </p>
            <p>
              HoneyChain places electronic sensors underneath and inside the hive boxes. Without opening the lid, the beekeeper knows when the nectar flow begins, monitors whether the colony is healthy by listening to wing vibrations, and harvests only when frames are fully capped and moisture has dropped below 18%.
            </p>
          </div>
        </section>

        {/* SECTION 2: THE VISUAL FLOW DIAGRAM (Mandated in Section 6) */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold">
              End-to-End Verification Flow
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17]">
              From Colony Foraging to Your Pantry
            </h2>
            <p className="text-xs sm:text-sm text-[#665E55]">
              How physical hive telemetry translates into an immutable provenance record.
            </p>
          </div>

          {/* 5-Step Visual Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {/* Step 1 */}
            <div className="bg-white border border-[#E3DACB] rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-3 shadow-xs">
              <div className="space-y-2">
                <span className="w-6 h-6 rounded-full bg-[#FAF6EF] border border-[#E3DACB] text-xs font-mono font-bold text-[#8A4B12] flex items-center justify-center">
                  1
                </span>
                <h3 className="font-serif text-sm font-bold text-[#1C1A17]">
                  Colony Forages
                </h3>
                <p className="text-[11px] text-[#665E55] leading-relaxed">
                  Bees forage regional blossoms (Litchi, Acacia, Mangrove) within a 3km apiary radius.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#3F4A3A] bg-[#EDE4D4] px-1.5 py-0.5 rounded inline-block">
                Natural Floral Flow
              </span>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-[#E3DACB] rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-3 shadow-xs">
              <div className="space-y-2">
                <span className="w-6 h-6 rounded-full bg-[#FAF6EF] border border-[#E3DACB] text-xs font-mono font-bold text-[#8A4B12] flex items-center justify-center">
                  2
                </span>
                <h3 className="font-serif text-sm font-bold text-[#1C1A17]">
                  Sensors Measure
                </h3>
                <p className="text-[11px] text-[#665E55] leading-relaxed">
                  Under-hive scale records nectar weight; acoustic microphone listens to colony hum.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#8A4B12] bg-[#FAF0E6] px-1.5 py-0.5 rounded inline-block">
                Weight + Sound Log
              </span>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-[#E3DACB] rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-3 shadow-xs">
              <div className="space-y-2">
                <span className="w-6 h-6 rounded-full bg-[#FAF6EF] border border-[#E3DACB] text-xs font-mono font-bold text-[#8A4B12] flex items-center justify-center">
                  3
                </span>
                <h3 className="font-serif text-sm font-bold text-[#1C1A17]">
                  Beekeeper Alert
                </h3>
                <p className="text-[11px] text-[#665E55] leading-relaxed">
                  Model notifies apiarist when nectar weight peaks so harvest happens at peak ripeness.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#2F6B3A] bg-[#EBF2EB] px-1.5 py-0.5 rounded inline-block">
                Precision Harvest
              </span>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-[#E3DACB] rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-3 shadow-xs">
              <div className="space-y-2">
                <span className="w-6 h-6 rounded-full bg-[#FAF6EF] border border-[#E3DACB] text-xs font-mono font-bold text-[#8A4B12] flex items-center justify-center">
                  4
                </span>
                <h3 className="font-serif text-sm font-bold text-[#1C1A17]">
                  NMR Lab Test
                </h3>
                <p className="text-[11px] text-[#665E55] leading-relaxed">
                  Batch sample tested via 400 MHz NMR spectrometry and C4 isotope analysis in accredited lab.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#2F6B3A] bg-[#EBF2EB] px-1.5 py-0.5 rounded inline-block">
                Purity Validated
              </span>
            </div>

            {/* Step 5 */}
            <div className="bg-white border-2 border-[#8A4B12] rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-3 shadow-xs">
              <div className="space-y-2">
                <span className="w-6 h-6 rounded-full bg-[#8A4B12] text-xs font-mono font-bold text-white flex items-center justify-center">
                  5
                </span>
                <h3 className="font-serif text-sm font-bold text-[#1C1A17]">
                  Sepolia Ledger
                </h3>
                <p className="text-[11px] text-[#665E55] leading-relaxed">
                  Merkle root sealed on Ethereum Sepolia testnet; serialized QR printed on jar lid.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#8A4B12] bg-[#FAF0E6] px-1.5 py-0.5 rounded inline-block font-bold">
                Tamper-Evident QR
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE THREE SENSES OF THE SMART HIVE */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
              Sensory Intelligence
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17]">
              The Three Senses of HoneyChain
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sense 1: Weight */}
            <div className="bg-white border border-[#E3DACB] rounded-xl p-6 sm:p-7 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#FAF6EF] border border-[#E3DACB] flex items-center justify-center text-[#8A4B12]">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1A17]">
                1. The Weight Scale (Nectar Flow)
              </h3>
              <p className="text-xs text-[#665E55] leading-relaxed">
                A calibrated 40kg electronic load cell sits quietly under the hive base. During the blossom window, it records the exact hourly weight curve. Beekeepers can see when foraging bees bring home fresh nectar and pinpoint the exact afternoon the flow slows down — indicating that the honey is cured and ready for harvest.
              </p>
            </div>

            {/* Sense 2: Sound */}
            <div className="bg-white border border-[#E3DACB] rounded-xl p-6 sm:p-7 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#FAF6EF] border border-[#E3DACB] flex items-center justify-center text-[#2F6B3A]">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1A17]">
                2. The Acoustic Mic (Colony Voice)
              </h3>
              <p className="text-xs text-[#665E55] leading-relaxed">
                An omnidirectional I2S acoustic sensor samples the brood chamber’s frequency spectra. A healthy foraging colony produces a calm, low hum (~200–250 Hz). If the colony prepares to swarm or loses its queen, worker bees generate distinct high-frequency vibrations (queen piping), alerting the beekeeper before the colony splits.
              </p>
            </div>

            {/* Sense 3: Temperature */}
            <div className="bg-white border border-[#E3DACB] rounded-xl p-6 sm:p-7 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#FAF6EF] border border-[#E3DACB] flex items-center justify-center text-[#3F4A3A]">
                <Thermometer className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1A17]">
                3. The Thermal Probe (Nursery Climate)
              </h3>
              <p className="text-xs text-[#665E55] leading-relaxed">
                Honeybees are master thermoregulators. They work cooperatively to fan their wings or cluster closely, maintaining their brood core strictly between 33.8°C and 35.2°C. Tracking internal hive temperature verifies that the queen is laying and the colony has sufficient population to protect its nursery.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: EXPANDABLE "HOW IT WORKS: TECHNICAL STACK" (For Judges) */}
        <section className="bg-[#FAF6EF] border border-[#E3DACB] rounded-xl p-6 sm:p-8 space-y-4">
          <button
            onClick={() => setTechDetailsOpen(!techDetailsOpen)}
            className="w-full flex items-center justify-between text-left gap-4 cursor-pointer"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
                SIH 2026 Evaluation Section
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A17] mt-0.5">
                Technical Stack & Architecture (Click to Expand)
              </h3>
            </div>
            <div className="w-8 h-8 rounded border border-[#E3DACB] bg-white flex items-center justify-center text-[#8A4B12] shrink-0">
              {techDetailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {techDetailsOpen && (
            <div className="pt-4 border-t border-[#E3DACB] space-y-6 text-xs font-mono text-[#665E55]">
              {/* Hardware Specifications */}
              <div className="space-y-2">
                <span className="text-[#1C1A17] font-bold text-sm flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#8A4B12]" />
                  IoT & Edge Hardware
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded border border-[#E3DACB]">
                    <strong className="text-[#1C1A17] block">Microcontroller Node</strong>
                    <span>ESP32 dual-core Xtensa 32-bit SoC running FreeRTOS with low-power deep sleep cycles.</span>
                  </div>
                  <div className="p-3 bg-white rounded border border-[#E3DACB]">
                    <strong className="text-[#1C1A17] block">Weight Transducer</strong>
                    <span>HX711 24-bit high-precision analog-to-digital converter coupled to a 4-point 40kg load cell frame.</span>
                  </div>
                  <div className="p-3 bg-white rounded border border-[#E3DACB]">
                    <strong className="text-[#1C1A17] block">Acoustic MEMS Sensor</strong>
                    <span>INMP441 omnidirectional I2S digital microphone (61 dBA SNR, 60 Hz to 15 kHz frequency response).</span>
                  </div>
                  <div className="p-3 bg-white rounded border border-[#E3DACB]">
                    <strong className="text-[#1C1A17] block">Power & Telemetry</strong>
                    <span>LiFePO4 rechargeable battery with solar trickle charge; LTE-M / LoRaWAN uplink for remote apiary coverage.</span>
                  </div>
                </div>
              </div>

              {/* Machine Learning Pipeline */}
              <div className="space-y-2">
                <span className="text-[#1C1A17] font-bold text-sm flex items-center gap-1.5">
                  <Binary className="w-4 h-4 text-[#2F6B3A]" />
                  Acoustic Machine Learning Pipeline
                </span>
                <div className="p-4 bg-white rounded border border-[#E3DACB] space-y-2">
                  <p className="leading-relaxed">
                    Acoustic signals are sampled at 16 kHz in 10-second audio frames. The edge pipeline extracts 40-band Mel-Frequency Cepstral Coefficients (MFCC), spectral centroid, and zero-crossing rate. A trained <strong>Random Forest Classifier</strong> classifies colony states into: (1) Normal Foraging Hum, (2) Swarm Piping Alert, or (3) Ventilation Heat Stress.
                  </p>
                </div>
              </div>

              {/* Blockchain & Sepolia Testnet Ledger */}
              <div className="space-y-2">
                <span className="text-[#1C1A17] font-bold text-sm flex items-center gap-1.5">
                  <Blocks className="w-4 h-4 text-[#3F4A3A]" />
                  Ethereum Sepolia Testnet Smart Contract
                </span>
                <div className="p-4 bg-white rounded border border-[#E3DACB] space-y-2">
                  <p className="leading-relaxed">
                    HoneyChain batches are committed using an OpenZeppelin-secured Solidity contract on the <strong>Ethereum Sepolia testnet</strong>. Each supply-chain event (Hive Tare, Harvest Super Drop, Coarse Filtration, NMR Lab Report, Glass Packaging) is hashed with Keccak-256 and added to a batch Merkle tree. Once mined into a Sepolia block, the record is permanent and tamper-evident.
                  </p>
                  <p className="text-[#8A4B12] text-[11px]">
                    Contract Address: 0x892a0149C3048921820bFa849182301824018261
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 5: ACTION CARDS */}
        <section className="bg-white border border-[#E3DACB] rounded-xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
              Experience the Proof
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A17]">
              Inspect a Real Harvest Telemetry Curve
            </h3>
            <p className="text-xs sm:text-sm text-[#665E55]">
              Explore the 75-day weight curve and NMR certificate for Muzaffarpur Litchi Blossom batch #HC-2026-MUS-014.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/verify/HC-2026-MUS-014"
              className="px-5 py-3 bg-[#8A4B12] hover:bg-[#703C0D] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Inspect Batch Passport</span>
            </Link>

            <Link
              href="/shop"
              className="px-5 py-3 border border-[#E3DACB] bg-[#FAF6EF] hover:bg-white text-[#1C1A17] text-xs font-mono font-medium rounded-lg transition-colors"
            >
              <span>Shop Raw Honeys</span>
            </Link>
          </div>
        </section>
      </main>

      <StorefrontFooter />
    </div>
  );
}
