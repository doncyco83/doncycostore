import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ImageGallery from "@/components/ImageGallery";
import { ArrowLeft, MessageCircle, AlertCircle, Disc, Calendar, Tag, HardDrive, Info } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 10; // Revalidate dynamic product pages every 10 seconds

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

// 1. Generate SEO Metadata dynamically for each product page
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  try {
    const { data: product } = await supabase
      .from("products")
      .select("artist, name, category, genre")
      .eq("slug", params.slug)
      .single();

    if (!product) {
      return {
        title: "Produk Tidak Ditemukan | DonCyco Store",
      };
    }

    const categoryText = product.category === "vinyl" ? "Vinyl Piringan Hitam" :
                         product.category === "kaset" ? "Kaset Pita Vintage" :
                         product.category === "cd" ? "CD Musik Audio" : "Action Figure";

    return {
      title: `${product.artist} - ${product.name} (${categoryText}) | DonCyco Store`,
      description: `Beli rilisan fisik vintage ${product.artist} - ${product.name} (${product.genre}). Lihat detail kondisi fisik, harga, dan ketersediaan stok online di DonCyco Store Yogyakarta.`,
      openGraph: {
        title: `${product.artist} - ${product.name} | DonCyco Store`,
        description: `Rilisan fisik vintage ${product.artist} - ${product.name} di DonCyco Store Yogyakarta.`,
        type: "music.album",
      }
    };
  } catch (err) {
    return {
      title: "Detail Produk | DonCyco Store",
    };
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  // 2. Fetch product data from database
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !product) {
    notFound(); // Redirects to Next.js 404 page
  }

  // 3. Fetch store settings for dynamic WhatsApp number
  let storeSettings = {
    whatsapp_number: "0821-3570-5325",
  };
  try {
    const { data } = await supabase
      .from("store_settings")
      .select("whatsapp_number")
      .single();
    if (data && data.whatsapp_number) {
      storeSettings = data;
    }
  } catch (err) {
    // Fail silently, use fallback WA
  }

  // 4. Format WA Checkout Link
  const cleanWaNumber = storeSettings.whatsapp_number.replace(/[^0-9]/g, "");
  const waFormatted = cleanWaNumber.startsWith("0") 
    ? `62${cleanWaNumber.substring(1)}` 
    : cleanWaNumber.startsWith("62") 
      ? cleanWaNumber 
      : `62${cleanWaNumber}`;

  const formattedPrice = product.price ? 
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(product.price) 
    : "Hubungi Admin";

  const categoryText = product.category === "vinyl" ? "Vinyl" :
                       product.category === "kaset" ? "Kaset Pita" :
                       product.category === "cd" ? "CD" : "Action Figure";

  const waMessage = `Halo DonCyco Store, gw tertarik beli rilisan fisik berikut:

- Artis: ${product.artist}
- Album: ${product.name}
- Kategori: ${categoryText}
- Harga: ${formattedPrice}

Apakah barangnya masih ready? Terima kasih.`;

  const whatsappCheckoutUrl = `https://wa.me/${waFormatted}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="bg-brand-dark min-h-[85vh] text-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back button */}
      <Link
        href="/katalog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-brand-neon uppercase tracking-wider mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> Kembali ke Katalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6">
          <ImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Metadata & Checkout */}
        <div className="lg:col-span-6 space-y-8">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-brand-magenta/15 border border-brand-magenta/30 text-brand-magenta text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {categoryText}
            </span>
            <span className="bg-brand-coral/15 border border-brand-coral/30 text-brand-coral text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Kondisi: {product.condition}
            </span>
            {product.is_limited && (
              <span className="bg-brand-neon text-brand-dark text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Limited Edition
              </span>
            )}
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-wider leading-tight">
              {product.artist}
            </h1>
            <p className="text-xl sm:text-2xl text-white/70 font-body font-light">
              {product.name}
            </p>
            <p className="text-xs text-brand-cyan font-bold uppercase tracking-widest pt-1">
              Genre: {product.genre}
            </p>
          </div>

          {/* Price & Availability */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between gap-6">
            <div>
              <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold block mb-1">
                Harga Katalog
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-white font-body">
                {formattedPrice}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold block mb-1">
                Status Stok
              </span>
              {product.is_available ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider rounded-full">
                  Sold Out
                </span>
              )}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white/50 border-b border-white/5 pb-2">
              Spesifikasi Fisik Rilisan
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm font-body">
              {product.label && (
                <div className="space-y-0.5">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <Tag size={12} className="text-brand-coral" /> Record Label
                  </span>
                  <span className="text-white/80 font-medium">{product.label}</span>
                </div>
              )}
              {product.release_year && (
                <div className="space-y-0.5">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <Calendar size={12} className="text-brand-neon" /> Tahun Rilis
                  </span>
                  <span className="text-white/80 font-medium">{product.release_year}</span>
                </div>
              )}
              <div className="space-y-0.5">
                <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <HardDrive size={12} className="text-brand-magenta" /> Format Fisik
                </span>
                <span className="text-white/80 font-medium uppercase">{categoryText}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Info size={12} className="text-brand-cyan" /> Kondisi Media
                </span>
                <span className="text-white/80 font-medium">{product.condition}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="space-y-3 border-t border-white/5 pt-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white/50">
                Deskripsi Produk
              </h3>
              <p className="text-sm font-body text-white/70 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>
          )}

          {/* CTA Purchase Button */}
          <div className="pt-6 border-t border-white/5">
            {product.is_available ? (
              <a
                href={whatsappCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-brand-neon text-brand-dark hover:bg-[#d4e540] font-display text-base font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_8px_24px_rgba(226,251,97,0.3)] hover:scale-[1.01]"
              >
                <MessageCircle size={22} className="fill-current" />
                Beli / Tanya Detail via WhatsApp
              </a>
            ) : (
              <button
                disabled
                className="w-full py-4 bg-white/5 border border-white/10 text-white/30 font-display text-base font-bold uppercase tracking-wider rounded-full cursor-not-allowed flex items-center justify-center gap-3"
              >
                <AlertCircle size={22} />
                Stok Habis Terjual
              </button>
            )}
            <p className="text-[10px] text-white/40 font-body text-center mt-3 leading-normal">
              *Menekan tombol di atas akan mengarahkan Anda ke ruang chat WhatsApp Admin DonCyco Store dengan pesan otomatis produk yang dipilih.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
