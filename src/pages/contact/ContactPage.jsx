import React from 'react';
import { Link } from 'react-router-dom';
import Contact from '../../components/contact/contact.jsx';
import PageSeo from '../../components/seo/PageSeo.jsx';
import ScrollReveal from '../../components/scrollReveal/ScrollReveal.jsx';
import './contactPage.css';

const ContactPage = () => {
  return (
    <>
      <PageSeo
        title="Contact Subho's Computer Institute Barrackpore & Shyamnagar | Admission & Computer Classes"
        description="Contact Subho's Computer Institute for admission enquiries, ICSE, ISC, CBSE computer coaching, programming classes and practical IT training in Barrackpore and Shyamnagar, near Sodepur, Sodepore and Kolkata."
        path="/contact"
        keywords={[
          'contact Subho’s Computer Institute',
          'best computer institute in Barrackpore',
          'computer classes in Barrackpore',
          'computer classes in Shyamnagar',
          'computer coaching in Barrackpore',
          'computer coaching in Shyamnagar',
          'computer institute near Shyamnagar',
          'computer institute near Sodepur',
          'computer classes near Sodepur',
          'computer tuition near Sodepore',
          'computer classes near Kolkata',
          'computer science tutor near me',
          'computer classes near me',
          'ICSE computer coaching in Barrackpore',
          'ISC computer science coaching in Barrackpore',
          'CBSE computer coaching in Barrackpore',
        ]}
      />

      <main className="contact-page">
        <ScrollReveal as="section" className="contact-page-hero">
          <p className="page-eyebrow">Admissions</p>
          <h1>Contact Subho&apos;s Computer Institute</h1>
          <p className="page-intro">
            Reach out for admissions, course guidance, ICSE computer tuition, ISC computer science
            coaching, CBSE computer coaching, programming classes, and practical IT training in
            Barrackpore and Shyamnagar for students from Sodepur, Sodepore, Kolkata, and nearby areas.
          </p>
          <p className="contact-page-link-row">
            <a href="tel:+919831934306">Call +91 9831934306</a>
            <Link to="/programs">Explore computer courses in Barrackpore & Shyamnagar</Link>
          </p>
        </ScrollReveal>

        <Contact />
      </main>
    </>
  );
};

export default ContactPage;
