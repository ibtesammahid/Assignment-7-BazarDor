"use client";
import { authClient, signUp } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const onSubmit = async (event: React.SubmitEvent<HTMLElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
    };
    

    const { data, error } = await signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Sign up successfully!");
      redirect("/");
    }
    if (error) {
      toast.error(error.message ?? "Sign up failed")
    }
 };

     const handleGoogleSignUp = async () => {
        const { data, error } = await authClient.signIn.social({
          provider: "google",
        });
        if (data) {
        
      redirect("/");
    }
    if (error) {
      toast.error(error.message ?? "Sign up failed")
    }

    };

    const handleGitHubSignUp = async () => {
       const {data, error} = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
    })
    if (data) {
      redirect("/");
    }
    if (error) {
      toast.error(error.message ?? "Sign up failed")
    }
    };

  return (
    <main className="flex flex-1 items-center justify-center bg-[#F0F5F0] px-4 py-8">
      <form onSubmit={onSubmit} className="w-full max-w-xs">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-bold text-[#26352A]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <fieldset className="rounded-xl border border-[#E3EBE4] bg-white/80 p-4 shadow-sm">
          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-xs font-medium text-gray-800"
              >
                নাম
              </label>
              <input
                required
                id="name"
                type="text"
                name="name"
                placeholder="যেমন: ইবতেসাম মাহবুব"
                className="input h-9 min-h-0 w-full border-[#E5EDE6] bg-transparent px-2 text-xs outline-none focus:border-[#05893E]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-xs font-medium text-gray-800"
              >
                ইমেইল
              </label>
              <input
                required
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input h-9 min-h-0 w-full border-[#E5EDE6] bg-transparent px-2 text-xs outline-none focus:border-[#05893E]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-xs font-medium text-gray-800"
              >
                পাসওয়ার্ড
              </label>
              <input
                required
                id="password"
                type="password"
                name="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="input h-9 min-h-0 w-full border-[#E5EDE6] bg-transparent px-2 text-xs outline-none focus:border-[#05893E]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-medium text-gray-800"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                required
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="আবার পাসওয়ার্ড লিখুন"
                className="input h-9 min-h-0 w-full border-[#E5EDE6] bg-transparent px-2 text-xs outline-none focus:border-[#05893E]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-3 h-9 w-full rounded-md bg-[#05893E] text-xs font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#047533]"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>

          <div className="divider my-2 text-xs text-gray-400">অথবা</div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleGoogleSignUp}
              type="button"
              className="flex min-w-0 items-center justify-center gap-1 rounded-md border border-[#E5E5E5] bg-white px-1 py-2 text-[10px] font-medium text-gray-800 transition hover:shadow-md"
            >
              <svg
                aria-label="Google logo"
                role="img"
                width="13"
                height="13"
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
              <span className="truncate">Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              onClick={handleGitHubSignUp}
              type="button"
              className="flex min-w-0 items-center justify-center gap-1 rounded-md border border-[#E5E5E5] bg-white px-1 py-2 text-[10px] font-medium text-gray-800 transition hover:shadow-md"
            >
              <svg
                aria-label="GitHub logo"
                role="img"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="shrink-0"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.4.7-4.1-1.4-4.1-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1 .8 2.1v3.1c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              <span className="truncate">GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-medium text-[#05893E] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </fieldset>

        <Link
          href="/"
          className="mt-4 block text-center text-xs text-gray-500 hover:underline"
        >
          <p className="mt-4 text-center text-[10px] text-gray-400">
            ← হোম পেজে ফিরে যান
          </p>
        </Link>
      </form>
    </main>
  );
};

export default SignUpPage;
