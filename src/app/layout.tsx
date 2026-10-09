import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "./Component/Navbar";
import Marquee from "./Component/Marquee";
import Footer from "./Component/Footer";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
});

export const metadata: Metadata = {
  title: "Bazardor",
  description: "A bazaar for all your needs",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const date = Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
  }).format(new Date());

  return (
    <html
      lang="en"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col ">
        <header className="sticky top-0 z-50 bg-white">
          <Navbar date={date} />
        </header>
        <Marquee />
        <main>{children}</main>
        <section className=" bg-[#fafcfa] ">
          <Footer />
        </section>
      </body>
    </html>
  );
}
