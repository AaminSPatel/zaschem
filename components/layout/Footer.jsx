import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight, Shield } from "lucide-react";

import { siteConfig } from "@/app/data/siteData";

const services = [
  { label: "Waterproofing Systems", href: "/services/waterproofing-systems" },
  {
    label: "Structural Strengthening",
    href: "/services/structural-strengthening",
  },
  { label: "Repair & Rehabilitation", href: "/services/repair-rehabilitation" },
  { label: "Acid Resistant Lining", href: "/services/acid-resistant-lining" },
  { label: "Industrial Flooring", href: "/services/industrial-flooring" },
  { label: "Polyurea Waterproofing", href: "/services/polyurea-waterproofing" },
  {
    label: "Heat Reflective Coating",
    href: "/services/heat-reflective-coating",
  },
  { label: "PU Waterproofing", href: "/services/pu-waterproofing" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-darker text-brand-light border-t border-brand-border relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

      {/* CTA strip */}
      <div className="relative bg-gradient-to-r from-brand-blue/20 via-brand-blue/10 to-transparent border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-xl text-on-bg tracking-wide">
              READY TO PROTECT YOUR INFRASTRUCTURE?
            </p>
            <p className="text-brand-muted text-sm mt-1">
              Get a technical consultation from our engineering team.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary whitespace-nowrap flex-shrink-0"
          >
            GET FREE CONSULTATION
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <img
              src="/logo_1.avif"
              alt="Zaschem India PVT LTD - BUILDING THE FUTURE TOGETHER"
              aria-description="India's trusted specialist in industrial waterproofing, infrastructure protection, and structural rehabilitation. Serving power plants, tunnels, dams, and industrial facilities for 14+ years."
              className="h-12 w-42"
            />
          </div>

          <p className="text-brand-muted text-sm leading-relaxed mb-6">
            India&apos;s trusted specialist in industrial waterproofing,
            infrastructure protection, and structural rehabilitation. Serving
            power plants, tunnels, dams, and industrial facilities for 14+
            years.
          </p>

          {/* Social icons removed (your lucide-react version doesn't export them: Facebook/Linkedin/Twitter/Youtube) */}
          <div className="flex gap-3" />
        </div>

        {/* Services */}
        <div>
          <h3 className="font-display font-bold text-on-bg tracking-wider uppercase mb-5 flex items-center gap-2">
            <span className="w-4 h-0.5 bg-brand-orange" /> Services
          </h3>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="flex items-center gap-2 text-sm text-brand-muted hover:text-on-bg hover:translate-x-1 transition-all group"
                >
                  <ArrowRight
                    size={12}
                    className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-display font-bold text-on-bg tracking-wider uppercase mb-5 flex items-center gap-2">
            <span className="w-4 h-0.5 bg-brand-orange" /> Quick Links
          </h3>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex items-center gap-2 text-sm text-brand-muted hover:text-on-bg hover:translate-x-1 transition-all group"
                >
                  <ArrowRight
                    size={12}
                    className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h3 className="font-display font-bold text-on-bg tracking-wider uppercase mb-3 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-brand-orange" /> Certifications
            </h3>
            <div className="flex flex-col gap-2">
              {[
                "ISO 9001:2015 Certified",
                "OHSAS 18001",
                "Approved Contractors",
              ].map((cert) => (
                <span
                  key={cert}
                  className="flex items-center gap-2 text-xs text-brand-muted"
                >
                  <Shield size={11} className="text-brand-blue" /> {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display font-bold text-on-bg tracking-wider uppercase mb-5 flex items-center gap-2">
            <span className="w-4 h-0.5 bg-brand-orange" /> Contact Us
          </h3>

          <div className="space-y-4">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-start gap-3 text-sm text-brand-muted hover:text-on-bg transition-colors group"
            >
              <Phone
                size={15}
                className="text-brand-orange mt-0.5 flex-shrink-0"
              />
              <span>{siteConfig.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-start gap-3 text-sm text-brand-muted hover:text-on-bg transition-colors group"
            >
              <Mail
                size={15}
                className="text-brand-blue mt-0.5 flex-shrink-0"
              />
              <span>{siteConfig.email}</span>
            </a>
            <div className="flex items-start gap-3 text-sm text-brand-muted">
              <MapPin
                size={15}
                className="text-brand-orange mt-0.5 flex-shrink-0"
              />
              <span>{siteConfig.address}</span>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-mono text-xs text-brand-muted mb-3 tracking-wider">
              SERVICE AREAS
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Delhi",
                "Noida",
                "Ranchi",
                "Cuttack",
                "Hyderabad",
                "Mumbai",
              ].map((city) => (
                <span
                  key={city}
                  className="px-2 py-1 bg-brand-card border border-brand-border text-xs text-brand-muted"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
          <p>© {year} ZasChem India Pvt. Ltd. All rights reserved.</p>
          <p className="font-mono">BUILDING THE FUTURE TOGETHER</p>
        </div>
      </div>
    </footer>
  );
}
