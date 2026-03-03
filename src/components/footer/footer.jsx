import React from 'react';
import './footer.css';
import Logo from '../assets/logo.jpg';
import Icon_1 from '../assets/appstore.jpg';
import Icon_2 from '../assets/playst.jpg';
import Youtube from '../assets/youtube.png';
import Facebook from '../assets/facebook.png';
import Instagram from '../assets/instagram.png';
import { Link } from "react-scroll";
import { Helmet } from 'react-helmet-async';

const Footer = () => {
  return (
    <>
      {/* Minimal SEO-safe Helmet (No duplicate title/description) */}
      <Helmet>
        <meta name="author" content="Subho's Computer Institute, Kolkata" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <footer className="footer">
        <div className="footer-top">

          {/* Brand Section */}
          <div className="footer-brand">
            <img 
              src={Logo} 
              alt="Subho's Computer Institute Logo - Leading Computer Training Center in Kolkata" 
            />

            <p>
              Subho's Computer Institute in Kolkata provides ICSE, ISC & CBSE computer coaching,
              programming courses, and practical IT training designed to help students succeed
              in academics and future careers.
            </p>

            {/* App Links */}
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

              <a
                href="#"
                title="Subho's Computer Institute App coming soon on Apple App Store"
              >
                <img 
                  src={Icon_1} 
                  alt="Subho's Computer Institute App coming soon to Apple App Store" 
                />
              </a>
              <p>Coming soon on App Store...</p>
            </div>

            {/* Social Links */}
            <div className="social-links">
              <p>Visit us on Social Media</p>

              <a
                href="https://www.facebook.com/subhoscomputerinstitute"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Subho's Computer Institute on Facebook"
              >
                <img 
                  src={Facebook} 
                  alt="Subho's Computer Institute Facebook Page" 
                />
              </a>

              <a
                href="https://www.instagram.com/subhoscomputerinstitute/"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Subho's Computer Institute on Instagram"
              >
                <img 
                  src={Instagram} 
                  alt="Subho's Computer Institute Instagram Profile" 
                />
              </a>

              <a
                href="https://youtube.com/@subhabratadatta2889"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Subho's Computer Institute on YouTube"
              >
                <img 
                  src={Youtube} 
                  alt="Subho's Computer Institute YouTube Channel" 
                />
              </a>
            </div>
          </div>

          {/* Footer Links Section */}
          <div className="footer-links">

            {/* Company */}
            <div>
              <h4>Company</h4>
              <ul>
                <li>
                  <Link to="about" smooth={true} offset={-260} duration={500}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="contact" smooth={true} offset={-260} duration={500}>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Updates</a>
                </li>
              </ul>
            </div>

            {/* Popular Courses */}
            <div>
              <h4>Popular Courses</h4>
              <ul>
                <li><a href="#">Computer Basics Course</a></li>
                <li><a href="#">ICSE Classes 4-10 Computer Coaching</a></li>
                <li><a href="#">ISC Class 11-12 Computer Science</a></li>
                <li><a href="#">CBSE Class 11-12 Computer Science</a></li>
                <li><a href="#">Python Programming Course</a></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Support</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>
            © 2025 Subho's Computer Institute, Kolkata. All Rights Reserved.
          </p>
        </div>

      </footer>
    </>
  );
};

export default Footer;