'use client';
import { motion } from 'framer-motion';
import { Users, Zap, Award, CheckCircle, ThumbsUp, Globe } from 'lucide-react';
import { stats } from '@/data/siteData';

const iconMap = { Users, Zap, Award, CheckCircle, ThumbsUp, Globe };

export default function StatsSection() {
  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-b from-[#002147] to-[#003366] border-y-2 border-[#002147]/10 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex text-xs font-mono font-bold tracking-widest text-[#f77f00] bg-[#f77f00]/10 px-3 py-1 mb-3 rounded-sm">
            OUR TRACK RECORD
          </div>
          <h2 className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-white tracking-tight">
            NUMBERS THAT SPEAK FOR THEMSELVES
          </h2>
          <p className="text-gray-200 text-sm mt-3 max-w-2xl mx-auto">
            ZASCHEM INDIA has been delivering excellence in waterproofing, structural repair, and concrete strengthening since 2013
          </p>
        </motion.div>

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
                className="bg-white p-5 lg:p-6 text-center group hover:bg-[#002147] transition-all duration-300 relative overflow-hidden"
              >
                <div className="w-11 h-11 rounded-full bg-[#f77f00]/10 text-[#f77f00] group-hover:bg-[#f77f00] group-hover:text-white flex items-center justify-center mx-auto mb-3 transition-all duration-300 shadow-sm">
                  <Icon size={18} className="stroke-[2.5]" />
                </div>
                
                <div className="text-2xl lg:text-3xl font-display font-black text-[#002147] group-hover:text-white mb-0.5 transition-colors tracking-tight">
                  {stat.value}
                </div>
                
                <p className="text-gray-500 group-hover:text-gray-300 text-[9px] lg:text-[10px] font-mono font-bold tracking-wider uppercase leading-tight">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
        
        <p className="text-center text-gray-200 text-[10px] mt-6">
          Trusted by NTPC, L&T, Tata Motors, BGR Energy, GE POWER, and 100+ industrial clients across India
        </p>
      </div>
    </section>
  );
}