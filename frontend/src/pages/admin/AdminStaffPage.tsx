import React, { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Trash2,
  Edit,
  Mail,
  Phone,
  GraduationCap,
  Award,
  X,
  CheckCircle2,
  Clock
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { api } from "@/services/api";

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    category: "faculty",
    department: "",
    qualification: "",
    experience: "",
    image: "/images/layout/avatar1.jpg",
    email: "",
    phone: "",
    isOnlineActive: true,
    order: 10
  });
  const [saving, setSaving] = useState(false);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await api.staff.getAll();
      if (res.success) {
        setStaffList(res.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const filteredStaff = staffList.filter((s) => {
    if (selectedCategory === "all") return true;
    return s.category === selectedCategory;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      title: "",
      category: "faculty",
      department: "",
      qualification: "",
      experience: "",
      image: "/images/layout/avatar1.jpg",
      email: "",
      phone: "",
      isOnlineActive: true,
      order: (staffList.length + 1) * 2
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (staff: any) => {
    setEditingId(staff.id);
    setFormData({
      name: staff.name,
      title: staff.title,
      category: staff.category || "faculty",
      department: staff.department || "",
      qualification: staff.qualification || "",
      experience: staff.experience || "",
      image: staff.image || "/images/layout/avatar1.jpg",
      email: staff.email || "",
      phone: staff.phone || "",
      isOnlineActive: staff.isOnlineActive ?? true,
      order: staff.order || 10
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingId) {
        await api.staff.update(editingId, formData);
      } else {
        await api.staff.create(formData);
      }
      await fetchStaff();
      setIsModalOpen(false);
    } catch (err: any) {
      alert("محفوظ کرنے میں خرابی: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`کیا آپ واقعی "${name}" کو فہرست سے حذف کرنا چاہتے ہیں؟`)) return;
    try {
      await api.staff.delete(id);
      await fetchStaff();
    } catch (err: any) {
      alert("حذف کرنے میں خرابی: " + err.message);
    }
  };

  return (
    <div className="flex-1 pb-16 font-urdu" dir="rtl">
      <AdminHeader
        title="شعبہ اساتذہ و انتظامی عملہ"
        subtitle="حوزوی، قرآنی اور عصری علوم کے اساتذہ کرام کا پروفائل منیجمنٹ"
      >
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-xs font-bold hover:brightness-105 shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>نیا استاد / عملہ شامل کریں</span>
        </button>
      </AdminHeader>

      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-[#1C1009] border border-[#C9B38D]/20">
          {[
            { id: "all", label: "تمام عملہ و اساتذہ" },
            { id: "leadership", label: "قیادت و سرپرستی" },
            { id: "faculty", label: "اساتذہ درسِ نظامی و عصری" },
            { id: "quran", label: "اساتذہ شعبہ حفظ و تجوید" },
            { id: "admin", label: "شعبہ انتظامیہ" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat.id
                  ? "bg-[#C9B38D] text-[#120A05] shadow"
                  : "bg-[#25150C] text-stone-300 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              className="bg-[#1C1009] border border-[#C9B38D]/25 rounded-2xl p-5 flex flex-col justify-between hover:border-[#C9B38D]/60 transition shadow-lg relative group"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C9B38D] bg-[#24150D] shrink-0 shadow-[0_0_15px_rgba(201,179,141,0.3)]">
                    <img
                      src={staff.image || "/images/layout/avatar1.jpg"}
                      alt={staff.name}
                      className="object-cover w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[10px] bg-[#C9B38D]/20 text-[#C9B38D] px-2 py-0.5 rounded mb-1">
                      {staff.category === "leadership"
                        ? "قیادت"
                        : staff.category === "quran"
                        ? "دار القرآن"
                        : staff.category === "admin"
                        ? "انتظامیہ"
                        : "حوزوی تدریس"}
                    </span>
                    <h4 className="text-base font-bold text-white leading-tight">
                      {staff.name}
                    </h4>
                    <p className="text-xs text-[#C9B38D] mt-0.5">
                      {staff.title}
                    </p>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      {staff.department}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-stone-300 bg-[#24150D] p-3 rounded-xl mb-4 border border-white/5">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-[#C9B38D] shrink-0" />
                    <span className="line-clamp-1">{staff.qualification}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-[#C9B38D] shrink-0" />
                    <span>{staff.experience}</span>
                  </div>
                  {staff.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#C9B38D] shrink-0" />
                      <span className="font-mono" dir="ltr">{staff.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-400 font-mono">
                  ترتیب: #{staff.order}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(staff)}
                    className="p-1.5 rounded-lg bg-[#25150C] hover:bg-[#C9B38D] text-stone-300 hover:text-[#120A05] border border-[#C9B38D]/25 transition"
                    title="ترمیم کریں"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(staff.id, staff.name)}
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

      {/* Staff Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#1C1009] border-2 border-[#C9B38D]/40 rounded-3xl w-full max-w-xl my-6 p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 left-5 p-2 rounded-full bg-white/10 text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-6 text-center">
              {editingId ? "استاد / عملہ کی تفصیلات میں ترمیم" : "نئے استاد / عملہ کا اندراج"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">نام گرامی *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">عہدہ / منصب *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">زمرہ (Category)</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  >
                    <option value="leadership">قیادت و سرپرستی</option>
                    <option value="faculty">اساتذہ درسِ نظامی و عصری</option>
                    <option value="quran">اساتذہ شعبہ حفظ و تجوید</option>
                    <option value="admin">شعبہ انتظامیہ</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">شعبہ / ڈیپارٹمنٹ</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-200 mb-1">علمی اسناد و قابلیت</label>
                <input
                  type="text"
                  placeholder="فاضل حوزہ علمیہ قم، درسِ خارج و اصول"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">تدریسی تجربہ</label>
                  <input
                    type="text"
                    placeholder="۱۵ سالہ تدریسی تجربہ"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">تصویر (Image URL)</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">فون نمبر (اختیاری)</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">ای میل (اختیاری)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-stone-300 hover:bg-white/10"
                >
                  منسوخ کریں
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-[#C9B38D] text-[#120A05] font-bold hover:bg-[#D9C7A7]"
                >
                  {saving ? "محفوظ ہو رہا ہے..." : "محفوظ کریں"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
