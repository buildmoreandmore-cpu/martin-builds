const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "martin.builds",
  description: "Custom AI tools, websites, and apps for small businesses.",
  url: "https://martin.builds",
  email: "francis@martin.builds",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Atlanta",
    addressRegion: "GA",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.749,
    longitude: -84.388,
  },
  areaServed: "Atlanta, GA",
  priceRange: "$$$",
  openingHours: "Mo-Fr 09:00-18:00",
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Francis Martin",
  jobTitle: "AI Developer",
  worksFor: { "@type": "Organization", name: "martin.builds" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Atlanta",
    addressRegion: "GA",
    addressCountry: "US",
  },
  url: "https://martin.builds",
  sameAs: ["https://martin.builds"],
};

const reviews = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "martin.builds",
  url: "https://martin.builds",
  review: [
    {
      "@type": "Review",
      reviewBody:
        "Francis didn't just build us a website — he built us a system. The AI tools he integrated have completely changed how we handle client intake and proposals.",
      author: { "@type": "Person", name: "Ruthie Norton" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
    {
      "@type": "Review",
      reviewBody:
        "He understands the business side and the tech side — that's rare. He translated what I needed into something my team could actually use, in less time than I expected.",
      author: { "@type": "Person", name: "Camisha Alford" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
    {
      "@type": "Review",
      reviewBody:
        "Fast, clear communication, and the final product was exactly what we needed. No scope creep, no guessing. Francis ships.",
      author: { "@type": "Person", name: "Birdhouse Coffee" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
  ],
};

export function LocalBusinessJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviews) }}
      />
    </>
  );
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI Development",
    provider: {
      "@type": "LocalBusiness",
      name: "martin.builds",
      url: "https://martin.builds",
    },
    areaServed: { "@type": "City", name: "Atlanta", containedIn: "Georgia, US" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Build Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "AI Starter Build" },
          price: "5000",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "AI Build Sprint" },
          price: "8500",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "AI Retainer" },
          price: "2500",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Full Product Build" },
          price: "15000",
          priceCurrency: "USD",
        },
      ],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
