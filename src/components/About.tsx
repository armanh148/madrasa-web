"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Star, Sparkles, BookCheck, Heart, Shield } from "lucide-react";

export default function About() {
  const aims = [
    {
      title: "قرآنی فہم و مکتبِ اہلِ بیتؑ کی نشر و اشاعت",
      desc: "قرآن مجید اور سیرتِ چہاردہ معصومین علیہم السلام کی حقیقی تعلیمات کو جدید فہم کے ساتھ دنیا بھر میں عام کرنا۔"
    },
    {
      title: "مستند حوزوی مجتہدین و محققین کی تربیت",
      desc: "حوزہ علمیہ کے روایتی درسی تسلسل (مقدمات، سطوح اور درس خارج) کے ذریعے فقہاء اور اسلامی مفکرین تیار کرنا۔"
    },
    {
      title: "جدید شکوک و شبہات کے عقلی و علمی جوابات",
      desc: "عصرِ حاضر کے نوجوانوں کے فکری و نظریاتی سوالات کے مدلل اور استدلالی جوابات مہیا کرنا۔"
    },
    {
      title: "اخلاقی و روحانی کردار سازی اور خدمتِ خلق",
      desc: "علم کے ساتھ ساتھ تزکیہ نفس، خلوص، تقویٰ، اور سوسائٹی کے پسے ہوئے طبقات کی بے لوث خدمت۔"
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#150B08]">
      {/* Background Islamic accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3E2723]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E1B15] border border-[#D4AF37]/30 text-xs text-[#D4AF37] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>تعارف و اغراض و مقاصد</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#FAF6F0] mb-5">
            علومِ آلِ محمدؑ کا امین اور رہنمائی کا مینار
          </h2>
          <p className="text-base sm:text-lg text-[#FAF6F0]/80 leading-relaxed">
            مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف) محض ایک روایتی دینی ادارہ نہیں،
            بلکہ امامِ عصرؑ کے فرامین کے مطابق علوم، روحانیت اور عصرِ حاضر کی حکمت کا امتزاج ہے۔
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Image & Calligraphy card) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl p-2 bg-[#2E1B15]">
              <div className="relative h-96 sm:h-[450px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/hero-madarsa.jpg"
                  alt="مدرسہ کیمپس"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#150B08] via-transparent to-transparent" />
              </div>

              {/* Floating Quote Card */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 right-4 bg-[#1F120E]/95 border border-[#D4AF37]/60 rounded-2xl p-5 shadow-gold-glow backdrop-blur-md">
                <p className="text-sm sm:text-base font-arabic text-[#F3E5AB] leading-relaxed text-center">
                  "مَنْ تَعَلَّمَ الْعِلْمَ وَعَمِلَ بِهِ وَعَلَّمَ لِلَّهِ دُعِيَ فِي مَلَكُوتِ السَّمَاوَاتِ عَظِيمًا"
                </p>
                <p className="text-xs text-[#D4AF37] text-center mt-2 font-medium">
                  — امام جعفر صادق علیہ السلام (اصولِ کافی)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (Aims and Core pillars) */}
          <div className="lg:col-span-7 space-y-6 pt-6 lg:pt-0">
            <div className="space-y-4">
              {aims.map((aim, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#1F120E] border border-[#3E2723] hover:border-[#D4AF37]/50 transition-all duration-300 hover:bg-[#2A1913] flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#3E2723] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#FAF6F0] mb-1">
                      {aim.title}
                    </h3>
                    <p className="text-sm text-[#FAF6F0]/75 leading-relaxed">
                      {aim.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#2E1B15] border border-[#D4AF37]/20 text-center">
                <Shield className="w-5 h-5 text-[#D4AF37] mx-auto mb-1" />
                <span className="text-xs font-semibold text-[#FAF6F0]">حکومتی و حوزوی الحاق</span>
              </div>
              <div className="p-3 rounded-xl bg-[#2E1B15] border border-[#D4AF37]/20 text-center">
                <BookCheck className="w-5 h-5 text-[#D4AF37] mx-auto mb-1" />
                <span className="text-xs font-semibold text-[#FAF6F0]">معیاری تعلیمی نصاب</span>
              </div>
              <div className="p-3 rounded-xl bg-[#2E1B15] border border-[#D4AF37]/20 text-center col-span-2 sm:col-span-1">
                <Heart className="w-5 h-5 text-[#D4AF37] mx-auto mb-1" />
                <span className="text-xs font-semibold text-[#FAF6F0]">مکمل فلاحی و دینی نظام</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
