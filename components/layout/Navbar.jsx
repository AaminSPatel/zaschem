"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/app/data/siteData";
import { motion, AnimatePresence } from "framer-motion";
import ThemeButtons from "../theme/ThemeButtons";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Waterproofing Systems",
        href: "/services/waterproofing-systems",
      },
      {
        label: "Structural Strengthening",
        href: "/services/structural-strengthening",
      },
      {
        label: "Repair & Rehabilitation",
        href: "/services/repair-rehabilitation",
      },
      {
        label: "Acid Resistant Lining",
        href: "/services/acid-resistant-lining",
      },
      { label: "Industrial Flooring", href: "/services/industrial-flooring" },
      {
        label: "Polyurea Waterproofing",
        href: "/services/polyurea-waterproofing",
      },
      {
        label: "Heat Reflective Coating",
        href: "/services/heat-reflective-coating",
      },
      { label: "PU Waterproofing", href: "/services/pu-waterproofing" },
    ],
  },
/*   { label: "Products", href: "/products" },
 */  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null); // for mobile sub-menu

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleMobileExpand = (label) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  return (
    <>
      {/* Top bar — desktop only */}
      <div className="hidden lg:flex items-center justify-between px-8 py-2 bg-brand-darker border-b border-brand-border text-xs text-brand-muted">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-1.5 hover:text-brand-orange transition-colors"
          >
            <Phone size={11} className="text-brand-orange" /> {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-1.5 hover:text-brand-blue transition-colors"
          >
            <Mail size={11} className="text-brand-blue" /> {siteConfig.email}
          </a>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-brand-blue">
          <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          AVAILABLE FOR NEW PROJECTS
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-darker/32 backdrop-blur-md shadow-lg shadow-black/40 border-b border-brand-border"
            : "bg-brand-dark backdrop-blur-sm"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex gap-4 leading-tight group z-10"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src="/logo_1.avif"
              alt="Zaschem India PVT LTD - BUILDING THE FUTURE TOGETHER"
              className="h-12 w-42"
            />
            <div className="flex hidden flex-col ">
              <span className="font-display font-black text-xl lg:text-2xl tracking-widest text-on-bg group-hover:text-brand-blue transition-colors" sr-only='true'>
                ZasChem
              </span>
              <span className="font-mono text-[9px] tracking-[0.3em] text-brand-orange">
                INDIA PVT. LTD.
              </span>
            </div>{" "}
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center">
            {navLinks.map((link) => (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() =>
                  link.children && setActiveDropdown(link.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-5 font-display font-semibold text-sm tracking-wider text-on-bg hover:text-on-bg transition-colors uppercase relative group"
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180 text-brand-blue" : ""}`}
                    />
                  )}
                  <span className="absolute bottom-3 left-4 right-4 h-0.5 bg-brand-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>

                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-64 bg-brand-card border border-brand-border shadow-2xl shadow-black/70 z-50 py-2"
                    >
                      <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-brand-blue to-transparent" />
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-2 px-5 py-2.5 text-sm text-brand-muted hover:text-on-bg hover:bg-brand-border/50 hover:pl-7 transition-all font-body"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="w-1 h-1 bg-brand-orange rounded-full flex-shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="m-0 p-0 hidden lg:flex">
              <Link href="/contact" className="btn-primary text-sm py-2.5 px-5">
                GET QUOTE
              </Link>
            </div>

            <ThemeButtons />

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-on-bg bg-brand-card border border-brand-border hover:border-brand-blue transition-colors z-10"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-darker/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-brand-darker border-l border-brand-border z-50 lg:hidden flex flex-col overflow-y-auto"
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border flex-shrink-0">
                <div>
                  <p className="font-display font-black text-lg tracking-widest text-on-bg">
                    ZasChem
                  </p>
                  <p className="font-mono text-[9px] tracking-[0.3em] text-brand-orange">
                    INDIA PVT. LTD.
                  </p>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center text-brand-muted hover:text-on-bg border border-brand-border hover:border-brand-blue transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Contact strip */}
              <div className="px-5 py-3 bg-brand-card border-b border-brand-border flex-shrink-0">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-2 text-xs text-brand-muted hover:text-on-bg transition-colors mb-1.5"
                >
                  <Phone size={11} className="text-brand-orange" />{" "}
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-xs text-brand-muted hover:text-on-bg transition-colors"
                >
                  <Mail size={11} className="text-brand-blue" />{" "}
                  {siteConfig.email}
                </a>
              </div>

              {/* Nav links */}
              <div className="flex-1 py-4 px-3">
                {navLinks.map((link, i) => (
                  <div key={link.href}>
                    <div className="flex items-center">
                      <Link
                        href={link.href}
                        onClick={() => {
                          if (!link.children) setMobileOpen(false);
                        }}
                        className="flex-1 flex items-center py-3 px-3 font-display font-bold tracking-wider text-brand-muted hover:text-on-bg hover:bg-brand-card transition-all uppercase text-sm rounded-sm"
                      >
                        {link.label}
                      </Link>
                      {link.children && (
                        <button
                          onClick={() => toggleMobileExpand(link.label)}
                          className="w-10 h-10 flex items-center justify-center text-brand-muted hover:text-on-bg transition-colors"
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${mobileExpanded === link.label ? "rotate-180 text-brand-blue" : ""}`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile dropdown */}
                    <AnimatePresence>
                      {link.children && mobileExpanded === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-3 pl-4 border-l-2 border-brand-blue/40 mb-2 space-y-0.5">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 py-2.5 px-3 text-xs text-brand-muted hover:text-brand-blue hover:bg-brand-card transition-all rounded-sm"
                              >
                                <span className="w-1 h-1 bg-brand-orange rounded-full flex-shrink-0" />
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {i < navLinks.length - 1 && (
                      <div className="h-px bg-brand-border mx-3" />
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="px-5 py-5 border-t border-brand-border flex-shrink-0 space-y-3">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                >
                  GET FREE QUOTE
                </Link>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="btn-secondary w-full flex items-center justify-center gap-2 py-3 text-sm"
                >
                  <Phone size={14} /> CALL NOW
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
