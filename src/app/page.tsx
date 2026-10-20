import Hero from "./Component/Hero";
import AllProducts from "./Component/AllProducts";
import TodayPriceUp from "./Component/TodayPriceUp";
import TodayPriceDown from "./Component/TodayPriceDown";

export default function Home() {
//   const date = Intl.DateTimeFormat("bn-BD", {
//     dateStyle: "full",
//   }).format(new Date());

  return (
    <div className="w-full min-w-0">
      {/* Hero Section */}
      <Hero />

      {/* Today's Price Increases */}
      <section className="mx-auto w-full max-w-7xl px-3 py-3 sm:px-5 md:px-6 lg:px-8">
        <h2 className="mb-3 text-xl font-bold sm:text-2xl">
          <span className="mr-1 text-sm text-red-600">▲</span>
          আজ দাম বেড়েছে
        </h2>

        <div className="min-w-0">
          <TodayPriceUp />
        </div>
      </section>

      {/* Today's Price Decreases */}
      <section className="mx-auto w-full max-w-7xl px-3 py-3 sm:px-5 md:px-6 lg:px-8">
        <h2 className="mb-3 text-xl font-bold sm:text-2xl">
          <span className="mr-1 text-sm text-green-600">▼</span>
          আজ দাম কমেছে
        </h2>

        <div className="min-w-0">
          <TodayPriceDown />
        </div>
      </section>

      {/* All Products */}
      <section
        id="AllProducts"
        className="mx-auto w-full max-w-7xl px-3 py-3 sm:px-5 md:px-6 lg:px-8"
      >
        <h2 className="mb-2 text-xl font-bold sm:text-2xl">
          সব পণ্য
        </h2>

        <p className="mb-4 text-sm text-gray-400">
          মোট ৩৩টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="min-w-0">
          <AllProducts />
        </div>
      </section>
    </div>
  );
}
