"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Courses from "@/components/Courses";
import WomensSection from "@/components/WomensSection";
import DastarkhwanSection from "@/components/DastarkhwanSection";
import LibrarySection from "@/components/LibrarySection";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";
import AdmissionModal from "@/components/AdmissionModal";

export default function Home() {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [selectedCourseForAdmission, setSelectedCourseForAdmission] = useState<string | undefined>();

  const handleOpenAdmissionWithCourse = (courseTitle: string) => {
    setSelectedCourseForAdmission(courseTitle);
    setIsAdmissionOpen(true);
  };

  const handleScrollToDonation = () => {
    const el = document.getElementById("donation");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToCourses = () => {
    const el = document.getElementById("courses");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#120907] text-[#FAF6F0] selection:bg-[#D4AF37] selection:text-[#1A0F0D]">
      {/* Navigation */}
      <Navbar
        onOpenAdmission={() => {
          setSelectedCourseForAdmission(undefined);
          setIsAdmissionOpen(true);
        }}
        onOpenDonation={handleScrollToDonation}
      />

      {/* Hero Section */}
      <Hero
        onOpenAdmission={() => {
          setSelectedCourseForAdmission(undefined);
          setIsAdmissionOpen(true);
        }}
        onExploreCourses={handleScrollToCourses}
      />

      {/* Quick Statistics Counter */}
      <Stats />

      {/* About & Mission Section */}
      <About />

      {/* Academic Courses & Departments */}
      <Courses onSelectCourseForAdmission={handleOpenAdmissionWithCourse} />

      {/* Dedicated Women's Section (Syeda Fatima Zahra Campus) */}
      <WomensSection
        onOpenAdmission={() => {
          setSelectedCourseForAdmission("شعبہ خواتین (جامعہ سیدہ فاطمہ الزہراء)");
          setIsAdmissionOpen(true);
        }}
      />

      {/* Dastarkhwan e Imam e Zamana Section */}
      <DastarkhwanSection onOpenDonation={handleScrollToDonation} />

      {/* Islamic Classical Library & Maktaba */}
      <LibrarySection />

      {/* Donation & Religious Dues Section */}
      <DonationSection />

      {/* Footer & Dua e Faraj */}
      <Footer />

      {/* Interactive Admission Application Modal */}
      <AdmissionModal
        isOpen={isAdmissionOpen}
        onClose={() => setIsAdmissionOpen(false)}
        defaultCourse={selectedCourseForAdmission}
      />
    </main>
  );
}
