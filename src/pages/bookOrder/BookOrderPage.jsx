import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookOrderPageContent from '../../components/bookOrder/BookOrderPageContent.jsx';
import PageSeo from '../../components/seo/PageSeo.jsx';
import './bookOrderPage.css';

const BookOrderPage = () => {
  const [isWindowLoaded, setIsWindowLoaded] = useState(() =>
    typeof window !== 'undefined' ? document.readyState === 'complete' : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    if (document.readyState === 'complete') {
      setIsWindowLoaded(true);
      return undefined;
    }

    const handleLoad = () => {
      setIsWindowLoaded(true);
    };

    window.addEventListener('load', handleLoad, { once: true });

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const videoSrc = isWindowLoaded
    ? 'https://www.youtube-nocookie.com/embed/i_f67f-sEMk?autoplay=1&mute=1&playsinline=1&loop=1&playlist=i_f67f-sEMk&rel=0&modestbranding=1&controls=1&iv_load_policy=3'
    : '';

  return (
    <>
      <PageSeo
        title="Order Computer Books | Subho’s Computer Institute"
        description="Order books from Subho’s Computer Institute by completing the online form and submitting your payment transaction details."
        path="/book-order"
        keywords={[
          'order computer books',
          'book order form',
          'Subho’s Computer Institute book order',
          'computer books order in Barrackpore',
          'computer books order in Shyamnagar',
        ]}
      />

      <main className="book-order-page">
        <section className="book-order-page-hero">
          <div className="book-order-page-hero-content">
            <div className="book-order-page-hero-copy">
              <p className="page-eyebrow">BOOK ORDER</p>
              <h1>Order Your Book</h1>
              <p className="page-intro">
                Complete the form below to order your book. Scan the QR code to make the payment
                and provide the correct UTR or transaction reference number.
              </p>
              <div className="book-order-page-links">
                <Link to="/programs">Explore computer programs</Link>
                <Link to="/contact">Contact for admission</Link>
              </div>
            </div>

            <div className="book-order-page-hero-video" aria-label="Book order guidance video">
              <div className="book-order-page-hero-video-shell">
                {videoSrc ? (
                  <iframe
                    src={videoSrc}
                    title="Book order guidance video"
                    loading="eager"
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <div className="book-order-page-hero-video-placeholder" aria-hidden="true">
                    <span className="book-order-page-hero-video-placeholder-kicker">
                      Loading video
                    </span>
                    <strong>Book order guidance video</strong>
                    <p>The video will start automatically once the page has fully loaded.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <BookOrderPageContent />
      </main>
    </>
  );
};

export default BookOrderPage;
