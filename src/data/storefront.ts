import { Product } from "./types";

export const BRAND_NAME = "Madhuvan Raw Honey";
export const BRAND_TAGLINE = "Single-Origin Raw Honey. Verified from Hive to Jar.";
export const VERIFICATION_LAYER = "HoneyChain";

export const PRODUCTS: Product[] = [
  {
    id: "prod-litchi",
    slug: "muzaffarpur-litchi",
    name: "Muzaffarpur Litchi Blossom Raw Honey",
    botanicalOrigin: "Litchi chinensis",
    region: "Muzaffarpur District, Bihar",
    shortTag: "Delicate & Floral",
    colorName: "Light Golden Amber",
    colorHex: "#E5A93C",
    tasteIntensity: 2,
    tasteNotes: ["Fresh litchi pulp", "Citrus blossom", "Clean herbal finish"],
    pairings: ["Chamomile tea", "Fresh sourdough with butter", "Young goat cheese"],
    crystallisationNote: "Crystallises naturally within 3–5 months into a smooth, buttery texture. Gently warm jar in water under 40°C to reliquefy.",
    description: "Cold-harvested from orchard hives situated across the litchi groves of Muzaffarpur during the peak 18-day March blossom window. Completely unheated and coarse-filtered to preserve wild enzymes, floral aromatics, and native pollen grains.",
    sizes: [
      { size: "250g", price: 480 },
      { size: "500g", price: 890 },
    ],
    activeBatchId: "HC-2026-MUS-014",
    image: "/images/honey-litchi.jpg",
    inStock: true,
  },
  {
    id: "prod-acacia",
    slug: "kashmir-white-acacia",
    name: "Kashmir White Acacia Raw Honey",
    botanicalOrigin: "Robinia pseudoacacia",
    region: "Pulwama District, Jammu & Kashmir",
    shortTag: "Crystal Clear & Vanilla",
    colorName: "Pale White Amber",
    colorHex: "#F3E2B8",
    tasteIntensity: 1,
    tasteNotes: ["Delicate vanilla bean", "Spring acacia flower", "Buttery mild sweetness"],
    pairings: ["Delicate green teas", "Fresh ricotta", "Sliced crisp pears"],
    crystallisationNote: "Naturally high in fructose, meaning it remains fluid and crystal-free for 12+ months when kept at room temperature.",
    description: "Gathered at 1,800m elevation in the Kashmir Valley. Because acacia bloom lasts less than two weeks before Himalayan mountain squalls arrive, colonies are monitored by weight scales daily to capture the exact nectar peak without blending.",
    sizes: [
      { size: "250g", price: 650 },
      { size: "500g", price: 1200 },
    ],
    activeBatchId: "HC-2026-KSH-008",
    image: "/images/honey-acacia.jpg",
    inStock: true,
  },
  {
    id: "prod-mangrove",
    slug: "sundarbans-wild-mangrove",
    name: "Sundarbans Wild Mangrove Forest Honey",
    botanicalOrigin: "Aegiceras corniculatum & Avicennia",
    region: "Sundarbans Buffer Reserve, West Bengal",
    shortTag: "Bold, Saline & Complex",
    colorName: "Deep Mahogany Amber",
    colorHex: "#5E300A",
    tasteIntensity: 5,
    tasteNotes: ["Malty molasses", "Ocean saline mineral", "Wild tamarind and resin"],
    pairings: ["Strong blue cheese", "Spiced chai", "Rustic rye sourdough"],
    crystallisationNote: "Contains micro-minerals from tidal waters; sets into a fine granular crystal within 2 months of extraction.",
    description: "Collected sustainably in community apiaries established along the tiger-safe buffer boundary of the Sundarbans mangrove delta. Rich in minerals and natural mangrove nectar notes with a distinctive hint of coastal salt air.",
    sizes: [
      { size: "250g", price: 540 },
      { size: "500g", price: 980 },
    ],
    activeBatchId: "HC-2026-SUN-021",
    image: "/images/honey-mangrove.jpg",
    inStock: true,
  },
  {
    id: "prod-tasting-trio",
    slug: "terroir-tasting-trio",
    name: "The Terroir Tasting Trio (Gift Set)",
    botanicalOrigin: "Three Regional Flora Varieties",
    region: "Bihar · Kashmir · West Bengal",
    shortTag: "Flight of 3 Terroirs",
    colorName: "Amber Flight",
    colorHex: "#C98A2B",
    tasteIntensity: 3,
    tasteNotes: ["Litchi Blossom (Floral)", "White Acacia (Vanilla)", "Wild Mangrove (Bold Salt)"],
    pairings: ["Cheese & charcuterie board", "Comparative origin tasting flight", "Artisanal breakfast spreads"],
    crystallisationNote: "Three distinct nectar types will show three distinct crystallization timelines in your pantry.",
    description: "Three 150g glass jars packed in an untreated kraft gift sleeve. Compare how soil, altitude, and blossom variety shape the color and taste of honest honey. Every jar features its own lid QR code linking to its specific smart hive.",
    sizes: [
      { size: "Tasting Trio (3x150g)", price: 1450 },
    ],
    activeBatchId: "HC-2026-MUS-014",
    image: "/images/honey-trio.jpg",
    inStock: true,
    isTastingBox: true,
  },
];

export const CSE_STUDY_DATA = {
  headline: "10 of 13 Indian honey brands failed the NMR purity test.",
  source: "Centre for Science and Environment (CSE) 2020 Honey Adulteration Investigation",
  sourceUrl: "https://www.cseindia.org/cse-investigation-finds-adulterated-honey-in-indian-market-10519",
  takeaway: "Traditional laboratory tests miss modern sugar syrups (C4/rice/beet). Nuclear Magnetic Resonance (NMR) spectroscopy maps the molecular fingerprint of pure nectar.",
};

export const FAQS = [
  {
    question: "Why does real honey crystallise?",
    answer: "Natural raw honey is a supersaturated sugar solution of glucose and fructose. Over time, glucose molecules spontaneously form crystals. It is a biological signature that the honey has never been ultra-heated or chemically ultra-filtered. Commercial brands overheat honey to keep it permanently liquid on supermarket shelves, which destroys enzymes and aromas.",
  },
  {
    question: "What is NMR testing and why does it matter?",
    answer: "Nuclear Magnetic Resonance (NMR) spectroscopy acts as an MRI for honey. While basic tests only check for simple C4 corn syrup, NMR maps every hydrogen atom's magnetic resonance, detecting micro-adulteration from high-fructose rice or beet syrups and verifying single-origin botanical veracity.",
  },
  {
    question: "What does scanning the lid QR show me?",
    answer: "Scanning our jar lid opens its verified batch passport on HoneyChain. You will see the smart hive weight accumulation curve during the nectar flow, the day it was harvested, brood nest temperature stability, colony acoustic health, the NMR lab certificate, and the immutable Sepolia testnet transaction hash.",
  },
  {
    question: "What does the blockchain record prove?",
    answer: "The blockchain doesn't test the honey — the accredited laboratory does. What Ethereum Sepolia testnet provides is a tamper-evident, permanent audit trail: once the hive telemetry, harvest weight, and NMR lab report hashes are anchored on-chain, no party can modify or fabricate the history after the fact.",
  },
  {
    question: "Why does Madhuvan raw honey cost more than grocery store honey?",
    answer: "Industrial honey is blended from bulk unverified lots and stretched with subsidized sugar syrups. Madhuvan honey is single-origin, harvested only when bees cap the comb (ensuring natural moisture under 18%), and every batch pays beekeepers a living premium for maintaining telemetry-equipped hives.",
  },
];
