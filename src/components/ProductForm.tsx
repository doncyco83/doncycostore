"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Disc, Upload, X, AlertCircle, Save, CheckCircle2, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface ProductFormProps {
  productId?: string; // If provided, we are editing
}

export default function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    artist: "",
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "vinyl",
    genre: "",
    condition: "Near Mint",
    label: "",
    release_year: "",
    is_limited: false,
    is_available: true,
    images: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // Category management states
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [showNewCatInput, setShowNewCatInput] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [addingCat, setAddingCat] = useState(false);

  // Fetch product data if editing
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setFetching(true);
        setErrorMsg("");
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();

        if (error) {
          setErrorMsg(error.message || "Gagal mengambil data produk.");
        } else if (data) {
          setFormData({
            artist: data.artist || "",
            name: data.name || "",
            slug: data.slug || "",
            description: data.description || "",
            price: data.price ? String(data.price) : "",
            category: data.category || "vinyl",
            genre: data.genre || "",
            condition: data.condition || "Near Mint",
            label: data.label || "",
            release_year: data.release_year ? String(data.release_year) : "",
            is_limited: data.is_limited ?? false,
            is_available: data.is_available ?? true,
            images: data.images || [],
          });
        }
      } catch (err) {
        setErrorMsg("Terjadi kesalahan sistem saat memuat data.");
      } finally {
        setFetching(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Fetch all categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("name", { ascending: true });

        if (data && !error) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Gagal memuat kategori:", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Handle adding new custom category inline
  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    setAddingCat(true);
    setErrorMsg("");

    const generatedSlug = newCatName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // remove special characters
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-") // collapse multiple hyphens
      .trim();

    try {
      const { data, error } = await supabase
        .from("categories")
        .insert([{ name: newCatName.trim(), slug: generatedSlug }])
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          setErrorMsg("Kategori dengan nama/slug ini sudah terdaftar.");
        } else {
          setErrorMsg(error.message || "Gagal menambahkan kategori baru.");
        }
      } else if (data) {
        setCategories((prev) => [...prev, data]);
        setFormData((prev) => ({ ...prev, category: data.slug }));
        setNewCatName("");
        setShowNewCatInput(false);
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan sistem saat mendaftarkan kategori.");
    } finally {
      setAddingCat(false);
    }
  };

  // Auto generate slug from artist + name
  useEffect(() => {
    if (!productId && formData.artist && formData.name) {
      const generatedSlug = `${formData.artist}-${formData.name}`
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // remove special characters
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-") // collapse multiple hyphens
        .trim();
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.artist, formData.name, productId]);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    setErrorMsg("");

    const file = files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    try {
      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, publicUrl],
      }));
    } catch (err: any) {
      setErrorMsg("Gagal mengunggah gambar: " + (err.message || err));
    } finally {
      setUploadingImage(false);
      // Reset input value to allow uploading same file again if needed
      e.target.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    // Format payload
    const payload = {
      artist: formData.artist.trim(),
      name: formData.name.trim(),
      slug: formData.slug.trim(),
      description: formData.description.trim() || null,
      price: formData.price ? parseFloat(formData.price) : null,
      category: formData.category,
      genre: formData.genre.trim(),
      condition: formData.condition,
      label: formData.label.trim() || null,
      release_year: formData.release_year ? parseInt(formData.release_year) : null,
      is_limited: formData.is_limited,
      is_available: formData.is_available,
      images: formData.images,
    };

    try {
      let resultError = null;

      if (productId) {
        // Edit mode
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", productId);
        resultError = error;
      } else {
        // Add mode
        const { error } = await supabase
          .from("products")
          .insert([payload]);
        resultError = error;
      }

      if (resultError) {
        // If conflict on slug
        if (resultError.code === "23505") {
          setErrorMsg("Slug produk sudah terpakai. Ubah artist atau judul rilisan.");
        } else {
          setErrorMsg(resultError.message || "Gagal menyimpan produk.");
        }
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/produk");
        }, 1500);
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan sistem saat menyimpan.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-24 text-center text-white/50 flex flex-col items-center gap-2">
        <Disc className="w-12 h-12 text-brand-magenta animate-spin-slow mb-2" />
        <p className="text-sm font-semibold tracking-wider uppercase">Memuat data produk...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 rounded-[30px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/35 text-red-400 text-sm flex items-start gap-3">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p className="font-body leading-relaxed">{errorMsg}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/35 text-emerald-400 text-sm flex items-start gap-3 animate-pulse">
          <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
          <p className="font-body leading-relaxed font-semibold">
            {productId ? "Produk berhasil diperbarui!" : "Produk baru berhasil ditambahkan! Mengalihkan..."}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Artist */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/60">
              Artis / Band *
            </label>
            <input
              type="text"
              required
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              placeholder="e.g. Nirvana, God Bless, Pink Floyd"
              className="w-full h-11 px-4 bg-black/40 border border-white/10 rounded-xl text-white font-body placeholder-white/20 focus:outline-none focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 transition-all text-sm"
            />
          </div>

          {/* Album Name */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/60">
              Judul Rilisan / Nama Produk *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Nevermind, Semut Hitam, The Dark Side of the Moon"
              className="w-full h-11 px-4 bg-black/40 border border-white/10 rounded-xl text-white font-body placeholder-white/20 focus:outline-none focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 transition-all text-sm"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/60 flex items-center justify-between">
              <span>Slug URL *</span>
              <span className="text-[9px] text-white/30 lowercase italic">otomatis dihasilkan</span>
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.replace(/\s+/g, "-").toLowerCase() })}
              placeholder="e.g. nirvana-nevermind"
              className="w-full h-11 px-4 bg-black/40 border border-white/10 rounded-xl text-white font-body placeholder-white/20 focus:outline-none focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 transition-all text-sm font-mono"
            />
          </div>

          {/* Genre */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/60">
              Genre Musik *
            </label>
            <input
              type="text"
              required
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              placeholder="e.g. Rock, Grunge, Heavy Metal, Jazz Fusion"
              className="w-full h-11 px-4 bg-black/40 border border-white/10 rounded-xl text-white font-body placeholder-white/20 focus:outline-none focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 transition-all text-sm"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-widest text-white/60">
                Kategori *
              </label>
              <button
                type="button"
                onClick={() => setShowNewCatInput(!showNewCatInput)}
                className="text-[10px] text-brand-cyan hover:underline font-semibold uppercase tracking-wider"
              >
                {showNewCatInput ? "Batal" : "+ Kategori Baru"}
              </button>
            </div>

            {showNewCatInput ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Kategori baru, e.g. Boxset, Merchandise"
                  className="flex-grow h-11 px-4 bg-black/40 border border-white/10 rounded-xl text-white font-body placeholder-white/20 focus:outline-none focus:border-brand-magenta text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  disabled={addingCat}
                  className="px-4 h-11 bg-brand-cyan text-brand-dark rounded-xl font-display text-xs font-bold uppercase tracking-wider hover:bg-[#00a8be] disabled:opacity-40 transition-all"
                >
                  {addingCat ? "..." : "Tambah"}
                </button>
              </div>
            ) : (
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-11 px-4 bg-black/40 border border-white/10 rounded-xl text-white font-body focus:outline-none focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 transition-all text-sm"
              >
                {loadingCategories ? (
                  <option>Memuat kategori...</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.slug} className="bg-brand-dark">
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
            )}
          </div>

          {/* Condition */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/60">
              Kondisi Fisik / Grading *
            </label>
            <select
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              className="w-full h-11 px-4 bg-black/40 border border-white/10 rounded-xl text-white font-body focus:outline-none focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 transition-all text-sm"
            >
              <option value="New" className="bg-brand-dark">New / Sealed</option>
              <option value="Mint" className="bg-brand-dark">Mint (M)</option>
              <option value="Near Mint" className="bg-brand-dark">Near Mint (NM)</option>
              <option value="Very Good Plus" className="bg-brand-dark">Very Good Plus (VG+)</option>
              <option value="Very Good" className="bg-brand-dark">Very Good (VG)</option>
              <option value="Good" className="bg-brand-dark">Good (G)</option>
              <option value="Fair" className="bg-brand-dark">Fair (F)</option>
              <option value="Poor" className="bg-brand-dark">Poor (P)</option>
            </select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/60 flex items-center justify-between">
              <span>Harga (Rupiah)</span>
              <span className="text-[9px] text-white/40 italic">Biarkan kosong untuk &quot;Hubungi Admin&quot;</span>
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="e.g. 350000"
              className="w-full h-11 px-4 bg-black/40 border border-white/10 rounded-xl text-white font-body placeholder-white/20 focus:outline-none focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 transition-all text-sm"
            />
          </div>

          {/* Record Label */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/60">
              Label Rekaman / Distributor
            </label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="e.g. Sub Pop, Columbia Records"
              className="w-full h-11 px-4 bg-black/40 border border-white/10 rounded-xl text-white font-body placeholder-white/20 focus:outline-none focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 transition-all text-sm"
            />
          </div>

          {/* Release Year */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/60">
              Tahun Rilis Fisik
            </label>
            <input
              type="number"
              value={formData.release_year}
              onChange={(e) => setFormData({ ...formData, release_year: e.target.value })}
              placeholder="e.g. 1991"
              className="w-full h-11 px-4 bg-black/40 border border-white/10 rounded-xl text-white font-body placeholder-white/20 focus:outline-none focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 transition-all text-sm"
            />
          </div>

          {/* Checkboxes Group */}
          <div className="flex items-center gap-8 h-11 pt-4">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.is_limited}
                onChange={(e) => setFormData({ ...formData, is_limited: e.target.checked })}
                className="w-5 h-5 rounded border-2 border-brand-grey bg-transparent text-brand-magenta focus:ring-brand-cyan focus:ring-offset-black checked:bg-brand-magenta checked:border-brand-magenta transition-all"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80">Edisi Terbatas (Limited)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.is_available}
                onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                className="w-5 h-5 rounded border-2 border-brand-grey bg-transparent text-brand-magenta focus:ring-brand-cyan focus:ring-offset-black checked:bg-brand-magenta checked:border-brand-magenta transition-all"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80">Stok Tersedia (In Stock)</span>
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-widest text-white/60">
            Deskripsi Detail Produk
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Tulis detail album, kondisi sleeve/media, tracklist esensial, atau asal pressing (e.g. US Press, Japan Press dengan Obi)."
            rows={4}
            className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white font-body placeholder-white/20 focus:outline-none focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 transition-all text-sm resize-y"
          />
        </div>

        {/* Image Upload Area */}
        <div className="space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-widest text-white/60">
            Foto Produk (Bisa unggah lebih dari satu)
          </label>

          {/* Grid of existing/uploaded photos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {formData.images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-black group"
              >
                <Image
                  src={imgUrl}
                  alt={`Product Image ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-2 right-2 p-1.5 bg-black/85 text-white hover:text-red-400 rounded-full border border-white/15 transition-all opacity-0 group-hover:opacity-100"
                  title="Hapus foto"
                >
                  <X size={12} />
                </button>
                <div className="absolute bottom-1 left-2 text-[9px] bg-black/75 px-1.5 py-0.5 rounded text-white/60 border border-white/5">
                  Foto {idx + 1}
                </div>
              </div>
            ))}

            {/* Upload Button Box */}
            <label className="relative aspect-square rounded-xl border border-dashed border-white/20 hover:border-brand-magenta hover:bg-white/5 transition-all flex flex-col items-center justify-center cursor-pointer group text-center p-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
                disabled={uploadingImage}
                className="sr-only"
              />
              {uploadingImage ? (
                <Disc className="w-8 h-8 text-brand-magenta animate-spin-slow" />
              ) : (
                <Upload className="w-8 h-8 text-white/40 group-hover:text-brand-magenta group-hover:scale-105 transition-all" />
              )}
              <span className="text-[10px] text-white/50 group-hover:text-white mt-2 font-semibold">
                {uploadingImage ? "Mengunggah..." : "Unggah Gambar"}
              </span>
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="border-t border-white/10 pt-6 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/produk")}
            disabled={loading}
            className="px-6 h-11 bg-transparent hover:bg-white/5 text-white/80 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors border border-white/10"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="inline-flex items-center gap-2 px-8 h-11 bg-brand-neon text-brand-dark font-display text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#d4e540] disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_4px_12px_rgba(226,251,97,0.2)]"
          >
            <Save size={16} />
            {loading ? "Menyimpan..." : productId ? "Perbarui Produk" : "Simpan Produk"}
          </button>
        </div>
      </form>
    </div>
  );
}
