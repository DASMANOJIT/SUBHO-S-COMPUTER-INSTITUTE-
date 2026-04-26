import React from 'react';
import PageSeo from '../../components/seo/PageSeo.jsx';
import './careers.css';

const opportunities = [
  'Computer Science mentors for school-level ICSE, ISC, and CBSE batches',
  'Faculty support for doubt-clearing, practical lab sessions, and weekly assessments',
  'Team members who value discipline, clarity in teaching, and student-first mentoring',
];

const Careers = () => {
  return (
    <>
      <PageSeo
        title="Careers | Subho's Computer Institute Barrackpore"
        description="Explore teaching and academic support opportunities with Subho's Computer Institute in Barrackpore and join a student-first computer coaching environment."
        path="/careers"
        keywords={[
          'Subho’s Computer Institute careers',
          'computer faculty jobs Barrackpore',
          'computer coaching in Barrackpore',
          'programming instructor jobs',
        ]}
      />

      <main className="careers-page">
        <section className="careers-hero">
          <p className="page-eyebrow">Join Us</p>
          <h1>Careers</h1>
          <p className="page-intro">
            We welcome passionate educators and academic support professionals who want to help students
            grow through disciplined, practical, and student-focused computer education.
          </p>
        </section>

        <section className="careers-content">
          <article className="careers-card">
            <h2>What We Look For</h2>
            <ul>
              {opportunities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="careers-card careers-card-accent">
            <h2>How To Apply</h2>
            <p>
              If you are interested in teaching, mentoring, or supporting our academic programs, please reach
              out to the institute with your profile and teaching background. We value clarity, commitment, and
              a genuine interest in helping students succeed.
            </p>
            <p className="careers-contact">Email: subhoscomputerinstitute@gmail.com</p>
          </article>
        </section>
      </main>
    </>
  );
};

export default Careers;
