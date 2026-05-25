'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Building2 } from 'lucide-react';
import { projects } from '@/data/siteData';
import SectionHeader from '../layout/Header';

export default function ProjectsSection({ limit = 4, showAll = false }) {
  const displayed = showAll ? projects : projects.filter(p => p.featured).slice(0, limit);

  return (
    <section className="py-24 bg-brand-card relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="OUR PORTFOLIO"
          title="INDUSTRIAL PROJECTS"
          subtitle="Real-world solutions delivered for India's most critical infrastructure — from power plants to tunnels to chemical facilities."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayed.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`} className="group card-industrial block overflow-hidden hover:border-brand-blue/50 transition-all duration-300">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-card/90 via-brand-card/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-brand-blue/90 text-on-bg text-xs font-mono tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-brand-darker/80 text-brand-muted text-xs font-mono">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-on-bg tracking-wide mb-2 group-hover:text-brand-blue transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-4 mb-4 text-xs text-brand-muted">
                    <span className="flex items-center gap-1.5">
                      <Building2 size={11} className="text-brand-orange" /> {project.client}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={11} className="text-brand-blue" /> {project.location}
                    </span>
                  </div>

                  <div className="space-y-2 mb-5">
                    <div>
                      <span className="text-xs font-mono text-brand-orange tracking-wider">CHALLENGE: </span>
                      <span className="text-xs text-brand-muted">{project.problem}</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-brand-blue tracking-wider">SOLUTION: </span>
                      <span className="text-xs text-brand-muted">{project.solution.substring(0, 120)}...</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-brand-darker border border-brand-border text-xs text-brand-muted">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-brand-blue text-sm font-display font-semibold tracking-wide group-hover:gap-3 transition-all">
                    VIEW CASE STUDY <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/projects" className="btn-secondary inline-flex items-center gap-2">
              VIEW ALL PROJECTS <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}