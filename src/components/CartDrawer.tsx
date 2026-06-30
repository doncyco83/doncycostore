"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import { X, ShoppingBag, Plus, Minus, Trash2, MessageCircle, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useCart();

  const [whatsappNumber, setWhatsappNumber] = useState("0821-3570-5325");

  // Fetch store settings for WhatsApp number
  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data } = await supabase
          .from("store_settings")
          .select("whatsapp_number")
          .single();
        if (data && data.whatsapp_number) {
          setWhatsappNumber(data.whatsapp_number);
        }
      } catch (err) {
        console.error("Failed to load whatsapp number in CartDrawer:", err);
      }
    }
    fetchSettings();
  }, []);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const waFormatted = cleanWaNumber.startsWith("0")
    ? `62${cleanWaNumber.substring(1)}`
    : cleanWaNumber.startsWith("62")
    ? cleanWaNumber
    : `62${cleanWaNumber}`;

  const formatPrice = (price: number | null) => {
    if (price === null) return "Hubungi Admin";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    let itemsText = "";
    cart.forEach((item, index) => {
      const categoryText =
        item.category === "vinyl" ? "Vinyl" :
        item.category === "kaset" ? "Kaset" :
        item.category === "cd" ? "CD" : "Figure";
      const itemPrice = formatPrice(item.price);
      const subtotal = formatPrice((item.price || 0) * item.quantity);

      itemsText += `${index + 1}. ${item.artist} - ${item.name} (${categoryText})\n`;
      itemsText += `   Qty: ${item.quantity} x ${itemPrice} = ${subtotal}\n\n`;
    });

    const totalText = formatPrice(cartTotal);
    const waMessage = `Halo DonCyco Store, saya mau checkout pesanan berikut:

Detail Pesanan:
${itemsText}Total Item: ${cartCount}
Total Harga: ${totalText}

Apakah item di atas masih ready untuk dikirim? Terima kasih!`;

    const whatsappUrl = `https://wa.me/${waFormatted}?text=${encodeURIComponent(waMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden md:hidden lg:block">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sliding Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-[#0c0914] border-l border-white/10 text-white flex flex-col shadow-2xl relative transform transition-transform duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={20} className="text-brand-neon" />
              <h2 className="font-display text-lg font-bold uppercase tracking-wider">
                Keranjang Belanja
              </h2>
              <span className="bg-brand-magenta text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Tutup keranjang"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Body (Items List) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-white/40 space-y-4">
                <ShoppingBag size={48} className="text-white/10 stroke-[1.5]" />
                <div>
                  <p className="font-bold text-base text-white">Keranjang Kosong</p>
                  <p className="text-xs text-white/30 mt-1 max-w-xs leading-relaxed">
                    Anda belum menambahkan produk apa pun. Jelajahi katalog kami untuk berburu rilisan fisik vintage impian Anda.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-white/5 border border-white/10 hover:border-brand-neon hover:text-brand-neon text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300"
                >
                  Mulai Digging
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const hasImage = item.images && item.images.length > 0;
                const imageSrc = hasImage ? item.images![0] : null;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 relative group hover:border-white/10 transition-colors"
                  >
                    {/* Item Image */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-white/5">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={`${item.artist} - ${item.name}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag size={20} className="text-white/20" />
                        </div>
                      )}
                    </div>

                    {/* Item Info */}
                    <div className="flex-grow flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="font-display text-sm font-bold text-white leading-tight truncate">
                          {item.artist}
                        </h4>
                        <p className="text-xs text-white/60 leading-tight font-body mt-0.5 truncate">
                          {item.name}
                        </p>
                        <span className="text-[9px] text-brand-cyan uppercase tracking-widest font-semibold block mt-1">
                          {item.category === "vinyl" ? "Vinyl" :
                           item.category === "kaset" ? "Kaset" :
                           item.category === "cd" ? "CD" : "Figure"}
                        </span>
                      </div>

                      {/* Quantity Controls & Price */}
                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5">
                        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden h-7 bg-black/40">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 h-full text-white/50 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center"
                            aria-label="Kurang satu"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-white font-body min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 h-full text-white/50 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center"
                            aria-label="Tambah satu"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        <span className="text-xs font-bold text-brand-neon font-body">
                          {formatPrice((item.price || 0) * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Delete Item Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-2 right-2 text-white/30 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                      aria-label="Hapus produk"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer (Checkout Details) */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/5 bg-black/40 space-y-4">
              <div className="space-y-1.5 text-sm font-body">
                <div className="flex items-center justify-between text-white/60 text-xs">
                  <span>Total Produk</span>
                  <span className="text-white font-semibold">{cartCount} Item</span>
                </div>
                <div className="flex items-center justify-between text-base pt-1">
                  <span className="font-semibold">Total Pembayaran</span>
                  <span className="font-bold text-brand-neon text-lg">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-brand-neon text-brand-dark hover:bg-[#d4e540] font-display text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_4px_12px_rgba(226,251,97,0.2)]"
                >
                  <MessageCircle size={18} className="fill-current" />
                  Checkout via WhatsApp
                </button>
                <p className="text-[9px] text-white/40 text-center mt-2.5 leading-normal">
                  *Pemesanan akan dikirim via chat WhatsApp dengan detail produk dan harga otomatis terisi lengkap.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
