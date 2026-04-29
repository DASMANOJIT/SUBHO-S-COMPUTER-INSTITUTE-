import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({
  as: Tag = 'div',
  className = '',
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 850,
  threshold = 0.12,
  rootMargin = '0px 0px -60px 0px',
  style,
  ...rest
}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (import.meta.env.DEV) {
      // Helpful during development to confirm the component is mounting and revealing.
      // This does not run in production builds.
      // eslint-disable-next-line no-console
      console.log('ScrollReveal mounted', animation);
    }

    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const node = elementRef.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const rect = node.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight - 60 && rect.bottom > 0;
    if (isAlreadyVisible) {
      const immediateFrame = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => window.cancelAnimationFrame(immediateFrame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (import.meta.env.DEV) {
              // eslint-disable-next-line no-console
              console.log('ScrollReveal visible:', animation);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    const fallbackTimer = window.setTimeout(() => {
      setIsVisible(true);
    }, 2800);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [animation, rootMargin, threshold]);

  return (
    <Tag
      ref={elementRef}
      className={`reveal-on-scroll scroll-reveal ${animation} scroll-reveal--${animation} ${
        isVisible ? 'is-visible' : ''
      } ${className}`.trim()}
      data-animation={animation}
      style={{
        ...style,
        '--reveal-delay': `${delay}ms`,
        '--reveal-duration': `${duration}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default ScrollReveal;
