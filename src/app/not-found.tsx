"use client";
import Link from "next/link";
import { FaArrowLeft, FaHouse } from "react-icons/fa6";

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#f0f5f0] px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
          <span className="text-4xl font-bold text-[#05893e]">
            404
          </span>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-800">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mt-3 text-sm leading-7 text-gray-500">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
          পেজটি সরিয়ে ফেলা হতে পারে অথবা ঠিকানাটি ভুল হতে পারে।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-[#05893e] px-6 py-3 text-sm font-medium text-white transition hover:bg-green-700"
        >
          <FaHouse size={14} />
          হোম পেজে ফিরে যান
        </Link>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#05893e]"
          >
            <FaArrowLeft size={12} />
            আগের পেজে ফিরে যান
          </button>
        </div>
      </div>
    </main>
  );
}
