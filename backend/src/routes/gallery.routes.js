import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// GET /api/gallery (Public - Filter by section)
router.get("/", (req, res) => {
  try {
    const { section, type } = req.query;
    let items = db.gallery.find();

    if (section && section !== "all") {
      items = items.filter((item) => item.section === section);
    }

    if (type && type !== "all") {
      items = items.filter((item) => item.type === type);
    }

    return res.json({ success: true, total: items.length, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// POST /api/gallery (Admin - Add media item)
router.post("/", authenticateToken, (req, res) => {
  try {
    const {
      title,
      section,
      category,
      type,
      imageUrl,
      videoDuration,
      videoUrl,
      date,
      location,
      description,
      featured
    } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "عنوان اور تصویر کا انتخاب لازمی ہے۔"
      });
    }

    const newItem = {
      id: "gal-" + Date.now().toString(36),
      title: title.trim(),
      section: section || "campus", // campus, library, activities, picnic, celebrations
      category: category || "عام",
      type: type || "image", // image, video
      imageUrl: imageUrl.trim(),
      videoDuration: videoDuration || "",
      videoUrl: videoUrl || "",
      date: date || "",
      location: location || "",
      description: description || "",
      featured: Boolean(featured),
      createdAt: new Date().toISOString()
    };

    const saved = db.gallery.insert(newItem);
    return res.status(201).json({
      success: true,
      message: "گیلری آئٹم کامیابی سے شامل ہو گیا",
      data: saved
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/gallery/:id (Admin - Update media item)
router.put("/:id", authenticateToken, (req, res) => {
  try {
    const item = db.gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "آئٹم نہیں ملا" });
    }

    const updates = { ...req.body };
    delete updates.id;
    if (updates.featured !== undefined) updates.featured = Boolean(updates.featured);

    const updated = db.gallery.update(req.params.id, updates);
    return res.json({
      success: true,
      message: "گیلری تفصیلات اپ ڈیٹ ہو گئیں",
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// DELETE /api/gallery/:id (Admin - Delete)
router.delete("/:id", authenticateToken, (req, res) => {
  try {
    const deleted = db.gallery.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "آئٹم نہیں ملا" });
    }
    return res.json({ success: true, message: "گیلری سے کامیابی سے حذف کر دیا گیا" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

export default router;
