'use client';
import { motion } from 'framer-motion';

export default function SectionHeader({ label, title, subtitle, centered = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {label && (
        <div className={`section-label mb-4 ${centered ? 'justify-center' : ''}`}>
          {label}
        </div>
      )}
      <h2 className={`font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-4 text-on-bg ${light ? 'text-on-bg' : 'text-on-bg'}`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''} text-brand-muted`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}