
import React, { useState, useEffect } from 'react';
import './hero.css';
import Arrow from '../assets/arrow.png';
import Brochure from '../assets/fbrou.pdf';
import Mic from '../assets/noti_2.png'; // 🎤 icon
import AppIcon from '../assets/app_icon.png'; // ✅ your app icon (add this image in /assets)
import CloseIcon from '../assets/close.png'; // ✅ for login modal close button
import Play from '../assets/playst.jpg';

const images = [
  new URL('../assets/hero1.jpg', import.meta.url).href,
  new URL('../assets/hero2.jpg', import.meta.url).href,
  new URL('../assets/hero3.jpeg', import.meta.url).href,
  new URL('../assets/hero4.jpeg', import.meta.url).href,
  new URL('../assets/hero5.jpg', import.meta.url).href,
];

const updates = [
  "🎓 Admissions are now open for the 2026 batch!",
  "💻 Our App is live in the play store",
  "📘 Download our App from Google Play store to experience high quality education",
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
      {/* 📰 Glowing Latest Updates Bar (below navbar) */}
      <div className="updates-bar">
        <img src={Mic} alt="mic" className="mic-icon" />
        <div className="scroll-container">
          <div className="scroll-text">
            {updates.map((msg, i) => (
              <span key={i} className="scroll-item">{msg}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 🧭 Floating App Download Icon (only in Hero section) */}
      <div className="app-download">
        <a
          href="https://play.google.com/store/apps/details?id=co.lily.kcqhj"
          target="_blank"
          rel="noopener noreferrer"
          className="app-download-link"
        >
          <img src={AppIcon} alt="Download App" />
          <span className="app-caption">Download our App</span>
        </a>
      </div>

      {/* 🌄 Hero section */}
      <div
        className="hero"
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
              Explore us <img src={Arrow} alt="arrow" />
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
