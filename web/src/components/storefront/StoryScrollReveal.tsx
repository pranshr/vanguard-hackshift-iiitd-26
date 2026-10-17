"use client";

import React, { useEffect, useRef, useState } from "react";
import { ProductImage } from "./ProductImage";

export function StoryScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.65);

  useEffect(() => {
    function handleScroll() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress through container
      const totalDist = containerRef.current.offsetHeight - windowHeight;
      if (totalDist <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalDist, 0), 1);
      
      // Scale from 0.65 to 1.0
      const newScale = 0.65 + progress * 0.35;
      setScale(newScale);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[160vh] sm:h-[180vh] bg-[var(--signature)] text-[var(--ink)]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-6 sm:p-10 overflow-hidden">
        {/* Scaling image container */}
        <div
          className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-75 ease-out will-change-transform motion-reduce:transform-none"
          style={{
            transform: `scale(${scale})`,
          }}
        >
          <ProductImage
            src="/images/spoon.jpg"
            alt="Honey dripping from wooden spoon"
            colorHex="var(--signature)"
            productName="Raw Honey Flow"
            aspectRatio="aspect-[16/9]"
            className="w-full h-full object-cover rounded-3xl"
            priority
          />

          {/* Overlay text on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center p-6 sm:p-12 text-center">
            <h1 className="headline-display text-2xl sm:text-4xl lg:text-5xl text-white font-medium max-w-2xl leading-tight drop-shadow-md">
              Single-origin Indian honey, traceable to the hive it came from.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
