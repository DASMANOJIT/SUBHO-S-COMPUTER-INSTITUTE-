import React from 'react';
import { Link } from 'react-router-dom';
import PageSeo from '../../components/seo/PageSeo.jsx';
import ScrollReveal from '../../components/scrollReveal/ScrollReveal.jsx';
import './aboutFocusPage.css';

const AboutFocusPage = ({ title, description, path, intro, points, ctaText }) => {
  return (
    <>
      <PageSeo
        title={title}
        description={description}
        path={path}
        keywords={[
          'computer institute in Barrackpore',
          'computer institute in Shyamnagar',
          'computer classes in Barrackpore',
          'computer classes in Shyamnagar',
          'computer coaching in Barrackpore',
          'computer coaching in Shyamnagar',
          'computer institute near Shyamnagar',
          'computer classes near Kolkata',
          'best computer teacher in Barrackpore',
          'ICSE computer coaching in Barrackpore',
          'ISC computer science coaching in Barrackpore',
          'CBSE computer coaching in Barrackpore',
        ]}
      />

      <main className="about-focus-page">
        <ScrollReveal as="section" className="about-focus-hero">
          <p className="page-eyebrow">About Us</p>
          <h1>{title}</h1>
          <p className="page-intro">{intro}</p>
        </ScrollReveal>

        <ScrollReveal as="section" className="about-focus-card smooth-card hover-lift" delay={90}>
          <h2>{ctaText}</h2>
          <p>{description}</p>
          <ul>
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="about-focus-links">
            <Link to="/programs">Explore computer coaching programs</Link>
            <Link to="/contact">Contact for admission</Link>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
};

export default AboutFocusPage;
