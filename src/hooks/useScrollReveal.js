import { useEffect } from 'react';

export default function useScrollReveal(containerRef) {
  useEffect(() => {
    const container = containerRef?.current;
    if (!container || typeof window === 'undefined') return undefined;

    const animatedElements = Array.from(container.querySelectorAll('[data-aos]'));

    animatedElements.forEach((el) => {
      el.classList.remove('aos-animate');

      const delay = el.getAttribute('data-aos-delay') || '0';
      const duration = el.getAttribute('data-aos-duration') || '800';
      const easing = el.getAttribute('data-aos-easing') || 'ease-out';

      el.style.transitionDelay = `${delay}ms`;
      el.style.transitionDuration = `${duration}ms`;
      el.style.transitionTimingFunction = easing;
    });

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      animatedElements.forEach((el) => el.classList.add('aos-animate'));
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      animatedElements.forEach((el) => el.classList.add('aos-animate'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;

          if (entry.isIntersecting) {
            const delay = target.getAttribute('data-aos-delay') || '0';
            target.style.transitionDelay = `${delay}ms`;
            target.classList.add('aos-animate');
          } else {
            const exitDelay = target.getAttribute('data-aos-exit-delay') || '0';
            target.style.transitionDelay = `${exitDelay}ms`;
            target.classList.remove('aos-animate');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerRef]);
}
