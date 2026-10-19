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

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  const categoryProducts = products.filter(
    (product) => product.category === categoryId
  );

  const category = categoryProducts[0];

  return (
    <section className="min-w-0 flex-1 bg-[#f0f5f0]">
      <div className="mx-auto min-h-[calc(100vh-180px)] w-full max-w-6xl px-3 py-4 sm:px-5 sm:py-6 lg:px-6 lg:py-8">
        {/* Category header */}
        <div className="mb-4 flex min-w-0 items-center gap-3 rounded-xl border border-[#e5ece5] bg-[#fafcfb] p-3 sm:gap-4 sm:p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0f2ed] text-xl sm:h-12 sm:w-12 sm:text-2xl">
            {category?.categoryIcon ?? "🛒"}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="wrap-break-word text-base font-bold text-[#253329] sm:text-lg md:text-xl">
              {category?.categoryNameBn ?? "পণ্য"}
            </h1>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              মোট {banglaNumber(categoryProducts.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
        </div>

        {/* Search, sort and product list */}
        <div className="min-w-0">
          <CategoryProductList products={categoryProducts} />
        </div>
      </div>
    </section>
  );
};

export default CategoryProducts;
