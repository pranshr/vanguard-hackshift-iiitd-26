"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { BeehiveCartIcon } from "@/components/storefront/BeehiveCartIcon";
import {
  ChevronDown,
  Menu,
  X,
  Cpu,
} from "lucide-react";

export function StorefrontHeader() {
  const pathname = usePathname();
  const { totalCount, isHydrated } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);

  const shopRef = useRef<HTMLDivElement>(null);
  const learnRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (shopRef.current && !shopRef.current.contains(event.target as Node)) {
        setShopDropdownOpen(false);
      }
      if (learnRef.current && !learnRef.current.contains(event.target as Node)) {
        setLearnDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShopDropdownOpen(false);
        setLearnDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[var(--paper)]/95 backdrop-blur-md border-b border-[var(--line)]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand identity: left */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <span className="font-serif text-2xl sm:text-[26px] font-bold tracking-tight text-[var(--ink)] group-hover:text-[var(--signature)] transition-colors">
            BEE safe
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--forest)] bg-[var(--tag-bg)] border border-[var(--tag-border)] px-2 py-0.5 rounded-full whitespace-nowrap">
            HoneyChain
          </span>
        </Link>

        {/* Center Nav with dropdowns: Desktop */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-sans text-[var(--ink)]"
          aria-label="Main Navigation"
        >
          {/* Shop dropdown */}
          <div className="relative" ref={shopRef}>
            <button
              onClick={() => {
                setShopDropdownOpen(!shopDropdownOpen);
                setLearnDropdownOpen(false);
              }}
              onMouseEnter={() => setShopDropdownOpen(true)}
              className="flex items-center gap-1.5 py-2 font-medium hover:text-[var(--signature)] transition-colors cursor-pointer"
              aria-expanded={shopDropdownOpen}
              aria-haspopup="true"
            >
              <span>Shop</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {shopDropdownOpen && (
              <div
                onMouseLeave={() => setShopDropdownOpen(false)}
                className="absolute top-full left-0 mt-1 w-72 rounded-2xl bg-[var(--sand)] border border-[var(--line)] shadow-xl p-2.5 space-y-1.5 z-50"
              >
                <Link
                  href="/shop/muzaffarpur-litchi"
                  onClick={() => setShopDropdownOpen(false)}
                  className="group flex items-center justify-between gap-3 px-3 py-2 text-xs rounded-xl hover:bg-[var(--card-tint)] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-[var(--ink)] block truncate group-hover:text-[var(--signature)] transition-colors">
                      Muzaffarpur Litchi
                    </span>
                    <span className="text-[10px] text-[var(--muted-ink)] block truncate">
                      Floral & delicate
                    </span>
                  </div>
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[var(--line)] bg-white shrink-0 shadow-2xs">
                    <Image
                      src="/images/honey-litchi.jpg"
                      alt="Muzaffarpur Litchi Blossom Raw Honey"
                      fill
                      sizes="36px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <Link
                  href="/shop/kashmir-white-acacia"
                  onClick={() => setShopDropdownOpen(false)}
                  className="group flex items-center justify-between gap-3 px-3 py-2 text-xs rounded-xl hover:bg-[var(--card-tint)] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-[var(--ink)] block truncate group-hover:text-[var(--signature)] transition-colors">
                      Kashmir White Acacia
                    </span>
                    <span className="text-[10px] text-[var(--muted-ink)] block truncate">
                      Water-white & vanilla
                    </span>
                  </div>
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[var(--line)] bg-white shrink-0 shadow-2xs">
                    <Image
                      src="/images/honey-acacia.jpg"
                      alt="Kashmir White Acacia Raw Honey"
                      fill
                      sizes="36px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <Link
                  href="/shop/sundarbans-wild-mangrove"
                  onClick={() => setShopDropdownOpen(false)}
                  className="group flex items-center justify-between gap-3 px-3 py-2 text-xs rounded-xl hover:bg-[var(--card-tint)] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-[var(--ink)] block truncate group-hover:text-[var(--signature)] transition-colors">
                      Sundarbans Mangrove
                    </span>
                    <span className="text-[10px] text-[var(--muted-ink)] block truncate">
                      Bold & saline
                    </span>
                  </div>
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[var(--line)] bg-white shrink-0 shadow-2xs">
                    <Image
                      src="/images/honey-mangrove.jpg"
                      alt="Sundarbans Wild Mangrove Forest Honey"
                      fill
                      sizes="36px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <Link
                  href="/shop/terroir-tasting-trio"
                  onClick={() => setShopDropdownOpen(false)}
                  className="group flex items-center justify-between gap-3 px-3 py-2 text-xs rounded-xl hover:bg-[var(--card-tint)] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-[var(--ink)] block truncate group-hover:text-[var(--signature)] transition-colors">
                      Terroir Tasting Trio
                    </span>
                    <span className="text-[10px] text-[var(--muted-ink)] block truncate">
                      3-origin gift box
                    </span>
                  </div>
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[var(--line)] bg-white shrink-0 shadow-2xs">
                    <Image
                      src="/images/honey-trio.jpg"
                      alt="Terroir Tasting Trio Gift Set"
                      fill
                      sizes="36px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="pt-1.5 border-t border-[var(--line)]">
                  <Link
                    href="/shop"
                    onClick={() => setShopDropdownOpen(false)}
                    className="block px-3 py-2 text-xs font-semibold text-[var(--ink)] hover:text-[var(--signature)] rounded-xl hover:bg-[var(--card-tint)] transition-colors"
                  >
                    Shop all origins →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Our Story */}
          <Link
            href="/our-story"
            className={`font-medium py-2 transition-colors hover:text-[var(--signature)] ${
              pathname === "/our-story" ? "text-[var(--signature)] font-semibold" : ""
            }`}
          >
            Our Story
          </Link>

          {/* Learn dropdown */}
          <div className="relative" ref={learnRef}>
            <button
              onClick={() => {
                setLearnDropdownOpen(!learnDropdownOpen);
                setShopDropdownOpen(false);
              }}
              onMouseEnter={() => setLearnDropdownOpen(true)}
              className="flex items-center gap-1.5 py-2 font-medium hover:text-[var(--signature)] transition-colors cursor-pointer"
              aria-expanded={learnDropdownOpen}
              aria-haspopup="true"
            >
              <span>Learn</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${learnDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {learnDropdownOpen && (
              <div
                onMouseLeave={() => setLearnDropdownOpen(false)}
                className="absolute top-full left-0 mt-1 w-56 rounded-2xl bg-[var(--sand)] border border-[var(--line)] shadow-lg p-2.5 space-y-1 z-50 text-xs"
              >
                <Link
                  href="/our-story#faq"
                  onClick={() => setLearnDropdownOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[var(--card-tint)] text-[var(--ink)] transition-colors"
                >
                  Frequently Asked Questions
                </Link>
                <Link
                  href="/our-story#faq-0"
                  onClick={() => setLearnDropdownOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[var(--card-tint)] text-[var(--ink)] transition-colors"
                >
                  Why Honey Crystallises
                </Link>
                <Link
                  href="/our-hives"
                  onClick={() => setLearnDropdownOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[var(--card-tint)] text-[var(--ink)] transition-colors"
                >
                  How the Hives Work →
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right side: Pill CTA + Cart Icon */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/beekeeper"
            className="hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-full font-sans font-medium text-xs bg-[var(--signature)] text-[var(--ink)] hover:brightness-95 transition-all shadow-2xs whitespace-nowrap"
          >
            Beekeepers Dashboard
          </Link>

          {/* Cart Icon: Beehive Cart Icon */}
          <Link
            href="/cart"
            id="header-beehive-cart"
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--line)] bg-white/90 hover:bg-white text-[var(--ink)] hover:border-[var(--signature)] transition-colors shrink-0 group"
            aria-label={`View shopping cart (${totalCount} items)`}
          >
            <BeehiveCartIcon count={totalCount} />
            {isHydrated && totalCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[var(--signature)] text-[var(--ink)] text-[10px] font-mono font-bold flex items-center justify-center rounded-full px-1 shadow-2xs border border-white">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-[var(--ink)] border border-[var(--line)] rounded-full bg-white hover:bg-[var(--card-tint)]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--line)] bg-[var(--sand)] px-4 py-5 space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted-ink)] px-3">
              Shop Origins
            </span>
            <Link
              href="/shop/muzaffarpur-litchi"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-[var(--ink)] rounded-xl hover:bg-[var(--card-tint)]"
            >
              <span>Muzaffarpur Litchi Blossom</span>
              <div className="relative w-7 h-7 rounded-md overflow-hidden border border-[var(--line)] bg-white shrink-0">
                <Image
                  src="/images/honey-litchi.jpg"
                  alt="Muzaffarpur Litchi Blossom"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
            </Link>
            <Link
              href="/shop/kashmir-white-acacia"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-[var(--ink)] rounded-xl hover:bg-[var(--card-tint)]"
            >
              <span>Kashmir White Acacia</span>
              <div className="relative w-7 h-7 rounded-md overflow-hidden border border-[var(--line)] bg-white shrink-0">
                <Image
                  src="/images/honey-acacia.jpg"
                  alt="Kashmir White Acacia"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
            </Link>
            <Link
              href="/shop/sundarbans-wild-mangrove"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-[var(--ink)] rounded-xl hover:bg-[var(--card-tint)]"
            >
              <span>Sundarbans Wild Mangrove</span>
              <div className="relative w-7 h-7 rounded-md overflow-hidden border border-[var(--line)] bg-white shrink-0">
                <Image
                  src="/images/honey-mangrove.jpg"
                  alt="Sundarbans Wild Mangrove"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
            </Link>
            <Link
              href="/shop/terroir-tasting-trio"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-[var(--ink)] rounded-xl hover:bg-[var(--card-tint)]"
            >
              <span>The Terroir Tasting Trio</span>
              <div className="relative w-7 h-7 rounded-md overflow-hidden border border-[var(--line)] bg-white shrink-0">
                <Image
                  src="/images/honey-trio.jpg"
                  alt="The Terroir Tasting Trio"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[var(--signature)] rounded-xl hover:bg-[var(--card-tint)]"
            >
              Shop All Origins →
            </Link>
          </div>

          <div className="pt-2 border-t border-[var(--line)] space-y-1">
            <Link
              href="/our-story"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[var(--ink)] rounded-xl hover:bg-[var(--card-tint)]"
            >
              Our Story
            </Link>
            <Link
              href="/beekeeper"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-xs font-mono font-medium text-[#8A4B12] bg-[#FAF0E6] rounded-xl border border-[#F0D5C0]"
            >
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>Beekeepers Dashboard</span>
              </span>
              <span>→</span>
            </Link>
            <Link
              href="/our-hives"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[var(--ink)] rounded-xl hover:bg-[var(--card-tint)]"
            >
              How the Hives Work
            </Link>
            <Link
              href="/our-story#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[var(--ink)] rounded-xl hover:bg-[var(--card-tint)]"
            >
              Learn & FAQ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
