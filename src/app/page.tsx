"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Thermometer,
  Droplets,
  Scale,
  Activity,
  ArrowRight,
  ShieldCheck,
  Hexagon,
  ShoppingBag,
  LogIn,
  UserPlus,
  Menu,
  X,
} from "lucide-react";

export default function LandingPage() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showMarketModal, setShowMarketModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#24201d]">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e8e1d7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#f7efe4] border border-[#e8e1d7] rounded-lg flex items-center justify-center text-[#b45309] shrink-0">
              <Hexagon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#24201d]">
                BEE-Safe
              </span>
              <span className="text-[10px] sm:text-xs block text-[#7c7267] font-medium tracking-wide uppercase">
                Smart Apiculture
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            {/* Marketplace Button */}
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#4b433b] bg-white border border-[#e0d7cb] rounded-lg hover:bg-[#f5ede2] hover:border-[#cfc4b5] transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-[#b45309]" />
              Marketplace
            </Link>

            {/* Register Button */}
            <button
              onClick={() => setShowRegisterModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#4b433b] bg-white border border-[#e0d7cb] rounded-lg hover:bg-[#f5ede2] hover:border-[#cfc4b5] transition-all"
            >
              <UserPlus className="w-4 h-4 text-[#7c7267]" />
              Register
            </button>

            {/* Login Button -> goes directly to Beekeeper page */}
            <Link
              href="/beekeeper"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-[#b45309] border border-[#92400e] rounded-lg hover:bg-[#92400e] transition-all shadow-xs"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </nav>

          {/* Mobile Quick Action & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/beekeeper"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#b45309] rounded-lg"
            >
              <LogIn className="w-3.5 h-3.5" />
              Login
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#4b433b] hover:bg-[#f5ede2] rounded-lg border border-[#e0d7cb]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#e8e1d7] bg-[#faf8f5] px-4 py-3 space-y-2">
            <Link
              href="/marketplace"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-[#4b433b] bg-white border border-[#e0d7cb] rounded-lg hover:bg-[#f5ede2]"
            >
              <ShoppingBag className="w-4 h-4 text-[#b45309]" />
              Marketplace
            </Link>
            <button
              onClick={() => {
                setShowRegisterModal(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-[#4b433b] bg-white border border-[#e0d7cb] rounded-lg hover:bg-[#f5ede2]"
            >
              <UserPlus className="w-4 h-4 text-[#7c7267]" />
              Register
            </button>
            <Link
              href="/beekeeper"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-[#b45309] rounded-lg hover:bg-[#92400e]"
            >
              <LogIn className="w-4 h-4" />
              Login to Beekeeper Portal
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-10 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#f7efe4] border border-[#e8ded0] text-xs font-semibold text-[#b45309] mb-4 sm:mb-6">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Next-Generation Hive Health & Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#24201d] leading-tight mb-4 sm:mb-6">
              Precision Telemetry & Acoustic Monitoring for Modern Beekeepers
            </h1>

            <p className="text-base sm:text-lg text-[#665e55] leading-relaxed mb-6 sm:mb-8">
              BEE-Safe combines real-time acoustic sensing, precision weight tracking,
              and microclimate diagnostics to protect bee colonies, prevent swarming,
              and maximize honey yields.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="/beekeeper"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-[#b45309] border border-[#92400e] rounded-lg hover:bg-[#92400e] transition-all shadow-xs text-center"
              >
                Enter Beekeeper Portal
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-medium text-[#4b433b] bg-white border border-[#e0d7cb] rounded-lg hover:bg-[#f5ede2] transition-all text-center"
              >
                Explore Marketplace
              </Link>
            </div>
          </div>

          {/* 4 Core Monitored Metrics Showcase */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-[#e8e1d7]">
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#8b8073] mb-4 sm:mb-6">
              Active Hive Telemetry Parameters
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {/* Temperature */}
              <div className="p-4 sm:p-5 bg-white border border-[#e8e1d7] rounded-lg shadow-xs hover:border-[#b45309]/50 transition-all">
                <div className="w-10 h-10 rounded-md bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309] mb-3 sm:mb-4">
                  <Thermometer className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-[#24201d] mb-1">
                  Temperature
                </h3>
                <p className="text-xs sm:text-sm text-[#665e55] leading-normal">
                  Real-time brood core vs ambient monitoring to ensure steady 34°C–36°C larval incubation.
                </p>
              </div>

              {/* Humidity */}
              <div className="p-4 sm:p-5 bg-white border border-[#e8e1d7] rounded-lg shadow-xs hover:border-[#b45309]/50 transition-all">
                <div className="w-10 h-10 rounded-md bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309] mb-3 sm:mb-4">
                  <Droplets className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-[#24201d] mb-1">
                  Humidity
                </h3>
                <p className="text-xs sm:text-sm text-[#665e55] leading-normal">
                  In-hive relative humidity tracking to prevent chalkbrood fungal outbreaks and moisture buildup.
                </p>
              </div>

              {/* Hive Weight */}
              <div className="p-4 sm:p-5 bg-white border border-[#e8e1d7] rounded-lg shadow-xs hover:border-[#b45309]/50 transition-all">
                <div className="w-10 h-10 rounded-md bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309] mb-3 sm:mb-4">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-[#24201d] mb-1">
                  Hive Weight
                </h3>
                <p className="text-xs sm:text-sm text-[#665e55] leading-normal">
                  Continuous strain-gauge load cell monitoring to track nectar flow influx and honey super readiness.
                </p>
              </div>

              {/* Bee Acoustic Monitoring */}
              <div className="p-4 sm:p-5 bg-white border border-[#e8e1d7] rounded-lg shadow-xs hover:border-[#b45309]/50 transition-all">
                <div className="w-10 h-10 rounded-md bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309] mb-3 sm:mb-4">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-[#24201d] mb-1">
                  Bee Acoustic Monitoring
                </h3>
                <p className="text-xs sm:text-sm text-[#665e55] leading-normal">
                  Sound frequency spectrum analysis to detect queen piping, colony distress, and pre-swarming spikes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e8e1d7] bg-[#faf8f5] py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-[#7c7267] gap-4 text-center sm:text-left">
          <p>© 2026 BEE-Safe Apiculture System. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6 font-medium">
            <span className="hover:text-[#24201d] cursor-pointer">Telemetry Specs</span>
            <span className="hover:text-[#24201d] cursor-pointer">Privacy</span>
            <span className="hover:text-[#24201d] cursor-pointer">Support</span>
          </div>
        </div>
      </footer>

      {/* Register Modal / Placeholder */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 sm:p-6 w-full max-w-md shadow-lg">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#e8e1d7]">
              <h3 className="text-base sm:text-lg font-bold text-[#24201d]">Register New Apiarist</h3>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-[#7c7267] hover:text-[#24201d] text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#574f46] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ritesh Kumar"
                  className="w-full px-3 py-2 text-sm border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#b45309]"
                  defaultValue="Ritesh Kumar"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#574f46] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="apiarist@beesafe.org"
                  className="w-full px-3 py-2 text-sm border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#b45309]"
                  defaultValue="apiarist@beesafe.org"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#574f46] mb-1">
                  Apiary Location
                </label>
                <input
                  type="text"
                  placeholder="North Orchard Yard, Sector 4"
                  className="w-full px-3 py-2 text-sm border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#b45309]"
                  defaultValue="Meadow Apiary Yard"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                onClick={() => setShowRegisterModal(false)}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-[#574f46] bg-[#f7efe4] rounded-lg hover:bg-[#ede3d5]"
              >
                Cancel
              </button>
              <Link
                href="/beekeeper"
                className="w-full sm:w-auto text-center px-4 py-2 text-sm font-semibold text-white bg-[#b45309] rounded-lg hover:bg-[#92400e]"
              >
                Register & Enter Portal
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Marketplace Modal / Placeholder */}
      {showMarketModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 sm:p-6 w-full max-w-lg shadow-lg">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#e8e1d7]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#b45309]" />
                <h3 className="text-base sm:text-lg font-bold text-[#24201d]">Apiculture Marketplace</h3>
              </div>
              <button
                onClick={() => setShowMarketModal(false)}
                className="text-[#7c7267] hover:text-[#24201d] text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#665e55] mb-4">
              Direct marketplace for raw certified organic honey, beeswax products, and smart beekeeping hardware.
            </p>
            <div className="space-y-2.5 sm:space-y-3">
              <div className="p-3 border border-[#e8e1d7] rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-[#24201d]">
                    Pure Raw Wildflower Honey (1kg)
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#7c7267]">
                    Moisture &lt;17.8% • Hive #02 Meadow
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#b45309]">₹650</span>
              </div>
              <div className="p-3 border border-[#e8e1d7] rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-[#24201d]">
                    Acoustic Hive Sensor Node v2
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#7c7267]">
                    Frequency microphone + Temp/Humidity
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#b45309]">₹2,800</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowMarketModal(false)}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-[#574f46] bg-[#f7efe4] rounded-lg hover:bg-[#ede3d5]"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
