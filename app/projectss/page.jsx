import Link from 'next/link';
import { MapPin, Building2, ArrowRight, ChevronRight, Calendar } from 'lucide-react';
import { projects } from '@/data/siteData';
import CTABanner from '@/components/sections/CTABanner';

export const metadata = {
  title: 'Industrial Project Portfolio | ZasChem India',
  description: 'Explore ZasChem India\'s portfolio of completed industrial waterproofing, tunnel repair, power plant protection, and structural rehabilitation projects across India.',
  keywords: 'industrial waterproofing projects India, power plant waterproofing portfolio, tunnel repair case studies',
  alternates: { canonical: 'https://www.zaschem.in/projects' },
  openGraph: {
    title: 'Industrial Project Portfolio | ZasChem India',
    description: 'Explore ZasChem India\'s portfolio of completed industrial waterproofing, tunnel repair, power plant protection, and structural rehabilitation projects across India.',
    url: 'https://www.zaschem.in/projects',
    images: [{ url: '/logo.avif', width: 1200, height: 630, alt: 'ZasChem India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industrial Project Portfolio | ZasChem India',
    description: 'Explore ZasChem India\'s portfolio of completed industrial waterproofing, tunnel repair, power plant protection, and structural rehabilitation projects across India.',
    images: ['/logo.avif'],
  },
};

const categories = ['All', ...new Set(projects.map((p) => p.category))];

export default function ProjectsPage() {
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
            <span className="text-brand-orange">PROJECTS</span>
          </nav>
          <div className="section-label mb-4">OUR PORTFOLIO</div>
          <h1 className="font-display font-black text-5xl md:text-6xl text-on-bg tracking-tight leading-none mb-4">
            INDUSTRIAL<br /><span className="text-brand-blue">CASE STUDIES</span>
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl">
            100+ completed projects across India's critical infrastructure — power plants, tunnels, dams, chemical plants, and industrial facilities. Real problems. Engineered solutions. Lasting results.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-brand-border bg-brand-card">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-border">
          {[['100+', 'Projects'], ['25+', 'Power Plants'], ['15+', 'States'], ['12+', 'Years']].map(([val, label]) => (
            <div key={label} className="px-6 text-center">
<p className="font-display font-black text-3xl text-on-bg">{val}</p>
              <p className="font-mono text-xs text-brand-muted mt-1 tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Filter */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <span key={cat} className={`px-4 py-2 text-sm font-mono tracking-wider transition-all cursor-pointer
              ${cat === 'All' ? 'bg-brand-blue text-on-bg' : 'bg-brand-card border border-brand-border text-brand-muted hover:border-brand-blue hover:text-on-bg'}`}>
              {cat.toUpperCase()}
            </span>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`}
              className="group card-industrial overflow-hidden hover:border-brand-blue/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-blue/10">
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/40 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-1 bg-brand-blue/90 text-on-bg text-xs font-mono">{project.category}</span>
                  {project.featured && <span className="px-2 py-1 bg-brand-orange/90 text-on-bg text-xs font-mono">FEATURED</span>}
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-brand-darker/80 px-2 py-1">
                  <Calendar size={10} className="text-brand-muted" />
                  <span className="font-mono text-xs text-brand-muted">{project.year}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="font-display font-bold text-lg text-on-bg mb-2 group-hover:text-brand-blue transition-colors leading-tight">
                  {project.title}
                </h2>
                <div className="flex flex-wrap gap-3 mb-4 text-xs text-brand-muted">
                  <span className="flex items-center gap-1"><Building2 size={10} className="text-brand-orange" />{project.client}</span>
                  <span className="flex items-center gap-1"><MapPin size={10} className="text-brand-blue" />{project.location}</span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-brand-muted">
                    <span className="text-brand-orange font-mono tracking-wider">CHALLENGE: </span>
                    {project.problem.substring(0, 90)}...
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-brand-darker border border-brand-border text-xs text-brand-muted">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-brand-blue text-sm font-display font-bold tracking-wide group-hover:gap-3 transition-all">
                  VIEW CASE STUDY <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}