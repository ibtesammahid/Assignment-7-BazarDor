
import { Product } from "@/Types/AllProductsType";
import ProductCard from "./AllProductCard";

const TodayPriceUp = async () => {
  const res = await fetch(
    "http://localhost:3000/data/products.json"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  console.log("API response:", data);
  console.log("Is array:", Array.isArray(data));

  const allProducts: Product[] = Array.isArray(data)
    ? data
    : Array.isArray(data.products)
      ? data.products
      : Array.isArray(data.data)
        ? data.data
        : [];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-22 my-5 py-5">
      {allProducts
        .filter((productUp) => productUp != null && productUp.change.dir === "up")
        .map((productUp) => (
          <ProductCard key={productUp.id} product={productUp} />
        ))}
    </div>
  );
};

export default TodayPriceUp;
