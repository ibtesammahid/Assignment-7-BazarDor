
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

async function getRenderedAt() {
  "use cache";
  return Date.now();
}

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const renderedAt = await getRenderedAt();

  const date = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
  }).format(renderedAt);

  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} min-h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <header className="sticky top-0 z-50 w-full bg-white">
          <Navbar />
        </header>

        <div className="w-full min-w-0 overflow-hidden">
          <Marquee />
        </div>

        <main className="w-full min-w-0 flex-1">
          {children}
        </main>

        <section className="w-full bg-[#fafcfa]">
          <Footer />
        </section>

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
