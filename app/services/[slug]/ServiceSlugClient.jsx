"use client";

import Link from 'next/link';

import CTABanner from '@/components/sections/CTABanner';

import { CheckCircle, ArrowRight, Phone, ChevronRight } from 'lucide-react';

export default function ServiceDetailPageClient({ service, related }) {
  if (!service) return null;

  return (
    <div className="bg-brand-dark min-h-screen">
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/70 to-brand-dark/60" />
          <div className="absolute inset-0 grid-lines opacity-20" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-brand-muted mb-6 font-mono">
            <Link href="/" className="hover:text-brand-blue transition-colors">
              HOME
            </Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-brand-blue transition-colors">
              SERVICES
            </Link>
            <ChevronRight size={12} />
            <span className="text-brand-orange">{service.title.toUpperCase()}</span>
          </nav>

          <div className="section-label mb-4">SERVICE DETAIL</div>

          <h1 className="font-display font-black text-5xl md:text-7xl text-on-bg tracking-tight leading-none mb-4">
            {service.title.split(' ').map((w, i) => (
              <span key={i} className={i % 4 === 1 ? 'text-brand-blue' : 'text-on-bg'}>
                {w}{' '}
              </span>
            ))}
          </h1>

          <p className="text-brand-muted text-lg max-w-2xl">{service.shortDesc}</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT: Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <h2 className="font-display font-black text-3xl text-on-bg mb-5">OVERVIEW</h2>
              <div className="space-y-4 text-brand-muted leading-relaxed">
                {service.description.split('\n\n').map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="font-display font-black text-2xl text-on-bg mb-5">KEY FEATURES</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 p-4 bg-brand-card border border-brand-border"
                  >
                    <CheckCircle size={16} className="text-brand-blue flex-shrink-0" />
                    <span className="text-brand-light text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div>
              <h2 className="font-display font-black text-2xl text-on-bg mb-5">APPLICATIONS</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {service.applications.map((a) => (
                  <div
                    key={a}
                    className="p-4 bg-brand-card border border-brand-border border-l-2 border-l-brand-orange"
                  >
                    <span className="text-brand-light text-sm">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Content Block */}
            <div className="p-8 bg-brand-card border border-brand-border border-t-2 border-t-brand-blue">
              <h3 className="font-display font-bold text-xl text-on-bg mb-4">
                Why Choose ZasChem India for {service.title}?
              </h3>
              <div className="space-y-3 text-brand-muted text-sm leading-relaxed">
                <p>
                  ZasChem India brings 12+ years of specialized experience in {service.title.toLowerCase()}{' '}
                  to every project. Our engineering team conducts thorough site assessments before recommending the
                  optimal solution, ensuring compatibility with existing structures and long-term performance.
                </p>
                <p>
                  We deploy only certified applicators trained on international standards, use materials from globally
                  accredited manufacturers, and maintain rigorous quality control documentation throughout project
                  execution. Every {service.title.toLowerCase()} project is backed by a comprehensive warranty.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="card-industrial bg-brand-dark p-6 border-t-2 border-t-brand-blue md:sticky top-24">
              <h3 className="font-display font-bold text-lg text-on-bg mb-4">GET A QUOTE FOR THIS SERVICE</h3>
              <p className="text-brand-muted text-sm mb-6">
                Talk to our engineering team. Free technical consultation and site survey.
              </p>
              <Link
                href="/contact"
                className="btn-primary w-full flex items-center justify-center gap-2 mb-3"
              >
                REQUEST QUOTE <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+91-91-7004298988"
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <Phone size={15} /> CALL NOW
              </a>
              <div className="mt-6 pt-6 border-t border-brand-border space-y-2">
                {['Free Site Survey', '24hr Response', '10-Year Warranty', 'Pan-India Service'].map((b) => (
                  <div key={b} className="flex items-center gap-2 text-xs text-brand-muted">
                    <CheckCircle size={12} className="text-brand-blue" /> {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Other Services */}
            <div className="card-industrial p-6">
              <h3 className="font-display font-bold text-base text-on-bg mb-4">OTHER SERVICES</h3>
              <div className="space-y-2">
                {(related || []).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="flex items-center gap-2 p-3 hover:bg-brand-darker text-brand-muted hover:text-on-bg transition-all text-sm group"
                  >
                    <ArrowRight
                      size={12}
                      className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}

