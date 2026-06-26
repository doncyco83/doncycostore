"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Disc } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const hasImages = images && images.length > 0;
  const activeImage = hasImages ? images[activeIdx] : null;

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-square bg-black/60 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
        {activeImage ? (
          <Image
            src={activeImage}
            alt={`${productName} - Display Image`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <Disc className="w-24 h-24 text-white/10 animate-spin-slow" />
        )}
      </div>

      {/* Thumbnails row (only if multiple images) */}
      {hasImages && images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {images.map((imgUrl, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden bg-black border-2 transition-all ${
                  isActive ? "border-brand-magenta scale-95" : "border-white/10 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
