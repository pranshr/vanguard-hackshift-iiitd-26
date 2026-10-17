"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Star, ShoppingBag, Check } from "lucide-react";

interface RitualItem {
  id: string;
  slug: string;
  title: string;
  subName: string;
  badge: string;
  rating: string;
  reviewCount: string;
  price: string;
  rawPrice: number;
  batchId: string;
  origin: string;
  colorHex: string;
  bgColor: string;
  image: string;
  hasBorder: boolean;
}

const RITUAL_CARDS: RitualItem[] = [
  {
    id: "prod-litchi",
    slug: "muzaffarpur-litchi",
    title: "Muzaffarpur Litchi Blossom Raw Honey",
    subName: "Muzaffarpur Litchi Blossom",
    badge: "Delicate & Floral",
    rating: "4.9",
    reviewCount: "1,855",
    price: "FROM ₹480",
    rawPrice: 480,
    batchId: "HC-2026-MUS-014",
    origin: "Muzaffarpur District, Bihar",
    colorHex: "#E5A93C",
    bgColor: "#F5EDE0",
    image: "/images/honey-litchi.jpg",
    hasBorder: false,
  },
  {
    id: "prod-acacia",
    slug: "kashmir-white-acacia",
    title: "Kashmir White Acacia Raw Honey",
    subName: "Kashmir White Acacia",
    badge: "Crystal Clear & Vanilla",
    rating: "4.89",
    reviewCount: "18,018",
    price: "FROM ₹650",
    rawPrice: 650,
    batchId: "HC-2026-KSH-008",
    origin: "Pulwama District, Kashmir",
    colorHex: "#F3E2B8",
    bgColor: "#FAF6EF",
    image: "/images/honey-acacia.jpg",
    hasBorder: false,
  },
  {
    id: "prod-mangrove",
    slug: "sundarbans-wild-mangrove",
    title: "Sundarbans Wild Mangrove Forest Honey",
    subName: "Sundarbans Wild Mangrove",
    badge: "Bold, Saline & Complex",
    rating: "4.88",
    reviewCount: "2,968",
    price: "FROM ₹540",
    rawPrice: 540,
    batchId: "HC-2026-SUN-021",
    origin: "Sundarbans Buffer Reserve, West Bengal",
    colorHex: "#5E300A",
    bgColor: "#EFE8DC",
    image: "/images/honey-mangrove.jpg",
    hasBorder: false,
  },
];

export function OriginCardsSection() {
  const { addItem } = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const handleQuickAdd = (card: RitualItem, e?: React.MouseEvent) => {
    addItem(
      {
        productId: card.id,
        slug: card.slug,
        name: card.subName,
        origin: card.origin,
        size: "250g",
        price: card.rawPrice,
        quantity: 1,
        batchId: card.batchId,
        colorSwatch: card.colorHex,
      },
      e
    );
    setAddedSlug(card.slug);
    setTimeout(() => setAddedSlug(null), 1800);
  };

  return (
    <section className="py-16 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6">
      {/* Section Header: Matching Reference Inspiration */}
      <div className="flex items-center justify-between gap-4 mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-sans font-medium text-[#1C1A17] tracking-tight">
          Start Your Raw Honey Ritual.
        </h2>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center h-10 px-6 rounded-full font-sans font-bold text-xs uppercase tracking-wider bg-[#FFC700] hover:bg-[#E5B300] text-black transition-all shadow-2xs whitespace-nowrap shrink-0"
        >
          SHOP ALL
        </Link>
      </div>

      {/* Cards Grid: Tall 3:4 Aspect Ratio Cards with Outside Meta */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {RITUAL_CARDS.map((card) => (
          <div key={card.id} className="group flex flex-col">
            {/* Visual Box with 3:4 Aspect Ratio */}
            <Link
              href={`/shop/${card.slug}`}
              className={`relative aspect-[3/4] w-full rounded-3xl sm:rounded-[28px] overflow-hidden transition-all duration-300 block shadow-xs ${
                card.hasBorder
                  ? "ring-2 ring-[#2C343E] shadow-sm"
                  : "border border-black/5 hover:ring-2 hover:ring-[#1C1A17]/60"
              }`}
              style={{ backgroundColor: card.bgColor }}
            >
              {/* Top-left Translucent MGO / Potency Pill Badge */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-xs rounded-md text-[11px] font-mono font-semibold text-[#1C1A17] tracking-wide shadow-2xs">
                {card.badge}
              </div>

              {/* Floating Studio Product Jar Image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* Hover Quick Add Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleQuickAdd(card, e);
                }}
                className="absolute bottom-4 right-4 z-20 h-9 px-3.5 rounded-full bg-white/95 hover:bg-white text-[#1C1A17] text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 cursor-pointer"
                aria-label={`Quick add ${card.title} to cart`}
              >
                {addedSlug === card.slug ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2F6B3A]" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </>
                )}
              </button>
            </Link>

            {/* Below Card Meta: Centered Rating, Title, Price */}
            <div className="pt-4 text-center space-y-1">
              {/* Star Rating */}
              <div className="flex items-center justify-center gap-1.5 text-xs">
                <div className="flex items-center gap-0.5 text-[#F5A623]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]"
                    />
                  ))}
                </div>
                <span className="font-semibold text-xs text-[#1C1A17] ml-0.5">
                  {card.rating}
                </span>
                <span className="underline text-[var(--muted-ink)] text-xs">
                  ({card.reviewCount})
                </span>
              </div>

              {/* Product Title */}
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1A17] leading-snug">
                <Link
                  href={`/shop/${card.slug}`}
                  className="hover:underline transition-colors block"
                >
                  {card.title}
                </Link>
              </h3>

              {/* Price */}
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted-ink)] font-medium">
                {card.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Slider / Indicator Pill matching reference */}
      <div className="flex items-center justify-center gap-1.5 mt-8 sm:mt-10">
        <span className="w-10 h-1 bg-[#8E8B82] rounded-full" />
      </div>
    </section>
  );
}
