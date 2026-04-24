import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timeoutId = window.setTimeout(() => {
        const element = document.querySelector(hash);

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          return;
        }

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto',
        });
      }, 50);

      return () => window.clearTimeout(timeoutId);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
