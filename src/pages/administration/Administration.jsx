import React from 'react';
import { Helmet } from 'react-helmet-async';
import './administration.css';

const founderQualifications = [
  'B.Sc Computer Science (Hons), University of Calcutta, 2002',
  'MCA, SMU, 2004',
];

const founderMessage = [
  'At our institution, education is not only about completing a syllabus, but about building confidence, discipline, curiosity, and a strong foundation for the future. Our vision is to create a learning environment where every student receives proper guidance, personal attention, and the motivation to grow academically as well as personally.',
  'With over two decades of experience in education and technology, I strongly believe that the right mentorship can transform a student’s journey. We are committed to maintaining quality teaching, ethical values, and a student-first approach in everything we do.',
  'I welcome all students and parents to be a part of our academic community and work together towards excellence, growth, and success.',
];

const Administration = () => {
  return (
    <>
      <Helmet>
        <title>Administration | Subho&apos;s Computer Institute Kolkata</title>
        <meta
          name="description"
          content="Meet the founder of Subho's Computer Institute and learn about the administration's vision, academic values, and student-first approach."
        />
        <meta
          name="keywords"
          content="Subho's Computer Institute administration, founder Subhabrata Datta, computer institute Kolkata founder"
        />
      </Helmet>

      <main className="administration-page">
        <section className="administration-hero">
          <p className="page-eyebrow">Leadership</p>
          <h1>Administration</h1>
          <p className="page-intro">
            Our institution is led with a long-term commitment to quality teaching, ethical values,
            and student growth through disciplined academic guidance.
          </p>
        </section>

        <section className="founder-profile-card" aria-labelledby="founder-name">
          <div className="founder-badge" aria-hidden="true">
            <img src="/subho.jpg" alt="Mr. Subhabrata Datta" className="founder-photo" />
          </div>

          <div className="founder-profile-content">
            <p className="founder-label">Founder Profile</p>
            <h2 id="founder-name">Mr. Subhabrata Datta</h2>
            <p className="founder-designation">Founder</p>
            <p className="founder-experience">20 years of experience</p>
          </div>
        </section>

        <section className="administration-grid">
          <article className="administration-card">
            <h2>Qualification</h2>
            <ul className="administration-list">
              {founderQualifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="administration-card message-card">
            <h2>Founder&apos;s Message</h2>
            <div className="message-copy">
              {founderMessage.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default Administration;
