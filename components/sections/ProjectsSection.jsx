'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Building2, Calendar } from 'lucide-react';
import { projects } from '@/data/siteData';
import SectionHeader from '../layout/Header';

export default function ProjectsSection({ limit = 4, showAll = false }) {
  const displayed = showAll ? projects : projects.filter(p => p.featured).slice(0, limit);

  return (
    <section className="py-24 bg-gradient-to-b from-[#002147] to-[#003366] relative overflow-hidden text-white">
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="OUR PORTFOLIO"
          title="INDUSTRIAL PROJECTS"
          subtitle="Real-world solutions delivered for India's most critical infrastructure — from power plants to tunnels to chemical facilities."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {displayed.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link 
                href={`/projects/${project.slug}`} 
                className="group block bg-[#004080]/40 border border-white/10 hover:border-[#f77f00] rounded-sm overflow-hidden transition-all duration-300 shadow-xl backdrop-blur-sm"
              >
                {/* Upper Thumbnail view */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-transparent to-transparent" />
                  
                  {/* Category Pill Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#f77f00] text-white text-xs font-mono font-bold tracking-wider rounded-sm shadow-md">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Calendar/Year view */}
                  <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-[#002147]/90 border border-white/10 text-white text-xs font-mono font-bold">
                      <Calendar size={12} className="text-[#fcbf49]" /> {project.year}
                    </span>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-6 md:p-8">
                  <h3 className="font-display font-black text-xl text-white tracking-wide mb-3 group-hover:text-[#fcbf49] transition-colors">
                    {project.title}
                  </h3>

                  {/* Context location specs */}
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-semibold text-gray-200">
                    <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-sm">
                      <Building2 size={13} className="text-[#f77f00]" /> {project.client}
                    </span>
                    <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-sm">
                      <MapPin size={13} className="text-[#64dfdf]" /> {project.location}
                    </span>
                  </div>

                  {/* Problem / Solution fields */}
                  <div className="space-y-3 mb-6 bg-[#002147]/80 p-4 border border-white/5 rounded-sm">
                    <p className="text-xs leading-relaxed text-gray-200">
                      <strong className="text-[#f77f00] font-mono text-[11px] tracking-wider block mb-0.5">CHALLENGE:</strong> 
                      {project.problem}
                    </p>
                    <p className="text-xs leading-relaxed text-gray-100 border-t border-white/5 pt-2">
                      <strong className="text-[#64dfdf] font-mono text-[11px] tracking-wider block mb-0.5">SOLUTION:</strong> 
                      {project.solution.substring(0, 115)}...
                    </p>
                  </div>

                  {/* Bottom structural details tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 bg-white/5 text-gray-300 text-xs font-mono border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Trigger Row */}
                  <div className="inline-flex items-center gap-2 text-[#fcbf49] text-sm font-bold tracking-wider group-hover:text-[#f77f00] transition-colors">
                    VIEW CASE STUDY <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-12">
            <Link 
              href="/projects" 
              className="group inline-flex items-center gap-2 bg-[#f77f00] hover:bg-white text-white hover:text-[#002147] font-bold py-3.5 px-8 rounded-sm transition-all shadow-md"
            >
              VIEW ALL PROJECTS 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}