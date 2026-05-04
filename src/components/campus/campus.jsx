import React, { useEffect, useMemo, useState } from 'react';
import './campus.css';
import Galery_1 from '../assets/galery_1.jpeg';
import Galery_2 from '../assets/galery_2.jpeg';
import Galery_3 from '../assets/galery_3.jpg';
import Galery_4 from '../assets/galery_4.jpg';
import Galery_5 from '../assets/galery_5.jpg';
import Galery_6 from '../assets/galery_6.jpg';
import Galery_7 from '../assets/galery_7.jpeg';
import ScrollReveal from '../scrollReveal/ScrollReveal.jsx';
import ImageWithSkeleton from '../skeletons/ImageWithSkeleton.jsx';

const Campus = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [photosPerPage, setPhotosPerPage] = useState(8);

  const photos = useMemo(
    () => [
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
      {
        src: Galery_6,
        alt: "Students and teachers at Subho's Computer Institute Barrackpore",
      },
      {
        src: Galery_7,
        alt: "Campus activity and learning moments at Subho's Computer Institute",
      },
    ],
    []
  );

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const updatePhotosPerPage = () => {
      if (window.innerWidth <= 560) {
        setPhotosPerPage(4);
      } else if (window.innerWidth <= 900) {
        setPhotosPerPage(6);
      } else {
        setPhotosPerPage(8);
      }
    };

    updatePhotosPerPage();
    window.addEventListener('resize', updatePhotosPerPage);

    return () => window.removeEventListener('resize', updatePhotosPerPage);
  }, []);

  const totalPages = Math.max(Math.ceil(photos.length / photosPerPage), 1);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages - 1));
  }, [totalPages]);

  const visiblePhotos = photos.slice(
    currentPage * photosPerPage,
    currentPage * photosPerPage + photosPerPage
  );

  const goNext = () => {
    if (!totalPages) return;
    setCurrentPage((page) => (page + 1) % totalPages);
  };

  const goPrev = () => {
    if (!totalPages) return;
    setCurrentPage((page) => (page - 1 + totalPages) % totalPages);
  };

  return (
    <div className="campus-photos-section">
      <div className="campus">
        <div className="campus-photo-carousel">
          <div key={currentPage} className="campus-photo-grid">
            {visiblePhotos.map((item) => (
              <ScrollReveal
                key={item.alt}
                as="div"
                className="campus-photo-card smooth-card hover-lift image-hover-zoom"
                delay={0}
              >
                <ImageWithSkeleton
                  src={item.src}
                  alt={item.alt}
                  className="campus-photo-image"
                  wrapperClassName="campus-photo-image-shell"
                  skeletonClassName="campus-photo-image-skeleton"
                />
              </ScrollReveal>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="campus-gallery-controls" aria-label="Campus photo pages">
              <button
                type="button"
                className="campus-gallery-arrow"
                onClick={goPrev}
                aria-label="Previous campus photos"
              >
                ‹
              </button>

              <div className="campus-gallery-dots" aria-label="Campus photo pages">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`campus-gallery-dot ${index === currentPage ? 'is-active' : ''}`}
                    onClick={() => setCurrentPage(index)}
                    aria-label={`Go to campus photo page ${index + 1}`}
                    aria-current={index === currentPage ? 'true' : undefined}
                  />
                ))}
              </div>

              <button
                type="button"
                className="campus-gallery-arrow"
                onClick={goNext}
                aria-label="Next campus photos"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Campus;
