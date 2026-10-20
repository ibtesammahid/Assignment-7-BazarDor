
import { Suspense } from "react";
import ProductDetails from "./ProductsDetailsContent";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="min-w-0 flex-1 bg-[#f0f5f0]">
          <div className="mx-auto min-h-screen w-full max-w-5xl px-3 py-4 sm:px-5 sm:py-6 md:px-6 lg:px-8">
            <div className="mb-4 h-8 w-48 animate-pulse rounded bg-gray-200" />
            <div className="mb-4 h-40 animate-pulse rounded-xl bg-gray-200" />
            <div className="h-64 animate-pulse rounded-xl bg-gray-200" />
          </div>
        </main>
      }
    >
      <ProductDetails params={params} />
    </Suspense>
  );
}
