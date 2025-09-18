import React from 'react';
import './programs.css'
import Program_1 from '../assets/program1.jpeg';
import Program_2 from '../assets/program2.jpeg';
import Program_3 from '../assets/program3.jpeg';
import Course_1 from '../assets/CISCE_logo.png'
import Course_2 from '../assets/cbsc.png'


const Programs = () => {
  return (
    <div className="programs">
      <div className="program">
        <img src={Program_1} alt="" className="card" />
        <div className="caption">
            <img src={Course_1} alt=""  />
            <p>CLASSES 4-10(ICSE)</p>
        </div>
      </div>
      <div className="program">
      <img src={Program_2} alt="" className="card" />
      <div className="caption">
            <img src={Course_1} alt=""  />
            <p>CLASS 11-12(ISC)</p>
        </div>
      </div>
      <div className="program">
      <img src={Program_3} alt="" className="card" />
      <div className="caption">
            <img src={Course_2}  alt=""  />
            <p>CLASS 11-12(CBSE)</p>
        </div>
      </div>
    </div>
  );
};

export default Programs;
