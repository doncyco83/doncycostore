"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

interface AddToCartButtonProps {
  product: {
    id: string;
    artist: string;
    name: string;
    price: number | null;
    images: string[] | null;
    category: string;
    slug: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
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
    <button
      onClick={handleAdd}
      className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-brand-neon hover:bg-brand-neon hover:text-brand-dark text-white/70 flex items-center justify-center transition-all duration-300"
      title="Tambah ke Keranjang"
    >
      <ShoppingBag size={15} />
    </button>
  );
}
