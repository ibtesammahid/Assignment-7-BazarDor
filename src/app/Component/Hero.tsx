import Image from "next/image";
import hero from "@/assets/bazar-hero.png";

const Hero = () => {
    return (
        <div className="flex justify-between max-w-7xl mx-22 my-5 py-5 bg-[#F0F5F0] px-4 rounded-2xl">
            <div className="max-w-7xl ">
                <p className="text-sm pb-3">date</p>
                <h2 className="font-bold text-3xl">আজকের বাজারের দাম এক নজরে</h2>
                <p className="text-gray-500 py-6">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন- <br /> সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                <button className="btn bg-[#05893E] text-white rounded-[7px] text-sm">সব পণ্য দেখুন</button>
            </div>
            <Image src={hero} alt="Hero Image" width={315} height={263}></Image>
        </div>
    );
};

export default Hero;