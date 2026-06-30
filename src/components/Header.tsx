"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Disc, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { setIsCartOpen, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Katalog", href: "/katalog" },
    { name: "About", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isOpen
            ? "bg-transparent py-5"
            : isScrolled
              ? "bg-black/85 backdrop-blur-md border-b border-white/10 py-3"
              : "bg-transparent py-5"
        }`}
      >
        <div className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-brand-magenta/40 group-hover:border-brand-neon transition-colors duration-300">
                <Image
                  src="/logo.png"
                  alt="DonCyco Store Logo"
                  fill
                  priority
                  sizes="48px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <span className="font-display text-xl tracking-wider text-white block">
                  DONCYCO
                </span>
                <span className="text-[10px] text-brand-neon tracking-widest uppercase block -mt-1 font-semibold">
                  Vintage & Collectibles
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links & Cart */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
                      isActive(link.href)
                        ? "text-brand-neon font-bold"
                        : "text-white/80 hover:text-brand-neon"
                    }`}
                  >
                    {link.name}
                    {isActive(link.href) && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-neon" />
                    )}
                  </Link>
                ))}
              </nav>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-white hover:text-brand-neon p-2 focus:outline-none transition-colors duration-300"
                aria-label="Keranjang belanja"
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-magenta text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button & Cart */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-white hover:text-brand-neon p-2.5 focus:outline-none transition-colors"
                aria-label="Keranjang belanja mobile"
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-brand-magenta text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-brand-neon p-2 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col pt-28 px-8 pb-12 gap-6 h-full justify-between overflow-y-auto">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-bold tracking-wider uppercase flex items-center gap-3 ${
                  isActive(link.href) ? "text-brand-neon" : "text-white"
                }`}
              >
                <Disc
                  size={20}
                  className={`animate-spin-slow ${
                    isActive(link.href) ? "text-brand-neon" : "text-white/40"
                  }`}
                />
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="text-center text-xs text-white/40 border-t border-white/5 pt-6">
            <p>DONCYCO STORE © {new Date().getFullYear()}</p>
            <p className="mt-1 font-semibold text-brand-neon/60">
              EST. 2010 • SEMARANG
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
