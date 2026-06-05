'use client';

import Link from 'next/link';
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Package, CheckCircle2 } from 'lucide-react';
import { services } from '@/data/siteData';
import SectionHeader from '../layout/Header';

function Service3DCard({ service, index }) {
  const ref = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <Link href={`/services/${service.slug}`}>
        <motion.div
          ref={ref}
          onMouseMove={handleMouse}
          onMouseLeave={reset}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative bg-white text-[#002147] rounded-sm overflow-hidden border-2 border-transparent hover:border-[#f77f00] shadow-xl transition-all duration-300 group"
        >
          {/* Subtle Orange Glow effect */}
          <motion.div
            style={{
              background: useTransform(
                [glowX, glowY],
                ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(247,127,0,0.1), transparent 60%)`
              ),
            }}
            className="absolute inset-0 z-10 pointer-events-none"
          />

          {/* Media Head */}
          <div className="relative h-48 overflow-hidden bg-[#002147]">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            
            <div className="absolute top-3 left-3 z-20">
              <span className="px-2.5 py-1 bg-[#002147] text-white text-[10px] font-mono font-bold tracking-widest uppercase rounded-sm shadow-md">
                {service.category ?? 'SERVICE'}
              </span>
            </div>

            <div className="absolute top-3 right-3 z-20 w-8 h-8 bg-[#f77f00] text-white flex items-center justify-center rounded-sm shadow-md">
              <Package size={14} />
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 relative z-20">
            <h3 className="font-display h-16 font-black text-lg text-[#002147] mb-2 leading-tight group-hover:text-[#f77f00] transition-colors">
              {service.title}
            </h3>
            <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-2">
              {service.shortDesc}
            </p>

            {/* Core specs list updates */}
            <div className="space-y-1.5 mb-5">
              {(service.features ?? []).slice(0, 2).map((f) => (
                <div key={f} className="flex items-center gap-2 bg-[#002147]/5 px-2.5 py-1.5 rounded-sm border border-[#002147]/5">
                  <CheckCircle2 size={13} className="text-[#f77f00] shrink-0" />
                  <p className="text-[#002147] text-xs font-bold truncate">{f}</p>
                </div>
              ))}
            </div>

            {/* Trigger line */}
            <div className="inline-flex items-center gap-2 text-[#f77f00] text-xs font-mono font-bold tracking-wider uppercase group-hover:text-[#002147] transition-colors">
              LEARN MORE <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection({ limit = 8 }) {
  const displayed = services.slice(0, limit);

  return (
    <section className="py-24 bg-gradient-to-br from-[#003366] via-[#004080] to-[#00509d] relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="WHAT WE DO"
          title="INDUSTRIAL PROTECTION SERVICES"
          subtitle="Comprehensive waterproofing, rehabilitation, and coating solutions engineered for India's most demanding industrial environments."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {displayed.slice(0,9).map((service, i) => (
            <Service3DCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/services" 
            className="group inline-flex items-center gap-2 bg-white text-[#002147] hover:bg-[#f77f00] hover:text-white font-bold py-3.5 px-8 rounded-sm transition-all duration-300 shadow-md"
          >
            VIEW ALL SERVICES 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}