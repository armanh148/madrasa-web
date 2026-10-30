import express from "express";
import { upload } from "../middleware/upload.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// POST /api/upload (Admin - File upload for books, staff, gallery, slips)
router.post("/", authenticateToken, upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "کوئی فائل منتخب نہیں کی گئی" });
    }

    const host = req.get("host");
    const protocol = req.protocol;
    const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    return res.json({
      success: true,
      message: "فائل کامیابی سے اپلوڈ ہو گئی",
      fileUrl: fileUrl,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ success: false, message: error.message || "فائل اپلوڈ کرنے میں خرابی پیش آگئی" });
  }
});

// Also allow public slip upload for donors
router.post("/public", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "کوئی فائل منتخب نہیں کی گئی" });
    }

    const host = req.get("host");
    const protocol = req.protocol;
    const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    return res.json({
      success: true,
      fileUrl: fileUrl,
      fileName: req.file.filename
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "اپلوڈ میں خرابی" });
  }
});

export default router;
