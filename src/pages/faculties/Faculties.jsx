import React from 'react';
import { Helmet } from 'react-helmet-async';
import './faculties.css';

const facultyHighlights = [
  {
    title: 'Experienced Academic Guidance',
    description:
      'Our faculty team supports ICSE, ISC, and CBSE students with structured classroom teaching, doubt clearing, and regular practice sessions.',
  },
  {
    title: 'Practical Computer Training',
    description:
      'Students learn through hands-on lab work, programming demonstrations, and topic-based revision sessions designed for better retention.',
  },
  {
    title: 'Student-Focused Mentorship',
    description:
      'Each batch is guided with attention to progress, exam readiness, and the confidence needed to perform consistently in school and board exams.',
  },
];

const Faculties = () => {
  return (
    <>
      <Helmet>
        <title>Faculties | Subho's Computer Institute Kolkata</title>
        <meta
          name="description"
          content="Meet the faculty approach at Subho's Computer Institute in Kolkata. Learn how our teachers guide ICSE, ISC, and CBSE students through expert computer education."
        />
        <meta
          name="keywords"
          content="Subho's Computer Institute faculties, computer teachers Kolkata, ICSE ISC CBSE computer faculty, programming mentors Barrackpore"
        />
      </Helmet>

      <main className="faculties-page">
        <section className="faculties-hero">
          <p className="page-eyebrow">Our Team</p>
          <h1>Faculties</h1>
          <p className="page-intro">
            Subho&apos;s Computer Institute is guided by dedicated educators who combine subject knowledge,
            classroom discipline, and practical teaching methods to help students build strong academic foundations.
          </p>
        </section>

        <section className="faculties-grid" aria-label="Faculty strengths">
          {facultyHighlights.map((item) => (
            <article className="faculty-card" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          ))}
        </section>

        <section className="faculties-note">
          <h2>Why Students Learn Better Here</h2>
          <p>
            Our faculty-led approach balances conceptual learning, regular assessments, and supportive mentoring
            so students can improve both board performance and computer skills with confidence.
          </p>
        </section>
      </main>
    </>
  );
};

export default Faculties;
