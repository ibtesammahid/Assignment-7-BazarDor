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

const CategoryProductList = ({ products }: CategoryProductListProps) => {
  const [search, setSearch] = useState("");
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
      result.sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct));
    }

    return result;
  }, [products, search, sortBy]);

  return (
    <>
      {/* Sorting bar */}
      <div className="mb-5 flex items-center justify-end rounded-xl border border-[#e5ece5] bg-[#fafcfb] p-3">
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-xs text-gray-500">
            সাজান
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#05893E]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
            <option value="change">দামের পরিবর্তন</option>
          </select>
        </div>
      </div>

      {/* Product count */}
      <p className="mb-3 text-xs text-gray-500">
        মোট {banglaNumber(filteredProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`}>
              <article
                key={product.id}
                className="rounded-xl border border-[#e4ebe4] bg-[#fafcfb] p-4 transition hover:border-[#b9d8c1] hover:shadow-sm"
              >
                {/* Product name */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0f2ed] text-xl">
                    {product.image || product.categoryIcon}
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-[#253329]">
                      {product.nameBn}
                    </h2>

                    <p className="text-[11px] text-gray-500">
                      প্রতি {tobanglaUnit(product.unit)}
                    </p>
                  </div>
                </div>

                {/* Price information */}
                <p className="mb-1 text-[10px] text-gray-500">আজকের বাজার দর</p>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-lg font-bold text-[#253329]">
                    {banglaNumber(product.today)} টাকা
                  </p>

                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-medium ${
                      product.change.dir === "up"
                        ? "bg-red-50 text-red-600"
                        : product.change.dir === "down"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {product.change.dir === "up"
                      ? "▲"
                      : product.change.dir === "down"
                        ? "▼"
                        : "—"}{" "}
                    {banglaNumber(Math.abs(product.change.pct))}%
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <p className="rounded-xl border border-[#e4ebe4] bg-[#fafcfb] py-12 text-center text-sm text-gray-500 flex flex-col items-center justify-center gap-2">
            কোনো পণ্য পাওয়া যায়নি।
            <Link
              href="/"
              className="mt-3 text-sm text-[#05893E] border border-[#05893E] px-3 py-1 rounded-lg hover:bg-[#05893E] hover:text-white transition"
            >
              হোম পেজে ফিরে যান
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default CategoryProductList;
