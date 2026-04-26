import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';
import Logo from '../assets/logo.png';

const navItems = [
  {
    id: 'programs',
    label: 'PROGRAMS',
    path: '/programs',
    dropdown: [
      { label: 'ICSE / ISC', path: '/programs?category=icse-isc' },
      { label: 'CBSE', path: '/programs?category=cbse' },
      { label: 'Computer Courses', path: '/programs?category=computer-courses' },
    ],
  },
  {
    id: 'about',
    label: 'ABOUT US',
    path: '/about/about-the-institute',
    dropdown: [
      { label: 'About the Institute', path: '/about/about-the-institute' },
      { label: 'Our Mission', path: '/about/mission' },
      { label: 'Our Vision', path: '/about/vision' },
      { label: 'Achievements', path: '/about/achievements' },
    ],
  },
  {
    id: 'campus',
    label: 'CAMPUS',
    section: 'campus',
    dropdown: [
      { label: 'Gallery', section: 'campus' },
      { label: 'Events', section: 'campus' },
      { label: 'Facilities', section: 'campus' },
    ],
  },
  {
    id: 'faculties',
    label: 'FACULTIES',
    path: '/faculties',
    dropdown: [
      { label: 'Administration', path: '/faculties/administration' },
      { label: 'Teaching Faculty', path: '/faculties?section=teaching-faculty' },
    ],
  },
  {
    id: 'careers',
    label: 'CAREERS',
    path: '/careers',
    dropdown: [
      { label: 'Current Openings', path: '/careers' },
      { label: 'Apply Now', path: '/careers' },
    ],
  },
  { id: 'contact', label: 'CONTACT US', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';
  const isSolidNavbar = scrolled || !isHomePage || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 992 && menuOpen) {
        setMenuOpen(false);
        setMobileDropdown(null);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setDesktopDropdown(null);
        setMobileDropdown(null);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);
  }, [location.pathname, location.hash]);

  const getScrollOffset = () => {
    const navbar = document.querySelector('.navbar');
    const headerBottom = navbar ? navbar.getBoundingClientRect().bottom : 76;
    return headerBottom + 18;
  };

  const scrollToSection = (sectionId) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    window.scrollTo({
      top: Math.max(targetSection.offsetTop - getScrollOffset(), 0),
      behavior: 'smooth',
    });
  };

  const handleSectionNavigation = (sectionId) => {
    setMenuOpen(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);

    if (isHomePage) {
      scrollToSection(sectionId);
      return;
    }

    navigate(sectionId === 'hero' ? '/' : `/#${sectionId}`);
  };

  const handleRouteNavigation = (path) => {
    setMenuOpen(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);

    if (`${location.pathname}${location.search}` === path || location.pathname === path) {
      const [targetPath, targetSearch = ''] = path.split('?');
      const params = new URLSearchParams(targetSearch);
      const sectionTarget = params.get('section');

      if (sectionTarget && location.pathname === targetPath) {
        const targetSection = document.getElementById(sectionTarget);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          return;
        }
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    navigate(path);
  };

  const handleLogoNavigation = () => {
    setMenuOpen(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);

    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    navigate('/');
  };

  const handleItemNavigation = (item) => {
    if (item.section) {
      handleSectionNavigation(item.section);
      return;
    }

    if (item.path) {
      handleRouteNavigation(item.path);
    }
  };

  const renderPrimaryAction = (item, className = 'nav-link-item') => {
    if (item.section) {
      return (
        <button
          type="button"
          className={className}
          onClick={() => handleSectionNavigation(item.section)}
        >
          {item.label}
        </button>
      );
    }

    return (
      <RouterLink
        to={item.path}
        className={`${className} ${location.pathname === item.path ? 'active' : ''}`}
      >
        {item.label}
      </RouterLink>
    );
  };

  return (
    <nav
      className={`navbar ${isSolidNavbar ? 'scrolled' : ''} ${!isSolidNavbar && isHomePage ? 'home-top' : ''}`}
      role="navigation"
      aria-label="Main"
    >
        <div className="nav-inner">
          <button
            type="button"
            className="logo-link"
            onClick={handleLogoNavigation}
            aria-label="Go to homepage"
          >
            <img src={Logo} alt="Subho's Computer Institute logo" className="logo" />
          </button>

          <ul className="nav-links">
            {navItems.map((item) => {
              const hasDropdown = Boolean(item.dropdown?.length);
              const isDropdownOpen = desktopDropdown === item.id;

              return (
                <li
                  key={item.id}
                  className={`nav-item ${hasDropdown ? 'has-dropdown' : ''}`}
                  onMouseEnter={() => hasDropdown && setDesktopDropdown(item.id)}
                  onMouseLeave={() => hasDropdown && setDesktopDropdown(null)}
                >
                  <div className="nav-item-row">
                    {renderPrimaryAction(item)}

                    {hasDropdown && (
                      <button
                        type="button"
                        className="dropdown-toggle"
                        aria-expanded={isDropdownOpen}
                        aria-label={`Toggle ${item.label} menu`}
                        onClick={() =>
                          setDesktopDropdown((current) => (current === item.id ? null : item.id))
                        }
                      >
                        <span className="dropdown-caret"></span>
                      </button>
                    )}
                  </div>

                  {hasDropdown && (
                    <div className={`nav-dropdown ${isDropdownOpen ? 'show' : ''}`}>
                      {item.dropdown.map((dropdownItem) => (
                        <button
                          key={dropdownItem.label}
                          type="button"
                          className="dropdown-link"
                          onClick={() => handleItemNavigation(dropdownItem)}
                        >
                          {dropdownItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}

          </ul>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? 'show' : ''}`} role="menu" aria-hidden={!menuOpen}>
          {navItems.map((item) => {
            const hasDropdown = Boolean(item.dropdown?.length);
            const isOpen = mobileDropdown === item.id;

            return (
              <div key={item.id} className={`mobile-nav-group ${isOpen ? 'open' : ''}`}>
                <div className="mobile-nav-row">
                  {item.section ? (
                    <button
                      type="button"
                      className="nav-link-item"
                      onClick={() => handleSectionNavigation(item.section)}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <RouterLink
                      to={item.path}
                      className={`nav-link-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                      {item.label}
                    </RouterLink>
                  )}

                  {hasDropdown && (
                    <button
                      type="button"
                      className="mobile-dropdown-toggle"
                      aria-expanded={isOpen}
                      aria-label={`Toggle ${item.label} submenu`}
                      onClick={() =>
                        setMobileDropdown((current) => (current === item.id ? null : item.id))
                      }
                    >
                      <span className="dropdown-caret"></span>
                    </button>
                  )}
                </div>

                {hasDropdown && (
                  <div className={`mobile-submenu ${isOpen ? 'show' : ''}`}>
                    {item.dropdown.map((dropdownItem) => (
                      <button
                        key={dropdownItem.label}
                        type="button"
                        className="mobile-submenu-link"
                        onClick={() => handleItemNavigation(dropdownItem)}
                      >
                        {dropdownItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
  );
};

export default Navbar;
