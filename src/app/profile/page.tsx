
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FaArrowLeft, FaPen } from "react-icons/fa";
import Link from "next/link";
import { ImageError } from "next/dist/server/image-optimizer";
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
      <main className="min-h-[70vh] bg-[#f0f5f0] p-6">
        <p className="mx-auto max-w-xl">লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] p-6">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="mb-4">প্রোফাইল দেখতে প্রথমে লগইন করুন।</p>
          <Link
            href="/login"
            className="inline-block rounded-lg bg-[#05893e] px-5 py-2 text-white"
          >
            লগইন করুন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#f0f5f0] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-[#202820]">
          আমার প্রোফাইল
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          আপনার ব্যক্তিগত তথ্য এখানে দেখুন
        </p>

        {/* User information */}
        <section className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-lg font-bold text-green-700">
                {user.name?.charAt(0)?.toUpperCase() ?? "U"}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="truncate text-xs text-gray-500 sm:text-sm">
                {user.email}
              </p>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={handleEdit}
              className="flex shrink-0 items-center gap-2 rounded-lg border border-red-300 px-3 py-2 text-xs text-red-500 transition hover:bg-red-50 sm:text-sm"
            >
              <FaPen size={11} />
              নাম পরিবর্তন
            </button>
          )}
        </section>

        {/* Editable profile form */}
        <section className="mt-4 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="mb-5 font-semibold text-gray-800">
            তথ্য
          </h2>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleSave();
            }}
          >
            <label
              htmlFor="profile-name"
              className="mb-2 block text-sm text-gray-600"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={isEditing ? name : user.name ?? ""}
              onChange={(event) => setName(event.target.value)}
              readOnly={!isEditing}
              maxLength={100}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition ${
                isEditing
                  ? "border-green-600 bg-white focus:ring-2 focus:ring-green-100"
                  : "border-gray-200 bg-gray-50"
              }`}
              placeholder="আপনার নাম লিখুন"
            />

            {isEditing ? (
              <div className="mt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#05893e] px-4 py-2.5 text-sm text-white transition hover:bg-green-700 disabled:opacity-60"
                >
                  {isSaving ? "আপডেট হচ্ছে..." : "আপডেট"}
                </button>

                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
                >
                  <FaArrowLeft size={12} />
                  বাতিল
                </button>
              </div>
            ) : (
              <p className="mt-3 text-xs text-gray-400">
                নাম পরিবর্তন করতে উপরের নাম পরিবর্তন বাটনে ক্লিক করুন।
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
