"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  Hexagon,
  ShoppingBag,
  Search,
  ShieldCheck,
  Star,
  CheckCircle2,
  ArrowRight,
  Heart,
  Droplets,
  Scale,
  Award,
  Truck,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

export interface Product {
  id: string;
  name: string;
  category: "honey" | "beeswax" | "hardware" | "colonies" | "gear";
  price: number;
  rating: number;
  reviewCount: number;
  shortDesc: string;
  fullDesc: string;
  image: string;
  tag?: string;
  inStock: boolean;
  stockCount: number;
  telemetryCertified?: boolean;
  specs: {
    originApiary: string;
    harvestDate?: string;
    moisturePercent?: number;
    hiveId?: string;
    purityGrade?: string;
    connectivity?: string;
    batteryLife?: string;
    dimensions?: string;
  };
}

const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Wildflower Reserve Raw Honey (1kg)",
    category: "honey",
    price: 850,
    rating: 4.9,
    reviewCount: 124,
    shortDesc: "Single-origin raw unfiltered forest wildflower honey with verified low moisture index.",
    fullDesc: "Cold-extracted from Hive #01 & #04 located in the organic Meadow Apiary. Cold spun, 100% unpasteurized to maintain active pollen enzymes, antioxidant flavonoids, and delicate floral terroir notes. Each jar comes with a batch QR verification code directly tied to the smart hive telemetry ledger.",
    image: "🍯",
    tag: "Bestseller",
    inStock: true,
    stockCount: 42,
    telemetryCertified: true,
    specs: {
      originApiary: "Meadow Apiary Yard, Sector 4",
      harvestDate: "Oct 2026",
      moisturePercent: 16.4,
      hiveId: "Hive #01",
      purityGrade: "A+ Raw Certified"
    }
  },
  {
    id: "prod-2",
    name: "BEE-Safe Telemetry Sensor Node v2",
    category: "hardware",
    price: 3200,
    rating: 4.95,
    reviewCount: 58,
    shortDesc: "All-in-one brood core acoustic, temperature, humidity, and atmospheric telemetry node.",
    fullDesc: "Designed specifically for Langstroth, Warre, and Top-bar frames. Features dual MEMS acoustic frequency sensors to monitor hive vibrations and detect early queen swarming piping, sub-millimeter temperature probe, and waterproof food-grade resin casing that bees do not propolize.",
    image: "📡",
    tag: "Smart Hardware",
    inStock: true,
    stockCount: 19,
    telemetryCertified: true,
    specs: {
      originApiary: "Hardware Lab - Bangalore",
      connectivity: "BLE 5.2 / LoRaWAN 868MHz / Wi-Fi",
      batteryLife: "14 months (LiFePO4 rechargeable)",
      dimensions: "115mm x 38mm x 18mm",
      purityGrade: "IP67 Apiary Rated"
    }
  },
  {
    id: "prod-3",
    name: "Pure Golden Beeswax Blocks (500g)",
    category: "beeswax",
    price: 490,
    rating: 4.8,
    reviewCount: 86,
    shortDesc: "Triple-filtered cosmetic and candle-grade 100% natural cappings beeswax.",
    fullDesc: "Melted exclusively from newly drawn honey super cappings without any synthetic paraffin, bleach, or chemical clarifiers. Emits a rich natural honey-floral aroma, ideal for organic lip balms, hive foundation dipping, wood polish, and beeswax candles.",
    image: "🕯️",
    tag: "Chemical Free",
    inStock: true,
    stockCount: 65,
    telemetryCertified: true,
    specs: {
      originApiary: "Orchard Hill Yard",
      harvestDate: "Sept 2026",
      purityGrade: "100% Pure Cappings Grade"
    }
  },
  {
    id: "prod-4",
    name: "Continuous Hive Load-Cell Scale Base",
    category: "hardware",
    price: 4800,
    rating: 4.9,
    reviewCount: 31,
    shortDesc: "Weatherproof 150kg precision scale base with automatic temperature compensation.",
    fullDesc: "Placed beneath the bottom board of your hive to monitor daily nectar flow influx, honey accumulation speed, and winter feed consumption rates. Zero tare drift between -15°C to 55°C with solar charging integration.",
    image: "⚖️",
    tag: "High Precision",
    inStock: true,
    stockCount: 12,
    telemetryCertified: true,
    specs: {
      originApiary: "Hardware Lab - Pune",
      connectivity: "LoRaWAN & BLE",
      batteryLife: "Continuous solar-assisted",
      purityGrade: "Stainless Steel + IP68"
    }
  },
  {
    id: "prod-5",
    name: "Acacia Monofloral Raw Honey (500g)",
    category: "honey",
    price: 520,
    rating: 4.85,
    reviewCount: 67,
    shortDesc: "Delicate, light amber blossom honey naturally slow to crystallize.",
    fullDesc: "Harvested during the peak 10-day spring blooming window of black locust acacia groves. Very mild vanilla notes, exceptionally high fructose ratio preventing rapid crystallization, perfect for artisanal tea and gourmet cheese pairings.",
    image: "🌼",
    tag: "Limited Reserve",
    inStock: true,
    stockCount: 28,
    telemetryCertified: true,
    specs: {
      originApiary: "Valley Blossom Grove",
      harvestDate: "August 2026",
      moisturePercent: 15.9,
      hiveId: "Hive #07",
      purityGrade: "Monofloral Grade A"
    }
  },
  {
    id: "prod-6",
    name: "Mated Apis Cerana Indica Queen Bee",
    category: "colonies",
    price: 1450,
    rating: 4.9,
    reviewCount: 43,
    shortDesc: "Certified mite-tolerant, docile breeder queen with proven high brood pattern.",
    fullDesc: "Naturally open-mated in isolated mating valleys with selected gentle drone colonies. Screened for Varroa and Tropilaelaps hygiene behavior. Shipped in insulated queen cage with attendant worker bees and sugar fondant plug.",
    image: "👑",
    tag: "Live Certified",
    inStock: true,
    stockCount: 8,
    telemetryCertified: true,
    specs: {
      originApiary: "Queen Breeding Yard Alpha",
      harvestDate: "Oct 2026 Batch #Q-204",
      purityGrade: "Genetic Hygiene Tested"
    }
  },
  {
    id: "prod-7",
    name: "Pro Ventilated 3-Layer Apiarist Suit",
    category: "gear",
    price: 3600,
    rating: 4.75,
    reviewCount: 92,
    shortDesc: "Ultra-breathable sting-proof mesh suit with removable round & fencing veils.",
    fullDesc: "Triple-layer synthetic ventilated mesh lets cooling air circulate while keeping bee stingers from contacting your skin. Heavy-duty YKK brass zippers, reinforced thumb loops, cushioned knee pads, and hive tool pockets on both sleeves.",
    image: "🛡️",
    tag: "Essential Gear",
    inStock: true,
    stockCount: 34,
    telemetryCertified: false,
    specs: {
      originApiary: "BEE-Safe Equipment Div",
      dimensions: "Unisex S, M, L, XL, XXL",
      purityGrade: "3-Layer Sting Defense"
    }
  },
  {
    id: "prod-8",
    name: "Comb Honey Hex-Square Box (350g)",
    category: "honey",
    price: 650,
    rating: 5.0,
    reviewCount: 39,
    shortDesc: "Virgin raw comb cut straight from the hive super into eco wooden frames.",
    fullDesc: "Edible beeswax comb packed with sealed raw honey cells. Never touched by centrifuges or strainers. Chew the sweet comb wax for natural propolis benefits and enjoy the richest sensory flavor profile honey bees can deliver.",
    image: "🔶",
    tag: "Artisanal",
    inStock: true,
    stockCount: 15,
    telemetryCertified: true,
    specs: {
      originApiary: "Meadow Apiary Yard",
      harvestDate: "Oct 2026",
      moisturePercent: 16.8,
      hiveId: "Hive #02",
      purityGrade: "100% Virgin Wax Comb"
    }
  },
  {
    id: "prod-9",
    name: "Apiary Smoker & Pro Stainless Hive Tool Set",
    category: "gear",
    price: 1190,
    rating: 4.7,
    reviewCount: 110,
    shortDesc: "Heat-shielded European smoker with heavy-duty J-hook hive lever tool.",
    fullDesc: "Heavy gauge stainless steel barrel with heat shield cage, leather bellows with durable air valve, mounting hanger, and laser-sharpened frame lifter tool to pry propolized super frames with zero disturbance.",
    image: "💨",
    tag: "Kit",
    inStock: true,
    stockCount: 50,
    telemetryCertified: false,
    specs: {
      originApiary: "BEE-Safe Equipment Div",
      dimensions: "Standard 11-inch barrel",
      purityGrade: "Food-grade SS304"
    }
  }
];

interface CartItem {
  product: Product;
  quantity: number;
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [telemetryOnly, setTelemetryOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  
  // Global cart sync
  const { addItem: addGlobalItem, totalCount: globalCartCount } = useCart();

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Filtering
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specs.originApiary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === "all" ? true : item.category === selectedCategory;

      const matchesTelemetry = telemetryOnly ? item.telemetryCertified : true;

      return matchesSearch && matchesCat && matchesTelemetry;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [searchQuery, selectedCategory, telemetryOnly, sortBy]);

  // Cart operations
  const addToCart = (product: Product, qty: number = 1) => {
    // Sync into global cart
    addGlobalItem({
      productId: product.id,
      slug: product.id,
      name: product.name,
      origin: product.specs.originApiary,
      size: product.category === "hardware" ? "1 Unit" : product.category === "beeswax" ? "500g Block" : "Standard",
      price: product.price,
      quantity: qty,
      batchId: product.specs.hiveId || "MKT-EQUIP",
      colorSwatch: product.category === "honey" ? "#C98A2B" : "#B45309",
    });

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const handleCheckout = () => {
    setOrderSuccess(true);
    setTimeout(() => {
      setCart([]);
      setOrderSuccess(false);
      setIsCartOpen(false);
    }, 2800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#24201d]">
      {/* Marketplace Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e8e1d7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#f7efe4] border border-[#e8e1d7] rounded-lg flex items-center justify-center text-[#b45309]">
              <Hexagon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-[#24201d]">
                  BEE-Safe
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f7efe4] border border-[#e8ded0] text-[#b45309]">
                  Marketplace
                </span>
              </div>
              <span className="text-[10px] sm:text-xs block text-[#7c7267] font-medium">
                Verified Apiary Direct Trade
              </span>
            </div>
          </Link>

          {/* Search bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md relative mx-4">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b8073]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search raw honey, hive acoustic nodes, load cells..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#b45309] placeholder:text-[#8b8073]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8b8073] hover:text-[#24201d]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#574f46] hover:text-[#24201d]"
            >
              Main Overview
            </Link>

            <Link
              href="/beekeeper"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#574f46] bg-white border border-[#e0d7cb] rounded-lg hover:bg-[#f5ede2]"
            >
              Beekeeper Portal
            </Link>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#b45309] border border-[#92400e] rounded-lg hover:bg-[#92400e] transition-all shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {(globalCartCount > 0 || cartItemCount > 0) && (
                <span className="ml-1 bg-white text-[#b45309] font-bold text-xs px-1.5 py-0.2 rounded-full">
                  {Math.max(globalCartCount, cartItemCount)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b8073]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search honey, sensors, queens..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#b45309]"
            />
          </div>
        </div>
      </header>

      {/* Madhuvan Storefront Flagship Announcement */}
      <div className="bg-[#FAF0E6] border-b border-[#F0D5C0] px-4 py-2.5 text-xs text-[#8A4B12] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2F6B3A] shrink-0" />
          <span>
            Looking for consumer single-origin honey? Visit our new flagship{" "}
            <strong>Madhuvan Storefront</strong> with live hive telemetry & NMR lab reports.
          </span>
        </div>
        <Link
          href="/shop"
          className="underline font-bold shrink-0 hover:text-[#703C0D] flex items-center gap-1"
        >
          <span>Explore Madhuvan Storefront</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Hero Banner Section */}
      <section className="bg-[#f7efe4] border-b border-[#e8ded0] py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-[#e0d7cb] text-xs font-semibold text-[#b45309] mb-3">
              <ShieldCheck className="w-4 h-4 text-[#b45309]" />
              <span>100% Telemetry-Backed Authenticity</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#24201d] mb-2 sm:mb-3">
              Apiary Direct Marketplace
            </h1>
            <p className="text-xs sm:text-base text-[#665e55] leading-relaxed">
              Purchase unadulterated raw honey batches verifiable by real-time hive sensor logs,
              certified queen genetics, and professional smart telemetry hardware.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto shrink-0 bg-white border border-[#e0d7cb] p-4 rounded-xl shadow-xs">
            <div className="text-center px-2">
              <div className="text-lg sm:text-xl font-bold text-[#b45309]">100%</div>
              <div className="text-[10px] sm:text-xs text-[#7c7267] font-medium">Raw & Uncut</div>
            </div>
            <div className="text-center px-2 border-x border-[#e8e1d7]">
              <div className="text-lg sm:text-xl font-bold text-[#24201d]">&lt;18%</div>
              <div className="text-[10px] sm:text-xs text-[#7c7267] font-medium">Moisture Index</div>
            </div>
            <div className="text-center px-2">
              <div className="text-lg sm:text-xl font-bold text-[#b45309]">24h</div>
              <div className="text-[10px] sm:text-xs text-[#7c7267] font-medium">Live Telemetry</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Category Pills & Filters */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#e8e1d7]">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {[
              { id: "all", label: "All Items" },
              { id: "honey", label: "Raw Honey & Comb" },
              { id: "hardware", label: "Smart Hive Hardware" },
              { id: "beeswax", label: "Pure Beeswax" },
              { id: "colonies", label: "Breeder Queens & Nucs" },
              { id: "gear", label: "Apiary Protective Gear" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#b45309] text-white shadow-xs"
                    : "bg-white text-[#574f46] border border-[#e0d7cb] hover:bg-[#f7efe4]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right Controls: Filter & Sort */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTelemetryOnly(!telemetryOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                telemetryOnly
                  ? "bg-[#f7efe4] border-[#b45309] text-[#b45309]"
                  : "bg-white border-[#e0d7cb] text-[#574f46] hover:bg-[#faf8f5]"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#b45309]" />
              Telemetry Certified Only
            </button>

            <div className="flex items-center gap-1 text-xs text-[#7c7267]">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "rating")}
                className="bg-white border border-[#e0d7cb] text-[#24201d] text-xs font-medium py-1.5 px-2 rounded-lg focus:outline-none focus:border-[#b45309]"
              >
                <option value="featured">Featured</option>
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#e8e1d7] rounded-xl p-8">
            <ShoppingBag className="w-12 h-12 text-[#cfc4b5] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#24201d] mb-1">No products found</h3>
            <p className="text-sm text-[#7c7267] max-w-sm mx-auto mb-4">
              Try adjusting your search criteria, removing the telemetry filter, or switching categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setTelemetryOnly(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#b45309] rounded-lg"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group flex flex-col bg-white border border-[#e8e1d7] rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#b45309]/50 transition-all"
              >
                {/* Product Card Visual Header */}
                <div className="h-44 sm:h-48 bg-[#f7efe4]/50 border-b border-[#f0e8dc] flex items-center justify-center relative p-6">
                  <span className="text-6xl sm:text-7xl select-none transform group-hover:scale-105 transition-transform duration-200">
                    {prod.image}
                  </span>

                  {/* Badge */}
                  {prod.tag && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[11px] font-bold rounded bg-white/90 border border-[#e8ded0] text-[#b45309] shadow-xs">
                      {prod.tag}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(prod.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-[#e8ded0] flex items-center justify-center text-[#7c7267] hover:text-[#b45309] shadow-xs transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wishlist.includes(prod.id) ? "fill-[#b45309] text-[#b45309]" : ""
                      }`}
                    />
                  </button>

                  {/* Telemetry Certified Pill */}
                  {prod.telemetryCertified && (
                    <div className="absolute bottom-2 left-3 inline-flex items-center gap-1 px-2 py-0.5 bg-white/90 border border-[#e0d7cb] rounded text-[10px] font-semibold text-[#24201d]">
                      <ShieldCheck className="w-3 h-3 text-[#b45309]" />
                      <span>Telemetry Verified</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating & Review */}
                    <div className="flex items-center gap-1.5 text-xs text-[#7c7267] mb-1.5">
                      <div className="flex items-center text-[#d97706]">
                        <Star className="w-3.5 h-3.5 fill-[#d97706]" />
                        <span className="ml-1 font-bold text-[#24201d]">
                          {prod.rating}
                        </span>
                      </div>
                      <span>•</span>
                      <span>{prod.reviewCount} apiarist reviews</span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => setSelectedProduct(prod)}
                      className="font-bold text-base sm:text-lg text-[#24201d] mb-1.5 group-hover:text-[#b45309] transition-colors cursor-pointer"
                    >
                      {prod.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-[#665e55] leading-relaxed line-clamp-2 mb-3">
                      {prod.shortDesc}
                    </p>

                    {/* Telemetry metadata snippet */}
                    {prod.specs.moisturePercent && (
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#f7efe4] border border-[#e8ded0] text-[11px] text-[#574f46] mb-3">
                        <Droplets className="w-3 h-3 text-[#b45309]" />
                        <span>Moisture: <strong>{prod.specs.moisturePercent}%</strong></span>
                        <span>•</span>
                        <span>{prod.specs.originApiary}</span>
                      </div>
                    )}
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-[#f0e8dc] flex items-center justify-between gap-2 mt-auto">
                    <div>
                      <span className="text-xs text-[#7c7267] block">Price</span>
                      <span className="text-lg sm:text-xl font-extrabold text-[#24201d]">
                        ₹{prod.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProduct(prod)}
                        className="px-3 py-2 text-xs font-semibold text-[#574f46] bg-white border border-[#e0d7cb] rounded-lg hover:bg-[#f7efe4] transition-all"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => addToCart(prod)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#b45309] border border-[#92400e] rounded-lg hover:bg-[#92400e] transition-all shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Trust & Guarantee Banner */}
      <section className="bg-white border-t border-[#e8e1d7] py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#24201d] mb-1">
                Zero Corn Syrup or Adulteration
              </h4>
              <p className="text-xs text-[#665e55] leading-normal">
                Every batch undergoes carbon isotope C4 testing and digital refractive moisture scoring before listing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309] shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#24201d] mb-1">
                Direct Apiary Fair Pricing
              </h4>
              <p className="text-xs text-[#665e55] leading-normal">
                85% of each sale proceeds go directly to regional beekeepers and conservation yards without predatory middleman markups.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#24201d] mb-1">
                Temperature Controlled Courier
              </h4>
              <p className="text-xs text-[#665e55] leading-normal">
                Live queens and raw raw comb products are packed in climate-insulating cartons with rapid 48-hour delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8e1d7] bg-[#faf8f5] py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-[#7c7267] gap-4">
          <p>© 2026 BEE-Safe Marketplace. Direct Apiary Telemetry Network.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6 font-medium">
            <Link href="/" className="hover:text-[#24201d]">Landing Overview</Link>
            <Link href="/shop" className="text-[#8A4B12] font-semibold hover:underline">Madhuvan Storefront</Link>
            <Link href="/beekeeper" className="hover:text-[#24201d]">Beekeeper Dashboard</Link>
            <Link href="/verify" className="hover:text-[#24201d]">Batch QR Verification</Link>
            <span className="hover:text-[#24201d] cursor-pointer">Apiarist Vendor Terms</span>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#e8e1d7] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-7">
            <div className="flex items-start justify-between pb-4 border-b border-[#e8e1d7]">
              <div>
                <span className="text-[11px] font-bold text-[#b45309] uppercase tracking-wider">
                  {selectedProduct.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#24201d] mt-0.5">
                  {selectedProduct.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-[#7c7267] hover:text-[#24201d] text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start bg-[#f7efe4]/50 border border-[#e8ded0] p-4 rounded-xl">
                <span className="text-7xl sm:text-8xl">{selectedProduct.image}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-[#d97706]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#d97706]" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#24201d]">
                      {selectedProduct.rating} / 5.0
                    </span>
                    <span className="text-xs text-[#7c7267]">
                      ({selectedProduct.reviewCount} verified purchases)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#574f46] leading-relaxed">
                    {selectedProduct.fullDesc}
                  </p>
                </div>
              </div>

              {/* Telemetry / Specification Proof Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7c7267] mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#b45309]" />
                  Verified Apiary Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs bg-[#faf8f5] border border-[#e8e1d7] p-3.5 rounded-lg">
                  <div>
                    <span className="text-[#7c7267] block">Source Apiary:</span>
                    <strong className="text-[#24201d]">{selectedProduct.specs.originApiary}</strong>
                  </div>
                  {selectedProduct.specs.moisturePercent && (
                    <div>
                      <span className="text-[#7c7267] block">Refractive Moisture Level:</span>
                      <strong className="text-[#b45309]">{selectedProduct.specs.moisturePercent}% (Grade A Export)</strong>
                    </div>
                  )}
                  {selectedProduct.specs.harvestDate && (
                    <div>
                      <span className="text-[#7c7267] block">Extraction Date:</span>
                      <strong className="text-[#24201d]">{selectedProduct.specs.harvestDate}</strong>
                    </div>
                  )}
                  {selectedProduct.specs.hiveId && (
                    <div>
                      <span className="text-[#7c7267] block">Telemetry Hive Node:</span>
                      <strong className="text-[#24201d]">{selectedProduct.specs.hiveId} (Acoustic Log Verified)</strong>
                    </div>
                  )}
                  {selectedProduct.specs.connectivity && (
                    <div>
                      <span className="text-[#7c7267] block">Telemetry Protocols:</span>
                      <strong className="text-[#24201d]">{selectedProduct.specs.connectivity}</strong>
                    </div>
                  )}
                  {selectedProduct.specs.batteryLife && (
                    <div>
                      <span className="text-[#7c7267] block">Battery Endurance:</span>
                      <strong className="text-[#24201d]">{selectedProduct.specs.batteryLife}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Bottom Action */}
            <div className="pt-4 border-t border-[#e8e1d7] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs text-[#7c7267] block">Unit Price (Taxes Included)</span>
                <span className="text-2xl font-extrabold text-[#24201d]">
                  ₹{selectedProduct.price.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#574f46] bg-[#f7efe4] rounded-lg hover:bg-[#ede3d5]"
                >
                  Continue Browsing
                </button>
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 text-xs font-semibold text-white bg-[#b45309] rounded-lg hover:bg-[#92400e] shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#e8e1d7]">
            {/* Cart Header */}
            <div className="p-4 sm:p-5 border-b border-[#e8e1d7] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#b45309]" />
                <h3 className="font-bold text-base text-[#24201d]">
                  Your Cart ({cartItemCount})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-[#7c7267] hover:text-[#24201d] p-1 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-[#cfc4b5] mx-auto mb-2" />
                  <p className="text-sm font-semibold text-[#574f46]">Your basket is empty</p>
                  <p className="text-xs text-[#8b8073] mt-1">
                    Select certified raw honey, telemetry nodes, or beekeeping gear.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 bg-[#faf8f5] border border-[#e8e1d7] rounded-xl flex items-center justify-between gap-3"
                  >
                    <span className="text-3xl shrink-0">{item.product.image}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs sm:text-sm text-[#24201d] truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-xs font-bold text-[#b45309] mt-0.5">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#e0d7cb] rounded-md bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="px-2 py-1 text-xs hover:bg-[#f7efe4] text-[#574f46]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#24201d]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="px-2 py-1 text-xs hover:bg-[#f7efe4] text-[#574f46]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#8b8073] hover:text-red-600 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-[#e8e1d7] bg-[#faf8f5] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#7c7267]">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#7c7267]">
                  <span>Shipping & Telemetry Verification Seal</span>
                  <span className="text-emerald-700 font-semibold">FREE</span>
                </div>
                <div className="flex items-center justify-between text-sm sm:text-base font-bold text-[#24201d] pt-2 border-t border-[#e8e1d7]">
                  <span>Total Amount</span>
                  <span className="text-[#b45309]">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>

                {orderSuccess ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 flex items-center justify-center gap-2 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Order dispatched to apiary dispatch center!
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-3 text-sm font-bold text-white bg-[#b45309] border border-[#92400e] rounded-lg hover:bg-[#92400e] transition-all shadow-xs flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Full Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={handleCheckout}
                      className="w-full py-2.5 text-xs font-semibold text-[#574f46] bg-[#f7efe4] border border-[#e8ded0] rounded-lg hover:bg-[#ede3d5] transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Instant Apiary Test Dispatch</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
