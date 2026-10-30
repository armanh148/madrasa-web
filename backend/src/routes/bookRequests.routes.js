import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// --- BOOK REQUESTS (کتب کی فرمائش) ---

// POST /api/book-requests (Public - Request a Book)
router.post("/requests", (req, res) => {
  try {
    const { name, phone, bookName, authorName, purpose, notes } = req.body;

    if (!name || !phone || !bookName) {
      return res.status(400).json({
        success: false,
        message: "نام، فون نمبر اور کتاب کا نام درج کرنا لازمی ہے۔"
      });
    }

    const newRequest = {
      id: "req-" + Date.now().toString(36),
      name: name.trim(),
      phone: phone.trim(),
      bookName: bookName.trim(),
      authorName: authorName ? authorName.trim() : "",
      purpose: purpose || "تحقیقی مقالہ",
      notes: notes || "",
      status: "pending", // pending, available, unavailable, fulfilled
      createdAt: new Date().toISOString()
    };

    const saved = db.bookRequests.insert(newRequest);
    return res.status(201).json({
      success: true,
      message: "کتاب کی درخواست کامیابی سے جمع ہو گئی ہے!",
      data: saved
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// GET /api/book-requests (Admin - List Requests)
router.get("/requests", authenticateToken, (req, res) => {
  try {
    const requests = db.bookRequests.find();
    return res.json({ success: true, total: requests.length, data: requests });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/book-requests/:id (Admin - Update Request Status)
router.put("/requests/:id", authenticateToken, (req, res) => {
  try {
    const { status, notes } = req.body;
    const updated = db.bookRequests.update(req.params.id, {
      ...(status && { status }),
      ...(notes !== undefined && { notes })
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: "درخواست نہیں ملی" });
    }
    return res.json({ success: true, message: "درخواست کی کیفیت تبدیل کر دی گئی", data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// DELETE /api/book-requests/:id (Admin)
router.delete("/requests/:id", authenticateToken, (req, res) => {
  try {
    const deleted = db.bookRequests.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "درخواست نہیں ملی" });
    }
    return res.json({ success: true, message: "درخواست کامیابی سے حذف کر دی گئی" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// --- BOOK DONATIONS (عطیہ کتب) ---

// POST /api/book-donations (Public - Offer to Donate Books)
router.post("/donations", (req, res) => {
  try {
    const { name, phone, city, bookCount, topic, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "نام اور فون نمبر درج کرنا لازمی ہے۔"
      });
    }

    const newDonation = {
      id: "don-" + Date.now().toString(36),
      name: name.trim(),
      phone: phone.trim(),
      city: city || "",
      bookCount: bookCount || "10-50 کتب",
      topic: topic || "دینی کتب",
      message: message || "",
      status: "pending", // pending, contacted, received
      createdAt: new Date().toISOString()
    };

    const saved = db.bookDonations.insert(newDonation);
    return res.status(201).json({
      success: true,
      message: "کتب کے عطیہ کی پیشکش کامیابی سے موصول ہو گئی ہے!",
      data: saved
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// GET /api/book-donations (Admin - List Donations)
router.get("/donations", authenticateToken, (req, res) => {
  try {
    const donations = db.bookDonations.find();
    return res.json({ success: true, total: donations.length, data: donations });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/book-donations/:id (Admin - Update Status)
router.put("/donations/:id", authenticateToken, (req, res) => {
  try {
    const { status } = req.body;
    const updated = db.bookDonations.update(req.params.id, { status });
    if (!updated) {
      return res.status(404).json({ success: false, message: "ریکارڈ نہیں ملا" });
    }
    return res.json({ success: true, message: "کیفیت اپ ڈیٹ ہو گئی", data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// DELETE /api/book-donations/:id (Admin)
router.delete("/donations/:id", authenticateToken, (req, res) => {
  try {
    const deleted = db.bookDonations.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "ریکارڈ نہیں ملا" });
    }
    return res.json({ success: true, message: "ریکارڈ کامیابی سے حذف ہو گیا" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

export default router;
