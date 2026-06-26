"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Disc, Lock, Mail, AlertCircle, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace("/admin");
      } else {
        setCheckingSession(false);
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message || "Gagal masuk. Periksa email dan password Anda.");
      } else if (data.session) {
        router.replace("/admin");
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan sistem. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-white">
        <Disc className="w-12 h-12 text-brand-magenta animate-spin-slow mb-4" />
        <p className="text-sm font-semibold tracking-wider text-white/60 uppercase">Memeriksa Sesi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-brand-dark relative">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-magenta/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-brand-cyan/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="w-full max-w-md glass-card p-8 sm:p-10 rounded-[30px] border border-white/15 relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-16 h-16 overflow-hidden rounded-full border border-brand-magenta/50 mb-4">
            <Image
              src="/logo.png"
              alt="DonCyco Store Logo"
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-wider text-white uppercase">
            Admin CMS Login
          </h1>
          <p className="text-xs text-white/50 font-body mt-1">
            DonCyco Store Catalog Management System
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/35 text-red-400 text-sm flex items-start gap-3">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p className="font-body leading-relaxed">{errorMsg}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-white/70">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/40">
                <Mail size={18} />
              </span>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dontcyco.com"
                className="w-full h-12 pl-11 pr-4 bg-black/40 border border-white/10 rounded-xl text-white font-body placeholder-white/20 focus:outline-none focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 transition-all duration-300 text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-widest text-white/70">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/40">
                <Lock size={18} />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 pl-11 pr-11 bg-black/40 border border-white/10 rounded-xl text-white font-body placeholder-white/20 focus:outline-none focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 transition-all duration-300 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 mt-4 bg-brand-neon text-brand-dark font-display text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-[#d4e540] disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_4px_12px_rgba(226,251,97,0.2)] hover:scale-[1.01]"
          >
            {loading ? "Menghubungkan..." : "Masuk ke Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
