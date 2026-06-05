import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Building2,
  Calendar,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  ShieldAlert,
  HardHat,
  Activity
} from 'lucide-react';

import CTABanner from '@/components/sections/CTABanner';

export const dynamic = 'force-dynamic';

function mapProject(project) {
  console.log('ata gya project', project);
  
  // FIXED: Properly extract image URL
  const imageUrl = project?.image?.url || project?.images?.[0]?.url || '';

  const tags = Array.isArray(project?.tags)
    ? project.tags
    : [];

  const year =
    project?.year ||
    (project?.completionDate
      ? new Date(project.completionDate).getFullYear().toString()
      : '');

  return {
    slug: project?.slug || '',
    title: project?.title || '',
    client: project?.client || '',
    location: project?.location || '',
    year,
    category: project?.category || '',
    problem: project?.problem || '',
    solution: project?.solution || '',
    outcome: project?.outcome || '',
    image: imageUrl, // Now stores just the URL string
    tags,
    featured: !!project?.featured,
  };
}

export default function ProjectSlugClient({ project }) {
  console.log('project =>3', project);

  if (!project) {
    notFound();
  }

  const Selectedproject = mapProject(project);
  const related = [];

  return (
    <div style={{ backgroundColor: '#002147' }} className="min-h-screen text-gray-200 font-sans overflow-x-hidden">
      
      {/* Hero Section - Fixed Dynamic Structural Image View */}
      <section className="relative h-[75vh] min-h-[550px] flex items-end overflow-hidden border-b border-blue-950">
        <div className="absolute inset-0">
          {Selectedproject.image && Selectedproject.image !== '' ? (
            <img
              src={'/' + Selectedproject.image}
              alt={`${Selectedproject.title} - Turnkey Industrial Protection Case Study by ZasChem India`}
              className="w-full h-full object-cover grayscale contrast-125 opacity-35"
            />
          ) : (
            // Fallback image when no asset image is linked
            <div style={{ backgroundColor: '#001a38' }} className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500 text-sm font-mono tracking-wider">NO CASE STUDY METADATA VISUAL MATERIAL DETECTED</span>
            </div>
          )}

          {/* Core Royal Navy Overlay Blending Layers */}
          <div style={{ background: 'linear-gradient(to top, #002147 0%, rgba(0,33,71,0.85) 70%, rgba(0,33,71,0.3) 100%)' }} className="absolute inset-0" />
          <div style={{ background: 'linear-gradient(to right, rgba(0,33,71,0.95) 0%, rgba(0,33,71,0.6) 60%, transparent 100%)' }} className="absolute inset-0" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-16">
          <nav className="flex items-center gap-2 text-xs text-gray-400 font-mono tracking-widest uppercase mb-6">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <ChevronRight size={12} className="text-gray-600" />
            <Link href="/projects" className="hover:text-white transition-colors">PROJECTS</Link>
            <ChevronRight size={12} className="text-gray-600" />
            <span style={{ color: '#64dfdf' }} className="font-bold">
              {Selectedproject.category?.toUpperCase()}
            </span>
          </nav>

          <div className="flex gap-2 mb-5 font-mono text-[10px] tracking-widest font-bold uppercase">
            <span style={{ backgroundColor: 'rgba(100,223,223,0.12)', borderColor: 'rgba(100,223,223,0.25)', color: '#64dfdf' }} className="px-3 py-1 border rounded-sm">
              {Selectedproject.category} SPECIFICATION
            </span>
            {Selectedproject.featured && (
              <span style={{ backgroundColor: 'rgba(247,127,0,0.12)', borderColor: 'rgba(247,127,0,0.25)', color: '#f77f00' }} className="px-3 py-1 border rounded-sm">
                HIGH-RISK TECHNICAL CONTEXT
              </span>
            )}
          </div>

          {/* H1 with Requested Orange Text Span */}
          <h1 style={{ color: '#ffffff' }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-none mb-6 max-w-5xl">
            {Selectedproject.title} & SECURING <span style={{ color: '#f77f00' }}>INFRASTRUCTURAL LIFELINES</span>
          </h1>

          <div className="flex flex-wrap gap-6 text-xs font-mono uppercase tracking-wider text-gray-400 border-t border-blue-950/60 pt-6">
            <span className="flex items-center gap-2">
              <Building2 size={14} style={{ color: '#64dfdf' }} />
              Industrial Client: <strong className="text-gray-200 font-sans tracking-normal normal-case">{Selectedproject.client}</strong>
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} style={{ color: '#f77f00' }} />
              Asset Zone: <strong className="text-gray-200 font-sans tracking-normal normal-case">{Selectedproject.location}</strong>
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} style={{ color: '#fcbf49' }} />
              Commissioned Year: <strong className="text-gray-200">{Selectedproject.year}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Main Framework Content Architecture */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          
          {/* Detailed Structural Solution Narrative Blocks */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* THE CHALLENGE SECTION */}
            <div style={{ backgroundColor: '#001a38', borderColor: 'rgba(255,255,255,0.05)' }} className="p-8 md:p-10 border rounded-sm relative shadow-2xl">
              <div style={{ borderLeftColor: '#64dfdf' }} className="absolute left-0 top-8 bottom-8 border-l-2" />
              
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert size={20} style={{ color: '#64dfdf' }} />
                <h2 style={{ color: '#ffffff' }} className="font-display font-black text-xl tracking-wider uppercase">
                  1. Structural Degradation Analysis & Asset Risks
                </h2>
              </div>
              
              <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  Every major industrial infrastructure setup faces unique sub-surface liabilities. In this specialized execution footprint, the core concrete substrate was undergoing severe load-bearing stress combined with dynamic moisture migration patterns. Left unaddressed, deep substrate water ingress leads to internal rebar expansion, concrete delamination, and rapid structural spalling.
                </p>
                <p className="bg-[#002147]/50 p-4 border border-blue-950/40 rounded-sm italic text-gray-400 font-mono text-xs">
                  <strong>Site Diagnostic Log:</strong> {Selectedproject.problem}
                </p>
                <p>
                  Standard commercial coatings fail instantly under heavy thermal shifts and hydrostatic pressure. The structure demanded high-performance engineering formulations capable of acting as an absolute block. Without zero-tolerance civil remediation, chemical storage units, deep basement matrices, or massive raft layouts face long-term load distribution failures.
                </p>
              </div>
            </div>

            {/* OUR SOLUTION SECTION */}
            <div style={{ backgroundColor: '#001a38', borderColor: 'rgba(255,255,255,0.05)' }} className="p-8 md:p-10 border rounded-sm relative shadow-2xl">
              <div style={{ borderLeftColor: '#f77f00' }} className="absolute left-0 top-8 bottom-8 border-l-2" />
              
              <div className="flex items-center gap-3 mb-4">
                <HardHat size={20} style={{ color: '#f77f00' }} />
                <h2 style={{ color: '#ffffff' }} className="font-display font-black text-xl tracking-wider uppercase">
                  2. Turnkey Engineering Matrix & Chemical Application
                </h2>
              </div>
              
              <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  ZasChem India deployed a cross-functional structural task force to implement an integrated, multi-layered defense profile. Our strategy eliminated patch-work methods, utilizing instead deep-penetrating <strong>turnkey industrial crystalline waterproofing contractors</strong> protocols to form an active barrier inside the concrete pore structure.
                </p>
                <p className="bg-[#002147]/50 p-4 border border-blue-950/40 rounded-sm text-gray-300 text-sm">
                  <strong>Executed Structural Methodology:</strong> {Selectedproject.solution}
                </p>
                <p>
                  To handle critical chemical exposure corridors, we engineered a specialized layout using <strong>high-performance chemical resistant epoxy lining</strong> and premium <strong>polyurea elastomeric protective coatings</strong>. For sections suffering from advanced micro-fracturing and structural shifting, our technical crews integrated <strong>carbon fiber wrapping structural reinforcement composites</strong>. This execution stabilizes tensile stress distribution and stops further micro-crack expansion.
                </p>
              </div>
            </div>

            {/* OUTCOME & RESULTS SECTION */}
            <div style={{ backgroundColor: '#001a38', borderColor: 'rgba(255,255,255,0.05)' }} className="p-8 md:p-10 border rounded-sm relative shadow-2xl">
              <div style={{ borderLeftColor: '#fcbf49' }} className="absolute left-0 top-8 bottom-8 border-l-2" />
              
              <div className="flex items-center gap-3 mb-4">
                <Activity size={20} style={{ color: '#fcbf49' }} />
                <h2 style={{ color: '#ffffff' }} className="font-display font-black text-xl tracking-wider uppercase">
                  3. Quality Assurance Audits & Asset Life Extension
                </h2>
              </div>
              
              <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  Post-application quality metrics were confirmed through non-destructive digital core profiling, electronic high-voltage pinhole detection scans, and ultrasonic concrete density mapping. The entire asset field was completely sealed against aggressive chemical corrosion, sub-surface moisture loops, and environmental wear.
                </p>
                <p className="bg-[#002147]/50 p-4 border border-blue-950/40 rounded-sm text-gray-300 text-sm">
                  <strong>Verified Asset Metrics:</strong> {Selectedproject.outcome}
                </p>
                <p>
                  By deploying high-build polymers alongside structural carbon elements, the total operational lifecycle of the infrastructure was extended by several decades. This custom intervention completely bypassed the need for expensive structural rebuilds, keeping production loops active with zero downtime.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                  {['Zero Rework Guard', 'On-time Operational Delivery', 'Turnkey Warranty Issued'].map((item) => (
                    <div key={item} style={{ backgroundColor: '#002147', borderColor: 'rgba(255,255,255,0.03)' }} className="flex items-center gap-2.5 p-3.5 border rounded-sm">
                      <CheckCircle size={14} style={{ color: '#64dfdf' }} />
                      <span className="text-xs font-mono uppercase tracking-wide text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SPECIFIED TECHNOLOGY PROFILE TAGS */}
            {Selectedproject.tags?.length > 0 && (
              <div className="pt-4 border-t border-blue-950/60">
                <h3 style={{ color: '#ffffff' }} className="font-mono text-xs font-bold uppercase tracking-widest mb-4">
                  SPECIFIED INDUSTRIAL MATERIAL & SYSTEM PROFILE
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Selectedproject.tags.map((tag) => (
                    <span 
                      key={tag} 
                      style={{ backgroundColor: '#001a38', borderColor: 'rgba(255,255,255,0.05)' }} 
                      className="px-3.5 py-2 border rounded-sm font-mono text-xs text-gray-300 tracking-wide hover:border-blue-900 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Fixed Meta Technical Sidebar */}
          <div className="space-y-6">
            
            {/* PROJECT DETAILS SUMMARY CARD */}
            <div style={{ backgroundColor: '#001a38', borderColor: 'rgba(255,255,255,0.05)' }} className="p-6 border rounded-sm shadow-xl relative">
              <h3 style={{ color: '#ffffff' }} className="font-display font-black text-sm tracking-wider uppercase mb-5 border-b border-blue-950 pb-3">
                TECHNICAL CLASSIFICATION LOGS
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Client Enterprise</p>
                  <p style={{ color: '#ffffff' }} className="font-sans font-bold text-sm mt-0.5">{Selectedproject.client}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Asset Location Zone</p>
                  <p className="text-gray-300 font-sans font-medium text-sm mt-0.5">{Selectedproject.location}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Deployment Timeline</p>
                  <p className="text-gray-300 font-mono text-sm mt-0.5">{Selectedproject.year}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Domain Engineering Category</p>
                  <p style={{ color: '#64dfdf' }} className="font-mono text-xs font-bold uppercase tracking-wider mt-1">
                    {Selectedproject.category}
                  </p>
                </div>
              </div>
            </div>

            {/* QUICK CALL TO ACTION */}
            <div style={{ backgroundColor: '#001a38', borderColor: 'rgba(255,255,255,0.05)' }} className="p-6 border rounded-sm text-center relative group overflow-hidden">
              <div style={{ background: 'linear-gradient(45deg, transparent, rgba(247,127,0,0.05), transparent)' }} className="absolute inset-0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <p className="text-xs text-gray-400 mb-4 font-sans leading-relaxed">
                Facing severe sub-surface leakages, structure cracks or acid chemical corrosion on your plant assets?
              </p>
              <Link
                href="/contact"
                style={{ backgroundColor: '#f77f00' }}
                className="flex items-center justify-center gap-2 w-full text-white font-mono text-xs font-bold tracking-widest uppercase py-3.5 px-4 hover:bg-orange-600 rounded-sm transition-all shadow-lg active:scale-[0.98]"
              >
                REQUEST TECHNICAL AUDIT
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* RELATED CASE STUDIES (IF ANY) */}
            {related.length > 0 && (
              <div style={{ backgroundColor: '#001a38', borderColor: 'rgba(255,255,255,0.05)' }} className="p-6 border rounded-sm shadow-xl">
                <h3 style={{ color: '#ffffff' }} className="font-display font-black text-sm tracking-wider uppercase mb-5 border-b border-blue-950 pb-3">
                  SIBLING STRUCTURAL INVESTIGATIONS
                </h3>
                <div className="space-y-4">
                  {related.map((p) => (
                    <Link key={p.slug} href={`/projects/${p.slug}`} className="flex gap-3 group items-center">
                      <div style={{ backgroundColor: '#002147', borderColor: 'rgba(255,255,255,0.05)' }} className="w-14 h-14 border overflow-hidden shrink-0 rounded-sm">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building2 size={16} className="text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p style={{ color: '#ffffff' }} className="font-sans font-bold text-xs tracking-wide group-hover:text-[#f77f00] transition-colors line-clamp-1 uppercase">
                          {p.title}
                        </p>
                        <p style={{ color: '#64dfdf' }} className="text-[10px] font-mono uppercase tracking-wider mt-0.5">{p.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      <CTABanner />
    </div>
  );
}