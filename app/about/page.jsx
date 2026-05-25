import CTABanner from '@/components/sections/CTABanner';
import StatsSection from '@/components/sections/StatsSection';

export const metadata = {
  title: 'About ZAS Chem India | Industrial Infrastructure Protection Specialists',
  description: 'ZAS Chem India is a specialized contractor for industrial waterproofing, structural rehabilitation, and protective coating. 12+ years experience, ISO certified.',
  alternates: { canonical: 'https://www.zaschem.in/about' },
};

const milestones = [
  { year: '2012', event: 'ZAS Chem India founded with focus on industrial waterproofing' },
  { year: '2015', event: 'First major power plant contract — NTPC cooling tower rehabilitation' },
  { year: '2017', event: 'ISO 9001:2015 certification achieved' },
  { year: '2019', event: 'Expanded to tunnel and dam rehabilitation' },
  { year: '2021', event: 'Pan-India presence across 15+ states' },
  { year: '2023', event: '100+ projects milestone. 25 power plants served.' },
];

export default function AboutPage() {
  return (
    <div className="bg-brand-dark">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80" alt="About ZAS Chem India" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 to-brand-dark" />
          <div className="absolute inset-0 grid-lines opacity-20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="section-label mb-5">ABOUT US</div>
<h1 className="font-display font-black text-5xl md:text-7xl text-brand-light tracking-tight leading-none mb-6">
            BUILDING INDIA&apos;S<br /><span className="text-brand-blue">INFRASTRUCTURE</span><br />SINCE 2012
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl leading-relaxed">
            ZAS Chem India Pvt. Ltd. is one of India&apos;s leading specialized contractors in industrial waterproofing, structural rehabilitation, protective coating, and infrastructure protection. With over a decade of proven expertise, we serve power plants, tunnels, dams, and industrial facilities nationwide.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-4">OUR STORY</div>
<h2 className="font-display font-black text-4xl text-on-bg mb-6">ENGINEERING TRUST SINCE 2012</h2>
            <div className="space-y-4 text-brand-muted leading-relaxed">
              <p>ZAS Chem India was founded in 2012 with a singular mission: to bring international-standard waterproofing and infrastructure protection to India&apos;s rapidly growing industrial sector. Our founders recognized the massive gap between available solutions and what critical infrastructure truly needed.</p>
              <p>Starting with industrial waterproofing for power plants in the Jharkhand region, we expanded rapidly to structural rehabilitation, acid resistant lining, polyurea coating, and specialized flooring systems. Each project deepened our understanding of India&apos;s diverse industrial environments.</p>
              <p>Today, ZAS Chem India operates across 15+ states with 100+ successfully completed projects. Our team of 50+ certified engineers and applicators remains committed to our founding principle: deliver solutions that outlast expectations.</p>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=900&q=80" alt="ZAS Chem India projects" className="w-full h-96 object-cover" />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-blue" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-orange" />
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-4 text-on-bg">OUR JOURNEY</div>
<h2 className="font-display font-black text-4xl text-on-bg">KEY MILESTONES</h2>
          </div>
          <div className="space-y-6 relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-brand-border" />
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-8 items-start">
                <div className="w-14 font-mono text-brand-blue font-bold text-sm flex-shrink-0 text-right pt-1">{m.year}</div>
                <div className="w-3 h-3 bg-brand-blue border-2 border-brand-darker rounded-full flex-shrink-0 mt-1.5" />
                <div className="card-industrial p-4 flex-1">
                  <p className="text-on-bg font-display font-semibold">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-brand-card border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-4">OUR VALUES</div>
<h2 className="font-display font-black text-4xl text-on-bg">WHAT DRIVES US</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Technical Excellence', desc: 'Continuous investment in training, certification, and technology ensures best-in-class results on every project.', accent: '#0F5EFF' },
              { title: 'Integrity First', desc: 'We recommend only what your structure truly needs. Honest assessment, transparent execution, no shortcuts.', accent: '#F97316' },
              { title: 'Long-term Partnership', desc: 'Our relationship extends beyond handover. Maintenance support and decade-long warranties are standard.', accent: '#0F5EFF' },
            ].map((v) => (
              <div key={v.title} className="card-industrial p-8" style={{ borderTop: `2px solid ${v.accent}` }}>
<h3 className="font-display font-black text-xl text-on-bg mb-3">{v.title}</h3>
                <p className="text-brand-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}