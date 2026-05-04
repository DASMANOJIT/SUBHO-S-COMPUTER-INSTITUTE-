import React from 'react';
import { Link } from 'react-router-dom';
import './homeSeoSection.css';
import ScrollReveal from '../scrollReveal/ScrollReveal.jsx';

const faqs = [
  {
    question: "Where is Subho's Computer Institute located?",
    answer:
      'Subho’s Computer Institute has campuses in Barrackpore and Shyamnagar. The Barrackpore campus is at Madhusudan Complex, S.N. Banerjee Road, Barrackpore, Barrackpur Cantonment, West Bengal 700120.',
  },
  {
    question: 'Do you provide ICSE computer tuition?',
    answer:
      'Yes, we provide ICSE computer tuition and computer application coaching for school students.',
  },
  {
    question: 'Do you provide ISC computer science coaching?',
    answer:
      'Yes, we provide ISC computer science coaching for Class 11 and Class 12 students.',
  },
  {
    question: 'Do you teach programming?',
    answer:
      'Yes, we teach programming fundamentals including Java, Python, HTML, CSS and practical IT skills.',
  },
  {
    question: 'Can students from Shyamnagar or nearby Kolkata areas join?',
    answer:
      'Yes, students from Barrackpore, Shyamnagar, Kolkata and nearby areas can contact us for admission details.',
  },
];

export const homepageFaqs = faqs;

const HomeSeoSection = () => {
  return (
    <section className="home-seo-section" aria-labelledby="home-seo-heading">
      <div className="home-seo-grid">
        <ScrollReveal
          as="article"
          className="home-seo-card home-seo-card-main smooth-card hover-lift"
          animation="fade-left"
          duration={850}
        >
          <h2 id="home-seo-heading">Trusted Computer Coaching in Barrackpore and Shyamnagar Since 2004</h2>
          <p>
            Founded in 2004 by Mr. Subhabrata Datta, Subho&apos;s Computer Institute has guided
            thousands of students with structured classes, doubt-clearing sessions, practical
            learning, weekly tests, and concept-based computer education in Barrackpore and
            Shyamnagar.
          </p>
          <p>
            Students from Barrackpore, Shyamnagar, Kolkata, Titagarh, Khardah, Palta, Ichapur,
            Naihati, Sodepur, Sodepore, and nearby North 24 Parganas areas join us for
            {' '}
            <strong>ICSE computer coaching in Barrackpore</strong>,
            {' '}
            <strong>ISC computer science tuition in Barrackpore</strong>,
            {' '}
            <strong>CBSE computer coaching in Barrackpore</strong>, and
            {' '}
            <strong>programming classes in Barrackpore and Shyamnagar</strong>.
          </p>
          <div className="home-seo-links">
            <Link to="/programs">Explore computer courses and coaching programs</Link>
            <Link to="/about/about-the-institute">Learn about the institute</Link>
            <Link to="/faculties/administration">Meet our founder</Link>
            <Link to="/contact">Contact for admission</Link>
          </div>
        </ScrollReveal>

        <ScrollReveal
          as="article"
          className="home-seo-card smooth-card hover-lift"
          duration={850}
          animation="fade-right"
        >
          <h2>Frequently Asked Questions</h2>
          <div className="home-faq-list">
            {faqs.map((faq, index) => (
              <ScrollReveal
                as="div"
                key={faq.question}
                className="home-faq-item"
                delay={index * 120}
                duration={600}
                animation="stagger-item"
              >
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HomeSeoSection;
