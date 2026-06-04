'use client'
import Link from 'next/link';
import { ArrowRight, Droplets, Building2, Wrench, FlaskConical, Layers, Waves, Sun, Shield } from 'lucide-react';
import CTABanner from '@/components/sections/CTABanner';
import { fetchServices } from '@/lib/apiClient';
import { useEffect, useMemo, useState } from 'react';

/* export const metadata = {
  title: 'Industrial Waterproofing & Protection Services India',
  description: 'Comprehensive industrial waterproofing, structural strengthening, acid resistant lining, polyurea coating, PU waterproofing, and industrial flooring services across India.',
  keywords: 'industrial waterproofing services India, structural repair, acid resistant coating, polyurea waterproofing, industrial flooring contractors',
  alternates: { canonical: 'https://www.zaschem.in/services' },
  openGraph: {
    title: 'Industrial Waterproofing & Protection Services India',
    description: 'Comprehensive industrial waterproofing, rehabilitation, and protective coating solutions engineered for India\'s most demanding industrial environments.',
    url: 'https://www.zaschem.in/services',
    images: [{ url: '/logo.avif', width: 1200, height: 630, alt: 'ZasChem India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industrial Waterproofing & Protection Services India',
    description: 'Comprehensive industrial waterproofing, rehabilitation, and protective coating solutions engineered for India\'s most demanding industrial environments.',
    images: ['/logo.avif'],
  },
};
 */
const iconMap = { Droplets, Building2, Wrench, FlaskConical, Layers, Waves, Sun, Shield };

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetchServices();
        const data = res?.data ?? res;
        console.log('service data all',res.data);
        
        if (!mounted) return;
        setServices(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!mounted) return;
        setError(e?.message || 'Failed to load services');
        setServices([]);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const safeServices = useMemo(() => (Array.isArray(services) ? services : []), [services]);

  return (
    <div className="bg-brand-dark">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-4">WHAT WE DO</div>
          <h1 className="font-display font-black text-5xl md:text-6xl text-on-bg tracking-tight leading-none mb-4">
            INDUSTRIAL PROTECTION<br />
            <span className="text-brand-blue">SERVICES</span>
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl">
            Comprehensive waterproofing, rehabilitation, and protective coating solutions engineered for India&apos;s most demanding industrial environments. Every service backed by certified applicators and decade-long warranties.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {loading && (
            <div className="py-16 text-brand-muted">Loading services...</div>
          )}

          {!loading && error && (
            <div className="py-16 text-red-400">{error}</div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {safeServices.map((service) => (
                <Link
                  key={service._id || service.id || service.slug}
                  href={`/services/${service.slug}`}
                  className="group card-industrial overflow-hidden hover:border-brand-orange/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-orange/10"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image?.url || service.image || ''}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-brand-orange text-on-bg text-xs font-mono tracking-wider">
                        {service.title}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  </div>

                  <div className="p-6">
                    <p className="font-mono text-brand-orange text-xs tracking-[0.2em] mb-2">
                      {service.title}
                    </p>
                    <h2 className="font-display font-black text-xl text-on-bg mb-2 tracking-wide group-hover:text-brand-orange transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-brand-muted text-sm leading-relaxed mb-5 line-clamp-2">
                      {service.shortDesc}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-5 p-3 bg-brand-darker border border-brand-border">
                      {(service.features || []).slice(0, 2).map((f) => (
                        <div key={f}>
                          <p className="text-brand-muted text-[10px] font-mono uppercase tracking-wider">FEATURE</p>
                          <p className="text-on-bg text-xs font-semibold mt-0.5">{f}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-brand-orange text-sm font-display font-bold tracking-wide group-hover:gap-4 transition-all">
                      LEARN MORE <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
