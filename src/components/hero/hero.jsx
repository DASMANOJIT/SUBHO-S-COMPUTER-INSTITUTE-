import React, { useState, useEffect } from 'react';
import './hero.css';
import Arrow from '../assets/arrow.png';
import AppIcon from '../assets/app_icon.png'; // ✅ your app icon (add this image in /assets)
import { Link } from 'react-router-dom';
const images = [
  new URL('../assets/hero1.jpg', import.meta.url).href,
  new URL('../assets/hero2.jpg', import.meta.url).href,
  new URL('../assets/hero3.jpeg', import.meta.url).href,
  new URL('../assets/hero4.jpeg', import.meta.url).href,
  new URL('../assets/hero5.jpg', import.meta.url).href,
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="app-download">
        <a
          href="https://play.google.com/store/apps/details?id=co.lily.kcqhj"
          target="_blank"
          rel="noopener noreferrer"
          className="app-download-link"
          title="Download Subho's Computer Institute App from Google Play Store"
        >
          <img src={AppIcon} alt="Download Subho's Computer Institute learning app from Google Play Store" />
          <span className="app-caption">Download our App</span>
        </a>
      </div>

      <div
        className="hero"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="hero-content">
          <h1>Computer Institute in Barrackpore for ICSE, ISC, CBSE &amp; Programming</h1>
          <p>
            Subho&apos;s Computer Institute is a trusted computer coaching centre in Barrackpore,
            helping students build strong foundations in school computer subjects, programming,
            and practical IT skills. We provide ICSE, ISC and CBSE computer coaching for
            students from Barrackpore, Shyamnagar, Kolkata and nearby areas.
          </p>
          <Link to="/programs" className="modern-btn">
            Explore our programs
            <img src={Arrow} alt="Explore computer courses and coaching at Subho's Computer Institute Barrackpore" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
