import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { FaBookOpen } from 'react-icons/fa6';

const BOOK_ORDER_ANIMATION_PATH = '/animations/book-order.json';

let cachedBookAnimation = null;
let cachedBookAnimationPromise = null;

const loadBookAnimation = async () => {
  if (cachedBookAnimation) {
    return cachedBookAnimation;
  }

  if (!cachedBookAnimationPromise) {
    cachedBookAnimationPromise = fetch(BOOK_ORDER_ANIMATION_PATH)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load book order animation');
        }

        return response.json();
      })
      .then((json) => {
        cachedBookAnimation = json;
        return json;
      })
      .catch((error) => {
        cachedBookAnimationPromise = null;
        throw error;
      });
  }

  return cachedBookAnimationPromise;
};

const BookAnimation = ({ className = '', isCompact = false }) => {
  const [animationData, setAnimationData] = useState(null);
  const [shouldFallback, setShouldFallback] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setShouldFallback(true);
      return undefined;
    }

    let isMounted = true;

    loadBookAnimation()
      .then((json) => {
        if (isMounted) {
          setAnimationData(json);
        }
      })
      .catch(() => {
        if (isMounted) {
          setShouldFallback(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <span
      className={`book-order-animation ${isCompact ? 'book-order-animation--compact' : ''} ${className}`.trim()}
      aria-hidden="true"
    >
      {animationData ? (
        <Lottie
          animationData={animationData}
          loop
          autoplay
          className="book-order-animation-player"
          rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
        />
      ) : (
        <span className="book-order-animation-fallback">
          <FaBookOpen aria-hidden="true" />
        </span>
      )}

      {shouldFallback && !animationData ? (
        <span className="book-order-animation-fallback-note" aria-hidden="true">
          Book
        </span>
      ) : null}
    </span>
  );
};

export default BookAnimation;
