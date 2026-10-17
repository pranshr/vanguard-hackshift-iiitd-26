import React from "react";
import fs from "fs";
import path from "path";
import { Metadata } from "next";
import { StorefrontHeader } from "@/components/storefront/Header";
import { StorefrontFooter } from "@/components/storefront/Footer";
import { StoryScrollReveal } from "@/components/storefront/StoryScrollReveal";
import { StoryTabs } from "@/components/storefront/StoryTabs";
import { StarterKitModule } from "@/components/storefront/StarterKitModule";
import { FAQS } from "@/data/storefront";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story | BEE safe",
  description:
    "How BEE safe and HoneyChain were created: verifying single-origin Indian raw honey from smart hive telemetry to tamper-evident blockchain records.",
};

export default function OurStoryPage() {
  // Check if brand video exists on disk (Section 3 guardrail)
  const videoPath = path.join(process.cwd(), "public", "video", "story.mp4");
  const hasBrandVideo = fs.existsSync(videoPath);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--ink)]">
      <StorefrontHeader />

      <main className="flex-1">
        {/* 1. Scroll reveal on signature-colour field */}
        <StoryScrollReveal />

        {/* 2. Full-bleed landscape with centred line */}
        <section className="relative min-h-[460px] sm:min-h-[540px] flex items-center justify-center overflow-hidden border-y border-[var(--line)]">
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: "url('/images/iot-smart-hive.jpg'), radial-gradient(circle at center, var(--amber-deep), var(--ink))",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/45 backdrop-blur-2xs" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-16 sm:py-24">
            <p className="headline-display text-2xl sm:text-4xl lg:text-5xl text-white leading-snug drop-shadow-md">
              Across India, every bloom makes a different honey. Litchi in Bihar. Acacia in Kashmir. Mangrove in the Sundarbans.
            </p>
          </div>
        </section>

        {/* 3. Embedded brand video with captions (ONLY if public/video/story.mp4 exists) */}
        {hasBrandVideo && (
          <section className="py-16 sm:py-24 max-w-[1000px] mx-auto px-4 sm:px-6">
            <div className="rounded-3xl overflow-hidden bg-black aspect-video shadow-xl border border-[var(--line)]">
              <video
                controls
                className="w-full h-full object-cover"
                aria-label="BEE safe apiary story video"
              >
                <source src="/video/story.mp4" type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            </div>
          </section>
        )}

        {/* 4. Tabbed 4-part story */}
        <StoryTabs />

        {/* 5. "Where it all began" (founders photo + text card) */}
        <section className="py-14 sm:py-20 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Founders Photo Card Left */}
            <div className="md:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-3xl overflow-hidden bg-[var(--tag-bg)] border border-[var(--line)] shadow-xs flex flex-col justify-between p-6">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="bg-white/80 px-2.5 py-1 rounded-full text-[var(--ink)]">
                    Vanguard Research
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--signature)] text-[var(--ink)] font-semibold">
                    Precision Apiculture
                  </span>
                </div>

                <div className="my-auto text-center space-y-2">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[var(--ink)] block">
                    Vanguard Research
                  </span>
                  <span className="text-xs font-mono text-[var(--muted-ink)] block">
                    Engineering Smart Apiculture & Traceability
                  </span>
                </div>

                <div className="text-[10px] font-mono text-center text-[var(--text-subtle)]">
                  Cryptographic Food Traceability · Single-Origin Raw Honey
                </div>
              </div>
            </div>

            {/* Origin Narrative Card Right (<90 words) */}
            <div className="md:col-span-7 bg-[var(--sand)] rounded-3xl p-8 sm:p-12 border border-[var(--line)] space-y-4 shadow-2xs">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-[var(--forest)] bg-[var(--tag-bg)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--verified)]" />
                <span>Founders Origin</span>
              </div>

              <h2 className="headline-display text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)]">
                Where it all began
              </h2>

              <p className="text-sm sm:text-base text-[var(--ink)]/80 leading-relaxed">
                BEE safe started with a single fundamental question: how do you mathematically prove where a jar of honey came from? We connected IoT hive load scales, ambient colony acoustics, and unalterable Ethereum Sepolia batch roots so no adulterator can forge origin.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Centred manifesto */}
        <section className="py-20 sm:py-28 max-w-[960px] mx-auto px-4 sm:px-6 text-center border-y border-[var(--line)]">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--muted-ink)] block">
              Most honey can&apos;t tell you where it came from.
            </span>
            <p className="headline-display text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)] leading-tight">
              Ours can. Trace any BEE safe batch to see the live hive telemetry, the harvest logs, and the blockchain record behind it.
            </p>
          </div>
        </section>

        {/* 7. Starter-kit buy module */}
        <StarterKitModule />

        {/* Educational FAQ Section for direct anchors */}
        <section id="faq" className="py-16 sm:py-24 max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-block text-xs font-mono uppercase tracking-widest text-[var(--muted-ink)]">
              Transparency Guides
            </div>
            <h2 className="headline-display text-3xl sm:text-4xl text-[var(--ink)]">
              Frequently asked questions.
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                id={`faq-${idx}`}
                className="rounded-2xl p-6 bg-[var(--sand)] border border-[var(--line)] space-y-2 scroll-mt-28"
              >
                <h3 className="font-serif text-lg font-bold text-[var(--ink)] flex items-center justify-between">
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm text-[var(--ink)]/80 leading-relaxed pt-1">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <StorefrontFooter />
    </div>
  );
}
