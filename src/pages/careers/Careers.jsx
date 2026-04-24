import React from 'react';
import { Helmet } from 'react-helmet-async';
import './careers.css';

const opportunities = [
  'Computer Science mentors for school-level ICSE, ISC, and CBSE batches',
  'Faculty support for doubt-clearing, practical lab sessions, and weekly assessments',
  'Team members who value discipline, clarity in teaching, and student-first mentoring',
];

const Careers = () => {
  return (
    <>
      <Helmet>
        <title>Careers | Subho's Computer Institute Kolkata</title>
        <meta
          name="description"
          content="Explore career opportunities with Subho's Computer Institute in Kolkata. Join a teaching-focused environment dedicated to student success in computer education."
        />
        <meta
          name="keywords"
          content="Subho's Computer Institute careers, teaching jobs Kolkata, computer faculty jobs Barrackpore, programming instructor jobs"
        />
      </Helmet>

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
