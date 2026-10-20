import { Product } from "@/Types/AllProductsType";
import Image from "next/image";
import Link from "next/link";

const toBanglaNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD").format(value);

const dictionary: Record<string, string> = {
  litre: "লিটার",
  kg: "কেজি",
  dozen: "ডজন",
  piece: "পিস",
};

const tobanglaUnit = (unit: string): string => {
  return dictionary[unit.toLowerCase()] ?? unit;
};

const ProductCard = ({ product }: { product: Product }) => {
  if (!product) {
    return null;
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      aria-label={`${product.nameBn} এর বিস্তারিত দেখুন`}
      className="block h-full min-w-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2"
    >
      <article className="flex h-full min-w-0 flex-col justify-between rounded-xl border border-[#e3eae4] bg-[#fafcfa] p-3 transition-shadow duration-200 hover:shadow-md sm:p-4">
        {/* Product information */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f0f4f0] text-xl sm:size-10 sm:text-2xl">
            {product.image.startsWith("http") ? (
              <Image
                src={product.image}
                alt={product.nameBn}
                width={32}
                height={32}
                sizes="32px"
                className="size-8 object-contain"
              />
            ) : (
              product.image
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="wrap-break-word text-sm font-bold leading-5 text-[#26352b]">
              {product.nameBn}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              প্রতি {tobanglaUnit(product.unit)}
            </p>
          </div>
        </div>

        {/* Price and change */}
        <div className="mt-4 flex min-w-0 flex-wrap items-end justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <p className="mt-1 wrap-break-word text-sm font-bold leading-5 text-[#26352b] sm:text-base">
              {toBanglaNumber(product.today)} টাকা
            </p>
          </div>

          <span
            className={`inline-flex max-w-full shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold sm:text-xs ${
              product.change.dir === "up"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            <span aria-hidden="true">
              {product.change.dir === "up" ? "▲" : "▼"}
            </span>

            <span>
              {toBanglaNumber(product.change.pct)}%
            </span>
          </span>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;