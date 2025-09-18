import React from "react";
import "./videoplayer.css"; 
import Intro from '../assets/intro.mp4';
import Cross from '../assets/cross.png';

const Videoplayer = () => {
return (
 <div className="overlay">
  <div className="modal" >
  <video 
    src={Intro} controls autoPlay muted ></video>
    
  </div>
  <button><img src={Cross} alt="" className="close-btn" /></button>
 </div>
  );
};

export default Videoplayer;
