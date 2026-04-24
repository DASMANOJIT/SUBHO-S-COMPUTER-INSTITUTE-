import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './footer.css';
import Logo from '../assets/logo.jpg';
import Icon_1 from '../assets/appstore.jpg';
import Icon_2 from '../assets/playst.jpg';
import Youtube from '../assets/youtube.png';
import Facebook from '../assets/facebook.png';
import Instagram from '../assets/instagram.png';

const Footer = () => {
  return (
    <>
      <Helmet>
        <meta name="author" content="Subho's Computer Institute, Kolkata" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="IN-WB" />
        <meta name="geo.placename" content="Kolkata" />
      </Helmet>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <img
              src={Logo}
              alt="Subho's Computer Institute Logo - Leading Computer Training Center in Kolkata"
            />

            <p>
              Subho&apos;s Computer Institute in Kolkata provides ICSE, ISC &amp; CBSE computer coaching,
              programming courses, and practical IT training designed to help students succeed
              in academics and future careers.
            </p>

            <div className="app-links">
              <a
                href="https://play.google.com/store/apps/details?id=co.lily.kcqhj"
                target="_blank"
                rel="noopener noreferrer"
                title="Download Subho's Computer Institute App from Google Play Store"
              >
                <img
                  src={Icon_2}
                  alt="Download Subho's Computer Institute App on Google Play Store"
                  className="play-btn"
                />
              </a>
              <p>Our App is live on Google Play Store</p>

              <a href="#" title="Subho's Computer Institute App coming soon on Apple App Store">
                <img
                  src={Icon_1}
                  alt="Subho's Computer Institute App coming soon to Apple App Store"
                />
              </a>
              <p>Coming soon on App Store...</p>
            </div>

            <div className="social-links">
              <p>Visit us on Social Media</p>

              <a
                href="https://www.facebook.com/subhoscomputerinstitute"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Subho's Computer Institute on Facebook"
              >
                <img src={Facebook} alt="Subho's Computer Institute Facebook Page" />
              </a>

              <a
                href="https://www.instagram.com/subhoscomputerinstitute/"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Subho's Computer Institute on Instagram"
              >
                <img src={Instagram} alt="Subho's Computer Institute Instagram Profile" />
              </a>

              <a
                href="https://youtube.com/@subhabratadatta2889"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Subho's Computer Institute on YouTube"
              >
                <img src={Youtube} alt="Subho's Computer Institute YouTube Channel" />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div>
              <h4>Company</h4>
              <ul>
                <li>
                  <Link to="/#about">About Us</Link>
                </li>
                <li>
                  <Link to="/#contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
                <li>
                  <Link to="/faculties">Faculties</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4>Popular Courses</h4>
              <ul>
                <li>
                  <Link to="/programs?category=computer-courses">Computer Basics Course</Link>
                </li>
                <li>
                  <Link to="/programs?category=icse-isc">ICSE Classes 4-10 Computer Coaching</Link>
                </li>
                <li>
                  <Link to="/programs?category=icse-isc">ISC Class 11-12 Computer Science</Link>
                </li>
                <li>
                  <Link to="/programs?category=cbse">CBSE Class 11-12 Computer Science</Link>
                </li>
                <li>
                  <Link to="/programs?category=computer-courses">Python Programming Course</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="mailto:dmstacklabs@gmail.com?subject=Support%20Request%20-%20Subho%27s%20Computer%20Institute">
                    Support
                  </a>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Subho&apos;s Computer Institute, Kolkata. All Rights Reserved.</p>
          <p className="footer-credit">
            Developed and maintained by{' '}
            <a
              href="https://www.dmstacklabs.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              DM Stack Labs
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
