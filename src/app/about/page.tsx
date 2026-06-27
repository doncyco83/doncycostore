import React from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Phone, MapPin, Clock, Disc, ArrowRight, MessageCircle } from "lucide-react";

export const revalidate = 60; // Revalidate page every minute

export default async function AboutPage() {
  let settings = {
    whatsapp_number: "0821-3570-5325",
    google_maps_url: "https://share.google/jKXysSNQPT1PJWWRm",
    instagram_username: "dontcyco",
    tiktok_username: "dontcyco"
  };

  try {
    const { data } = await supabase
      .from("store_settings")
      .select("*")
      .single();
    if (data) {
      settings = {
        whatsapp_number: data.whatsapp_number || settings.whatsapp_number,
        google_maps_url: data.google_maps_url || settings.google_maps_url,
        instagram_username: data.instagram_username || settings.instagram_username,
        tiktok_username: data.tiktok_username || settings.tiktok_username
      };
    }
  } catch (err) {
    // Fail silently, use defaults
  }

  const cleanWaNumber = settings.whatsapp_number.replace(/[^0-9]/g, "");
  const waFormatted = cleanWaNumber.startsWith("0") 
    ? `62${cleanWaNumber.substring(1)}` 
    : cleanWaNumber.startsWith("62") 
      ? cleanWaNumber 
      : `62${cleanWaNumber}`;
  
  const whatsappUrl = `https://wa.me/${waFormatted}?text=Halo%20DonCyco%20Store%2C%20mau%20tanya-tanya%20tentang%20toko%20dan%20stok%20fisik%20dong!`;

  return (
    <div className="bg-brand-dark min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-brand-magenta uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-1.5 rounded-full inline-block mb-4">
          Est. 2010 • Semarang
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-wider mb-4">
          Sejarah DonCyco Store
        </h1>
        <p className="text-sm sm:text-base text-white/60 font-body leading-relaxed">
          Lebih dari sekadar toko, kami adalah ruang kurasi fisik untuk merawat memori, rilisan fisik analog, dan rilisan pop-kultur antik.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Story Section */}
        <div className="lg:col-span-7 space-y-8 font-body leading-relaxed text-white/80">
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
              Berawal Dari Lapak Jalanan
            </h2>
            <p>
              Perjalanan DonCyco Store dimulai pada tahun **2010** di Semarang. Awalnya, kami bukanlah toko fisik berskala rapi. Kami memulai langkah dari gigs musik independen kecil, menjajakan kaset-kaset pita lokal dan piringan hitam koleksi pribadi dari satu panggung bawah tanah ke panggung lainnya.
            </p>
            <p>
              Bagi kami, musik adalah medium fisik yang harus disentuh. Ada kesenangan magis yang hilang dari algoritma streaming digital: mengamati sampul album berukuran penuh, membaca catatan liner (*liner notes*) di buklet, mencium aroma kertas kaset pita vintage, dan mendengarkan suara gesekan jarum piringan hitam yang hangat.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
              Markas Katalog Sejak 2016
            </h2>
            <p>
              Seiring bertumbuhnya antusiasme kolektor di Jawa Tengah, pada tahun **2016** kami menetapkan fokus penuh untuk mengelola katalog rilisan fisik secara profesional berbasis di Semarang. Kami menyaring dan menguji kelayakan fisik setiap item, memastikan piringan hitam, kaset pita, dan CD yang kami jual dalam kondisi terbaik untuk dimainkan.
            </p>
            <p>
              Kini, kami mengurasi ratusan rilisan fisik lintas genre—mulai dari classic Rock, Jazz, Heavy Metal, hingga Pop, baik rilisan lokal legendaris Indonesia maupun pressing impor internasional langka. Kami juga menyediakan action figure orisinal berlisensi resmi dan merchandise band vintage bagi para kolektor pop-kultur.
            </p>
          </div>
        </div>

        {/* Info Cards Sidebar */}
        <div className="lg:col-span-5 space-y-8">
          {/* Card: Jam Buka & Kontak */}
          <div className="glass-card p-8 rounded-[24px] border border-white/10 space-y-6">
            <h3 className="font-display text-lg font-bold text-brand-neon uppercase tracking-wider border-b border-white/5 pb-3">
              Informasi Toko
            </h3>
            
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-coral shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Jam Operasional</p>
                  <p className="text-white/60">Setiap Hari: 12:00 - 21:00 WIB</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-neon shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">WhatsApp Kontak</p>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-neon transition-colors">
                    {settings.whatsapp_number}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Alamat Toko</p>
                  <p className="text-white/60">Semarang, Jawa Tengah, Indonesia</p>
                </div>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-brand-neon text-brand-dark hover:bg-[#d4e540] font-display text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(226,251,97,0.2)]"
              >
                <MessageCircle size={16} /> Hubungi Kami via WhatsApp
              </a>
            </div>
          </div>

          {/* Card: Peta Google Maps */}
          <div className="glass-card p-8 rounded-[24px] border border-white/10 space-y-6">
            <h3 className="font-display text-lg font-bold text-brand-cyan uppercase tracking-wider border-b border-white/5 pb-3">
              Kunjungi Markas Kami
            </h3>
            <p className="text-xs text-white/60 leading-relaxed font-body">
              Mari bertamu untuk *digging* kaset pita vintage orisinal, piringan hitam (vinyl), serta CD koleksi terbaik secara langsung. 
            </p>
            <a
              href={settings.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 border border-white/20 hover:border-brand-cyan hover:text-brand-cyan text-xs font-semibold rounded-xl uppercase tracking-wider transition-all duration-300"
            >
              Buka Peta Lokasi Google Maps <ArrowRight size={14} />
            </a>

            <div 
              className="w-full h-64 rounded-xl overflow-hidden border border-white/10 relative"
              style={{
                filter: "invert(90%) hue-rotate(180deg) grayscale(100%) contrast(120%)",
              }}
            >
              <iframe
                title="DonCyco Store Live Map"
                src="https://maps.google.com/maps?q=-7.0169034,110.4716076&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
