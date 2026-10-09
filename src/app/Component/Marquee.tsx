import { Product } from "@/Types/AllProductsType";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const toBanglaNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD").format(value);
const Marquee = async () => {
  const res = await fetch("http://localhost:3000/data/products.json");
  const scrollData = await res.json();
  console.log(scrollData);
  return (
    <div className=" text-sm py-2 px-4 overflow-hidden bg-[#fafcfa]">
      <MarqueeText direction="right" duration={10} pauseOnHover={true}>
        {scrollData.map((product: Product) => (
          <span key={product.id}>
            <span>{product.image}</span>{" "}
            <span className="font-bold mr-1"> {product.nameBn}</span>{" "}
            <span>{toBanglaNumber(product.today)} টাকা/কেজি</span>
            <span
              className={`ml-1 mr-7 ${product.change.dir === "up" ? "text-red-600" : "text-green-400"}`}
            >
              {product.change.dir === "up" ? "▲" : "▼"}{" "}
              {toBanglaNumber(product.change.pct)}%
            </span>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
