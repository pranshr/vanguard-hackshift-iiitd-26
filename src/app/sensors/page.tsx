"use client";

import Link from "next/link";
import { Hexagon, ArrowLeft, LayoutDashboard, Bell, ShieldCheck } from "lucide-react";
import SensorTelemetryDashboard from "@/components/SensorTelemetryDashboard";

export default function SensorsPage() {
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

            <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 bg-[#f7efe4] border border-[#e8e1d7] rounded-lg flex items-center justify-center text-[#b45309] shrink-0">
                <Hexagon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold tracking-tight text-[#24201d]">
                  BEE-Safe
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <SensorTelemetryDashboard />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e8e1d7] bg-white/50 py-4 px-4 sm:px-6 text-center text-xs text-[#8a7f72]">
        BEE-Safe Precision Apiculture &copy; {new Date().getFullYear()} • IoT Telemetry Node Interface v2.4
      </footer>
    </div>
  );
}
