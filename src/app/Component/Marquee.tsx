import { Product } from "@/Types/MarqueeTypes";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const banglaNumber = (num: number) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((digit) => banglaDigits[parseInt(digit)])
    .join("");
};

const Marquee = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const scrollData = await res.json();
  console.log(scrollData);
  return (
    <div className=" text-sm py-2 px-4 overflow-hidden">
      <MarqueeText direction="right" duration={10} pauseOnHover={true}>
        {scrollData.map((product: Product) => (
          <span key={product.id}>
            <span>{product.image}</span>{" "}
            <span className="font-bold mr-1"> {product.nameBn}</span>{" "}
            <span>{banglaNumber(product.today)} টাকা/কেজি</span>
            <span
              className={`ml-1 mr-7 ${product.change.dir === "up" ? "text-red-600" : "text-green-400"}`}
            >
              {product.change.dir === "up" ? "▲" : "▼"}{" "}
              {banglaNumber(product.change.pct)}%
            </span>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
