import React, { useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal.js';
import './resultsExperience.css';

const leftFeatures = [
  'Strong Concept-Based Learning',
  'Personal Mentorship & Guidance',
  'Practical Computer Education',
  'Student-Friendly Teaching Approach',
  'Academic Discipline',
  'Confidence Building',
];

const rightFeatures = [
  'Excellent Board Results',
  'Supportive Learning Environment',
  'Modern Teaching Methods',
  'Problem Solving & Logic Building',
  'Individual Attention',
  'Career-Oriented Skill Development',
];

const centerImages = [
  {
    src: '/hero1.jpg',
    alt: "Subho's Computer Institute classroom and learning visual",
    className: 'results-experience-collage-item--tl',
  },
  {
    src: '/events/teachers_day.jpg',
    alt: "Subho's Computer Institute student activity visual",
    className: 'results-experience-collage-item--tr',
  },
  {
    src: '/events/felicitation_1.jpg',
    alt: "Subho's Computer Institute achievement and felicitation visual",
    className: 'results-experience-collage-item--bl',
  },
  {
    src: '/hero3.jpg',
    alt: "Subho's Computer Institute student and institute visual",
    className: 'results-experience-collage-item--br',
  },
];

const ResultsExperience = () => {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const renderFeature = (label, index, side) => (
    <li
      key={`${side}-${label}`}
      className={`results-experience-point results-experience-point--${side} hover-lift smooth-card`}
      data-aos={side === 'left' ? 'fade-right' : 'fade-left'}
      data-aos-delay={400 + index * 120}
      data-aos-exit-delay={(5 - index) * 20}
      data-aos-duration="850"
      data-aos-easing="ease-out"
    >
      {side === 'left' ? (
        <>
          <span className="results-experience-point-label">{label}</span>
          <span className="results-experience-point-line" aria-hidden="true">
            <span className="results-experience-point-dot" />
          </span>
        </>
      ) : (
        <>
          <span className="results-experience-point-line" aria-hidden="true">
            <span className="results-experience-point-dot" />
          </span>
          <span className="results-experience-point-label">{label}</span>
        </>
      )}
    </li>
  );

  return (
    <section className="results-experience results-experience-section" ref={sectionRef}>
      <div className="results-experience-inner">
        <div className="results-experience-heading">
          <p
            className="results-experience-eyebrow"
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-exit-delay="500"
            data-aos-duration="800"
            data-aos-easing="ease-out"
          >
            WHY STUDENTS TRUST US
          </p>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-exit-delay="400"
            data-aos-duration="850"
            data-aos-easing="ease-out"
          >
            Discover the Subho&apos;s Computer Institute Experience
          </h2>
          <p
            className="results-experience-description"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-exit-delay="300"
            data-aos-duration="850"
            data-aos-easing="ease-out"
          >
            A learning environment shaped by practical guidance, academic excellence, mentorship,
            and steady student growth across ICSE, ISC, and CBSE journeys.
          </p>
        </div>

        <div className="results-experience-grid">
          <ul className="results-experience-side results-experience-side--left" aria-label="Experience highlights left">
            {leftFeatures.map((feature, index) => renderFeature(feature, index, 'left'))}
          </ul>

          <div
            className="results-experience-center"
            data-aos="zoom-in"
            data-aos-delay="300"
            data-aos-exit-delay="200"
            data-aos-duration="950"
            data-aos-easing="ease-out"
          >
            <div className="results-experience-orbit" aria-hidden="true">
              {centerImages.map((image) => (
                <span key={image.src} className={`results-experience-collage-item ${image.className}`}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </span>
              ))}
              <span className="results-experience-core-badge">
                <strong>Since 2004</strong>
                <span>Guiding Students</span>
              </span>
            </div>
          </div>

          <ul className="results-experience-side results-experience-side--right" aria-label="Experience highlights right">
            {rightFeatures.map((feature, index) => renderFeature(feature, index, 'right'))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ResultsExperience;
