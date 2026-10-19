import ProductSkeleton from "./Component/Sceleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-6 md:px-6 md:py-8 lg:px-8">
      {/* Page heading skeleton */}
      <div className="mb-5 h-7 w-36 animate-pulse rounded bg-gray-200 sm:mb-6 sm:h-8 sm:w-48 md:w-56" />

      {/* Product loading skeletons */}
      <div className="w-full min-w-0">
        <ProductSkeleton />
      </div>
    </main>
  );
}