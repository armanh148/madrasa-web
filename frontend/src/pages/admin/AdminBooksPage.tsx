import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  HelpCircle,
  X,
  HeartHandshake,
  BookmarkCheck,
  FileText
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { api } from "@/services/api";

export default function AdminBooksPage() {
  const [activeTab, setActiveTab] = useState<"catalog" | "requests" | "donations">("catalog");

  // Books Catalog State
  const [books, setBooks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal State for Add / Edit Book
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    category: "علومِ قرآن و تفاسیر",
    language: "عربی / اردو",
    coverImage: "/images/books/book-1.jpg",
    volumes: "۱ جلد",
    pages: 350,
    shelfCode: "رف ۰۱ - الماری الف",
    isDigitalAvailable: true,
    pdfUrl: "",
    isReferenceOnly: false,
    description: "",
    highlights: ""
  });
  const [savingBook, setSavingBook] = useState(false);

  // Requests and Donations State
  const [requests, setRequests] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await api.books.getAll();
      if (res.success) {
        setBooks(res.data || []);
      }
      const catRes = await api.books.getCategories();
      if (catRes.success) {
        setCategories(catRes.categories || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await api.bookRequests.getAllRequests();
      if (res.success) setRequests(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDonations = async () => {
    try {
      const res = await api.bookRequests.getAllDonations();
      if (res.success) setDonations(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchRequests();
    fetchDonations();
  }, []);

  // Filter books
  const filteredBooks = books.filter((b) => {
    const matchesCat = selectedCategory === "all" || b.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleOpenAddBook = () => {
    setEditingBookId(null);
    setBookForm({
      title: "",
      author: "",
      category: "علومِ قرآن و تفاسیر",
      language: "عربی / اردو",
      coverImage: "/images/books/book-1.jpg",
      volumes: "۱ جلد",
      pages: 350,
      shelfCode: "رف ۰۱ - الماری الف",
      isDigitalAvailable: true,
      pdfUrl: "",
      isReferenceOnly: false,
      description: "",
      highlights: ""
    });
    setIsBookModalOpen(true);
  };

  const handleOpenEditBook = (book: any) => {
    setEditingBookId(book.id);
    setBookForm({
      title: book.title,
      author: book.author,
      category: book.category,
      language: book.language,
      coverImage: book.coverImage || "/images/books/book-1.jpg",
      volumes: book.volumes || "۱ جلد",
      pages: book.pages || 0,
      shelfCode: book.shelfCode || "",
      isDigitalAvailable: book.isDigitalAvailable ?? true,
      pdfUrl: book.pdfUrl || "",
      isReferenceOnly: book.isReferenceOnly ?? false,
      description: book.description || "",
      highlights: Array.isArray(book.highlights) ? book.highlights.join(", ") : (book.highlights || "")
    });
    setIsBookModalOpen(true);
  };

  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingBook(true);
      if (editingBookId) {
        await api.books.update(editingBookId, bookForm);
      } else {
        await api.books.create(bookForm);
      }
      await fetchBooks();
      setIsBookModalOpen(false);
    } catch (err: any) {
      alert("کتاب محفوظ کرنے میں خرابی: " + err.message);
    } finally {
      setSavingBook(false);
    }
  };

  const handleDeleteBook = async (id: string, title: string) => {
    if (!confirm(`کیا آپ واقعی "${title}" کو حذف کرنا چاہتے ہیں؟`)) return;
    try {
      await api.books.delete(id);
      await fetchBooks();
    } catch (err: any) {
      alert("حذف کرنے میں خرابی: " + err.message);
    }
  };

  const handleUpdateRequestStatus = async (id: string, status: string) => {
    try {
      await api.bookRequests.updateRequest(id, { status });
      await fetchRequests();
    } catch (err: any) {
      alert("خرابی: " + err.message);
    }
  };

  const handleDeleteRequest = async (id: string) => {
    if (!confirm("کیا آپ واقعی اس فرمائش کو حذف کرنا چاہتے ہیں؟")) return;
    try {
      await api.bookRequests.deleteRequest(id);
      await fetchRequests();
    } catch (err: any) {
      alert("خرابی: " + err.message);
    }
  };

  const handleUpdateDonationStatus = async (id: string, status: string) => {
    try {
      await api.bookRequests.updateDonation(id, { status });
      await fetchDonations();
    } catch (err: any) {
      alert("خرابی: " + err.message);
    }
  };

  const handleDeleteDonation = async (id: string) => {
    if (!confirm("کیا آپ واقعی اس ریکارڈ کو حذف کرنا چاہتے ہیں؟")) return;
    try {
      await api.bookRequests.deleteDonation(id);
      await fetchDonations();
    } catch (err: any) {
      alert("خرابی: " + err.message);
    }
  };

  return (
    <div className="flex-1 pb-16 font-urdu" dir="rtl">
      <AdminHeader
        title="کتب خانہ و لائبریری پورٹل"
        subtitle="کتب کا ذخیرہ، درجہ بندی، طلبہ کی فرمائشیں اور عطیہ کتب کا انتظام"
      >
        <button
          onClick={handleOpenAddBook}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-xs font-bold hover:brightness-105 shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>نئی کتاب شامل کریں</span>
        </button>
      </AdminHeader>

      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#C9B38D]/20 pb-3">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "catalog"
                ? "bg-[#C9B38D] text-[#120A05]"
                : "text-stone-300 hover:text-white bg-[#22130B]"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>کتب کی فہرست ({books.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("requests")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "requests"
                ? "bg-[#C9B38D] text-[#120A05]"
                : "text-stone-300 hover:text-white bg-[#22130B]"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>طلبہ کی فرمائشیں ({requests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("donations")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "donations"
                ? "bg-[#C9B38D] text-[#120A05]"
                : "text-stone-300 hover:text-white bg-[#22130B]"
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>عطیاتِ کتب ({donations.length})</span>
          </button>
        </div>

        {/* TAB 1: CATALOG */}
        {activeTab === "catalog" && (
          <div className="space-y-6">
            {/* Search and Category Filters */}
            <div className="p-4 rounded-2xl bg-[#1C1009] border border-[#C9B38D]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    selectedCategory === "all"
                      ? "bg-[#C9B38D] text-[#120A05]"
                      : "bg-[#25150C] text-stone-300 hover:text-white"
                  }`}
                >
                  تمام کتب ({books.length})
                </button>
                {categories.filter((c) => c.name !== "تمام کتب").map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      selectedCategory === cat.name
                        ? "bg-[#C9B38D] text-[#120A05]"
                        : "bg-[#25150C] text-stone-300 hover:text-white"
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="کتاب یا مصنف تلاش کریں..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-1.5 pr-9 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white text-xs focus:outline-none focus:border-[#C9B38D]"
                />
                <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-[#1C1009] border border-[#C9B38D]/25 rounded-2xl p-4 flex flex-col justify-between hover:border-[#C9B38D]/60 transition shadow-lg group"
                >
                  <div>
                    <div className="flex gap-3 mb-3">
                      <div className="relative w-20 h-28 rounded-xl overflow-hidden bg-[#24150D] border border-[#C9B38D]/30 shrink-0">
                        <img
                          src={book.coverImage || "/images/books/book-1.jpg"}
                          alt={book.title}
                          className="object-cover group-hover:scale-105 transition w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-[10px] bg-[#C9B38D]/20 text-[#C9B38D] px-2 py-0.5 rounded mb-1">
                          {book.category}
                        </span>
                        <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                          {book.title}
                        </h4>
                        <p className="text-xs text-stone-400 mt-1 line-clamp-1">
                          {book.author}
                        </p>
                        <span className="text-[11px] text-[#C9B38D]/80 block mt-1 font-mono">
                          {book.shelfCode}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed mb-3">
                      {book.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-stone-400">
                      {book.volumes || "۱ جلد"} ({book.pages} صفحات)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditBook(book)}
                        className="p-1.5 rounded-lg bg-[#25150C] hover:bg-[#C9B38D] text-stone-300 hover:text-[#120A05] border border-[#C9B38D]/25 transition"
                        title="ترمیم کریں"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book.id, book.title)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition"
                        title="حذف کریں"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: REQUESTS */}
        {activeTab === "requests" && (
          <div className="rounded-2xl bg-[#1C1009] border border-[#C9B38D]/25 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs sm:text-sm">
                <thead className="bg-[#24150D] text-[#C9B38D] text-xs font-bold border-b border-[#C9B38D]/20">
                  <tr>
                    <th className="p-3.5">سائل کا نام</th>
                    <th className="p-3.5">فون نمبر</th>
                    <th className="p-3.5">مطلوبہ کتاب</th>
                    <th className="p-3.5">مصنف کا نام</th>
                    <th className="p-3.5">تحقیقی مقصد</th>
                    <th className="p-3.5">نوٹس</th>
                    <th className="p-3.5">کیفیت</th>
                    <th className="p-3.5 text-center">ایکشن</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-stone-200">
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-stone-400">
                        کوئی فرمائش موصول نہیں ہوئی۔
                      </td>
                    </tr>
                  ) : (
                    requests.map((req) => (
                      <tr key={req.id} className="hover:bg-white/[0.02]">
                        <td className="p-3.5 font-bold text-white">{req.name}</td>
                        <td className="p-3.5 font-mono text-stone-300" dir="ltr">{req.phone}</td>
                        <td className="p-3.5 font-bold text-[#C9B38D]">{req.bookName}</td>
                        <td className="p-3.5 text-stone-300">{req.authorName || "-"}</td>
                        <td className="p-3.5 text-stone-300">{req.purpose}</td>
                        <td className="p-3.5 text-stone-400 max-w-xs truncate">{req.notes || "-"}</td>
                        <td className="p-3.5">
                          <select
                            value={req.status}
                            onChange={(e) => handleUpdateRequestStatus(req.id, e.target.value)}
                            className="bg-[#24150D] border border-[#C9B38D]/30 rounded-lg px-2 py-1 text-xs text-white"
                          >
                            <option value="pending">زیرِ تلاش (Pending)</option>
                            <option value="available">دستیاب ہے (Available)</option>
                            <option value="unavailable">نایاب / فی الوقت عدم دستیاب</option>
                            <option value="fulfilled">فراہم کر دی گئی (Fulfilled)</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => handleDeleteRequest(req.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DONATIONS */}
        {activeTab === "donations" && (
          <div className="rounded-2xl bg-[#1C1009] border border-[#C9B38D]/25 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs sm:text-sm">
                <thead className="bg-[#24150D] text-[#C9B38D] text-xs font-bold border-b border-[#C9B38D]/20">
                  <tr>
                    <th className="p-3.5">عطیہ کنندہ کا نام</th>
                    <th className="p-3.5">رابطہ نمبر</th>
                    <th className="p-3.5">شہر</th>
                    <th className="p-3.5">تعداد کتب</th>
                    <th className="p-3.5">موضوع / تفاصیل</th>
                    <th className="p-3.5">پیغام</th>
                    <th className="p-3.5">کیفیت</th>
                    <th className="p-3.5 text-center">ایکشن</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-stone-200">
                  {donations.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-stone-400">
                        کوئی عطیہ کتب کا ریکارڈ موجود نہیں ہے۔
                      </td>
                    </tr>
                  ) : (
                    donations.map((don) => (
                      <tr key={don.id} className="hover:bg-white/[0.02]">
                        <td className="p-3.5 font-bold text-white">{don.name}</td>
                        <td className="p-3.5 font-mono text-stone-300" dir="ltr">{don.phone}</td>
                        <td className="p-3.5 text-stone-300">{don.city || "-"}</td>
                        <td className="p-3.5 text-[#C9B38D] font-bold">{don.bookCount}</td>
                        <td className="p-3.5 text-stone-300">{don.topic}</td>
                        <td className="p-3.5 text-stone-400 max-w-xs truncate">{don.message || "-"}</td>
                        <td className="p-3.5">
                          <select
                            value={don.status}
                            onChange={(e) => handleUpdateDonationStatus(don.id, e.target.value)}
                            className="bg-[#24150D] border border-[#C9B38D]/30 rounded-lg px-2 py-1 text-xs text-white"
                          >
                            <option value="pending">نیا موصولہ (Pending)</option>
                            <option value="contacted">رابطہ کر لیا گیا (Contacted)</option>
                            <option value="received">کتب موصول ہو گئیں (Received)</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => handleDeleteDonation(don.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Book Add / Edit Modal */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#1C1009] border-2 border-[#C9B38D]/40 rounded-3xl w-full max-w-2xl my-6 p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsBookModalOpen(false)}
              className="absolute top-5 left-5 p-2 rounded-full bg-white/10 text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-6 text-center">
              {editingBookId ? "کتاب کی تفصیلات میں ترمیم" : "نئی کتاب کا اندراج"}
            </h3>

            <form onSubmit={handleSaveBook} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">کتاب کا عنوان *</label>
                  <input
                    type="text"
                    required
                    value={bookForm.title}
                    onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">مصنف / مؤلف *</label>
                  <input
                    type="text"
                    required
                    value={bookForm.author}
                    onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">شعبہ / درجہ بندی</label>
                  <select
                    value={bookForm.category}
                    onChange={(e) => setBookForm({ ...bookForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  >
                    <option value="علومِ قرآن و تفاسیر">علومِ قرآن و تفاسیر</option>
                    <option value="حدیث و روایات">حدیث و روایات</option>
                    <option value="فقہ و احکام">فقہ و احکام</option>
                    <option value="تاریخ و سوانح">تاریخ و سوانح</option>
                    <option value="کلام و فلسفہ">کلام و فلسفہ</option>
                    <option value="اخلاق و عرفان">اخلاق و عرفان</option>
                    <option value="عصری کتب و لغت">عصری کتب و لغت</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">زبان</label>
                  <input
                    type="text"
                    value={bookForm.language}
                    onChange={(e) => setBookForm({ ...bookForm, language: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">رف / شیلف کوڈ</label>
                  <input
                    type="text"
                    value={bookForm.shelfCode}
                    onChange={(e) => setBookForm({ ...bookForm, shelfCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">جلدیں</label>
                  <input
                    type="text"
                    value={bookForm.volumes}
                    onChange={(e) => setBookForm({ ...bookForm, volumes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">صفحات کی تعداد</label>
                  <input
                    type="number"
                    value={bookForm.pages}
                    onChange={(e) => setBookForm({ ...bookForm, pages: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">سرورق تصویر (Image URL)</label>
                  <input
                    type="text"
                    value={bookForm.coverImage}
                    onChange={(e) => setBookForm({ ...bookForm, coverImage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-200 mb-1">مختصر تعارف / خلاصہ</label>
                <textarea
                  rows={3}
                  value={bookForm.description}
                  onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-200 mb-1">اہم خصوصیات (کوما سے الگ کریں)</label>
                <input
                  type="text"
                  placeholder="مستند نسخہ، اردو شرح، تحقیق"
                  value={bookForm.highlights}
                  onChange={(e) => setBookForm({ ...bookForm, highlights: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookForm.isDigitalAvailable}
                    onChange={(e) => setBookForm({ ...bookForm, isDigitalAvailable: e.target.checked })}
                    className="rounded text-[#C9B38D]"
                  />
                  <span>ڈیجیٹل نسخہ دستیاب ہے</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookForm.isReferenceOnly}
                    onChange={(e) => setBookForm({ ...bookForm, isReferenceOnly: e.target.checked })}
                    className="rounded text-[#C9B38D]"
                  />
                  <span>صرف ریفرنس (مطالعہ برائے لائبریری)</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-stone-300 hover:bg-white/10"
                >
                  منسوخ کریں
                </button>
                <button
                  type="submit"
                  disabled={savingBook}
                  className="px-6 py-2 rounded-xl bg-[#C9B38D] text-[#120A05] font-bold hover:bg-[#D9C7A7]"
                >
                  {savingBook ? "محفوظ ہو رہا ہے..." : "محفوظ کریں"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
