import { Product } from "@/Types/AllProductsType";
import Image from "next/image";
import Link from "next/link";

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

const ProductCard = ({ product }: { product: Product }) => {
  if (!product) {
    console.error("ProductCard received no product");
    return null;
  }

  return (


    <Link href={`/products/${product.slug}`}>
      <article className="flex min-w-0 flex-col justify-between rounded-xl border border-[#e3eae4] bg-[#fafcfa] p-3 transition-shadow hover:shadow-sm">
      {/* Product information */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#f0f4f0] text-2xl">
          {product.image.startsWith("http") ? (
            <Image
              src={product.image}
              alt={product.nameBn}
              width={32}
              height={32}
              priority
              className="size-8 object-contain"
            />
          ) : (
            product.image
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-[#26352b]">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500">প্রতি {tobanglaUnit(product.unit)}</p>
        </div>
      </div>

      {/* Price and change */}
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <p className="text-base font-bold text-[#26352b]">
            {toBanglaNumber(product.today)} টাকা
          </p>
        </div>

        <span
          className={`inline-flex items-center rounded-full px-2 py-1 
            ${product.change.dir === "up" ? "bg-red-100" : "bg-green-100"} text-[10px] font-semibold 
            ${product.change.dir === "up" ? "text-red-600" : "text-green-400"}`}
        >
          {product.change.dir === "up" ? "▲" : "▼"}{" "}
          {toBanglaNumber(product.change.pct)}%
        </span>
      </div>
    </article>
</Link>
  );
};

export default ProductCard;
