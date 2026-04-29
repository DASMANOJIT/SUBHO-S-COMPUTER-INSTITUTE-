import React, { useEffect, useMemo, useState } from 'react';
import Lottie from 'lottie-react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ScrollReveal from '../scrollReveal/ScrollReveal.jsx';
import './testimonials.css';

const TESTIMONIAL_ANIMATION_PATH = '/animations/testimonial.json';

const testimonials = [
  
  {
    name: 'Mr. Bratin Sarkar',
    designation: 'Technical Lead & Python Developer',
    workplace: 'Wipro',
    image: '/testimonials/bratin.jpeg',
    title: 'A Journey of Growth: From Student to Mentor',
    quote:
      "My journey with Subho’s Institute is one that spans over a decade, defining not just my academic path, but the very trajectory of my professional career.\n\nAs a Student (2013–2016)\nI joined Subho’s Institute in Class 9, feeling unsure and hesitant about programming. I didn’t just find a teacher; I found a mentor. Subho Da’s approach was never that of a traditional instructor; he was the senior dada who believed in my potential even when I didn’t. I vividly remember him reassuring my mother that I would score over 90% in my boards. Through his unwavering guidance, I achieved 95 in Computer in Class 10, and graduated Class 12 with a 94% overall and a staggering 98 in Computer. He didn’t just teach me syntax; he taught me to trust my own capabilities.\n\nAs a Teacher (2017–2021)\nIn 2017, as I began my BTech in Computer Science, Subho Da invited me to join the institute as a teacher for the junior batches. Those four years were transformative. Teaching helped me solidify my own technical foundations, forcing me to master new technologies to explain them clearly to others. It was a symbiotic relationship—I was learning, growing, and mentoring simultaneously.\n\nBuilding a Career\nThis foundation paved the way for my professional success. In 2020, I joined Wipro as a Project Engineer. Starting as a tester on the Cisco project, I have grown through the ranks over the past 5.7 years. Today, I serve as a Technical Lead & Python Developer, where I am responsible for developing new features with Python and managing a team of junior engineers for automation regression runs. I attribute a massive part of this career success to the environment and the mentorship I received under Subho Da.\n\nTo Subho Da: Thank you for being a mentor, a teacher, and an incredible senior dada. My growth is a reflection of your belief in me, and I strive to mentor my own juniors today with the same care you showed me.",
  },
  {
    name: 'Mr. Soumyajit Goswami',
    designation: 'Senior Software Developer',
    workplace: 'Accenture',
    image: '',
    title: 'From Student to Teacher: Building Logic, Confidence, and Career Growth',
    quote:
      "Experience as a Student - It was very easy and I never really had to overthink. I got brilliant grades just from what was taught, with a clear understanding of logic and how to write that logic to work in code. That process helped me grasp problems and bring out solutions with ease in office as well.\n\nTeacher experience - Right after my Class 12, I was given a chance to gain professional experience as a teacher. I taught ICSE and ISC batches, which helped me become more fluent with programs, code, and logic. Teaching daily helped me build logic and write code quicker, faster, and easier. It also helped me gain confidence in life and earn money.",
  },
  {
    name: 'Mr. Manojit Das',
    designation: 'Founder',
    workplace: 'DM Stack Labs',
    image: '/testimonials/manojit-das.jpg',
    title: 'A Journey of Growth: From Student to Mentor',
    quote:
      "My journey with Subho’s Computer Institute started when I was in Class 8. What began as regular tuition classes under the guidance of Subho Sir slowly became one of the most important parts of my growing years. I continued learning here till Class 12, and after completing my ISC, Sir gave me the opportunity to join the institute as an Assistant Teacher.\n\nFrom being a student sitting in the classroom to becoming a teacher guiding others in the same institute, this place has been a very special part of my life. It has given me knowledge, confidence, responsibility, and countless memories that I will always carry with me.\n\nSubho Sir has not only been my teacher, but also a mentor who has guided me at every important stage. Whether it was academics, career decisions, teaching, or even my own startup journey with DM Stack Labs, his support and advice have always helped me move forward with clarity and confidence.\n\nFor me, Subho’s Computer Institute is not just an educational institute. It is a place where students are shaped with care, discipline, and personal attention. It is a place that truly feels like a family, and I feel proud to be a part of its journey both as a former student and now as a teacher.",
  },
  {
    name: 'Student Name',
    image: '/testimonials/student-3.jpg',
    designation: 'Web Developer',
    workplace: 'Freelance',
    quote:
      'The practical learning environment helped me move from basic computer knowledge to real programming confidence.',
  },
];

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return reduced;
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [isHovered, setIsHovered] = useState(false);
  const [brokenImages, setBrokenImages] = useState(() => new Set());
  const [expandedQuotes, setExpandedQuotes] = useState(() => new Set());
  const [testimonialAnimation, setTestimonialAnimation] = useState(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const activeTestimonial = useMemo(
    () =>
      testimonials.length > 0
        ? testimonials[((activeIndex % testimonials.length) + testimonials.length) % testimonials.length]
        : null,
    [activeIndex]
  );

  const hasRenderableImage = (testimonial) => Boolean(testimonial?.image) && !brokenImages.has(testimonial.name);

  const goToIndex = (nextIndex) => {
    if (!testimonials.length) return;

    const normalized = (nextIndex + testimonials.length) % testimonials.length;
    if (normalized === activeIndex) return;

    setDirection(normalized > activeIndex ? 'next' : 'prev');
    setActiveIndex(normalized);
  };

  const handlePrev = () => goToIndex(activeIndex - 1);
  const handleNext = () => goToIndex(activeIndex + 1);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let alive = true;

    fetch(TESTIMONIAL_ANIMATION_PATH)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load testimonial animation');
        }
        return response.json();
      })
      .then((json) => {
        if (alive) setTestimonialAnimation(json);
      })
      .catch(() => {
        if (alive) setLoadFailed(true);
      });

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || isHovered || testimonials.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
      setDirection('next');
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isHovered, reducedMotion]);

  const handleImageError = (name) => {
    setBrokenImages((current) => {
      const next = new Set(current);
      next.add(name);
      return next;
    });
  };

  const toggleQuote = (name) => {
    setExpandedQuotes((current) => {
      const next = new Set(current);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  return (
    <ScrollReveal
      as="section"
      className="testimonials-section"
      animation="zoom-in"
      duration={850}
    >
      <div className="testimonials-inner">
        <div className="testimonials-heading">
          <div className="testimonials-heading-row">
            <div className="testimonials-heading-copy">
              <p>Stories From Our Students</p>
              <h2>Testimonials</h2>
            </div>

            {!loadFailed && testimonialAnimation && (
              <div className="testimonials-heading-animation" aria-hidden="true">
                <Lottie
                  animationData={testimonialAnimation}
                  loop
                  autoplay
                  className="testimonials-lottie"
                  rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
                />
              </div>
            )}
          </div>
          <p className="testimonials-intro">
            Hear from our students about their learning experience, guidance, and growth at
            Subho&apos;s Computer Institute.
          </p>
        </div>

        <div
          className="testimonials-carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="testimonials-stage" aria-live="polite">
            {!testimonials.length || !activeTestimonial ? (
              <div className="testimonial-empty-state">Testimonials will be updated soon.</div>
            ) : (
              <article
                className={`testimonial-card testimonial-card--active testimonial-card--enter-${direction}`}
                key={`active-${activeTestimonial.name}-${activeIndex}`}
              >
                <div className="testimonial-image-wrap">
                  {hasRenderableImage(activeTestimonial) ? (
                    <img
                      src={activeTestimonial.image}
                      alt={`${activeTestimonial.name} testimonial Subho's Computer Institute`}
                      className="testimonial-image"
                      loading="lazy"
                      onError={() => handleImageError(activeTestimonial.name)}
                    />
                  ) : (
                    <div className="testimonial-avatar-fallback" aria-hidden="true">
                      {getInitials(activeTestimonial.name)}
                    </div>
                  )}
                </div>

                <div className="testimonial-content">
                  <FaQuoteLeft className="testimonial-quote-mark" aria-hidden="true" />
                  {activeTestimonial.title && (
                    <p className="testimonial-title">{activeTestimonial.title}</p>
                  )}
                  <p
                    className={`testimonial-quote ${
                      activeTestimonial.quote.length > 520 ? 'testimonial-quote--long' : ''
                    } ${expandedQuotes.has(activeTestimonial.name) ? 'is-expanded' : ''}`}
                  >
                    {activeTestimonial.quote}
                  </p>
                  {activeTestimonial.quote.length > 520 && (
                    <button
                      type="button"
                      className="testimonial-read-more"
                      onClick={() => toggleQuote(activeTestimonial.name)}
                      aria-label={
                        expandedQuotes.has(activeTestimonial.name)
                          ? 'Collapse testimonial'
                          : 'Expand testimonial'
                      }
                    >
                      {expandedQuotes.has(activeTestimonial.name) ? 'Show less' : 'Read more'}
                    </button>
                  )}
                  <h3>{activeTestimonial.name}</h3>
                  <p className="testimonial-designation">{activeTestimonial.designation}</p>
                  <p className="testimonial-workplace">{activeTestimonial.workplace}</p>
                </div>
              </article>
            )}
          </div>

          <div className="testimonials-controls">
            <button
              type="button"
              className="testimonials-arrow"
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <FaChevronLeft aria-hidden="true" />
            </button>

            <div className="testimonials-dots" role="tablist" aria-label="Testimonials">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name + testimonial.designation + index}
                  type="button"
                  className={`testimonials-dot ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => goToIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-pressed={activeIndex === index}
                />
              ))}
            </div>

            <button
              type="button"
              className="testimonials-arrow"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <FaChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default Testimonials;
