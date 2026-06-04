import { notFound } from 'next/navigation';
import { fetchProjectBySlug } from '@/lib/apiClient';
import ProjectSlugClient from './ProjectSlugClient';

export const dynamic = 'force-dynamic';

function normalizeSlug(slug) {
  if (Array.isArray(slug)) return slug[0];
  return slug;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  const slug = normalizeSlug(
    resolvedParams?.slug
  );
  console.log('slug in metqdqtq',slug);

  if (!slug) {
    return {
      title: 'Project Not Found',
    };
  }

  const decodedSlug = decodeURIComponent(
    String(slug)
  ).trim();
  console.log('decoded slug metadata',decodedSlug);

  const res = await fetchProjectBySlug(
    decodedSlug
  ).catch(() => null);

  const project = res?.data;

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const title = `${project.title} | ZasChem India`;

  const description =
    project?.problem?.slice(0, 150) ||
    'Industrial Project Case Study';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.zaschem.in/projects/${decodedSlug}`,
      images: [
        {
          url:
            project?.image?.url ||
            project?.image?.[0]?.url ||
            project?.image ||
            '/logo.avif',
          width: 1200,
          height: 630,
          alt: project?.title || 'ZasChem India',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        project?.image?.url ||
          project?.image?.[0]?.url ||
          project?.image ||
          '/logo.avif',
      ],
    },
  };
}

export default async function ProjectDetailPageServer({
  params,
}) {
  const resolvedParams = await params;

  console.log('resolvedParams =>', resolvedParams);

  const slug = normalizeSlug(
    resolvedParams?.slug
  );

  console.log('slug =>', slug);

  if (!slug) {
    notFound();
  }

  const decodedSlug = decodeURIComponent(
    String(slug)
  ).trim();

  console.log('decodedSlug =>', decodedSlug);

  const res = await fetchProjectBySlug(
    decodedSlug
  ).catch((err) => {
    console.error('fetchProjectBySlug error', err);
    return null;
  });

  console.log('API Response =>', res);

  const project = res?.data;

  console.log('Project =>', project);

  if (!project) {
    notFound();
  }

  return (
    <ProjectSlugClient
      project={project}
    />
  );
}