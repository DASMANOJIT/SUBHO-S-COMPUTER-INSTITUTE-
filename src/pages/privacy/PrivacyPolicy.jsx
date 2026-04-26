import React from 'react';
import PageSeo from '../../components/seo/PageSeo.jsx';
import './privacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <>
      <PageSeo
        title="Privacy Policy | Subho's Computer Institute"
        description="Read the privacy policy for Subho's Computer Institute, including how enquiry information and communication details are handled."
        path="/privacy-policy"
      />

      <main className="privacy-page">
        <section className="privacy-hero">
          <p className="page-eyebrow">Policy</p>
          <h1>Privacy Policy</h1>
          <p className="page-intro">
            This page explains how Subho&apos;s Computer Institute handles information shared
            through enquiries, admissions communication, and website interactions.
          </p>
        </section>

        <section className="privacy-content">
          <article className="privacy-card">
            <h2>Information We Collect</h2>
            <p>
              We may collect names, phone numbers, email addresses, and enquiry details that
              students or parents voluntarily submit through our contact channels.
            </p>
          </article>

          <article className="privacy-card">
            <h2>How We Use Information</h2>
            <p>
              Information is used to respond to admissions enquiries, share course details,
              provide academic communication, and improve the support we offer to students.
            </p>
          </article>

          <article className="privacy-card">
            <h2>Contact</h2>
            <p>
              For privacy-related questions, please contact the institute directly through the
              official contact details listed on this website.
            </p>
          </article>
        </section>
      </main>
    </>
  );
};

export default PrivacyPolicy;
