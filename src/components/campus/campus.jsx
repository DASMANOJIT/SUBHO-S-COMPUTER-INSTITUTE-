import React, { useState } from 'react';
import './campus.css';
import Galery_1 from '../assets/galery_1.jpeg';
import Galery_2 from '../assets/galery_2.jpeg';
import Galery_3 from '../assets/galery_3.jpg';
import Galery_4 from '../assets/galery_4.jpg';
import Galery_5 from '../assets/galery_5.jpg';
import Galery_6 from '../assets/galery_6.jpg';
import Galery_7 from '../assets/galery_7.jpeg';
import Arrow from '../assets/arrow_c.png';
import ScrollReveal from '../scrollReveal/ScrollReveal.jsx';
import ImageWithSkeleton from '../skeletons/ImageWithSkeleton.jsx';

const Campus = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos = [
    Galery_1, Galery_2, Galery_3, Galery_4, Galery_5,
    Galery_6, Galery_7
  ];

  const galleryPreviewItems = [
    {
      src: Galery_1,
      alt: "Computer classroom at Subho's Computer Institute Barrackpore Kolkata",
    },
    {
      src: Galery_2,
      alt: "Students learning programming at Subho's Computer Institute Kolkata",
    },
    {
      src: Galery_3,
      alt: "Computer lab facilities at Subho's Computer Institute in Kolkata",
    },
    {
      src: Galery_4,
      alt: 'ICSE ISC CBSE computer coaching classroom in Barrackpore',
    },
    {
      src: Galery_5,
      alt: "Practical computer training session at Subho's Computer Institute",
    },
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
            {galleryPreviewItems.map((item, index) => (
              <ScrollReveal
                key={item.alt}
                as="div"
                className="gallery-item smooth-card hover-lift image-hover-zoom"
                delay={index * 70}
              >
                <ImageWithSkeleton
                  src={item.src}
                  alt={item.alt}
                  wrapperClassName="gallery-image-shell"
                  skeletonClassName="gallery-image-skeleton"
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal as="div" delay={180}>
            <button 
              className="modern-btn" 
              onClick={() => setShowOverlay(true)}
            >
              See more{" "}
              <img 
                src={Arrow} 
                alt="View more campus photos of Subho's Computer Institute" 
              />
            </button>
          </ScrollReveal>
        </div>

        {showOverlay && (
          <div className="photo-overlay">
            <span 
              className="close-overlay" 
              onClick={() => setShowOverlay(false)}
            >
              &times;
            </span>

            <div className="photo-slider">
              <button 
                className="slider-btn prev" 
                onClick={handlePrev}
                aria-label="Previous image"
              >
                ❮
              </button>

              <img 
                src={photos[currentIndex]} 
                alt="Campus and computer lab environment at Subho's Computer Institute Kolkata"
                className="slider-image" 
              />

              <button 
                className="slider-btn next" 
                onClick={handleNext}
                aria-label="Next image"
              >
                ❯
              </button>
            </div>
          </div>
        )}
      </div>
  );
};

export default Campus;
