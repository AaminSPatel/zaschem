'use client';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Package, CheckCircle2 } from 'lucide-react';
import { services as localServices } from '@/data/siteData';
import { fetchServices } from '@/lib/apiClient';
import SectionHeader from '../layout/Header';


function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}  // Faster
    >
      <Link href={`/services/${service.slug}`}>
        <div className="relative bg-white text-[#002147] rounded-sm overflow-hidden border border-white/20 hover:border-[#f77f00] shadow-md hover:shadow-xl transition-all duration-200 group">
          
          {/* Image */}
          <div className="relative h-40 overflow-hidden bg-[#002147]">
            <img
              src={typeof service.image === 'string' ? service.image : (service.image?.url || '')}
              alt={service.title}

              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            
            <div className="absolute top-2 left-2">
              <span className="px-2 py-0.5 bg-[#002147] text-white text-[9px] font-mono font-bold tracking-wider uppercase rounded-sm">
                {service.category ?? 'SERVICE'}
              </span>
            </div>

            <div className="absolute top-2 right-2 w-6 h-6 bg-[#f77f00] text-white flex items-center justify-center rounded-sm shadow-md">
              <Package size={12} />
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-display font-bold text-base text-[#002147] mb-1 leading-tight group-hover:text-[#f77f00] transition-colors duration-200 line-clamp-2 min-h-[44px]">
              {service.title}
            </h3>
            <p className="text-gray-500 text-[11px] leading-relaxed mb-3 line-clamp-2">
              {service.shortDesc}
            </p>

            <div className="space-y-1 mb-3">
              {(service.features ?? []).slice(0, 2).map((f,i) => (
                <div key={i} className="flex items-center gap-1.5 bg-[#002147]/5 px-2 py-1 rounded-sm">
                  <CheckCircle2 size={10} className="text-[#f77f00] shrink-0" />
                  <p className="text-[#002147] text-[10px] font-medium truncate">{f}</p>
                </div>
              ))}
            </div>

            <div className="inline-flex items-center gap-1 text-[#f77f00] text-[10px] font-mono font-bold tracking-wider uppercase group-hover:text-[#002147] transition-colors duration-200">
              LEARN MORE <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection({ limit = 6 }) {
  const [servicesList, setServicesList] = useState(localServices);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetchServices();
        const data = res?.data ?? res;
        if (!mounted) return;
        if (Array.isArray(data) && data.length) setServicesList(data);
      } catch (e) {
        // Keep local fallback
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const displayed = useMemo(() => (Array.isArray(servicesList) ? servicesList : []).slice(0, limit), [servicesList, limit]);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-[#003366] via-[#004080] to-[#00509d] relative overflow-hidden">

      <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="WHAT WE DO"
          title="INDUSTRIAL PROTECTION SERVICES"
          subtitle="Comprehensive waterproofing, rehabilitation, and coating solutions engineered for India's most demanding industrial environments."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {displayed.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            href="/services" 
            className="group inline-flex items-center gap-2 bg-white text-[#002147] hover:bg-[#f77f00] hover:text-white font-bold py-2.5 px-6 rounded-sm transition-all duration-200 shadow-md text-sm"
          >
            VIEW ALL SERVICES 
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
}