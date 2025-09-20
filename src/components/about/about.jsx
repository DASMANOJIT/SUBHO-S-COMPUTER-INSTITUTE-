/*import React from 'react';
import'./about.css'
import Pic from '../assets/subho.jpg'
import Play from '../assets/play.png'

const About = () => {
  
  return (
    
    <div className="about">
      <div className="about_left">
        <img src={Pic} alt="" className="about_img" />
     
        <img src={Play} alt="" className="play_icon"/>
      </div>
      <div className="about_right">
        <h3> ABOUT INSTITUTE
        </h3>
        <h2> Nurturing's Tomorrow's Leader From Today </h2>
        <p>
        Founded in 2004 by Mr. Shubhabrata Dutta, our institute has been a trusted name in computer education for over two decades. With his continued dedication to teaching and mentoring, thousands of students have gained the skills and confidence to excel in their academics and beyond.
</p><p>We specialize in Computer Science tuition for students from Class 4 to 10 (ICSE) and Class 11–12 (ISC/CBSE). To ensure every learner’s success, we provide:</p>
<p>✔️ Main Classes for structured learning</p>
<p>✔️ Doubt-clearing Sessions and Online classes for personalized guidance</p>
<p>✔️ Practice Sessions & Practical Classes for hands-on learning</p>
<p>✔️ Weekly Tests – our signature approach to build exam confidence</p>
<p>Our team also includes dedicated assistant teachers who work closely with students, offering support, solving doubts, and preparing them thoroughly for exams.
💡 With over 6000+ successful students already passed through our doors, we take pride in shaping future achievers with knowledge, discipline, and care.</p>
<p>📚 Your success is our commitment!</p>
        
      </div>
      
    </div>
  );
};

export default About;
*/
import React, { useState } from 'react';
import './about.css';
import Pic from '../assets/subho.jpg';   // adjust if assets path differs
import Play from '../assets/play.png';
import VideoPlayer from '../videoplayer/videoplayer'; // relative to this file

const About = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="about">
      <div className="about_left" style={{ position: 'relative' }}>
        <img src={Pic} alt="Subho" className="about_img" />

        <img
          src={Play}
          alt="Play"
          className="play_icon"
          onClick={() => setShowVideo(true)}
        />
      </div>

      <div className="about_right">
        <h3> ABOUT INSTITUTE
        </h3>
        <h2> Nurturing's Tomorrow's Leader From Today </h2>
        <p>
        Founded in 2004 by Mr. Shubhabrata Dutta, our institute has been a trusted name in computer education for over two decades. With his continued dedication to teaching and mentoring, thousands of students have gained the skills and confidence to excel in their academics and beyond.
</p><p>We specialize in Computer Science tuition for students from Class 4 to 10 (ICSE) and Class 11–12 (ISC/CBSE). To ensure every learner’s success, we provide:</p>
<p>✔️ Main Classes for structured learning</p>
<p>✔️ Doubt-clearing Sessions and Online classes for personalized guidance</p>
<p>✔️ Practice Sessions & Practical Classes for hands-on learning</p>
<p>✔️ Weekly Tests – our signature approach to build exam confidence</p>
<p>Our team also includes dedicated assistant teachers who work closely with students, offering support, solving doubts, and preparing them thoroughly for exams.
💡 With over 6000+ successful students already passed through our doors, we take pride in shaping future achievers with knowledge, discipline, and care.</p>
<p>📚 Your success is our commitment!</p>
        
      </div>

      {/* modal rendered conditionally */}
      {showVideo && <VideoPlayer closeVideo={() => setShowVideo(false)} />}
    </div>
  );
};

export default About;
