'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Zap } from 'lucide-react';
import { siteConfig } from '../../app/data/siteData';

export default function CTABanner() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#002147] to-[#004080]">
      {/* Background with Real Blue Depth overlay */}
      <div className="absolute inset-0">
         <motion.img
            initial={{ opacity: 0, y: 5 ,scale:1.5}}
            whileInView={{ opacity: 0.9, y: 0 ,scale:1}}
            viewport={{ once: true }}
            transition={{duration:3}}
          src="industry.avif"
          alt="Industrial infrastructure"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/75 via-[#003366]/50 to-[#00509d]/20" />
        <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
      </div>

      {/* Top Highlight Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f77f00] via-[#fcbf49] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Ribbon Label */}
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.15em] text-[#fcbf49] bg-white/10 px-3 py-1.5 rounded-sm mb-6 border border-white/10 backdrop-blur-sm">
              <Zap size={13} className="text-[#f77f00] fill-[#f77f00]" />
              READY TO START YOUR PROJECT?
            </div>
            
            <h2 className="font-display font-black text-4xl md:text-6xl text-white tracking-tight leading-none mb-6">
              PROTECT YOUR<br />
              <span className="text-[#f77f00] drop-shadow-sm">INFRASTRUCTURE</span><br />
              TODAY.
            </h2>
            
            <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Get a free technical consultation from our engineering team. We assess your problem, propose the right solution, and deliver results that last decades.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact" 
                className="group inline-flex items-center gap-2 justify-center bg-[#d97102] hover:bg-white text-white hover:text-[#002147] font-bold text-base py-4 px-8 shadow-xl transition-all duration-300 rounded-sm"
              >
                GET FREE CONSULTATION 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a 
                href={`tel:${siteConfig.phone}`} 
                className="group inline-flex items-center gap-2 justify-center bg-white/10 hover:bg-white text-white hover:text-[#002147] border border-white/20 font-bold text-base py-4 px-8 transition-all duration-300 rounded-sm backdrop-blur-sm"
              >
                <Phone size={16} className="text-[#fcbf49] group-hover:text-[#002147]" /> 
                CALL NOW
              </a>
            </div>

            {/* Badges with bright orange bullet tags */}
            <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/10">
              {['24hr Response', 'Free Site Survey', 'Pan-India Service', '10yr Warranty'].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm font-semibold text-gray-100">
                  <span className="w-2 h-2 bg-[#f77f00] rounded-full shadow-[0_0_6px_#f77f00]" />
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