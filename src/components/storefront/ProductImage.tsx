"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
  colorHex?: string;
  productName?: string;
  className?: string;
  aspectRatio?: string; // e.g. "aspect-[4/5]" or "aspect-square"
  priority?: boolean;
  fill?: boolean;
}

export function ProductImage({
  src,
  alt,
  colorHex = "var(--signature)",
  productName = "Raw Honey",
  className = "",
  aspectRatio = "aspect-[4/5]",
  priority = false,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative w-full ${aspectRatio} rounded-2xl flex flex-col items-center justify-between p-6 overflow-hidden select-none ${className}`}
        style={{
          background: `linear-gradient(145deg, ${colorHex}18 0%, var(--paper) 60%, ${colorHex}25 100%)`,
        }}
        aria-label={alt}
        role="img"
      >
        {/* Top subtle badge */}
        <div className="w-full flex justify-between items-center text-[10px] font-mono">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/70 backdrop-blur-xs text-[var(--muted-ink)]">
            <span
              className="w-2 h-2 rounded-full shrink-0 border border-black/10"
              style={{ backgroundColor: colorHex }}
            />
            <span>Single Origin</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/60 text-[var(--amber-deep)] font-semibold text-[9px] uppercase tracking-wider">
            Photo pending
          </span>
        </div>

        {/* Minimal Apothecary Jar graphic */}
        <div className="my-auto text-center space-y-3">
          <div
            className="w-32 h-44 sm:w-36 sm:h-48 rounded-2xl mx-auto shadow-sm flex flex-col justify-between p-3.5 relative border border-black/10 transition-transform duration-300 group-hover:scale-105"
            style={{
              background: `linear-gradient(to top, ${colorHex}, var(--sand) 85%)`,
            }}
          >
            {/* Jar Lid with Brand Seal cue */}
            <div className="w-24 h-4 bg-[var(--card-tint)] rounded-t-sm mx-auto border border-[var(--tag-border)] flex items-center justify-center shadow-2xs">
              <span className="text-[7px] font-mono text-[var(--muted-ink)] uppercase tracking-widest font-semibold">
                BEE SAFE SEAL
              </span>
            </div>

            {/* Apothecary Minimal Label */}
            <div className="bg-[var(--sand)] border border-[var(--line)] rounded-lg p-2.5 text-center shadow-xs">
              <span className="text-[8px] font-mono uppercase tracking-widest text-[var(--muted-ink)] block">
                BEE SAFE
              </span>
              <span className="font-serif text-xs font-bold text-[var(--ink)] block leading-tight mt-0.5">
                {productName}
              </span>
              <span className="text-[8px] font-mono text-[var(--amber-deep)] block mt-1">
                Raw · Single Origin
              </span>
            </div>

            {/* Base warmth */}
            <div
              className="w-16 h-2 rounded-full mx-auto blur-xs opacity-60"
              style={{ backgroundColor: colorHex }}
            />
          </div>
        </div>

        {/* Bottom subtle note */}
        <div className="text-center text-[10px] font-mono text-[var(--text-subtle)]">
          Authentic harvest lot
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center"
        priority={priority}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
