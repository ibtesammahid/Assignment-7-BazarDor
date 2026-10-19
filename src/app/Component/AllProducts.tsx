import { Product } from "@/Types/AllProductsType";
import ProductCard from "./AllProductCard";

const AllProducts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
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

  return (
    <div className="mx-auto my-4 grid w-full min-w-0 max-w-7xl grid-cols-1 gap-3 px-0 py-3 sm:my-5 sm:grid-cols-2 sm:gap-4 sm:py-5 lg:grid-cols-3 xl:grid-cols-4">
      {allProducts
        .filter((product) => product != null)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default AllProducts;