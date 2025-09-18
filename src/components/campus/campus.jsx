import React from 'react';
import './campus.css'
import Galery_1 from '../assets/galery_1.jpeg';
import Galery_2 from '../assets/galery_2.jpeg'
import Galery_3 from '../assets/galery_3.jpeg'
import Galery_4 from '../assets/galery_4.jpeg'
import Galery_5 from '../assets/galery_5.jpeg'
import Arrow from '../assets/arrow_c.png';

const Campus = () => {
  return (
    <div>
     <div className="campus">
        <div className="gallery">
          <img src={Galery_1} alt="" className="" />
          <img src={Galery_2} alt="" className="" />
          <img src={Galery_3} alt="" className="" />
          <img src={Galery_4} alt="" className="" />
          <img src={Galery_5} alt="" className="" />
          
          
        </div>
        <div ><button className="modern-btn">See more <img src={Arrow} alt=""  />
          </button>
            
          </div>
     </div>
      
    </div>
  );
};

export default Campus;