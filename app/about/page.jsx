import CTABanner from '@/components/sections/CTABanner';
import StatsSection from '@/components/sections/StatsSection';

export const metadata = {
  title: 'About ZasChem India | Industrial Infrastructure Protection Specialists',
  description: 'ZasChem India is a specialized contractor for industrial waterproofing, structural rehabilitation, and protective coating. 12+ years experience, ISO certified.',
  alternates: { canonical: 'https://www.zaschem.in/about' },
};

const milestones = [
  { year: '2012', event: 'ZasChem India founded with focus on industrial waterproofing' },
  { year: '2015', event: 'First major power plant contract — NTPC cooling tower rehabilitation' },
  { year: '2017', event: 'ISO 9001:2015 certification achieved' },
  { year: '2019', event: 'Expanded to tunnel and dam rehabilitation' },
  { year: '2021', event: 'Pan-India presence across 15+ states' },
  { year: '2023', event: '100+ projects milestone. 25 power plants served.' },
];

const team = [
  {
    name: 'Er. Rajesh Ranjan',
    role: 'Chief Technical Officer',
    desc: '15+ years of experience in structural engineering and advanced polyurea applications.',
  },
  {
    name: 'Amit Kumar Mishra',
    role: 'VP - Operations',
    desc: 'Manages multi-state project execution, vendor logistics, and site engineering teams across India.',
  },
  {
    name: 'Sanjay Thapa',
    role: 'Head of Quality Assurance',
    desc: 'NACE certified coating inspector managing zero-compromise compliance and safety standards.',
  },
];

export default function AboutPage() {
  // Rich Custom Dark Blue Hex codes to guarantee it looks precise
  const bgDarkBlue = '#010e1f'; 
  const bgCardBlue = '#031a38';
  const borderLight = 'rgba(255,255,255,0.1)';

  return (
    <div style={{ backgroundColor: bgDarkBlue }} className="min-h-screen text-brand-light">
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80" alt="About ZasChem India" className="w-full h-full object-cover opacity-15" />
          {/* Soft gradient fading into our rich dark blue background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#010e1f]/80 to-[#010e1f]" />
          <div className="absolute inset-0 grid-lines opacity-20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="section-label mb-5 text-brand-blue">ABOUT US</div>
          <h1 className="font-display font-black text-5xl md:text-7xl text-white tracking-tight leading-none mb-6">
            BUILDING INDIA&apos;S<br /><span className="text-brand-blue">INFRASTRUCTURE</span><br />SINCE 2012
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl leading-relaxed">
            ZasChem India Pvt. Ltd. is one of India&apos;s leading specialized contractors in industrial waterproofing, structural rehabilitation, protective coating, and infrastructure protection. With over a decade of proven expertise, we serve power plants, tunnels, dams, and industrial facilities nationwide.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-4 text-brand-orange">OUR STORY</div>
            <h2 className="font-display font-black text-4xl text-white mb-6">ENGINEERING TRUST SINCE 2012</h2>
            <div className="space-y-4 text-brand-muted leading-relaxed">
              <p>ZasChem India was founded in 2012 with a singular mission: to bring international-standard waterproofing and infrastructure protection to India&apos;s rapidly growing industrial sector. Our founders recognized the massive gap between available solutions and what critical infrastructure truly needed.</p>
              <p>Starting with industrial waterproofing for power plants in the Jharkhand region, we expanded rapidly to structural rehabilitation, acid resistant lining, polyurea coating, and specialized flooring systems. Each project deepened our understanding of India&apos;s diverse industrial environments.</p>
              <p>Today, ZasChem India operates across 15+ states with 100+ successfully completed projects. Our team of 50+ certified engineers and applicators remains committed to our founding principle: deliver solutions that outlast expectations.</p>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=900&q=80" alt="ZasChem India projects" className="w-full h-96 object-cover" />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-blue" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-orange" />
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-4 text-brand-blue">OUR JOURNEY</div>
            <h2 className="font-display font-black text-4xl text-white">KEY MILESTONES</h2>
          </div>
          <div className="space-y-6 relative">
            <div className="absolute left-16 top-0 bottom-0 w-px" style={{ backgroundColor: borderLight }} />
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-8 items-start">
                <div className="w-14 font-mono text-brand-blue font-bold text-sm flex-shrink-0 text-right pt-1">{m.year}</div>
                <div className="w-3 h-3 bg-brand-blue border-2 border-[#010e1f] rounded-full flex-shrink-0 mt-1.5" />
                <div style={{ backgroundColor: bgCardBlue, borderColor: borderLight }} className="border p-4 flex-1 rounded-sm">
                  <p className="text-white font-display font-semibold">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Founder Section */}
      <section className="py-24 border-t" style={{ borderColor: borderLight }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-label justify-center mb-4 text-brand-blue">LEADERSHIP</div>
            <h2 className="font-display font-black text-4xl text-white md:text-5xl tracking-tight">
              THE MINDS BEHIND <span className="text-brand-orange">ZASCHEM</span>
            </h2>
          </div>

          {/* Premium Founder Spotlight Card */}
          <div 
            style={{ borderColor: 'rgba(0,130,251,0.3)', background: `linear-gradient(135deg, rgba(0,130,251,0.1) 0%, rgba(3,26,56,0.6) 100%)` }}
            className="relative max-w-5xl mx-auto mb-20 border rounded-lg p-8 md:p-12 shadow-2xl overflow-hidden backdrop-blur-sm group hover:border-brand-blue/60 transition-all duration-500"
          >
            {/* Ambient glows behind the card content */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
            
            {/* Structural corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-brand-blue" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-brand-orange" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Founder Image Holder */}
              <div className="lg:col-span-4 relative group">
                <div style={{ backgroundColor: bgDarkBlue, borderColor: borderLight }} className="relative w-full aspect-square md:max-w-[280px] mx-auto lg:max-w-none border overflow-hidden">
                  <img 
                    src="/founder_of_zaschem.png" 
                    alt="Mohammad Miraj Siddiquee" 
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010e1f] via-transparent to-transparent opacity-60" />
                </div>
                <div className="absolute -inset-2 border border-brand-orange/20 -z-10 group-hover:inset-1 transition-all duration-500" />
              </div>

              {/* Founder Details Content */}
              <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
                <div>
                  <span className="inline-block font-mono text-xs font-bold tracking-widest text-brand-orange uppercase bg-brand-orange/10 px-3 py-1 mb-3 border border-brand-orange/20">
                    Founder & Managing Director
                  </span>
                  <h3 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight leading-none mb-2">
                    Mohammad Miraj <br className="hidden md:inline"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">Siddiquee</span>
                  </h3>
                  <div className="h-1 w-20 bg-brand-blue mx-auto lg:mx-0 mt-3" />
                </div>
                
                <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic max-w-3xl">
                  &quot;We don&apos;t just coat structures; we engineer the generational safety of India&apos;s industrial backbone. Our standard is execution that never requires a second attempt.&quot;
                </p>

                <p className="text-brand-muted text-sm md:text-base leading-relaxed">
                  Visionary entrepreneur and industrial specialist with over a decade of hands-on leadership. Mohammad Miraj Siddiquee founded ZasChem India with a raw commitment to introduce absolute precision and ultra-durable protection systems across high-risk infrastructural setups nationwide. Under his direct command, the organization scaled from regional troubleshooting to handling heavy-duty projects for mega entities like NTPC.
                </p>

                {/* Badges/Highlights of Founder */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4" style={{ borderTop: `1px solid ${borderLight}` }}>
                  <div className="text-center lg:text-left">
                    <div className="text-brand-blue font-mono font-black text-xl">12+ Yrs</div>
                    <div className="text-brand-muted text-xs uppercase tracking-wider">Industrial Domain Authority</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-brand-orange font-mono font-black text-xl">100+ Proj</div>
                    <div className="text-brand-muted text-xs uppercase tracking-wider">Executed Under Guidance</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1 text-center lg:text-left">
                    <div className="text-white font-mono font-black text-xl">Pan-India</div>
                    <div className="text-brand-muted text-xs uppercase tracking-wider">Strategic Operations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Team Members Grid */}
          <div className="mt-16">
            <h4 className="font-display font-bold text-xl text-center text-brand-muted uppercase tracking-widest mb-10">
              Core Execution Team
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member) => (
                <div 
                  key={member.name} 
                  style={{ backgroundColor: bgCardBlue, borderColor: borderLight }}
                  className="p-6 border-t-2 border-t-brand-blue/40 border-x border-b rounded-sm hover:border-brand-blue/80 transition-all duration-300"
                >
                  <div className="text-brand-blue font-mono text-xs font-bold tracking-wider uppercase mb-1">{member.role}</div>
                  <h5 className="font-display font-black text-lg text-white mb-3">{member.name}</h5>
                  <p className="text-brand-muted text-sm leading-relaxed">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 border-y" style={{ backgroundColor: bgCardBlue, borderColor: borderLight }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-4 text-brand-blue">OUR VALUES</div>
            <h2 className="font-display font-black text-4xl text-white">WHAT DRIVES US</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Technical Excellence', desc: 'Continuous investment in training, certification, and technology ensures best-in-class results on every project.', accent: '#0F5EFF' },
              { title: 'Integrity First', desc: 'We recommend only what your structure truly needs. Honest assessment, transparent execution, no shortcuts.', accent: '#F97316' },
              { title: 'Long-term Partnership', desc: 'Our relationship extends beyond handover. Maintenance support and decade-long warranties are standard.', accent: '#0F5EFF' },
            ].map((v) => (
              <div key={v.title} style={{ backgroundColor: bgDarkBlue, borderColor: borderLight }} className="border p-8 rounded-sm" style={{ borderTop: `2px solid ${v.accent}` }}>
                <h3 className="font-display font-black text-xl text-white mb-3">{v.title}</h3>
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