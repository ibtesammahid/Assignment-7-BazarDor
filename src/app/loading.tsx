import ProductSkeleton from "./Component/Sceleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 h-8 w-56 animate-pulse rounded bg-gray-200" />

      <ProductSkeleton />
    </main>
  );
}