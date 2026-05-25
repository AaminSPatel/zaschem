import Link from 'next/link';
import { ArrowRight, Droplets, Building2, Wrench, FlaskConical, Layers, Waves, Sun, Shield } from 'lucide-react';
import { services } from '@/app/data/siteData';
import CTABanner from '@/components/sections/CTABanner';

export const metadata = {
  title: 'Industrial Waterproofing & Protection Services India',
  description: 'Comprehensive industrial waterproofing, structural strengthening, acid resistant lining, polyurea coating, PU waterproofing, and industrial flooring services across India.',
  keywords: 'industrial waterproofing services India, structural repair, acid resistant coating, polyurea waterproofing, industrial flooring contractors',
  alternates: { canonical: 'https://www.zaschem.in/services' },
};

const iconMap = { Droplets, Building2, Wrench, FlaskConical, Layers, Waves, Sun, Shield };

export default function ServicesPage() {
  return (
    <div className="bg-brand-dark">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-4">WHAT WE DO</div>
          <h1 className="font-display font-black text-5xl md:text-6xl text-on-bg tracking-tight leading-none mb-4">
            INDUSTRIAL PROTECTION<br /><span className="text-brand-blue">SERVICES</span>
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl">
            Comprehensive waterproofing, rehabilitation, and protective coating solutions engineered for India&apos;s most demanding industrial environments. Every service backed by certified applicators and decade-long warranties.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Droplets;
              return (
                <Link key={service.id} href={`/services/${service.slug}`}
                  className="card-industrial p-7 group hover:border-brand-blue/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-6 group-hover:bg-brand-blue/20 transition-colors">
                    <Icon size={26} className="text-brand-blue" />
                  </div>
                  <h2 className="font-display font-bold text-xl text-on-bg tracking-wide mb-3 group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-brand-muted text-sm leading-relaxed mb-5">{service.shortDesc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {service.features.slice(0, 4).map((f) => (
                      <span key={f} className="px-2 py-0.5 bg-brand-darker border border-brand-border text-xs text-brand-muted font-mono">{f}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-brand-blue text-sm font-display font-semibold tracking-wide group-hover:gap-3 transition-all">
                    LEARN MORE <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}