"use client";

import { useMemo, useState } from "react";
import { Product } from "@/Types/AllProductsType";
import Link from "next/link";

interface CategoryProductListProps {
  products: Product[];
}

const dictionary: Record<string, string> = {
  litre: "লিটার",
  kg: "কেজি",
  dozen: "ডজন",
  piece: "পিস",
};

const tobanglaUnit = (unit: string): string => {
  return dictionary[unit.toLowerCase()] ?? unit;
};

const banglaNumber = (value: number) => value.toLocaleString("bn-BD");

const CategoryProductList = ({
  products,
}: CategoryProductListProps) => {
  const [search] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) =>
      product.nameBn.toLowerCase().includes(search.trim().toLowerCase()),
    );

    if (sortBy === "low") {
      result.sort((a, b) => a.today - b.today);
    } else if (sortBy === "high") {
      result.sort((a, b) => b.today - a.today);
    } else if (sortBy === "change") {
      result.sort(
        (a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct),
      );
    }

    return result;
  }, [products, search, sortBy]);

  return (
    <div className="w-full min-w-0">
      {/* Sorting bar */}
      <div className="mb-5 flex w-full min-w-0 flex-col gap-3 rounded-xl border border-[#e5ece5] bg-[#fafcfb] p-3 sm:flex-row sm:items-center sm:justify-end sm:p-4">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
          <label
            htmlFor="category-sort"
            className="shrink-0 text-xs text-gray-500 sm:text-sm"
          >
            সাজান
          </label>

          <select
            id="category-sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="min-h-11 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E] sm:w-auto sm:max-w-full"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
            <option value="change">দামের পরিবর্তন</option>
          </select>
        </div>
      </div>

      {/* Product count */}
      <p className="mb-3 text-xs leading-6 text-gray-500 sm:text-sm">
        মোট {banglaNumber(filteredProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              aria-label={`${product.nameBn} এর বিস্তারিত দেখুন`}
              className="block h-full min-w-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893E] focus-visible:ring-offset-2"
            >
              <article className="flex h-full min-w-0 flex-col rounded-xl border border-[#e4ebe4] bg-[#fafcfb] p-3 transition hover:border-[#b9d8c1] hover:shadow-sm sm:p-4">
                {/* Product name */}
                <div className="mb-4 flex min-w-0 items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f0f2ed] text-xl">
                    {product.image || product.categoryIcon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold leading-5 text-[#253329] wrap-anywhere">
                      {product.nameBn}
                    </h2>

                    <p className="mt-1 text-[11px] text-gray-500">
                      প্রতি {tobanglaUnit(product.unit)}
                    </p>
                  </div>
                </div>

                {/* Price information */}
                <div className="mt-auto min-w-0">
                  <p className="mb-1 text-[10px] text-gray-500 sm:text-xs">
                    আজকের বাজার দর
                  </p>

                  <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                    <p className="break-words text-base font-bold text-[#253329] sm:text-lg">
                      {banglaNumber(product.today)} টাকা
                    </p>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium sm:text-xs ${
                        product.change.dir === "up"
                          ? "bg-red-50 text-red-600"
                          : product.change.dir === "down"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <span aria-hidden="true">
                        {product.change.dir === "up"
                          ? "▲"
                          : product.change.dir === "down"
                            ? "▼"
                            : "—"}
                      </span>

                      {banglaNumber(Math.abs(product.change.pct))}%
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#e4ebe4] bg-[#fafcfb] px-4 py-10 text-center sm:py-12">
          <p className="text-sm leading-6 text-gray-500">
            কোনো পণ্য পাওয়া যায়নি।
          </p>

          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#05893E] px-4 py-2 text-sm text-[#05893E] transition hover:bg-[#05893E] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893E] focus-visible:ring-offset-2"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryProductList;