import { Product } from "./types";

export const BRAND_NAME = "BEE safe";
export const BRAND_TAGLINE = "Raw Honey. Monitored by IoT. Verified on HoneyChain.";
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
    description: "Cold-harvested from orchard hives situated across the litchi groves of Muzaffarpur during the peak 18-day March blossom window. Unheated and coarse-filtered to preserve floral aromatics and native pollen grains.",
    sizes: [
      { size: "250g", price: 480 },
      { size: "500g", price: 890 },
    ],
    activeBatchId: "HC-2026-MUS-014",
    image: "/images/honey-litchi.jpg",
    inStock: true,
    bestFor: "Best for morning tea & fresh toast",
    bullets: [
      "Harvested during the 18-day March blossom window in Bihar",
      "Raw, unheated, and coarse-filtered to protect native floral pollen",
      "Crystallises naturally within 3–5 months into a smooth, spreadable texture",
    ],
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
    description: "Gathered at 1,800m elevation in the Kashmir Valley. Because acacia bloom lasts less than two weeks before Himalayan mountain weather arrives, colonies are monitored by weight scales daily to capture the exact nectar peak without blending.",
    sizes: [
      { size: "250g", price: 650 },
      { size: "500g", price: 1200 },
    ],
    activeBatchId: "HC-2026-KSH-008",
    image: "/images/honey-acacia.jpg",
    inStock: true,
    bestFor: "Best for delicate infusions & cheeses",
    bullets: [
      "High-altitude bloom gathered at 1,800m elevation in Pulwama",
      "Unblended raw nectar with water-white clarity and mild vanilla notes",
      "Naturally high fructose keeps it fluid and crystal-free for over a year",
    ],
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
    description: "Collected sustainably in community apiaries established along the buffer boundary of the Sundarbans mangrove delta. Rich in minerals and natural mangrove nectar notes with a distinctive hint of coastal salt air.",
    sizes: [
      { size: "250g", price: 540 },
      { size: "500g", price: 980 },
    ],
    activeBatchId: "HC-2026-SUN-021",
    image: "/images/honey-mangrove.jpg",
    inStock: true,
    bestFor: "Best for warm tonics & sharp cheese",
    bullets: [
      "Wild mangrove nectar harvested along the Sundarbans reserve buffer",
      "Bold, saline profile with complex floral minerals and deep amber tone",
      "Naturally sets into a fine granular crystal within 2 months",
    ],
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
    description: "Three 150g glass jars packed in an untreated kraft gift sleeve. Compare how soil, altitude, and blossom variety shape the color and taste of honest honey. Every jar links directly to its verified hive telemetry and laboratory certificate.",
    sizes: [
      { size: "Tasting Trio (3x150g)", price: 1450 },
    ],
    activeBatchId: "HC-2026-MUS-014",
    image: "/images/honey-trio.jpg",
    inStock: true,
    isTastingBox: true,
    bestFor: "Best for comparative tastings & gifting",
    bullets: [
      "Three 150g glass jars: Litchi Blossom, White Acacia, and Wild Mangrove",
      "Batch traceability on each jar links to that harvest's IoT telemetry",
      "Packed in an untreated kraft sleeve with no plastic film",
    ],
  },
];

export const CSE_STUDY_DATA = {
  headline: "10 of 13 Indian honey brands failed NMR purity testing — CSE, 2020",
  source: "Centre for Science and Environment (CSE) 2020 Honey Adulteration Investigation",
  sourceUrl: "https://www.cseindia.org/cse-investigation-finds-adulterated-honey-in-indian-market-10519",
  takeaway: "Traditional laboratory tests miss modern sugar syrups (C4/rice/beet). Nuclear Magnetic Resonance (NMR) spectroscopy maps the molecular fingerprint of pure nectar.",
};

export const COMPARISON_ROWS = [
  {
    feature: "Traceable to a named hive",
    beeSafe: "Yes, every batch",
    supermarket: "Rarely",
  },
  {
    feature: "Batch record you can open",
    beeSafe: "Yes, via batch passport",
    supermarket: "Not usually",
  },
  {
    feature: "Single origin (unblended)",
    beeSafe: "Yes, one floral flow",
    supermarket: "Rarely",
  },
  {
    feature: "Tamper-evident record",
    beeSafe: "Ethereum Sepolia testnet",
    supermarket: "None",
  },
];

export const FAQS = [
  {
    question: "Why does real honey crystallise?",
    answer: "Natural raw honey is a supersaturated solution of natural floral sugars. Over time, glucose molecules spontaneously form crystals. It is a biological signature that the honey has never been ultra-heated or stripped of native pollen. Industrial honey is heated above 65°C to keep it permanently liquid on supermarket shelves, which dulls natural floral aromatics.",
  },
  {
    question: "How do I trace my jar's IoT telemetry?",
    answer: "Every BEE safe jar features a unique batch hash on its label. Enter this batch ID on our verification page to view the origin hive's weight curve during nectar flow, brood nest temperature stability, colony acoustic health, independent lab testing results, and the Sepolia testnet transaction record.",
  },
  {
    question: "What does the blockchain record prove (and not prove)?",
    answer: "The blockchain doesn't test the honey — independent testing laboratories do. What Ethereum Sepolia testnet provides is a tamper-evident audit trail: once hive telemetry, harvest weight, and lab report hashes are anchored on-chain, no party can alter or rewrite that history after the fact.",
  },
  {
    question: "How should I store raw honey?",
    answer: "Store your jar at room temperature away from direct sunlight with the lid tightly closed. Raw honey does not spoil. If your honey crystallises into a buttery solid, enjoy it spread on warm bread, or place the jar in a warm water bath under 40°C to gently reliquefy.",
  },
  {
    question: "How does delivery work?",
    answer: "Every order is carefully packaged in recycled kraft shock-absorbing cartons to safeguard our glass jars. Each shipment is sealed with a tamper-evident cryptographic batch hash that links directly to its origin hive record.",
  },
];

export const LEARN_ARTICLES = [
  {
    id: "crystallisation",
    title: "Why real honey crystallises",
    snippet: "Crystallisation is proof of raw, unheated honey. Learn why commercial honey stays liquid forever and why raw floral honey sets into buttery crystals.",
    readTime: "3 min read",
    anchor: "#faq-0",
  },
  {
    id: "iot-telemetry",
    title: "How IoT sensors protect hive health",
    snippet: "From load-cell scales to acoustic microphones: how non-intrusive IoT sensors monitor colony health and ensure honey is harvested only at natural ripeness.",
    readTime: "4 min read",
    anchor: "#faq-1",
  },
  {
    id: "blockchain-proof",
    title: "What the blockchain record proves (and doesn't)",
    snippet: "An honest breakdown of why blockchain provides tamper-evident audit trails, and where physical lab testing fits into the verification pipeline.",
    readTime: "4 min read",
    anchor: "#faq-2",
  },
];
