import Image from "next/image";
import Logo from "@/assets/logo-icon.png";
import Navlinks from "./Navlinks";
import Link from "next/link";
import DateBadge from "./CurrentDateNav";
import { NavlinksTypes } from "@/Types/NavlinksTypes";
import UserInfo from "./UserInfo";

const Navbar = async () => {
  // const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");

  const categories: NavlinksTypes[] = await res.json();
  return (
    <div className=" border-b border-gray-100 bg-[#fafcfa]">
      <div className="flex justify-between items-center px-4 py-3 mx-auto max-w-7xl">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              width={30}
              height={30}
              className="border bg-[#05893E] rounded-[5px] p-2"
            />
          </Link>

          <div>
            <Link href="/" className="font-bold text-xl">
              বাজার দর
            </Link>
            <DateBadge />
          </div>
        </div>

        <UserInfo />
      </div>
      <div className="border-t border-gray-100">
        <Navlinks categories={categories} />
      </div>
    </div>
  );
};

export default Navbar;
