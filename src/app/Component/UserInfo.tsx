"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative">
      {user ? (
        <>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full p-1 transition hover:bg-gray-100"
            aria-expanded={isOpen}
          >
            {user.image ? (
              <Image
                src={user.image}
                alt={`${user.name}'s profile picture`}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#05893E] font-semibold text-white">
                {user.name?.charAt(0).toUpperCase() ?? "U"}
              </div>
            )}

            <span className="max-w-24 truncate text-sm font-medium text-gray-800">
              {user.name}
            </span>
            <span className="text-xs text-gray-500">⌄</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={`${user.name}'s profile picture`}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#05893E] font-semibold text-white">
                    {user.name?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>

              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="mt-2 block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                My Profile
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/signin" className="text-sm">
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-[7px] bg-[#05893E] px-3 py-2 text-sm text-white"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;