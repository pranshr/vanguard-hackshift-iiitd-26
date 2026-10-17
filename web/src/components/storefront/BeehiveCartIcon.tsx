"use client";

import React, { useEffect, useState } from "react";

interface BeehiveCartIconProps {
  count: number;
  className?: string;
}

export function BeehiveCartIcon({ count, className = "" }: BeehiveCartIconProps) {
  const [isJiggling, setIsJiggling] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [extraFillBonus, setExtraFillBonus] = useState(0);

  // Calculate honey fill ratio (0 to 1) based on cart item count
  // 0 items = 0 fill; 1 item = 35%; 2 items = 55%; 3 items = 75%; 4+ items = 95%
  const baseFill = count === 0 ? 0 : Math.min(0.95, 0.2 + count * 0.18);
  const effectiveFill = Math.min(1, baseFill + extraFillBonus);

  useEffect(() => {
    const handleBeehiveFilled = () => {
      setIsJiggling(true);
      setShowSplash(true);
      setExtraFillBonus(0.12);

      const jiggleTimer = setTimeout(() => setIsJiggling(false), 700);
      const splashTimer = setTimeout(() => setShowSplash(false), 800);
      const bonusTimer = setTimeout(() => setExtraFillBonus(0), 1200);

      return () => {
        clearTimeout(jiggleTimer);
        clearTimeout(splashTimer);
        clearTimeout(bonusTimer);
      };
    };

    window.addEventListener("beehive-filled", handleBeehiveFilled);
    return () => window.removeEventListener("beehive-filled", handleBeehiveFilled);
  }, []);

  // Honey rect height in SVG units (max skep height is ~18 units)
  const maxHoneyHeight = 17.5;
  const honeyHeight = effectiveFill * maxHoneyHeight;
  const honeyY = 20.5 - honeyHeight;

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-transform ${
        isJiggling ? "animate-[beehive-wobble_0.7s_ease-in-out]" : ""
      } ${className}`}
    >
      {/* Honey Splash Ripple Ring upon Bee Drop */}
      {showSplash && (
        <span
          className="absolute -inset-1.5 rounded-full border-2 border-[#F59E0B] pointer-events-none animate-[honey-splash_0.75s_ease-out_forwards]"
          aria-hidden="true"
        />
      )}

      {/* SVG Beehive Skep */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Inner clipPath matching the skep interior */}
          <clipPath id="beehive-interior-clip">
            <path d="M12 3.2C8.6 3.2 6.8 5.6 6.5 8C5.2 9.5 4.8 11.6 4.5 14C4.2 16.2 4.4 18.5 5 19.8C5.3 20.2 6 20.5 7.5 20.5H16.5C18 20.5 18.7 20.2 19 19.8C19.6 18.5 19.8 16.2 19.5 14C19.2 11.6 18.8 9.5 17.5 8C17.2 5.6 15.4 3.2 12 3.2Z" />
          </clipPath>

          {/* Warm Amber Honey Gradient */}
          <linearGradient id="beehive-honey-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>

          {/* Golden glow filter */}
          <filter id="honey-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#F59E0B" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Ambient Interior Background */}
        <path
          d="M12 3.2C8.6 3.2 6.8 5.6 6.5 8C5.2 9.5 4.8 11.6 4.5 14C4.2 16.2 4.4 18.5 5 19.8C5.3 20.2 6 20.5 7.5 20.5H16.5C18 20.5 18.7 20.2 19 19.8C19.6 18.5 19.8 16.2 19.5 14C19.2 11.6 18.8 9.5 17.5 8C17.2 5.6 15.4 3.2 12 3.2Z"
          fill="currentColor"
          fillOpacity={effectiveFill > 0 ? "0.08" : "0.04"}
        />

        {/* Dynamic Honey Liquid Fill inside Skep */}
        <g clipPath="url(#beehive-interior-clip)">
          {effectiveFill > 0 && (
            <>
              {/* Honey Body */}
              <rect
                x="2"
                y={honeyY}
                width="20"
                height={honeyHeight + 2}
                fill="url(#beehive-honey-grad)"
                className="transition-all duration-700 ease-out"
              />

              {/* Honey Surface Wave Highlight */}
              <ellipse
                cx="12"
                cy={honeyY + 0.8}
                rx={Math.min(7.5, 4.5 + effectiveFill * 3.5)}
                ry="1.4"
                fill="#FEF08A"
                fillOpacity="0.85"
                className="transition-all duration-700 ease-out"
              />

              {/* Internal Honey Sparkle bubbles */}
              {effectiveFill > 0.4 && (
                <>
                  <circle cx="8.5" cy={honeyY + 4} r="0.75" fill="#FFFBEB" fillOpacity="0.7" />
                  <circle cx="15" cy={honeyY + 6.5} r="0.6" fill="#FFFBEB" fillOpacity="0.6" />
                </>
              )}
            </>
          )}
        </g>

        {/* Coil Ribs / Tiers of the Skep */}
        <path
          d="M8.5 6.8C9.5 6.2 10.7 5.8 12 5.8C13.3 5.8 14.5 6.2 15.5 6.8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M6.5 10.8C8 10 10 9.5 12 9.5C14 9.5 16 10 17.5 10.8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M5.2 15C7 14.2 9.3 13.6 12 13.6C14.7 13.6 17 14.2 18.8 15"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M5 19.4C7 18.8 9.4 18.3 12 18.3C14.6 18.3 17 18.8 19 19.4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Outer Skep Silhouette Outline */}
        <path
          d="M12 3.2C8.6 3.2 6.8 5.6 6.5 8C5.2 9.5 4.8 11.6 4.5 14C4.2 16.2 4.4 18.5 5 19.8C5.3 20.2 6 20.5 7.5 20.5H16.5C18 20.5 18.7 20.2 19 19.8C19.6 18.5 19.8 16.2 19.5 14C19.2 11.6 18.8 9.5 17.5 8C17.2 5.6 15.4 3.2 12 3.2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Beehive Entrance Doorway Arch (where bees fly in!) */}
        <path
          d="M10.2 20.5V17.8C10.2 16.8 11 16 12 16C13 16 13.8 16.8 13.8 17.8V20.5"
          fill="#1C1A17"
          stroke="#1C1A17"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
