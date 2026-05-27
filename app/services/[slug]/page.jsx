import { notFound } from 'next/navigation';

import { services } from '@/app/data/siteData';
import ServiceDetailClient from './ServiceSlugClient';


export const generateStaticParams = async () => {
  return services.map((s) => ({ slug: s.slug }));
};

export function generateMetadata({ params }) {
  const slug = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug;
  const service = services?.find((s) => s.slug === slug);



  return {
    title: service?.metaTitle || service?.title || 'Service',
    description: service?.metaDesc || service?.shortDesc || 'Industrial waterproofing service',
    openGraph: {
      title: service?.metaTitle || service?.title || 'Service',
      description: service?.metaDesc || service?.shortDesc || 'Industrial waterproofing service',
      url: `https://www.zaschem.in/services/${slug}`,
      images: [
        {
          url: service?.image || '/logo.avif',
          width: 1200,
          height: 630,
          alt: service?.title || 'ZasChem India',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service?.metaTitle || service?.title || 'Service',
      description: service?.metaDesc || service?.shortDesc || 'Industrial waterproofing service',
      images: [service?.image || '/logo.avif'],
    },
  };
}

export const dynamic = 'force-static';

export default function ServiceDetailPageServer({ params }) {
  const slug = params?.slug;
  // Normalize in case Next runtime provides array-like params.
  const normalizedSlug = Array.isArray(slug) ? slug[0] : slug;

  if (!normalizedSlug) notFound();

  // Normalize URL slug: remove leading/trailing spaces and decode if needed.
  const decodedSlug = typeof normalizedSlug === 'string' ? decodeURIComponent(normalizedSlug).trim() : normalizedSlug;

  const service = services.find((s) => s.slug === decodedSlug);

  if (!service) notFound();


  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return <ServiceDetailClient service={service} related={related} />;
}


