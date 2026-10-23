"use client";

import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Heart, Sparkles, Send } from "lucide-react";
import { madarsaInfo } from "@/data/madarsaData";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0D0604] border-t-2 border-[#D4AF37]/30 text-[#FAF6F0] relative overflow-hidden">
      {/* Dua e Faraj Banner */}
      <div className="bg-[#1A0F0D] py-6 px-4 border-b border-[#3E2723] text-center">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="text-base sm:text-xl font-arabic text-[#F3E5AB] leading-relaxed">
            "اَللَّـهُمَّ كُنْ لِوَلِيِّكَ الحُجَّةِ بْنِ الحَسَنِ، صَلَوَاتُكَ عَلَيْهِ وَعَلَى آبَائِهِ، فِي هَـٰذِهِ السَّاعَةِ وَفِي كُلِّ سَاعَةٍ، وَلِيّاً وَحَافِظاً وَقَائِداً وَنَاصِراً وَدَلِيلاً وَعَيْناً، حَتَّىٰ تُسْكِنَهُ أَرْضَكَ طَوْعاً وَتُمَتِّعَهُ فِيهَا طَوِيلاً"
          </p>
          <p className="text-xs text-[#D4AF37]">
            اللَّهُمَّ عَجِّلْ لِوَلِيِّكَ الْفَرَجَ وَالْعَافِيَةَ وَالنَّصْر
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: About & Logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-gold-glow">
                <Image
                  src="/images/logo.png"
                  alt="مدرسہ صاحب الزمان لوگو"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#FAF6F0] font-heading">
                  مدرسہ صاحب الزمان <span className="text-[#D4AF37]">(عج)</span>
                </h3>
                <p className="text-xs text-[#D4AF37]">حوزہ علمیہ و دارالقرآن الکریم</p>
              </div>
            </div>

            <p className="text-sm text-[#FAF6F0]/75 leading-relaxed">
              ایک عظیم تعلیمی و تربیتی ادارہ جو مکتبِ اہل بیت علیہم السلام کی حقیقی تعلیمات کو جدید تقاضوں کے ساتھ نئی نسل تک منتقل کر رہا ہے۔
            </p>

            <div className="pt-2 text-xs text-[#F3E5AB]">
              <span>رجسٹریشن و الحاق: </span>
              <span className="text-[#FAF6F0]/80">وفاق المدارس الشیعہ پاکستان / حوزات علمیہ</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-base font-bold text-[#D4AF37] border-b border-[#3E2723] pb-2">
              اہم روابط
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF6F0]/80">
              <li>
                <a href="#home" className="hover:text-[#D4AF37] transition">صفحۂ اول</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D4AF37] transition">تعارف و منشور</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-[#D4AF37] transition">تعلیمی شعبہ جات</a>
              </li>
              <li>
                <a href="#women" className="hover:text-[#D4AF37] transition">شعبہ خواتین</a>
              </li>
              <li>
                <a href="#dastarkhwan" className="hover:text-[#D4AF37] transition">دسترخوان امام زمانہؑ</a>
              </li>
              <li>
                <a href="#library" className="hover:text-[#D4AF37] transition">مکتبہ و لائبریری</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-base font-bold text-[#D4AF37] border-b border-[#3E2723] pb-2">
              شعبہ جات و کورسز
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF6F0]/80">
              <li>• درسِ نظامی (حوزوی درجات)</li>
              <li>• حفظ و تجوید القرآن الکریم</li>
              <li>• عقائد، فقہ و اخلاقیات</li>
              <li>• شعبہ جدید آئی ٹی و انگلش</li>
              <li>• جامعہ فاطمۃ الزہراء (خواتین)</li>
              <li>• فاصلاتی و آن لائن کورسز</li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-base font-bold text-[#D4AF37] border-b border-[#3E2723] pb-2">
              رابطہ و معلومات
            </h4>
            <div className="space-y-3 text-sm text-[#FAF6F0]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                <span>{madarsaInfo.address}، {madarsaInfo.city}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span dir="ltr">{madarsaInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{madarsaInfo.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#donation"
                className="inline-flex items-center gap-1.5 text-xs text-[#FAF6F0] bg-[#3E2723] hover:bg-[#4E3227] px-3.5 py-2 rounded-lg border border-[#D4AF37]/30 transition"
              >
                <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>حقوقِ شرعیہ و صدقات کی تفصیلات</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-[#3E2723] flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6F0]/60 gap-4">
          <p>© ۲۰۲۶ مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف) — جملہ حقوق محفوظ ہیں۔</p>
          <p className="text-[#D4AF37]">
            طراحی و ترقی برائے خدمتِ مکتبِ اہلِ بیت علیہم السلام
          </p>
        </div>
      </div>
    </footer>
  );
}
