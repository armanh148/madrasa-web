"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BookOpen, Sparkles, Star, Download, Eye, X, CheckCircle2, Search } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  coverImage: string;
  rating: number;
  reviewsCount: number;
  pages: number;
  description: string;
}

export default function BooksSection() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const books: Book[] = [
    {
      id: "1",
      title: "شہادتِ امام حسینؑ",
      author: "سید ابو الاعلیٰ مودودی",
      category: "تاریخ و سوانح",
      coverImage: "/images/books/book-1.jpg",
      rating: 5,
      reviewsCount: 124,
      pages: 180,
      description: "واقعہ کربلا کے تاریخی حقائق، فلسفۂ شہادت اور اس کے اسلامی و سیاسی اثرات پر تفصیلی و مدلل تاریخی جائزہ۔",
    },
    {
      id: "2",
      title: "کربلا کا تاریخی پس منظر",
      author: "شاہدہ بی بی خسروی / ندوی",
      category: "تاریخِ کربلا",
      coverImage: "/images/books/book-2.jpg",
      rating: 5,
      reviewsCount: 98,
      pages: 320,
      description: "قیامِ امام حسینؑ کے پس منظر، اسباب و محرکات اور کوفہ و شام کے تاریخی حالات پر مشتمل جامع کتاب۔",
    },
    {
      id: "3",
      title: "روضة الشہداء",
      author: "علامہ ملا حسین واعظ کاشفیؒ",
      category: "مقتل و فضائل",
      coverImage: "/images/books/book-3.jpg",
      rating: 5,
      reviewsCount: 215,
      pages: 450,
      description: "فارسی و اردو کی معروف ترین کلاسیکل مقتل کی کتاب جس میں انبیاء اور اہل بیتؑ کے مصائب کا دردناک اور مستند بیان ہے۔",
    },
    {
      id: "4",
      title: "شہادتِ امام حسینؑ (حقائق و واقعات)",
      author: "محققین تاریخِ اسلام",
      category: "تحقیق و مقالات",
      coverImage: "/images/books/book-4.jpg",
      rating: 5,
      reviewsCount: 86,
      pages: 210,
      description: "واقعہ کربلا سے متعلق مستند تاریخی شواہد، اسناد اور محققانہ تجزیات کا خوبصورت اور معلوماتی انتخاب۔",
    },
    {
      id: "5",
      title: "تاریخِ عاشور",
      author: "ڈاکٹر ابراہیم آیتی",
      category: "واقعہ عاشوراء",
      coverImage: "/images/books/book-5.jpg",
      rating: 5,
      reviewsCount: 160,
      pages: 290,
      description: "عاشوراء کے دن کے لمحہ بہ لمحہ واقعات، خطبات، شہدائے کربلا کی قربانیوں اور تاریخی حقائق پر مستند تصنیف۔",
    },
  ];

  return (
    <section id="books" className="py-20 sm:py-28 relative overflow-hidden bg-[#120A05] islamic-dark-pattern" dir="rtl">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#C9B38D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">

        {/* ============================================================ */}
        {/* Section Header with generous vertical spacing                */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-[#C9B38D]" />
            <span className="font-urdu">علمی و تحقیقی ذخیرہ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[1.8]">
            منتخب کتب و <span className="text-[#C9B38D]">اہم مطبوعات</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-sm sm:text-base md:text-lg text-[#FAF7F2] font-urdu leading-[2.2] sm:leading-[2.4] max-w-2xl mx-auto font-medium">
            مدرسہ صاحب الزمان کی لائبریری میں دستیاب تاریخِ اسلام، سیرتِ اہلِ بیتؑ اور تحقیق پر مبنی معتبر کتب
          </p>
        </div>

        {/* ============================================================ */}
        {/* 5 Books Row (Matching User Screenshot Layout)                 */}
        {/* ============================================================ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-7 items-stretch">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => setSelectedBook(book)}
              className="group relative flex flex-col items-center p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#1E110A]/90 to-[#140B06]/95 border border-[#C9B38D]/25 hover:border-[#C9B38D] shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_35px_rgba(201,179,141,0.25)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Category Pill Tag */}
              <div className="w-full flex justify-between items-center mb-2.5">
                <span className="text-[10px] sm:text-xs font-urdu font-semibold text-[#C9B38D] bg-[#1A0E08] px-2.5 py-0.5 rounded-full border border-[#C9B38D]/30">
                  {book.category}
                </span>
                <span className="text-[10px] text-stone-400 font-urdu">
                  {book.pages} صفحات
                </span>
              </div>

              {/* Book Cover Image Container */}
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#0A0503] border border-[#C9B38D]/30 shadow-inner group-hover:border-[#C9B38D] transition-colors mb-3">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                />
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-[#120A05]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                  <span className="px-3 py-1.5 rounded-full bg-white text-[#120A05] font-urdu font-bold text-xs border border-[#C9B38D] shadow-lg flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#8C6D3F]" />
                    <span>مطالعہ کریں</span>
                  </span>
                </div>
              </div>

              {/* Book Title */}
              <h3 className="font-urdu font-bold text-white text-sm sm:text-base text-center leading-[1.8] group-hover:text-[#D9C7A7] transition-colors line-clamp-2 min-h-[46px] flex items-center justify-center">
                {book.title}
              </h3>

              {/* Author Name */}
              <p className="text-xs text-[#C9B38D] font-urdu text-center mt-1 truncate w-full">
                {book.author}
              </p>

              {/* Star Rating Section (Matching Screenshot) */}
              <div className="flex items-center justify-center gap-1 mt-2.5 pt-2 border-t border-[#C9B38D]/15 w-full">
                <span className="text-xs font-mono font-bold text-stone-300 ml-1">
                  {book.rating}.0
                </span>
                <div className="flex text-[#C9B38D]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#C9B38D] text-[#C9B38D]"
                    />
                  ))}
                </div>
              </div>

              {/* Read Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBook(book);
                }}
                className="w-full mt-3 h-8 sm:h-9 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border border-[#C9B38D] font-urdu font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#8C6D3F]" />
                <span>کتاب دیکھیں</span>
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#1A0E08]/80 via-[#24140B]/90 to-[#1A0E08]/80 border border-[#C9B38D]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#120A05] border border-[#C9B38D]/40 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-[#C9B38D]" />
            </div>
            <div>
              <h4 className="font-urdu font-bold text-white text-sm sm:text-base">
                مدرسہ صاحب الزمان لائبریری میں ۲۵,۰۰۰ سے زائد کتب دستیاب ہیں
              </h4>
              <p className="font-urdu text-xs sm:text-sm text-stone-300 mt-0.5 leading-[2.0]">
                طلبہ اور محققین حضرات لائبریری وزٹ کر کے اصل کتب سے استفادہ حاصل کر سکتے ہیں۔
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border border-[#C9B38D] font-urdu font-bold text-xs sm:text-sm shrink-0 shadow-md transition active:scale-95"
          >
            لائبریری کی معلومات لیں
          </a>
        </div>

      </div>

      {/* ============================================================ */}
      {/* Book Detail Modal Popup                                       */}
      {/* ============================================================ */}
      {selectedBook && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#1E110A] to-[#120A05] border-2 border-[#C9B38D]/50 p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#120A05] hover:bg-[#2A170E] border border-[#C9B38D]/40 text-stone-300 hover:text-white flex items-center justify-center transition"
              aria-label="بند کریں"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-right mt-2">
              {/* Modal Cover Image */}
              <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-xl overflow-hidden bg-[#0A0503] border border-[#C9B38D]/40 shrink-0 shadow-xl">
                <Image
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  fill
                  className="object-contain p-1"
                />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col">
                <div className="inline-block self-center sm:self-start px-3 py-1 rounded-full bg-[#1A0E08] text-[11px] font-urdu font-semibold text-[#C9B38D] border border-[#C9B38D]/30 mb-2">
                  {selectedBook.category}
                </div>

                <h3 className="font-urdu font-bold text-white text-xl sm:text-2xl leading-[1.8]">
                  {selectedBook.title}
                </h3>

                <p className="text-sm font-urdu font-semibold text-[#C9B38D] mt-1">
                  مصنف: {selectedBook.author}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-center sm:justify-start gap-1.5 my-2.5">
                  <div className="flex text-[#C9B38D]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9B38D] text-[#C9B38D]" />
                    ))}
                  </div>
                  <span className="text-xs text-stone-300 font-urdu">
                    ({selectedBook.reviewsCount} آراء)
                  </span>
                </div>

                <p className="font-urdu text-xs sm:text-sm text-stone-200 leading-[2.2] mt-1">
                  {selectedBook.description}
                </p>

                {/* Info tags */}
                <div className="mt-4 pt-3 border-t border-[#C9B38D]/20 flex items-center justify-around text-xs font-urdu text-stone-300">
                  <span>صفحات: <b className="text-white">{selectedBook.pages}</b></span>
                  <span>زبان: <b className="text-white">اردو</b></span>
                  <span>دستیابی: <b className="text-emerald-400">لائبریری میں موجود</b></span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-[#C9B38D]/30 flex flex-wrap gap-3">
              <a
                href="#contact"
                onClick={() => setSelectedBook(null)}
                className="flex-1 h-11 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border border-[#C9B38D] font-urdu font-bold text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-[#8C6D3F]" />
                <span>مطالعہ و معلومات کے لیے رابطہ کریں</span>
              </a>
              <button
                onClick={() => setSelectedBook(null)}
                className="h-11 px-6 rounded-full bg-[#1A0E08] hover:bg-[#2A170E] text-white border border-[#C9B38D]/40 font-urdu font-semibold text-sm transition"
              >
                بند کریں
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
