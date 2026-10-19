const Footer = () => {
  return (
    <footer className="mx-auto my-5 w-full max-w-7xl bg-[#fafcfa] px-3 sm:px-5 md:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-t border-[#e3eae4] py-5 text-center sm:py-6 md:flex-row md:items-center md:justify-between md:gap-6 md:text-left">
        <h2 className="text-sm leading-7 text-[#26352b] sm:text-base">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </h2>

        <p className="text-xs leading-6 text-gray-500 sm:text-sm md:max-w-md md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;