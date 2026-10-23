import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مدرسہ صاحب الزمان (عج) | دینی و عصری علوم کا بین الاقوامی مرکز",
  description: "مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف) - حوزہ علمیہ، حفظ و تجوید، شعبہ خواتین اور دسترخوان امام زمانہ (عج)",
  keywords: ["مدرسہ", "صاحب الزمان", "حوزہ علمیہ", "دینی تعلیم", "شعبہ خواتین", "دسترخوان امام زمانہ"],
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ur" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#120907] text-[#FAF6F0] selection:bg-[#D4AF37] selection:text-[#1A0F0D]">
        {children}
      </body>
    </html>
  );
}
