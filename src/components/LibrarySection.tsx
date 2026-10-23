"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, Sparkles, Search, Library, Bookmark, Globe } from "lucide-react";

export default function LibrarySection() {
  const libraryStats = [
    { label: "مطبوعہ کتب", count: "۲۵,۰۰۰+", desc: "فقہ، اصول، حدیث، تاریخ و ادب" },
    { label: "نایاب خطی نسخے", count: "۵۰۰+", desc: "قدیم علماء کے قلمی نوادرات" },
    { label: "ڈیجیٹل مقالات", count: "۱۵,۰۰۰+", desc: "آن لائن رسائی اور پی ڈی ایف" },
    { label: "مطالعہ کے لیے نشستیں", count: "۱۵۰+", desc: "پرسکون اور ایئر کنڈیشنڈ ہال" },
  ];

  return (
    <section id="library" className="py-24 relative overflow-hidden bg-[#150B08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E1B15] border border-[#D4AF37]/30 text-xs text-[#D4AF37] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>علم و تحقیق کا خزانہ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#FAF6F0] mb-3 font-heading">
            مرکزی کتب خانہ و ڈیجیٹل لائبریری
          </h2>
          <p className="text-base sm:text-lg text-[#FAF6F0]/80 leading-relaxed">
            محققین، علماء اور تشنگانِ علم کے لیے اسلامی علوم و فنون کا عظیم الشان ذخیرہ۔
          </p>
        </div>

        {/* Content Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Image with golden border */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl p-2 bg-[#2A1913]">
              <div className="relative h-80 sm:h-[450px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/library.jpg"
                  alt="مدرسہ لائبریری"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#150B08] via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Right: Info and Stats */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-3xl bg-[#1F120E] border border-[#3E2723]">
              <h3 className="text-xl sm:text-2xl font-bold text-[#FAF6F0] mb-3 flex items-center gap-2">
                <Library className="w-6 h-6 text-[#D4AF37]" />
                <span>حوزوی علوم و عصری ریسرچ کا حسین امتزاج</span>
              </h3>
              <p className="text-sm sm:text-base text-[#FAF6F0]/80 leading-relaxed mb-6">
                ہماری لائبریری میں شیعہ اثنا عشری مکتب فکر کی بنیادی کتب (کتب اربعہ، بحار الانوار، وسائل الشیعہ وغیرہ)
                کے ساتھ ساتھ کتب اہلسنت، تفاسیر، تاریخ اسلام، اور عصری فلسفہ و سائنس پر مشتمل ہزاروں جلدیں دستیاب ہیں۔
              </p>

              <div className="grid grid-cols-2 gap-4">
                {libraryStats.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#2E1B15] border border-[#4E3227]/60">
                    <div className="text-2xl font-bold gold-text-gradient mb-0.5">{item.count}</div>
                    <div className="text-xs font-bold text-[#FAF6F0] mb-0.5">{item.label}</div>
                    <div className="text-[11px] text-[#FAF6F0]/60">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#2A1913] border border-[#D4AF37]/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3E2723] flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#FAF6F0]">آن لائن ڈیجیٹل کیٹلاگ</h4>
                  <p className="text-xs text-[#FAF6F0]/70">گھر بیٹھے کتب کی دستیابی اور ریسرچ مواد تلاش کریں</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#1A0F0D] bg-[#D4AF37] px-3 py-1.5 rounded-lg shrink-0">
                جلد فعال
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
