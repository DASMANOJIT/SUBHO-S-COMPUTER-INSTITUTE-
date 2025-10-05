
import React, { useState, useEffect } from "react";
import "./navbar.css";
import Logo from "../assets/logo.png"; // adjust path if needed
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";





const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ ShowPage, setShowPage] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // prevent background scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Main">
        <div className="nav-inner">
        <Link to="hero" smooth={true} offset={0} duration={500}> <img src={Logo} alt="Subho's logo" className="logo" /></Link>

          <ul className="nav-links">
          <li><Link to="hero" smooth={true} offset={0} duration={500}>HOME</Link></li>
<li><Link to="programs" smooth={true} offset={-260} duration={500}>PROGRAMS</Link></li>
<li><Link to="about" smooth={true} offset={-150} duration={500}>ABOUT US</Link></li>
<li><Link to="campus" smooth={true} offset={-260} duration={500}>CAMPUS</Link></li>
<li><RouterLink to="contact" onClick={() => setShowPage(true)}>ASSITANT TEACHERS </RouterLink></li>
<li><Link to="contact" smooth={true} offset={-260} duration={500}>CONTACT</Link></li>
            <li><a class="login-btn" href="http://127.0.0.1:5000/login" role="button">Login</a></li>
            
          </ul>
        
    

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((s) => !s)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? "show" : ""}`} role="menu" aria-hidden={!menuOpen}>
        <Link to="hero" smooth={true} offset={0} duration={500} onClick={() => setMenuOpen(false)}>HOME</Link>
        <Link to="programs" smooth={true} offset={-260} duration={500} onClick={() => setMenuOpen(false)}>PROGRAMS</Link>
        <Link to="about" smooth={true} offset={-150} duration={500} onClick={() => setMenuOpen(false)}>ABOUT US</Link>
        <Link to="campus" smooth={true} offset={-260} duration={500} onClick={() => setMenuOpen(false)}>CAMPUS</Link>
        <RouterLink to="contact"  onClick={() => setMenuOpen(false)}>ASSITANT TEACHERS </RouterLink>
       <Link to="contact" smooth={true} offset={-260} duration={500} onClick={() => setMenuOpen(false)}>CONTACT</Link>
          <a href="http://127.0.0.1:5000/login" onClick={() => setMenuOpen(false)}>login/signup</a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

