import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// GET /api/stats/dashboard (Admin - Comprehensive Dashboard Analytics)
router.get("/dashboard", authenticateToken, (req, res) => {
  try {
    const admissions = db.admissions.find();
    const books = db.books.find();
    const staff = db.staff.find();
    const gallery = db.gallery.find();
    const bookRequests = db.bookRequests.find();
    const bookDonations = db.bookDonations.find();
    const donorSubmissions = db.donorSubmissions.find();

    const pendingAdmissions = admissions.filter((a) => a.status === "pending").length;
    const approvedAdmissions = admissions.filter((a) => a.status === "approved").length;
    const interviewAdmissions = admissions.filter((a) => a.status === "interview_scheduled").length;

    const pendingRequests = bookRequests.filter((r) => r.status === "pending").length;
    const pendingDonations = bookDonations.filter((d) => d.status === "pending").length;

    // Calculate verified donations total
    const verifiedDonorSubmissions = donorSubmissions.filter((d) => d.status === "verified");
    const totalDonationAmount = verifiedDonorSubmissions.reduce((sum, item) => {
      const cleanNum = Number(String(item.amount).replace(/[^0-9.-]+/g, "")) || 0;
      return sum + cleanNum;
    }, 0);

    // Recent 5 admissions
    const recentAdmissions = admissions.slice(0, 5);

    // Recent 5 book requests
    const recentRequests = bookRequests.slice(0, 5);

    return res.json({
      success: true,
      stats: {
        admissions: {
          total: admissions.length,
          pending: pendingAdmissions,
          approved: approvedAdmissions,
          interview: interviewAdmissions
        },
        books: {
          total: books.length
        },
        staff: {
          total: staff.length
        },
        gallery: {
          total: gallery.length
        },
        bookRequests: {
          total: bookRequests.length,
          pending: pendingRequests
        },
        bookDonations: {
          total: bookDonations.length,
          pending: pendingDonations
        },
        donations: {
          totalSubmissions: donorSubmissions.length,
          verifiedTotalAmount: totalDonationAmount
        }
      },
      recentAdmissions,
      recentRequests
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

export default router;
