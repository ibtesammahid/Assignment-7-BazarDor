import Image from "next/image";
import hero from "@/assets/bazar-hero.png";

interface HeroProps {
  date: string;
}

const Hero = ({ date }: HeroProps) => {
    return (
        <div className="flex justify-between max-w-7xl mx-22 my-5 py-5 bg-[#fafcfa] px-4 rounded-2xl">
            <div className="max-w-7xl ">
                <span className="inline-flex items-center rounded-full bg-[#E1F2E8] px-6 py-1 text-sm font-medium text-[#008C45]">
          {date}
        </span>
                <h2 className="font-bold text-3xl pt-3">আজকের বাজারের দাম এক নজরে</h2>
                <p className="text-gray-500 py-6">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন- <br /> সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                <a href="#AllProducts" className="btn bg-[#05893E] text-white rounded-[7px] text-sm">সব পণ্য দেখুন</a>
            </div>
            <Image src={hero} alt="Hero Image" width={315} height={263}></Image>
        </div>
    );
};

export default Hero;