import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "./Component/Navbar";
import Marquee from "./Component/Marquee";
import Footer from "./Component/Footer";
import { Toaster } from "react-hot-toast";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
});

export const metadata: Metadata = {
  title: "Bazardor",
  description: "A bazaar for all your needs",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {

  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} min-h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        {/* Responsive Navbar */}
        <header className="sticky top-0 z-50 w-full bg-white">
          <Navbar />
        </header>

        {/* Market price ticker */}
        <div className="w-full min-w-0 overflow-hidden">
          <Marquee />
        </div>

        {/* Page content */}
        <main className="w-full min-w-0 flex-1">
          {children}
        </main>

        {/* Footer */}
        <section className="w-full bg-[#fafcfa]">
          <Footer />
        </section>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              maxWidth: "calc(100vw - 32px)",
              overflowWrap: "anywhere",
            },
          }}
        />
      </body>
    </html>
  );
}
