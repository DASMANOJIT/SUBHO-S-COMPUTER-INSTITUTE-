import React from 'react';
import './experienceBadge.css';

export default function ExperienceBadge() {
  return (
    <div className="experience-badge" aria-label="Years of educational excellence">
      <span className="experience-badge__glow-ring" />
      <span className="experience-badge__shine" />

      <img
        src="/badge.png"
        alt="Years of educational excellence"
        width="180"
        height="180"
        className="experience-badge__image"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
