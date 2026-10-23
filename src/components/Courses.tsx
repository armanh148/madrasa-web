"use client";

import React, { useState } from "react";
import { coursesData, Course } from "@/data/madarsaData";
import { BookOpen, BookmarkCheck, ShieldCheck, Laptop, Clock, GraduationCap, Check, ArrowLeft, Sparkles } from "lucide-react";

interface CoursesProps {
  onSelectCourseForAdmission: (courseTitle: string) => void;
}

export default function Courses({ onSelectCourseForAdmission }: CoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course>(coursesData[0]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="w-6 h-6 text-[#D4AF37]" />;
      case "BookmarkCheck":
        return <BookmarkCheck className="w-6 h-6 text-[#D4AF37]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />;
      case "Laptop":
        return <Laptop className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <BookOpen className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="courses" className="py-24 relative bg-[#120907] islamic-stars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E1B15] border border-[#D4AF37]/30 text-xs text-[#D4AF37] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>نصاب و تعلیمی پروگرامز</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#FAF6F0] mb-5">
            ہمارے مرکزی تعلیمی شعبہ جات
          </h2>
          <p className="text-base sm:text-lg text-[#FAF6F0]/80 leading-relaxed">
            قرآن و اہل بیتؑ کے متوازن نظامِ تعلیم کے تحت مختلف درجات کے طلباء کے لیے معیاری اور تصدیق شدہ کورسز۔
          </p>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {coursesData.map((course) => {
            const isSelected = selectedCourse.id === course.id;
            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? "bg-[#2E1B15] border-[#D4AF37] shadow-gold-glow scale-102"
                    : "bg-[#1A0F0D] border-[#3E2723] hover:border-[#D4AF37]/40 hover:bg-[#23120C]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#3E2723] border border-[#D4AF37]/40 flex items-center justify-center">
                      {getIcon(course.icon)}
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/30">
                      {course.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#FAF6F0] mb-1">
                    {course.title}
                  </h3>
                  <div className="text-xs text-[#D4AF37] font-arabic mb-3">
                    {course.arabicTitle}
                  </div>

                  <p className="text-sm text-[#FAF6F0]/70 line-clamp-3 mb-4 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#3E2723] flex items-center justify-between text-xs text-[#D4AF37]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                  <span className="font-semibold underline">تفصیلات دیکھیں</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded Course Detail Showcase */}
        {selectedCourse && (
          <div className="bg-gradient-to-br from-[#2E1B15] to-[#1A0F0D] border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#1A0F0D] text-xs font-bold">
                    منتخب کورس
                  </span>
                  <span className="text-sm text-[#F3E5AB]">
                    مدت: {selectedCourse.duration}
                  </span>
                  <span className="text-sm text-[#FAF6F0]/60">|</span>
                  <span className="text-sm text-[#FAF6F0]/80">
                    اہلیت: {selectedCourse.level}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-bold text-[#FAF6F0] mb-2 font-heading">
                  {selectedCourse.title}
                </h3>
                <p className="text-base text-[#D4AF37] font-arabic mb-6">
                  {selectedCourse.arabicTitle}
                </p>
                <p className="text-base sm:text-lg text-[#FAF6F0]/85 mb-6 leading-relaxed">
                  {selectedCourse.description}
                </p>

                <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
                  خصوصیات و نصابی فوائد:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {selectedCourse.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-[#FAF6F0]/90">
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-[#1A0F0D]/90 border border-[#4E3227]">
                <div className="w-20 h-20 rounded-full bg-[#3E2723] border-2 border-[#D4AF37] flex items-center justify-center mb-4 shadow-gold-glow">
                  <GraduationCap className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <h4 className="text-lg font-bold text-[#FAF6F0] mb-1">داخلہ برائے نیا تعلیمی سال</h4>
                <p className="text-xs text-[#FAF6F0]/70 mb-6">
                  اس شعبہ میں داخلہ کے لیے ابھی اپنی درخواست جمع کروائیں
                </p>
                <button
                  onClick={() => onSelectCourseForAdmission(selectedCourse.title)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#1A0F0D] font-bold py-3.5 px-6 rounded-xl shadow-gold-glow hover:scale-105 transition-transform text-sm"
                >
                  <span>اس شعبہ میں داخلہ لیں</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
