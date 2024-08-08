import type { Metadata } from "next";
import { Platypi } from "next/font/google";
import "./globals.css";
import Nav from "@/components/navigation/nav";
import Footer from "@/components/footer/footer";

const special = Platypi({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dp.",
  description: "david plaskett's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={special.className}>
        <Nav />
        {children}
        <Footer />
        </body>
    </html>
  );
}
