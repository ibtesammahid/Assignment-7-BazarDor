
import { Product } from "@/Types/AllProductsType";

export async function getProducts(): Promise<Product[]> {
  "use cache";

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const data = await res.json();

  return Array.isArray(data)
    ? data
    : Array.isArray(data.data)
      ? data.data
      : [];
}
