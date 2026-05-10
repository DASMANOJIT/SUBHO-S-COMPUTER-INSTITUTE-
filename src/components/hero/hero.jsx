import React, { useState, useEffect } from 'react';
import './hero.css';
import ScrollReveal from '../scrollReveal/ScrollReveal.jsx';
import ExperienceBadge from '../ExperienceBadge.jsx';
const heroMedia = [
  
  {
    type: 'video',
    src: '/herovideo.mp4',
    alt: "Subho's Computer Institute hero video",
  },
  
  
  
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedImage, setDisplayedImage] = useState(heroMedia[0].src);
  const [isMediaReady, setIsMediaReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  const activeMedia = heroMedia[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMedia.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeMedia.type === 'video') {
      setHasVideoError(false);
      setIsMediaReady(true);
      return undefined;
    }

    const nextImage = new Image();
    const nextSource = activeMedia.src;

    nextImage.onload = () => {
      setDisplayedImage(nextSource);
      setIsMediaReady(true);
    };

    nextImage.onerror = () => {
      setIsMediaReady(true);
    };

    nextImage.src = nextSource;
  }, [activeMedia]);

  return (
    <div
      className={`hero ${
        isMediaReady ? 'hero-image-ready' : 'hero-image-loading'
      } ${activeMedia.type === 'video' ? 'hero-has-video' : ''}`}
      style={{ backgroundImage: displayedImage ? `url(${displayedImage})` : 'none' }}
    >
      <div className="hero-media-layer" aria-hidden="true">
        {activeMedia.type === 'video' && !hasVideoError ? (
          <video
            key={activeMedia.src}
            src={activeMedia.src}
            className="hero-media hero-media-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={displayedImage}
            onError={() => setHasVideoError(true)}
          />
        ) : null}
      </div>

      <ScrollReveal
        as="div"
        className="hero-content"
        delay={150}
        duration={900}
        animation="zoom-in"
      >
        <p className="hero-eyebrow">Trusted Computer Education Since 2004</p>
        <h1>Subho&apos;s Computer Institute</h1>
        <p className="hero-highlight">
          Building strong foundations in computer education through concept clarity,
          practical learning, and dedicated mentorship.
        </p>
        <p>
          ICSE • ISC • CBSE • Programming Guidance
          <br />
          Guiding students to grow with confidence, logic, and real understanding across
          school computer subjects and practical IT skills.
        </p>

        <div className="hero-badge-area">
          <ExperienceBadge />
        </div>
      </ScrollReveal>
    </div>
  );
};

export default Hero;
