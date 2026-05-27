'use client';
import { motion } from 'framer-motion';
import { Award, Users, CheckCircle, Clock, Shield, MapPin } from 'lucide-react';
import { whyChooseUs, clients } from '@/data/siteData';
import SectionHeader from '../layout/Header';
import 'swiper/css';


const iconMap = { Award, Users, CheckCircle, Clock, Shield, MapPin };

// Placeholder SVG logos since we don't have real client logos
const ClientLogo = ({ name }) => (
  <div className="flex items-center justify-center h-16 px-8 min-w-[180px] bg-brand-darker border border-brand-border group hover:border-brand-blue/40 transition-all duration-300">
    <div className="text-center">
      <div className="w-6 h-0.5 bg-brand-blue/40 mx-auto mb-2 group-hover:bg-brand-blue transition-colors" />
      <span className="font-display font-bold text-xs text-brand-muted group-hover:text-on-bg transition-colors tracking-widest uppercase whitespace-nowrap">
        {name}
      </span>
    </div>
  </div>
);

export default function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden">
              <img
                src="/p4.avif"
                alt="Industrial waterproofing experts"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/40 to-transparent" />
              <div className="absolute top-0 left-0 w-10 h-10 border-t-3 border-l-3 border-brand-blue" style={{ borderTopWidth: 3, borderLeftWidth: 3 }} />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-3 border-r-3 border-brand-orange" style={{ borderBottomWidth: 3, borderRightWidth: 3 }} />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-brand-card border border-brand-border p-6 shadow-2xl">
<p className="font-display font-black text-4xl text-on-bg">12+</p>
              <p className="font-mono text-xs text-brand-orange tracking-widest mt-1">YEARS OF EXCELLENCE</p>
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <SectionHeader
              label="WHY CHOOSE US"
              title="ENGINEERING TRUST. DELIVERING EXCELLENCE."
              subtitle="Certified engineers, proven materials, and rigorous QC — every project, every time."
              centered={false}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {whyChooseUs.map((item, i) => {
                const Icon = iconMap[item.icon] || Award;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-4 p-4 bg-brand-card border border-brand-border hover:border-brand-blue/40 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-brand-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue/20 transition-colors">
                      <Icon size={18} className="text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-on-bg mb-1 tracking-wide">{item.title}</h4>
                      <p className="text-brand-muted text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
