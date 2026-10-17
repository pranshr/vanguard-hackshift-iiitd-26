import { Suspense } from "react";
import { OrderConfirmationContent } from "./OrderConfirmationContent";
import { Metadata } from "next";

export function generateStaticParams() {
  return [{ id: "demo" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Order Confirmation #${id} | Madhuvan Raw Honey`,
    description: `Your raw honey order #${id} has been confirmed. Inspect the live smart hive telemetry and NMR lab report of your harvest.`,
  };
}

async function OrderWrapper({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderConfirmationContent orderId={id} />;
}

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F6F1E7] flex items-center justify-center p-8">
          <div className="text-center font-mono text-sm text-[#665E55]">
            <div className="w-8 h-8 border-2 border-[#8A4B12] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p>Loading order confirmation...</p>
          </div>
        </div>
      }
    >
      <OrderWrapper params={params} />
    </Suspense>
  );
}
