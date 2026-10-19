import { Product } from "@/Types/AllProductsType";
import Image from "next/image";

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

const ProductCard = ({ productUp }: { productUp: Product }) => {
  if (!productUp) {
    return null;
  }

  const isPriceUp = productUp.change?.dir === "up";
  const imageUrl =
    typeof productUp.image === "string" &&
    productUp.image.startsWith("http");

  return (
    <article className="flex min-w-0 flex-col justify-between gap-3 rounded-xl border border-[#e3eae4] bg-[#fafcfa] p-3 transition-shadow duration-200 hover:shadow-sm sm:p-4">
      {/* Product information */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f0f4f0] text-2xl sm:size-12">
          {imageUrl ? (
            <Image
              src={productUp.image}
              alt={productUp.nameBn}
              width={40}
              height={40}
              sizes="(max-width: 640px) 40px, 48px"
              className="size-full object-contain p-1"
            />
          ) : (
            productUp.image
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-[#26352b] sm:text-base">
            {productUp.nameBn}
          </h3>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            প্রতি {tobanglaUnit(productUp.unit)}
          </p>
        </div>
      </div>

      {/* Price and change */}
      <div className="flex min-w-0 items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-base font-bold text-[#26352b] sm:text-lg">
            {toBanglaNumber(productUp.today)} টাকা
          </p>
        </div>

        {productUp.change && (
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold sm:text-xs ${
              isPriceUp
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-700"
            }`}
          >
            {isPriceUp ? "▲" : "▼"}{" "}
            {toBanglaNumber(productUp.change.pct)}%
          </span>
        )}
      </div>
    </article>
  );
};

export default ProductCard;