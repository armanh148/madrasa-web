import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// GET /api/settings (Public)
router.get("/", (req, res) => {
  try {
    const settings = db.settings.get();
    return res.json({ success: true, data: settings });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/settings (Admin)
router.put("/", authenticateToken, (req, res) => {
  try {
    const updates = req.body;
    const updated = db.settings.update(updates);
    return res.json({
      success: true,
      message: "ترتیبات کامیابی سے محفوظ کر دی گئیں",
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

export default router;
