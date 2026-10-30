import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// GET /api/staff (Public - List all or by category)
router.get("/", (req, res) => {
  try {
    const { category } = req.query;
    let staff = db.staff.find();

    if (category && category !== "all") {
      staff = staff.filter((s) => s.category === category);
    }

    // Sort by order ascending
    staff.sort((a, b) => (a.order || 99) - (b.order || 99));

    return res.json({ success: true, total: staff.length, data: staff });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// POST /api/staff (Admin - Add staff)
router.post("/", authenticateToken, (req, res) => {
  try {
    const {
      name,
      title,
      category,
      department,
      qualification,
      experience,
      image,
      email,
      phone,
      isOnlineActive,
      order
    } = req.body;

    if (!name || !title) {
      return res.status(400).json({
        success: false,
        message: "نام اور عہدہ درج کرنا لازمی ہے۔"
      });
    }

    const newStaff = {
      id: "staff-" + Date.now().toString(36),
      name: name.trim(),
      title: title.trim(),
      category: category || "faculty",
      department: department || "",
      qualification: qualification || "",
      experience: experience || "",
      image: image || "/images/layout/avatar1.jpg",
      email: email || "",
      phone: phone || "",
      isOnlineActive: isOnlineActive !== undefined ? Boolean(isOnlineActive) : true,
      order: Number(order) || 10,
      createdAt: new Date().toISOString()
    };

    const saved = db.staff.insert(newStaff);
    return res.status(201).json({
      success: true,
      message: "استاد / عملہ کامیابی سے شامل کر دیا گیا",
      data: saved
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/staff/:id (Admin - Update staff)
router.put("/:id", authenticateToken, (req, res) => {
  try {
    const staff = db.staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ success: false, message: "ریکارڈ نہیں ملا" });
    }

    const updates = { ...req.body };
    delete updates.id;
    if (updates.order !== undefined) updates.order = Number(updates.order);
    if (updates.isOnlineActive !== undefined) updates.isOnlineActive = Boolean(updates.isOnlineActive);

    const updated = db.staff.update(req.params.id, updates);
    return res.json({
      success: true,
      message: "عملہ کی تفصیلات اپ ڈیٹ ہو گئیں",
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// DELETE /api/staff/:id (Admin - Delete staff)
router.delete("/:id", authenticateToken, (req, res) => {
  try {
    const success = db.staff.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: "ریکارڈ نہیں ملا" });
    }
    return res.json({ success: true, message: "ریکارڈ کامیابی سے حذف کر دیا گیا" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

export default router;
