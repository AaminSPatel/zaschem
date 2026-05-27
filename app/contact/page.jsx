'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteConfig, faqs } from '@/data/siteData';
// TODO: Replace with backend API — submitContactForm('/api/contact')
const submitContactForm = async () => ({ success: true });

const services = [
  'Waterproofing Systems', 'Structural Strengthening', 'Repair & Rehabilitation',
  'Acid Resistant Lining', 'Industrial Flooring', 'Polyurea Waterproofing',
  'Heat Reflective Coating', 'PU Waterproofing', 'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await submitContactForm(form);
      if (res?.success) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue" />
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-brand-muted mb-6 font-mono">
            <Link href="/" className="hover:text-brand-blue">HOME</Link>
            <ChevronRight size={12} />
            <span className="text-brand-orange">CONTACT</span>
          </nav>
          <div className="section-label mb-4">GET IN TOUCH</div>
          <h1 className="font-display font-black text-5xl md:text-6xl text-on-bg tracking-tight leading-none mb-4">
            LET&apos;S DISCUSS<br /><span className="text-brand-blue">YOUR PROJECT</span>
          </h1>
          <p className="text-brand-muted text-lg max-w-xl">
            Our engineering team responds within 24 hours. Free site survey and technical consultation for all qualified projects.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
            <div className="card-industrial p-8 md:p-10">
              <h2 className="font-display font-black text-2xl text-on-bg mb-2">REQUEST A QUOTE</h2>
              <p className="text-brand-muted text-sm mb-8">Fill out the form and our technical team will get back to you within 24 hours.</p>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-green-500/20 border border-green-500/40 flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h3 className="font-display font-black text-2xl text-on-bg mb-2">MESSAGE RECEIVED!</h3>
                  <p className="text-brand-muted max-w-sm">Our engineering team will contact you within 24 hours. Thank you for reaching out to ZasChem India.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-xs text-brand-muted tracking-wider mb-2">FULL NAME *</label>
                      <input name="name" required value={form.name} onChange={handle}
                        className="w-full bg-brand-darker border border-brand-border text-on-bg px-4 py-3 text-sm focus:outline-none focus:border-brand-blue transition-colors placeholder:text-brand-muted/50"
                        placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-brand-muted tracking-wider mb-2">COMPANY NAME *</label>
                      <input name="company" required value={form.company} onChange={handle}
                        className="w-full bg-brand-darker border border-brand-border text-on-bg px-4 py-3 text-sm focus:outline-none focus:border-brand-blue transition-colors placeholder:text-brand-muted/50"
                        placeholder="Company / Organization" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-xs text-brand-muted tracking-wider mb-2">PHONE NUMBER *</label>
                      <input name="phone" type="tel" required value={form.phone} onChange={handle}
                        className="w-full bg-brand-darker border border-brand-border text-on-bg px-4 py-3 text-sm focus:outline-none focus:border-brand-blue transition-colors placeholder:text-brand-muted/50"
                        placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-brand-muted tracking-wider mb-2">EMAIL ADDRESS</label>
                      <input name="email" type="email" value={form.email} onChange={handle}
                        className="w-full bg-brand-darker border border-brand-border text-on-bg px-4 py-3 text-sm focus:outline-none focus:border-brand-blue transition-colors placeholder:text-brand-muted/50"
                        placeholder="email@company.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-brand-muted tracking-wider mb-2">SERVICE REQUIRED *</label>
                    <select name="service" required value={form.service} onChange={handle}
                      className="w-full bg-brand-darker border border-brand-border text-on-bg px-4 py-3 text-sm focus:outline-none focus:border-brand-blue transition-colors">
                      <option value="">Select a service...</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-brand-muted tracking-wider mb-2">PROJECT DESCRIPTION *</label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handle}
                      className="w-full bg-brand-darker border border-brand-border text-on-bg px-4 py-3 text-sm focus:outline-none focus:border-brand-blue transition-colors placeholder:text-brand-muted/50 resize-none"
                      placeholder="Describe your project — location, structure type, problem, area size, timeline..." />
                  </div>
                  {status === 'error' && (
                    <p className="text-red-400 text-sm">Something went wrong. Please call us directly.</p>
                  )}
                  <button type="submit" disabled={status === 'loading'}
                    className="btn-primary flex items-center gap-2 justify-center w-full md:w-auto px-10 py-4 text-base disabled:opacity-60">
                    {status === 'loading' ? 'SENDING...' : <><Send size={16} /> SEND ENQUIRY</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact info */}
            <div className="card-industrial p-7">
              <h3 className="font-display font-bold text-lg text-on-bg mb-6">CONTACT INFORMATION</h3>
              <div className="space-y-5">
                <a href={`tel:${siteConfig.phone}`} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-brand-muted tracking-wider mb-1">CALL US</p>
                    <p className="text-on-bg group-hover:text-brand-orange transition-colors">{siteConfig.phone}</p>
                  </div>
                </a>
                <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-brand-blue" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-brand-muted tracking-wider mb-1">EMAIL US</p>
                    <p className="text-on-bg group-hover:text-brand-blue transition-colors">{siteConfig.email}</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-brand-muted tracking-wider mb-1">OFFICE</p>
                    <p className="text-on-bg text-sm">{siteConfig.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-brand-blue" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-brand-muted tracking-wider mb-1">WORKING HOURS</p>
                    <p className="text-on-bg text-sm">Mon–Sat: 9:00 AM – 6:00 PM</p>
                    <p className="text-brand-muted text-xs">Emergency: 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Areas */}
            <div className="card-industrial p-7">
              <h3 className="font-display font-bold text-base text-on-bg mb-4">SERVICE AREAS</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Delhi NCR', 'Noida', 'Ranchi', 'Cuttack', 'Hyderabad', 'Mumbai', 'Ahmedabad', 'Kolkata', 'Chennai', 'Bengaluru'].map((city) => (
                  <span key={city} className="flex items-center gap-1.5 text-xs text-brand-muted">
                    <span className="w-1 h-1 bg-brand-blue rounded-full flex-shrink-0" />{city}
                  </span>
                ))}
              </div>
              <p className="text-brand-muted text-xs mt-3 border-t border-brand-border pt-3">+ 15 more states across India</p>
            </div>

            {/* Promises */}
            <div className="card-industrial p-7 border-t-2 border-t-brand-blue">
              <h3 className="font-display font-bold text-base text-on-bg mb-4">OUR PROMISE</h3>
              {['Response within 24 hours', 'Free technical consultation', 'No-obligation site survey', 'Competitive project pricing'].map((p) => (
                <div key={p} className="flex items-center gap-2 mb-3 text-sm text-brand-muted">
                  <CheckCircle size={13} className="text-brand-blue flex-shrink-0" /> {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-brand-card border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-3">FREQUENTLY ASKED</div>
<h2 className="font-display font-black text-3xl text-on-bg">COMMON QUESTIONS</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="card-industrial group">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-display font-bold text-base text-on-bg group-open:text-brand-blue transition-colors pr-4">{faq.q}</span>
                  <span className="text-brand-blue text-xl flex-shrink-0">+</span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-brand-muted text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}