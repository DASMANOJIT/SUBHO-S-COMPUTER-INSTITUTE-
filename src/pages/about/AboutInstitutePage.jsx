import React from 'react';
import About from '../../components/about/about.jsx';
import PageSeo from '../../components/seo/PageSeo.jsx';
import ScrollReveal from '../../components/scrollReveal/ScrollReveal.jsx';
import './aboutInstitutePage.css';

const AboutInstitutePage = () => {
  return (
    <>
      <PageSeo
        title="About Subho's Computer Institute | Computer Coaching in Barrackpore"
        description="Learn about Subho's Computer Institute, founded in 2004 by Mr. Subhabrata Datta, offering trusted computer education in Barrackpore, Shyamnagar and Kolkata."
        path="/about/about-the-institute"
        keywords={[
          'computer institute in Barrackpore',
          'computer coaching in Barrackpore',
          'computer institute near Shyamnagar',
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
