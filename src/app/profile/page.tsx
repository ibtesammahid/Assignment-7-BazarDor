"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FaArrowLeft, FaPen } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const user = session?.user;

  const handleEdit = () => {
    setName(user?.name ?? "");
    setIsEditing(true);
  };

  const handleSave = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    setIsSaving(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(result.error.message ?? "নাম আপডেট করা যায়নি");
        return;
      }

      toast.success("নাম সফলভাবে আপডেট হয়েছে");
      setIsEditing(false);
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <main className="min-h-[70vh] bg-[#f0f5f0] px-4 py-8 sm:px-6 sm:py-12">
        <p className="mx-auto max-w-xl text-sm text-gray-600 sm:text-base">
          লোড হচ্ছে...
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] px-4 py-8 sm:px-6">
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm sm:p-8">
          <h1 className="text-lg font-bold text-[#202820] sm:text-xl">
            প্রোফাইল দেখতে লগইন করুন
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            আপনার ব্যক্তিগত তথ্য দেখতে প্রথমে আপনার অ্যাকাউন্টে লগইন করুন।
          </p>

          <Link
            href="/signin"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#05893e] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
          >
            লগইন করুন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] min-w-0 bg-[#f0f5f0] px-3 py-6 sm:px-6 sm:py-10 md:py-12">
      <div className="mx-auto w-full max-w-2xl">
        {/* Page heading */}
        <header>
          <h1 className="text-xl font-bold leading-relaxed text-[#202820] sm:text-2xl md:text-3xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
            আপনার ব্যক্তিগত তথ্য এখানে দেখুন
          </p>
        </header>

        {/* User information */}
        <section className="mt-5 flex min-w-0 flex-col gap-4 rounded-xl border border-gray-200 bg-white p-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "প্রোফাইল ছবি"}
                width={48}
                height={48}
                className="h-11 w-11 shrink-0 rounded-xl object-cover sm:h-12 sm:w-12"
              />
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-lg font-bold text-green-700 sm:h-12 sm:w-12">
                {user.name?.charAt(0)?.toUpperCase() ?? "U"}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold text-gray-800 sm:text-base">
                {user.name}
              </h2>

              <p className="break-all text-xs leading-relaxed text-gray-500 sm:text-sm">
                {user.email}
              </p>
            </div>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex min-h-10 w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-red-300 px-3 py-2 text-sm text-red-500 transition hover:bg-red-50 sm:w-auto"
            >
              <FaPen size={11} />
              নাম পরিবর্তন
            </button>
          )}
        </section>

        {/* Editable profile form */}
        <section className="mt-4 min-w-0 rounded-xl border border-gray-200 bg-white p-3 sm:p-5 md:p-6">
          <h2 className="mb-4 text-sm font-semibold text-gray-800 sm:mb-5 sm:text-base">
            ব্যক্তিগত তথ্য
          </h2>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleSave();
            }}
          >
            <label
              htmlFor="profile-name"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={isEditing ? name : user.name ?? ""}
              onChange={(event) => setName(event.target.value)}
              readOnly={!isEditing || isSaving}
              maxLength={100}
              className={`min-h-11 w-full min-w-0 rounded-lg border px-3 py-2.5 text-sm outline-none transition sm:text-base ${
                isEditing
                  ? "border-green-600 bg-white focus:ring-2 focus:ring-green-100"
                  : "border-gray-200 bg-gray-50"
              }`}
              placeholder="আপনার নাম লিখুন"
            />

            {isEditing ? (
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#05893e] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1"
                >
                  {isSaving ? "আপডেট হচ্ছে..." : "আপডেট"}
                </button>

                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => {
                    setName(user.name ?? "");
                    setIsEditing(false);
                  }}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <FaArrowLeft size={12} />
                  বাতিল
                </button>
              </div>
            ) : (
              <p className="mt-3 text-xs leading-relaxed text-gray-400 sm:text-sm">
                নাম পরিবর্তন করতে উপরের নাম পরিবর্তন বাটনে ক্লিক করুন।
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
