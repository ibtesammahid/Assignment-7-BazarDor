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

  // const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");

if (!res.ok) {
  throw new Error(`Failed to fetch products: ${res.status}`);
}

const data = await res.json();

console.log("Is array:", Array.isArray(data));
console.log("API data:", data);

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
    product.markets.reduce((sum, market) => sum + (market.min + market.max) / 2, 0) /
    product.markets.length;

  return (
    <main className="min-h-screen flex-1 bg-[#f0f5f0]">
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#05893E]">
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
          <span className="text-gray-700">{product.nameBn}</span>
        </div>

        {/* Product summary card */}
        <section className="mb-4 flex flex-col justify-between gap-4 rounded-xl border border-[#e5ece5] bg-[#fafcfb] p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0f2ed] text-2xl">
              {product.image || product.categoryIcon}
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#26352b]">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                বিভিন্ন বাজারের আজকের দামের তুলনা
              </p>
            </div>
          </div>

          <div className="min-w-24 rounded-xl bg-[#f0f5f0] px-5 py-3 text-center">
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <p className="text-2xl font-bold text-[#26352b]">
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
        <section className="mb-5 rounded-xl border border-[#e5ece5] bg-[#fafcfb] p-4">
          <h2 className="mb-3 text-sm font-bold text-[#26352b]">
            বাজারদরের সংক্ষিপ্তসার
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
          <h2 className="mb-3 mt-6 text-sm font-bold text-[#26352b]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-xs">
              <thead>
                <tr className="bg-[#f0f5f0] text-gray-600">
                  <th className="px-3 py-3 font-semibold">বাজার</th>
                  <th className="px-3 py-3 font-semibold">বিভাগ</th>
                  <th className="px-3 py-3 text-right font-semibold">
                    সর্বনিম্ন
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
                    সর্বোচ্চ
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
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
                    <td className="px-3 py-3 font-medium text-gray-700">
                      {market.market}
                    </td>

                    <td className="px-3 py-3 text-gray-600">
                      {market.division}
                    </td>

                    <td className="px-3 py-3 text-right">
                      {formatBn(market.min)} টাকা
                    </td>

                    <td className="px-3 py-3 text-right">
                      {formatBn(market.max)} টাকা
                    </td>

                    <td className="px-3 py-3 text-right font-medium">
                      {formatBn(Math.round(market.average))} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
    <div className="rounded-xl border border-[#e5ece5] bg-white p-4">
      <p className="text-xs font-medium text-gray-500">{title}</p>

      <p className={`mt-2 text-lg font-bold ${color}`}>
        {formatBn(price)} টাকা
      </p>

      <p className="mt-1 text-[10px] text-gray-500">{description}</p>
    </div>
  );
}

export default ProductDetails;
