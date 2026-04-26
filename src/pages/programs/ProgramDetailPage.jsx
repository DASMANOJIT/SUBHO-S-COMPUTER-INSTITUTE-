import React from 'react';
import { Link } from 'react-router-dom';
import PageSeo from '../../components/seo/PageSeo.jsx';
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
          'computer classes near Kolkata',
          'computer science tuition in Barrackpore',
          'programming classes in Barrackpore',
        ]}
      />

      <main className="program-detail-page">
        <section className="program-detail-hero">
          <p className="page-eyebrow">Programs</p>
          <h1>{h1}</h1>
          <p className="page-intro">{intro}</p>
        </section>

        <section className="program-detail-grid">
          <article className="program-detail-card">
            <h2>Who This Course Is For</h2>
            <p>{audience}</p>
          </article>

          <article className="program-detail-card">
            <h2>Topics Covered</h2>
            <ul>
              {topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </article>

          <article className="program-detail-card">
            <h2>Benefits</h2>
            <ul>
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>

          <article className="program-detail-card program-detail-card-accent">
            <h2>Take The Next Step</h2>
            <p>
              Students from Barrackpore, Shyamnagar, Kolkata, and nearby areas can contact the
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
          </article>
        </section>
      </main>
    </>
  );
};

export default ProgramDetailPage;
