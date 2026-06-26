"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";
import { Plus, Disc, Edit2, Trash2, CheckCircle, XCircle, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";

function ProductListContent() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setErrorMsg(error.message || "Gagal mengambil data produk.");
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan sistem saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.")) {
      return;
    }
    
    setDeleteLoading(true);
    setDeleteId(id);
    setErrorMsg("");

    try {
      // First, get the product info to see if it has images we might want to delete from storage later.
      // (Optional: for simplicity in MVP, we just delete the database record. Storage clean up can be done or left for reuse).
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) {
        setErrorMsg(error.message || "Gagal menghapus produk.");
      } else {
        // Remove from local state
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan saat menghapus data.");
    } finally {
      setDeleteLoading(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
      {/* Back to Dashboard Link */}
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-brand-neon uppercase tracking-wider mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> Kembali ke Dashboard
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-8 mb-10">
        <div>
          <span className="text-xs font-semibold text-brand-magenta uppercase tracking-widest">
            Katalog CMS
          </span>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wider mt-1">
            Kelola Produk
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchProducts}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
            title="Refresh List"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <Link
            href="/admin/produk/tambah"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-neon text-brand-dark font-display text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#d4e540] transition-all duration-300 shadow-[0_4px_12px_rgba(226,251,97,0.2)]"
          >
            <Plus size={16} /> Tambah Produk
          </Link>
        </div>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/35 text-red-400 text-sm flex items-start gap-3">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p className="font-body leading-relaxed">{errorMsg}</p>
        </div>
      )}

      {/* Product List Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {loading ? (
          <div className="py-24 text-center text-white/50 flex flex-col items-center gap-2">
            <Disc className="w-12 h-12 text-brand-magenta animate-spin-slow mb-2" />
            <p className="text-sm font-semibold tracking-wider uppercase">Memuat katalog produk...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-24 text-center text-white/40 font-body">
            <p className="text-lg font-bold">Katalog Kosong</p>
            <p className="text-xs text-white/30 mt-1 mb-6">Belum ada produk yang ditambahkan.</p>
            <Link
              href="/admin/produk/tambah"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-brand-dark text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300"
            >
              Tambah Produk Pertama
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/15 bg-white/5 text-[10px] uppercase tracking-widest text-white/60 font-semibold font-body">
                  <th className="py-4 px-6">Produk</th>
                  <th className="py-4 px-4">Kategori</th>
                  <th className="py-4 px-4">Kondisi</th>
                  <th className="py-4 px-4">Harga</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm font-body">
                {products.map((product) => {
                  const hasImage = product.images && product.images.length > 0;
                  const thumb = hasImage ? product.images[0] : null;

                  return (
                    <tr key={product.id} className="hover:bg-white/5 transition-colors">
                      {/* Product details (Image + Artist + Name) */}
                      <td className="py-4 px-6 flex items-center gap-4 min-w-[300px]">
                        <div className="relative w-12 h-12 rounded-lg bg-black border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {thumb ? (
                            <Image
                              src={thumb}
                              alt={product.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <Disc className="w-6 h-6 text-white/20" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white leading-tight">
                            {product.artist}
                          </p>
                          <p className="text-xs text-white/60 mt-0.5 leading-none">
                            {product.name}
                          </p>
                          <span className="text-[9px] text-brand-cyan/80 font-bold uppercase tracking-widest mt-1 block">
                            {product.genre}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 font-semibold uppercase text-xs text-white/70">
                        {product.category === "vinyl" ? "Vinyl" : 
                         product.category === "kaset" ? "Kaset" : 
                         product.category === "cd" ? "CD" : "Figure"}
                      </td>

                      {/* Condition */}
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-semibold text-brand-coral">
                          {product.condition}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 font-semibold">
                        {product.price ? (
                          new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(product.price)
                        ) : (
                          <span className="text-white/40 italic text-xs">Hubungi Admin</span>
                        )}
                      </td>

                      {/* Availability status */}
                      <td className="py-4 px-4">
                        {product.is_available ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-400 font-semibold">
                            <CheckCircle size={14} /> Tersedia
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-red-400 font-semibold">
                            <XCircle size={14} /> Habis
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-3 whitespace-nowrap">
                        <Link
                          href={`/admin/produk/edit/${product.id}`}
                          className="inline-flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:border-brand-cyan hover:text-brand-cyan transition-colors"
                          title="Edit Produk"
                        >
                          <Edit2 size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deleteLoading && deleteId === product.id}
                          className="inline-flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:border-red-500 hover:text-red-400 disabled:opacity-40 transition-colors"
                          title="Hapus Produk"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductList() {
  return (
    <AdminGuard>
      <ProductListContent />
    </AdminGuard>
  );
}
