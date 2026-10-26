"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react";

interface WhatWeDoProps {
  onSelectService?: (title: string) => void;
}

export default function WhatWeDo({ onSelectService }: WhatWeDoProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const services = [
    {
      id: "daily-prayers",
      title: "پنجگانہ باجماعت نماز و عبادات",
      titleEng: "Daily Prayers",
      desc: "پانچوں وقت باجماعت نماز، جمعۃ المبارک کا عظیم اجتماع، دعائے توسل و دعائے کمیل کی بابرکت محافل کا مستقل اور منظم اہتمام۔",
      image: "/images/layout/daily-prayer.jpg",
    },
    {
      id: "children-teaching",
      title: "بچوں کی دینی و اخلاقی تربیت",
      titleEng: "Children Teaching",
      desc: "نئی نسل کو بنیادی اسلامی عقائد، آدابِ زندگی، عملی نماز اور اخلاقی تربیت سے روشناس کرانے کے لیے خصوصی تربیتی کلاسز۔",
      image: "/images/layout/tasbih-hands.jpg",
    },
    {
      id: "quran-studies",
      title: "حفظ و تجوید القرآن الکریم",
      titleEng: "Quranic Studies",
      desc: "قرآن مجید کو حسنِ قرات، مکمل تجویدی مخارج اور حفظ کرانے کے لیے بین الاقوامی سطح کے معتبر قراء حضرات کی خصوصی رہنمائی۔",
      image: "/images/layout/child-quran.jpg",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="what-we-do" className="py-20 bg-gray-50/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-heading">
            ہم کیا کرتے ہیں
          </h2>
          <div className="w-16 h-1 bg-[#E5A93C] rounded-full mx-auto my-3" />
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            دینِ اسلام کی نشر و اشاعت، نسلِ نو کی فکری و اخلاقی تربیت، اور انسانیت کی بے لوث خدمت کے لیے ہمارے ہمہ جہت پروگرامز۔
          </p>
        </div>

        {/* Carousel Container with Side Arrows */}
        <div className="relative">
          {/* Arrow Buttons on the outer edges (desktop) */}
          <button
            onClick={handlePrev}
            className="hidden xl:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-gray-700 hover:text-white hover:bg-[#E5A93C] shadow-lg border border-gray-100 items-center justify-center transition-all duration-300"
            aria-label="Previous"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="hidden xl:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-800 text-white hover:bg-[#E5A93C] shadow-lg items-center justify-center transition-all duration-300"
            aria-label="Next"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
              >
                {/* Card Image */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Card Content */}
                <div className="p-7 flex flex-col flex-grow text-center">
                  <span className="text-xs text-gray-400 uppercase font-sans tracking-wider mb-1" dir="ltr">
                    {item.titleEng}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading group-hover:text-[#E5A93C] transition">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-grow">
                    {item.desc}
                  </p>

                  <div>
                    <button
                      onClick={() => onSelectService && onSelectService(item.title)}
                      className="inline-flex items-center gap-2 bg-[#E5A93C] hover:bg-[#D89729] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-sm hover:shadow transition-all"
                    >
                      <span>مزید تفصیلات</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel Indicator Dots */}
          <div className="flex justify-center items-center gap-2 mt-8 lg:hidden">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-white text-gray-700 shadow border border-gray-100 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex gap-1.5 px-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C]" />
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            </div>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-slate-800 text-white shadow flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
