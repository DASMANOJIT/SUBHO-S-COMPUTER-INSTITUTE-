import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  createCanonicalUrl,
  createPageTitle,
  createOrganizationSchema,
} from '../../lib/seo.js';

const PageSeo = ({
  title,
  description,
  path = '/',
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  schema,
}) => {
  const canonicalUrl = createCanonicalUrl(path);
  const resolvedTitle = createPageTitle(title);
  const hostname =
    typeof window !== 'undefined' && window.location?.hostname ? window.location.hostname : '';
  const isVercelHost = hostname.includes('vercel.app');

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.title = resolvedTitle;
  }, [resolvedTitle]);

  const pageSchema = schema ?? createOrganizationSchema();

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={description} />
      {keywords.length ? <meta name="keywords" content={keywords.join(', ')} /> : null}
      <meta name="robots" content={isVercelHost ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="theme-color" content="#0a2265" />
      <meta name="author" content={SITE_NAME} />
      <meta name="geo.region" content="IN-WB" />
      <meta name="geo.placename" content="Barrackpore, Shyamnagar" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {isVercelHost && <meta name="googlebot" content="noindex, nofollow" />}
      {isVercelHost && <meta httpEquiv="X-Robots-Tag" content="noindex, nofollow" />}

      {!isVercelHost && <meta property="og:image:alt" content={`${SITE_NAME} Barrackpore`} />}
      <meta property="article:publisher" content={SITE_URL} />

      <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
    </Helmet>
  );
};

export default PageSeo;
