"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductImage } from "./ProductImage";
import { ArrowRight, ChevronRight } from "lucide-react";

export function StoryTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: "flowers",
      label: "The flowers",
      title: "Wild bloom & regional nectar",
      counter: "1/4",
      narrative:
        "India's floral landscape spans from litchi orchards along the Gangetic plains to high Himalayan acacia slopes and wild mangrove deltas. Unlike commercial brands that blend bulk lots, BEE safe bottles each bloom variety independently. The natural color, floral aromatics, and crystallization timeline reflect the exact blossom our bees foraged.",
      image: "/images/honey-litchi.jpg",
      colorHex: "var(--honey)",
    },
    {
      id: "hives",
      label: "The hives",
      title: "Precision telemetry without intrusion",
      counter: "2/4",
      narrative:
        "Opening a hive box breaks the colony's warmth and propolis seal. Our apiaries place waterproof load scales and acoustic sensors beneath each box. Without disturbing the brood nest, beekeepers monitor daily nectar accumulation and colony health in real time, harvesting only when comb frames are fully sealed and moisture has cured below 18%.",
      image: "/images/iot-smart-hive.jpg",
      colorHex: "var(--forest)",
    },
    {
      id: "beekeepers",
      label: "The beekeepers",
      title: "Honoring traditional Indian apiarists",
      counter: "3/4",
      narrative:
        "HoneyChain works directly with regional beekeeping cooperatives in Bihar, Jammu & Kashmir, and West Bengal. Apiarists are trained on non-intrusive sensor deployment and paid a transparent fair-trade premium per harvested kilogram. By eliminating middlemen and syrup blending, traditional beekeeping remains economically viable for rural stewards.",
      image: "/images/beekeeper-ramdas.jpg",
      colorHex: "var(--amber-deep)",
    },
    {
      id: "traceability",
      label: "Full traceability",
      title: "A tamper-evident audit trail",
      counter: "4/4",
      narrative:
        "Every harvest is logged with its hive identifier, comb capping date, and laboratory analysis summary before entering serialized glass jars. The cryptographic root of each batch record is permanently anchored to Ethereum Sepolia testnet. Anyone can enter their jar's batch ID into HoneyChain to inspect the entire chain of custody from live hive telemetry to testing certificate.",
      image: "/images/honey-jar-hero.jpg",
      colorHex: "var(--signature)",
      isLast: true,
    },
  ];

  const currentTab = tabs[activeTab];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setActiveTab((prev) => (prev < tabs.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowLeft") {
      setActiveTab((prev) => (prev > 0 ? prev - 1 : tabs.length - 1));
    }
  };

  return (
    <section className="py-16 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6">
      {/* Tab Navigation Pill Bar */}
      <div
        role="tablist"
        aria-label="Story chapters"
        className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-[var(--line)] scrollbar-none"
      >
        {tabs.map((tab, idx) => {
          const isSelected = idx === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(idx)}
              onKeyDown={handleKeyDown}
              className={`h-11 px-5 rounded-full font-sans text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? "bg-[var(--signature)] text-[var(--ink)] shadow-2xs"
                  : "bg-white/80 hover:bg-white text-[var(--muted-ink)] border border-[var(--line)]"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panel Content */}
      <div
        role="tabpanel"
        id={`panel-${currentTab.id}`}
        aria-labelledby={`tab-${currentTab.id}`}
        className="pt-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Image */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-sm border border-[var(--line)]">
              <ProductImage
                src={currentTab.image}
                alt={currentTab.title}
                colorHex={currentTab.colorHex}
                productName={currentTab.title}
                aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>

          {/* Right Column: Counter & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--muted-ink)]">
              <span className="uppercase tracking-widest font-semibold text-[var(--forest)]">
                {currentTab.label}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[var(--card-tint)] text-[var(--ink)] font-bold">
                {currentTab.counter}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--ink)] leading-snug">
              {currentTab.title}
            </h2>

            <p className="text-base text-[var(--ink)]/80 leading-relaxed">
              {currentTab.narrative}
            </p>

            {currentTab.isLast ? (
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/our-hives"
                  className="btn-pill-primary shadow-xs"
                >
                  <span>Explore smart hives</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>

                <Link
                  href="/beekeeper"
                  className="btn-pill-secondary"
                >
                  <span>Beekeepers dashboard</span>
                </Link>
              </div>
            ) : (
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab((prev) => prev + 1)}
                  className="btn-pill-secondary inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: {tabs[activeTab + 1].label}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
