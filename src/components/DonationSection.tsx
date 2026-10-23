"use client";

import React, { useState } from "react";
import { donationAccounts } from "@/data/madarsaData";
import { Copy, Check, HeartHandshake, ShieldCheck, Landmark, Sparkles, PhoneCall } from "lucide-react";

export default function DonationSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section id="donation" className="py-24 relative overflow-hidden bg-[#120907] islamic-stars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E1B15] border border-[#D4AF37]/30 text-xs text-[#D4AF37] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>صدقات، تبرکات و حقوقِ شرعیہ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#FAF6F0] mb-3 font-heading">
            دینی خدمات میں اپنا با برکت حصہ شامل کریں
          </h2>
          <p className="text-base sm:text-lg text-[#FAF6F0]/80 leading-relaxed">
            علومِ آلِ محمدؑ کی ترویج، تشنگانِ علم کی کفالت، اور دسترخوانِ امام زمانہؑ کو جاری رکھنے کے لیے آپ کا تعاون سرمایہ آخرت ہے۔
          </p>
        </div>

        {/* Bank Account Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {donationAccounts.map((acc, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-[#23120C] to-[#1F120E] border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-gold-glow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#3E2723] mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#3E2723] border border-[#D4AF37]/50 flex items-center justify-center">
                      <Landmark className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#FAF6F0]">{acc.bankName}</h3>
                      <p className="text-xs text-[#D4AF37]">{acc.branch}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/30">
                    تصدیق شدہ اکاؤنٹ
                  </span>
                </div>

                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between items-center py-1.5 border-b border-[#3E2723]/60">
                    <span className="text-[#FAF6F0]/70">اکاؤنٹ ٹائٹل:</span>
                    <span className="font-bold text-[#FAF6F0]">{acc.accountTitle}</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-[#3E2723]/60">
                    <span className="text-[#FAF6F0]/70">اکاؤنٹ نمبر:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-[#D4AF37]" dir="ltr">
                        {acc.accountNumber}
                      </span>
                      <button
                        onClick={() => handleCopy(acc.accountNumber, idx)}
                        className="p-1.5 rounded-lg bg-[#3E2723] hover:bg-[#D4AF37] hover:text-[#1A0F0D] transition text-[#FAF6F0]"
                        title="اکاؤنٹ نمبر کاپی کریں"
                      >
                        {copiedIndex === idx ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-[#3E2723]/60">
                    <span className="text-[#FAF6F0]/70">IBAN / تفصیل:</span>
                    <span className="font-mono text-xs text-[#FAF6F0]/90" dir="ltr">
                      {acc.iban}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-[#FAF6F0]/70">مد / مصرف:</span>
                    <span className="text-xs font-medium text-[#F3E5AB]">{acc.purpose}</span>
                  </div>
                </div>
              </div>

              {copiedIndex === idx && (
                <div className="mt-4 p-2 bg-green-900/40 border border-green-500/50 rounded-xl text-center text-xs text-green-300">
                  اکاؤنٹ نمبر کامیابی سے کاپی ہو گیا!
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sahm e Imam and Receipt Policy Banner */}
        <div className="bg-[#1A0F0D] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#2E1B15] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-1">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#FAF6F0] mb-1">
                سہمِ امامؑ اور سہمِ سادات کے لیے شرعی اجازت نامے و رسید
              </h4>
              <p className="text-xs sm:text-sm text-[#FAF6F0]/75 leading-relaxed">
                مراجع عظام کے باضابطہ وکالت ناموں اور اجازت کی روشنی میں حقوقِ شرعیہ وصول کیے جاتے ہیں۔
                رقم ارسال فرمانے کے بعد واٹس ایپ پر سلپ بھیج کر باقاعدہ مہر شدہ رسید حاصل کریں۔
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 shrink-0 text-sm"
          >
            <PhoneCall className="w-4 h-4" />
            <span>رسید کے لیے واٹس ایپ رابطہ</span>
          </a>
        </div>
      </div>
    </section>
  );
}
