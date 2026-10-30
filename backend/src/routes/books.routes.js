import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// GET /api/books (Public - Filter by category, language, search)
router.get("/", (req, res) => {
  try {
    const { category, language, search } = req.query;

    let books = db.books.find();

    if (category && category !== "تمام کتب" && category !== "all") {
      books = books.filter((b) => b.category === category);
    }

    if (language && language !== "سب زبانیں" && language !== "all") {
      books = books.filter((b) => b.language && b.language.includes(language));
    }

    if (search && search.trim() !== "") {
      const q = search.trim().toLowerCase();
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          (b.description && b.description.toLowerCase().includes(q))
      );
    }

    return res.json({
      success: true,
      total: books.length,
      data: books
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// GET /api/books/categories/list (Public - Dynamic categories with counts)
router.get("/categories/list", (req, res) => {
  try {
    const books = db.books.find();
    const map = {};

    books.forEach((b) => {
      const cat = b.category || "متفرق کتب";
      map[cat] = (map[cat] || 0) + 1;
    });

    const categories = [
      { name: "تمام کتب", count: books.length },
      ...Object.keys(map).map((k) => ({ name: k, count: map[k] }))
    ];

    return res.json({ success: true, categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// GET /api/books/:id (Public - Single book)
router.get("/:id", (req, res) => {
  try {
    const book = db.books.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: "کتاب نہیں ملی" });
    }
    return res.json({ success: true, data: book });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// POST /api/books (Admin - Add book)
router.post("/", authenticateToken, (req, res) => {
  try {
    const {
      title,
      author,
      category,
      language,
      coverImage,
      volumes,
      pages,
      shelfCode,
      isDigitalAvailable,
      pdfUrl,
      isReferenceOnly,
      isManuscript,
      description,
      highlights
    } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        success: false,
        message: "کتاب کا نام اور مصنف کا نام درج کرنا لازمی ہے۔"
      });
    }

    const newBook = {
      id: "book-" + Date.now().toString(36),
      title: title.trim(),
      author: author.trim(),
      category: category || "متفرق کتب",
      language: language || "اردو",
      coverImage: coverImage || "/images/books/book-1.jpg",
      volumes: volumes || "۱ جلد",
      pages: Number(pages) || 0,
      shelfCode: shelfCode || "عام ذخیرہ",
      isDigitalAvailable: Boolean(isDigitalAvailable),
      pdfUrl: pdfUrl || "",
      isReferenceOnly: Boolean(isReferenceOnly),
      isManuscript: Boolean(isManuscript),
      description: description || "",
      highlights: Array.isArray(highlights)
        ? highlights
        : highlights
        ? String(highlights).split(",").map((s) => s.trim())
        : [],
      createdAt: new Date().toISOString()
    };

    const saved = db.books.insert(newBook);
    return res.status(201).json({
      success: true,
      message: "کتاب کامیابی سے شامل کر دی گئی",
      data: saved
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/books/:id (Admin - Update book)
router.put("/:id", authenticateToken, (req, res) => {
  try {
    const book = db.books.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: "کتاب نہیں ملی" });
    }

    const updates = { ...req.body };
    delete updates.id;
    if (updates.highlights && typeof updates.highlights === "string") {
      updates.highlights = updates.highlights.split(",").map((s) => s.trim());
    }

    const updated = db.books.update(req.params.id, updates);
    return res.json({
      success: true,
      message: "کتاب کی تفصیلات اپ ڈیٹ ہو گئیں",
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// DELETE /api/books/:id (Admin - Delete book)
router.delete("/:id", authenticateToken, (req, res) => {
  try {
    const success = db.books.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: "کتاب نہیں ملی" });
    }
    return res.json({ success: true, message: "کتاب کامیابی سے حذف کر دی گئی" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

export default router;
