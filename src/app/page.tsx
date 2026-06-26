import React from "react";
import Link from "next/link";
import { Disc, Music, Layers, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";
import SoundwavePattern from "@/components/SoundwavePattern";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Revalidate page every minute

export default async function Home() {
  // Fetch WhatsApp number from store_settings dynamically
  let whatsappNumber = "0821-3570-5325";
  try {
    const { data } = await supabase
      .from("store_settings")
      .select("whatsapp_number")
      .single();
    if (data && data.whatsapp_number) {
      whatsappNumber = data.whatsapp_number;
    }
  } catch (err) {
    console.warn("Could not fetch whatsapp number for home CTA, using default.");
  }

  // Format WA link
  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const waFormatted = cleanWaNumber.startsWith("0") 
    ? `62${cleanWaNumber.substring(1)}` 
    : cleanWaNumber.startsWith("62") 
      ? cleanWaNumber 
      : `62${cleanWaNumber}`;
  
  const whatsappUrl = `https://wa.me/${waFormatted}?text=Halo%20DonCyco%20Store%2C%20gw%20lihat%20website%20dan%20tertarik%20tanya%20stok%20koleksi%20terbaru%20dong!`;

  const categories = [
    {
      name: "Vinyl (Piringan Hitam)",
      slug: "vinyl",
      icon: <Disc className="w-8 h-8 text-brand-magenta" />,
      description: "Harta karun analog format besar. Rilisan klasik lokal legendaris hingga pressing impor modern.",
      accentClass: "hover:border-brand-magenta/40 hover:shadow-[0_8px_30px_rgb(183,19,113,0.15)]",
    },
    {
      name: "Kaset Pita",
      slug: "kaset",
      icon: <Music className="w-8 h-8 text-brand-coral" />,
      description: "Vibe retro pita magnetik saku. Rilisan album vintage orisinal dan koleksi tape bawah tanah.",
      accentClass: "hover:border-brand-coral/40 hover:shadow-[0_8px_30px_rgb(240,128,8,0.15)]",
    },
    {
      name: "CD (Compact Disc)",
      slug: "cd",
      icon: <Layers className="w-8 h-8 text-brand-cyan" />,
      description: "Audio digital murni era keemasan 90-an & 2000-an. Album esensial dalam kondisi terawat.",
      accentClass: "hover:border-brand-cyan/40 hover:shadow-[0_8px_30px_rgb(0,188,212,0.15)]",
    },
    {
      name: "Action Figure",
      slug: "action_figure",
      icon: <ShieldCheck className="w-8 h-8 text-brand-neon" />,
      description: "Memorabilia pop culture langka dan merchandise band berlisensi resmi untuk dipajang.",
      accentClass: "hover:border-brand-neon/45 hover:shadow-[0_8px_30px_rgb(226,251,97,0.15)]",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-brand-dark min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <SoundwavePattern />
        
        <div className="relative max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-brand-neon mb-8 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-brand-neon"></span>
            Katalog Fisik Musik Vintage • Est. 2010
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-wide leading-[1.1] mb-6 max-w-4xl text-balance">
            SURGA RILISAN FISIK & VINTAGE COLLECTIBLES
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/70 font-body max-w-2xl leading-relaxed mb-12 text-balance">
            Mengurasi piringan hitam, kaset pita, CD, dan memorabilia pop culture/merchandise band vintage untuk para penikmat musik sejati. Berakar dari skena bawah tanah Yogyakarta.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            <Link
              href="/katalog"
              id="cta-katalog-hero"
              className="w-full sm:w-auto px-8 py-4 bg-brand-neon text-brand-dark font-display text-base font-bold rounded-full border-2 border-brand-neon hover:bg-[#d4e540] hover:border-[#d4e540] transition-all duration-300 text-center shadow-[0_8px_16px_rgba(226,251,97,0.3)] hover:scale-[1.02]"
            >
              Eksplor Katalog
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="cta-whatsapp-hero"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-body text-base font-semibold hover:underline flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} className="text-brand-neon" />
              Tanya Koleksi via WA
            </a>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PREVIEW GRID */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wider text-white mb-2">
              Koleksi Rilisan Fisik
            </h2>
            <p className="text-sm sm:text-base text-white/50 font-body">
              Temukan media musik favoritmu dalam kondisi terbaik, terkurasi oleh kolektor berpengalaman.
            </p>
          </div>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 text-brand-neon font-semibold text-sm hover:translate-x-1.5 transition-transform duration-300 uppercase tracking-widest"
          >
            Lihat Semua Produk <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/katalog?category=${cat.slug}`}
              id={`cat-card-${cat.slug}`}
              className={`glass-card p-8 rounded-[24px] border border-white/10 flex flex-col justify-between h-[300px] transition-all duration-300 ${cat.accentClass} group`}
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-brand-neon transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed font-body">
                  {cat.description}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-brand-neon font-bold uppercase tracking-widest pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Jelajahi <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. SNIPPET ABOUT & INTERACTIVE SPINNING VINYL */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* About Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold text-brand-magenta uppercase tracking-widest">
              Kisah DonCyco Store
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider leading-[1.2]">
              DARI LAPAK GIGS KE GIGS SEJAK 2010
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed font-body">
              <p>
                Perjalanan DonCyco Store berakar dari kecintaan mendalam pada budaya musik fisik. Lahir di tahun 2010, kami memulai peruntungan sebagai pelapak kecil berpindah-pindah di sela-sela pertunjukan musik lokal di Yogyakarta. Kami percaya rilisan fisik menawarkan pengalaman intim yang tak tergantikan oleh streaming digital.
              </p>
              <p>
                Sejak tahun 2016, DonCyco bertransformasi penuh menjadi katalog musik vintage terpercaya. Kami memprioritaskan kualitas pressing, kelengkapan buklet, dan keaslian rilisan. Koleksi kami meliputi piringan hitam legendaris, pita kaset vintage langka, CD audio retro, hingga merchandise band resmi dan action figure kolektibel.
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/about"
                id="cta-about-more"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-brand-magenta hover:text-brand-magenta text-sm font-semibold rounded-md uppercase tracking-wider transition-all duration-300"
              >
                Selengkapnya Tentang Kami
              </Link>
            </div>
          </div>

          {/* Interactive CSS Spinning Vinyl Record */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-[320px] h-[320px] flex items-center justify-center group cursor-pointer">
              {/* Turntable needle/tonearm arm (fixed visual accent) */}
              <div className="absolute top-[-30px] right-[40px] w-24 h-48 pointer-events-none z-20 origin-top-right transition-transform duration-700 group-hover:-rotate-12">
                <svg width="96" height="192" viewBox="0 0 96 192" fill="none" xmlns="http://www.w3.org/1900/svg">
                  <path d="M72 12C72 12 40 40 40 96V172" stroke="#6B6375" strokeWidth="6" strokeLinecap="round"/>
                  <rect x="32" y="166" width="16" height="20" rx="3" fill="#E2FB61"/>
                  <circle cx="72" cy="12" r="10" fill="#B71371" stroke="#FFFFFF" strokeWidth="2"/>
                </svg>
              </div>

              {/* Vinyl Disk outer circle */}
              <div className="w-[300px] h-[300px] rounded-full bg-[#0d0d0d] border-[4px] border-[#1a1a1a] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(0,0,0,0.9)] flex items-center justify-center relative overflow-hidden animate-spin-slow group-hover:[animation-play-state:paused] transition-all duration-300">
                {/* Grooves effect inside vinyl */}
                <div className="absolute inset-4 rounded-full border border-white/5 opacity-40"></div>
                <div className="absolute inset-8 rounded-full border border-white/5 opacity-35"></div>
                <div className="absolute inset-12 rounded-full border border-white/5 opacity-30"></div>
                <div className="absolute inset-16 rounded-full border border-white/5 opacity-25"></div>
                <div className="absolute inset-20 rounded-full border border-white/5 opacity-20"></div>
                <div className="absolute inset-24 rounded-full border border-white/5 opacity-15"></div>

                {/* Inner Label */}
                <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-tr from-brand-magenta to-brand-coral border-4 border-black flex flex-col items-center justify-center text-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]">
                  <span className="text-[10px] font-display font-bold tracking-widest text-white leading-none">DONCYCO</span>
                  <span className="text-[6px] tracking-widest text-brand-neon uppercase font-bold mt-1">EST. 2010</span>
                  <span className="text-[5px] text-white/70 font-semibold mt-1">33 RPM</span>
                </div>

                {/* Spindle hole */}
                <div className="absolute w-[12px] h-[12px] rounded-full bg-black border border-white/20 z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHATSAPP CTA BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-[36px] overflow-hidden bg-gradient-to-r from-brand-magenta to-brand-coral p-8 sm:p-12 md:p-16 border border-white/20 shadow-[0_20px_50px_rgba(183,19,113,0.3)]">
          {/* Subtle concentric rings overlay inside banner */}
          <div className="absolute -top-24 -right-24 w-[350px] h-[350px] rounded-full border border-white/10 pointer-events-none"></div>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-xs font-semibold text-brand-neon uppercase tracking-widest bg-black/35 px-4 py-1.5 rounded-full inline-block">
              Request Rilisan Fisik
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider leading-none text-white">
              CARI RILISAN IMPIAN YANG BELUM ADA DI KATALOG?
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-body max-w-2xl">
              Hubungi tim kurator DonCyco Store langsung via WhatsApp. Kami bantu lacak rilisan fisik impor/lokal langka favoritmu, atau tanya langsung ketersediaan stok offline terupdate.
            </p>
            <div className="pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-whatsapp-banner"
                className="inline-flex items-center gap-3 px-8 py-4 bg-brand-neon text-brand-dark font-display text-base font-bold rounded-full hover:bg-white hover:text-brand-dark transition-all duration-300 shadow-[0_8px_16px_rgba(226,251,97,0.3)] hover:scale-[1.02]"
              >
                <MessageCircle size={22} className="fill-current" />
                Tanya Stok via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
