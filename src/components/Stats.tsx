"use client";

import React from "react";
import { statsData } from "@/data/madarsaData";
import { Award, Users, BookOpen, UtensilsCrossed } from "lucide-react";

export default function Stats() {
  const icons = [Users, Award, BookOpen, UtensilsCrossed];

  return (
    <section className="relative z-10 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-[#23120C] via-[#2E1B15] to-[#23120C] border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-10 shadow-gold-glow backdrop-blur-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-[#D4AF37]/20">
          {statsData.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div key={idx} className="flex flex-col items-center text-center pt-4 sm:pt-0">
                <div className="w-14 h-14 rounded-2xl bg-[#3E2723] border border-[#D4AF37]/50 flex items-center justify-center mb-3 shadow-inner">
                  <Icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold gold-text-gradient mb-1 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-base font-semibold text-[#FAF6F0] mb-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-[#D4AF37]/80">
                  {stat.sublabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
