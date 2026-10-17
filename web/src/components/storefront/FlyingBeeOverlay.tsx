"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register GSAP MotionPathPlugin safely on the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

export type FlightPatternName =
  | "loop-de-loop"
  | "waggle-zigzag"
  | "skylight-arc"
  | "meadow-s-curve"
  | "turbo-buzz-rocket";

export interface FlightPatternConfig {
  name: FlightPatternName;
  label: string;
  duration: number; // Duration in seconds
  ease: string;
  curviness: number;
  generatePoints: (
    start: { x: number; y: number },
    target: { x: number; y: number }
  ) => { x: number; y: number }[];
}

/**
 * 5 Preloaded Distinct GSAP Flight Patterns
 * Each dynamically adapts to any (startX, startY) -> (targetX, targetY) vector on screen.
 */
export const FLIGHT_PATTERNS: FlightPatternConfig[] = [
  // Pattern 0: Acrobatic Loop-de-Loop (360° aerial corkscrew stunt)
  {
    name: "loop-de-loop",
    label: "Acrobatic Loop-de-Loop",
    duration: 1.35,
    ease: "power1.inOut",
    curviness: 1.4,
    generatePoints: (start, target) => {
      const dx = target.x - start.x;
      const dy = target.y - start.y;
      const dist = Math.hypot(dx, dy);
      const ux = dx / (dist || 1);
      const uy = dy / (dist || 1);
      const nx = -uy;
      const ny = ux;

      const points: { x: number; y: number }[] = [];
      points.push({ x: start.x, y: start.y });

      // Initial lift-off burst
      points.push({
        x: start.x + dx * 0.16 + nx * 22,
        y: start.y + dy * 0.16 + ny * 22 - 16,
      });

      // Loop center placed at ~42% of travel, offset upward/laterally
      const loopCenter = {
        x: start.x + dx * 0.42 + nx * 28,
        y: start.y + dy * 0.42 + ny * 28 - 36,
      };
      const R = Math.min(56, Math.max(28, dist * 0.08));

      // 7 circular waypoints creating a full 360-degree loop
      const loopSteps = 7;
      for (let i = 1; i <= loopSteps; i++) {
        const theta = -Math.PI / 2 + (i / loopSteps) * 2 * Math.PI;
        points.push({
          x: loopCenter.x + Math.cos(theta) * R,
          y: loopCenter.y + Math.sin(theta) * R,
        });
      }

      // Exit trajectory accelerating towards the beehive
      points.push({
        x: start.x + dx * 0.78 - nx * 14,
        y: start.y + dy * 0.78 - ny * 14,
      });

      // Arrival at hive entrance
      points.push({ x: target.x, y: target.y });
      return points;
    },
  },

  // Pattern 1: Waggle Dance Zig-Zag (Energetic slalom darting)
  {
    name: "waggle-zigzag",
    label: "Waggle Dance Zig-Zag",
    duration: 1.22,
    ease: "power2.inOut",
    curviness: 1.3,
    generatePoints: (start, target) => {
      const dx = target.x - start.x;
      const dy = target.y - start.y;
      const dist = Math.hypot(dx, dy);
      const ux = dx / (dist || 1);
      const uy = dy / (dist || 1);
      const nx = -uy;
      const ny = ux;

      const lateral = Math.min(88, Math.max(38, dist * 0.22));
      return [
        { x: start.x, y: start.y },
        // Dart 1 (sharp bank right)
        { x: start.x + dx * 0.18 + nx * lateral, y: start.y + dy * 0.18 + ny * lateral },
        // Dart 2 (sharp bank left)
        { x: start.x + dx * 0.42 - nx * lateral * 0.85, y: start.y + dy * 0.42 - ny * lateral * 0.85 },
        // Dart 3 (bank right again)
        { x: start.x + dx * 0.68 + nx * lateral * 0.65, y: start.y + dy * 0.68 + ny * lateral * 0.65 },
        // Dart 4 (bank left near hive)
        { x: start.x + dx * 0.86 - nx * lateral * 0.35, y: start.y + dy * 0.86 - ny * lateral * 0.35 },
        { x: target.x, y: target.y },
      ];
    },
  },

  // Pattern 2: Skylight Soaring Arc (Stratospheric glide across top ceiling)
  {
    name: "skylight-arc",
    label: "Skylight Soaring Arc",
    duration: 1.18,
    ease: "power2.out",
    curviness: 1.35,
    generatePoints: (start, target) => {
      const dx = target.x - start.x;
      const dy = target.y - start.y;
      const dist = Math.hypot(dx, dy);

      // Rocket high up into the viewport top sky
      const apexY = Math.max(26, Math.min(start.y, target.y) - Math.max(130, dist * 0.38));
      return [
        { x: start.x, y: start.y },
        // Steep upward rocket climb
        { x: start.x + dx * 0.12, y: start.y + (apexY - start.y) * 0.72 },
        // Gliding high across the top sky
        { x: start.x + dx * 0.45, y: apexY },
        // Gentle undulating top drift
        { x: start.x + dx * 0.76, y: apexY + 14 },
        // Falcon-like swoop dive into hive
        { x: target.x, y: target.y },
      ];
    },
  },

  // Pattern 3: Meadow Breeze S-Curve Wave (Sinusoidal harmonic drift)
  {
    name: "meadow-s-curve",
    label: "Meadow Breeze S-Curve",
    duration: 1.25,
    ease: "sine.inOut",
    curviness: 1.45,
    generatePoints: (start, target) => {
      const dx = target.x - start.x;
      const dy = target.y - start.y;
      const dist = Math.hypot(dx, dy);
      const ux = dx / (dist || 1);
      const uy = dy / (dist || 1);
      const nx = -uy;
      const ny = ux;

      const waveAmp = Math.min(96, Math.max(42, dist * 0.25));
      return [
        { x: start.x, y: start.y },
        // Wide outward lateral swell
        { x: start.x + dx * 0.24 - nx * waveAmp, y: start.y + dy * 0.24 - ny * waveAmp },
        // Crossing center axis with forward speed
        { x: start.x + dx * 0.50, y: start.y + dy * 0.50 },
        // Wide swell to the opposite side
        { x: start.x + dx * 0.76 + nx * waveAmp * 0.85, y: start.y + dy * 0.76 + ny * waveAmp * 0.85 },
        // Soft aligning bend into the entrance
        { x: start.x + dx * 0.92 - nx * 12, y: start.y + dy * 0.92 - ny * 12 },
        { x: target.x, y: target.y },
      ];
    },
  },

  // Pattern 4: Turbo Buzz Rocket (High-speed sprint with doorstep corkscrew spin)
  {
    name: "turbo-buzz-rocket",
    label: "Turbo Buzz Rocket",
    duration: 1.05,
    ease: "power3.inOut",
    curviness: 1.2,
    generatePoints: (start, target) => {
      const dx = target.x - start.x;
      const dy = target.y - start.y;
      const dist = Math.hypot(dx, dy);
      const ux = dx / (dist || 1);
      const uy = dy / (dist || 1);
      const nx = -uy;
      const ny = ux;

      // Direct speed rush with a tight spin spiral right at the doorstep
      const spiralRadius = Math.min(30, Math.max(16, dist * 0.055));
      const spiralCenter = {
        x: target.x - ux * 46,
        y: target.y - uy * 46,
      };

      const points: { x: number; y: number }[] = [
        { x: start.x, y: start.y },
        // Fast direct rush
        { x: start.x + dx * 0.32 + nx * 12, y: start.y + dy * 0.32 + ny * 12 },
        { x: start.x + dx * 0.64 - nx * 10, y: start.y + dy * 0.64 - ny * 10 },
      ];

      // Tight spiral around spiralCenter
      for (let i = 0; i <= 4; i++) {
        const theta = (i / 4) * 2 * Math.PI;
        points.push({
          x: spiralCenter.x + Math.cos(theta) * spiralRadius,
          y: spiralCenter.y + Math.sin(theta) * spiralRadius,
        });
      }

      // Plunge through the entrance arch
      points.push({ x: target.x, y: target.y });
      return points;
    },
  },
];

interface BeeFlight {
  id: string;
  startX: number;
  startY: number;
  patternIndex: number;
}

interface MosquitoSlamEvent {
  id: string;
  startX: number;
  startY: number;
  exclamation: string;
}

export function FlyingBeeOverlay() {
  const [flights, setFlights] = useState<BeeFlight[]>([]);
  const [slams, setSlams] = useState<MosquitoSlamEvent[]>([]);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Listen for Add-To-Cart: Bee flies from button to beehive
    const handleFlightStart = (e: Event) => {
      const customEvent = e as CustomEvent<{ x?: number; y?: number; pattern?: number }>;
      const startX = customEvent.detail?.x ?? window.innerWidth / 2;
      const startY = customEvent.detail?.y ?? window.innerHeight / 2;

      // Pick randomly among 5 preloaded patterns (or use requested pattern override)
      const patternIndex =
        customEvent.detail?.pattern !== undefined
          ? customEvent.detail.pattern
          : Math.floor(Math.random() * FLIGHT_PATTERNS.length);

      const newFlight: BeeFlight = {
        id: `bee-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        startX,
        startY,
        patternIndex,
      };

      setFlights((prev) => [...prev, newFlight]);
    };

    // 2. Listen for Subtract-From-Cart: Bee pops out and gets SLAMMED by a mosquito!
    const handleSlamStart = (e: Event) => {
      const customEvent = e as CustomEvent<{ x?: number; y?: number }>;
      const startX = customEvent.detail?.x ?? window.innerWidth / 2;
      const startY = customEvent.detail?.y ?? window.innerHeight / 2;

      const exclamations = ["SLAM!", "POW!", "WHAM!", "BAM!", "SWAT!", "OUCH!"];
      const exclamation = exclamations[Math.floor(Math.random() * exclamations.length)];

      const newSlam: MosquitoSlamEvent = {
        id: `slam-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        startX,
        startY,
        exclamation,
      };

      setSlams((prev) => [...prev, newSlam]);
    };

    window.addEventListener("bee-flight-start", handleFlightStart);
    window.addEventListener("bee-mosquito-slam", handleSlamStart);

    // Global developer helpers for browser console testing
    if (typeof window !== "undefined") {
      (window as unknown as { __triggerBeeFlight?: (pattern?: number) => void }).__triggerBeeFlight = (pattern) => {
        window.dispatchEvent(
          new CustomEvent("bee-flight-start", {
            detail: {
              x: window.innerWidth * 0.35 + Math.random() * 200,
              y: window.innerHeight * 0.65 + Math.random() * 100,
              pattern,
            },
          })
        );
      };

      (window as unknown as { __triggerMosquitoSlam?: (x?: number, y?: number) => void }).__triggerMosquitoSlam = (
        x,
        y
      ) => {
        window.dispatchEvent(
          new CustomEvent("bee-mosquito-slam", {
            detail: {
              x: x ?? window.innerWidth / 2,
              y: y ?? window.innerHeight / 2,
            },
          })
        );
      };
    }

    return () => {
      window.removeEventListener("bee-flight-start", handleFlightStart);
      window.removeEventListener("bee-mosquito-slam", handleSlamStart);
    };
  }, []);

  const handleFlightComplete = (flightId: string) => {
    // Notify the Beehive cart icon to bounce and fill with honey
    window.dispatchEvent(new CustomEvent("beehive-filled"));
    setFlights((prev) => prev.filter((f) => f.id !== flightId));
  };

  const handleSlamComplete = (slamId: string) => {
    setSlams((prev) => prev.filter((s) => s.id !== slamId));
  };

  const spawnPollenParticle = (x: number, y: number) => {
    if (!particleContainerRef.current) return;
    const p = document.createElement("span");
    const size = 5 + Math.random() * 4;
    p.className = "absolute rounded-full pointer-events-none";
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.backgroundColor = Math.random() > 0.4 ? "#F59E0B" : "#FBBF24";
    p.style.boxShadow = "0 0 8px rgba(245, 158, 11, 0.85)";
    p.style.transform = "translate(-50%, -50%) scale(1)";
    p.style.opacity = "0.95";
    p.style.zIndex = "9998";

    particleContainerRef.current.appendChild(p);

    // GSAP handles particle fade and drift smoothly with zero React state overhead
    gsap.to(p, {
      y: `+=${14 + Math.random() * 16}`,
      x: `+=${(Math.random() - 0.5) * 16}`,
      scale: 0.1,
      opacity: 0,
      duration: 0.45 + Math.random() * 0.2,
      ease: "power2.out",
      onComplete: () => {
        p.remove();
      },
    });
  };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Pollen Particles Container */}
      <div ref={particleContainerRef} className="absolute inset-0 pointer-events-none" />

      {/* 1. Add-to-Cart Flights */}
      {flights.map((flight) => (
        <GsapBeeFlightRunner
          key={flight.id}
          flight={flight}
          onComplete={() => handleFlightComplete(flight.id)}
          onEmitPollen={spawnPollenParticle}
        />
      ))}

      {/* 2. Subtract-from-Cart Mosquito Slams */}
      {slams.map((slam) => (
        <GsapMosquitoSlamRunner
          key={slam.id}
          slam={slam}
          onComplete={() => handleSlamComplete(slam.id)}
        />
      ))}
    </div>
  );
}

/**
 * Normal Add-To-Cart Flight Runner (Bee flies to Beehive)
 */
function GsapBeeFlightRunner({
  flight,
  onComplete,
  onEmitPollen,
}: {
  flight: BeeFlight;
  onComplete: () => void;
  onEmitPollen: (x: number, y: number) => void;
}) {
  const beeContainerRef = useRef<HTMLDivElement>(null);
  const clickBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const beeEl = beeContainerRef.current;
    if (!beeEl) return;

    // Locate the beehive cart icon in the header for real-time target coordinates
    const cartEl = document.getElementById("header-beehive-cart");
    const targetRect = cartEl
      ? cartEl.getBoundingClientRect()
      : { left: window.innerWidth - 65, top: 25, width: 40, height: 40 };

    // Target the entrance arch of the beehive skep
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height * 0.65;

    // Select the preloaded flight pattern
    const pattern = FLIGHT_PATTERNS[flight.patternIndex % FLIGHT_PATTERNS.length];
    const points = pattern.generatePoints(
      { x: flight.startX, y: flight.startY },
      { x: targetX, y: targetY }
    );

    // Initial setup at the Add-to-Cart click position
    gsap.set(beeEl, {
      x: flight.startX,
      y: flight.startY,
      scale: 0,
      opacity: 0,
      rotation: 0,
    });

    // Animate click nectar burst badge if present
    if (clickBadgeRef.current) {
      gsap.fromTo(
        clickBadgeRef.current,
        { scale: 0.2, opacity: 0.9 },
        { scale: 1.6, opacity: 0, duration: 0.45, ease: "power2.out" }
      );
    }

    let lastPollenTime = 0;

    // Master GSAP Timeline for the flight
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Step 1: Joyful emergence pop from button
    tl.to(beeEl, {
      scale: 1.15,
      opacity: 1,
      duration: 0.16,
      ease: "back.out(2)",
    });

    // Step 2: Smooth motion along the pattern path
    tl.to(
      beeEl,
      {
        duration: pattern.duration,
        ease: pattern.ease,
        motionPath: {
          path: points,
          curviness: pattern.curviness,
          // autoRotate: 90 aligns the upward-facing bee SVG to the tangent of the path
          autoRotate: 90,
        },
        onUpdate: () => {
          const now = performance.now();
          if (now - lastPollenTime > 45) {
            // Read hardware-accelerated position directly from GSAP cache
            const currentX = Number(gsap.getProperty(beeEl, "x"));
            const currentY = Number(gsap.getProperty(beeEl, "y"));
            onEmitPollen(currentX, currentY);
            lastPollenTime = now;
          }
        },
      },
      "-=0.04"
    );

    // Step 3: Plunge straight into the beehive entrance door with shrinkage and fade
    tl.to(
      beeEl,
      {
        scale: 0.15,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      "-=0.1"
    );

    return () => {
      tl.kill();
    };
  }, [flight, onComplete, onEmitPollen]);

  return (
    <>
      {/* Click Position Nectar Glow Burst */}
      <div
        ref={clickBadgeRef}
        className="absolute w-8 h-8 rounded-full border-2 border-[#F59E0B] bg-[#FEF3C7]/40 pointer-events-none"
        style={{
          left: `${flight.startX}px`,
          top: `${flight.startY}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* GSAP-Controlled Flying Bee */}
      <div
        ref={beeContainerRef}
        className="absolute will-change-transform pointer-events-none select-none"
        style={{
          left: 0,
          top: 0,
          transformOrigin: "center center",
        }}
      >
        <div className="relative w-10 h-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
          {/* Living body buzz wobble */}
          <div className="w-full h-full animate-[bee-body-buzz_0.12s_infinite_ease-in-out]">
            <BeeModelSvg />
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Hilarious Subtract-From-Cart Animation:
 * Bee pops out of the subtract button innocently, then gets slammed by a sneaky cartoon mosquito!
 */
function GsapMosquitoSlamRunner({
  slam,
  onComplete,
}: {
  slam: MosquitoSlamEvent;
  onComplete: () => void;
}) {
  const beeRef = useRef<HTMLDivElement>(null);
  const mosquitoRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const questionBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const beeEl = beeRef.current;
    const mosquitoEl = mosquitoRef.current;
    const burstEl = burstRef.current;
    const badgeEl = questionBadgeRef.current;

    if (!beeEl || !mosquitoEl || !burstEl) return;

    // Determine attack direction based on screen half (so knockback stays in viewport)
    const isRightHalf =
      slam.startX > (typeof window !== "undefined" ? window.innerWidth / 2 : 500);
    // If on right side, mosquito dives from right to left (dir = -1); if on left side, dir = 1
    const dir = isRightHalf ? -1 : 1;

    // Bee initial position right at the clicked subtract button
    gsap.set(beeEl, {
      x: slam.startX,
      y: slam.startY,
      scale: 0,
      opacity: 0,
      rotation: 0,
    });

    // Mosquito starts off-screen / incoming high in the air
    gsap.set(mosquitoEl, {
      x: slam.startX - dir * 250,
      y: slam.startY - 170,
      rotation: dir * 25,
      scale: 0.6,
      opacity: 0,
    });

    // Impact Starburst initial setup
    gsap.set(burstEl, {
      x: slam.startX,
      y: slam.startY - 28,
      scale: 0,
      opacity: 0,
    });

    if (badgeEl) {
      gsap.set(badgeEl, { scale: 0, opacity: 0 });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // 1. Bee pops out innocently from the button
    tl.to(beeEl, {
      y: slam.startY - 28,
      scale: 1.15,
      opacity: 1,
      duration: 0.28,
      ease: "back.out(2)",
    });

    // Question mark / sweat drop pops up above bee's head
    if (badgeEl) {
      tl.to(
        badgeEl,
        {
          scale: 1.1,
          opacity: 1,
          duration: 0.16,
          ease: "back.out(2)",
        },
        "-=0.12"
      );
    }

    // Bee does an innocent gentle hover bob
    tl.to(beeEl, {
      y: slam.startY - 34,
      duration: 0.18,
      ease: "sine.inOut",
    });

    // 2. Mosquito zooms in like a hypersonic missile!
    tl.set(
      mosquitoEl,
      {
        x: slam.startX - dir * 250,
        y: slam.startY - 170,
        rotation: dir * 22,
        scale: 0.7,
        opacity: 1,
      },
      "-=0.18"
    );

    tl.to(mosquitoEl, {
      x: slam.startX,
      y: slam.startY - 28,
      rotation: dir * 12,
      scale: 1.25,
      duration: 0.26,
      ease: "power3.in",
    });

    // 3. COLLISION / SLAM MOMENT!
    // Question bubble instantly vanishes
    if (badgeEl) {
      tl.set(badgeEl, { opacity: 0 }, "<");
    }

    // Comic starburst explodes into view
    tl.set(burstEl, {
      x: slam.startX,
      y: slam.startY - 28,
      scale: 0.2,
      opacity: 1,
    });

    tl.to(burstEl, {
      scale: 1.35,
      duration: 0.12,
      ease: "elastic.out(1.2, 0.4)",
    });

    // Bee gets squished / pancaked on impact!
    tl.to(
      beeEl,
      {
        scaleX: 1.45,
        scaleY: 0.55,
        rotation: -dir * 25,
        duration: 0.06,
        ease: "power4.in",
      },
      "<"
    );

    // 4. RAGDOLL TACKLE / KNOCKBACK!
    // Bee gets launched spinning wildly across the screen into the distance!
    tl.to(beeEl, {
      x: slam.startX + dir * 380,
      y: slam.startY + 160,
      rotation: dir * 720,
      scale: 0.15,
      opacity: 0,
      duration: 0.65,
      ease: "power2.out",
    });

    // Mosquito zooms past through the impact zone, arches upward with a cocky victory dash!
    tl.to(
      mosquitoEl,
      {
        x: slam.startX + dir * 240,
        y: slam.startY - 190,
        rotation: -dir * 40,
        scale: 0.6,
        opacity: 0,
        duration: 0.55,
        ease: "power1.out",
      },
      "<"
    );

    // Starburst expands and fades away
    tl.to(
      burstEl,
      {
        scale: 1.5,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, [slam, onComplete]);

  // If on right side (dir = -1), mosquito flies from right to left (native SVG points left).
  // If on left side (dir = 1), mosquito flies from left to right (scaleX -1 flips it to face right).
  const isRightHalf =
    slam.startX > (typeof window !== "undefined" ? window.innerWidth / 2 : 500);

  return (
    <>
      {/* 1. The Innocent Bee */}
      <div
        ref={beeRef}
        className="absolute will-change-transform pointer-events-none select-none z-[10000]"
        style={{ left: 0, top: 0, transformOrigin: "center center" }}
      >
        <div className="relative w-10 h-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
          {/* Confused / Question Bubble */}
          <div
            ref={questionBadgeRef}
            className="absolute -top-6 -right-2 bg-white/95 px-1.5 py-0.5 rounded-full border border-amber-300 shadow-md font-bold text-xs pointer-events-none"
          >
            ❓
          </div>

          <div className="w-full h-full animate-[bee-body-buzz_0.12s_infinite_ease-in-out]">
            <BeeModelSvg />
          </div>
        </div>
      </div>

      {/* 2. The Sneaky Mosquito */}
      <div
        ref={mosquitoRef}
        className="absolute will-change-transform pointer-events-none select-none z-[10002]"
        style={{ left: 0, top: 0, transformOrigin: "center center" }}
      >
        <div
          className="relative w-14 h-14 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(220,38,38,0.35)]"
          style={{
            transform: isRightHalf ? "none" : "scaleX(-1)",
          }}
        >
          <MosquitoModelSvg />
        </div>
      </div>

      {/* 3. Comic Starburst SLAM! Burst */}
      <div
        ref={burstRef}
        className="absolute will-change-transform pointer-events-none select-none z-[10003]"
        style={{ left: 0, top: 0, transformOrigin: "center center" }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* 16-point comic starburst */}
          <svg
            viewBox="0 0 100 100"
            className="w-28 h-28 overflow-visible filter drop-shadow-[0_4px_14px_rgba(239,68,68,0.55)]"
          >
            {/* Outer golden burst */}
            <polygon
              points="50,0 63,22 88,10 82,35 100,50 82,65 88,90 63,78 50,100 37,78 12,90 18,65 0,50 18,35 12,10 37,22"
              fill="#FACC15"
              stroke="#B91C1C"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Inner red burst */}
            <polygon
              points="50,10 60,26 80,18 75,37 90,50 75,63 80,82 60,74 50,90 40,74 20,82 25,63 10,50 25,37 20,18 40,26"
              fill="#EF4444"
              stroke="#991B1B"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Comic impact dots */}
            <circle cx="28" cy="28" r="3" fill="#FFFFFF" />
            <circle cx="72" cy="72" r="3" fill="#FFFFFF" />
          </svg>

          {/* Comic Exclamation Text */}
          <span className="absolute font-black italic text-white text-base tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] -rotate-6 select-none font-mono">
            {slam.exclamation}
          </span>
        </div>
      </div>
    </>
  );
}

/**
 * Beloved Bee SVG Vector Model
 */
export function BeeModelSvg() {
  return (
    <svg viewBox="0 0 32 32" className="w-10 h-10 overflow-visible" aria-hidden="true">
      {/* Left Fluttering Wing */}
      <g
        style={{
          transformOrigin: "14px 14px",
          animation: "bee-wing-left 0.045s infinite alternate ease-in-out",
        }}
      >
        <ellipse
          cx="9.5"
          cy="7.5"
          rx="6.5"
          ry="3.2"
          transform="rotate(-35 9.5 7.5)"
          fill="#FFFFFF"
          fillOpacity="0.9"
          stroke="#E2E8F0"
          strokeWidth="0.8"
        />
        <path d="M5.5 8C8.5 7.5 12 8 13.5 12" stroke="#CBD5E1" strokeWidth="0.5" fill="none" />
      </g>

      {/* Right Fluttering Wing */}
      <g
        style={{
          transformOrigin: "18px 14px",
          animation: "bee-wing-right 0.045s infinite alternate ease-in-out",
        }}
      >
        <ellipse
          cx="22.5"
          cy="7.5"
          rx="6.5"
          ry="3.2"
          transform="rotate(35 22.5 7.5)"
          fill="#FFFFFF"
          fillOpacity="0.9"
          stroke="#E2E8F0"
          strokeWidth="0.8"
        />
        <path d="M26.5 8C23.5 7.5 20 8 18.5 12" stroke="#CBD5E1" strokeWidth="0.5" fill="none" />
      </g>

      {/* Stinger */}
      <path d="M16 26.5L14.8 23.5H17.2L16 26.5Z" fill="#1C1A17" />

      {/* Abdomen (Golden Yellow Honey Body) */}
      <ellipse cx="16" cy="18" rx="6.5" ry="7.2" fill="#F59E0B" />

      {/* Honeybee Abdomen Stripes */}
      <path
        d="M10.2 15C11.8 14.2 14 14 16 14C18 14 20.2 14.2 21.8 15V16.8C20.2 16 18 15.8 16 15.8C14 15.8 11.8 16 10.2 16.8V15Z"
        fill="#1C1A17"
      />
      <path
        d="M10.6 19.2C12 18.5 13.9 18.2 16 18.2C18.1 18.2 20 18.5 21.4 19.2V21C20 20.3 18.1 20 16 20C13.9 20 12 20.3 10.6 21V19.2Z"
        fill="#1C1A17"
      />

      {/* Head & Thorax */}
      <circle cx="16" cy="10" r="4.2" fill="#1C1A17" />
      <circle cx="16" cy="9.6" r="3.6" fill="#78350F" />

      {/* Cute Glistening Eyes */}
      <circle cx="14.2" cy="9.2" r="1.1" fill="#FFFFFF" />
      <circle cx="14.5" cy="9" r="0.6" fill="#000000" />
      <circle cx="17.8" cy="9.2" r="1.1" fill="#FFFFFF" />
      <circle cx="18.1" cy="9" r="0.6" fill="#000000" />

      {/* Curved Antennae */}
      <path
        d="M14.5 6C13.5 4.5 11.5 4 10.5 4.5"
        stroke="#1C1A17"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M17.5 6C18.5 4.5 20.5 4 21.5 4.5"
        stroke="#1C1A17"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * Cartoon Villain Mosquito SVG Vector Model
 * Sharp needle proboscis, spindly kicking legs, menacing red eye, speed lines
 */
export function MosquitoModelSvg() {
  return (
    <svg viewBox="0 0 48 48" className="w-14 h-14 overflow-visible" aria-hidden="true">
      {/* Speed swoosh trails */}
      <path d="M40 14L48 11" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
      <path d="M38 18L50 17" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
      <path d="M36 22L46 22" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />

      {/* Left Fluttering Wing */}
      <g
        style={{
          transformOrigin: "22px 14px",
          animation: "mosquito-wing 0.035s infinite alternate ease-in-out",
        }}
      >
        <ellipse
          cx="16"
          cy="7"
          rx="7.5"
          ry="2.4"
          transform="rotate(-30 16 7)"
          fill="#E0F2FE"
          fillOpacity="0.85"
          stroke="#38BDF8"
          strokeWidth="0.7"
        />
        <path d="M12 7L20 8" stroke="#0284C7" strokeWidth="0.5" />
      </g>

      {/* Right Fluttering Wing */}
      <g
        style={{
          transformOrigin: "26px 14px",
          animation: "mosquito-wing 0.035s infinite alternate ease-in-out 0.015s",
        }}
      >
        <ellipse
          cx="30"
          cy="7"
          rx="7.5"
          ry="2.4"
          transform="rotate(30 30 7)"
          fill="#E0F2FE"
          fillOpacity="0.85"
          stroke="#38BDF8"
          strokeWidth="0.7"
        />
        <path d="M24 8L32 7" stroke="#0284C7" strokeWidth="0.5" />
      </g>

      {/* Spindly Legs (Flying Kick Tackling Stance!) */}
      {/* Front kicking legs */}
      <path
        d="M20 22L12 26L6 24"
        stroke="#0F172A"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M21 24L14 30L9 30"
        stroke="#0F172A"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Back trailing legs */}
      <path
        d="M28 24L36 28L40 34"
        stroke="#0F172A"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M26 22L32 26L38 31"
        stroke="#0F172A"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Slender Segmented Abdomen */}
      <path
        d="M25 20C30 21 38 24 41 29C40 30 37 30 31 27C28 25 25 22 25 20Z"
        fill="#334155"
      />
      {/* Abdomen white stripes */}
      <path d="M29 22C31 23 33 24 34 25.5" stroke="#F1F5F9" strokeWidth="0.9" fill="none" />
      <path d="M33 24.5C35 25.5 37 27 38 28.5" stroke="#F1F5F9" strokeWidth="0.9" fill="none" />

      {/* Thorax */}
      <ellipse cx="22" cy="19" rx="5" ry="3.8" fill="#1E293B" />

      {/* Head */}
      <circle cx="16" cy="18" r="3.4" fill="#0F172A" />

      {/* Sharp Menacing Proboscis (Needle Nose) */}
      <path d="M14 19L2 21" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="2" cy="21" r="0.9" fill="#991B1B" />

      {/* Big Angry Red Eye with white evil glint */}
      <ellipse cx="15.5" cy="17" rx="2" ry="2.4" fill="#EF4444" />
      <circle cx="15" cy="16.2" r="0.7" fill="#FFFFFF" />

      {/* Little angry black eyebrow */}
      <path d="M14 14.8L17.5 15.8" stroke="#000000" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
