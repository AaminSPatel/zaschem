'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ChevronRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteData';
import { createContactInquiry } from '@/lib/apiClient';

const services = [
  'Waterproofing Systems', 'Structural Strengthening', 'Repair & Rehabilitation',
  'Acid Resistant Lining', 'Industrial Flooring', 'Polyurea Waterproofing',
  'Heat Reflective Coating', 'PU Waterproofing', 'Other',
];

// High-intent SEO FAQ Data for direct search crawling
const contactPageFaqs = [
  {
    q: "How do I choose the right industrial waterproofing contractors for commercial projects?",
    a: "Choosing professional industrial waterproofing contractors requires assessing structural history, substrate condition, and thermal dynamics. ZasChem India utilizes specialized evaluation metrics, non-destructive moisture diagnostics, and premium elastomeric configurations to counter systemic leakage instead of deploying temporary surface patches."
  },
  {
    q: "What specialized structural strengthening solutions do you provide across India?",
    a: "Our advanced structural strengthening solutions include structural carbon fiber wrapping, high-tensile polymer grid bracing, micro-concrete jacket encasements, and localized crystalline pressure injections. These workflows are engineered to enhance load bearing thresholds and satisfy stringent heavy infrastructure safety benchmarks."
  },
  {
    q: "Why should we choose premium polyurea coating providers over traditional systems?",
    a: "Selecting certified premium polyurea coating providers India guarantees a seamless, ultra-durable barrier that cures within seconds. Unlike standard PU or bituminous coatings, polyurea provides more than 400% elongation flexibility, outstanding chemical resistance, and long-term crack bridging capability under continuous thermal stress."
  },
  {
    q: "What is your turnaround time for a comprehensive technical site inspection?",
    a: "Our mobile commercial response units formulate an initial proposal setup within 24 hours of form dispatch. Qualified industrial projects, manufacturing spaces, and large-scale infrastructure complexes receive an explicit, no-obligation physical site analysis to determine concrete degradation and precise asset protection planning."
  }
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    console.log('[ContactPage] submit clicked');
    console.log('[ContactPage] payload =', form);

    try {
      const res = await createContactInquiry(form);
      console.log('[ContactPage] backend response =', res);

      if (!res?.success) {
        setStatus('error');
        return;
      }

      // Open WhatsApp chat after backend save completes.
      // Your number: 7004298988
      const inquiry = res?.data || {};
      const phoneTo = '7004298988';

      const messageLines = [
        'New Contact Inquiry - ZasChem India',
        '',
        `Name: ${inquiry?.name || form?.name || ''}`,
        `Company: ${inquiry?.company || form?.company || ''}`,
        `Phone: ${inquiry?.phone || form?.phone || ''}`,
        `Email: ${inquiry?.email || form?.email || ''}`,
        `Service Interested: ${inquiry?.serviceInterested || form?.service || ''}`,
        '',
        'Message:',
        `${inquiry?.message || form?.message || ''}`,
      ];

      const text = messageLines.join('\n').trim();
      const waUrl = `https://wa.me/${phoneTo}?text=${encodeURIComponent(text)}`;

      setStatus('success');

      // Small wait so user sees success UI briefly (and request fully completes).
      setTimeout(() => {
        window.location.href = waUrl;
      }, 900);
    } catch (err) {
      console.error('[ContactPage] submit error =', err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen text-white">
      {/* Hero Section with Premium Unsplash Structural Image Background */}
      <section className="relative py-28 lg:py-36  overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="./industry.avif" 
            alt="Industrial building infrastructure and concrete structural engineering site" 
            className="w-full h-full object-cover opacity-85 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002147]/65 via-[#002255]/80 to-[#002147]" />
          <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
        </div>
        
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#64dfdf] z-10" />

         <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#64dfdf_1px,transparent_1px)] [background-size:24px_24px]" />
          <div 
            style={{ background: 'radial-gradient(circle at 80% 40%, rgba(100,223,223,0.15) 0%, transparent 70%)' }} 
            className="absolute inset-0" 
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-gray-300 mb-6 font-mono tracking-widest">
            <Link href="/" className="hover:text-[#64dfdf] transition-colors">HOME</Link>
            <ChevronRight size={12} className="text-gray-500" />
            <span className="text-[#f77f00]">CONTACT</span>
          </nav>
          
         
           <div 
            style={{ backgroundColor: 'rgba(100,223,223,0.08)', borderColor: 'rgba(100,223,223,0.2)', color: '#64dfdf' }} 
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] uppercase px-3 py-1.5 border rounded-sm mb-6"
          >
            <Shield size={12} style={{ color: '#64dfdf' }} /> PAN-INDIA SERVICE NETWORKS
          </div>
           <h1 
            style={{ color: '#ffffff' }} 
            className="font-display font-black text-4xl md:text-6xl tracking-tight leading-none mb-6"
          >
            LET&apos;S DISCUSS<br />
            <span style={{ color: '#f77f00' }}>YOUR INDUSTRIAL PROJECT</span><br />
           
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl leading-relaxed">
            Get comprehensive commercial evaluation from expert <strong>industrial waterproofing contractors</strong>. ZasChem India provides technical assistance, seamless field assessment, and robust <strong>structural strengthening solutions</strong> tailored specifically for manufacturing plants, heavy warehouses, corporate infrastructure, and civil assets across India.
         </p>
         {/*  <h1 className="font-display font-black text-5xl md:text-6xl text-white tracking-tight leading-none mb-6">
            LET&apos;S DISCUSS<br /><span className="text-[#f77f00] drop-shadow-sm">YOUR INDUSTRIAL PROJECT</span>
          </h1>
          
          <p className="text-gray-300 text-base md:text-lg max-w-3xl leading-relaxed">
            Get comprehensive commercial evaluation from expert <strong>industrial waterproofing contractors</strong>. ZasChem India provides technical assistance, seamless field assessment, and robust <strong>structural strengthening solutions</strong> tailored specifically for manufacturing plants, heavy warehouses, corporate infrastructure, and civil assets across India.
          </p> */}
        </div>
      </section>

      {/* Main Layout Block */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left/Middle Column: Interactive RFQ Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
            <div className="bg-[#004080]/30 border border-white/10 p-8 md:p-10 rounded-sm backdrop-blur-sm relative">
              <div className="absolute top-0 left-0 w-12 h-[2px] bg-[#f77f00]" />
              
              <h2 className="font-display font-black text-2xl text-white mb-2 tracking-wide">REQUEST A TECHNICAL QUOTE</h2>
              <p className="text-gray-300 text-sm mb-8">
                Submit your commercial asset dimensions, structural problems, and technical challenges below. Our specialized engineering squad will examine the design parameters to craft a high-performance, turnkey asset protection outline.
              </p>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4 rounded-sm">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h3 className="font-display font-black text-2xl text-white mb-2">MESSAGE RECEIVED SUCCESSFULLY!</h3>
                  <p className="text-gray-300 text-sm max-w-md leading-relaxed">
                    Thank you for connecting with ZasChem India Private Limited. Your enquiry has been dispatched to our industrial project evaluation center. An expert engineer will review your blueprint and contact you within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-[11px] tracking-wider text-gray-300 uppercase mb-2">FULL NAME *</label>
                      <input name="name" required value={form.name} onChange={handle}
                        className="w-full bg-[#002147]/80 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#64dfdf] transition-colors placeholder:text-gray-500 rounded-sm"
                        placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] tracking-wider text-gray-300 uppercase mb-2">COMPANY NAME *</label>
                      <input name="company" required value={form.company} onChange={handle}
                        className="w-full bg-[#002147]/80 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#64dfdf] transition-colors placeholder:text-gray-500 rounded-sm"
                        placeholder="Company / Organization Name" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-[11px] tracking-wider text-gray-300 uppercase mb-2">PHONE NUMBER *</label>
                      <input name="phone" type="tel" required value={form.phone} onChange={handle}
                        className="w-full bg-[#002147]/80 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#64dfdf] transition-colors placeholder:text-gray-500 rounded-sm"
                        placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] tracking-wider text-gray-300 uppercase mb-2">EMAIL ADDRESS</label>
                      <input name="email" type="email" value={form.email} onChange={handle}
                        className="w-full bg-[#002147]/80 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#64dfdf] transition-colors placeholder:text-gray-500 rounded-sm"
                        placeholder="email@company.com" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block font-mono text-[11px] tracking-wider text-gray-300 uppercase mb-2">SERVICE REQUIRED *</label>
                    <select name="service" required value={form.service} onChange={handle}
                      className="w-full bg-orange-400 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#64dfdf] transition-colors rounded-sm appearance-none">
                      <option value="" className="bg-[#eeeeee]">Select dynamic engineering service...</option>
                      {services.map((s) => <option key={s} value={s} className="bg-[#eeeeee]">{s}</option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block font-mono text-[11px] tracking-wider text-gray-300 uppercase mb-2">PROJECT DESCRIPTION & SITE SPECIFICATIONS *</label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handle}
                      className="w-full bg-[#002147]/80 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#64dfdf] transition-colors placeholder:text-gray-500 resize-none rounded-sm"
                      placeholder="Please specify structural parameters, dimensions in sq. ft., specific substrate leaks, acid layout types, or severe concrete vulnerabilities for specialized rehabilitation scheduling..." />
                  </div>
                  
                  {status === 'error' && (
                    <p className="text-red-400 font-mono text-xs">Transmission failure. Internal channel breakdown — Please call our emergency engineering support desk directly.</p>
                  )}
                  
                  <button type="submit" disabled={status === 'loading'}
                    className="group inline-flex items-center gap-2 justify-center bg-[#f77f00] hover:bg-[#fcbf49] text-white hover:text-[#002147] font-mono font-bold text-xs tracking-widest py-4 px-10 transition-all duration-300 disabled:opacity-60 uppercase rounded-sm shadow-md">
                    {status === 'loading' ? 'PROCESSING ENQUIRY...' : <><Send size={14} /> DISPATCH ENQUIRY</>}
                  </button>
                </form>
              )}
            </div>
            
            {/* Extended Long-Form SEO Structural Content Block */}
            <div className="mt-8 p-6 border border-white/5 bg-[#002147]/30 rounded-sm">
              <h3 className="font-display font-bold text-base text-[#fcbf49] mb-3">PAN-INDIA COMMERCIAL & INDUSTRIAL REHABILITATION HUB</h3>
              <p className="text-gray-300 text-xs leading-relaxed mb-4">
                As prominent <strong>premium polyurea coating providers India</strong> and certified experts in high-grade chemical treatment frameworks, ZasChem India executes specialized chemical mitigation maneuvers for basement rafts, heavy roofs, thermal power cooling tower channels, and massive chemical storage vaults.
              </p>
              <p className="text-gray-300 text-xs leading-relaxed">
                Whether your plant requires state-of-the-art carbon fiber wrapping, specialized crystalline matrix injections, or complete industrial floor overhauls, our process includes precise substrate diagnosing, digital moisture profiling, and non-destructive core analysis before applying any mechanical protection materials.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Sidebar Panels */}
          <div className="space-y-6">
            {/* Contact Info Block */}
            <div className="bg-[#004080]/30 border border-white/10 p-7 rounded-sm backdrop-blur-sm relative">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#64dfdf]" />
              <h3 className="font-display font-bold text-base text-white mb-6 tracking-wide">OFFICIAL COMMUNICATIVE CHANNELS</h3>
              
              <div className="space-y-6">
                <a href={`tel:${siteConfig.phone}`} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#f77f00]/20 group-hover:border-[#f77f00] transition-all rounded-sm">
                    <Phone size={16} className="text-[#fcbf49]" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-gray-400 mb-0.5">DIRECT HELPLINE</p>
                    <p className="text-white font-semibold group-hover:text-[#f77f00] transition-colors">{siteConfig.phone}</p>
                  </div>
                </a>
                
                <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#64dfdf]/20 group-hover:border-[#64dfdf] transition-all rounded-sm">
                    <Mail size={16} className="text-[#64dfdf]" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-gray-400 mb-0.5">CORPORATE CORRESPONDENCE</p>
                    <p className="text-white font-semibold group-hover:text-[#64dfdf] transition-colors">{siteConfig.email}</p>
                  </div>
                </a>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 rounded-sm">
                    <MapPin size={16} className="text-[#f77f00]" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-gray-400 mb-0.5">HEADQUARTERS</p>
                    <p className="text-gray-200 text-xs leading-relaxed">{siteConfig.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 rounded-sm">
                    <Clock size={16} className="text-[#64dfdf]" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-gray-400 mb-0.5">TIMING STATUS</p>
                    <p className="text-gray-200 text-xs">Mon–Sat: 9:00 AM – 6:00 PM</p>
                    <p className="text-[#fcbf49] text-[11px] font-bold mt-0.5">Critical Emergency Site Support: 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Target Locations Panel */}
            <div className="bg-[#004080]/30 border border-white/10 p-7 rounded-sm backdrop-blur-sm">
              <h3 className="font-display font-bold text-sm text-white mb-4 tracking-wider uppercase">ACTIVE SERVICE COVERAGE</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Delhi NCR', 'Noida Industrial Zone', 'Ranchi Hub', 'Cuttack Plant Line', 'Hyderabad Tech', 'Mumbai Industrial', 'Ahmedabad GIDC', 'Kolkata Port Area', 'Chennai Sector', 'Bengaluru Outskirts'].map((city) => (
                  <span key={city} className="flex items-center gap-1.5 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 bg-[#64dfdf] rounded-full flex-shrink-0 shadow-[0_0_4px_#64dfdf]" />{city}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 text-[11px] mt-4 border-t border-white/5 pt-3 font-mono">
                + Multi-tier mobile operational teams servicing across 15+ industrial corridors in India.
              </p>
            </div>

            {/* Quality Seals Panel */}
            <div className="bg-[#004080]/30 border border-white/10 p-7 rounded-sm backdrop-blur-sm border-t-2 border-t-[#f77f00]">
              <h3 className="font-display font-bold text-sm text-white mb-4 tracking-wider uppercase">ZASCHEM ASSURANCE</h3>
              {[
                'Guaranteed Response inside 24 Hours',
                'Advanced NDT Moisture Profiling Assessment',
                'Comprehensive No-Obligation Structural Survey',
                'Tailored Chemical-Resistant Formulation Matrix'
              ].map((promise, index) => (
                <div key={index} className="flex items-start gap-2.5 mb-3.5 text-xs text-gray-200 last:mb-0">
                  <CheckCircle size={14} className="text-[#64dfdf] mt-0.5 flex-shrink-0" />
                  <span>{promise}</span>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* SEO Optimized FAQ Accordion Grid using Static Array Context */}
      <section className="py-24 bg-[#001a35] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-mono text-xs font-bold tracking-[0.2em] text-[#f77f00] uppercase mb-3">FAQ DESK</div>
            <h2 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight">
              INDUSTRIAL WATERPROOFING & REPAIR TECHNICAL INTENT
            </h2>
          </div>
          
          <div className="space-y-4">
            {contactPageFaqs.map((faq, i) => (
              <details key={i} className="bg-[#002147]/40 border border-white/5 group rounded-sm transition-all duration-300 hover:border-white/10">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none">
                  <span className="font-display font-bold text-base text-white group-open:text-[#fcbf49] transition-colors pr-4">{faq.q}</span>
                  <span className="text-[#64dfdf] font-mono text-xl flex-shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-6 border-t border-white/5 pt-4 bg-[#001a35]/40">
                  <p className="text-gray-300 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}