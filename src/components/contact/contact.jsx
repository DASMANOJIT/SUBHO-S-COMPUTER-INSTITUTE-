import React from 'react';
import './contact.css';
import Msg from '../assets/msg-icon.png';
import Email from '../assets/mail-icon.png';
import Call from '../assets/phone-icon.png';
import Locate from '../assets/location-icon.png';
import Arrow from '../assets/arrow_c.png';
import { Helmet } from 'react-helmet-async';

const Contact = () => {

  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "921e5c70-48a5-4799-ade3-6c96e9e22a58");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully ✅");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <>
      {/* Contact Page SEO */}
      <Helmet>
        <title>
          Contact Subho's Computer Institute Kolkata | Admission & Enquiry
        </title>
<meta name="geo.region" content="IN-WB" />
  <meta name="geo.placename" content="Kolkata" />
        <meta
          name="description"
          content="Contact Subho's Computer Institute in Kolkata for admissions, course details, ICSE/ISC/CBSE computer coaching, and programming classes. Call or visit our Barrackpore center today."
        />

        <meta
          name="keywords"
          content="Contact Subho's Computer Institute, computer coaching Kolkata contact, Barrackpore computer institute, programming classes enquiry Kolkata, ICSE ISC CBSE computer coaching"
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Subho's Computer Institute, Kolkata" />
      </Helmet>

      <div className="contact">

        {/* LEFT SIDE */}
        <div className="contact-col">

          <h3>
            Send Us A Message{" "}
            <img
              src={Msg}
              alt="Send message to Subho's Computer Institute Kolkata"
            />
          </h3>

          <p>
            Feel free to reach out for admissions, course details, ICSE/ISC/CBSE
            computer coaching, Python programming classes, or any other enquiry.
            We are here to help students and parents across Kolkata.
          </p>

          <ul>
            <li>
              <img
                src={Email}
                alt="Email Subho's Computer Institute"
              />
              subhoscomputerinstitute@gmail.com
            </li>

            <li>
              <img
                src={Call}
                alt="Call Subho's Computer Institute Kolkata"
              />
              9831934306 | 8617759263 | 7003751561 
            </li>

            <li>
              <img
                src={Locate}
                alt="Location of Subho's Computer Institute in Barrackpore Kolkata"
              />
              Madhusudan Complex, S N Banerjee Road, Chiriamore, Barrackpore,
              Kolkata – 700120
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="contact-col">
          <form onSubmit={onSubmit}>

            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Write Your Name"
              required
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Write Your Phone Number"
              required
            />

            <label htmlFor="email">Email Id</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Write Your Email ID"
              required
            />

            <label htmlFor="message">Write Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Write your message"
              required
            ></textarea>

            <button type="submit" className="modern-btn">
              Submit Now{" "}
              <img
                src={Arrow}
                alt="Submit contact form to Subho's Computer Institute"
              />
            </button>
          </form>

          <span>{result}</span>
        </div>

      </div>
    </>
  );
};

export default Contact;