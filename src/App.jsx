import React from 'react';
import Navbar from './components/navbar/navbar.jsx';
import Hero from './components/hero/hero.jsx';
import Programs from './components/programs/programs.jsx'; 
import Title from './components/title/title.jsx';
import About from './components/about/about.jsx';
import Campus from './components/campus/campus.jsx';
import Contact from './components/contact/contact.jsx'
import Footer from './components/footer/footer.jsx'
import Videoplayer from './components/videoplayer/videoplayer.jsx'
const App = () => {

  return (
    <div>
      <Navbar />
      <Hero/>
      <div className="container">
      <Title subtitle='our program' title='what we offer'/>
      <Programs/>
      <About />
      <Title subtitle='gallery' title='Campus Photos'/>
      <Campus/>
      <Title subtitle='Contact us ' title='Campus Get In Touch'/>
      <Contact/>
      <Footer/>
    </div>
    
    </div>
  );
};

export default App;
