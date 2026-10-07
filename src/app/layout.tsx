import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "./Component/Navbar";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
});



export const metadata: Metadata = {
  title: "Bazardor",
  description: "A bazaar for all your needs",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col  mx-auto max-w-7xl">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>

      </body>
    </html>
  );
}
