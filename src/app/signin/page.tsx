"use client";

import { authClient, signIn } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";

const SignInPage = () => {
  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Sign in successfully!");
    }

    if (error) {
      toast.error(error.message ?? "Sign in failed");
    }
  };

  const handleGoogleSignUp = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message ?? "Sign In failed");
    }
  };

  const handleGitHubSignUp = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message ?? "Sign In failed");
    }
  };

  return (
    <main className="flex min-w-0 flex-1 items-center justify-center bg-[#F0F5F0] px-3 py-8 sm:px-6 sm:py-12 md:py-14">
      <div className="w-full max-w-md">
        {/* Page heading */}
        <div className="mb-5 text-center sm:mb-6">
          <h1 className="text-2xl font-bold text-[#26352A] sm:text-3xl">
            সাইন ইন
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-gray-500 sm:text-sm">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Sign in form */}
        <form
          onSubmit={onSubmit}
          className="rounded-xl border border-[#E3EBE4] bg-white/90 p-4 shadow-sm sm:p-6 md:p-7"
        >
          <fieldset className="min-w-0 space-y-4">
            {/* Email */}
            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-800"
              >
                ইমেইল
              </label>

              <input
                required
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="input h-11 min-h-0 w-full min-w-0 border-[#E5EDE6] bg-transparent px-3 text-sm outline-none focus:border-[#05893E] focus:outline-none focus:ring-2 focus:ring-[#05893E]/15 sm:text-base"
              />
            </div>

            {/* Password */}
            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-800"
              >
                পাসওয়ার্ড
              </label>

              <input
                required
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="input h-11 min-h-0 w-full min-w-0 border-[#E5EDE6] bg-transparent px-3 text-sm outline-none focus:border-[#05893E] focus:outline-none focus:ring-2 focus:ring-[#05893E]/15 sm:text-base"
              />
            </div>
          </fieldset>

          {/* Submit button */}
          <button
            type="submit"
            className="mt-5 min-h-11 w-full rounded-lg bg-[#05893E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#047533] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893E] sm:text-base"
          >
            সাইন ইন
          </button>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3 text-xs text-gray-400">
            <div className="h-px flex-1 bg-[#E5EDE6]" />
            <span>অথবা</span>
            <div className="h-px flex-1 bg-[#E5EDE6]" />
          </div>

          {/* Social sign in */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={handleGoogleSignUp}
              type="button"
              className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-3 py-2.5 text-xs font-medium text-gray-800 transition hover:bg-gray-50 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893E] sm:text-sm"
            >
              <svg
                aria-label="Google logo"
                role="img"
                width="16"
                height="16"
                viewBox="0 0 48 48"
                className="shrink-0"
              >
                <path
                  fill="#4285F4"
                  d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
                />
                <path
                  fill="#34A853"
                  d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
                />
                <path
                  fill="#FBBC05"
                  d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
                />
                <path
                  fill="#EA4335"
                  d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.9 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z"
                />
              </svg>

              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              onClick={handleGitHubSignUp}
              type="button"
              className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-3 py-2.5 text-xs font-medium text-gray-800 transition hover:bg-gray-50 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893E] sm:text-sm"
            >
              <svg
                aria-label="GitHub logo"
                role="img"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="shrink-0"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.4.7-4.1-1.4-4.1-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1 .8 2.1v3.1c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" />
              </svg>

              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          {/* Sign up link */}
          <p className="mt-5 text-center text-xs leading-relaxed text-gray-600 sm:text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#05893E] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </form>

        {/* Back to home */}
        <Link
          href="/"
          className="mt-5 block rounded-md py-2 text-center text-xs text-gray-500 transition hover:text-[#05893E] hover:underline sm:text-sm"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default SignInPage;