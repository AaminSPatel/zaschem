"use client";

import { useEffect, useMemo, useState } from 'react';
import { fetchServices } from '@/lib/apiClient';
import { buildServiceLinksFromServer, localServiceLinks } from './ServiceLinks';

export default function ServiceLinksClient({ children, localLinks = localServiceLinks }) {
  const [serverLinks, setServerLinks] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetchServices();
        const data = res?.data ?? res;
        if (!mounted) return;
        const links = buildServiceLinksFromServer(data);
        if (links.length) setServerLinks(links);
      } catch {
        // keep local fallback
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const links = useMemo(() => {
    if (Array.isArray(serverLinks) && serverLinks.length) return serverLinks;
    return (Array.isArray(localLinks) ? localLinks : localServiceLinks).map((l) => ({
      label: l.label,
      href: l.href,
    }));
  }, [serverLinks, localLinks]);

  return children(links);
}

