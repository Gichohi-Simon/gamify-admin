import type { Metadata } from "next";
import { Raleway, Inter } from "next/font/google";
import "./globals.css";
import MainProvider from "../components/main-provider";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lullites, gamify admin platform",
  description: "gamify admin platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${inter.variable} antialiased`}>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
