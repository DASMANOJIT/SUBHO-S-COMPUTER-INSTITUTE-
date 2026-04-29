import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import ScrollReveal from '../scrollReveal/ScrollReveal.jsx';
import './academicExcellence.css';

const TROPHY_ANIMATION_PATH = '/animations/trophy.json';

const excellenceStudents = [
  {
    name: 'Saptashwa Pal',
    image: '/excellence/photos/saptashwa-pal.jpg',
    score: '98.8%',
    achievement: 'ICSE Felicitation Ceremony 2025',
    board: 'ICSE',
    year: '2025',
    school: 'Modern English Academy',
    objectPosition: 'center center',
  },
  {
    name: 'Anushka Chatterjee',
    image: '/excellence/photos/anushka-chatterjee.jpg',
    score: '98.4%',
    achievement: 'ICSE Felicitation Ceremony 2025',
    board: 'ICSE',
    year: '2025',
    school: 'Modern English Academy',
    objectPosition: 'center center',
  },
  {
    name: 'Anish Deb Roy',
    image: '/excellence/photos/anish-deb-roy.jpg',
    score: '95.0%',
    achievement: 'ISC Felicitation Ceremony 2025',
    board: 'ISC',
    year: '2025',
    school: 'Modern English Academy',
    objectPosition: 'center center',
  },
  {
    name: 'Ryan Louis',
    image: '/excellence/photos/ryan-louis.jpg',
    score: '98.2%',
    achievement: 'ICSE Felicitation Ceremony 2025',
    board: 'ICSE',
    year: '2025',
    school: "St. Augustine's Day School, BKP",
    objectPosition: 'center center',
  },
  {
    name: 'Soudrita Kusari',
    image: '/excellence/photos/soudrita-kusari.jpg',
    score: '98.5%',
    achievement: 'ISC Felicitation Ceremony 2025',
    board: 'ISC',
    year: '2025',
    school: 'Modern English Academy',
    objectPosition: 'center center',
  },
];

const AcademicExcellence = () => {
  const [trophyAnimation, setTrophyAnimation] = useState(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let alive = true;

    fetch(TROPHY_ANIMATION_PATH)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load trophy animation');
        }
        return response.json();
      })
      .then((json) => {
        if (alive) setTrophyAnimation(json);
      })
      .catch(() => {
        if (alive) setLoadFailed(true);
      });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <ScrollReveal
      as="section"
      className="academic-excellence-section"
      animation="zoom-in"
      duration={900}
    >
      <div className="academic-excellence-inner">
        <div className="academic-excellence-heading">
          <div className="academic-excellence-heading-row">
            <div className="academic-excellence-heading-copy">
              <p>Our Shining Stars of Tomorrow</p>
              <h2>Academic Excellence</h2>
            </div>

            {!loadFailed && trophyAnimation && (
              <div className="academic-excellence-heading-animation" aria-hidden="true">
                <Lottie
                  animationData={trophyAnimation}
                  loop
                  autoplay
                  className="academic-excellence-lottie"
                  rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
                />
              </div>
            )}
          </div>
          <div className="academic-excellence-divider" />
          <p className="academic-excellence-intro">
            At Subho&apos;s Computer Institute, academic excellence is a result of dedication,
            discipline, and consistent guidance. Our students continue to achieve outstanding
            results across ICSE, ISC, and CBSE computer subjects, making us proud every year.
          </p>
        </div>

        <div className="academic-excellence-grid">
          {excellenceStudents.map((student, index) => (
            <ScrollReveal
              as="article"
              key={`${student.name}-${student.board}-${student.year}`}
              className="academic-excellence-card smooth-card hover-lift image-hover-zoom"
              animation="fade-up"
              delay={index * 100}
              duration={700}
            >
              <div className="academic-excellence-photo-wrap">
                <img
                  src={student.image}
                  alt={`${student.name} academic excellence Subho's Computer Institute`}
                  className="academic-excellence-photo"
                  style={{ objectPosition: student.objectPosition }}
                  loading="lazy"
                />
              </div>

              <div className="academic-excellence-card-body">
                <div className="academic-excellence-meta">
                  <span className="academic-excellence-chip academic-excellence-chip-board">
                    {student.board}
                  </span>
                  <span className="academic-excellence-chip academic-excellence-chip-year">
                    {student.year}
                  </span>
                </div>

                <h3>{student.name}</h3>

                <div className="academic-excellence-score">{student.score}</div>

                <p className="academic-excellence-achievement">{student.achievement}</p>

                <p className="academic-excellence-school">{student.school}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default AcademicExcellence;
