/**
 * LocalBusiness JSON-LD structured data for Atrellis Pte Ltd.
 * Rendered in the root <head> so Google can index it on every page.
 * https://schema.org/HomeAndConstructionBusiness
 */
export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'InteriorDesignBusiness'],
    name: 'Atrellis Pte Ltd',
    alternateName: 'Atrellis Design & Build',
    url: 'https://atrellis.business',
    logo: 'https://atrellis.business/assets/trustbar_logos/atrellis_brand_nobg.png',
    image: 'https://atrellis.business/og-image.png',
    description:
      "Singapore's premium design-and-build studio specialising in landed property A&A, BCA-compliant structural works, AtrellisZipblinds® smart outdoor systems, and bespoke interior design.",
    telephone: '+6592223333',
    email: 'hello@atrellis.business',
    // TODO: Update address with the registered office address
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SG',
      addressLocality: 'Singapore',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Singapore',
    },
    priceRange: 'S$$$',
    currenciesAccepted: 'SGD',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      // TODO: Add actual social media profile URLs when available
      // 'https://www.instagram.com/atrellis.sg',
      // 'https://www.facebook.com/atrellis.sg',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Atrellis Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Residential Turnkey Interior Design',
            url: 'https://atrellis.business/services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Landed Property A&A (Additions & Alterations)',
            url: 'https://atrellis.business/services/aa-structural',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AtrellisZipblinds® Smart Outdoor Blinds',
            url: 'https://atrellis.business/services/zipblinds',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Waterproofing & Sealing',
            url: 'https://atrellis.business/services/waterproofing',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'A&A Structural Roofing Works',
            url: 'https://atrellis.business/services/aa-roofing',
          },
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
