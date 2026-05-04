import React, { useState } from 'react';
import './about.css';
import Pic from '../assets/subho.jpg';
import Play from '../assets/play.png';
import VideoPlayer from '../videoplayer/videoplayer';
import ScrollReveal from '../scrollReveal/ScrollReveal.jsx';
import ImageWithSkeleton from '../skeletons/ImageWithSkeleton.jsx';

const About = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <div className="about">
        <ScrollReveal as="div" className="about_left" style={{ position: 'relative' }}>
          <ImageWithSkeleton
            src={Pic}
            alt="Mr. Subhabrata Datta founder of Subho's Computer Institute Barrackpore"
            className="about_img"
            wrapperClassName="about-image-shell"
            skeletonClassName="about-image-skeleton"
          />

          <img
            src={Play}
            alt="Watch introduction video of Subho's Computer Institute"
            className="play_icon"
            onClick={() => setShowVideo(true)}
            role="button"
            aria-label="Play institute introduction video"
          />
        </ScrollReveal>

        <ScrollReveal as="div" className="about_right" delay={120}>
          <h3>ABOUT THE INSTITUTE</h3>
          <h2>Nurturing Tomorrow's Leaders From Today</h2>

          <p>
            Founded in 2004 by Mr. Shubhabrata Dutta, Subho's Computer Institute
            has been a trusted name in computer education in Barrackpore, Kolkata,
            and Shyamnagar for over two decades. Through dedication to teaching and
            mentoring, thousands of students have gained the skills and confidence
            to excel academically and professionally.
          </p>

          <p>
            We specialize in Computer Science tuition for students from Class 4–10
            (ICSE) and Class 11–12 (ISC/CBSE), along with programming classes,
            practical IT training, and board exam preparation.
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
        </ScrollReveal>

        {showVideo && (
          <VideoPlayer closeVideo={() => setShowVideo(false)} />
        )}
      </div>
    </>
  );
};

export default About;
