"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, HeartHandshake, PhoneCall } from "lucide-react";

interface NavbarProps {
  onOpenAdmission: () => void;
  onOpenDonation: () => void;
  onOpenContact: () => void;
}

export default function Navbar({ onOpenAdmission, onOpenDonation, onOpenContact }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "صفحہ اول", href: "/#hero" },
    { name: "تعارف و مقاصد", href: "/policy" },
    { name: "سفر و اساتذہ", href: "/history-staff" },
    { name: "شعبہ خواتین", href: "/womens-department" },
    { name: "کتب خانہ", href: "/library" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 backdrop-blur-2xl backdrop-saturate-150 border-b ${
        scrolled
          ? "py-2.5 bg-[#120A05]/90 shadow-[0_15px_35px_rgba(0,0,0,0.8)] border-[#C9B38D]/20"
          : "py-3.5 sm:py-4 bg-[#120A05]/50 hover:bg-[#120A05]/70 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] border-[#C9B38D]/15"
      }`}
      dir="rtl"
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* ======================================================== */}
          {/* 1. RIGHT SIDE: Madrasa Logo (Gold/Emerald Branding Icon) */}
          {/* ======================================================== */}
          <div className="flex items-center gap-3">
            <a href="#hero" className="flex items-center gap-3 group" title="مدرسہ صاحب الزمان (عج)">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(201,179,141,0.4)]">
                <Image
                  src="/images/logo.png"
                  alt="مدرسہ صاحب الزمان گولڈ و ایمرلڈ لوگو"
                  width={56}
                  height={56}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter drop-shadow"
                  priority
                />
              </div>
              <div className="hidden sm:flex flex-col justify-center text-right gap-0.5">
                <span className="font-urdu text-sm lg:text-base font-bold text-white group-hover:text-[#D9C7A7] transition-colors leading-normal">
                  مدرسہ صاحب الزمان
                </span>
                <span className="text-[10px] text-[#C9B38D] font-cairo leading-normal">
                  (عجل اللہ تعالیٰ فرجہ الشریف)
                </span>
              </div>
            </a>
          </div>

          {/* ======================================================== */}
          {/* 2. CENTER: Urdu Navigation Links with Smooth Transitions */}
          {/* ======================================================== */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-9 font-urdu text-base lg:text-lg">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-[#D9C7A7] transition-colors relative group py-1 font-medium"
              >
                {link.name}
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#C9B38D] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* ======================================================== */}
          {/* 3. LEFT SIDE: Action Buttons (Urdu Text)                 */}
          {/* ======================================================== */}
          <div className="hidden sm:flex items-center gap-3">
            {/* "رابطہ کریں" Button with Dull Gold Border & White Text */}
            <button
              onClick={onOpenContact}
              className="font-urdu text-xs sm:text-sm font-bold px-5 py-2 rounded-full border border-[#C9B38D] text-white hover:text-[#120A05] bg-[#1A0E08]/70 hover:bg-[#C9B38D] transition-all duration-300 shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C9B38D]" />
              <span>رابطہ کریں</span>
            </button>

            {/* "تعاون" Button (White Pill with Dull Golden Accent) */}
            <button
              onClick={onOpenDonation}
              className="font-urdu text-xs sm:text-sm font-bold px-6 py-2 rounded-full bg-white hover:bg-stone-100 text-[#120A05] transition-all duration-300 shadow-lg border border-[#C9B38D]/60 hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <HeartHandshake className="w-4 h-4 text-[#8C6D3F]" />
              <span>تعاون</span>
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAdmission}
              className="bg-white text-[#120A05] border border-[#C9B38D] font-urdu text-xs font-bold px-3.5 py-1.5 rounded-full shadow active:scale-95"
            >
              داخلہ لیں
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
              aria-label="مینو کھولیں"
            >
              {isOpen ? <X className="w-5 h-5 text-[#C9B38D]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu with Glassmorphism */}
        {isOpen && (
          <div className="md:hidden mt-2 bg-black/60 border border-white/15 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl space-y-3">
            <div className="flex flex-col gap-2 font-urdu">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-100 hover:bg-white/10 hover:text-amber-400 text-base font-medium transition-colors text-right"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenContact();
                }}
                className="flex-1 font-urdu bg-amber-500/20 border border-amber-400/90 text-amber-300 font-bold py-2 rounded-full text-center text-xs"
              >
                رابطہ کریں
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenDonation();
                }}
                className="flex-1 font-urdu bg-white text-black font-black py-2 rounded-full text-center text-xs shadow"
              >
                تعاون
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
