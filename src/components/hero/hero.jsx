
import React, { useState, useEffect } from 'react';
import './hero.css';
import Arrow from '../assets/arrow.png';
import Brochure from '../assets/BROCHURE.pdf'
import hero1 from '../assets/hero1.jpg';
import hero2 from '../assets/hero2.jpg';
import hero3 from '../assets/hero3.jpeg';
import hero4 from '../assets/hero4.jpeg';
import hero5 from '../assets/hero5.jpg';


const images = [hero1, hero2, hero3, hero4, hero5];

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
        <button className="modern-btn"><a href={Brochure} rel="noopener noreferrer"> Explore us <img src={Arrow} alt="arrow" /></a>
        </button>
      </div>
    </div>
  );
};

export default Hero;
