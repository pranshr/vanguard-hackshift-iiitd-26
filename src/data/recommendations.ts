import { PRODUCTS } from "./storefront";

export interface LastMinuteRecommendation {
  id: string; // matches cart unique format or item identifier
  productId: string;
  slug: string;
  name: string;
  category: "Accessory" | "Superfood" | "Pantry" | "Honey";
  tagline: string;
  description: string;
  size: string;
  price: number;
  origin: string;
  batchId: string;
  colorSwatch: string;
  image: string;
  badge?: string;
  whyPair: string;
}

export const ARTISANAL_ACCESSORIES: LastMinuteRecommendation[] = PRODUCTS.filter(
  (p) => p.category && p.category !== "Honey"
).map((p) => {
  const defaultSize = p.sizes[0];
  let badge = "Add-on";
  if (p.category === "Accessory") {
    badge = p.id.includes("wax") ? "Zero Paraffin" : "Tasting Essential";
  } else if (p.category === "Superfood") {
    badge = "Superfood";
  } else if (p.category === "Pantry") {
    badge = "Apiary Rare";
  }

  return {
    id: `rec-${p.slug}`,
    productId: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category as "Accessory" | "Superfood" | "Pantry",
    tagline: p.shortTag,
    description: p.description,
    size: defaultSize.size,
    price: defaultSize.price,
    origin: p.region,
    batchId: p.activeBatchId,
    colorSwatch: p.colorHex,
    image: p.image,
    badge,
    whyPair: p.bestFor || p.bullets?.[0] || p.shortTag,
  };
});

/**
 * Returns dynamic recommendations combining accessories and unadded single-origin honeys
 */
export function getRecommendedAdditions(cartProductIds: string[] = []): LastMinuteRecommendation[] {
  // Map missing honey products into recommendations
  const missingHoneys: LastMinuteRecommendation[] = PRODUCTS.filter(
    (p) => (!p.category || p.category === "Honey") && !cartProductIds.includes(p.id)
  ).map((p) => {
    const defaultSize = p.sizes[0];
    return {
      id: `${p.id}-${defaultSize.size}`,
      productId: p.id,
      slug: p.slug,
      name: p.name,
      category: "Honey",
      tagline: p.shortTag,
      description: p.description,
      size: defaultSize.size,
      price: defaultSize.price,
      origin: p.region,
      batchId: p.activeBatchId,
      colorSwatch: p.colorHex,
      image: p.image,
      badge: p.isTastingBox ? "Gift Set" : "Single Origin",
      whyPair: p.bestFor || `Distinct ${p.colorName.toLowerCase()} terroir`,
    };
  });

  // Return accessories first, followed by unadded honeys
  return [...ARTISANAL_ACCESSORIES, ...missingHoneys];
}
