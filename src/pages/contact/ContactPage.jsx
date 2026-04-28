import React from 'react';
import { Link } from 'react-router-dom';
import Contact from '../../components/contact/contact.jsx';
import PageSeo from '../../components/seo/PageSeo.jsx';
import './contactPage.css';

const ContactPage = () => {
  return (
    <>
      <PageSeo
        title="Contact Subho's Computer Institute Barrackpore | Admission & Computer Classes"
        description="Contact Subho's Computer Institute for admission enquiries, ICSE, ISC, CBSE computer coaching, programming classes and practical IT training in Barrackpore, near Shyamnagar, Sodepur, Sodepore and Kolkata."
        path="/contact"
        keywords={[
          'contact Subho’s Computer Institute',
          'computer classes in Barrackpore',
          'computer coaching in Barrackpore',
          'computer institute near Shyamnagar',
          'computer institute near Sodepur',
          'computer classes near Sodepur',
          'computer tuition near Sodepore',
          'computer classes near Kolkata',
          'computer science tutor near me',
          'computer classes near me',
        ]}
      />

      <main className="contact-page">
        <section className="contact-page-hero">
          <p className="page-eyebrow">Admissions</p>
          <h1>Contact Subho&apos;s Computer Institute</h1>
          <p className="page-intro">
            Reach out for admissions, course guidance, ICSE computer tuition, ISC computer science
            coaching, CBSE computer coaching, programming classes, and practical IT training in
            Barrackpore for students from Shyamnagar, Sodepur, Sodepore, Kolkata, and nearby areas.
          </p>
          <p className="contact-page-link-row">
            <a href="tel:+919831934306">Call +91 9831934306</a>
            <Link to="/programs">Explore computer courses in Barrackpore</Link>
          </p>
        </section>

        <Contact />
      </main>
    </>
  );
};

export default ContactPage;
