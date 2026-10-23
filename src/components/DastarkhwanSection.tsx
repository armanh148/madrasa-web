"use client";

import React from "react";
import Image from "next/image";
import { dastarkhwanDetails } from "@/data/madarsaData";
import { Utensils, HeartHandshake, Sparkles, Check, Gift } from "lucide-react";

interface DastarkhwanProps {
  onOpenDonation: () => void;
}

export default function DastarkhwanSection({ onOpenDonation }: DastarkhwanProps) {
  return (
    <section id="dastarkhwan" className="py-24 relative overflow-hidden bg-[#120907] islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E1B15] border border-[#D4AF37]/30 text-xs text-[#D4AF37] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>تبرکات و طعامِ خیرات</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#FAF6F0] mb-3 font-heading">
            دسترخوانِ امام زمانہ <span className="text-[#D4AF37]">(عجل اللہ تعالیٰ فرجہ الشریف)</span>
          </h2>
          <p className="text-base sm:text-lg text-[#FAF6F0]/80 leading-relaxed">
            علومِ آلِ محمدؑ کے طلباء، اساتذہ اور محتاجین کے لیے روزانہ عزت و احترام کے ساتھ با برکت طعام کا وسیع انتظام۔
          </p>
        </div>

        {/* Highlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#1F120E]/90 border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-10 shadow-gold-glow backdrop-blur-xl">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-xl group">
              <Image
                src="/images/dastarkhwan.jpg"
                alt="دسترخوان امام زمانہ گرافک"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#150B08]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-[#1A0F0D]/90 border border-[#D4AF37]/30 text-center">
                <p className="text-xs sm:text-sm text-[#F3E5AB] font-arabic">
                  "أَفْضَلُ الصَّدَقَةِ إِشْبَاعُ كَبِدٍ جَائِعَةٍ"
                </p>
                <p className="text-[11px] text-[#D4AF37] mt-1">
                  افضل ترین صدقہ بھوکے کو کھانا کھلانا ہے — رسول اللہ ﷺ
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Info & Action */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#3E2723] text-[#D4AF37] border border-[#D4AF37]/30">
                روزانہ کی بنیاد پر فعال
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF6F0] mt-3 mb-4">
                طعام و تبرک میں شرکت اور برکات کا حصول
              </h3>
              <p className="text-sm sm:text-base text-[#FAF6F0]/80 leading-relaxed mb-6">
                مدرسہ صاحب الزمان کے زیرِ اہتمام دسترخوان امام زمانہ (عج) سال کے ۳۶۵ دن بغیر کسی تعطل کے جاری رہتا ہے۔
                یہاں زیر تعلیم طلباء اور ضرورت مند افراد کے لیے حفظان صحت کے اصولوں کے مطابق بہترین غذائیت بخش کھانا تیار کیا جاتا ہے۔
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dastarkhwanDetails.map((detail, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#2A1913] border border-[#4E3227] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3E2723] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#FAF6F0] mb-1">{detail.title}</h4>
                    <p className="text-xs text-[#FAF6F0]/70 leading-relaxed">{detail.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenDonation}
                className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#1A0F0D] font-bold px-7 py-3.5 rounded-xl shadow-gold-glow hover:scale-105 transition-all text-sm"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>دسترخوان میں اپنا حصہ شامل کریں</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-[#FAF6F0]/80 bg-[#150B08] px-4 py-3 rounded-xl border border-[#D4AF37]/20">
                <Gift className="w-4 h-4 text-[#D4AF37]" />
                <span>طالب علم کی ماہانہ کفالت: ۱۰,۰۰۰ روپے</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
