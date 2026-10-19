"use client";

import Link from "next/link";
import { FaArrowLeft, FaHouse } from "react-icons/fa6";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] w-full items-center justify-center bg-[#f0f5f0] px-3 py-10 sm:min-h-[65vh] sm:px-5 sm:py-16">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white px-4 py-8 text-center shadow-sm sm:rounded-2xl sm:px-8 sm:py-10 md:px-10 md:py-12">
        {/* 404 Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 sm:h-24 sm:w-24">
          <span className="text-3xl font-bold text-[#05893e] sm:text-4xl">
            404
          </span>
        </div>

        {/* Heading */}
        <h1 className="mt-5 wrap-break-words text-xl font-bold leading-relaxed text-gray-800 sm:mt-6 sm:text-2xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
          পেজটি সরিয়ে ফেলা হতে পারে অথবা ঠিকানাটি ভুল হতে পারে।
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="mx-auto mt-6 inline-flex min-h-11 w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-[#05893e] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 sm:mt-7 sm:w-auto sm:px-6"
        >
          <FaHouse size={14} />
          <span>হোম পেজে ফিরে যান</span>
        </Link>

        {/* Back Button */}
        <div className="mt-5">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-500 transition-colors hover:text-[#05893e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e]"
          >
            <FaArrowLeft size={12} />
            <span>আগের পেজে ফিরে যান</span>
          </button>
        </div>
      </div>
    </main>
  );
}
