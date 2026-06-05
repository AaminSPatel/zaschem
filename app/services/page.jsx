'use client'

import Link from 'next/link';
import { ArrowRight, Droplets, Building2, Wrench, Shield, CheckCircle } from 'lucide-react';
import CTABanner from '@/components/sections/CTABanner';
import { fetchServices } from '@/lib/apiClient';
import { useEffect, useMemo, useState } from 'react';

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
    <div style={{ backgroundColor: '#002147' }} className="min-h-screen text-gray-200 font-sans antialiased">
      
      {/* Structural Block Hero Design */}
      <section className="relative py-28 border-b border-blue-950/80 bg-[#001730]">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3">
            <span style={{ color: '#64dfdf' }} className="text-xs font-mono font-bold tracking-widest block mb-3">
              // CORE SYSTEM CATALOGUE
            </span>
            <h1 className="font-display font-black text-4xl md:text-6xl text-white tracking-tight uppercase leading-none mb-6">
              HEAVY INDUSTRIAL <br/>
              <span style={{ color: '#f77f00' }}>SHIELDING</span> PROTOCOLS
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
              ZasChem India executes absolute containment shields across localized manufacturing grids. By integrating elite <strong className="text-gray-200">turnkey industrial crystalline waterproofing contractors</strong> methods with dynamic deep-pore crystallizing technology, we permanently isolate infrastructure substrates from early degradation cycles.
            </p>
          </div>
          
          <div className="lg:col-span-2 bg-[#002147]/80 border border-blue-900/40 p-6 rounded-sm">
            <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase mb-3 border-b border-blue-900/60 pb-2">DESIGN SPECIFICATION</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every system deployment incorporates custom layouts for aggressive fluid boundaries, volatile thermal movements, and high hydrostatic loading profiles.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Architecture Selection */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {loading && (
            <div className="py-20 text-center font-mono text-xs text-gray-500 tracking-widest animate-pulse">
              LOADING COMPONENT DATA STACKS...
            </div>
          )}

          {!loading && error && (
            <div className="py-12 text-center border border-red-900/30 bg-red-950/10 text-red-400 font-mono text-xs">
              SYSTEM CONTEXT ERROR: {error}
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safeServices.map((service) => (
                <div 
                  key={service._id || service.id || service.slug}
                  className="bg-[#001a38] border border-blue-950/70 rounded-sm p-6 hover:border-blue-800 transition-all flex flex-col justify-between shadow-xl relative group"
                >
                  <div style={{ backgroundColor: '#f77f00' }} className="absolute top-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div style={{ backgroundColor: 'rgba(100,223,223,0.05)', borderColor: 'rgba(100,223,223,0.15)' }} className="p-3 border rounded-sm">
                        <Shield size={20} style={{ color: '#64dfdf' }} />
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 tracking-wider">SECURE LAYER</span>
                    </div>

                    <h3 className="text-lg font-display font-black text-white tracking-wide uppercase mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-3">
                      {service.shortDesc || "Custom operational defense layouts engineered using highly dynamic materials to prevent continuous sub-surface leakage matrices across industrial segments."}
                    </p>

                    {/* Industrial Meta Features Bar */}
                    <div className="space-y-2 mb-6 border-t border-blue-950/60 pt-4">
                      {(service.features || []).slice(0, 2).map((f, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] text-gray-400">
                          <CheckCircle size={12} style={{ color: '#64dfdf' }} className="shrink-0" />
                          <span className="truncate uppercase tracking-wide font-mono">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    style={{ backgroundColor: '#002147', borderColor: 'rgba(255,255,255,0.03)' }}
                    className="w-full text-center border text-xs font-mono font-bold tracking-widest uppercase py-3 px-4 hover:text-white hover:bg-blue-900 transition-all block text-gray-300"
                  >
                    SYSTEM CONFIGURATION &rarr;
                  </Link>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      <CTABanner />
    </div>
  );
}