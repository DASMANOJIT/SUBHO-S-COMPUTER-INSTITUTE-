import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
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
  const sectionRef = useRef(null);
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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === 'undefined') return undefined;

    const animatedElements = Array.from(section.querySelectorAll('[data-aos]'));

    animatedElements.forEach((el) => {
      const duration = el.getAttribute('data-aos-duration') || '800';
      const easing = el.getAttribute('data-aos-easing') || 'ease-out';

      el.style.transitionDuration = `${duration}ms`;
      el.style.transitionTimingFunction = easing;
    });

    if (!('IntersectionObserver' in window)) {
      animatedElements.forEach((el) => el.classList.add('aos-animate'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;

          if (entry.isIntersecting) {
            const delay = target.getAttribute('data-aos-delay') || '0';
            target.style.transitionDelay = `${delay}ms`;
            target.classList.add('aos-animate');
          } else {
            const exitDelay = target.getAttribute('data-aos-exit-delay') || '0';
            target.style.transitionDelay = `${exitDelay}ms`;
            target.classList.remove('aos-animate');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="academic-excellence-section academic-excellence-section--reveal">
      <div className="academic-excellence-inner">
        <div className="academic-excellence-heading">
          <div
            className="academic-excellence-heading-row academic-heading-wrap"
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-exit-delay="250"
            data-aos-duration="800"
            data-aos-easing="ease-out"
          >
            <div className="academic-excellence-heading-copy">
              <p>Our Shining Stars of Tomorrow</p>
              <h2>Academic Excellence</h2>
            </div>

            {!loadFailed && trophyAnimation && (
              <div
                className="academic-excellence-heading-animation academic-trophy-animation"
                aria-hidden="true"
              >
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
          <div
            className="academic-excellence-divider"
            data-aos="fade-up"
            data-aos-delay="180"
            data-aos-exit-delay="180"
            data-aos-duration="800"
            data-aos-easing="ease-out"
          />
          <p
            className="academic-excellence-intro"
            data-aos="fade-up"
            data-aos-delay="220"
            data-aos-exit-delay="120"
            data-aos-duration="800"
            data-aos-easing="ease-out"
          >
            At Subho&apos;s Computer Institute, academic excellence is a result of dedication,
            discipline, and consistent guidance. Our students continue to achieve outstanding
            results across ICSE, ISC, and CBSE computer subjects, making us proud every year.
          </p>
        </div>

        <div className="academic-excellence-grid">
          {excellenceStudents.map((student, index) => (
            <article
              key={`${student.name}-${student.board}-${student.year}`}
              className="academic-excellence-card smooth-card hover-lift image-hover-zoom"
              data-aos="fade-up"
              data-aos-delay={300 + index * 100}
              data-aos-exit-delay={100 + (4 - index) * 40}
              data-aos-duration="850"
              data-aos-easing="ease-out"
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicExcellence;
