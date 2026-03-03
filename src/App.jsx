import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/navbar/navbar.jsx';
import Hero from './components/hero/hero.jsx';
import Programs from './components/programs/programs.jsx'; 
import Title from './components/title/title.jsx';
import About from './components/about/about.jsx';
import Campus from './components/campus/campus.jsx';
import Contact from './components/contact/contact.jsx';
import Footer from './components/footer/footer.jsx';

const App = () => {
  return (
    <div>
      <Helmet>
                  <title>Subho's Computer Institute | Learn Programming in Kolkata</title>
                  <meta name="title" content="Subho's Computer Institute Kolkata – Best Computer Course Training & IT Classes" />
                  <meta name ="viewport" content="width=device-width, initial-scale=1.0" />
                  <meta name="description" content="Join Subho's Computer Institute in Kolkata. Learn programming, web development and more with expert guidance." />
                  <meta name="keywords" content="computer institute kolkata, programming classes, web development course" />
                <meta name="robots" content="index, follow" />
                </Helmet>

      <Navbar />
      <Hero />
      <div className="container">
        <Title subtitle='our program' title='what we offer'/>
        <Programs/>
        <About />
        <Title subtitle='gallery' title='Campus Photos'/>
        <Campus/>
        <Title subtitle='Contact us' title='Campus Get In Touch'/>
        <Contact/>
        <Footer/>
      </div>
    </div>
  );
};

export default App;