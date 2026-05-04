import React from 'react';
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
    <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={Logo} alt="Subho's Computer Institute logo" />

            <p>
              Subho&apos;s Computer Institute in Barrackpore provides ICSE, ISC and CBSE computer
              coaching, programming classes, Java, Python, HTML, CSS and practical IT training for students
              across Barrackpore, Shyamnagar, Sodepur, Sodepore, Kolkata, and nearby areas.
            </p>

            <div className="footer-nap" aria-label="Institute contact details">
              <div className="footer-campus">
                <p className="footer-campus-label">Barrackpore Campus</p>
                <p>
                  Madhusudan Complex, S.N. Banerjee Road, Barrackpore, Barrackpur Cantonment,
                  West Bengal 700120
                </p>
              </div>

              <div className="footer-campus">
                <p className="footer-campus-label">Shyamnagar Campus</p>
                <p>
                  308, Ghosh Para Rd, opposite St. Augustine&apos;s Day School, Pinkal,
                  Shyamnagar, Kolkata, West Bengal 743133
                </p>
              </div>
              
            </div>

            <div className="footer-app-links">
              <div className="footer-app-row">
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
              </div>

              <div className="footer-app-row">
                <a href="#" title="Subho's Computer Institute App coming soon on Apple App Store">
                  <img
                    src={Icon_1}
                    alt="Subho's Computer Institute App coming soon to Apple App Store"
                  />
                </a>
                <p>Coming soon on App Store...</p>
              </div>
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
                  <Link to="/about/about-the-institute">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
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
                  <Link to="/programs/icse-computer">ICSE Computer Coaching</Link>
                </li>
                <li>
                  <Link to="/programs/isc-computer-science">ISC Computer Science Coaching</Link>
                </li>
                <li>
                  <Link to="/programs/cbse-computer">CBSE Computer Coaching</Link>
                </li>
                <li>
                  <Link to="/programs/programming">Programming Classes</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="/about/about-the-institute">About the Institute</Link>
                </li>
                <li>
                  <Link to="/programs">Programs</Link>
                </li>
                <li>
                  <Link to="/faculties/administration">Administration</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
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
          <p>© 2025 Subho&apos;s Computer Institute, Barrackpore. All Rights Reserved.</p>
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
  );
};

export default Footer;
