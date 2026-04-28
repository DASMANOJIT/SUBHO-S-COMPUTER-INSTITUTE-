import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import Logo from './assets/logo.png';
import './SitePreloader.css';

const DEFAULT_DURATION = 2300;
const REDUCED_MOTION_DURATION = 900;
const EXIT_DURATION = 320;
const ANIMATION_PATH = '/animations/site-loader.json';

const SitePreloader = () => {
  const [shouldShow, setShouldShow] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const exitTimerRef = useRef(null);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    syncPreference();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncPreference);
      return () => mediaQuery.removeEventListener('change', syncPreference);
    }

    mediaQuery.addListener(syncPreference);
    return () => mediaQuery.removeListener(syncPreference);
  }, []);

  useEffect(() => {
    if (!shouldShow || typeof window === 'undefined') return undefined;

    let isCancelled = false;

    fetch(ANIMATION_PATH)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load site preloader animation: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        if (!isCancelled) {
          setAnimationData(data);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setAnimationData(null);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [shouldShow]);

  useEffect(() => {
    if (!shouldShow || typeof window === 'undefined') return undefined;

    const visibleDuration = prefersReducedMotion ? REDUCED_MOTION_DURATION : DEFAULT_DURATION;

    exitTimerRef.current = window.setTimeout(() => {
      setIsExiting(true);

      hideTimerRef.current = window.setTimeout(() => {
        setShouldShow(false);
        setIsExiting(false);
      }, EXIT_DURATION);
    }, visibleDuration);

    return () => {
      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }

      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, [prefersReducedMotion, shouldShow]);

  if (!shouldShow) {
    return null;
  }

  return (
    <div
      className={`site-preloader ${isExiting ? 'is-exiting' : ''}`}
      aria-hidden="true"
    >
      <div className="site-preloader-panel">
        <img
          src={Logo}
          alt="Subho's Computer Institute logo"
          className="site-preloader-logo"
        />

        <div className="site-preloader-animation-shell">
          {animationData ? (
            <Lottie
              animationData={animationData}
              loop
              autoplay={!prefersReducedMotion}
              className="site-preloader-animation"
            />
          ) : (
            <div className="site-preloader-fallback">
              <span className="site-preloader-fallback-ring" />
            </div>
          )}
        </div>

        <div className="site-preloader-copy">
          <p>Loading excellence...</p>
        </div>
      </div>
    </div>
  );
};

export default SitePreloader;
