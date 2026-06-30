"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { MessageCircle, ShoppingBag, AlertCircle } from "lucide-react";

interface ProductActionAreaProps {
  product: {
    id: string;
    artist: string;
    name: string;
    price: number | null;
    images: string[] | null;
    category: string;
    slug: string;
    is_available: boolean;
  };
  whatsappCheckoutUrl: string;
}

export default function ProductActionArea({ product, whatsappCheckoutUrl }: ProductActionAreaProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      artist: product.artist,
      name: product.name,
      price: product.price,
      images: product.images,
      category: product.category,
      slug: product.slug,
    });
  };

  return (
    <div className="pt-6 border-t border-white/5 space-y-4">
      {product.is_available ? (
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-4 bg-white/5 border border-white/10 hover:border-brand-neon hover:text-brand-neon font-display text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-2.5"
          >
            <ShoppingBag size={18} />
            Tambah ke Keranjang
          </button>

          {/* Buy Now / WhatsApp Direct Button */}
          <a
            href={whatsappCheckoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-4 bg-brand-neon text-brand-dark hover:bg-[#d4e540] font-display text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_8px_24px_rgba(226,251,97,0.2)] hover:scale-[1.01]"
          >
            <MessageCircle size={18} className="fill-current" />
            Beli / Tanya via WA
          </a>
        </div>
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
        *Anda bisa memasukkan beberapa item ke keranjang dan men-checkout semuanya sekaligus, atau menekan tombol beli langsung via WhatsApp.
      </p>
    </div>
  );
}
