'use client';
import { motion } from 'framer-motion';
import { Users, Zap, Award, CheckCircle, MapPin, ThumbsUp } from 'lucide-react';
import { stats } from '@/data/siteData';

const iconMap = { Users, Zap, Award, CheckCircle, MapPin, ThumbsUp };

export default function StatsSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#002147] to-[#003366]   border-y-2 border-[#002147]/10 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex text-xs font-mono font-bold tracking-widest text-[#f77f00] bg-[#f77f00]/10 px-3 py-1 mb-3 rounded-sm">
            OUR TRACK RECORD
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl text-[#ffffff] tracking-tight">
            NUMBERS THAT SPEAK FOR THEMSELVES
          </h2>
        </motion.div>

        {/* Clean Grid Layout with Blue Base & Vibrant Orange Accents */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#002147]/10 border border-[#002147]/15 rounded-sm overflow-hidden shadow-xl">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Award;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white p-6 lg:p-8 text-center group hover:bg-[#002147] transition-all duration-300 relative overflow-hidden"
              >
                {/* Clean hover dynamic state */}
                <div className="w-12 h-12 rounded-full bg-[#f77f00]/10 text-[#f77f00] group-hover:bg-[#f77f00] group-hover:text-white flex items-center justify-center mx-auto mb-4 transition-all duration-300 shadow-sm">
                  <Icon size={20} className="stroke-[2.5]" />
                </div>
                
                {/* Numeric values */}
                <div className="text-3xl font-display font-black text-[#002147] group-hover:text-white mb-1 transition-colors tracking-tight">
                  {stat.value}
                </div>
                
                <p className="text-gray-500 group-hover:text-gray-300 text-[10px] font-mono font-bold tracking-wider uppercase leading-snug">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}