import React from 'react';
import './footer.css'
import Logo from '../assets/logo.jpg'
import Icon_1 from '../assets/appstore.jpg'
import Icon_2 from '../assets/playst.jpg'
import Youtube from '../assets/youtube.png'
import Facebook from '../assets/facebook.png'
import Instagram from '../assets/instagram.png'
import { Link } from "react-scroll";
const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-top">
    <div className="footer-brand">
  <img src={Logo} alt="SUBHO'S COMPUTER INSTITUTE" />
  <p>
    We understand that every student has unique needs and abilities,
    that’s why our curriculum is designed to adapt to your needs and help
    you grow!
  </p>
  <div className="app-links">
    <a href="#"><img src={Icon_2} alt="Google Play" className="play-btn" /></a> 
    <a href="#"><img src={Icon_1} alt="App Store" /></a>
    <p>will be there soon...</p>
  </div>
  <div className="social-links">
    <p>Visit us!</p>
    <a href="https://www.facebook.com/subhoscomputerinstitute"><i className="fab fa-facebook"><img src={Facebook} alt="" /></i></a>
    <a href="https://www.instagram.com/subhoscomputerinstitute/"><i className="fab fa-instagram"><img src={Instagram} alt="" /></i></a>
    <a href="https://l.instagram.com/?u=https%3A%2F%2Fyoutube.com%2F%40subhabratadatta2889%3Fsi%3DmIvCRvlS8D8Ln1L0%26fbclid%3DPAZXh0bgNhZW0CMTEAAaeqHhd-x6R_-XhExwRGTyalwDyuV_S5-cnsBLCyrAeMDkxK5kzAzfcB87nbyQ_aem_3raOota2-i-lh5bQX8ywxQ&e=AT2oYG4x69ANwbeaCX7fNKxeOFlX7HmPo2J8mdZdx5nRvMjdoXKuWNY-HmKjXf37W3qNWRQ1TNd430RlY26Z1kvK8uZ3DsY1SAof_3ItNUDAcbUv2J4zO6L2zw"><i className="fab fa-youtube"><img src={Youtube} alt="" /></i></a>
  </div>
</div>
  
      <div className="footer-links">
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="about" smooth={true} offset={-260} duration={500}>About Us</Link></li>
            <li><Link to="contact" smooth={true} offset={-260} duration={500}>Contact Us</Link></li>
            <li><Link to="" smooth={true} offset={-260} duration={500}>Careers</Link></li>
            <li><Link to="" smooth={true} offset={-260} duration={500}>Updates</Link></li>
          </ul>
        </div>
  
        <div>
          <h4>Popular Courses</h4>
          <ul>
            <li><a href="#">Computer Basics</a></li>
            <li><a href="#">Class 4-10(ICSE)</a></li>
            <li><a href="#">Class 11/12(ISC)</a></li>
            <li><a href="#">Class 11/12(CBSE)</a></li>
            <li><a href="#">Python</a></li>
          </ul>
        </div>
  
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#"></a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </div>
  
    <div className="footer-bottom">
      <p>© 2025 SUBHO'S COMPUTER INSTITUTE. All Rights Reserved.</p>
    </div>
  </footer>
  );
};

export default Footer;
