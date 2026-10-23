"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, GraduationCap, Send, Sparkles } from "lucide-react";
import { coursesData } from "@/data/madarsaData";

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export default function AdmissionModal({ isOpen, onClose, defaultCourse }: AdmissionModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    age: "",
    gender: "طالب علم (مرد)",
    phone: "",
    city: "",
    selectedCourse: defaultCourse || coursesData[0].title,
    previousEducation: "میٹرک / مڈل",
    residenceType: "رہائشی (ہاسٹل کے ساتھ)",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");

  useEffect(() => {
    if (defaultCourse) {
      setFormData((prev) => ({ ...prev, selectedCourse: defaultCourse }));
    }
  }, [defaultCourse]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = "MSZ-" + Math.floor(100000 + Math.random() * 900000);
    setAppId(generatedId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#1A0F0D] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl bg-[#2E1B15] text-[#FAF6F0] hover:text-[#D4AF37] hover:bg-[#3E2723] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E1B15] text-xs text-[#D4AF37] border border-[#D4AF37]/30 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>تعلیمی سال ۲۰۲۶ - ۲۰۲۷</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF6F0] font-heading">
                آن لائن درخواستِ داخلہ فارم
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF6F0]/70 mt-1">
                مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف) میں داخلہ کے لیے معلومات درج فرمائیں
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F3E5AB] mb-1">
                    نام امیدوار *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: علی رضا"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#251510] border border-[#4E3227] text-[#FAF6F0] text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F3E5AB] mb-1">
                    والد / سرپرست کا نام *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: محمد رضا"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#251510] border border-[#4E3227] text-[#FAF6F0] text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F3E5AB] mb-1">
                    جنس *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#251510] border border-[#4E3227] text-[#FAF6F0] text-sm focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="طالب علم (مرد)">طالب علم (مرد)</option>
                    <option value="طالبہ (خاتون - کیمپس زہراء)">طالبہ (خاتون - کیمپس زہراء)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F3E5AB] mb-1">
                    عمر (سال) *
                  </label>
                  <input
                    type="number"
                    required
                    min="8"
                    max="60"
                    placeholder="مثال: 16"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#251510] border border-[#4E3227] text-[#FAF6F0] text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F3E5AB] mb-1">
                    شہر / علاقہ *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: لاہور، کراچی، گلگت"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#251510] border border-[#4E3227] text-[#FAF6F0] text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F3E5AB] mb-1">
                    موبائل / واٹس ایپ نمبر *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="03001234567"
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#251510] border border-[#4E3227] text-[#FAF6F0] text-sm focus:border-[#D4AF37] focus:outline-none text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F3E5AB] mb-1">
                    مطلوبہ شعبہ / کورس *
                  </label>
                  <select
                    value={formData.selectedCourse}
                    onChange={(e) => setFormData({ ...formData, selectedCourse: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#251510] border border-[#4E3227] text-[#FAF6F0] text-sm focus:border-[#D4AF37] focus:outline-none"
                  >
                    {coursesData.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                    <option value="شعبہ خواتین (جامعہ سیدہ فاطمہ الزہراء)">
                      شعبہ خواتین (جامعہ سیدہ فاطمہ الزہراء)
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F3E5AB] mb-1">
                    سابقہ تعلیمی قابلیت
                  </label>
                  <select
                    value={formData.previousEducation}
                    onChange={(e) => setFormData({ ...formData, previousEducation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#251510] border border-[#4E3227] text-[#FAF6F0] text-sm focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="پرائمری / مڈل">پرائمری / مڈل</option>
                    <option value="میٹرک">میٹرک</option>
                    <option value="انٹر میڈیٹ (FA/FSc)">انٹر میڈیٹ (FA/FSc)</option>
                    <option value="گریجویشن (BA/BSc/BS)">گریجویشن (BA/BSc/BS)</option>
                    <option value="دیگر دینی اسناد">دیگر دینی اسناد</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F3E5AB] mb-1">
                    رہائش کی ضرورت
                  </label>
                  <select
                    value={formData.residenceType}
                    onChange={(e) => setFormData({ ...formData, residenceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#251510] border border-[#4E3227] text-[#FAF6F0] text-sm focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="رہائشی (مفت ہاسٹل و طعام)">رہائشی (مفت ہاسٹل و طعام)</option>
                    <option value="غیر رہائشی (ڈے اسکالر)">غیر رہائشی (ڈے اسکالر)</option>
                    <option value="آن لائن / فاصلاتی">آن لائن / فاصلاتی تعلیم</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F3E5AB] mb-1">
                  کوئی اضافی تفصیل یا پیغام (اختیاری)
                </label>
                <textarea
                  rows={2}
                  placeholder="کوئی خاص معلومات جو آپ فراہم کرنا چاہیں..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#251510] border border-[#4E3227] text-[#FAF6F0] text-sm focus:border-[#D4AF37] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#1A0F0D] font-bold py-3.5 px-6 rounded-xl shadow-gold-glow hover:scale-[1.02] transition-transform text-base"
              >
                <Send className="w-4 h-4" />
                <span>درخواست جمع کروائیں</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto text-green-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-[#FAF6F0]">
              درخواستِ داخلہ موصول ہو چکی ہے!
            </h3>

            <p className="text-sm text-[#FAF6F0]/80 max-w-md mx-auto leading-relaxed">
              محترم <span className="text-[#D4AF37] font-bold">{formData.fullName}</span>! آپ کی آن لائن درخواست برائے داخلہ موصول ہو چکی ہے۔ شعبہ داخلہ جلد ہی آپ کے فون نمبر پر رابطہ کرے گا۔
            </p>

            <div className="inline-block p-4 rounded-xl bg-[#251510] border border-[#D4AF37]/40">
              <span className="text-xs text-[#FAF6F0]/60 block mb-1">درخواست نمبر (Application ID)</span>
              <span className="font-mono text-xl font-bold text-[#D4AF37] tracking-widest">{appId}</span>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="bg-[#2E1B15] hover:bg-[#3E2723] text-[#D4AF37] border border-[#D4AF37]/50 font-bold px-8 py-2.5 rounded-xl transition text-sm"
              >
                بند کریں
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
