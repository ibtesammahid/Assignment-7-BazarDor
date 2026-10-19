import { Product } from "@/Types/AllProductsType";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

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

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch marquee products");
  }

  const data = await res.json();

  const products: Product[] = Array.isArray(data)
    ? data
    : Array.isArray(data.products)
      ? data.products
      : Array.isArray(data.data)
        ? data.data
        : [];

  return (
    <div className="w-full min-w-0 overflow-hidden bg-[#fafcfa] px-3 py-2 text-xs sm:px-4 sm:text-sm">
      <MarqueeText
        direction="right"
        duration={10}
        pauseOnHover={true}
      >
        {products
          .filter((product) => product != null)
          .map((product) => (
            <span
              key={product.id}
              className="inline-flex items-center whitespace-nowrap py-1"
            >
              <span className="shrink-0" aria-hidden="true">
                {product.image}
              </span>

              <span className="ml-1 mr-1 font-bold text-[#26352b]">
                {product.nameBn}
              </span>

              <span className="text-[#26352b]">
                {toBanglaNumber(product.today)} টাকা/
                {tobanglaUnit(product.unit)}
              </span>

              <span
                className={`ml-1 mr-5 shrink-0 font-medium sm:mr-7 ${
                  product.change.dir === "up"
                    ? "text-red-600"
                    : product.change.dir === "down"
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {toBanglaNumber(Math.abs(product.change.pct))}%
              </span>
            </span>
          ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
