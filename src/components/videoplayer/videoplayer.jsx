
import React, { useRef } from 'react';
import Intro from '../assets/intro_3.mp4';
import Cross from '../assets/cross.png';
import './videoplayer.css';
import { Helmet } from 'react-helmet-async';

const VideoPlayer = ({ closeVideo }) => {
  const videoRef = useRef(null);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    closeVideo();
  };

  return (
    <>
    <Helmet>
            <title>Subho's Computer Institute | Learn Programming in Kolkata</title>
            <meta name="title" content="Subho's Computer Institute Kolkata – Best Computer Course Training & IT Classes" />
            <meta name ="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Join Subho's Computer Institute in Kolkata. Learn programming, web development and more with expert guidance." />
            <meta name="keywords" content="computer institute kolkata, programming classes, web development course" />
          </Helmet>
    <div className="overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-btn"
          onClick={handleClose}
          aria-label="Close video"
        >
          <img src={Cross} alt="close" />
        </button>
        <video
          ref={videoRef}
          src={Intro}
          controls
          autoPlay
          muted
          className="video-player"
        />
      </div>
    </div>
    </>
  );
};

export default VideoPlayer;