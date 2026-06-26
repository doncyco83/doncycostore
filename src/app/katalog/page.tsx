import React from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Disc, Search, SlidersHorizontal, ArrowRight } from "lucide-react";

export const revalidate = 10; // Revalidate page data every 10 seconds

interface CatalogProps {
  searchParams: {
    category?: string;
    search?: string;
  };
}

export default async function CatalogPage({ searchParams }: CatalogProps) {
  const activeCategory = searchParams.category || "";
  const searchQuery = searchParams.search || "";

  // 1. Fetch data from Supabase with dynamic filters
  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (activeCategory) {
    query = query.eq("category", activeCategory);
  }

  if (searchQuery) {
    query = query.or(`artist.ilike.%${searchQuery}%,name.ilike.%${searchQuery}%`);
  }

  const { data: products, error } = await query;

  const categories = [
    { name: "Semua", value: "" },
    { name: "Vinyl", value: "vinyl" },
    { name: "Kaset", value: "kaset" },
    { name: "CD", value: "cd" },
    { name: "Action Figure", value: "action_figure" },
  ];

  return (
    <div className="bg-brand-dark min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-brand-neon uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-1.5 rounded-full inline-block mb-4">
          Katalog Fisik Terkurasi
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-wider mb-4">
          Koleksi Musik DonCyco
        </h1>
        <p className="text-sm sm:text-base text-white/60 font-body leading-relaxed">
          Menjelajahi piringan hitam, kaset pita, CD, dan memorabilia langka. Tekan detail produk untuk terhubung langsung ke WhatsApp admin dan amankan rilisan fisik impianmu.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/10">
        {/* Search Input (Pure HTML GET form to keep it SSR & dynamic) */}
        <form action="/katalog" method="GET" className="relative w-full max-w-md">
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Cari artis, band, atau judul album..."
            className="w-full h-11 pl-11 pr-4 bg-white/5 border border-white/10 rounded-xl text-white font-body placeholder-white/30 focus:outline-none focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 transition-all text-sm"
          />
          {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/40">
            <Search size={18} />
          </span>
        </form>

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-thin">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/40 flex items-center gap-1.5 mr-2 shrink-0">
            <SlidersHorizontal size={14} /> Filter:
          </span>
          {categories.map((cat) => {
            // Build URL dynamically
            const url = cat.value 
              ? `/katalog?category=${cat.value}${searchQuery ? `&search=${searchQuery}` : ""}`
              : `/katalog${searchQuery ? `?search=${searchQuery}` : ""}`;
            
            const isSelected = activeCategory === cat.value;

            return (
              <Link
                key={cat.value}
                href={url}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 ${
                  isSelected
                    ? "bg-brand-neon text-brand-dark shadow-[0_4px_12px_rgba(226,251,97,0.2)]"
                    : "bg-white/5 border border-white/10 hover:border-brand-magenta text-white/80"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Catalog Grid */}
      {error ? (
        <div className="py-20 text-center text-red-400">
          <p className="font-bold text-lg">Gagal memuat katalog.</p>
          <p className="text-xs mt-1 text-white/40">Silakan hubungi administrator atau coba refresh halaman.</p>
        </div>
      ) : !products || products.length === 0 ? (
        <div className="py-24 text-center text-white/40 font-body">
          <Disc className="w-16 h-16 text-white/10 animate-spin-slow mx-auto mb-4" />
          <p className="text-lg font-bold">Produk Tidak Ditemukan</p>
          <p className="text-xs text-white/30 mt-1 max-w-sm mx-auto leading-relaxed">
            Tidak ada koleksi yang cocok dengan filter atau kata kunci pencarian Anda saat ini. Coba ubah pencarian Anda.
          </p>
          {(activeCategory || searchQuery) && (
            <Link
              href="/katalog"
              className="inline-block mt-6 px-5 py-2.5 bg-white/5 border border-white/10 hover:border-white/35 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
            >
              Reset Semua Filter
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const hasImage = product.images && product.images.length > 0;
            const imageSrc = hasImage ? product.images[0] : null;

            return (
              <Link
                key={product.id}
                href={`/katalog/${product.slug}`}
                className="glass-card rounded-[24px] overflow-hidden border border-white/10 flex flex-col h-full group hover:border-brand-magenta/40 hover:shadow-[0_12px_32px_rgba(183,19,113,0.15)] transition-all duration-300"
              >
                {/* Image Showcase */}
                <div className="relative aspect-square bg-black overflow-hidden flex items-center justify-center border-b border-white/5">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={`${product.artist} - ${product.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <Disc className="w-16 h-16 text-white/10 group-hover:rotate-180 transition-transform duration-700" />
                  )}

                  {/* Badges overlay */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-black/75 backdrop-blur-sm border border-white/10 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-brand-neon">
                      {product.category === "vinyl" ? "Vinyl" : 
                       product.category === "kaset" ? "Kaset" : 
                       product.category === "cd" ? "CD" : "Figure"}
                    </span>
                    {product.is_limited && (
                      <span className="bg-brand-magenta text-white text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-brand-magenta">
                        Limited
                      </span>
                    )}
                  </div>

                  {/* Condition rating overlay bottom right */}
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black/85 backdrop-blur-sm border border-white/10 text-[9px] font-semibold text-brand-coral px-2.5 py-1 rounded">
                      {product.condition}
                    </span>
                  </div>
                </div>

                {/* Content details */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-brand-neon transition-colors leading-tight line-clamp-1">
                      {product.artist}
                    </h3>
                    <p className="text-sm text-white/60 font-body leading-snug line-clamp-2">
                      {product.name}
                    </p>
                    <p className="text-[10px] text-brand-cyan uppercase tracking-widest font-semibold pt-1">
                      {product.genre}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-white/40 block uppercase tracking-wider font-semibold">Harga</span>
                      <span className="text-sm font-bold text-white">
                        {product.price ? (
                          new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(product.price)
                        ) : (
                          <span className="text-white/50 italic text-xs">Hubungi Admin</span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-brand-neon font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Detail <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
