"use client";

import React from "react";
import Image from "next/image";
import { womensWingFeatures } from "@/data/madarsaData";
import { Sparkles, Shield, Heart, GraduationCap, CheckCircle } from "lucide-react";

interface WomensSectionProps {
  onOpenAdmission: () => void;
}

export default function WomensSection({ onOpenAdmission }: WomensSectionProps) {
  return (
    <section id="women" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#150B08] via-[#1E110D] to-[#150B08]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E1B15] border border-[#D4AF37]/30 text-xs text-[#D4AF37] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>خصوصی شعبہ برائے خواتین</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#FAF6F0] mb-3 font-heading">
            جامعہ سیدہ فاطمہ الزہراء <span className="text-[#D4AF37]">(سلام اللہ علیہا)</span>
          </h2>
          <p className="text-base sm:text-lg text-[#FAF6F0]/80 leading-relaxed">
            خواتین و طالبات کے لیے شرعی اصولوں کے عین مطابق مکمل پردہ دار، باوقار اور جدید دینی تعلیمی ادارہ۔
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Right Column: Features and Mission */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-6">
            <div className="p-6 rounded-3xl bg-[#2A1913]/80 border border-[#D4AF37]/30 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-[#F3E5AB] mb-4 flex items-center gap-3">
                <Heart className="w-6 h-6 text-[#D4AF37]" />
                عظمتِ نسواں اور فکری و روحانی بالیدگی
              </h3>
              <p className="text-sm sm:text-base text-[#FAF6F0]/85 leading-relaxed mb-6">
                شعبہ خواتین کا قیام اس مقصد کے تحت عمل میں لایا گیا ہے تاکہ ہماری مائیں، بہنیں اور بیٹیاں
                حضرت فاطمۃ الزہراءؑ اور حضرت زینبِ کبریٰؑ کے اسوہ حسنہ پر عمل کرتے ہوئے اسلامی احکام، قرآنی علوم،
                اور تربیتِ اولاد میں مکمل دسترس حاصل کر سکیں۔
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {womensWingFeatures.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#1A0F0D] border border-[#3E2723] hover:border-[#D4AF37]/40 transition"
                  >
                    <div className="flex items-center gap-2 text-sm font-bold text-[#FAF6F0] mb-1.5">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-[#FAF6F0]/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenAdmission}
                className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#1A0F0D] font-bold px-6 py-3.5 rounded-xl shadow-gold-glow hover:scale-105 transition-all text-sm"
              >
                <GraduationCap className="w-4 h-4" />
                <span>شعبہ خواتین میں داخلہ لیں</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-[#F3E5AB] bg-[#2E1B15] px-4 py-3 rounded-xl border border-[#D4AF37]/20">
                <Shield className="w-4 h-4 text-[#D4AF37]" />
                <span>۱۰۰٪ مستورات کے زیرِ انتظام کیمپس اور آن لائن کلاسز</span>
              </div>
            </div>
          </div>

          {/* Left Column: Image Card */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-gold-glow group">
              <div className="relative h-80 sm:h-[460px] w-full">
                <Image
                  src="/images/women-campus.jpg"
                  alt="جامعہ سیدہ فاطمہ الزہراء کیمپس"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0D] via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#150B08] via-[#150B08]/90 to-transparent">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#D4AF37] text-[#1A0F0D]">
                  خصوصی پردہ دار کیمپس
                </span>
                <h4 className="text-lg font-bold text-[#FAF6F0] mt-2">
                  سیدہ فاطمۃ الزہراء (س) کیمپس برائے طالبات
                </h4>
                <p className="text-xs text-[#FAF6F0]/70 mt-1">
                  مکمل سکون، روحانی ماحول اور جدید سہولیات سے آراستہ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
