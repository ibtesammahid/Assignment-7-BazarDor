import Hero from "./Component/Hero";
import AllProducts from "./Component/AllProducts";
import TodayPriceUp from "./Component/TodayPriceUp";
import TodayPriceDown from "./Component/TodayPriceDown";

export default function Home() {
  const date = Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
  }).format(new Date());
  return (
    <div>
      <Hero date={date} />
      <h2 className="font-bold max-w-7xl mx-22 my-3 text-2xl">
        <span className="text-red-600 text-sm mr-1">▲</span>আজ দাম বেড়েছে
      </h2>
      <section>
        <TodayPriceUp />
      </section>
      <h2 className="font-bold max-w-7xl mx-22 my-3 text-2xl">
        <span className="text-green-600 text-sm mr-1">▼</span>আজ দাম কমেছে
      </h2>
      <section>
        <TodayPriceDown />
      </section>

      <h2 id="AllProducts" className="font-bold max-w-7xl mx-22 my-3 text-2xl">
        সব পণ্য
      </h2>
      <p className="max-w-7xl mx-22 text-gray-400 text-[14px]">
        মোট ৩৩টি পণ্য দেখানো হচ্ছে
      </p>
      <section>
        <AllProducts />
      </section>
    </div>
  );
}
