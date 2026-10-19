import Image from "next/image";
import hero from "@/assets/bazar-hero.png";
import HeroDate from "./CurrentDateHero";

type HeroProps = {
  date: string;
};

const Hero = ({ date }: HeroProps) => {
  return (
    <section className="mx-auto my-4 flex w-full max-w-7xl flex-col items-center gap-6 rounded-2xl bg-[#fafcfa] px-4 py-6 sm:my-5 sm:px-6 sm:py-8 md:flex-row md:justify-between md:gap-8 lg:px-10">
      {/* Hero Content */}
      <div className="w-full min-w-0 md:flex-1">
        <HeroDate />

        <h1 className="wrap-break-words pt-3 text-2xl font-bold leading-relaxed text-[#26352b] sm:text-3xl lg:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="py-4 text-sm leading-7 text-gray-500 sm:py-6 sm:text-base">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <a
          href="#AllProducts"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#05893E] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893E] focus-visible:ring-offset-2"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      {/* Hero Image */}
      <div className="flex w-full shrink-0 justify-center md:w-[40%]">
        <Image
          src={hero}
          alt="বাজারের পণ্যের ছবি"
          width={315}
          height={263}
          priority
          sizes="(max-width: 767px) 80vw, (max-width: 1023px) 40vw, 315px"
          className="h-auto w-full max-w-60 object-contain sm:max-w-[280px] md:max-w-[315px]"
        />
      </div>
    </section>
  );
};

export default Hero;