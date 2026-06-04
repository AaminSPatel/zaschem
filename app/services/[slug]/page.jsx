import { notFound } from 'next/navigation';
import ServiceDetailClient from './ServiceSlugClient';
import { fetchServiceBySlug, fetchServices } from '@/lib/apiClient';

export const dynamic = 'force-dynamic';

function normalizeSlug(slug) {
  if (Array.isArray(slug)) return slug[0];
  return slug;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = normalizeSlug(resolvedParams?.slug);

  if (!slug) {
    return { title: 'Service Not Found' };
  }

  const decodedSlug = decodeURIComponent(String(slug)).trim();

  const res = await fetchServiceBySlug(decodedSlug).catch(() => null);
  const service = res?.data;

  if (!service) {
    return { title: 'Service Not Found' };
  }

  const imageUrl = service?.image?.url || service?.image || '/logo.avif';

  const title = `${service.title} | ZasChem India`;
  const description = service?.shortDesc || service?.metaDesc || 'Industrial waterproofing service';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.zaschem.in/services/${decodedSlug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: service?.title || 'ZasChem India',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ServiceDetailPageServer({ params }) {
  const resolvedParams = await params;
  const slug = normalizeSlug(resolvedParams?.slug);

  if (!slug) {
    notFound();
  }

  const decodedSlug = decodeURIComponent(String(slug)).trim();

  const res = await fetchServiceBySlug(decodedSlug).catch(() => null);
  const service = res?.data;
console.log('service data', service)
  if (!service) notFound();

  // Related services
  const listRes = await fetchServices().catch(() => null);
  const allServices = listRes?.data ?? listRes ?? [];

  const related = Array.isArray(allServices)
    ? allServices.filter((s) => s.slug !== service.slug).slice(0, 3)
    : [];

  // serviceSlugClient expects: { title, shortDesc, description, features, applications, image, slug }
  return <ServiceDetailClient service={service} related={related} />;
}



