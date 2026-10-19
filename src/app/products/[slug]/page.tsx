import { Product } from "@/Types/AllProductsType";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductDetailsProps {
  params: Promise<{
    slug: string;
  }>;
}

const formatBn = (value: number) => value.toLocaleString("bn-BD");

const ProductDetails = async ({ params }: ProductDetailsProps) => {
  const { slug } = await params;

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const data = await res.json();

  const products: Product[] = Array.isArray(data)
    ? data
    : Array.isArray(data.data)
      ? data.data
      : [];

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const prices = product.markets.map((market) => ({
    ...market,
    average: (market.min + market.max) / 2,
  }));

  const lowestPrice = Math.min(...product.markets.map((m) => m.min));
  const highestPrice = Math.max(...product.markets.map((m) => m.max));

  const averagePrice =
    product.markets.reduce(
      (sum, market) => sum + (market.min + market.max) / 2,
      0
    ) / product.markets.length;

  return (
    <main className="min-w-0 flex-1 bg-[#f0f5f0]">
      <div className="mx-auto min-h-screen w-full max-w-5xl px-3 py-4 sm:px-5 sm:py-6 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 sm:text-sm"
        >
          <Link href="/" className="shrink-0 hover:text-[#05893E]">
            হোম
          </Link>

          <span>/</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-[#05893E]"
          >
            {product.categoryNameBn}
          </Link>

          <span>/</span>

          <span className="wrap-break-word text-gray-700">
            {product.nameBn}
          </span>
        </nav>

        {/* Product summary card */}
        <section className="mb-4 flex min-w-0 flex-col gap-4 rounded-xl border border-[#e5ece5] bg-[#fafcfb] p-3 sm:p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0f2ed] text-2xl sm:h-14 sm:w-14 sm:text-3xl">
              {product.image || product.categoryIcon}
            </div>

            <div className="min-w-0">
              <h1 className="wrap-break-word text-lg font-bold leading-relaxed text-[#26352b] sm:text-xl md:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
              </p>

              <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
                বিভিন্ন বাজারের আজকের দামের তুলনা
              </p>
            </div>
          </div>

          <div className="w-full rounded-xl bg-[#f0f5f0] px-4 py-3 text-center sm:px-5 md:w-auto md:min-w-36 md:shrink-0">
            <p className="text-xs text-gray-500 sm:text-sm">আজকের দাম</p>

            <p className="mt-1 text-2xl font-bold text-[#26352b] sm:text-3xl">
              {formatBn(product.today)}
            </p>

            <p className="text-xs text-gray-500">টাকা / কেজি</p>

            <span
              className={`mt-1 inline-block text-xs font-semibold ${
                product.change.dir === "up"
                  ? "text-red-600"
                  : product.change.dir === "down"
                    ? "text-green-700"
                    : "text-gray-500"
              }`}
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {formatBn(Math.abs(product.change.pct))}%
            </span>
          </div>
        </section>

        {/* Price overview */}
        <section className="mb-5 min-w-0 rounded-xl border border-[#e5ece5] bg-[#fafcfb] p-3 sm:p-5">
          <h2 className="mb-3 text-sm font-bold text-[#26352b] sm:text-base">
            বাজারদরের সংক্ষিপ্তসার
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <PriceSummary
              title="সর্বনিম্ন দাম"
              price={lowestPrice}
              color="text-green-700"
              description="বাজারগুলোর মধ্যে সর্বনিম্ন"
            />

            <PriceSummary
              title="সর্বোচ্চ দাম"
              price={highestPrice}
              color="text-red-600"
              description="বাজারগুলোর মধ্যে সর্বোচ্চ"
            />

            <PriceSummary
              title="গড় বাজারদর"
              price={Math.round(averagePrice)}
              color="text-[#05893E]"
              description="সব বাজারের গড় মূল্য"
            />
          </div>

          {/* Market table */}
          <h2 className="mb-3 mt-5 text-sm font-bold text-[#26352b] sm:mt-6 sm:text-base">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="w-full overflow-x-auto rounded-lg">
            <table className="w-full min-w-140 border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#f0f5f0] text-gray-600">
                  <th className="whitespace-nowrap px-3 py-3 font-semibold">
                    বাজার
                  </th>

                  <th className="whitespace-nowrap px-3 py-3 font-semibold">
                    বিভাগ
                  </th>

                  <th className="whitespace-nowrap px-3 py-3 text-right font-semibold">
                    সর্বনিম্ন
                  </th>

                  <th className="whitespace-nowrap px-3 py-3 text-right font-semibold">
                    সর্বোচ্চ
                  </th>

                  <th className="whitespace-nowrap px-3 py-3 text-right font-semibold">
                    গড় দাম
                  </th>
                </tr>
              </thead>

              <tbody>
                {prices.map((market, index) => (
                  <tr
                    key={`${market.market}-${market.division}`}
                    className={`border-b border-[#e5ece5] ${
                      index % 2 === 0 ? "bg-white" : "bg-[#f4f8f4]"
                    }`}
                  >
                    <td className="whitespace-nowrap px-3 py-3 font-medium text-gray-700">
                      {market.market}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-gray-600">
                      {market.division}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right">
                      {formatBn(market.min)} টাকা
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right">
                      {formatBn(market.max)} টাকা
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right font-medium">
                      {formatBn(Math.round(market.average))} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-2 text-[11px] text-gray-500 sm:hidden">
            বাজারের সম্পূর্ণ তথ্য দেখতে টেবিলটি ডানে-বামে সরান।
          </p>
        </section>
      </div>
    </main>
  );
};

interface PriceSummaryProps {
  title: string;
  price: number;
  color: string;
  description: string;
}

function PriceSummary({
  title,
  price,
  color,
  description,
}: PriceSummaryProps) {
  return (
    <div className="min-w-0 rounded-xl border border-[#e5ece5] bg-white p-3 sm:p-4">
      <p className="text-xs font-medium text-gray-500 sm:text-sm">
        {title}
      </p>

      <p className={`mt-2 wrap-break-word text-lg font-bold sm:text-xl ${color}`}>
        {formatBn(price)} টাকা
      </p>

      <p className="mt-1 text-[10px] leading-relaxed text-gray-500 sm:text-xs">
        {description}
      </p>
    </div>
  );
}

export default ProductDetails;
