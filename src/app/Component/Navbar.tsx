import Image from "next/image";
import Logo from "@/assets/logo-icon.png";
import Navlinks from "./Navlinks";
import Link from "next/link";
import DateBadge from "./CurrentDateNav";
import { NavlinksTypes } from "@/Types/NavlinksTypes";
import UserInfo from "./UserInfo";

async function getCategories(): Promise<NavlinksTypes[]> {
  "use cache";

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();

  return Array.isArray(data)
    ? data
    : Array.isArray(data.categories)
      ? data.categories
      : Array.isArray(data.data)
        ? data.data
        : [];
}

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <header className="w-full min-w-0 border-b border-gray-100 bg-[#fafcfa]">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 items-center justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-5 md:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            aria-label="বাজার দর হোম পেজ"
            className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893E] focus-visible:ring-offset-2"
          >
            <Image
              src={Logo}
              alt="বাজার দর লোগো"
              width={40}
              height={40}
              priority
              className="size-9 rounded-md border border-[#05893E] bg-[#05893E] p-1.5 object-contain sm:size-10"
            />
          </Link>

          <div className="min-w-0">
            <Link
              href="/"
              className="block truncate text-lg font-bold leading-tight text-[#26352b] sm:text-xl"
            >
              বাজার দর
            </Link>

            <div className="mt-1">
              <DateBadge />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center">
          <UserInfo />
        </div>
      </div>

      <div className="w-full min-w-0 border-t border-gray-100">
        <Navlinks categories={categories} />
      </div>
    </header>
  );
};

export default Navbar;
