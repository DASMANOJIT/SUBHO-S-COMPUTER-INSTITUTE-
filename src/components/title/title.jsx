import React from 'react';
import './title.css'
import { Helmet } from 'react-helmet-async';
const Title = ({subtitle,title}) => {
  return (
    <>
    <Helmet>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name ="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={subtitle} />
            <meta name="keywords" content="computer institute kolkata, programming classes, web development course" />
         <meta name="geo.region" content="IN-WB" />
  <meta name="geo.placename" content="Kolkata" />
          </Helmet>
    <div>
      <div className="title">
        <p>{subtitle}</p>
        <h2> {title}</h2>
      </div>
    </div>
    </>
  );
};

export default Title;