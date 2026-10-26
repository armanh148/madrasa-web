"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Quote, Sparkles, Star } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(1);

  const testimonials = [
    {
      id: 1,
      quote:
        "مدرسہ صاحب الزمان (عج) میں جس خلوص اور محنت کے ساتھ علومِ آلِ محمدؑ کی تدریس ہو رہی ہے، وہ عصرِ حاضر میں ایک مثال ہے۔ یہاں کے فارغین علمی لحاظ سے پختہ اور اخلاقی طور پر مثالی کردار کے حامل ہیں۔",
      name: "مولانا سید عابد رضوی",
      role: "استادِ حوزہ علمیہ و محقق",
      avatar: "/images/layout/avatar1.jpg",
    },
    {
      id: 2,
      quote:
        "ادارے کا نظم و ضبط، روحانی فضا اور خصوصاً دسترخوانِ امام زمانہؑ کی بلا تفریق خدمات قابلِ صد تحسین ہیں۔ یہاں دینی اور عصری علوم کا ایسا متوازن امتزاج ہے جو نئی نسل کے ایمان کی حفاظت کرتا ہے۔",
      name: "علامہ سید مہدی موسوی",
      role: "سرپرستِ اعلیٰ و امامِ جمعہ",
      avatar: "/images/layout/avatar2.jpg",
      isFeatured: true,
    },
    {
      id: 3,
      quote:
        "میرے دونوں بیٹے یہاں حفظِ قرآن اور حوزوی شعبے میں زیرِ تعلیم ہیں۔ اساتذہ کا ذاتی طور پر بچوں پر توجہ دینا اور شرعی ماحول کی پابندی دل کو گہرا اطمینان بخشتی ہے۔ اللہ تعالیٰ اس ادارے کو سدا آباد رکھے۔",
      name: "الحاج محمد ارسلان",
      role: "معزز سرپرست و خیر خواہ",
      avatar: "/images/layout/avatar3.jpg",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-[#1A0E08] islamic-navy-pattern relative overflow-hidden">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#120A05]/80 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md mb-10 sm:mb-14 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#C9B38D]" />
            <span className="font-urdu">علماء و سرپرستوں کے ارشادات</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-urdu font-bold text-white mb-5 leading-[1.7] pt-2">
            ہمارے متعلق <span className="text-[#C9B38D]">گراں قدر تاثرات</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-5 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />
          <p className="text-base sm:text-lg md:text-xl text-stone-200 font-urdu leading-[2] max-w-2xl mx-auto font-normal">
            علمائے کرام، معزز سرپرستوں اور خیر خواہوں کے مدرسہ صاحب الزمان کی علمی و تربیتی فضا سے متعلق گراں قدر خیالات۔
          </p>
        </div>

        {/* Testimonials 3-Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
          {testimonials.map((item, idx) => {
            const isCenter = idx === 1;

            if (isCenter) {
              return (
                <div
                  key={item.id}
                  className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[30px] shadow-[0_20px_50px_rgba(201,179,141,0.25)] md:-translate-y-3"
                >
                  <div className="bg-gradient-to-b from-[#1E110A] to-[#120A05] rounded-[28px] p-8 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Quote className="w-9 h-9 text-[#C9B38D]" />
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#C9B38D] text-[#C9B38D]" />
                          ))}
                        </div>
                      </div>

                      <p className="text-sm sm:text-base leading-[2.4] sm:leading-[2.6] text-stone-200 font-urdu mb-6">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-[#C9B38D]/20">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9B38D] shadow-md shrink-0">
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-urdu font-bold text-white">
                          {item.name}
                        </h4>
                        <span className="text-xs text-[#C9B38D] font-urdu font-medium">
                          {item.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="bg-gradient-to-b from-[#1E110A]/85 to-[#120A05]/95 backdrop-blur-xl rounded-[28px] p-8 text-stone-200 shadow-xl border border-[#C9B38D]/20 hover:border-[#C9B38D]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-9 h-9 text-[#C9B38D]/80" />
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C9B38D] text-[#C9B38D]" />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base leading-[2.4] sm:leading-[2.6] text-stone-300 font-urdu mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-[#C9B38D]/20">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9B38D]/60 shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-urdu font-bold text-white">
                      {item.name}
                    </h4>
                    <span className="text-xs text-[#C9B38D] font-urdu font-medium">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
