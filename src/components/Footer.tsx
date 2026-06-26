import React from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Phone, MapPin, Clock, Disc } from "lucide-react";

export default async function Footer() {
  // Default values based on store info if Supabase is not connected or empty
  let settings = {
    whatsapp_number: "0821-3570-5325",
    google_maps_url: "https://share.google/jKXysSNQPT1PJWWRm",
    instagram_username: "dontcyco",
    tiktok_username: "dontcyco"
  };

  try {
    const { data, error } = await supabase
      .from("store_settings")
      .select("*")
      .single();
    
    if (data && !error) {
      settings = {
        whatsapp_number: data.whatsapp_number || settings.whatsapp_number,
        google_maps_url: data.google_maps_url || settings.google_maps_url,
        instagram_username: data.instagram_username || settings.instagram_username,
        tiktok_username: data.tiktok_username || settings.tiktok_username
      };
    }
  } catch (err) {
    // Fail silently in build time or dev without DB connection
    console.warn("Using default store settings because DB fetch failed.");
  }

  // Clean WhatsApp number for wa.me link: e.g. "0821-3570-5325" -> "6282135705325"
  const cleanWaNumber = settings.whatsapp_number.replace(/[^0-9]/g, "");
  const waFormatted = cleanWaNumber.startsWith("0") 
    ? `62${cleanWaNumber.substring(1)}` 
    : cleanWaNumber.startsWith("62") 
      ? cleanWaNumber 
      : `62${cleanWaNumber}`;
  
  const waLink = `https://wa.me/${waFormatted}?text=Halo%20DonCyco%20Store%2C%20mau%20tanya%20koleksi%20rilisan%20fisiknya%20dong!`;

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-brand-magenta/40 flex items-center justify-center bg-brand-dark">
                <Disc size={20} className="text-brand-magenta animate-spin-slow" />
              </div>
              <span className="font-display text-xl tracking-wider">DONCYCO STORE</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6 font-body">
              Penyedia rilisan fisik vintage, piringan hitam (vinyl), kaset pita, CD, dan item kolektibel. Berawal dari lapak gigs ke gigs sejak 2010.
            </p>
            <div className="flex items-center gap-4">
              {settings.instagram_username && (
                <a
                  href={`https://instagram.com/${settings.instagram_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-magenta hover:border-brand-magenta transition-all duration-300"
                  aria-label="Instagram Link"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              )}
              {settings.tiktok_username && (
                <a
                  href={`https://tiktok.com/@${settings.tiktok_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-cyan hover:border-brand-cyan transition-all duration-300"
                  aria-label="TikTok Link"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Opening Hours & Contact */}
          <div>
            <h3 className="font-display text-lg tracking-wider mb-6 text-brand-neon uppercase">
              Waktu & Kontak
            </h3>
            <ul className="space-y-4 text-sm font-body text-white/70">
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-brand-coral shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Jam Operasional</p>
                  <p className="text-white/60">Setiap Hari: 12:00 - 21:00 WIB</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-brand-neon shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">WhatsApp / Telp</p>
                  <a 
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-white/60 hover:text-brand-neon transition-colors"
                  >
                    {settings.whatsapp_number}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Location & Map Pin */}
          <div>
            <h3 className="font-display text-lg tracking-wider mb-6 text-brand-cyan uppercase">
              Lokasi Toko
            </h3>
            <div className="space-y-4 text-sm font-body text-white/70">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-magenta shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Yogyakarta, Indonesia</p>
                  <p className="text-white/60 mb-3">
                    Fokus katalog fisik sejak 2016. Kunjungi markas kami untuk dig-in koleksi vintage terbaik.
                  </p>
                  <a
                    href={settings.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/20 hover:border-brand-cyan hover:text-brand-cyan rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                  >
                    Buka Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} DonCyco Store. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-semibold">
            <span className="text-brand-neon/60">EST. 2010</span>
            <span>•</span>
            <span className="text-brand-magenta/60">UNDERGROUND SOUNDS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
