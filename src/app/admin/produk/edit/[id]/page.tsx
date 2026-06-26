"use client";

import React from "react";
import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";
import ProductForm from "@/components/ProductForm";
import { ArrowLeft } from "lucide-react";

interface EditProdukPageProps {
  params: {
    id: string;
  };
}

export default function EditProdukPage({ params }: EditProdukPageProps) {
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
          <span className="text-xs font-semibold text-brand-magenta uppercase tracking-widest">
            CMS Control
          </span>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wider mt-1">
            Edit Produk
          </h1>
        </div>

        {/* Product Form loaded with dynamic productId */}
        <ProductForm productId={params.id} />
      </div>
    </AdminGuard>
  );
}
