import { Suspense } from "react";
import { BatchVerificationContent } from "./BatchVerificationContent";
import { getAllBatches } from "@/data/batches";
import { Metadata } from "next";

export function generateStaticParams() {
  return getAllBatches().map((batch) => ({
    batchId: batch.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ batchId: string }>;
}): Promise<Metadata> {
  const { batchId } = await params;
  return {
    title: `Verify Batch ${batchId} | HoneyChain Traceability Passport`,
    description: `Inspect live smart hive telemetry, laboratory NMR spectroscopy, and Sepolia blockchain proof for honey batch ${batchId}.`,
  };
}

export default async function BatchVerificationPage({
  params,
}: {
  params: Promise<{ batchId: string }>;
}) {
  const { batchId } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F6F1E7] flex items-center justify-center p-8">
          <div className="text-center space-y-2 font-mono text-sm text-[#665E55]">
            <div className="w-8 h-8 border-2 border-[#8A4B12] border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Loading HoneyChain batch passport...</p>
          </div>
        </div>
      }
    >
      <BatchVerificationContent batchId={batchId} />
    </Suspense>
  );
}
