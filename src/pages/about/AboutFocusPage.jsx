import React from 'react';
import { Link } from 'react-router-dom';
import PageSeo from '../../components/seo/PageSeo.jsx';
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
          'computer classes in Barrackpore',
          'computer coaching in Barrackpore',
          'computer institute near Shyamnagar',
          'computer classes near Kolkata',
          'best computer teacher in Barrackpore',
        ]}
      />

      <main className="about-focus-page">
        <section className="about-focus-hero">
          <p className="page-eyebrow">About Us</p>
          <h1>{title}</h1>
          <p className="page-intro">{intro}</p>
        </section>

        <section className="about-focus-card">
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
        </section>
      </main>
    </>
  );
};

export default AboutFocusPage;
