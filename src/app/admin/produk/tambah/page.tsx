"use client";

import React from "react";
import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";
import ProductForm from "@/components/ProductForm";
import { ArrowLeft } from "lucide-react";

export default function TambahProdukPage() {
  return (
    <AdminGuard>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
        {/* Back Link */}
        <Link
          href="/admin/produk"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-brand-neon uppercase tracking-wider mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> Kembali ke Daftar Produk
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-semibold text-brand-neon uppercase tracking-widest">
            CMS Control
          </span>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wider mt-1">
            Tambah Produk Baru
          </h1>
        </div>

        {/* Product Form */}
        <ProductForm />
      </div>
    </AdminGuard>
  );
}
