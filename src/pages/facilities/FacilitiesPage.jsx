import React from 'react';
import PageSeo from '../../components/seo/PageSeo.jsx';
import ScrollReveal from '../../components/scrollReveal/ScrollReveal.jsx';
import './facilitiesPage.css';

const facilityItems = [
  'Structured Computer Classes',
  'Practical IT Training',
  'Doubt-Clearing Sessions',
  'Online Classes',
  'Weekly Tests',
  'Programming Practice',
  'Student Guidance',
  'Academic Mentoring',
  'Comfortable Learning Environment',
];

const FacilitiesPage = () => {
  return (
    <>
      <PageSeo
        title="Facilities | Subho's Computer Institute Barrackpore"
        description="Discover facilities at Subho's Computer Institute including structured computer classes, practical IT training, doubt-clearing sessions, weekly tests and programming practice in Barrackpore."
        path="/facilities"
        keywords={[
          'Subho’s Computer Institute facilities',
          'computer institute in Barrackpore',
          'practical IT training Barrackpore',
          'computer coaching near Sodepur',
          'computer classes near Sodepur',
          'computer classes near Sodepore',
        ]}
      />

      <main className="facilities-page">
        <ScrollReveal as="section" className="facilities-hero">
          <p className="page-eyebrow">Campus</p>
          <h1>Facilities</h1>
          <p className="page-intro">
            Discover the learning support, practice environment, and student-focused academic
            facilities available at Subho&apos;s Computer Institute in Barrackpore.
          </p>
        </ScrollReveal>

        <section className="facilities-grid">
          {facilityItems.map((item, index) => (
            <ScrollReveal
              key={item}
              as="article"
              className="facilities-card smooth-card hover-lift"
              delay={index * 60}
            >
              <h2>{item}</h2>
              <p>
                Students from Barrackpore, Shyamnagar, Sodepur, Sodepore, Kolkata, and nearby
                areas benefit from consistent guidance, disciplined practice, and supportive
                mentoring through this facility.
              </p>
            </ScrollReveal>
          ))}
        </section>
      </main>
    </>
  );
};

export default FacilitiesPage;
