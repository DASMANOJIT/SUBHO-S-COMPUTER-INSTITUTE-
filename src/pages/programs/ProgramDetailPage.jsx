import React from 'react';
import { Link } from 'react-router-dom';
import PageSeo from '../../components/seo/PageSeo.jsx';
import ScrollReveal from '../../components/scrollReveal/ScrollReveal.jsx';
import './programDetailPage.css';

const ProgramDetailPage = ({
  seoTitle,
  seoDescription,
  path,
  h1,
  intro,
  audience,
  topics,
  benefits,
  relatedLinks,
}) => {
  return (
    <>
      <PageSeo
        title={seoTitle}
        description={seoDescription}
        path={path}
        keywords={[
          'computer institute in Barrackpore',
          'computer coaching in Barrackpore',
          'computer classes in Barrackpore',
          'computer institute near Shyamnagar',
          'computer institute near Sodepur',
          'computer classes near Sodepur',
          'computer tuition near Sodepore',
          'computer classes near Kolkata',
          'computer science tuition in Barrackpore',
          'programming classes in Barrackpore',
        ]}
      />

      <main className="program-detail-page">
        <ScrollReveal as="section" className="program-detail-hero">
          <p className="page-eyebrow">Programs</p>
          <h1>{h1}</h1>
          <p className="page-intro">{intro}</p>
        </ScrollReveal>

        <section className="program-detail-grid">
          <ScrollReveal as="article" className="program-detail-card smooth-card hover-lift">
            <h2>Who This Course Is For</h2>
            <p>{audience}</p>
          </ScrollReveal>

          <ScrollReveal as="article" className="program-detail-card smooth-card hover-lift" delay={70}>
            <h2>Topics Covered</h2>
            <ul>
              {topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal as="article" className="program-detail-card smooth-card hover-lift" delay={110}>
            <h2>Benefits</h2>
            <ul>
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal
            as="article"
            className="program-detail-card program-detail-card-accent smooth-card hover-lift"
            delay={150}
          >
            <h2>Take The Next Step</h2>
            <p>
              Students from Barrackpore, Shyamnagar, Sodepur, Sodepore, Kolkata, and nearby areas can contact the
              institute for admission guidance, batch information, and course planning.
            </p>
            <div className="program-detail-links">
              <Link to="/contact">Contact for admission</Link>
              {relatedLinks.map((item) => (
                <Link key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </section>
      </main>
    </>
  );
};

export default ProgramDetailPage;
