// Schema.org structured data for ZasChem India
// Add to page head via script tag

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ZasChem India Pvt. Ltd.",
    "url": "https://www.zaschem.in",
    "logo": "https://www.zaschem.in/logo.avif",
    "description": "India's trusted specialist in industrial waterproofing, power plant protection, tunnel rehabilitation, acid resistant lining, and structural strengthening.",
    "foundingDate": "2012",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7004298988",
      "contactType": "sales",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.linkedin.com/company/zaschem",
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({ service }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.shortDesc,
    "provider": {
      "@type": "Organization",
      "name": "ZasChem India Pvt. Ltd."
    },
    "areaServed": "IN",
    "serviceType": service.title,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ZasChem India Pvt. Ltd.",
    "image": "https://www.zaschem.in/og-home.avif",
    "url": "https://www.zaschem.in",
    "telephone": "+91-7004298988",
    "email": "info@zaschem.in",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "₹₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Bank Transfer, Cheque",
    "areaServed": ["Delhi","Noida","Ranchi","Cuttack","Hyderabad","Mumbai","India"]
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}