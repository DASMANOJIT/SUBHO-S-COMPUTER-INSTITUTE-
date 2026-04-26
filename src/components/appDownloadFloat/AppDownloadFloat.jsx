import React from 'react';
import AppIcon from '../assets/app_icon.png';
import './appDownloadFloat.css';

const APP_URL = 'https://play.google.com/store/apps/details?id=co.lily.kcqhj';

const AppDownloadFloat = () => {
  return (
    <div className="app-download-float">
      <a
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="app-download-float-link"
        aria-label="Download Subho's Computer Institute app"
        title="Download Subho's Computer Institute App from Google Play Store"
      >
        <img
          src={AppIcon}
          alt="Download Subho's Computer Institute learning app from Google Play Store"
          className="app-download-float-icon"
        />
        <span className="app-download-float-caption">Download our App</span>
      </a>
    </div>
  );
};

export default AppDownloadFloat;
