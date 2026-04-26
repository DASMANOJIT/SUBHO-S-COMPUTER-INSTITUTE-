import React, { useState } from 'react';
import './about.css';
import Pic from '../assets/subho.jpg';
import Play from '../assets/play.png';
import VideoPlayer from '../videoplayer/videoplayer';

const About = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <div className="about">
        <div className="about_left" style={{ position: 'relative' }}>
          <img
            src={Pic}
            alt="Mr. Subhabrata Datta founder of Subho's Computer Institute Barrackpore"
            className="about_img"
          />

          <img
            src={Play}
            alt="Watch introduction video of Subho's Computer Institute"
            className="play_icon"
            onClick={() => setShowVideo(true)}
            role="button"
            aria-label="Play institute introduction video"
          />
        </div>

        <div className="about_right">
          <h3>ABOUT THE INSTITUTE</h3>
          <h2>Nurturing Tomorrow's Leaders From Today</h2>

          <p>
            Founded in 2004 by Mr. Shubhabrata Dutta, Subho's Computer Institute
            has been a trusted name in computer education in Barrackpore, Kolkata
            for over two decades. Through dedication to teaching and mentoring,
            thousands of students have gained the skills and confidence to excel
            academically and professionally.
          </p>

          <p>
            We specialize in Computer Science tuition for students from
            Class 4–10 (ICSE) and Class 11–12 (ISC/CBSE), along with
            programming and practical IT training.
          </p>

          <p>✔️ Structured Main Classes for strong academic foundation</p>
          <p>✔️ Doubt-Clearing Sessions & Online Classes for personalized support</p>
          <p>✔️ Practice Sessions & Practical Classes for hands-on learning</p>
          <p>✔️ Weekly Tests – our signature approach to build exam confidence</p>

          <p>
            With a team of dedicated assistant teachers and over 6000+
            successful students, we continue shaping future achievers with
            knowledge, discipline, and care.
          </p>

          <p>📚 Your success is our commitment!</p>
        </div>

        {showVideo && (
          <VideoPlayer closeVideo={() => setShowVideo(false)} />
        )}
      </div>
    </>
  );
};

export default About;
