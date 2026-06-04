import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Building2,
  Calendar,
  CheckCircle,
  ArrowRight,
  ChevronRight,
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
    <div className="bg-brand-dark min-h-screen">
      {/* Hero Section - FIXED Image Display */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {/* FIXED: Correct condition and image source */}
          {Selectedproject.image && Selectedproject.image !== '' ? (
            <img
              src={'/'+ Selectedproject.image}
              alt={Selectedproject.title}
              className="w-full h-full object-cover"
            />
          ) : (
            // Fallback image when no image is available
            <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 to-brand-dark flex items-center justify-center">
              <span className="text-white/50 text-lg">No Image Available</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-14">
          <nav className="flex items-center gap-2 text-xs text-brand-muted mb-6">
            <Link href="/">HOME</Link>
            <ChevronRight size={12} />
            <Link href="/projects">PROJECTS</Link>
            <ChevronRight size={12} />
            <span className="text-brand-orange">
              {Selectedproject.category?.toUpperCase()}
            </span>
          </nav>

          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-brand-blue/90 text-xs">
              {Selectedproject.category}
            </span>
            {Selectedproject.featured && (
              <span className="px-3 py-1 bg-brand-orange/90 text-xs">
                FEATURED PROJECT
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            {Selectedproject.title}
          </h1>

          <div className="flex flex-wrap gap-5 text-sm text-brand-muted">
            <span className="flex items-center gap-2">
              <Building2 size={14} />
              {Selectedproject.client}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} />
              {Selectedproject.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} />
              {Selectedproject.year}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 bg-brand-card border">
              <h2 className="text-2xl font-bold mb-4">THE CHALLENGE</h2>
              <p className="text-brand-muted leading-relaxed">{Selectedproject.problem}</p>
            </div>

            <div className="p-8 bg-brand-card border">
              <h2 className="text-2xl font-bold mb-4">OUR SOLUTION</h2>
              <p className="text-brand-muted leading-relaxed">{Selectedproject.solution}</p>
            </div>

            <div className="p-8 bg-brand-card border">
              <h2 className="text-2xl font-bold mb-4">OUTCOME & RESULTS</h2>
              <p className="text-brand-muted leading-relaxed">{Selectedproject.outcome}</p>

              <div className="grid sm:grid-cols-3 gap-3 mt-6">
                {['Zero Rework', 'On-time Delivery', 'Warranty Issued'].map((item) => (
                  <div key={item} className="flex items-center gap-2 p-3 border border-brand-muted/20">
                    <CheckCircle size={14} className="text-brand-orange" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {Selectedproject.tags?.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mb-4">TECHNOLOGIES USED</h3>
                <div className="flex flex-wrap gap-2">
                  {Selectedproject.tags.map((tag) => (
                    <span key={tag} className="px-3 py-2 border border-brand-muted/20 text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card-industrial p-6 bg-brand-card border">
              <h3 className="font-bold mb-4 text-lg">PROJECT DETAILS</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-brand-muted uppercase tracking-wide">Client</p>
                  <p className="font-medium mt-1">{Selectedproject.client}</p>
                </div>
                <div>
                  <p className="text-xs text-brand-muted uppercase tracking-wide">Location</p>
                  <p className="font-medium mt-1">{Selectedproject.location}</p>
                </div>
                <div>
                  <p className="text-xs text-brand-muted uppercase tracking-wide">Year</p>
                  <p className="font-medium mt-1">{Selectedproject.year}</p>
                </div>
                <div>
                  <p className="text-xs text-brand-muted uppercase tracking-wide">Category</p>
                  <p className="font-medium mt-1">{Selectedproject.category}</p>
                </div>
              </div>
            </div>

            <div className="card-industrial p-6 bg-brand-card border">
              <Link
                href="/contact"
                className="btn-primary flex items-center justify-center gap-2 w-full bg-brand-orange text-white py-3 px-4 hover:bg-brand-orange/90 transition-colors"
              >
                GET FREE ASSESSMENT
                <ArrowRight size={14} />
              </Link>
            </div>

            {related.length > 0 && (
              <div className="card-industrial p-6 bg-brand-card border">
                <h3 className="font-bold mb-4 text-lg">MORE PROJECTS</h3>
                <div className="space-y-3">
                  {related.map((p) => (
                    <Link key={p.slug} href={`/projects/${p.slug}`} className="flex gap-3 group">
                      <div className="w-14 h-14 bg-brand-muted/20 overflow-hidden">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full bg-brand-blue/20 flex items-center justify-center">
                            <Building2 size={20} className="text-brand-muted" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold group-hover:text-brand-orange transition-colors">
                          {p.title}
                        </p>
                        <p className="text-sm text-brand-muted">{p.category}</p>
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