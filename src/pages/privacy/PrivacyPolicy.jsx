import React from 'react';
import PageSeo from '../../components/seo/PageSeo.jsx';
import ScrollReveal from '../../components/scrollReveal/ScrollReveal.jsx';
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
        <ScrollReveal as="section" className="privacy-hero">
          <p className="page-eyebrow">Policy</p>
          <h1>Privacy Policy</h1>
          <p className="page-intro">
            This page explains how Subho&apos;s Computer Institute handles information shared
            through enquiries, admissions communication, and website interactions.
          </p>
        </ScrollReveal>

        <section className="privacy-content">
          <ScrollReveal as="article" className="privacy-card smooth-card hover-lift">
            <h2>Information We Collect</h2>
            <p>
              We may collect names, phone numbers, email addresses, and enquiry details that
              students or parents voluntarily submit through our contact channels.
            </p>
          </ScrollReveal>

          <ScrollReveal as="article" className="privacy-card smooth-card hover-lift" delay={90}>
            <h2>How We Use Information</h2>
            <p>
              Information is used to respond to admissions enquiries, share course details,
              provide academic communication, and improve the support we offer to students.
            </p>
          </ScrollReveal>

          <ScrollReveal as="article" className="privacy-card smooth-card hover-lift" delay={140}>
            <h2>Contact</h2>
            <p>
              For privacy-related questions, please contact the institute directly through the
              official contact details listed on this website.
            </p>
          </ScrollReveal>
        </section>
      </main>
    </>
  );
};

export default PrivacyPolicy;
