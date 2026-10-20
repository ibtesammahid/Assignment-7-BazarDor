"use client";

import { NavlinksTypes } from "@/Types/NavlinksTypes";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavlinksProps {
  categories: NavlinksTypes[];
}

const Navlinks = ({ categories }: NavlinksProps) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="w-full min-w-0 border-gray-100 bg-[#fafcfa]"
    >
      <div className="mx-auto flex w-full max-w-7xl gap-2 overflow-x-auto overscroll-x-contain px-3 py-3 text-sm font-bold sm:gap-3 sm:px-5 sm:py-4 md:px-6 lg:gap-5 lg:px-8 scrollbar-thin">
        {categories.map((category) => {
          const isActive = pathname === `/category/${category.slug}`;

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 whitespace-nowrap rounded-md px-3 py-2 transition-colors duration-200 sm:px-4 ${
                isActive
                  ? "bg-[#05893E] text-white"
                  : "text-gray-700 hover:bg-green-50 hover:text-[#05893E]"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893E] focus-visible:ring-offset-2`}
            >
              {category.icon} {category.nameBn}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navlinks;
