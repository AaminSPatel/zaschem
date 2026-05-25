import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/app/data/siteData';
import { MapPin, Building2, Calendar, CheckCircle, ArrowRight, ChevronRight, Tag } from 'lucide-react';
import CTABanner from '@/components/sections/CTABanner';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}


export function generateMetadata({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | ZAS Chem India Project Portfolio`,
    description: `Case study: ${project.problem.substring(0, 140)}`,
    alternates: { canonical: `https://www.zaschem.in/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.problem, images: [{ url: project.image }] },
  };
}

export default function ProjectDetailPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);



  return (
    <div className="bg-brand-dark min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/50 to-transparent" />
          <div className="absolute inset-0 grid-lines opacity-15" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-14">
          <nav className="flex items-center gap-2 text-xs text-brand-muted mb-6 font-mono">
            <Link href="/" className="hover:text-brand-blue">HOME</Link>
            <ChevronRight size={12} />
            <Link href="/projects" className="hover:text-brand-blue">PROJECTS</Link>
            <ChevronRight size={12} />
            <span className="text-brand-orange">{project.category.toUpperCase()}</span>
          </nav>
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-brand-blue/90 text-on-bg text-xs font-mono">{project.category}</span>
            {project.featured && <span className="px-3 py-1 bg-brand-orange/90 text-on-bg text-xs font-mono">FEATURED PROJECT</span>}
          </div>
          <h1 className="font-display font-black text-4xl md:text-6xl text-on-bg tracking-tight leading-tight mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-5 text-sm text-brand-muted">
            <span className="flex items-center gap-2"><Building2 size={14} className="text-brand-orange" />{project.client}</span>
            <span className="flex items-center gap-2"><MapPin size={14} className="text-brand-blue" />{project.location}</span>
            <span className="flex items-center gap-2"><Calendar size={14} className="text-brand-muted" />{project.year}</span>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            {/* Problem */}
            <div className="p-8 bg-brand-card border border-brand-border border-l-4 border-l-red-500/70">
              <h2 className="font-display font-black text-2xl text-on-bg mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-red-500/20 flex items-center justify-center text-red-400 text-xs font-mono">01</span>
                THE CHALLENGE
              </h2>
              <p className="text-brand-muted leading-relaxed">{project.problem}</p>
            </div>

            {/* Solution */}
            <div className="p-8 bg-brand-card border border-brand-border border-l-4 border-l-brand-blue">
              <h2 className="font-display font-black text-2xl text-on-bg mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-brand-blue/20 flex items-center justify-center text-brand-blue text-xs font-mono">02</span>
                OUR SOLUTION
              </h2>
              <p className="text-brand-muted leading-relaxed">{project.solution}</p>
            </div>

            {/* Outcome */}
            <div className="p-8 bg-brand-card border border-brand-border border-l-4 border-l-green-500/70">
              <h2 className="font-display font-black text-2xl text-on-bg mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-green-500/20 flex items-center justify-center text-green-400 text-xs font-mono">03</span>
                OUTCOME & RESULTS
              </h2>
              <p className="text-brand-muted leading-relaxed">{project.outcome}</p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Zero Rework', 'On-time Delivery', 'Warranty Issued'].map((r) => (
                  <div key={r} className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20">
                    <CheckCircle size={14} className="text-green-400" />
                    <span className="text-green-300 text-sm">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-display font-bold text-lg text-on-bg mb-4 flex items-center gap-2">
                <Tag size={16} className="text-brand-orange" /> TECHNOLOGIES USED
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-brand-card border border-brand-border text-sm text-brand-muted font-mono">{tag}</span>
                ))}
              </div>
            </div>

            {/* SEO content */}
            <div className="p-8 bg-brand-card border border-brand-border">
              <h3 className="font-display font-bold text-xl text-on-bg mb-3">About This Project</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                This project exemplifies ZAS Chem India&apos;s capability to handle complex industrial infrastructure challenges with engineering precision. Our team mobilized rapidly, conducted thorough assessment, and delivered a solution that addressed the root cause rather than applying temporary fixes. The client&apos;s structure is now protected for decades to come, with complete documentation and warranty support in place.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card-industrial p-6 border-t-2 border-t-brand-blue">
              <h3 className="font-display font-bold text-base text-on-bg mb-4">PROJECT DETAILS</h3>
              <div className="space-y-4">
                {[
                  { label: 'Client', value: project.client, icon: Building2 },
                  { label: 'Location', value: project.location, icon: MapPin },
                  { label: 'Year', value: project.year, icon: Calendar },
                  { label: 'Category', value: project.category, icon: Tag },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-3 pb-3 border-b border-brand-border last:border-0">
                    <Icon size={14} className="text-brand-blue mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-mono text-xs text-brand-muted tracking-wider">{label.toUpperCase()}</p>
                      <p className="text-on-bg text-sm font-medium mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-industrial p-6">
              <h3 className="font-display font-bold text-base text-on-bg mb-3">SIMILAR CHALLENGE?</h3>
              <p className="text-brand-muted text-sm mb-4">We&apos;ve solved problems like this before. Let us assess your structure.</p>
              <Link href="/contact" className="btn-primary w-full flex items-center justify-center gap-2">
                GET FREE ASSESSMENT <ArrowRight size={14} />
              </Link>
            </div>

            {related.length > 0 && (
              <div className="card-industrial p-6">
                <h3 className="font-display font-bold text-base text-on-bg mb-4">MORE PROJECTS</h3>
                <div className="space-y-3">
                  {related.map((p) => (
                    <Link key={p.slug} href={`/projects/${p.slug}`} className="flex gap-3 group hover:bg-brand-darker p-2 transition-colors">
                      <img src={p.image} alt={p.title} className="w-14 h-14 object-cover flex-shrink-0" />
                      <div>
                        <p className="text-on-bg text-xs font-display font-bold group-hover:text-brand-blue transition-colors leading-tight">{p.title}</p>
                        <p className="text-brand-muted text-xs mt-1">{p.category}</p>
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