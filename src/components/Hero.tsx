"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, BookOpen, Sparkles, GraduationCap, Users, ShieldCheck } from "lucide-react";
import { madarsaInfo } from "@/data/madarsaData";

interface HeroProps {
  onOpenAdmission: () => void;
  onExploreCourses: () => void;
}

export default function Hero({ onOpenAdmission, onExploreCourses }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Hero Image with Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-madarsa.jpg"
          alt="مدرسہ صاحب الزمان عمارت"
          fill
          priority
          className="object-cover object-center scale-105 animate-pulse-slow"
        />
        {/* Dark Brown, Mahogany and Gold Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120907] via-[#1F120E]/85 to-[#150B08]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#1F120E]/70 to-[#120907]" />
        <div className="absolute inset-0 islamic-stars opacity-40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Bismillah / Calligraphy Header */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#2E1B15]/80 border border-[#D4AF37]/40 shadow-gold-glow mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-sm sm:text-base text-[#F3E5AB] font-arabic tracking-wide">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ — يَا صَاحِبَ الزَّمَانِ أَدْرِكْنَا
          </span>
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        </div>

        {/* Main Madarsa Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FAF6F0] mb-6 leading-tight">
          <span className="block text-2xl sm:text-3xl text-[#D4AF37] font-medium mb-2">
            حوزہ علمیہ و دار القرآن
          </span>
          <span className="gold-text-gradient drop-shadow-md">
            مدرسہ صاحب الزمان
          </span>
          <span className="block text-2xl sm:text-4xl text-[#F3E5AB] font-normal mt-2">
            (عجل اللہ تعالیٰ فرجہ الشریف)
          </span>
        </h1>

        {/* Tagline / Subtitle */}
        <p className="max-w-3xl mx-auto text-lg sm:text-2xl text-[#FAF6F0]/90 mb-10 leading-relaxed font-light">
          دینی و عصری علوم کا بین الاقوامی گہوارہ — جہاں علومِ آلِ محمدؑ کی گہری تعلیم، حفظ و تجوید،
          اور جدید دور کے تقاضوں سے ہم آہنگ تربیت دی جاتی ہے۔
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={onOpenAdmission}
            className="group flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#1A0F0D] font-bold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-gold-glow hover:shadow-gold-glow-lg hover:scale-105 transition-all duration-300"
          >
            <span>آن لائن داخلہ فارم پر کریں</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>

          <a
            href="#courses"
            className="flex items-center gap-2.5 bg-[#2E1B15]/90 hover:bg-[#3E2723] text-[#FAF6F0] border border-[#D4AF37]/50 text-base sm:text-lg px-7 py-4 rounded-2xl transition-all duration-300 hover:border-[#D4AF37]"
          >
            <BookOpen className="w-5 h-5 text-[#D4AF37]" />
            <span>تعلیمی شعبہ جات دیکھیں</span>
          </a>

          <a
            href="#dastarkhwan"
            className="flex items-center gap-2 bg-[#1A0F0D]/80 hover:bg-[#2E1B15] text-[#F3E5AB] border border-[#D4AF37]/30 text-base px-6 py-4 rounded-2xl transition-all"
          >
            <span>دسترخوانِ امام زمانہؑ</span>
          </a>
        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-[#D4AF37]/20">
          <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-[#1F120E]/60 border border-[#4E3227]/50 backdrop-blur-sm">
            <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm font-medium text-[#FAF6F0]">حوزوی و مستند اسناد</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-[#1F120E]/60 border border-[#4E3227]/50 backdrop-blur-sm">
            <Users className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm font-medium text-[#FAF6F0]">مستقل شعبہ برائے خواتین</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-[#1F120E]/60 border border-[#4E3227]/50 backdrop-blur-sm">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm font-medium text-[#FAF6F0]">مفت رہائش و معیاری طعام</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-[#1F120E]/60 border border-[#4E3227]/50 backdrop-blur-sm">
            <BookOpen className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm font-medium text-[#FAF6F0]">عصری و آئی ٹی تعلیم</span>
          </div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#150B08] to-transparent pointer-events-none" />
    </section>
  );
}
