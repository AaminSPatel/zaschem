"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/data/siteData";
import { motion, AnimatePresence } from "framer-motion";

import ServiceLinksClient from '@/components/common/ServiceLinksClient';
import { localServiceLinks } from '@/components/common/ServiceLinks';

const baseNavLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: null,
  },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-2.5 bg-[#001a35] border-b border-white/5 text-xs text-gray-300 font-mono">
        <div className="flex items-center gap-6">
          <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 hover:text-[#f77f00] transition-colors">
            <Phone size={12} className="text-[#f77f00]" /> {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-[#64dfdf] transition-colors">
            <Mail size={12} className="text-[#64dfdf]" /> {siteConfig.email}
          </a>
        </div>
        <div className="flex items-center gap-2 text-[#64dfdf] font-bold tracking-wider">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          AVAILABLE FOR NEW PROJECTS
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#001a35]/95 backdrop-blur-md shadow-xl border-b border-white/10" : "bg-[#002147]"}`}>
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group z-10" onClick={() => setMobileOpen(false)}>
<img src="/logo_1.avif" alt="Zaschem India" loading="lazy" width={400} height={200} className="h-14 w-auto object-contain" />
          </Link>

          {/* Nav Links */}
          <ServiceLinksClient localLinks={localServiceLinks}>
            {(serviceLinks) => (
              <ul className="hidden lg:flex items-center gap-2 h-full">
                {baseNavLinks.map((link) => {
                  const isServices = link.label === 'Services';
                  const effectiveChildren = isServices ? serviceLinks : link.children;

                  return (
                    <li
                      key={link.href}
                      className="relative w-26 h-full flex items-center"
                      onMouseEnter={() => effectiveChildren && setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link href={link.href} className="flex w-full justify-center items-center gap-1 px-2 h-full font-display font-bold text-xs tracking-widest text-white hover:text-[#64dfdf] transition-colors uppercase relative group">
                        {link.label}
                        {effectiveChildren && (
                          <ChevronDown size={16} className={`transition-transform  w-8 duration-200 ${activeDropdown === link.label ? "rotate-180 text-[#f77f00]" : ""}`} />
                        )}
                        <span className="absolute bottom-0 scale-x-0  w-26 left-0 h-0.5 bg-[#f77f00]  group-hover:scale-x-100 transition-transform origin-left" />
                      </Link>

                      <AnimatePresence>
                        {effectiveChildren && activeDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            className="absolute top-full left-0 w-72 bg-[#002147] border border-white/10 shadow-2xl z-50 py-3 rounded-sm"
                          >
                            {effectiveChildren.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="flex items-center gap-3 px-6 py-3 text-xs font-bold tracking-wider uppercase text-gray-300 hover:text-white hover:bg-[#001a35]/60 transition-all border-l-2 border-transparent hover:border-[#f77f00]"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            )}
          </ServiceLinksClient>

          {/* Action Area */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden lg:inline-block bg-[#f77f00] hover:bg-[#fcbf49] text-white hover:text-[#002147] font-mono font-bold text-xs tracking-widest py-3 px-6 transition-all duration-300 shadow-md">
              GET QUOTE
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-11 h-11 flex items-center justify-center text-white bg-[#004080]/40 border border-white/10 z-10 rounded-sm" aria-label="Toggle menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#001a35]/80 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-[#001a35] border-l border-white/10 z-50 lg:hidden flex flex-col overflow-y-auto text-white">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span className="font-display font-black text-lg tracking-widest text-[#fcbf49]">ZASCHEM</span>
                <button onClick={() => setMobileOpen(false)} className="w-10 h-10 flex items-center justify-center text-gray-300 border border-white/10 rounded-sm"><X size={20} /></button>
              </div>

              <ServiceLinksClient localLinks={localServiceLinks}>
                {(serviceLinks) => (
                  <div className="flex-1 py-6 px-4">
                    {baseNavLinks.map((link) => {
                      const isServices = link.label === 'Services';
                      const effectiveChildren = isServices ? serviceLinks : link.children;

                      return (
                        <div key={link.href} className="mb-2">
                          <div className="flex items-center justify-between">
                            <Link
                              href={link.href}
                              onClick={() => !effectiveChildren && setMobileOpen(false)}
                              className="flex-1 py-3 px-3 font-display font-bold text-sm tracking-widest text-gray-300 uppercase hover:text-[#fcbf49] transition-colors"
                            >
                              {link.label}
                            </Link>
                            {effectiveChildren && (
                              <button
                                onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                                className="w-11 h-11 flex items-center justify-center text-gray-300"
                              >
                                <ChevronDown size={18} className={`transition-transform ${mobileExpanded === link.label ? "rotate-180 text-[#64dfdf]" : ""}`} />
                              </button>
                            )}
                          </div>
                          {effectiveChildren && mobileExpanded === link.label && (
                            <div className="ml-4 pl-4 border-l border-[#64dfdf]/30 space-y-1 my-1">
                              {effectiveChildren.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block py-2.5 text-xs font-semibold tracking-wide text-gray-300 hover:text-[#fcbf49] uppercase"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </ServiceLinksClient>

              <div className="p-6 border-t border-white/10">
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="block w-full text-center bg-[#f77f00] hover:bg-[#fcbf49] text-white hover:text-[#002147] py-4 text-xs font-mono font-bold tracking-widest transition-colors rounded-sm shadow-md">GET FREE QUOTE</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}