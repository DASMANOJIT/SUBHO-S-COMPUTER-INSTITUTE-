import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({
  as: Tag = 'div',
  className = '',
  children,
  delay = 0,
  threshold = 0.18,
  rootMargin = '0px 0px -10% 0px',
  style,
  ...rest
}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const node = elementRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <Tag
      ref={elementRef}
      className={`reveal-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default ScrollReveal;
