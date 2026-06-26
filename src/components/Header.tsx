"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Disc } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/85 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-2">
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
            <Link
              href="/admin"
              className="ml-4 px-4 py-2 border border-brand-magenta text-white hover:bg-brand-magenta hover:text-white rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            >
              CMS Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
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

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 top-[72px] bg-black z-40 md:hidden transition-transform duration-300 ease-in-out border-t border-white/10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-8 gap-6 h-full justify-between pb-24">
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
            <hr className="border-white/10 my-2" />
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold tracking-wider uppercase text-brand-magenta flex items-center gap-3"
            >
              CMS Admin Dashboard
            </Link>
          </nav>

          <div className="text-center text-xs text-white/40 border-t border-white/5 pt-6">
            <p>DONCYCO STORE © {new Date().getFullYear()}</p>
            <p className="mt-1 font-semibold text-brand-neon/60">
              EST. 2010 • YOGYAKARTA
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
