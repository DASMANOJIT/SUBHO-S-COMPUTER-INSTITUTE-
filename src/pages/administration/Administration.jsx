import React from 'react';
import PageSeo from '../../components/seo/PageSeo.jsx';
import ScrollReveal from '../../components/scrollReveal/ScrollReveal.jsx';
import ImageWithSkeleton from '../../components/skeletons/ImageWithSkeleton.jsx';
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
      <PageSeo
        title="Administration | Founder of Subho's Computer Institute"
        description="Meet Mr. Subhabrata Datta, founder of Subho's Computer Institute, with over 22 years of experience in computer education and academic mentoring."
        path="/faculties/administration"
        keywords={[
          'founder of Subho’s Computer Institute',
          'computer institute in Barrackpore',
          'best computer teacher in Barrackpore',
          'computer coaching in Barrackpore',
        ]}
      />

      <main className="administration-page">
        <ScrollReveal as="section" className="administration-hero">
          <p className="page-eyebrow">Leadership</p>
          <h1>Administration</h1>
          <p className="page-intro">
            Our institution is led with a long-term commitment to quality teaching, ethical values,
            and student growth through disciplined academic guidance.
          </p>
        </ScrollReveal>

        <ScrollReveal
          as="section"
          className="founder-profile-card smooth-card hover-lift"
          aria-labelledby="founder-name"
          delay={80}
        >
          <div className="founder-badge" aria-hidden="true">
            <ImageWithSkeleton
              src="/subho.jpg"
              alt="Mr. Subhabrata Datta"
              className="founder-photo"
              wrapperClassName="founder-photo-shell"
              skeletonClassName="founder-photo-skeleton"
            />
          </div>

          <div className="founder-profile-content">
            <p className="founder-label">Founder Profile</p>
            <h2 id="founder-name">Mr. Subhabrata Datta</h2>
            <p className="founder-designation">Founder</p>
            <p className="founder-experience">22 years of experience</p>
          </div>
        </ScrollReveal>

        <section className="administration-grid">
          <ScrollReveal as="article" className="administration-card smooth-card hover-lift">
            <h2>Qualification</h2>
            <ul className="administration-list">
              {founderQualifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal
            as="article"
            className="administration-card message-card smooth-card hover-lift"
            delay={110}
          >
            <h2>Founder&apos;s Message</h2>
            <div className="message-copy">
              {founderMessage.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </ScrollReveal>
        </section>
      </main>
    </>
  );
};

export default Administration;
