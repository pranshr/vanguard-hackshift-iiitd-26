"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront/Header";
import { StorefrontFooter } from "@/components/storefront/Footer";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Search,
  ShieldCheck,
  Star,
  CheckCircle2,
  ArrowRight,
  Scale,
  Award,
  Truck,
  Plus,
  Minus,
  Trash2,
  ChevronDown,
  Upload,
  Cpu,
  Radio,
  Play,
  X,
  FileCheck2,
  ExternalLink,
  Layers,
} from "lucide-react";

export interface MarketplaceProduct {
  id: string;
  name: string;
  category: "honey" | "beeswax" | "hardware" | "colonies" | "gear";
  price: number;
  rating: number;
  reviewCount: number;
  shortDesc: string;
  fullDesc: string;
  tag?: string;
  inStock: boolean;
  stockCount: number;
  telemetryCertified: boolean;
  specs: {
    originApiary: string;
    harvestDate?: string;
    moisturePercent?: number;
    hiveId?: string;
    batchId?: string;
    connectivity?: string;
    batteryLife?: string;
    dimensions?: string;
    purityGrade: string;
    sepoliaHash?: string;
  };
}

const PRODUCTS: MarketplaceProduct[] = [
  {
    id: "prod-1",
    name: "Wildflower Reserve Raw Honey (1kg)",
    category: "honey",
    price: 850,
    rating: 4.9,
    reviewCount: 124,
    shortDesc: "Single-origin raw unfiltered forest wildflower honey with verified low moisture index.",
    fullDesc: "Cold-extracted from Hive #01 & #04 located in the organic Meadow Apiary. Cold spun, 100% unpasteurized to maintain active pollen enzymes, antioxidant flavonoids, and delicate floral terroir notes. Each jar comes with a batch QR verification code directly tied to the smart hive telemetry ledger.",
    tag: "Bestseller",
    inStock: true,
    stockCount: 42,
    telemetryCertified: true,
    specs: {
      originApiary: "Meadow Apiary Yard, Sector 4",
      harvestDate: "Oct 2026",
      moisturePercent: 16.4,
      hiveId: "Hive #01",
      batchId: "MUZ-2024-02-LIT",
      purityGrade: "A+ Raw Certified (NMR Passed)",
      sepoliaHash: "0x8f4d...3e1a"
    }
  },
  {
    id: "prod-2",
    name: "BEE-Safe Telemetry Node v2",
    category: "hardware",
    price: 3200,
    rating: 4.95,
    reviewCount: 58,
    shortDesc: "All-in-one brood core acoustic, temperature, humidity, and atmospheric telemetry node.",
    fullDesc: "Designed specifically for Langstroth, Warre, and Top-bar frames. Features dual MEMS acoustic frequency sensors to monitor hive vibrations and detect early queen swarming piping, sub-millimeter temperature probe, and waterproof food-grade resin casing that bees do not propolize.",
    tag: "Smart Hardware",
    inStock: true,
    stockCount: 19,
    telemetryCertified: true,
    specs: {
      originApiary: "Hardware Lab - Bangalore",
      connectivity: "BLE 5.2 / LoRaWAN 868MHz / Wi-Fi",
      batteryLife: "14 months (LiFePO4 rechargeable)",
      dimensions: "115mm x 38mm x 18mm",
      purityGrade: "IP67 Apiary Rated",
      sepoliaHash: "0x4b7c...9a0f"
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
    tag: "Chemical Free",
    inStock: true,
    stockCount: 65,
    telemetryCertified: true,
    specs: {
      originApiary: "Orchard Hill Yard",
      harvestDate: "Sept 2026",
      purityGrade: "100% Pure Cappings Grade",
      sepoliaHash: "0x12ef...88cd"
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
    tag: "High Precision",
    inStock: true,
    stockCount: 12,
    telemetryCertified: true,
    specs: {
      originApiary: "Hardware Lab - Pune",
      connectivity: "LoRaWAN & BLE 5.2",
      batteryLife: "Continuous solar-assisted",
      dimensions: "460mm x 380mm x 45mm",
      purityGrade: "Stainless Steel + IP68",
      sepoliaHash: "0x67ba...112e"
    }
  },
  {
    id: "prod-5",
    name: "Kashmir Acacia Monofloral Raw Honey (500g)",
    category: "honey",
    price: 520,
    rating: 4.85,
    reviewCount: 67,
    shortDesc: "Delicate, light amber blossom honey naturally slow to crystallize.",
    fullDesc: "Harvested during the peak spring blooming window of black locust acacia groves in Kashmir. Very mild vanilla notes, exceptionally high fructose-to-glucose ratio preventing rapid crystallization, perfect for artisanal tea and gourmet cheese pairings.",
    tag: "Limited Reserve",
    inStock: true,
    stockCount: 28,
    telemetryCertified: true,
    specs: {
      originApiary: "Valley Blossom Grove, Pulwama",
      harvestDate: "August 2026",
      moisturePercent: 15.9,
      hiveId: "Hive #07",
      batchId: "KAS-2024-05-ACA",
      purityGrade: "Monofloral Grade A (NMR Fingerprinted)",
      sepoliaHash: "0x98bc...43da"
    }
  },
  {
    id: "prod-6",
    name: "Mated Apis Cerana Breeder Queen Bee",
    category: "colonies",
    price: 1450,
    rating: 4.9,
    reviewCount: 43,
    shortDesc: "Certified mite-tolerant, docile breeder queen with proven high brood pattern.",
    fullDesc: "Naturally open-mated in isolated mating valleys with selected gentle drone colonies. Screened for Varroa and Tropilaelaps hygiene behavior. Shipped in insulated queen cage with attendant worker bees and sugar fondant plug.",
    tag: "Live Certified",
    inStock: true,
    stockCount: 8,
    telemetryCertified: true,
    specs: {
      originApiary: "Queen Breeding Yard Alpha, Nilgiris",
      harvestDate: "Oct 2026 Batch #Q-204",
      purityGrade: "Genetic Hygiene Tested",
      sepoliaHash: "0x23ac...77bf"
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
    tag: "Artisanal",
    inStock: true,
    stockCount: 15,
    telemetryCertified: true,
    specs: {
      originApiary: "Meadow Apiary Yard",
      harvestDate: "Oct 2026",
      moisturePercent: 16.8,
      hiveId: "Hive #02",
      batchId: "SHE-2024-03-MUS",
      purityGrade: "100% Virgin Wax Comb",
      sepoliaHash: "0x34fd...552a"
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

// Clean architectural SVG illustration component replacing emojis
function ProductIllustration({ category, name }: { category: string; name: string }) {
  if (category === "hardware") {
    const isScale = name.toLowerCase().includes("scale");
    if (isScale) {
      return (
        <svg viewBox="0 0 160 160" className="w-28 h-28 text-[#8A4B12]" fill="none" stroke="currentColor">
          <rect x="20" y="45" width="120" height="70" rx="6" strokeWidth="2" strokeDasharray="3 3" fill="#EDE4D4" fillOpacity="0.4" />
          <rect x="28" y="53" width="104" height="54" rx="4" strokeWidth="2.5" fill="#FFFFFF" />
          <line x1="38" y1="80" x2="122" y2="80" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="50" cy="65" r="4" fill="#C98A2B" />
          <circle cx="110" cy="65" r="4" fill="#C98A2B" />
          <circle cx="50" cy="95" r="4" fill="#C98A2B" />
          <circle cx="110" cy="95" r="4" fill="#C98A2B" />
          <rect x="68" y="72" width="24" height="16" rx="2" fill="#1C1A17" />
          <text x="73" y="84" fill="#2F6B3A" fontSize="9" fontFamily="monospace" fontWeight="bold">0.0kg</text>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 160 160" className="w-28 h-28 text-[#8A4B12]" fill="none" stroke="currentColor">
        <rect x="35" y="40" width="90" height="85" rx="8" strokeWidth="2.5" fill="#FAF7F2" />
        <rect x="43" y="48" width="74" height="69" rx="4" fill="#EDE4D4" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="60" cy="70" r="10" strokeWidth="2" fill="#FFFFFF" />
        <circle cx="60" cy="70" r="3" fill="#8A4B12" />
        <circle cx="100" cy="70" r="10" strokeWidth="2" fill="#FFFFFF" />
        <circle cx="100" cy="70" r="3" fill="#8A4B12" />
        <line x1="80" y1="40" x2="80" y2="20" strokeWidth="3" strokeLinecap="round" />
        <circle cx="80" cy="18" r="4" fill="#2F6B3A" />
        <rect x="52" y="94" width="56" height="14" rx="2" fill="#1C1A17" />
        <text x="58" y="104" fill="#2F6B3A" fontSize="7" fontFamily="monospace">IoT BLE/LoRa</text>
      </svg>
    );
  }

  if (category === "beeswax") {
    return (
      <svg viewBox="0 0 160 160" className="w-28 h-28 text-[#C98A2B]" fill="none" stroke="currentColor">
        <polygon points="80,30 130,58 130,105 80,132 30,105 30,58" strokeWidth="2.5" fill="#FAF1D8" />
        <polygon points="80,45 118,66 118,100 80,121 42,100 42,66" strokeWidth="1.5" strokeDasharray="3 3" fill="#F4DE9C" fillOpacity="0.6" />
        <circle cx="80" cy="83" r="14" strokeWidth="2" stroke="#8A4B12" fill="#FFFFFF" />
        <path d="M75 83L79 87L86 79" stroke="#2F6B3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (category === "colonies") {
    return (
      <svg viewBox="0 0 160 160" className="w-28 h-28 text-[#8A4B12]" fill="none" stroke="currentColor">
        <rect x="35" y="45" width="90" height="70" rx="4" strokeWidth="2.5" fill="#FDFBF7" />
        <line x1="35" y1="65" x2="125" y2="65" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.5" />
        <line x1="35" y1="85" x2="125" y2="85" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.5" />
        <line x1="35" y1="105" x2="125" y2="105" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.5" />
        <polygon points="80,50 86,62 74,62" fill="#C98A2B" strokeWidth="1" />
        <circle cx="80" cy="78" r="12" fill="#FAF1D8" stroke="#8A4B12" strokeWidth="2" />
        <text x="75" y="82" fill="#8A4B12" fontSize="12" fontWeight="bold">♛</text>
      </svg>
    );
  }

  if (category === "gear") {
    return (
      <svg viewBox="0 0 160 160" className="w-28 h-28 text-[#3F4A3A]" fill="none" stroke="currentColor">
        <path d="M50 40 L80 25 L110 40 L115 130 L45 130 Z" strokeWidth="2" fill="#FAF8F5" />
        <circle cx="80" cy="50" r="16" strokeWidth="2" fill="#EDE4D4" />
        <line x1="80" y1="66" x2="80" y2="130" strokeWidth="2" strokeDasharray="3 3" />
        <rect x="55" y="85" width="20" height="22" rx="2" strokeWidth="1.5" fill="#FFFFFF" />
        <rect x="85" y="85" width="20" height="22" rx="2" strokeWidth="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // Default Honey Jar Silhouette
  return (
    <svg viewBox="0 0 160 160" className="w-28 h-28 text-[#8A4B12]" fill="none" stroke="currentColor">
      <rect x="52" y="24" width="56" height="12" rx="2" fill="#1C1A17" strokeWidth="1.5" />
      <path d="M50 36 L110 36 L118 52 L118 132 C118 136 114 140 110 140 L50 140 C46 140 42 136 42 132 L42 52 Z" strokeWidth="2.5" fill="#FFFFFF" />
      <rect x="47" y="58" width="66" height="70" rx="3" fill="#F4DE9C" fillOpacity="0.45" />
      <rect x="52" y="68" width="56" height="42" rx="2" fill="#FFFFFF" strokeWidth="1" stroke="#E3DACB" />
      <text x="58" y="82" fill="#1C1A17" fontSize="8" fontFamily="serif" fontWeight="bold">BEE-Safe</text>
      <text x="58" y="93" fill="#8A4B12" fontSize="6" fontFamily="monospace">RAW RAW</text>
      <line x1="58" y1="99" x2="98" y2="99" stroke="#2F6B3A" strokeWidth="1.5" />
    </svg>
  );
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [telemetryOnly, setTelemetryOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  // Dropbox States
  const [isCategoryDropboxOpen, setIsCategoryDropboxOpen] = useState(false);
  const [expandedSpecId, setExpandedSpecId] = useState<string | null>(null);
  const [verifiedBatchId, setVerifiedBatchId] = useState<string | null>(null);
  const [isDropzoneActive, setIsDropzoneActive] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Global cart sync
  const { addItem: addGlobalItem } = useCart();

  // Modals & Local Drawers
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);
  const [cart, setCart] = useState<{ product: MarketplaceProduct; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccess] = useState(false);

  // Categories list
  const categories = [
    { id: "all", label: "All Reserve Items" },
    { id: "honey", label: "Raw Honey & Comb" },
    { id: "hardware", label: "Smart Hive Nodes & Scales" },
    { id: "beeswax", label: "Pure Cappings Beeswax" },
    { id: "colonies", label: "Breeder Queens & Nucs" },
    { id: "gear", label: "Apiary Protective Gear" },
  ];

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
      return 0;
    });
  }, [searchQuery, selectedCategory, telemetryOnly, sortBy]);

  // Cart operations
  const addToCart = (product: MarketplaceProduct, qty: number = 1) => {
    addGlobalItem({
      productId: product.id,
      slug: product.id,
      name: product.name,
      origin: product.specs.originApiary,
      size: product.category === "hardware" ? "1 Unit" : product.category === "beeswax" ? "500g Block" : "Standard",
      price: product.price,
      quantity: qty,
      batchId: product.specs.batchId || "MKT-EQUIP",
      colorSwatch: product.category === "honey" ? "#C98A2B" : "#8A4B12",
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
        .filter(Boolean) as { product: MarketplaceProduct; quantity: number }[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const toggleSpecDrawer = (id: string) => {
    setExpandedSpecId((prev) => (prev === id ? null : id));
  };

  const handleSimulatedDrop = (batch: string) => {
    setVerifiedBatchId(batch);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#1C1A17] font-sans antialiased selection:bg-[#C98A2B]/30">
      {/* Storefront Global Header */}
      <StorefrontHeader />

      {/* Flagship Notice Strip */}
      <div className="bg-[#EDE4D4] border-b border-[#E3DACB] px-4 py-2.5 text-xs text-[#665E55] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2F6B3A] shrink-0" />
          <span>
            <strong>BEE-Safe Direct Apiary Trade</strong> • Every lot cryptographically referenced on Ethereum Sepolia Testnet.
          </span>
        </div>
        <Link
          href="/shop"
          className="font-semibold text-[#8A4B12] hover:underline flex items-center gap-1"
        >
          <span>Explore Madhuvan Consumer Jars</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Hero Section with Manukora Restraint */}
      <section className="border-b border-[#E3DACB] py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E3DACB] text-xs font-mono font-medium text-[#8A4B12] mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#2F6B3A] animate-pulse" />
            <span>Apiary Direct Hardware & Terroir Reserve</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1A17] leading-[1.15] mb-4">
                Verified Apiary Trade & Smart Hardware
              </h1>
              <p className="text-base sm:text-lg text-[#665E55] leading-relaxed max-w-2xl">
                Source single-origin unadulterated raw comb, IoT brood telemetry nodes, and certified breeder queens directly from accredited beekeeping cooperatives across India.
              </p>
            </div>

            {/* Quick Proof Metrics */}
            <div className="grid grid-cols-3 gap-3 w-full lg:w-auto shrink-0 bg-[#FFFFFF] border border-[#E3DACB] p-4 rounded-xl shadow-xs">
              <div className="text-center px-2">
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#8A4B12]">100%</div>
                <div className="text-[11px] font-mono text-[#665E55]">Raw & Uncut</div>
              </div>
              <div className="text-center px-2 border-x border-[#E3DACB]">
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A17]">&lt;18%</div>
                <div className="text-[11px] font-mono text-[#665E55]">Moisture Level</div>
              </div>
              <div className="text-center px-2">
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#2F6B3A]">24h</div>
                <div className="text-[11px] font-mono text-[#665E55]">Live Telemetry</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Dropbox Strip */}
      <section className="bg-[#FAF7F2] border-b border-[#E3DACB] py-6 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto space-y-4">
          {/* THE BATCH DROPBOX (Physical-to-digital QR dropzone) */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDropzoneActive(true);
            }}
            onDragLeave={() => setIsDropzoneActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDropzoneActive(false);
              handleSimulatedDrop("MUZ-2024-02-LIT");
            }}
            className={`border-2 border-dashed rounded-xl p-4 sm:p-5 transition-all flex flex-col md:flex-row items-center justify-between gap-4 ${
              isDropzoneActive
                ? "border-[#8A4B12] bg-[#EDE4D4]"
                : "border-[#E3DACB] bg-[#FFFFFF] hover:border-[#8A4B12]/60"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-[#F6F1E7] border border-[#E3DACB] flex items-center justify-center text-[#8A4B12] shrink-0">
                <Upload className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#1C1A17]">
                  Batch Verification Drop Box
                </h3>
                <p className="text-xs text-[#665E55]">
                  Drag and drop a jar lid QR image, or pick an active apiary lot to preview live telemetry.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-mono text-[#665E55]">Sample lot:</span>
              <button
                onClick={() => handleSimulatedDrop("MUZ-2024-02-LIT")}
                className="px-2.5 py-1 text-xs font-mono rounded bg-[#F6F1E7] border border-[#E3DACB] hover:bg-[#EDE4D4] text-[#1C1A17]"
              >
                #MUZ-2024-02-LIT
              </button>
              <button
                onClick={() => handleSimulatedDrop("SHE-2024-03-MUS")}
                className="px-2.5 py-1 text-xs font-mono rounded bg-[#F6F1E7] border border-[#E3DACB] hover:bg-[#EDE4D4] text-[#1C1A17]"
              >
                #SHE-2024-03-MUS
              </button>
              <button
                onClick={() => handleSimulatedDrop("KAS-2024-05-ACA")}
                className="px-2.5 py-1 text-xs font-mono rounded bg-[#F6F1E7] border border-[#E3DACB] hover:bg-[#EDE4D4] text-[#1C1A17]"
              >
                #KAS-2024-05-ACA
              </button>
            </div>
          </div>

          {/* Active Verified Batch Passport Preview Drop-Drawer */}
          {verifiedBatchId && (
            <div className="p-4 bg-[#EDE4D4] border border-[#C98A2B] rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-start gap-3">
                <FileCheck2 className="w-5 h-5 text-[#2F6B3A] shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#2F6B3A]">
                      CRYPTOGRAPHICALLY AUTHENTICATED
                    </span>
                    <span className="font-mono text-xs text-[#1C1A17] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#E3DACB]">
                      {verifiedBatchId}
                    </span>
                  </div>
                  <p className="text-xs text-[#665E55] mt-1">
                    Continuous IoT weight curve active (+14.8 kg nectar flux) • NMR Purity Fingerprint passed • Sepolia Contract Verified.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto">
                <button
                  onClick={() => setVerifiedBatchId(null)}
                  className="px-3 py-1.5 text-xs font-medium text-[#665E55] hover:text-[#1C1A17]"
                >
                  Dismiss
                </button>
                <Link
                  href="/beekeeper"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-[#FFFFFF] bg-[#8A4B12] hover:bg-[#703C0D] rounded-lg transition-colors"
                >
                  <span>Open Beekeepers Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Controls Bar: Category Dropdown & Sorting */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Category Dropbox (Dropdown) */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoryDropboxOpen(!isCategoryDropboxOpen)}
                  className="inline-flex items-center justify-between gap-2 px-3.5 py-2 text-xs font-semibold bg-[#FFFFFF] border border-[#E3DACB] rounded-lg text-[#1C1A17] hover:bg-[#FAF7F2] min-w-[190px]"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Layers className="w-3.5 h-3.5 text-[#8A4B12]" />
                    <span>
                      {categories.find((c) => c.id === selectedCategory)?.label || "Select Category"}
                    </span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#665E55] transition-transform ${isCategoryDropboxOpen ? "rotate-180" : ""}`} />
                </button>

                {isCategoryDropboxOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-[#FFFFFF] border border-[#E3DACB] rounded-xl shadow-lg z-30 p-1.5 space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setIsCategoryDropboxOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors ${
                          selectedCategory === cat.id
                            ? "bg-[#EDE4D4] font-bold text-[#8A4B12]"
                            : "hover:bg-[#F6F1E7] text-[#1C1A17]"
                        }`}
                      >
                        <span>{cat.label}</span>
                        {selectedCategory === cat.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8A4B12]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Telemetry Filter Toggle */}
              <button
                onClick={() => setTelemetryOnly(!telemetryOnly)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  telemetryOnly
                    ? "bg-[#EDE4D4] border-[#8A4B12] text-[#8A4B12]"
                    : "bg-[#FFFFFF] border-[#E3DACB] text-[#665E55] hover:bg-[#FAF7F2]"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#2F6B3A]" />
                <span>Telemetry Certified Only</span>
              </button>
            </div>

            {/* Search Input & Sort Dropdown */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#665E55]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lots, sensors..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FFFFFF] border border-[#E3DACB] rounded-lg focus:outline-none focus:border-[#8A4B12]"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "rating")}
                className="bg-[#FFFFFF] border border-[#E3DACB] text-[#1C1A17] text-xs font-medium py-1.5 px-2.5 rounded-lg focus:outline-none focus:border-[#8A4B12]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-10">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#FFFFFF] border border-[#E3DACB] rounded-2xl p-8 max-w-lg mx-auto">
            <ShoppingBag className="w-12 h-12 text-[#E3DACB] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#1C1A17] mb-1">
              No matching reserve items found
            </h3>
            <p className="text-xs text-[#665E55] mb-5">
              Try adjusting your category filter, clearing your search query, or disabling the telemetry filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setTelemetryOnly(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-[#FFFFFF] bg-[#8A4B12] rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => {
              const isSpecExpanded = expandedSpecId === prod.id;

              return (
                <div
                  key={prod.id}
                  className="flex flex-col bg-[#FFFFFF] border border-[#E3DACB] rounded-2xl overflow-hidden hover:border-[#8A4B12]/60 hover:shadow-md transition-all group"
                >
                  {/* Card Visual Header with clean architectural SVG */}
                  <div className="h-52 bg-[#FAF7F2] border-b border-[#E3DACB] flex items-center justify-center relative p-6">
                    <ProductIllustration category={prod.category} name={prod.name} />

                    {prod.tag && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#FFFFFF] border border-[#E3DACB] text-[#8A4B12]">
                        {prod.tag}
                      </span>
                    )}

                    {prod.telemetryCertified && (
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 bg-[#FFFFFF] border border-[#E3DACB] rounded-full text-[10px] font-mono text-[#2F6B3A]">
                        <ShieldCheck className="w-3 h-3 text-[#2F6B3A]" />
                        <span>IoT Verified</span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating snippet */}
                      <div className="flex items-center gap-1.5 text-xs text-[#665E55] mb-2 font-mono">
                        <div className="flex items-center text-[#C98A2B]">
                          <Star className="w-3.5 h-3.5 fill-[#C98A2B]" />
                          <span className="ml-1 font-bold text-[#1C1A17]">{prod.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{prod.reviewCount} inspections</span>
                      </div>

                      {/* Title */}
                      <h2
                        onClick={() => setSelectedProduct(prod)}
                        className="font-serif text-lg font-bold text-[#1C1A17] mb-1.5 group-hover:text-[#8A4B12] transition-colors cursor-pointer"
                      >
                        {prod.name}
                      </h2>

                      {/* Short Description */}
                      <p className="text-xs text-[#665E55] leading-relaxed line-clamp-2 mb-3">
                        {prod.shortDesc}
                      </p>

                      {/* Origin Apiary Pill */}
                      <div className="text-[11px] font-mono text-[#665E55] mb-3 flex items-center gap-1.5">
                        <span className="text-[#8A4B12]">Apiary:</span>
                        <span className="truncate">{prod.specs.originApiary}</span>
                      </div>
                    </div>

                    {/* CARD SPEC DROPBOX DRAWER (Expandable inline telemetry) */}
                    <div className="mt-2 pt-3 border-t border-[#E3DACB]">
                      <button
                        onClick={() => toggleSpecDrawer(prod.id)}
                        className="w-full flex items-center justify-between text-xs font-mono font-semibold text-[#8A4B12] hover:text-[#703C0D] py-1 transition-colors"
                      >
                        <span className="flex items-center gap-1">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>{isSpecExpanded ? "Hide Telemetry Specs" : "View Live Telemetry Specs"}</span>
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSpecExpanded ? "rotate-180" : ""}`} />
                      </button>

                      {isSpecExpanded && (
                        <div className="mt-2.5 p-3 bg-[#FAF7F2] border border-[#E3DACB] rounded-xl text-xs font-mono space-y-1.5 animate-in fade-in duration-200">
                          {prod.specs.moisturePercent && (
                            <div className="flex justify-between">
                              <span className="text-[#665E55]">Moisture Level:</span>
                              <span className="font-bold text-[#2F6B3A]">{prod.specs.moisturePercent}% (&lt;18% Pass)</span>
                            </div>
                          )}
                          {prod.specs.hiveId && (
                            <div className="flex justify-between">
                              <span className="text-[#665E55]">Hive Node:</span>
                              <span className="font-bold text-[#1C1A17]">{prod.specs.hiveId}</span>
                            </div>
                          )}
                          {prod.specs.connectivity && (
                            <div className="flex justify-between">
                              <span className="text-[#665E55]">Protocols:</span>
                              <span className="text-[#1C1A17]">{prod.specs.connectivity}</span>
                            </div>
                          )}
                          {prod.specs.batteryLife && (
                            <div className="flex justify-between">
                              <span className="text-[#665E55]">Battery Endurance:</span>
                              <span className="text-[#1C1A17]">{prod.specs.batteryLife}</span>
                            </div>
                          )}
                          {prod.specs.sepoliaHash && (
                            <div className="flex justify-between pt-1 border-t border-[#E3DACB]">
                              <span className="text-[#665E55]">Sepolia Anchor:</span>
                              <span className="text-[#8A4B12]">{prod.specs.sepoliaHash}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Pricing & Cart Action Row */}
                      <div className="pt-3 flex items-center justify-between gap-2 mt-2">
                        <div>
                          <span className="text-[10px] font-mono text-[#665E55] block">Price (INR)</span>
                          <span className="font-serif text-xl font-bold text-[#1C1A17]">
                            ₹{prod.price.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedProduct(prod)}
                            className="px-3 py-1.5 text-xs font-medium text-[#665E55] bg-[#FFFFFF] border border-[#E3DACB] rounded-lg hover:bg-[#FAF7F2] transition-colors"
                          >
                            Inspect
                          </button>
                          <button
                            onClick={() => addToCart(prod)}
                            className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-[#FFFFFF] bg-[#8A4B12] hover:bg-[#703C0D] rounded-lg transition-colors shadow-xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Video Inspection Preview Card (Mock video container) */}
        <div className="mt-16 bg-[#FFFFFF] border border-[#E3DACB] rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E3DACB] text-[11px] font-mono text-[#8A4B12] mb-3">
              <Radio className="w-3.5 h-3.5 text-[#2F6B3A] animate-pulse" />
              <span>Apiary Field Operations</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17] mb-2">
              Inside Hive #01: Acoustic AI & Load-Cell Calibration
            </h3>
            <p className="text-xs sm:text-sm text-[#665E55] leading-relaxed mb-4">
              Watch how our INMP441 MEMS microphone tracks queen piping frequencies, while the sub-hive HX711 scale measures real-time nectar influx during peak litchi blooming.
            </p>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#FFFFFF] bg-[#8A4B12] hover:bg-[#703C0D] rounded-lg transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Preview Video Teaser (01:45)</span>
            </button>
          </div>

          {/* Video Container Frame */}
          <div
            onClick={() => setIsVideoModalOpen(true)}
            className="w-full md:w-80 aspect-video bg-[#1C1A17] rounded-xl relative overflow-hidden flex items-center justify-center cursor-pointer group shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="w-12 h-12 rounded-full bg-[#FFFFFF]/90 group-hover:bg-[#FFFFFF] flex items-center justify-center text-[#8A4B12] shadow-lg group-hover:scale-105 transition-transform z-10">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
            <div className="absolute bottom-2.5 left-3 right-3 text-[11px] font-mono text-[#FFFFFF] flex justify-between z-10">
              <span>Meadow Apiary Yard</span>
              <span>01:45</span>
            </div>
          </div>
        </div>

        {/* Comparison Matrix Table (Manukora-Style 3-Way Proof Comparison) */}
        <section className="mt-16 bg-[#FFFFFF] border border-[#E3DACB] rounded-2xl p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-xs font-mono uppercase tracking-widest text-[#8A4B12] mb-1">
              PROVENANCE COMPARISON
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17]">
              Why BEE-Safe Telemetry is Different
            </h3>
            <p className="text-xs sm:text-sm text-[#665E55] mt-2">
              Unlike static laboratory certificates that are easy to copy, BEE-Safe pairs chemical testing with continuous live hive sensor telemetry.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left">
              <thead>
                <tr className="border-b border-[#E3DACB]">
                  <th className="py-3 px-4 font-serif text-sm font-bold text-[#1C1A17]">Verification Metric</th>
                  <th className="py-3 px-4 text-[#8A4B12] font-bold bg-[#EDE4D4]/40 rounded-t-lg">
                    BEE-Safe Direct
                  </th>
                  <th className="py-3 px-4 text-[#665E55]">Supermarket Honey</th>
                  <th className="py-3 px-4 text-[#665E55]">Unverified Raw Honey</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3DACB]">
                <tr>
                  <td className="py-3.5 px-4 font-sans text-xs font-medium text-[#1C1A17]">
                    75-Day Continuous Weight Scale Curve
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#2F6B3A] bg-[#EDE4D4]/40">
                    ✓ Live HX711 Load Cell
                  </td>
                  <td className="py-3.5 px-4 text-[#665E55]">✗ None</td>
                  <td className="py-3.5 px-4 text-[#665E55]">✗ None</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-sans text-xs font-medium text-[#1C1A17]">
                    Acoustic Colony Health AI Score
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#2F6B3A] bg-[#EDE4D4]/40">
                    ✓ INMP441 Frequency AI
                  </td>
                  <td className="py-3.5 px-4 text-[#665E55]">✗ None</td>
                  <td className="py-3.5 px-4 text-[#665E55]">✗ None</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-sans text-xs font-medium text-[#1C1A17]">
                    Independent NMR Spectrometry Report
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#2F6B3A] bg-[#EDE4D4]/40">
                    ✓ Downloadable CoA
                  </td>
                  <td className="py-3.5 px-4 text-[#665E55]">✗ Rare / Internal only</td>
                  <td className="py-3.5 px-4 text-[#665E55]">? Unverified</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-sans text-xs font-medium text-[#1C1A17]">
                    Ethereum Sepolia Testnet Immutability
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#2F6B3A] bg-[#EDE4D4]/40">
                    ✓ Public Tx Hash
                  </td>
                  <td className="py-3.5 px-4 text-[#665E55]">✗ Centralized database</td>
                  <td className="py-3.5 px-4 text-[#665E55]">✗ None</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-sans text-xs font-medium text-[#1C1A17]">
                    Fair Direct Apiary Proceeds
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#2F6B3A] bg-[#EDE4D4]/40">
                    ✓ 85% to Beekeepers
                  </td>
                  <td className="py-3.5 px-4 text-[#665E55]">✗ &lt;20% after middlemen</td>
                  <td className="py-3.5 px-4 text-[#665E55]">Variable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Trust & Guarantee Section */}
      <section className="bg-[#FAF7F2] border-t border-[#E3DACB] py-12 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EDE4D4] border border-[#DDD3C2] flex items-center justify-center text-[#8A4B12] shrink-0">
              <Award className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#1C1A17] mb-1">
                Zero Corn Syrup or Rice Adulteration
              </h4>
              <p className="text-xs text-[#665E55] leading-relaxed">
                Every batch is certified by carbon isotope C4 analysis and refractive moisture measurement before listing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EDE4D4] border border-[#DDD3C2] flex items-center justify-center text-[#8A4B12] shrink-0">
              <Scale className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#1C1A17] mb-1">
                Direct Cooperative Pricing
              </h4>
              <p className="text-xs text-[#665E55] leading-relaxed">
                85% of each order proceeds go directly to regional beekeeping cooperatives without aggregator cuts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EDE4D4] border border-[#DDD3C2] flex items-center justify-center text-[#8A4B12] shrink-0">
              <Truck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#1C1A17] mb-1">
                Climate Protected Transit
              </h4>
              <p className="text-xs text-[#665E55] leading-relaxed">
                Raw comb and live queens are packaged in thermal-insulated foam boxes with rapid 48-hour priority courier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Storefront Footer */}
      <StorefrontFooter />

      {/* Video Modal Preview */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1A17] border border-[#E3DACB]/30 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl p-6 text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-[#C98A2B] uppercase tracking-wider">
                  FIELD TELEMETRY VIDEO
                </span>
                <h3 className="font-serif text-lg font-bold text-white">
                  Hive #01 Acoustic & Weight Calibration
                </h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-white/70 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-8 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#8A4B12] flex items-center justify-center mx-auto text-white shadow-xl animate-pulse">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <p className="text-xs text-white/70 max-w-md mx-auto font-mono">
                [High-resolution video footage placeholder — ready for live media asset integration in the upcoming phase.]
              </p>
              <div className="text-[11px] font-mono text-[#2F6B3A]">
                Sensor Feed Active • 242 Hz Queen Resonance • 48.6 kg Gross Weight
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-2 text-xs font-mono font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Close Video Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E3DACB] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between pb-4 border-b border-[#E3DACB]">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#8A4B12] uppercase tracking-wider">
                  {selectedProduct.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A17] mt-0.5">
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-[#665E55] hover:text-[#1C1A17] p-1 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-5 space-y-5">
              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start bg-[#FAF7F2] border border-[#E3DACB] p-4 rounded-xl">
                <ProductIllustration category={selectedProduct.category} name={selectedProduct.name} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-[#C98A2B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C98A2B]" />
                      ))}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#1C1A17]">
                      {selectedProduct.rating} / 5.0
                    </span>
                    <span className="text-xs font-mono text-[#665E55]">
                      ({selectedProduct.reviewCount} verified audits)
                    </span>
                  </div>
                  <p className="text-xs text-[#665E55] leading-relaxed">
                    {selectedProduct.fullDesc}
                  </p>
                </div>
              </div>

              {/* Specification Table */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1C1A17] mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2F6B3A]" />
                  Verified Apiary Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-[#FAF7F2] border border-[#E3DACB] p-3.5 rounded-xl">
                  <div>
                    <span className="text-[#665E55] block">Source Apiary:</span>
                    <strong className="text-[#1C1A17]">{selectedProduct.specs.originApiary}</strong>
                  </div>
                  {selectedProduct.specs.moisturePercent && (
                    <div>
                      <span className="text-[#665E55] block">Refractive Moisture:</span>
                      <strong className="text-[#2F6B3A]">{selectedProduct.specs.moisturePercent}% (Grade A Export)</strong>
                    </div>
                  )}
                  {selectedProduct.specs.harvestDate && (
                    <div>
                      <span className="text-[#665E55] block">Extraction Date:</span>
                      <strong className="text-[#1C1A17]">{selectedProduct.specs.harvestDate}</strong>
                    </div>
                  )}
                  {selectedProduct.specs.hiveId && (
                    <div>
                      <span className="text-[#665E55] block">Telemetry Hive Node:</span>
                      <strong className="text-[#1C1A17]">{selectedProduct.specs.hiveId} (Acoustic Verified)</strong>
                    </div>
                  )}
                  {selectedProduct.specs.connectivity && (
                    <div>
                      <span className="text-[#665E55] block">Connectivity:</span>
                      <strong className="text-[#1C1A17]">{selectedProduct.specs.connectivity}</strong>
                    </div>
                  )}
                  {selectedProduct.specs.batteryLife && (
                    <div>
                      <span className="text-[#665E55] block">Battery Life:</span>
                      <strong className="text-[#1C1A17]">{selectedProduct.specs.batteryLife}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Bottom Action */}
            <div className="pt-4 border-t border-[#E3DACB] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#665E55] block">Price (INR, Taxes Included)</span>
                <span className="font-serif text-2xl font-bold text-[#1C1A17]">
                  ₹{selectedProduct.price.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#665E55] bg-[#FAF7F2] rounded-lg hover:bg-[#EDE4D4]"
                >
                  Continue Browsing
                </button>
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2 text-xs font-semibold text-[#FFFFFF] bg-[#8A4B12] hover:bg-[#703C0D] rounded-lg shadow-xs"
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
          <div className="bg-[#FFFFFF] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#E3DACB]">
            <div className="p-5 border-b border-[#E3DACB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#8A4B12]" />
                <h3 className="font-serif text-lg font-bold text-[#1C1A17]">
                  Your Basket ({cartItemCount})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-[#665E55] hover:text-[#1C1A17] p-1 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-[#E3DACB] mx-auto mb-2" />
                  <p className="font-serif text-base font-bold text-[#1C1A17]">Your basket is empty</p>
                  <p className="text-xs text-[#665E55] mt-1 font-mono">
                    Select certified raw comb, telemetry hardware, or gear.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 bg-[#FAF7F2] border border-[#E3DACB] rounded-xl flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-bold text-[#1C1A17] truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-xs font-mono font-bold text-[#8A4B12] mt-0.5">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div className="flex items-center border border-[#E3DACB] rounded-md bg-[#FFFFFF]">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="px-2 py-1 text-xs hover:bg-[#FAF7F2] text-[#665E55]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-[#1C1A17]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="px-2 py-1 text-xs hover:bg-[#FAF7F2] text-[#665E55]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#665E55] hover:text-red-700 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-[#E3DACB] bg-[#FAF7F2] space-y-3 font-mono">
                <div className="flex items-center justify-between text-xs text-[#665E55]">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#665E55]">
                  <span>Telemetry Seal & Transit</span>
                  <span className="text-[#2F6B3A] font-semibold">FREE</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-[#1C1A17] pt-2 border-t border-[#E3DACB]">
                  <span>Total</span>
                  <span className="text-[#8A4B12]">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>

                {orderSuccess ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 flex items-center justify-center gap-2 text-xs font-bold font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Order dispatched to apiary cooperative!
                  </div>
                ) : (
                  <div className="space-y-2 pt-1 font-sans">
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-3 text-sm font-bold text-[#FFFFFF] bg-[#8A4B12] hover:bg-[#703C0D] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
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
