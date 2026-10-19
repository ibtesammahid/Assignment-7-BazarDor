import { Product } from "@/Types/AllProductsType";
import ProductCard from "./AllProductCard";

const TodayPriceUp = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  const allProducts: Product[] = Array.isArray(data)
    ? data
    : Array.isArray(data.products)
      ? data.products
      : Array.isArray(data.data)
        ? data.data
        : [];

  const increasedProducts = allProducts.filter(
    (productUp) => productUp != null && productUp.change?.dir === "up",
  );

  return (
    <div className="mx-auto my-5 grid w-full max-w-7xl grid-cols-1 gap-3 px-3 py-5 sm:grid-cols-2 sm:gap-4 sm:px-5 md:px-6 lg:grid-cols-3 lg:px-8">
      {increasedProducts.map((productUp) => (
        <ProductCard key={productUp.id} product={productUp} />
      ))}
    </div>
  );
};

export default TodayPriceUp;