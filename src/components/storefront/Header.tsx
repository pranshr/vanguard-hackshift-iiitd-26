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
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand identity */}
        <Link href="/" className="flex items-baseline gap-2.5 group">
          <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-[#1C1A17] group-hover:text-[#8A4B12] transition-colors">
            Madhuvan
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#3F4A3A] bg-[#EDE4D4] border border-[#DDD3C2] px-1.5 py-0.5 rounded">
            HoneyChain Proof
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-[#8A4B12] font-semibold border-b-2 border-[#8A4B12] pb-0.5"
                    : "text-[#665E55] hover:text-[#1C1A17]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Beekeeper Portal & Cart */}
        <div className="flex items-center gap-3">
          <Link
            href="/beekeeper"
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono text-[#665E55] hover:text-[#1C1A17] px-2.5 py-1.5 rounded border border-transparent hover:border-[#E3DACB] transition-all"
            title="Switch to Beekeeper & Hardware Portal"
          >
            <span>Beekeeper Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/verify"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-[#2F6B3A] bg-[#EBF2EB] border border-[#CDE0CD] rounded hover:bg-[#DCEBDC] transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verify Batch</span>
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center w-10 h-10 rounded border border-[#E3DACB] bg-white text-[#1C1A17] hover:border-[#8A4B12] transition-colors"
            aria-label="View shopping cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#8A4B12]" />
            {isHydrated && totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-[#8A4B12] text-white text-[10px] font-mono font-bold flex items-center justify-center rounded px-1">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-[#1C1A17] border border-[#E3DACB] rounded bg-white hover:bg-[#EDE6D8]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E3DACB] bg-[#F6F1E7] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#1C1A17] rounded hover:bg-[#EBE2D3]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#E3DACB] space-y-2">
            <Link
              href="/verify"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-mono text-[#2F6B3A] bg-[#EBF2EB] rounded border border-[#CDE0CD]"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Scan or Enter Batch Code
              </span>
              <span>→</span>
            </Link>
            <Link
              href="/beekeeper"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-xs font-mono text-[#665E55] bg-white rounded border border-[#E3DACB]"
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
