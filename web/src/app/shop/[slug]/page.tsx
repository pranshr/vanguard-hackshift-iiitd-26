import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/storefront";
import { ProductDetailContent } from "./ProductDetailContent";
import { Metadata } from "next";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    return {
      title: "Product Not Found | BEE safe",
    };
  }

  return {
    title: `${product.name} | BEE safe`,
    description: `Raw, single-origin ${product.botanicalOrigin} honey from ${product.region}. Monitored by IoT and verified on HoneyChain batch #${product.activeBatchId}.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F6F1E7] flex items-center justify-center p-8">
          <div className="text-center font-mono text-sm text-[#665E55]">
            <div className="w-8 h-8 border-2 border-[#8A4B12] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p>Loading honey terroir profile...</p>
          </div>
        </div>
      }
    >
      <ProductDetailContent product={product} />
    </Suspense>
  );
}
