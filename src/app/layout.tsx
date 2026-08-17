import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PawTrail from "@/components/PawTrail";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lulu the Cat🐾portfolio",
  description:
    "プログラミングスクール卒業後、個人開発で学習中のエンジニア見習いのポートフォリオサイト。Go・Next.js・LLMを使った作品を紹介🐾",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children} <PawTrail />
      </body>
    </html>
  );
}
