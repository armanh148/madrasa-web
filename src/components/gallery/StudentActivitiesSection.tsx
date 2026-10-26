"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trophy, Play, Video, Sparkles, Smile, Eye } from "lucide-react";
import MediaLightboxModal, { MediaItem } from "./MediaLightboxModal";

export default function StudentActivitiesSection() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const activities: MediaItem[] = [
    {
      id: "sports-cricket",
      title: "سالانہ کرکٹ ٹورنامنٹ ۲۰۲۶ - فائنل میچ اور بچوں کی خوشی",
      category: "کھیل کود و اسپورٹس",
      type: "video",
      videoDuration: "۰۳:۲۰",
      imageUrl: "/images/gallery/sports-day.jpg",
      date: "ہفتہ وار اسپورٹس ڈے",
      location: "مدرسہ صاحب الزمان پلے گراؤنڈ",
      description: "طلبہ کے درمیان تفریحی کرکٹ میچ کی پُرجوش جھلکیاں، چھکے چوکے اور فاتح ٹیم کی فتح کا جشن۔",
    },
    {
      id: "indoor-games",
      title: "ان ڈور گیمز و ذہنی آزمائش کے مقابلے",
      category: "ذہنی تفریح",
      type: "image",
      imageUrl: "/images/layout/lattice-prayer.jpg",
      date: "شام کا تفریحی وقت",
      location: "اسٹوڈنٹس ایکٹیویٹی روم",
      description: "کیرم بورڈ، شطرنج اور کوئز مقابلوں میں بچوں کی دلچسپی اور مسابقاتی جذبہ۔",
    },
    {
      id: "morning-exercise",
      title: "صبح کی باقاعدہ پی ٹی و جسمانی ورزش",
      category: "صحت و تندرستی",
      type: "video",
      videoDuration: "۰۱:۴۵",
      imageUrl: "/images/layout/daily-prayer.jpg",
      date: "روزانہ صبح",
      location: "مرکزی کورٹ یارڈ",
      description: "صحت مند دماغ کے لیے صحت مند جسم — باقاعدہ صبح کی ہلکی پھلکی ورزش اور نظم و ضبط۔",
    },
    {
      id: "tug-of-war",
      title: "رسی کشی کا سنسنی خیز اور دوستانہ مقابلہ",
      category: "اسپورٹس گالہ",
      type: "image",
      imageUrl: "/images/layout/congregation.jpg",
      date: "سالانہ اسپورٹس فیسٹیول",
      location: "اوپن گراؤنڈ",
      description: "مختلف درجات کے طلبہ کے درمیان زور آزمائی اور ٹیم ورک کا دلکش منظر۔",
    },
    {
      id: "friendly-badminton",
      title: "بیڈمنٹن چیمپئن شپ و طلبہ کی مسکراہٹیں",
      category: "میدانی کھیل",
      type: "video",
      videoDuration: "۰۲:۱۰",
      imageUrl: "/images/layout/quran-study.jpg",
      date: "عصر کے بعد",
      location: "بیڈمنٹن کورٹ",
      description: "طلبہ کی چستی، مہارت اور کھیل کے دوران باہمی محبت و اخوت کا مظاہرہ۔",
    },
  ];

  return (
    <section id="student-activities" className="py-20 sm:py-28 bg-[#120A05] islamic-dark-pattern relative overflow-hidden" dir="rtl">
      {/* Ambient Radial */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#C9B38D]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
            <Trophy className="w-4 h-4 text-[#C9B38D]" />
            <span className="font-urdu">نشاط و جسمانی صحت</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[1.8]">
            بچوں کے <span className="text-[#C9B38D]">کھیل کود اور سرگرمیاں</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-sm sm:text-base md:text-lg text-[#FAF7F2] font-urdu leading-[2.2] sm:leading-[2.4] max-w-2xl mx-auto font-medium">
            تعلیم و تربیت کے ساتھ ساتھ طلبہ کی جسمانی تندرستی، کرکٹ، بیڈمنٹن اور دوستانہ مقابلوں کی پُرشوق جھلکیاں
          </p>
        </div>

        {/* Masonry / Staggered Gallery Grid (Section 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {activities.map((item, idx) => {
            // Staggered heights for masonry feel
            const isLarge = idx === 0 || idx === 3;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className={`group relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1E110A] to-[#120A05] border border-[#C9B38D]/25 hover:border-[#C9B38D] shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_45px_rgba(201,179,141,0.3)] transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col justify-end ${
                  isLarge ? "min-h-[380px] sm:min-h-[440px]" : "min-h-[290px] sm:min-h-[340px]"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.85]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/40 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 right-4 left-4 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#120A05]/85 border border-[#C9B38D]/40 text-xs font-urdu font-semibold text-[#C9B38D] backdrop-blur-sm">
                    {item.type === "video" ? (
                      <>
                        <Video className="w-3.5 h-3.5 text-red-400" />
                        <span>ویڈیو کلپ ({item.videoDuration})</span>
                      </>
                    ) : (
                      <>
                        <Smile className="w-3.5 h-3.5 text-[#C9B38D]" />
                        <span>اسپورٹس تصویر</span>
                      </>
                    )}
                  </span>
                  <span className="text-[11px] font-urdu text-stone-300 bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                    {item.date}
                  </span>
                </div>

                {/* Video Play Icon Overlay */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 text-[#120A05] border-2 border-[#C9B38D] flex items-center justify-center shadow-[0_0_25px_rgba(201,179,141,0.8)] group-hover:scale-115 transition-transform duration-300">
                      <Play className="w-6 h-6 fill-[#120A05] text-[#120A05] mr-1" />
                    </div>
                  </div>
                )}

                {/* Bottom Content Card */}
                <div className="relative z-10 p-5 sm:p-6 text-right">
                  <span className="text-[11px] font-urdu font-semibold text-[#C9B38D] block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-urdu font-bold text-white text-base sm:text-lg leading-[1.8] group-hover:text-[#D9C7A7] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-urdu text-xs sm:text-sm text-stone-200 mt-1 leading-[2.2] line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      <MediaLightboxModal
        item={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </section>
  );
}
