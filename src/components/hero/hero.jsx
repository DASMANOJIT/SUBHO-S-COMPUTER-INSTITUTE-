
import React, { useState, useEffect } from 'react';
import './hero.css';
import Arrow from '../assets/arrow.png';



const images = [
  '/hero1.jpg',
  '/hero2.jpg',
  '/hero3.jpg',
  '/hero4.jpg',
  '/hero5.jpg'
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="hero"
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <div className="hero-content">
        <h1><i>"Preparing Students For <span className="red">Success </span>In An Ever-Changing World "</i></h1>
        <p><i>Congratulation for your all round success & best wishes for your future</i></p> 
        <button className="modern-btn">Explore us <img src={Arrow} alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
