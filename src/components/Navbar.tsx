"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Phone, HeartHandshake, Sparkles, UserPlus } from "lucide-react";
import { madarsaInfo } from "@/data/madarsaData";

interface NavbarProps {
  onOpenAdmission: () => void;
  onOpenDonation: () => void;
}

export default function Navbar({ onOpenAdmission, onOpenDonation }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "صفحۂ اول", href: "#home" },
    { name: "تعارف و مقاصد", href: "#about" },
    { name: "تعلیمی شعبہ جات", href: "#courses" },
    { name: "شعبہ خواتین", href: "#women" },
    { name: "دسترخوان امام زمانہؑ", href: "#dastarkhwan" },
    { name: "مکتبہ و لائبریری", href: "#library" },
    { name: "معاونت و تبرکات", href: "#donation" },
    { name: "رابطہ", href: "#contact" },
  ];

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#23120C] via-[#3E2723] to-[#23120C] border-b border-[#D4AF37]/20 py-1.5 px-4 text-xs text-[#FAF6F0]/90">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#D4AF37] text-[#1A0F0D]">
              اعلانِ داخلہ
            </span>
            <span className="text-[#F3E5AB]">
              نئے تعلیمی سال کے داخلے شروع ہیں — محدود نشستیں دستیاب ہیں!
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[12px] text-[#FAF6F0]/80">
            <a href={`tel:${madarsaInfo.phone}`} className="flex items-center gap-1.5 hover:text-[#D4AF37] transition">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span dir="ltr">{madarsaInfo.phone}</span>
            </a>
            <span className="text-[#D4AF37]/40">|</span>
            <span className="text-[#D4AF37]">اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ وَعَجِّلْ فَرَجَهُمْ</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#1A0F0D]/95 backdrop-blur-md shadow-2xl border-b border-[#D4AF37]/30 py-2.5"
            : "bg-[#1A0F0D]/80 backdrop-blur-sm border-b border-[#D4AF37]/15 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-gold-glow group-hover:scale-105 transition-transform">
                <Image
                  src="/images/logo.png"
                  alt="مدرسہ صاحب الزمان لوگو"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#FAF6F0] group-hover:text-[#D4AF37] transition font-heading">
                  مدرسہ صاحب الزمان <span className="text-sm font-normal text-[#D4AF37]">(عج)</span>
                </span>
                <span className="text-[11px] text-[#D4AF37]/90 tracking-wide">
                  دینی و عصری علوم کا بین الاقوامی ادارہ
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-2.5 py-1.5 text-sm font-medium text-[#FAF6F0]/85 hover:text-[#D4AF37] hover:bg-[#3E2723]/40 rounded-lg transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                onClick={onOpenAdmission}
                className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#1A0F0D] font-bold px-4 py-2 rounded-xl text-sm shadow-gold-glow hover:shadow-gold-glow-lg hover:scale-105 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>آن لائن داخلہ</span>
              </button>

              <button
                onClick={onOpenDonation}
                className="flex items-center gap-1.5 bg-[#3E2723] hover:bg-[#4E3227] text-[#D4AF37] border border-[#D4AF37]/40 px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>معاونت</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={onOpenAdmission}
                className="flex sm:hidden items-center gap-1 bg-[#D4AF37] text-[#1A0F0D] text-xs font-bold px-2.5 py-1.5 rounded-lg"
              >
                داخلہ
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-[#FAF6F0] hover:text-[#D4AF37] hover:bg-[#2E1B15] focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden bg-[#1A0F0D]/98 border-t border-[#D4AF37]/20 px-4 pt-3 pb-6 space-y-2 mt-2 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-[#FAF6F0] hover:text-[#D4AF37] hover:bg-[#3E2723]/50 rounded-lg transition"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-[#4E3227] flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAdmission();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] text-[#1A0F0D] font-bold py-2.5 rounded-xl text-sm shadow-gold-glow"
              >
                <UserPlus className="w-4 h-4" />
                آن لائن داخلہ فارم
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenDonation();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#2E1B15] text-[#D4AF37] border border-[#D4AF37]/40 py-2.5 rounded-xl text-sm"
              >
                <HeartHandshake className="w-4 h-4" />
                معاونت و دسترخوان تبرکات
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
