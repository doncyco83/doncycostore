"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Disc } from "lucide-react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let authListener: any = null;

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setHasSession(true);
          setLoading(false);
        } else {
          // No session found, redirect to login
          router.replace("/admin/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.replace("/admin/login");
      }
    };

    checkSession();

    // Listen for auth state changes (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setHasSession(true);
        setLoading(false);
      } else {
        setHasSession(false);
        // Only trigger redirect on explicit sign-out or session end
        if (event === "SIGNED_OUT") {
          router.replace("/admin/login");
        }
      }
    });

    authListener = subscription;

    return () => {
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-white">
        <Disc className="w-12 h-12 text-brand-magenta animate-spin-slow mb-4" />
        <p className="text-sm font-semibold tracking-wider text-white/60 uppercase">Memuat Sesi Admin...</p>
      </div>
    );
  }

  return hasSession ? <>{children}</> : null;
}
