import React from 'react';
import About from '../../components/about/about.jsx';
import PageSeo from '../../components/seo/PageSeo.jsx';
import ScrollReveal from '../../components/scrollReveal/ScrollReveal.jsx';
import './aboutInstitutePage.css';

const AboutInstitutePage = () => {
  return (
    <>
      <PageSeo
        title="About Subho’s Computer Institute | Trusted Computer Education Since 2004"
        description="Learn about Subho's Computer Institute, founded in 2004 by Mr. Subhabrata Datta, offering trusted ICSE, ISC and CBSE computer coaching, programming classes, and practical IT training in Barrackpore and Shyamnagar."
        path="/about/about-the-institute"
        keywords={[
          'best computer institute in Barrackpore',
          'computer institute in Barrackpore',
          'computer institute in Shyamnagar',
          'computer coaching in Barrackpore',
          'computer coaching in Shyamnagar',
          'computer institute near Shyamnagar',
          'ICSE computer coaching in Barrackpore',
          'ISC computer science coaching in Barrackpore',
          'CBSE computer coaching in Barrackpore',
          'computer classes near Kolkata',
          'best computer teacher in Barrackpore',
        ]}
      />

      <main className="about-institute-page">
        <ScrollReveal as="h1" className="seo-page-heading">
          About Subho&apos;s Computer Institute
        </ScrollReveal>
        <About />
      </main>
    </>
  );
};

export default AboutInstitutePage;
