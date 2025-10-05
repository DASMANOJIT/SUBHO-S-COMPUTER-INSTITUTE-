
import React, { useRef } from 'react';
import Intro from '../assets/intro_3.mp4';
import Cross from '../assets/cross.png';
import './videoplayer.css';


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
  );
};

export default VideoPlayer;