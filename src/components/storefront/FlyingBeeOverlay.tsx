"use client";

import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface BeeFlight {
  id: string;
  startX: number;
  startY: number;
  startTime: number;
}

interface PollenParticle {
  id: string;
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

export function FlyingBeeOverlay() {
  const [flights, setFlights] = useState<BeeFlight[]>([]);
  const [particles, setParticles] = useState<PollenParticle[]>([]);

  useEffect(() => {
    const handleFlightStart = (e: Event) => {
      const customEvent = e as CustomEvent<{ x?: number; y?: number }>;
      const startX = customEvent.detail?.x ?? window.innerWidth / 2;
      const startY = customEvent.detail?.y ?? window.innerHeight / 2;

      const newFlight: BeeFlight = {
        id: `bee-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        startX,
        startY,
        startTime: performance.now(),
      };

      setFlights((prev) => [...prev, newFlight]);
    };

    window.addEventListener("bee-flight-start", handleFlightStart);
    return () => window.removeEventListener("bee-flight-start", handleFlightStart);
  }, []);

  const handleFlightComplete = (flightId: string) => {
    // Notify the Beehive cart icon to bounce and fill
    window.dispatchEvent(new CustomEvent("beehive-filled"));
    setFlights((prev) => prev.filter((f) => f.id !== flightId));
  };

  const addParticle = (x: number, y: number) => {
    const pId = `p-${Date.now()}-${Math.random()}`;
    setParticles((prev) => [
      ...prev.slice(-16), // keep particle count tidy
      { id: pId, x, y, scale: 0.8 + Math.random() * 0.4, opacity: 0.9 },
    ]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== pId));
    }, 450);
  };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Pollen trail particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B] transition-opacity duration-300 pointer-events-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: `translate(-50%, -50%) scale(${p.scale})`,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Active Flights */}
      {flights.map((flight) => (
        <BeeFlightRunner
          key={flight.id}
          flight={flight}
          onComplete={() => handleFlightComplete(flight.id)}
          onEmitParticle={addParticle}
        />
      ))}
    </div>
  );
}

function BeeFlightRunner({
  flight,
  onComplete,
  onEmitParticle,
}: {
  flight: BeeFlight;
  onComplete: () => void;
  onEmitParticle: (x: number, y: number) => void;
}) {
  // Phase state: "tick" (0-380ms) -> "morph" (380-680ms) -> "fly" (680-1550ms) -> "drop" (1550-1850ms)
  const [phase, setPhase] = useState<"tick" | "morph" | "fly" | "drop">("tick");
  const [pos, setPos] = useState({ x: flight.startX, y: flight.startY, angle: -15, scale: 1, opacity: 1 });

  useEffect(() => {
    let animFrame: number;
    const startT = performance.now();
    let lastParticleTime = 0;

    const tickDuration = 380;
    const morphDuration = 300;
    const flyDuration = 870;

    const tickEnd = tickDuration;
    const morphEnd = tickEnd + morphDuration;
    const flyEnd = morphEnd + flyDuration;

    const updateFrame = () => {
      const now = performance.now();
      const elapsed = now - startT;

      // Locate the beehive cart icon in the header for real-time tracking
      const cartEl = document.getElementById("header-beehive-cart");
      const targetRect = cartEl
        ? cartEl.getBoundingClientRect()
        : { left: window.innerWidth - 60, top: 25, width: 40, height: 40 };

      // Target the entrance arch of the beehive
      const targetX = targetRect.left + targetRect.width / 2;
      const targetY = targetRect.top + targetRect.height * 0.65;

      if (elapsed < tickEnd) {
        // Phase 1: Tick pop
        setPhase("tick");
        setPos({
          x: flight.startX,
          y: flight.startY,
          angle: 0,
          scale: 1,
          opacity: 1,
        });
        animFrame = requestAnimationFrame(updateFrame);
      } else if (elapsed < morphEnd) {
        // Phase 2: Morphing from tick to bee with tiny buzz
        setPhase("morph");
        const morphProgress = (elapsed - tickEnd) / morphDuration;
        const hoverWobble = Math.sin(morphProgress * Math.PI * 4) * 3;
        setPos({
          x: flight.startX,
          y: flight.startY + hoverWobble,
          angle: -10 + morphProgress * 15,
          scale: 1 + Math.sin(morphProgress * Math.PI) * 0.15,
          opacity: 1,
        });
        animFrame = requestAnimationFrame(updateFrame);
      } else if (elapsed < flyEnd) {
        // Phase 3: Flight trajectory via quadratic bezier curve
        setPhase("fly");
        const flyProgress = (elapsed - morphEnd) / flyDuration;
        // EaseInOutCubic easing
        const t =
          flyProgress < 0.5
            ? 4 * flyProgress * flyProgress * flyProgress
            : 1 - Math.pow(-2 * flyProgress + 2, 3) / 2;

        // Curved arc control point: flies upwards and inwards
        const cpX = (flight.startX + targetX) / 2;
        const dist = Math.hypot(targetX - flight.startX, targetY - flight.startY);
        const arcHeight = Math.max(120, dist * 0.35);
        const cpY = Math.min(flight.startY, targetY) - arcHeight;

        // Quadratic bezier position
        const invT = 1 - t;
        const currentX = invT * invT * flight.startX + 2 * invT * t * cpX + t * t * targetX;
        const currentY = invT * invT * flight.startY + 2 * invT * t * cpY + t * t * targetY;

        // Natural buzzing wobble
        const wobble = Math.sin(t * Math.PI * 10) * 6;

        // Tangent direction for flight angle
        const dx = 2 * invT * (cpX - flight.startX) + 2 * t * (targetX - cpX);
        const dy = 2 * invT * (cpY - flight.startY) + 2 * t * (targetY - cpY);
        const tangentAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

        // Periodically emit golden honey pollen particles
        if (now - lastParticleTime > 70) {
          onEmitParticle(currentX, currentY);
          lastParticleTime = now;
        }

        setPos({
          x: currentX + wobble * 0.3,
          y: currentY,
          angle: tangentAngle + wobble * 0.5,
          scale: 1,
          opacity: 1,
        });

        animFrame = requestAnimationFrame(updateFrame);
      } else if (elapsed < flyEnd + 260) {
        // Phase 4: Dropping straight into the hive entrance
        setPhase("drop");
        const dropProgress = (elapsed - flyEnd) / 260;
        setPos({
          x: targetX,
          y: targetY + dropProgress * 6,
          angle: 180, // diving down
          scale: Math.max(0.1, 1 - dropProgress * 0.9),
          opacity: Math.max(0, 1 - dropProgress * 1.2),
        });
        animFrame = requestAnimationFrame(updateFrame);
      } else {
        // Flight finished
        onComplete();
      }
    };

    animFrame = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animFrame);
  }, [flight, onComplete, onEmitParticle]);

  return (
    <div
      className="absolute transition-transform will-change-transform"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: `translate(-50%, -50%) rotate(${pos.angle}deg) scale(${pos.scale})`,
        opacity: pos.opacity,
      }}
    >
      {phase === "tick" && (
        <div className="w-10 h-10 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-xl border-2 border-white animate-[tick-pop_0.38s_cubic-bezier(0.175,0.885,0.32,1.275)]">
          <Check className="w-6 h-6 stroke-[3]" />
        </div>
      )}

      {(phase === "morph" || phase === "fly" || phase === "drop") && (
        <div className="relative w-9 h-9 flex items-center justify-center filter drop-shadow-md">
          {/* Detailed Animated Bee SVG */}
          <svg viewBox="0 0 32 32" className="w-9 h-9 overflow-visible" aria-hidden="true">
            {/* Left Fluttering Wing */}
            <g
              style={{
                transformOrigin: "14px 14px",
                animation: "bee-wing-left 0.055s infinite alternate ease-in-out",
              }}
            >
              <ellipse
                cx="9.5"
                cy="7.5"
                rx="6.5"
                ry="3.2"
                transform="rotate(-35 9.5 7.5)"
                fill="#FFFFFF"
                fillOpacity="0.88"
                stroke="#E2E8F0"
                strokeWidth="0.8"
              />
              <path d="M5.5 8C8.5 7.5 12 8 13.5 12" stroke="#CBD5E1" strokeWidth="0.5" fill="none" />
            </g>

            {/* Right Fluttering Wing */}
            <g
              style={{
                transformOrigin: "18px 14px",
                animation: "bee-wing-right 0.055s infinite alternate ease-in-out",
              }}
            >
              <ellipse
                cx="22.5"
                cy="7.5"
                rx="6.5"
                ry="3.2"
                transform="rotate(35 22.5 7.5)"
                fill="#FFFFFF"
                fillOpacity="0.88"
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
        </div>
      )}
    </div>
  );
}
