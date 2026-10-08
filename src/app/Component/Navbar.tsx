

import Image from "next/image";
import Logo from "@/assets/logo-icon.png";
import Navlinks from "./Navlinks";

interface NavbarProps {
  date: string;
}

const Navbar = ({ date }: NavbarProps) => {
    return (
        <div className=" border-b border-gray-100 bg-[#F3FBF4]">
           <div className="flex justify-between items-center px-4 py-3 mx-auto max-w-7xl">
             <div className="flex items-center gap-2">
                <Image
                    src={Logo}
                    alt="Logo"
                    width={30}
                    height={30}
                    className="border bg-[#05893E] rounded-[5px] p-2"
                />

                <div>
                    <h2 className="font-bold text-xl">বাজার দর</h2>
                    <p className="text-[12px]">{date}</p>
                </div>
            </div>

            <div className="flex gap-2">
                <button className="text-sm">Sign In</button>

                <button className="btn bg-[#05893E] text-white rounded-[7px] text-sm">
                    Sign up
                </button>
            </div>
           </div>
            <div className="border-t border-gray-100"><Navlinks /></div>
        </div>
    );
}; 

export default Navbar;