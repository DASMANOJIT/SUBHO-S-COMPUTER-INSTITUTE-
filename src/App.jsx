import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import ContactTopBar from './components/navbar/ContactTopBar.jsx';
import Navbar from './components/navbar/navbar.jsx';
import Hero from './components/hero/hero.jsx';
import Title from './components/title/title.jsx';
import Campus from './components/campus/campus.jsx';
import Contact from './components/contact/contact.jsx';
import Footer from './components/footer/footer.jsx';
import AboutInstitutePage from './pages/about/AboutInstitutePage.jsx';
import Faculties from './pages/faculties/Faculties.jsx';
import Administration from './pages/administration/Administration.jsx';
import Careers from './pages/careers/Careers.jsx';
import ProgramsPage from './pages/programs/ProgramsPage.jsx';
import PrivacyPolicy from './pages/privacy/PrivacyPolicy.jsx';

const RoutePageShell = ({ children }) => {
  return <div className="route-page-shell">{children}</div>;
};

const HomePage = () => {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>

      <div className="container">
        <section id="campus">
          <Title subtitle="gallery" title="Campus Photos" />
          <Campus />
        </section>

        <section id="contact">
          <Title subtitle="Contact us" title="Campus Get In Touch" />
          <Contact />
        </section>
      </div>
    </>
  );
};

const App = () => {
  return (
    <>
      <Helmet>
        <title>Subho&apos;s Computer Institute | Learn Programming in Kolkata</title>
        <meta
          name="title"
          content="Subho's Computer Institute Kolkata – Best Computer Course Training & IT Classes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Join Subho's Computer Institute in Kolkata. Learn programming, web development and more with expert guidance."
        />
        <meta
          name="keywords"
          content="computer institute kolkata, programming classes, web development course"
        />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="IN-WB" />
        <meta name="geo.placename" content="Kolkata" />
      </Helmet>

      <ScrollToTop />
      <ContactTopBar />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/programs"
            element={
              <RoutePageShell>
                <ProgramsPage />
              </RoutePageShell>
            }
          />
          <Route
            path="/about/about-the-institute"
            element={
              <RoutePageShell>
                <AboutInstitutePage />
              </RoutePageShell>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <RoutePageShell>
                <PrivacyPolicy />
              </RoutePageShell>
            }
          />
          <Route
            path="/faculties"
            element={
              <RoutePageShell>
                <Faculties />
              </RoutePageShell>
            }
          />
          <Route
            path="/faculties/administration"
            element={
              <RoutePageShell>
                <Administration />
              </RoutePageShell>
            }
          />
          <Route
            path="/careers"
            element={
              <RoutePageShell>
                <Careers />
              </RoutePageShell>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default App;
