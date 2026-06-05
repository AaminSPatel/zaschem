'use client';

import Link from 'next/link';
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Droplets, Package } from 'lucide-react';

import { services } from '@/data/siteData';
import SectionHeader from '../layout/Header';

function Service3DCard({ service, index }) {
  const ref = React.useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
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
          className="relative card-industrial overflow-hidden cursor-pointer hover:border-brand-orange/60 transition-colors duration-300 group"
        >
          {/* Dynamic glow spotlight */}
          <motion.div
            style={{
              background: useTransform(
                [glowX, glowY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx}% ${gy}%, rgba(249,115,22,0.15), transparent 70%)`
              ),
            }}
            className="absolute inset-0 z-10 pointer-events-none"
          />

          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/30 to-transparent" />
            <div className="absolute top-3 left-3 z-20">
              <span className="px-2 py-1 bg-brand-orange text-on-bg text-xs font-mono tracking-wider">
                {service.category ?? 'SERVICE'}
              </span>
            </div>

            {/* Badge */}
            <motion.div
              style={{ transform: 'translateZ(20px)' }}
              className="absolute top-3 right-3 z-20 w-10 h-10 bg-brand-blue/90 border border-brand-blue flex items-center justify-center"
            >
              <Package size={16} className="text-on-bg" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5 relative z-20" style={{ transform: 'translateZ(10px)' }}>
            <p className="font-mono uppercase text-brand-orange text-sm tracking-[0.1em] mb-1.5">
              {service.title}
            </p>
            <h3 className="font-display font-black text-lg text-on-bg mb-2 leading-tight group-hover:text-brand-orange transition-colors">
              {service.title}
            </h3>
            <p className="text-brand-muted text-xs leading-relaxed mb-4 line-clamp-2">
              {service.shortDesc}
            </p>

            {/* Mini specs */}
            <div className="grid grid-cols-2 gap-1.5 mb-4">
              {(service.features ?? []).slice(0, 2).map((f) => (
                <div key={f} className="bg-brand-darker border border-brand-border px-2 py-1.5">
                  <p className="font-mono text-xs text-brand-muted uppercase tracking-wider">
                    FEATURE
                  </p>
                  <p className="text-on-bg text-xs font-bold mt-0.5 leading-tight">{f}</p>
                </div>
              ))}
            </div>

            {/* Features dots */}
            <div className="flex flex-wrap gap-1 mb-4">
              {(service.features ?? []).slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="px-1.5 py-0.5 border border-brand-border text-xs text-brand-muted font-mono"
                >
                  {f}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-brand-orange text-sm font-display font-bold group-hover:gap-3 transition-all">
              LEARN MORE <ArrowRight size={13} />
            </div>
          </div>

          {/* Bottom shine line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection({ limit = 8 }) {
  const displayed = services.slice(0, limit);

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="WHAT WE DO"
          title="INDUSTRIAL PROTECTION SERVICES"
          subtitle="Comprehensive waterproofing, rehabilitation, and coating solutions engineered for India's most demanding industrial environments."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayed.map((service, i) => (
            <Service3DCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/services" className="btn-secondary inline-flex items-center gap-2">
            VIEW ALL SERVICES <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

