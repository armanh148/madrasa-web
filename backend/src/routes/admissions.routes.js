import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Helper to generate application ID
const generateApplicationId = () => {
  return "MSZ-" + Math.floor(100000 + Math.random() * 900000);
};

// POST /api/admissions (Public - Submit Application)
router.post("/", (req, res) => {
  try {
    const {
      fullName,
      fatherName,
      age,
      gender,
      phone,
      city,
      selectedCourse,
      previousEducation,
      residenceType,
      message
    } = req.body;

    if (!fullName || !fatherName || !phone) {
      return res.status(400).json({
        success: false,
        message: "امیدوار کا نام، والد کا نام اور رابطہ نمبر درج کرنا لازمی ہے۔"
      });
    }

    const newAdmission = {
      id: generateApplicationId(),
      fullName: fullName.trim(),
      fatherName: fatherName.trim(),
      age: Number(age) || null,
      gender: gender || "طالب علم (مرد)",
      phone: phone.trim(),
      city: city ? city.trim() : "",
      selectedCourse: selectedCourse || "شعبہ درسِ نظامی (حوزوی علوم)",
      previousEducation: previousEducation || "چھٹی جماعت پاس",
      residenceType: residenceType || "رہائشی (ہاسٹل و طعام)",
      message: message ? message.trim() : "",
      status: "pending",
      interviewDate: "",
      notes: "",
      createdAt: new Date().toISOString()
    };

    const saved = db.admissions.insert(newAdmission);

    return res.status(201).json({
      success: true,
      message: "درخواستِ داخلہ کامیابی کے ساتھ موصول ہو گئی ہے!",
      applicationId: saved.id,
      data: saved
    });
  } catch (error) {
    console.error("Admission submit error:", error);
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// GET /api/admissions (Admin - List with search & filters)
router.get("/", authenticateToken, (req, res) => {
  try {
    const { status, search } = req.query;

    let admissions = db.admissions.find();

    if (status && status !== "all") {
      admissions = admissions.filter((item) => item.status === status);
    }

    if (search && search.trim() !== "") {
      const q = search.trim().toLowerCase();
      admissions = admissions.filter(
        (item) =>
          item.id.toLowerCase().includes(q) ||
          item.fullName.toLowerCase().includes(q) ||
          item.fatherName.toLowerCase().includes(q) ||
          item.phone.toLowerCase().includes(q) ||
          (item.city && item.city.toLowerCase().includes(q)) ||
          item.selectedCourse.toLowerCase().includes(q)
      );
    }

    return res.json({
      success: true,
      total: admissions.length,
      data: admissions
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// GET /api/admissions/stats/summary (Admin - Summary counts)
router.get("/stats/summary", authenticateToken, (req, res) => {
  try {
    const all = db.admissions.find();
    const stats = {
      total: all.length,
      pending: all.filter((a) => a.status === "pending").length,
      interview_scheduled: all.filter((a) => a.status === "interview_scheduled").length,
      approved: all.filter((a) => a.status === "approved").length,
      rejected: all.filter((a) => a.status === "rejected").length
    };
    return res.json({ success: true, stats });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// GET /api/admissions/:id (Admin - Single details)
router.get("/:id", authenticateToken, (req, res) => {
  try {
    const admission = db.admissions.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({ success: false, message: "درخواست نہیں ملی" });
    }
    return res.json({ success: true, data: admission });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/admissions/:id (Admin - Update status / interviewDate / notes)
router.put("/:id", authenticateToken, (req, res) => {
  try {
    const { status, interviewDate, notes } = req.body;
    const admission = db.admissions.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({ success: false, message: "درخواست نہیں ملی" });
    }

    const updates = {};
    if (status !== undefined) updates.status = status;
    if (interviewDate !== undefined) updates.interviewDate = interviewDate;
    if (notes !== undefined) updates.notes = notes;

    const updated = db.admissions.update(req.params.id, updates);
    return res.json({
      success: true,
      message: "درخواست اپ ڈیٹ کر دی گئی ہے",
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// DELETE /api/admissions/:id (Admin - Delete)
router.delete("/:id", authenticateToken, (req, res) => {
  try {
    const success = db.admissions.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: "درخواست نہیں ملی" });
    }
    return res.json({ success: true, message: "درخواست کامیابی سے حذف کر دی گئی" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

export default router;
