"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, ShieldCheck, Menu, X, ArrowUpRight } from "lucide-react";

export function StorefrontHeader() {
  const pathname = usePathname();
  const { totalCount, isHydrated } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/shop", label: "Shop Origins" },
    { href: "/verify", label: "Verify a Jar" },
    { href: "/our-hives", label: "Our Hives & IoT" },
    { href: "/sensors", label: "Live Telemetry" },
    { href: "/marketplace", label: "Apiary Supplies" },
  ];

  const isActive = (href: string) => {
    if (href === "/shop" && (pathname === "/shop" || pathname.startsWith("/shop/"))) return true;
    if (href === "/verify" && (pathname === "/verify" || pathname.startsWith("/verify/"))) return true;
    if (href === "/sensors" && (pathname === "/sensors" || pathname === "/sensor-data")) return true;
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F6F1E7]/95 backdrop-blur-md border-b border-[#E3DACB]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <span className="font-serif text-2xl font-bold tracking-tight text-[#1C1A17] group-hover:text-[#8A4B12] transition-colors whitespace-nowrap">
            Madhuvan
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#3F4A3A] bg-[#EDE4D4] border border-[#DDD3C2] px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
            HoneyChain
          </span>
        </Link>

        {/* Desktop Nav - lg+ only to guarantee zero wrapping */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 shrink-0">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs xl:text-sm font-medium whitespace-nowrap transition-colors py-1 ${
                  active
                    ? "text-[#8A4B12] font-semibold border-b-2 border-[#8A4B12]"
                    : "text-[#665E55] hover:text-[#1C1A17]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <Link
            href="/beekeeper"
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-mono text-[#665E55] hover:text-[#1C1A17] px-2.5 py-1.5 rounded-lg border border-[#E3DACB] bg-white hover:bg-[#FAF7F2] whitespace-nowrap transition-colors"
            title="Switch to Beekeeper & Hardware Portal"
          >
            <span>Beekeeper Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/verify"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-[#2F6B3A] bg-[#EBF2EB] border border-[#CDE0CD] rounded-lg hover:bg-[#DCEBDC] whitespace-nowrap transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Verify Batch</span>
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E3DACB] bg-white text-[#1C1A17] hover:border-[#8A4B12] transition-colors shrink-0"
            aria-label="View shopping cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#8A4B12]" />
            {isHydrated && totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-[#8A4B12] text-white text-[10px] font-mono font-bold flex items-center justify-center rounded-full px-1">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Mobile/Tablet hamburger (visible on < lg) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-[#1C1A17] border border-[#E3DACB] rounded-lg bg-white hover:bg-[#EDE6D8] shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E3DACB] bg-[#F6F1E7] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[#1C1A17] rounded-lg hover:bg-[#EBE2D3]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#E3DACB] space-y-2">
            <Link
              href="/verify"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-xs font-mono font-semibold text-[#2F6B3A] bg-[#EBF2EB] rounded-lg border border-[#CDE0CD]"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Scan or Enter Batch Code</span>
              </span>
              <span>→</span>
            </Link>
            <Link
              href="/beekeeper"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-xs font-mono text-[#665E55] bg-white rounded-lg border border-[#E3DACB]"
            >
              <span>Beekeeper & Telemetry Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
