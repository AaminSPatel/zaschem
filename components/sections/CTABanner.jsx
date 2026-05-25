'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Zap } from 'lucide-react';
import { siteConfig } from '../../app/data/siteData';

export default function CTABanner() {
  return (
    <section className="relative py-20 overflow-hidden ">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="industry.jpg"
          alt="Industrial infrastructure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-darker/97 via-brand-darker/90 to-brand-blue/20" />
        <div className="absolute inset-0 grid-lines opacity-20" />
      </div>

      {/* Accent lines */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue via-brand-blue/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-label mb-5">
              <Zap size={12} className="text-brand-orange" />
              READY TO START YOUR PROJECT?
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl text-on-bg tracking-tight leading-none mb-6">
              PROTECT YOUR<br />
              <span className="text-brand-blue">INFRASTRUCTURE</span><br />
              TODAY.
            </h2>
            <p className="text-brand-muted text-lg leading-relaxed mb-8 max-w-xl">
              Get a free technical consultation from our engineering team. We assess your problem, propose the right solution, and deliver results that last decades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary flex items-center gap-2 justify-center text-base py-4 px-8">
                GET FREE CONSULTATION <ArrowRight size={18} />
              </Link>
              <a href={`tel:${siteConfig.phone}`} className="btn-secondary flex items-center gap-2 justify-center text-base py-4 px-8">
                <Phone size={16} /> CALL NOW
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-brand-border">
              {['24hr Response', 'Free Site Survey', 'Pan-India Service', '10yr Warranty'].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-brand-muted">
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full" />
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}