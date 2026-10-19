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
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      await authClient.signOut();
      setIsOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="relative shrink-0">
      {user ? (
        <>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex max-w-full items-center gap-1.5 rounded-full p-1 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893E] sm:gap-2"
            aria-expanded={isOpen}
            aria-label="ইউজার মেনু"
          >
            {user.image ? (
              <Image
                src={user.image}
                alt={`${user.name ?? "User"}'s profile picture`}
                width={36}
                height={36}
                className="size-8 shrink-0 rounded-full object-cover sm:size-9"
              />
            ) : (
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#05893E] font-semibold text-white sm:size-9">
                {user.name?.charAt(0).toUpperCase() ?? "U"}
              </div>
            )}

            <span className="hidden max-w-24 truncate text-sm font-medium text-gray-800 sm:block">
              {user.name}
            </span>

            <span className="text-xs text-gray-500" aria-hidden="true">
              {isOpen ? "⌃" : "⌄"}
            </span>
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-[min(16rem,calc(100vw-1.5rem))] rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
              <div className="flex min-w-0 items-center gap-3 border-b border-gray-100 pb-3">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={`${user.name ?? "User"}'s profile picture`}
                    width={40}
                    height={40}
                    className="size-10 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#05893E] font-semibold text-white">
                    {user.name?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                )}

                <div className="min-w-0 flex-1">
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
                className="mt-2 block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893E]"
              >
                My Profile
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/signin"
            className="whitespace-nowrap rounded-md px-2 py-2 text-xs text-gray-700 transition hover:text-[#05893E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893E] sm:px-3 sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="whitespace-nowrap rounded-md bg-[#05893E] px-2.5 py-2 text-xs text-white transition hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893E] focus-visible:ring-offset-2 sm:px-3 sm:text-sm"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
