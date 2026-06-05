"use client";

import Link from 'next/link';
import CTABanner from '@/components/sections/CTABanner';
import { CheckCircle, ArrowRight, Phone, ChevronRight, Layers, ShieldAlert, Award, Radio } from 'lucide-react';

export default function ServiceDetailPageClient({ service, related }) {
  if (!service) return null;

  return (
    <div className="bg-brand-dark min-h-screen text-gray-200 font-sans antialiased">
      
      {/* Dynamic Master Hero Block */}
      <section className="relative h-[75vh] min-h-[520px] flex items-end overflow-hidden border-b border-blue-950/60 bg-[#001a38]">
        <div className="absolute inset-0 z-0">
          {service.image?.url ? (
            <img 
              src={service.image.url} 
              alt={`${service.title} Engineering Execution - ZasChem India`} 
              className="w-full h-full object-cover grayscale opacity-30 contrast-125 brightness-75 scale-105" 
            />
          ) : (
            <div className="w-full h-full bg-[#001730]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/60 to-transparent" />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16">
          {/* Enhanced Micro Breadcrumb Route */}
          <nav className="flex items-center gap-2 text-[10px] font-mono text-gray-400 mb-6 tracking-widest uppercase">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <ChevronRight size={10} className="text-gray-600" />
            <Link href="/services" className="hover:text-white transition-colors">SERVICES</Link>
            <ChevronRight size={10} className="text-gray-600" />
            <span style={{ color: '#64dfdf' }} className="font-bold">{service.title?.toUpperCase()} SPEC</span>
          </nav>

          <div className="inline-block px-3 py-1 bg-[#002147] border border-blue-900/40 text-xs font-mono font-bold tracking-widest text-gray-300 rounded-sm mb-4 uppercase">
            CRITICAL PROTECTION FIELD
          </div>

          {/* H1 with Requested Orange Contrast Word Span */}
          <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-none mb-6 max-w-4xl uppercase">
            {service.title} & INDUSTRIAL <span style={{ color: '#f77f00' }}>REMEDIATION</span> SYSTEM
          </h1>

          <p className="text-gray-300 text-base md:text-lg max-w-3xl leading-relaxed font-normal">
            {service.shortDesc || "High-build high-performance dynamic structural configuration engineered to address aggressive environment sub-surface degradation vectors and environmental vulnerabilities."}
          </p>
        </div>
      </section>

      {/* Main Structural Framework Layout */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Core Structural Data Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* OVERVIEW MODULE */}
            <div className="bg-[#001a38] border border-blue-950/50 p-8 rounded-sm relative shadow-xl">
              <div style={{ borderColor: '#64dfdf' }} className="absolute left-0 top-6 bottom-6 border-l-2" />
              <h2 className="font-display font-black text-xl text-white tracking-wider uppercase mb-5 flex items-center gap-2.5">
                <Layers size={18} style={{ color: '#64dfdf' }} />
                1. EXECUTIVE PROTOCOL & SUBSTRATE ARCHITECTURE
              </h2>
              <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
                {service.description ? (
                  service.description.split('\n\n').map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))
                ) : (
                  <p>
                    Industrial asset structures run structural vulnerabilities under persistent thermal transitions, alkaline moisture migration, and heavy mechanical load changes. Standard protection applications degrade because they lack cross-linking adhesion capacity. This system provides specialized remediation, ensuring long-term life elongation.
                  </p>
                )}
                <p>
                  Our execution teams implement active barrier integrations utilizing premium <strong className="text-white">turnkey industrial crystalline waterproofing contractors</strong> tools alongside <strong className="text-white">high-performance chemical resistant epoxy lining</strong> to permanently protect localized structures from deep concrete carbonation patterns and degradation risks.
                </p>
              </div>
            </div>

            {/* INTEGRATED SYSTEM FEATURES MODULE */}
            <div className="bg-[#001a38] border border-blue-950/50 p-8 rounded-sm relative shadow-xl">
              <div style={{ borderColor: '#f77f00' }} className="absolute left-0 top-6 bottom-6 border-l-2" />
              <h2 className="font-display font-black text-xl text-white tracking-wider uppercase mb-5 flex items-center gap-2.5">
                <ShieldAlert size={18} style={{ color: '#f77f00' }} />
                2. CORE DESIGN PARAMETERS & RIGID CAPABILITIES
              </h2>
              <p className="text-gray-400 text-xs font-mono mb-6 uppercase tracking-wide">
                SYSTEM TESTING METRICS REVEAL EXTRAORDINARY SYSTEM RESILIENCE PROFILES ACROSS HIGH-STRESS APPLICATIONS:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features && service.features.length > 0 ? (
                  service.features.map((f) => (
                    <div key={f} className="flex items-start gap-3 p-4 bg-brand-dark/60 border border-blue-950/40 rounded-sm">
                      <CheckCircle size={15} style={{ color: '#64dfdf' }} className="flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-xs font-mono uppercase tracking-wide font-medium">{f}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-xs font-mono">NO FEATURE METRIC DATA PRESENT</div>
                )}
              </div>
            </div>

            {/* INDUSTRIAL APPLICATIONS ZONES */}
            <div className="bg-[#001a38] border border-blue-950/50 p-8 rounded-sm relative shadow-xl">
              <div style={{ borderColor: '#fcbf49' }} className="absolute left-0 top-6 bottom-6 border-l-2" />
              <h2 className="font-display font-black text-xl text-white tracking-wider uppercase mb-5 flex items-center gap-2.5">
                <Radio size={18} style={{ color: '#fcbf49' }} />
                3. FIELD INGRESS ZONES & OPERATION DEMANDS
              </h2>
              <p className="text-gray-400 text-xs font-mono mb-6 uppercase tracking-wide">
                FORMULATED FOR DIRECT INTEGRATION INTO STRESS INFRASTRUCTURE SEGMENTS REQUIRING ABSOLUTE CONTAINMENT:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {service.applications && service.applications.length > 0 ? (
                  service.applications.map((a) => (
                    <div key={a} className="p-3.5 bg-brand-dark/60 border border-blue-950/40 border-l-2 border-l-orange-500 rounded-sm">
                      <span className="text-gray-300 font-sans text-xs font-bold uppercase tracking-wide block">{a}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-xs font-mono">NO EXECUTED ZONE PARAMETERS MAPPED</div>
                )}
              </div>
            </div>

            {/* SEO DEEP KNOWLEDGE BLOCK */}
            <div className="p-8 bg-gradient-to-br from-[#001a38] to-brand-dark border border-blue-950/60 border-t-2 border-t-blue-500 rounded-sm shadow-2xl">
              <h3 className="font-display font-black text-lg text-white mb-4 uppercase tracking-tight">
                Engineering Long-Term Structural Lifelines with ZasChem India
              </h3>
              <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                <p>
                  ZasChem India brings over 12+ years of hardcore engineering application data to every high-risk environment project. Our deployment teams conduct structural stress reviews, ultrasonic substrate logging, and chemical vapor emissions checks before specifying the final reactive layer system sheet. This absolute precision ensures zero chemical decomposition and zero interface blistering under intense chemical stress loads.
                </p>
                <p>
                  By deploying high-density <strong className="text-gray-300">polyurea elastomeric protective coatings</strong> and targeted <strong className="text-gray-300">carbon fiber wrapping structural reinforcement composites</strong>, we completely isolate internal structural rebar systems from corrosive atmospheric fluids, heavy moisture cycles, and industrial effluent exposure profiles. Every asset handoff is governed by stringent quality reporting benchmarks, maintaining structural security without expensive production shutdowns or regular maintenance intervals.
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar - High Premium Utility Widgets */}
          <div className="space-y-6">
            
            {/* TECHNICAL QUOTE CARD */}
            <div className="bg-[#001a38] border border-blue-950/60 p-6 rounded-sm shadow-xl border-t-2 border-t-orange-500 md:sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Award size={18} style={{ color: '#f77f00' }} />
                <h3 className="font-display font-black text-sm tracking-wider text-white uppercase">SYSTEM COST AUDIT</h3>
              </div>
              <p className="text-gray-400 text-xs font-sans leading-relaxed mb-6">
                Connect directly with our master plant protection specialists. We provide on-site diagnostics, core profiling analytics, and full system estimation metrics with zero hassle.
              </p>
              
              <Link
                href="/contact"
                style={{ backgroundColor: '#f77f00' }}
                className="w-full flex items-center justify-center gap-2 text-white font-mono text-xs font-bold tracking-widest uppercase py-3.5 px-4 hover:bg-orange-600 rounded-sm transition-all shadow-lg mb-3"
              >
                REQUEST QUOTE <ArrowRight size={14} />
              </Link>
              
              <a
                href="tel:+91-91-7004298988"
                className="w-full flex items-center justify-center gap-2 bg-brand-dark hover:bg-brand-darker border border-blue-950/60 text-white font-mono text-xs font-bold tracking-widest uppercase py-3.5 px-4 rounded-sm transition-all"
              >
                <Phone size={14} style={{ color: '#64dfdf' }} /> CALL ENGINEER
              </a>

              <div className="mt-6 pt-5 border-t border-blue-950/60 space-y-2.5">
                {[
                  'Pan-India Industrial Asset Logistics',
                  'Ultrasonic Core Diagnostics Included',
                  'Extended Long-Term System Warranties',
                  'Certified Mechanical Applicators'
                ].map((b) => (
                  <div key={b} className="flex items-center gap-2.5 text-[11px] font-mono text-gray-400 uppercase tracking-wide">
                    <CheckCircle size={12} style={{ color: '#64dfdf' }} className="shrink-0" /> {b}
                  </div>
                ))}
              </div>
            </div>

            {/* SIBLING SERVICE CONNECTOR */}
            <div className="bg-[#001a38] border border-blue-950/60 p-6 rounded-sm shadow-xl">
              <h3 className="font-display font-black text-xs tracking-widest text-white uppercase mb-4 border-b border-blue-950 pb-3">
                RELATED INDUSTRIAL MECHANISMS
              </h3>
              <div className="space-y-1.5">
                {related && related.length > 0 ? (
                  related.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="flex items-center gap-2 p-2.5 bg-brand-dark/40 hover:bg-brand-dark border border-transparent hover:border-blue-950/40 rounded-sm text-gray-400 hover:text-white transition-all text-xs font-mono uppercase tracking-wide group"
                    >
                      <ArrowRight
                        size={11}
                        style={{ color: '#64dfdf' }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      />
                      <span className="truncate">{s.title}</span>
                    </Link>
                  ))
                ) : (
                  <p className="text-[11px] font-mono text-gray-600 uppercase italic">No parallel applications registered</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      <CTABanner />
    </div>
  );
}