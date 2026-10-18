"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Hexagon,
  ArrowLeft,
  LayoutDashboard,
  Home,
  Droplet,
  Cpu,
  Brain,
  Wifi,
  WifiOff,
} from "lucide-react";
import SensorTelemetryDashboard from "@/components/SensorTelemetryDashboard";

export default function SensorsPage() {
  const [isVirtualHiveConnected, setIsVirtualHiveConnected] = useState(true);
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#24201d]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e8e1d7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/beekeeper"
              className="p-2 text-[#7c7267] hover:text-[#24201d] bg-white border border-[#e0d7cb] rounded-lg hover:bg-[#f5ede2] transition-all"
              title="Return to Beekeeper Portal"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="w-9 h-9 bg-[#f7efe4] border border-[#e8ded0] rounded-lg flex items-center justify-center text-[#b45309] shrink-0 group-hover:scale-105 transition-transform">
                <Hexagon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#24201d] group-hover:text-[var(--signature)] transition-colors block leading-tight">
                  BEE safe
                </span>
                <span className="text-[10px] block text-[#7c7267] font-medium tracking-wide uppercase">
                  Telemetry Monitoring Center
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/beekeeper"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-[#574f46] bg-white border border-[#e0d7cb] rounded-lg hover:bg-[#f5ede2] transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#b45309]" />
              <span className="hidden sm:inline">Beekeeper Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 pb-24 md:pb-8 space-y-6">
        {/* Reference Top Hive Status Card */}
        <div className="bg-[#fff8ec] border border-[#f3e3ca] rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4">
            {/* Bee Avatar */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center shrink-0 shadow-2xs">
              <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 36 36" fill="none">
                {/* Top Wings */}
                <ellipse cx="21" cy="11" rx="6.5" ry="4" transform="rotate(-25 21 11)" fill="#7dd3fc" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="1" />
                <ellipse cx="14" cy="10" rx="5.5" ry="3.5" transform="rotate(-60 14 10)" fill="#bae6fd" fillOpacity="0.85" stroke="#7dd3fc" strokeWidth="1" />

                {/* Little Legs */}
                <path d="M14 26 L12 30" stroke="#312e81" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M18 27 L18 31" stroke="#312e81" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M22 26 L24 30" stroke="#312e81" strokeWidth="1.5" strokeLinecap="round" />

                {/* Body */}
                <ellipse cx="18" cy="20" rx="9" ry="7.5" fill="#f59e0b" />
                {/* Stripes */}
                <path d="M13.5 13 C15 12.8 17 12.8 18.5 13 L18.5 27 C17 27.2 15 27.2 13.5 27 Z" fill="#312e81" />
                <path d="M20.5 13.8 C21.8 14.5 22.8 15.5 23.5 17.5 L23.5 23 C22.8 25 21.8 26 20.5 26.5 Z" fill="#312e81" />

                {/* Stinger */}
                <polygon points="9,20 6.5,20 9,21" fill="#1e1b4b" />

                {/* Antennae */}
                <path d="M24 16 C25.5 14 27 13 28.5 13" stroke="#1e1b4b" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="28.5" cy="13" r="0.8" fill="#1e1b4b" />
                <path d="M23 15 C23.5 13 24.5 11.5 25.5 11" stroke="#1e1b4b" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="25.5" cy="11" r="0.8" fill="#1e1b4b" />

                {/* Face Eye */}
                <circle cx="23.5" cy="19.5" r="1.2" fill="#1e1b4b" />
              </svg>
            </div>

            {/* Details */}
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                  HC-HIVE-02
                </h2>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  isVirtualHiveConnected
                    ? "bg-[#e0f2fe] text-[#0284c7]"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    isVirtualHiveConnected ? "bg-[#0284c7] animate-pulse" : "bg-gray-400"
                  }`} />
                  {isVirtualHiveConnected ? "IoT Simulated" : "Disconnected"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#78716c] font-normal flex-wrap mt-0.5">
                <span className="font-semibold text-[#9a3412]">Mustard Flower (Sarson)</span>
                <span className="text-[#a8a29e]">•</span>
                <span>Updated 11 min ago</span>
                <span className="text-[#a8a29e]">•</span>
                <span>Digital Twin</span>
              </div>
            </div>
          </div>

          {/* Right Action Button */}
          <button
            type="button"
            onClick={() => setIsVirtualHiveConnected(!isVirtualHiveConnected)}
            className={`inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer shadow-2xs self-start sm:self-center ${
              isVirtualHiveConnected
                ? "text-[#15803d] bg-[#ecfdf5] border border-[#86efac] hover:bg-[#dcfce7]"
                : "text-[#665e55] bg-white border border-[#e0d7cb] hover:bg-[#f5ede2]"
            }`}
          >
            {isVirtualHiveConnected ? (
              <>
                <Wifi className="w-4 h-4 text-[#10b981]" />
                <span>Disconnect Virtual Hive</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-[#7c7267]" />
                <span>Connect Virtual Hive</span>
              </>
            )}
          </button>
        </div>

        <SensorTelemetryDashboard />
      </main>

      {/* Footer */}
      <footer className="hidden md:block border-t border-[#e8e1d7] bg-white/50 py-4 px-4 sm:px-6 text-center text-xs text-[#8a7f72]">
        BEE safe Precision Apiculture &copy; 2026 • IoT Telemetry Node Interface v2.4
      </footer>

      {/* ======================================================== */}
      {/* FIXED MOBILE BOTTOM NAVIGATION BAR (MATCHING REFERENCE)  */}
      {/* Icon on top, label directly underneath                  */}
      {/* ======================================================== */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-[#e8e1d7] py-2 px-1 flex items-center justify-around shadow-lg">
        <Link
          href="/beekeeper"
          className="flex flex-col items-center justify-center flex-1 py-1 text-[#7c7267] hover:text-[#24201d]"
        >
          <Home className="w-5 h-5 mb-1 stroke-[1.8]" />
          <span className="text-[11px] font-medium leading-none">Home</span>
        </Link>
        <Link
          href="/beekeeper"
          className="flex flex-col items-center justify-center flex-1 py-1 text-[#7c7267] hover:text-[#24201d]"
        >
          <Hexagon className="w-5 h-5 mb-1 stroke-[1.8]" />
          <span className="text-[11px] font-medium leading-none">Hives</span>
        </Link>
        <Link
          href="/beekeeper"
          className="flex flex-col items-center justify-center flex-1 py-1 text-[#7c7267] hover:text-[#24201d]"
        >
          <Droplet className="w-5 h-5 mb-1 stroke-[1.8]" />
          <span className="text-[11px] font-medium leading-none">Harvest</span>
        </Link>
        <Link
          href="/sensors"
          className="flex flex-col items-center justify-center flex-1 py-1 text-[#1c1917] font-bold"
        >
          <Cpu className="w-5 h-5 mb-1 text-[#b45309] stroke-[2.4] scale-110" />
          <span className="text-[11px] font-bold leading-none text-[#1c1917]">Sensors</span>
        </Link>
        <Link
          href="/beekeeper?tab=advisor"
          className="flex flex-col items-center justify-center flex-1 py-1 text-[#7c7267] hover:text-[#24201d]"
        >
          <Brain className="w-5 h-5 mb-1 stroke-[1.8]" />
          <span className="text-[11px] font-medium leading-none">AI Advisory</span>
        </Link>
      </nav>
    </div>
  );
}
