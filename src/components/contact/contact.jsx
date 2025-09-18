import React from 'react'
import './contact.css'
import Msg from '../assets/msg-icon.png'
import Email from '../assets/mail-icon.png'
import Call from '../assets/phone-icon.png'
import Locate from '../assets/location-icon.png'
import Arrow from '../assets/arrow_c.png'
const Contact =() =>{
    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "894be977-63cf-4a41-9281-612d1b8eaa23");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
    return(
        <div className="contact">
            <div className="contact-col">
            <h3>
                Send Us A Message <img src={Msg} alt="" />
            </h3>
            <p>Feel free to reach out through contact form or find our contact information below. Your feedback, questions, and suggestions are important to us as we strive to provide exceptional service to our institute community.</p>
             <ul>
                <li><img src={Email} alt="" />subhabratadatta1981@gmail.com</li>
                <li><img src={Call} alt="" />9831934306</li>
                <li><img src={Locate} alt="" />MADHUSUDAN COMPLEX , S N BANERJEE ROAD , CHIRIAMORE , BARRACKPORE , KOLKATA : 700120 </li>
             </ul>
            </div>
            <div className="contact-col">
            <form onSubmit={onSubmit}>
                    <label>Your Name</label>
                    <input type='text' name='name' placeholder='Write Your Name' required/>
                    <label>Phone Number</label>
                    <input type='tel' name='phone' placeholder='Write Your phone number' required/>
                    <label>Email Id</label>
                    <input type='email' name='email' placeholder='Write Your email ID' required/>
                    <label>Write Your message here</label>
                    <textarea name='message' rows ='6' placeholder='Write your message ' required></textarea>
                    <button type='submit ' className="modern-btn"> Submit Now <img src={Arrow} alt="" /></button>
                </form>
                <span>{result}</span>
            </div>

        </div>
    );
};
export default Contact;