import React, { useState, useEffect } from 'react';
import './hero.css';
import ScrollReveal from '../scrollReveal/ScrollReveal.jsx';
import ExperienceBadge from '../ExperienceBadge.jsx';
const images = [
  new URL('../assets/hero1.jpg', import.meta.url).href,
  new URL('../assets/hero2.jpg', import.meta.url).href,
  new URL('../assets/hero3.jpeg', import.meta.url).href,
  new URL('../assets/hero4.jpeg', import.meta.url).href,
  new URL('../assets/hero5.jpg', import.meta.url).href,
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedImage, setDisplayedImage] = useState(images[0]);
  const [isImageReady, setIsImageReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nextImage = new Image();
    const nextSource = images[currentIndex];

    nextImage.onload = () => {
      setDisplayedImage(nextSource);
      setIsImageReady(true);
    };

    nextImage.src = nextSource;
  }, [currentIndex]);

  return (
    <div
      className={`hero ${isImageReady ? 'hero-image-ready' : 'hero-image-loading'}`}
      style={{ backgroundImage: displayedImage ? `url(${displayedImage})` : 'none' }}
    >
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
