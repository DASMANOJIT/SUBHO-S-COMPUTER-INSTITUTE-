import React from 'react';
import './navbar.css';
import EmailIcon from '../assets/mail-icon.png';
import PhoneIcon from '../assets/phone-icon.png';

const ContactTopBar = () => {
  return (
    <div className="top-contact-bar" role="presentation">
      <div className="top-contact-inner">
        <a href="mailto:subhoscomputerinstitute@gmail.com" className="top-contact-item">
          <img src={EmailIcon} alt="" aria-hidden="true" />
          <span>Email: subhoscomputerinstitute@gmail.com</span>
        </a>

        <a href="tel:9831934306" className="top-contact-item">
          <img src={PhoneIcon} alt="" aria-hidden="true" />
          <span>For Admission: 9831934306</span>
        </a>
      </div>
    </div>
  );
};

export default ContactTopBar;
