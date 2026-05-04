export const SITE_URL = 'https://subhoscomputerinstitute.com';
export const SITE_NAME = "Subho's Computer Institute";
export const ALT_SITE_NAME = "Subho Sir's Tuition";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/subho.jpg`;

export const BUSINESS_DETAILS = {
  name: SITE_NAME,
  alternateName: ALT_SITE_NAME,
  founder: 'Mr. Subhabrata Datta',
  founded: '2004',
  email: 'subhoscomputerinstitute@gmail.com',
  phone: '+91 9831934306',
  address: 'Madhusudan Complex, S.N. Banerjee Road, Barrackpore, Barrackpur Cantonment, West Bengal 700120, India',
  serviceAreas: [
    'Barrackpore',
    'Shyamnagar',
    'Kolkata',
    'North 24 Parganas',
    'Titagarh',
    'Khardah',
    'Palta',
    'Ichapur',
    'Naihati',
    'Sodepur',
    'Sodepore',
  ],
  sameAs: [
    'https://www.facebook.com/subhoscomputerinstitute',
    'https://www.instagram.com/subhoscomputerinstitute/',
    'https://youtube.com/@subhabratadatta2889',
    'https://play.google.com/store/apps/details?id=co.lily.kcqhj',
  ],
};

export const createCanonicalUrl = (path = '/') => {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const createPageTitle = (title) => {
  if (!title) {
    return "Subho’s Computer Institute | ICSE, ISC & CBSE Computer Coaching in Barrackpore & Shyamnagar";
  }

  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
};

export const createOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  '@id': `${SITE_URL}/#organization`,
  name: BUSINESS_DETAILS.name,
  alternateName: BUSINESS_DETAILS.alternateName,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/subho.jpg`,
  telephone: BUSINESS_DETAILS.phone,
  email: BUSINESS_DETAILS.email,
  slogan: 'Trusted computer education since 2004',
  founder: {
    '@type': 'Person',
    name: BUSINESS_DETAILS.founder,
  },
  foundingDate: BUSINESS_DETAILS.founded,
  description:
    'Subho’s Computer Institute offers ICSE, ISC and CBSE computer coaching, programming classes, Java, Python, HTML, CSS and practical IT training in Barrackpore and Shyamnagar.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Madhusudan Complex, S.N. Banerjee Road, Barrackpore, Barrackpur Cantonment',
    addressLocality: 'Barrackpore',
    addressRegion: 'West Bengal',
    postalCode: '700120',
    addressCountry: 'IN',
  },
  location: [
    {
      '@type': 'Place',
      name: 'Subho’s Computer Institute - Barrackpore Campus',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Madhusudan Complex, S.N. Banerjee Road, Barrackpore, Barrackpur Cantonment',
        addressLocality: 'Barrackpore',
        addressRegion: 'West Bengal',
        postalCode: '700120',
        addressCountry: 'IN',
      },
      telephone: BUSINESS_DETAILS.phone,
    },
    {
      '@type': 'Place',
      name: 'Subho’s Computer Institute - Shyamnagar Campus',
      address: {
        '@type': 'PostalAddress',
        streetAddress: "308, Ghosh Para Rd, opposite St. Augustine's Day School, Pinkal",
        addressLocality: 'Shyamnagar',
        addressRegion: 'West Bengal',
        postalCode: '743133',
        addressCountry: 'IN',
      },
      telephone: BUSINESS_DETAILS.phone,
    },
  ],
  areaServed: BUSINESS_DETAILS.serviceAreas.map((place) => ({
    '@type': 'Place',
    name: place,
  })),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: BUSINESS_DETAILS.phone,
      email: BUSINESS_DETAILS.email,
      areaServed: 'IN',
      availableLanguage: ['English', 'Bengali', 'Hindi'],
    },
  ],
  sameAs: BUSINESS_DETAILS.sameAs,
});

export const createFaqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});
