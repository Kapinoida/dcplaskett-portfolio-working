import type { Metadata } from "next";
import { Platypi } from "next/font/google";
import "./globals.css";
import Nav from "@/components/navigation/nav";
import Footer from "@/components/footer/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
const special = Platypi({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false
});

export const metadata: Metadata = {
  title: "David Plaskett.",
  description: "David Plaskett's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={special.className}>
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <Nav />
        {children}
        <Footer />
        </ThemeProvider>
        <SpeedInsights/>
        </body>
    </html>
  );
}
