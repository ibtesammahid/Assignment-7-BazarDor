import { Product } from "@/Types/AllProductsType";
import Image from "next/image";

const toBanglaNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD").format(value);

const dictionary : Record <string, string> = {
  "litre": "লিটার",
  "kg": "কেজি",
  "dozen": "ডজন",
  "piece": "পিস",
};
const tobanglaUnit = (unit: string):string => {
  return dictionary[unit.toLowerCase()] ?? unit;
};

const ProductCard = ({ productUp }: { productUp: Product }) => {
  if (!productUp) {
    console.error("ProductCard received no product");
    return null;
  }

  return (
    <article className="flex min-w-0 flex-col justify-between rounded-xl border border-[#e3eae4] bg-[#fafcfa] p-3 transition-shadow hover:shadow-sm">
      {/* Product information */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#f0f4f0] text-2xl">
          {productUp.image.startsWith("http") ? (
            <Image
              src={productUp.image}
              alt={productUp.nameBn}
              width={32}
              height={32}
              priority
              className="size-8 object-contain"
            />
          ) : (
            productUp.image
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-[#26352b]">
            {productUp.nameBn}
          </h3>
          <p className="text-xs text-gray-500">প্রতি {tobanglaUnit(productUp.unit)}</p>
        </div>
      </div>

      {/* Price and change */}
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <p className="text-base font-bold text-[#26352b]">
            {toBanglaNumber(productUp.today)} টাকা
          </p>
        </div>

        <span
          className={`inline-flex items-center rounded-full px-2 py-1 
            ${productUp.change.dir === "up" ? "bg-red-100" : "bg-green-100"} text-[10px] font-semibold 
            ${productUp.change.dir === "up" ? "text-red-600" : "text-green-400"}`}
        >
          {productUp.change.dir === "up" ? "▲" : "▼"}{" "}
          {toBanglaNumber(productUp.change.pct)}%
        </span>
      </div>
    </article>
  );
};

export default ProductCard;
