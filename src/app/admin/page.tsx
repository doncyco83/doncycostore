"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";
import { Disc, Music, Plus, LogOut, ArrowRight, Settings, Phone, MapPin, Eye, AlertCircle, Save, Check } from "lucide-react";

function DashboardContent() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    availableProducts: 0,
    totalBlogs: 0,
  });
  const [storeSettings, setStoreSettings] = useState({
    whatsapp_number: "",
    google_maps_url: "",
    instagram_username: "",
    tiktok_username: "",
  });
  
  const [loadingStats, setLoadingStats] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [settingsError, setSettingsError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchStats();
    fetchStoreSettings();
  }, []);

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      
      // 1. Total Products
      const { count: totalCount, error: pError } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      // 2. Available Products
      const { count: availableCount, error: aError } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("is_available", true);

      // 3. Total Blogs
      const { count: blogCount, error: bError } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true });

      if (!pError && !aError && !bError) {
        setStats({
          totalProducts: totalCount || 0,
          availableProducts: availableCount || 0,
          totalBlogs: blogCount || 0,
        });
      }
    } catch (err) {
      console.error("Failed to load dashboard stats:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchStoreSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("store_settings")
        .select("*")
        .single();
      
      if (data && !error) {
        setStoreSettings({
          whatsapp_number: data.whatsapp_number || "",
          google_maps_url: data.google_maps_url || "",
          instagram_username: data.instagram_username || "",
          tiktok_username: data.tiktok_username || "",
        });
      }
    } catch (err) {
      console.error("Failed to load store settings:", err);
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSuccess(false);
    setSettingsError("");

    try {
      // Since store_settings is a singleton, it uses a fixed ID '00000000-0000-0000-0000-000000000001'
      const { error } = await supabase
        .from("store_settings")
        .upsert({
          id: "00000000-0000-0000-0000-000000000001",
          whatsapp_number: storeSettings.whatsapp_number,
          google_maps_url: storeSettings.google_maps_url,
          instagram_username: storeSettings.instagram_username,
          tiktok_username: storeSettings.tiktok_username,
        });

      if (error) {
        setSettingsError(error.message || "Gagal memperbarui info toko.");
      } else {
        setSettingsSuccess(true);
        setTimeout(() => setSettingsSuccess(false), 3000);
      }
    } catch (err) {
      setSettingsError("Terjadi kesalahan sistem saat menyimpan.");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
      {/* 1. Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-8 mb-12">
        <div>
          <span className="text-xs font-semibold text-brand-neon uppercase tracking-widest">
            CMS Control Panel
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wider mt-1">
            Dashboard DonCyco
          </h1>
        </div>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:border-red-500/50 hover:text-red-400 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 self-start sm:self-center"
        >
          <LogOut size={16} /> Keluar (Sign Out)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Main Controls & Stats */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href="/admin/produk"
              className="glass-card p-8 rounded-2xl border border-white/10 flex flex-col justify-between h-[180px] hover:border-brand-magenta/40 hover:shadow-[0_8px_30px_rgb(183,19,113,0.15)] transition-all duration-300 group"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-brand-magenta/15 border border-brand-magenta/25 rounded-xl flex items-center justify-center">
                  <Disc size={24} className="text-brand-magenta" />
                </div>
                <span className="text-[10px] bg-brand-magenta text-white font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Katalog
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Kelola Produk</h3>
                <p className="text-xs text-white/50 mt-1">Tambah, edit, hapus, & upload gambar produk.</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-brand-neon font-bold uppercase tracking-widest pt-2 group-hover:translate-x-1.5 transition-transform">
                Masuk <ArrowRight size={12} />
              </div>
            </Link>

            <Link
              href="/admin/produk/tambah"
              className="glass-card p-8 rounded-2xl border border-white/10 flex flex-col justify-between h-[180px] hover:border-brand-neon/40 hover:shadow-[0_8px_30px_rgb(226,251,97,0.1)] transition-all duration-300 group"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-brand-neon/15 border border-brand-neon/25 rounded-xl flex items-center justify-center">
                  <Plus size={24} className="text-brand-neon" />
                </div>
                <span className="text-[10px] bg-brand-neon text-brand-dark font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Baru
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Tambah Produk</h3>
                <p className="text-xs text-white/50 mt-1">Masukkan koleksi rilisan fisik baru ke katalog.</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-brand-neon font-bold uppercase tracking-widest pt-2 group-hover:translate-x-1.5 transition-transform">
                Buka Form <ArrowRight size={12} />
              </div>
            </Link>
          </div>

          {/* Statistics Grid */}
          <div className="glass-card p-8 rounded-[24px] border border-white/10">
            <h3 className="font-display text-lg font-bold uppercase tracking-wider mb-6 border-b border-white/5 pb-4">
              Statistik Toko
            </h3>
            
            {loadingStats ? (
              <div className="py-8 text-center text-white/50 flex flex-col items-center gap-2">
                <Disc className="w-8 h-8 text-brand-magenta animate-spin-slow" />
                <p className="text-xs">Memuat data statistik...</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                  <span className="block text-3xl sm:text-4xl font-bold text-brand-neon font-display">
                    {stats.totalProducts}
                  </span>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold block mt-1">
                    Total Item
                  </span>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                  <span className="block text-3xl sm:text-4xl font-bold text-brand-cyan font-display">
                    {stats.availableProducts}
                  </span>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold block mt-1">
                    Tersedia
                  </span>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                  <span className="block text-3xl sm:text-4xl font-bold text-brand-magenta font-display">
                    {stats.totalBlogs}
                  </span>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold block mt-1">
                    Artikel Blog
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Store Settings CMS */}
        <div className="lg:col-span-4">
          <div className="glass-card p-8 rounded-[24px] border border-white/10 sticky top-24">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <Settings size={20} className="text-brand-cyan animate-pulse" />
              <h3 className="font-display text-lg font-bold uppercase tracking-wider">
                Pengaturan Toko
              </h3>
            </div>

            {settingsError && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 text-xs flex items-start gap-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p className="font-body leading-relaxed">{settingsError}</p>
              </div>
            )}

            <form onSubmit={handleUpdateSettings} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-white/60 flex items-center gap-1.5">
                  <Phone size={12} className="text-brand-neon" /> No. WhatsApp
                </label>
                <input
                  type="text"
                  required
                  value={storeSettings.whatsapp_number}
                  onChange={(e) => setStoreSettings({ ...storeSettings, whatsapp_number: e.target.value })}
                  placeholder="0821-3570-5325"
                  className="w-full h-10 px-3 bg-black/40 border border-white/10 rounded-lg text-white font-body placeholder-white/20 focus:outline-none focus:border-brand-cyan text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-white/60 flex items-center gap-1.5">
                  <MapPin size={12} className="text-brand-coral" /> Tautan Google Maps
                </label>
                <input
                  type="url"
                  required
                  value={storeSettings.google_maps_url}
                  onChange={(e) => setStoreSettings({ ...storeSettings, google_maps_url: e.target.value })}
                  placeholder="https://share.google/..."
                  className="w-full h-10 px-3 bg-black/40 border border-white/10 rounded-lg text-white font-body placeholder-white/20 focus:outline-none focus:border-brand-cyan text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-white/60 flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-brand-magenta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg> Username Instagram
                </label>
                <input
                  type="text"
                  value={storeSettings.instagram_username}
                  onChange={(e) => setStoreSettings({ ...storeSettings, instagram_username: e.target.value })}
                  placeholder="dontcyco"
                  className="w-full h-10 px-3 bg-black/40 border border-white/10 rounded-lg text-white font-body placeholder-white/20 focus:outline-none focus:border-brand-cyan text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-white/60 flex items-center gap-1.5">
                  <Music size={12} className="text-brand-cyan" /> Username TikTok
                </label>
                <input
                  type="text"
                  value={storeSettings.tiktok_username}
                  onChange={(e) => setStoreSettings({ ...storeSettings, tiktok_username: e.target.value })}
                  placeholder="dontcyco"
                  className="w-full h-10 px-3 bg-black/40 border border-white/10 rounded-lg text-white font-body placeholder-white/20 focus:outline-none focus:border-brand-cyan text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={savingSettings}
                className="w-full h-10 mt-2 bg-brand-cyan text-brand-dark font-display text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#00a8be] disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {savingSettings ? (
                  "Menyimpan..."
                ) : settingsSuccess ? (
                  <>
                    <Check size={16} /> Berhasil Disimpan
                  </>
                ) : (
                  <>
                    <Save size={16} /> Simpan Pengaturan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <DashboardContent />
    </AdminGuard>
  );
}
