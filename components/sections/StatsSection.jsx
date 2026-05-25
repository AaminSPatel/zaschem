'use client';
import { motion } from 'framer-motion';
import { Users, Zap, Award, CheckCircle, MapPin, ThumbsUp } from 'lucide-react';
import { stats } from '@/data/siteData';

const iconMap = { Users, Zap, Award, CheckCircle, MapPin, ThumbsUp };

export default function StatsSection() {
  return (
    <section className="relative py-20 bg-brand-card border-y border-brand-border overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-brand-blue to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-brand-orange to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="section-label justify-center mb-3">OUR TRACK RECORD</div>
          <h2 className="font-display font-black text-3xl md:text-4xl text-on-bg tracking-tight">
            NUMBERS THAT SPEAK FOR THEMSELVES
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-brand-border">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Award;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-brand-card p-6 lg:p-8 text-center group hover:bg-brand-dark transition-colors relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Icon size={22} className="mx-auto mb-3 text-brand-orange group-hover:scale-110 transition-transform" />
                <div className="stat-number mb-2">{stat.value}</div>
                <p className="text-brand-muted text-xs font-mono tracking-wide leading-snug uppercase">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}