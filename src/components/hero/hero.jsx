import React, { useState, useEffect } from 'react';
import './hero.css';
import Arrow from '../assets/arrow.png';
import { Link } from 'react-router-dom';
import ScrollReveal from '../scrollReveal/ScrollReveal.jsx';
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
        <ScrollReveal as="div" className="hero-content" delay={120}>
          <h1>Computer Institute in Barrackpore for ICSE, ISC, CBSE &amp; Programming</h1>
          <p>
            Subho&apos;s Computer Institute is a trusted computer coaching centre in Barrackpore,
            helping students build strong foundations in school computer subjects, programming,
            and practical IT skills. We provide ICSE, ISC and CBSE computer coaching for
            students from Barrackpore, Shyamnagar, Sodepur, Sodepore, Kolkata and nearby areas.
          </p>
          <Link to="/programs" className="modern-btn">
            Explore our programs
            <img src={Arrow} alt="Explore computer courses and coaching at Subho's Computer Institute Barrackpore" />
          </Link>
        </ScrollReveal>
      </div>
  );
};

export default Hero;
