import React from 'react';
import './programs.css'
import Program_1 from '../assets/program1.jpeg';
import Program_2 from '../assets/program2.jpeg';
import Program_3 from '../assets/program3.jpeg';
import Program_4 from '../assets/program_4.jpeg';
import Course_1 from '../assets/CISCE_logo.png'
import Course_2 from '../assets/cbsc.png'
import Course_4 from '../assets/python.png';
import { Helmet } from 'react-helmet-async';

const Programs = () => {
  return (
    <>
    <Helmet>
            <title>Subho's Computer Institute | Learn Programming in Kolkata</title>
            <meta name="title" content="Subho's Computer Institute Kolkata – Best Computer Course Training & IT Classes" />
            <meta name ="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Join Subho's Computer Institute in Kolkata. Learn programming, web development and more with expert guidance." />
            <meta name="keywords" content="computer institute kolkata, programming classes, web development course" />
          </Helmet>
    <div className="programs">
      <div className="program">
        <img src={Program_1} alt="ICSE Classes 4 to 10 Computer Coaching in Kolkata at Subho's Computer Institute" className="card" />
        <div className="caption">
            <img src={Course_1} alt="ICSE Board Computer Training Course Logo - Subho's Computer Institute Kolkata"  />
            <p>CLASSES 4-10(ICSE)</p>
        </div>
      </div>
      <div className="program">
      <img src={Program_2} alt="ISC Class 11-12 Computer Science Coaching in Kolkata - Subho's Computer Institute" className="card" />
      <div className="caption">
            <img src={Course_1} alt="ISC Board Computer Science Course Training in Kolkata"  />
            <p>CLASS 11-12(ISC)</p>
        </div>
      </div>
      <div className="program">
      <img src={Program_3} alt="CBSE Class 11-12 Computer Science Classes in Kolkata at Subho's Computer Institute" className="card" />
      <div className="caption">
            <img src={Course_2}  alt="CBSE Computer Science Training Course Kolkata - Subho's Computer Institute"  />
            <p>CLASS 11-12(CBSE)</p>
        </div>
      </div>
       <div className="program">
      <img src={Program_4} alt="Python Programming Course in Kolkata with Certification - Subho's Computer Institute" className="card" />
      <div className="caption">
            <img src={Course_4}  alt="Python Coding Training Institute in Kolkata - Subho's Computer Institute"  />
            <p>Python </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Programs;
