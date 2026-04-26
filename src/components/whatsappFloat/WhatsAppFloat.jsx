import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './whatsAppFloat.css';

const WHATSAPP_URL =
  'https://wa.me/919831934306?text=Hello%20Subho%27s%20Computer%20Institute%2C%20I%20want%20to%20book%20an%20appointment%20for%20admission%20enquiry.';

const WhatsAppFloat = () => {
  return (
    <div className="whatsapp-float">
      <span className="whatsapp-float-label">Book Appointment</span>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book appointment on WhatsApp"
        className="whatsapp-float-button"
      >
        <FaWhatsapp aria-hidden="true" />
      </a>
    </div>
  );
};

export default WhatsAppFloat;
