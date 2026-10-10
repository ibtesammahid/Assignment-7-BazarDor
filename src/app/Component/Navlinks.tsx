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
    <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto bg-[#fafcfa] px-7 py-4 text-sm font-bold">
      {categories.map((category) => {
        const isActive = pathname === `/category/${category.slug}`;

        return (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className={`shrink-0 rounded-md px-3 py-2 transition-colors ${
              isActive
                ? "bg-[#05893E] text-white"
                : "text-gray-700 hover:bg-green-50 hover:text-[#05893E]"
            }`}
          >
            {category.icon} {category.nameBn}
          </Link>
        );
      })}
    </div>
  );
};

export default Navlinks;
