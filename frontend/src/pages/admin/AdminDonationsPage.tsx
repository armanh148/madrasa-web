import React, { useState, useEffect } from "react";
import {
  HeartHandshake,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  CreditCard,
  Building,
  Eye,
  X,
  FileCheck,
  Clock
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { api } from "@/services/api";

export default function AdminDonationsPage() {
  const [activeTab, setActiveTab] = useState<"accounts" | "submissions">("accounts");

  // Bank Accounts
  const [accounts, setAccounts] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Account
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [editingAccountId, setEditingAccountId] = useState<string | null>(null);
  const [accountForm, setAccountForm] = useState({
    bankName: "",
    accountTitle: "Madarsa e Sahib uz Zaman Trust",
    accountNumber: "",
    iban: "",
    branch: "",
    swiftCode: "",
    purpose: "سہمِ امامؑ، سہمِ سادات، دسترخوان اور امدادِ طلباء"
  });
  const [savingAccount, setSavingAccount] = useState(false);

  const fetchAccounts = async () => {
    try {
      const res = await api.donations.getAccounts();
      if (res.success) setAccounts(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await api.donations.getSubmissions();
      if (res.success) setSubmissions(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchAccounts(), fetchSubmissions()]).finally(() => setLoading(false));
  }, []);

  const handleOpenAddAccount = () => {
    setEditingAccountId(null);
    setAccountForm({
      bankName: "",
      accountTitle: "Madarsa e Sahib uz Zaman Trust",
      accountNumber: "",
      iban: "",
      branch: "",
      swiftCode: "",
      purpose: "سہمِ امامؑ، سہمِ سادات، دسترخوان اور امدادِ طلباء"
    });
    setIsAccountModalOpen(true);
  };

  const handleOpenEditAccount = (acc: any) => {
    setEditingAccountId(acc.id);
    setAccountForm({
      bankName: acc.bankName,
      accountTitle: acc.accountTitle,
      accountNumber: acc.accountNumber,
      iban: acc.iban || "",
      branch: acc.branch || "",
      swiftCode: acc.swiftCode || "",
      purpose: acc.purpose || ""
    });
    setIsAccountModalOpen(true);
  };

  const handleSaveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingAccount(true);
      if (editingAccountId) {
        await api.donations.updateAccount(editingAccountId, accountForm);
      } else {
        await api.donations.addAccount(accountForm);
      }
      await fetchAccounts();
      setIsAccountModalOpen(false);
    } catch (err: any) {
      alert("خرابی: " + err.message);
    } finally {
      setSavingAccount(false);
    }
  };

  const handleDeleteAccount = async (id: string, name: string) => {
    if (!confirm(`کیا آپ واقعی "${name}" کو حذف کرنا چاہتے ہیں؟`)) return;
    try {
      await api.donations.deleteAccount(id);
      await fetchAccounts();
    } catch (err: any) {
      alert("خرابی: " + err.message);
    }
  };

  const handleUpdateSubmissionStatus = async (id: string, status: string) => {
    try {
      await api.donations.updateSubmission(id, { status });
      await fetchSubmissions();
    } catch (err: any) {
      alert("خرابی: " + err.message);
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (!confirm("کیا آپ واقعی اس ریکارڈ کو حذف کرنا چاہتے ہیں؟")) return;
    try {
      await api.donations.deleteSubmission(id);
      await fetchSubmissions();
    } catch (err: any) {
      alert("خرابی: " + err.message);
    }
  };

  return (
    <div className="flex-1 pb-16 font-urdu" dir="rtl">
      <AdminHeader
        title="شعبہ عطیات، صدقات و مالیات"
        subtitle="بینک اکاؤنٹس، ڈیجیٹل والٹس اور موصولہ رسیدوں کی تصدیق"
      >
        <button
          onClick={handleOpenAddAccount}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-xs font-bold hover:brightness-105 shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>نیا بینک اکاؤنٹ شامل کریں</span>
        </button>
      </AdminHeader>

      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#C9B38D]/20 pb-3">
          <button
            onClick={() => setActiveTab("accounts")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "accounts"
                ? "bg-[#C9B38D] text-[#120A05]"
                : "text-stone-300 hover:text-white bg-[#22130B]"
            }`}
          >
            <Building className="w-4 h-4" />
            <span>بینک اکاؤنٹس ({accounts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("submissions")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "submissions"
                ? "bg-[#C9B38D] text-[#120A05]"
                : "text-stone-300 hover:text-white bg-[#22130B]"
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>موصولہ رسیدیں و ادائیگیاں ({submissions.length})</span>
          </button>
        </div>

        {/* TAB 1: BANK ACCOUNTS */}
        {activeTab === "accounts" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {accounts.map((acc) => (
              <div
                key={acc.id}
                className="bg-[#1C1009] border border-[#C9B38D]/30 rounded-2xl p-5 shadow-lg relative group hover:border-[#C9B38D]/60 transition"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <span className="text-[10px] bg-[#C9B38D]/20 text-[#C9B38D] px-2 py-0.5 rounded font-sans">
                      فعال اکاؤنٹ
                    </span>
                    <h4 className="text-base font-bold text-white mt-1">
                      {acc.bankName}
                    </h4>
                    <p className="text-xs text-stone-300 mt-0.5">
                      عنوان: <span className="font-semibold text-white">{acc.accountTitle}</span>
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 flex items-center justify-center text-[#C9B38D]">
                    <CreditCard className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 text-xs bg-[#24150D] p-3.5 rounded-xl border border-white/5 mb-4 font-mono">
                  <div className="flex justify-between items-center text-right">
                    <span className="text-stone-400 font-urdu text-[11px]">اکاؤنٹ نمبر:</span>
                    <span className="text-sm font-bold text-white tracking-wider" dir="ltr">{acc.accountNumber}</span>
                  </div>
                  {acc.iban && (
                    <div className="flex justify-between items-center text-right">
                      <span className="text-stone-400 font-urdu text-[11px]">IBAN:</span>
                      <span className="text-xs text-stone-200" dir="ltr">{acc.iban}</span>
                    </div>
                  )}
                  {acc.branch && (
                    <div className="flex justify-between items-center text-right">
                      <span className="text-stone-400 font-urdu text-[11px]">برانچ:</span>
                      <span className="text-xs text-stone-300 font-urdu">{acc.branch}</span>
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-stone-400 mb-4 font-urdu">
                  مقصد: <span className="text-stone-200">{acc.purpose}</span>
                </p>

                <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2 text-xs">
                  <button
                    onClick={() => handleOpenEditAccount(acc)}
                    className="p-1.5 rounded-lg bg-[#25150C] hover:bg-[#C9B38D] text-stone-300 hover:text-[#120A05] border border-[#C9B38D]/25 transition"
                    title="ترمیم کریں"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteAccount(acc.id, acc.bankName)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition"
                    title="حذف کریں"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: SUBMISSIONS */}
        {activeTab === "submissions" && (
          <div className="rounded-2xl bg-[#1C1009] border border-[#C9B38D]/25 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs sm:text-sm">
                <thead className="bg-[#24150D] text-[#C9B38D] text-xs font-bold border-b border-[#C9B38D]/20">
                  <tr>
                    <th className="p-3.5">رسید نمبر</th>
                    <th className="p-3.5">عطیہ کنندہ</th>
                    <th className="p-3.5">رقم (PKR)</th>
                    <th className="p-3.5">بینک / ذریعہ</th>
                    <th className="p-3.5">ٹرانزیکشن ID</th>
                    <th className="p-3.5">مد / مقصد</th>
                    <th className="p-3.5">کیفیت</th>
                    <th className="p-3.5 text-center">ایکشن</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-stone-200">
                  {submissions.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-stone-400">
                        کوئی رسید جمع نہیں ہوئی۔
                      </td>
                    </tr>
                  ) : (
                    submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-white/[0.02]">
                        <td className="p-3.5 font-mono text-[#C9B38D]">{sub.id}</td>
                        <td className="p-3.5 font-bold text-white">
                          {sub.donorName}
                          <span className="block text-[11px] font-mono text-stone-400" dir="ltr">{sub.phone}</span>
                        </td>
                        <td className="p-3.5 font-bold text-[#C9B38D] font-mono text-base">
                          Rs. {sub.amount}
                        </td>
                        <td className="p-3.5 text-stone-300">{sub.bankName}</td>
                        <td className="p-3.5 font-mono text-stone-300" dir="ltr">{sub.transactionId || "-"}</td>
                        <td className="p-3.5 text-stone-300">{sub.donationType}</td>
                        <td className="p-3.5">
                          <select
                            value={sub.status}
                            onChange={(e) => handleUpdateSubmissionStatus(sub.id, e.target.value)}
                            className="bg-[#24150D] border border-[#C9B38D]/30 rounded-lg px-2 py-1 text-xs text-white"
                          >
                            <option value="pending">زیرِ جائزہ (Pending)</option>
                            <option value="verified">تصدیق شدہ (Verified)</option>
                            <option value="rejected">مسترد (Rejected)</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
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

      {/* Account Add / Edit Modal */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#1C1009] border-2 border-[#C9B38D]/40 rounded-3xl w-full max-w-lg my-6 p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsAccountModalOpen(false)}
              className="absolute top-5 left-5 p-2 rounded-full bg-white/10 text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-6 text-center">
              {editingAccountId ? "بینک اکاؤنٹ میں ترمیم" : "نیا بینک اکاؤنٹ شامل کریں"}
            </h3>

            <form onSubmit={handleSaveAccount} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-200 mb-1">بینک / والٹ کا نام *</label>
                <input
                  type="text"
                  required
                  placeholder="میزان بینک / جاز کیش / ایزی پیسہ"
                  value={accountForm.bankName}
                  onChange={(e) => setAccountForm({ ...accountForm, bankName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-200 mb-1">اکاؤنٹ ٹائٹل (Title) *</label>
                <input
                  type="text"
                  required
                  value={accountForm.accountTitle}
                  onChange={(e) => setAccountForm({ ...accountForm, accountTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">اکاؤنٹ نمبر *</label>
                  <input
                    type="text"
                    required
                    value={accountForm.accountNumber}
                    onChange={(e) => setAccountForm({ ...accountForm, accountNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">IBAN نمبر</label>
                  <input
                    type="text"
                    value={accountForm.iban}
                    onChange={(e) => setAccountForm({ ...accountForm, iban: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">برانچ کا نام / کوڈ</label>
                  <input
                    type="text"
                    value={accountForm.branch}
                    onChange={(e) => setAccountForm({ ...accountForm, branch: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">سوئفٹ کوڈ (بین الاقوامی)</label>
                  <input
                    type="text"
                    value={accountForm.swiftCode}
                    onChange={(e) => setAccountForm({ ...accountForm, swiftCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-200 mb-1">عطیہ کی مد / مقصد</label>
                <input
                  type="text"
                  value={accountForm.purpose}
                  onChange={(e) => setAccountForm({ ...accountForm, purpose: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAccountModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-stone-300 hover:bg-white/10"
                >
                  منسوخ کریں
                </button>
                <button
                  type="submit"
                  disabled={savingAccount}
                  className="px-6 py-2 rounded-xl bg-[#C9B38D] text-[#120A05] font-bold hover:bg-[#D9C7A7]"
                >
                  {savingAccount ? "محفوظ ہو رہا ہے..." : "محفوظ کریں"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
