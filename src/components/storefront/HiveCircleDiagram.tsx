"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Scale, Thermometer, Droplets, Activity, ArrowRight, Radio, Cpu, ShieldCheck } from "lucide-react";

export function HiveCircleDiagram() {
  const [activeMetric, setActiveMetric] = useState<"sound" | "weight" | "temperature" | "humidity">("sound");

  const metrics = [
    {
      id: "sound" as const,
      icon: Activity,
      title: "Colony Acoustics",
      shortVal: "224 Hz",
      status: "Queen-Right & Calm",
      color: "var(--signature)",
      headline: "Acoustic FFT Frequency Monitoring",
      description:
        "High-sensitivity acoustic sensor arrays capture flight hum inside the brood chamber. Healthy queen-right colonies vibrate steadily between 200–250 Hz. Any spike above 350 Hz detects swarming preparation or queen distress days before visual signs appear.",
      hardware: "MEMS Acoustic Array · 16-bit 48kHz ADC · On-Device FFT Filtering",
      liveData: {
        current: "224 Hz",
        baseline: "220–245 Hz",
        swarmingRisk: "0.2% (Nominal)",
        queenStatus: "Active laying detected",
      },
    },
    {
      id: "weight" as const,
      icon: Scale,
      title: "Scale Weight",
      shortVal: "+1.85 kg/day",
      status: "Peak Nectar Flow",
      color: "var(--honey)",
      headline: "Continuous 4-Point Load Cell Telemetry",
      description:
        "Sub-millimeter load cells sit beneath the hive platform, measuring total hive mass every 60 seconds. Daily weight curves isolate daytime foraging inflow from nighttime moisture evaporation, proving honey is harvested only when comb cells are fully capped.",
      hardware: "4× Temperature-Compensated Strain Gauges · ±5g Resolution · Weather-Sealed Base",
      liveData: {
        current: "48.65 kg",
        gain24h: "+1.85 kg",
        cappingEst: "92% Capped",
        harvestStatus: "Ready in 4 days",
      },
    },
    {
      id: "temperature" as const,
      icon: Thermometer,
      title: "Brood Core Temp",
      shortVal: "34.8°C",
      status: "Optimal Thermoregulation",
      color: "#F59E0B",
      headline: "Brood Nest Temperature Precision",
      description:
        "Honeybee colonies expend immense metabolic energy keeping brood combs at an exact 34.5°C to 35.5°C. By monitoring core temperature non-intrusively, beekeepers confirm brood health without cracking the hive seal and shocking colony warmth.",
      hardware: "Calibrated SHT35 Digital Thermal Probes · ±0.1°C Accuracy · Propolis-Resistant Shield",
      liveData: {
        current: "34.8°C",
        targetRange: "34.5°C – 35.5°C",
        ambientDelta: "+12.4°C vs Ambient",
        stabilityScore: "99.4%",
      },
    },
    {
      id: "humidity" as const,
      icon: Droplets,
      title: "Comb Humidity",
      shortVal: "16.4% RH",
      status: "Naturally Cured",
      color: "var(--verified)",
      headline: "Internal Moisture & Nectar Curing",
      description:
        "Raw nectar enters the hive at over 60% water. Worker bees circulate dry air until moisture drops below 18%, initiating natural wax comb capping. IoT humidity tracking ensures extraction only occurs when the honey is biologically stable.",
      hardware: "Polymer Capacitive RH Sensor · Drift-Compensated · Real-Time Vapor Pressure Calculation",
      liveData: {
        current: "16.4%",
        fssaiCeiling: "20.0% Max",
        curingState: "Biologically Cured",
        fermentationRisk: "Zero",
      },
    },
  ];

  const current = metrics.find((m) => m.id === activeMetric)!;
  const CurrentIcon = current.icon;

  return (
    <section className="relative py-20 sm:py-28 bg-[#111611] text-[var(--paper)] overflow-hidden border-y border-white/10">
      {/* Background authentic hive image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url('/images/iot-smart-hive.jpg'), radial-gradient(circle at center, #2C3529 0%, #111611 90%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 z-10 space-y-12">
        {/* Section Header: Prominent IoT MVP Callout */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[var(--signature)] bg-[var(--signature)]/15 border border-[var(--signature)]/30 shadow-xs">
            <Radio className="w-3.5 h-3.5 animate-pulse text-[var(--signature)]" />
            <span className="tracking-widest uppercase">IoT Hardware MVP · Real-Time Telemetry</span>
          </div>

          <h2 className="headline-display text-3xl sm:text-4xl lg:text-5xl text-white">
            We listen to our hives.
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-light)] leading-relaxed max-w-2xl mx-auto">
            Traditional apiculture uses smoke and invasive frame pulling to guess honey maturity. BEE safe installs precision IoT sensors beneath and inside hive boxes—tracking weight accumulation, colony acoustics, and brood thermoregulation 24 hours a day.
          </p>
        </div>

        {/* Interactive 4-Metric Grid / Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {metrics.map((m) => {
            const Icon = m.icon;
            const isSelected = m.id === activeMetric;

            return (
              <button
                key={m.id}
                onClick={() => setActiveMetric(m.id)}
                className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[var(--dark-card)] border-[var(--signature)] shadow-lg ring-1 ring-[var(--signature)]/50 scale-[1.02]"
                    : "bg-black/40 border-white/10 hover:border-white/20 hover:bg-black/60"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: isSelected ? "var(--signature)" : "rgba(255,255,255,0.1)",
                      color: isSelected ? "var(--ink)" : "white",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--signature)] font-semibold">
                    {m.shortVal}
                  </span>
                </div>

                <div>
                  <span className="font-serif text-sm sm:text-base font-bold text-white block">
                    {m.title}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--text-subtle)] block mt-0.5 truncate">
                    {m.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Interactive Telemetry Showcase Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-black/60 backdrop-blur-md border border-white/15 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Deep Telemetry Explanation */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--verified)] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--signature)]">
                  Live Stream · Node #{current.id.toUpperCase()}-01
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {current.headline}
              </h3>

              <p className="text-xs sm:text-sm text-[var(--text-light)] leading-relaxed">
                {current.description}
              </p>

              <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-[var(--text-subtle)]">
                <Cpu className="w-3.5 h-3.5 text-[var(--signature)] shrink-0" />
                <span>{current.hardware}</span>
              </div>
            </div>

            {/* Right: Simulated Real-Time Sensor Readout */}
            <div className="md:col-span-5 bg-[var(--dark-card)] rounded-2xl p-5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <CurrentIcon className="w-4 h-4 text-[var(--signature)]" />
                  <span className="text-xs font-mono font-semibold text-white">
                    {current.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--verified)]/20 text-[var(--verified)] border border-[var(--verified)]/40">
                  {current.status}
                </span>
              </div>

              {/* Dynamic Readout Parameters */}
              <div className="space-y-2.5 text-xs font-mono">
                {Object.entries(current.liveData).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-[var(--text-subtle)] capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span className="text-white font-semibold">{val}</span>
                  </div>
                ))}
              </div>

              {/* Animated Waveform Visualizer for Sound */}
              {activeMetric === "sound" && (
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-[var(--text-subtle)] block mb-1.5">
                    Acoustic Spectrum (200Hz - 400Hz)
                  </span>
                  <div className="flex items-end gap-1 h-10 px-2 py-1 bg-black/50 rounded-lg">
                    {[35, 45, 60, 95, 80, 50, 40, 30, 25, 20, 15, 20, 25, 18].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-xs transition-all duration-300"
                        style={{
                          height: `${height}%`,
                          backgroundColor: i === 3 ? "var(--signature)" : "rgba(255,255,255,0.25)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Progress visualizer for Weight */}
              {activeMetric === "weight" && (
                <div className="pt-2">
                  <div className="flex justify-between text-[10px] font-mono text-[var(--text-subtle)] mb-1">
                    <span>Comb Capping Progress</span>
                    <span className="text-[var(--signature)] font-bold">92%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden">
                    <div className="h-full bg-[var(--signature)] rounded-full transition-all duration-500 w-[92%]" />
                  </div>
                </div>
              )}

              {/* Stability gauge for Temperature */}
              {activeMetric === "temperature" && (
                <div className="pt-2">
                  <div className="flex justify-between text-[10px] font-mono text-[var(--text-subtle)] mb-1">
                    <span>Core Brood Stability</span>
                    <span className="text-[var(--verified)] font-bold">Optimal</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden">
                    <div className="h-full bg-[var(--verified)] rounded-full transition-all duration-500 w-[98%]" />
                  </div>
                </div>
              )}

              {/* Humidity bar */}
              {activeMetric === "humidity" && (
                <div className="pt-2">
                  <div className="flex justify-between text-[10px] font-mono text-[var(--text-subtle)] mb-1">
                    <span>Moisture Content (Target &lt;18%)</span>
                    <span className="text-[var(--verified)] font-bold">16.4%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden">
                    <div className="h-full bg-[var(--verified)] rounded-full transition-all duration-500 w-[82%]" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Actions linking to IoT Portal & Hives */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/sensors"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-sans text-xs font-semibold text-[var(--ink)] bg-[var(--signature)] hover:brightness-95 transition-all shadow-md"
          >
            <span>Explore Live IoT Telemetry Streams</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/our-hives"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-sans text-xs font-medium text-white border border-white/20 hover:bg-white/10 transition-colors"
          >
            <span>How our smart hives work</span>
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--signature)]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
