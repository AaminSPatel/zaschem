'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Droplets, Building2, Wrench, FlaskConical, Layers, Waves, Sun, Shield, ArrowRight } from 'lucide-react';
import { services } from '@/data/siteData';
import SectionHeader from '../layout/Header';

const iconMap = { Droplets, Building2, Wrench, FlaskConical, Layers, Waves, Sun, Shield };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayed.map((service, i) => {
            const Icon = iconMap[service.icon] || Droplets;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link href={`/services/${service.slug}`} className="card-industrial block p-6 h-full group hover:border-brand-blue/50 transition-all duration-300 hover:-translate-y-1">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-5 group-hover:bg-brand-blue/20 transition-colors">
                    <Icon size={22} className="text-brand-blue group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-on-bg tracking-wide mb-3 group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed mb-5 line-clamp-3">
                    {service.shortDesc}
                  </p>

                  {/* Features pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {service.features.slice(0, 3).map((f) => (
                      <span key={f} className="px-2 py-0.5 bg-brand-darker border border-brand-border text-xs text-brand-muted font-mono">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-brand-blue text-sm font-display font-semibold tracking-wide group-hover:gap-3 transition-all">
                    LEARN MORE <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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