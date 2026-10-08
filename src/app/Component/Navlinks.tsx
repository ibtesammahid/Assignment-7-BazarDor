import { NavlinksTypes } from "@/Types/NavlinksTypes";
import Link from "next/link";

const Navlinks = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
    const data = await res.json();
    console.log(data);
    return (
        <div className="flex gap-5 text-sm px-7 py-4 overflow-x-auto font-bold mx-auto max-w-7xl">
           {data.map((category : NavlinksTypes ) => (
                <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                >
                    {category.icon}{category.nameBn}
                </Link>
            ))}
        </div>
    );
};

export default Navlinks;