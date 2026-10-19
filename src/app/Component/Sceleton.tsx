const ProductSkeleton = () => {
  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
      aria-label="পণ্য লোড হচ্ছে"
      aria-busy="true"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="min-w-0 animate-pulse rounded-xl border border-gray-200 bg-white p-3 sm:p-4"
        >
          {/* Product image skeleton */}
          <div className="mb-3 flex h-32 items-center justify-center rounded-lg bg-gray-200 sm:mb-4 sm:h-40">
            <div className="h-16 w-16 rounded-full bg-gray-300 sm:h-20 sm:w-20" />
          </div>

          {/* Product name skeleton */}
          <div className="mb-3 h-5 w-3/4 rounded bg-gray-200" />

          {/* Price skeleton */}
          <div className="mb-3 h-6 w-1/2 rounded bg-gray-200" />

          {/* Details skeleton */}
          <div className="mb-2 h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-2/3 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;