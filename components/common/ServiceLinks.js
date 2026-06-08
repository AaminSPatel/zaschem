import { siteConfig } from '@/data/siteData';

export const localServiceLinks = [
  { label: 'Waterproofing Systems', href: '/services/waterproofing-systems' },
  { label: 'Structural Strengthening', href: '/services/structural-strengthening' },
  { label: 'Repair & Rehabilitation', href: '/services/repair-rehabilitation' },
  { label: 'Acid Resistant Lining', href: '/services/acid-resistant-lining' },
  { label: 'Industrial Flooring', href: '/services/industrial-flooring' },
  { label: 'Polyurea Waterproofing', href: '/services/polyurea-waterproofing' },
  { label: 'Heat Reflective Coating', href: '/services/heat-reflective-coating' },
  { label: 'PU Waterproofing', href: '/services/pu-waterproofing' },
];

export function normalizeServiceForLinks(s) {
  const slug = s?.slug;
  const title = s?.title || s?.name;
  if (!slug) return null;
  if (!title) return { slug, label: slug, href: `/services/${slug}` };
  return { slug, label: title, href: `/services/${slug}` };
}

export function buildServiceLinksFromServer(services) {
  if (!Array.isArray(services)) return [];
  return services
    .map(normalizeServiceForLinks)
    .filter(Boolean)
    .map((x) => ({ label: x.label, href: x.href, slug: x.slug }));
}

