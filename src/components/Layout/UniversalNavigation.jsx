import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiTerminal } from 'react-icons/fi';
import GlassSurface from '../common/GlassSurface/GlassSurface';

const NavigationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  flex-direction: column;
`;

const SectionPinContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) !important;
  z-index: 998;

  @media (max-width: 768px) {
    top: 15px;
    width: 90vw;
  }
`;

const StyledGlassNavbar = styled(GlassSurface)`
  &.glass-surface {
    width: auto;
    min-width: clamp(300px, 70vw, 1000px); /* Slightly narrower */
    padding: 0 40px;
    transition: all 0.3s ease;
    border: 1px solid rgba(148, 180, 193, 0.15);
  }

  @media (max-width: 768px) {
    &.glass-surface {
      min-width: 90vw;
      padding: 0 15px;
    }
  }
`;

const SectionPinContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1001;

  &:hover {
    transform: scale(1.1);
  }

  margin-right: 20px;
`;

const SectionPinText = styled(motion.h2)`
  color: var(--green);
  font-family: var(--font-heading);
  font-size: clamp(14px, 2vw, 16px);
  margin: 0;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const ScrollIndicatorContainer = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px; /* Slimmer */
  height: 40px;
  background: transparent; /* Remove background, let GlassSurface show through */
  padding: 4px 10px;
  margin-left: auto;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const ProgressRing = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  rect {
    fill: none;
    stroke-width: 1.5; /* Thinner */
    rx: 20; /* Matches slim height */
    ry: 20;
  }

  .bg {
    stroke: rgba(100, 255, 218, 0.05); /* Very subtle green */
  }

  .fg {
    stroke: var(--green);
    stroke-dashoffset: ${props => 460 - (props.progress * 460)};
    transition: stroke-dashoffset 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    filter: drop-shadow(0 0 5px rgba(100, 255, 218, 0.3));
  }
`;

const IndicatorContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--lightest-slate);
  font-family: var(--font-heading);
  z-index: 2;

  .label {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--green);
  }

  .counter {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    font-weight: 400;
    opacity: 0.8;

    .current {
      font-weight: 700;
      color: var(--green);
    }

    .divider {
      opacity: 0.4;
    }

    .total {
      opacity: 0.4;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: clamp(20px, 4vw, 40px);
  align-items: center;
  margin-left: auto;

  @media (max-width: 768px) {
    display: none;
  }

  a {
    color: var(--slate);
    text-decoration: none;
    font-family: var(--font-heading);
    font-size: clamp(12px, 1.4vw, 14px);
    transition: color 0.3s ease;
    position: relative;
    cursor: pointer;

    &:hover {
      color: var(--green);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--green);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }

    &.active {
      color: var(--green);
      
      &::after {
        width: 100%;
      }
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--green);
  cursor: pointer;
  z-index: 1001;
  padding: 0;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 30px;
    height: 30px;
  }
`;

const MobileBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const MobileMenuDrawer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  max-width: 320px;
  height: 100vh;
  background: rgba(33, 52, 72, 0.7);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 80px 40px;
  border-left: 1px solid rgba(148, 180, 193, 0.1);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.2);
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 35px;
  width: 100%;

  a {
    color: var(--lightest-slate);
    text-decoration: none;
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    position: relative;
    padding-left: 0;

    &:hover {
      color: var(--green);
      padding-left: 10px;
    }

    &.active {
      color: var(--green);
      padding-left: 10px;
      
      &::before {
        content: '';
        position: absolute;
        left: -15px;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 2px;
        background: var(--green);
      }
    }
  }
`;

const MobileCloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background: none;
  border: none;
  color: var(--green);
  cursor: pointer;
  z-index: 1001;
  padding: 10px;

  svg {
    width: 32px;
    height: 32px;
  }
`;

const sections = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'experience', name: 'My Journey' },
  { id: 'projects', name: 'Projects' },
  { id: 'contact', name: 'Contact' }
];

const UniversalNavigation = ({ logoSrc }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSectionName, setShowSectionName] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRefs = useRef({});

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 50;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    } else {
      // If element not found (e.g. on homepage and wanting about), navigate to route
      navigate(`/${sectionId === 'home' ? '' : sectionId}`);
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(currentScrollY / totalHeight);
      setShowSectionName(currentScrollY > 100);
      setIsNavVisible(currentScrollY < 100 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-45% 0px -45% 0px', // Center-focused detection
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
        observerRefs.current[section.id] = element;
      }
    });

    return () => {
      sections.forEach(section => {
        const element = observerRefs.current[section.id];
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const currentSectionName = sections.find(section => section.id === activeSection)?.name || '';

  useEffect(() => {
    const path = location.pathname.replace('/', '');
    if (path) {
      setActiveSection(path);
    } else {
      setActiveSection('home');
    }
  }, [location.pathname]);

  return (
    <NavigationContainer>
      <AnimatePresence>
        <SectionPinContainer
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          <StyledGlassNavbar
            width="100%"
            height={56}
            borderRadius={100}
            backgroundOpacity={0.15}
            saturation={1.1}
            distortionScale={-1} /* Professional, subtle refraction */
            borderWidth={0.04}
            brightness={30}
            blur={12}
          >
            <SectionPinContent>
              <Logo
                src={logoSrc}
                alt="Edbert Ocampo Logo"
                onClick={() => {
                  if (location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    navigate('/');
                  }
                }}
              />
              {!showSectionName && (
                <NavLinks>
                  {sections.filter(s => s.name !== 'Home').map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(section.id);
                      }}
                      className={activeSection === section.id ? 'active' : ''}
                    >
                      {section.name}
                    </a>
                  ))}
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      const input = document.querySelector('input[placeholder*="command"]');
                      input?.focus();
                    }}
                    title="Open Command Launcher"
                    style={{ color: 'var(--green)', display: 'flex', alignItems: 'center' }}
                  >
                    <FiTerminal />
                  </a>
                </NavLinks>
              )}
              {showSectionName && (
                <ScrollIndicatorContainer
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  <IndicatorContent>
                    <span className="label">{currentSectionName}</span>
                    <div className="counter">
                      <span className="current">{String(sections.findIndex(s => s.id === activeSection) + 1).padStart(2, '0')}</span>
                      <span className="divider">/</span>
                      <span className="total">{String(sections.length).padStart(2, '0')}</span>
                    </div>
                  </IndicatorContent>
                </ScrollIndicatorContainer>
              )}

              <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <FiX /> : <FiMenu />}
              </MobileMenuButton>
            </SectionPinContent>
          </StyledGlassNavbar>
        </SectionPinContainer>
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <MobileBackdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileMenuDrawer
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <MobileCloseButton onClick={() => setIsMobileMenuOpen(false)}>
                <FiX />
              </MobileCloseButton>
              <MobileNavLinks>
                {sections.map((section, idx) => (
                  <motion.a
                    key={section.id}
                    href={`#${section.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(section.id);
                    }}
                    className={activeSection === section.id ? 'active' : ''}
                  >
                    {section.name}
                  </motion.a>
                ))}
              </MobileNavLinks>
            </MobileMenuDrawer>
          </>
        )}
      </AnimatePresence>
    </NavigationContainer>
  );
};

export default UniversalNavigation;
