import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Drawer from "@/components/Drawer";
import Footer from "@/components/Footer";
import { SITE_NAME } from "@/lib/site";
// 旧サイトと同じ読み込み順（lib → reset → common → drawer → style）
import "@/styles/lib.css";
import "@/styles/reset.css";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: "大藪英雄のポートフォリオサイトです。",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* ルートレイアウトなので全ページに効く（この警告は Pages Router 向け） */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&display=swap"
        />
      </head>
      <body className="drawer drawer--right drawer--sidebar">
        <Header />
        <Drawer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
