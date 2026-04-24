
import React, { useState, useEffect } from 'react';
import './hero.css';
import Arrow from '../assets/arrow.png';
import Brochure from '../assets/BROCHURE.pdf';
import AppIcon from '../assets/app_icon.png'; // ✅ your app icon (add this image in /assets)

import { Helmet } from 'react-helmet-async';
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
    <Helmet>
        <title>Subho's Computer Institute | Learn Programming in Kolkata</title>
        <meta name="title" content="Subho's Computer Institute Kolkata – Best Computer Course Training & IT Classes" />
        <meta name ="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Join Subho's Computer Institute in Kolkata. Learn programming, web development and more with expert guidance." />
        <meta name="keywords" content="computer institute kolkata, programming classes, web development course" />
      <meta name="geo.region" content="IN-WB" />
  <meta name="geo.placename" content="Kolkata" />
      </Helmet>
      {/* 🧭 Floating App Download Icon (only in Hero section) */}
      <div className="app-download">
        <a
  href="https://play.google.com/store/apps/details?id=co.lily.kcqhj"
  target="_blank"
  rel="noopener noreferrer"
  className="app-download-link"
  title="Download Subho's Computer Institute App from Google Play Store"
>
          <img src={AppIcon} alt="Download Subho's Computer Institute Learning App from Google Play Store" />
          <span className="app-caption">Download our App</span>
        </a>
      </div>

      {/* 🌄 Hero section */}
      <div
        className="hero"
        alt = "Computer training classroom in Kolkata - Subho's Computer Institute students learning programming and IT courses"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="hero-content">
          <h1>
            <i>
              "Preparing Students For <span className="red">Success </span>In An Ever-Changing World "
            </i>
          </h1>
          <p>
            <i>Congratulation for your all round success & best wishes for your future</i>
          </p>
          <button className="modern-btn">
            <a href={Brochure} rel="noopener noreferrer">
              Explore us <img src={Arrow} alt="Download brochure for computer courses at Subho's Computer Institute Kolkata" />
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
