
import ProductSkeleton from "@/app/Component/Sceleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-4 sm:py-8 md:px-6 lg:px-8">
      <div className="mb-5 h-7 w-36 animate-pulse rounded bg-gray-200 sm:mb-6 sm:h-8 sm:w-48" />

      <ProductSkeleton />
    </main>
  );
}
