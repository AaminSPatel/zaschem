'use client';
import { motion } from 'framer-motion';
import SectionHeader from '../layout/Header';

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-20 relative bg-gradient-to-br from-[#002147] via-[#002f6c] to-[#003366] overflow-hidden text-white">
      
      {/* Grid pattern - lightweight */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden border border-white/10 rounded-sm">
              <img
                src="/about-zaschem-1.avif"
                alt="Industrial waterproofing experts ZASCHEM India"
                className="w-full h-[400px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/60 to-transparent" />
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#64dfdf]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#f77f00]" />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-[#002147] border border-white/10 p-4 shadow-xl rounded-sm">
              <p className="font-display font-black text-3xl text-[#f77f00]">13+</p>
              <p className="font-mono text-[9px] text-white tracking-widest mt-0.5">YEARS OF EXCELLENCE</p>
            </div>
          </motion.div>

          {/* Right Column: Industry Counts */}
          <div className="order-1 lg:order-2">
            <SectionHeader
              label="WHY CHOOSE US"
              title="Trusted Across Multiple Industries"
              subtitle="Increasing life of Industrial Structure – Equal responsibility of manufacturer and applicator. End to End support (Diagnosis → Rectification → Warranty)."
              centered={false}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {[
                { title: '⚡ Power Sector Clients', value: '25+', desc: 'Cooling tower and power plant protection.' },
                { title: '🏗️ Infrastructure Clients', value: '20+', desc: 'Tunnels, metros, bridges and underground leakage arrest.' },
                { title: '🏭 Industrial Clients', value: '18+', desc: 'Concrete spalling repair and structural strengthening.' },
                { title: '🏨 Commercial & Hospitality', value: '15+', desc: 'Terrace waterproofing and acid resistant lining.' },
                { title: '🏫 Institutional & Government', value: '12+', desc: 'Reliable execution with documented QC.' },
                { title: '🏠 Residential & Real Estate', value: '30+', desc: 'Roof waterproofing and expansion joint systems.' },
              ].map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                  className="p-5 bg-[#004080]/30 border border-white/5 hover:border-[#f77f00] transition-all duration-200 rounded-sm"
                >
                  <div className="text-[#f77f00] font-display font-black text-3xl mb-1 tracking-tight">{card.value}</div>
                  <h3 className="font-display font-bold text-sm text-white mb-1">{card.title}</h3>
                  <p className="text-gray-300 text-[11px] leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-4 text-gray-300 text-[11px] leading-relaxed">
              Power plant waterproofing solutions, industrial structure leak repair, cooling tower anticorrosive coating and chimney protective coating delivered with disciplined methodology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}