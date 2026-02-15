import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

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
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(33, 52, 72, 0.85);
  backdrop-filter: blur(10px);
  padding: 10px clamp(20px, 5vw, 50px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 998;
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
  width: 180px;
  height: 52px;
  background: rgba(33, 52, 72, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 8px 15px;
  transform: scale(0.8);

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
    stroke-width: 2;
    rx: 16;
    ry: 16;
  }

  .bg {
    stroke: rgba(148, 180, 193, 0.1);
  }

  .fg {
    stroke: var(--green);
    stroke-dasharray: 460;
    stroke-dashoffset: ${props => 460 - (props.progress * 460)};
    transition: stroke-dashoffset 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    filter: drop-shadow(0 0 8px rgba(100, 255, 218, 0.4));
  }
`;

const IndicatorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1px;
  color: var(--slate);
  font-family: var(--font-heading);
  z-index: 2;

  .label {
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: var(--green);
    opacity: 0.8;
    text-align: center;
    width: 100%;
  }

  .counter {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 15px;
    font-weight: 900;
    color: var(--lightest-slate);

    .current {
      position: relative;
      height: 18px;
      overflow: hidden;
      width: 22px;
      display: flex;
      justify-content: center;
    }

    .divider {
      opacity: 0.3;
      font-weight: 300;
      font-size: 14px;
    }

    .total {
      opacity: 0.3;
      font-size: 14px;
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

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(33, 52, 72, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  a {
    color: var(--slate);
    text-decoration: none;
    font-family: var(--font-heading);
    font-size: 18px;
    transition: color 0.3s ease;
    cursor: pointer;

    &:hover {
      color: var(--green);
    }

    &.active {
      color: var(--green);
    }
  }
`;

const sections = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'experience', name: 'Experience' },
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

  return (
    <NavigationContainer>
      <AnimatePresence>
        <SectionPinContainer
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          <SectionPinContent>
            <Logo
              src={logoSrc}
              alt="Edbert Ocampo Logo"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
              </NavLinks>
            )}
            {showSectionName && (
              <ScrollIndicatorContainer
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <ProgressRing progress={scrollProgress} viewBox="0 0 180 52">
                  <rect className="bg" x="2" y="2" width="176" height="48" />
                  <rect className="fg" x="2" y="2" width="176" height="48" />
                </ProgressRing>
                <IndicatorContent>
                  <span className="label">{currentSectionName}</span>
                  <div className="counter">
                    <div className="current">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={activeSection}
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -15, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        >
                          {String(sections.findIndex(s => s.id === activeSection) + 1).padStart(2, '0')}
                        </motion.span>
                      </AnimatePresence>
                    </div>
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
        </SectionPinContainer>
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenuOverlay
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <MobileNavLinks>
              {sections.map((section) => (
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
            </MobileNavLinks>
          </MobileMenuOverlay>
        )}
      </AnimatePresence>
    </NavigationContainer>
  );
};

export default UniversalNavigation;
