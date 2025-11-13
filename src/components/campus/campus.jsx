import React, { useState } from 'react';
import './campus.css';
import Galery_1 from '../assets/galery_1.jpeg';
import Galery_2 from '../assets/galery_2.jpeg';
import Galery_3 from '../assets/galery_3.jpeg';
import Galery_4 from '../assets/galery_4.jpeg';
import Galery_5 from '../assets/galery_5.jpeg';
import Galery_6 from '../assets/galery_6.jpg'; // new ones
import Galery_7 from '../assets/galery_7.jpg';
import Galery_8 from '../assets/galery_8.jpg';
import Arrow from '../assets/arrow_c.png';

const Campus = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos = [
    Galery_1, Galery_2, Galery_3, Galery_4, Galery_5,
    Galery_6, Galery_7, Galery_8
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div>
      <div className="campus">
        <div className="gallery">
          <img src={Galery_1} alt="" />
          <img src={Galery_2} alt="" />
          <img src={Galery_3} alt="" />
          <img src={Galery_4} alt="" />
          <img src={Galery_5} alt="" />
        </div>

        <div>
          <button className="modern-btn" onClick={() => setShowOverlay(true)}>
            See more <img src={Arrow} alt="" />
          </button>
        </div>
      </div>

      {showOverlay && (
        <div className="photo-overlay">
          <span className="close-overlay" onClick={() => setShowOverlay(false)}>&times;</span>

          <div className="photo-slider">
            <button className="slider-btn prev" onClick={handlePrev}>❮</button>
            <img src={photos[currentIndex]} alt="slider" className="slider-image" />
            <button className="slider-btn next" onClick={handleNext}>❯</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campus;
