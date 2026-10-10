
import { Product } from "@/Types/AllProductsType";
import CategoryProductList from "@/app/Component/CategoryProductList";

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const banglaNumber = (value: number) =>
new Intl.NumberFormat("bn-BD").format(value);

const CategoryProducts = async ({ params }: CategoryPageProps) => {
  const { categoryId } = await params;

  // const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  const categoryProducts = products.filter(
    (product) => product.category === categoryId
  );

  const category = categoryProducts[0];

  return (
    <section className="flex-1 bg-[#f0f5f0]">
      <div className="mx-auto min-h-[calc(100vh-180px)] max-w-6xl px-4 py-5 sm:px-6 lg:px-0">
        {/* Category header */}
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-[#e5ece5] bg-[#fafcfb] p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0f2ed] text-xl">
            {category?.categoryIcon ?? "🛒"}
          </div>

          <div>
            <h1 className="text-lg font-bold text-[#253329]">
              {category?.categoryNameBn ?? "পণ্য"}
            </h1>

           <p className="mb-3 text-xs text-gray-500">
        মোট {banglaNumber(categoryProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>
          </div>
        </div>

        {/* Search, sort and product list */}
        <CategoryProductList products={categoryProducts} />
      </div>
    </section>
  );
};

export default CategoryProducts;
