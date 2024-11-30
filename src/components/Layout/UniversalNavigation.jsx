import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const SectionPinContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 100%;
  background: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  padding: 10px clamp(20px, 5vw, 50px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 11;
`;

const SectionPinContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const SectionPinText = styled(motion.h2)`
  color: var(--green);
  font-family: 'Roboto Mono', monospace;
  font-size: clamp(14px, 2vw, 16px);
  margin: 0;
  text-align: left;
  text-transform: capitalize;
`;

const DesktopNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 10px clamp(20px, 5vw, 50px);
  background: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: clamp(20px, 3vw, 30px);

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #ccd6f6;
  text-decoration: none;
  font-family: 'Roboto Mono', monospace;
  font-size: clamp(12px, 1.5vw, 13px);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  
  &:hover {
    color: #64ffda;
  }
`;

const sections = [
  { id: 'home', name: '' },
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
  const observerRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsNavVisible(currentScrollY < 100 || currentScrollY < lastScrollY);
      
      const observerOptions = {
        root: null,
        rootMargin: '-50px 0px -50% 0px',
        threshold: [0.3, 0.5, 0.7]
      };

      const handleIntersect = (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
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

      setLastScrollY(currentScrollY);

      return () => {
        sections.forEach(section => {
          const element = observerRefs.current[section.id];
          if (element) observer.unobserve(element);
        });
      };
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentSectionName = sections.find(section => section.id === activeSection)?.name || '';

  return (
    <NavigationContainer>
      {/* Section Pin with Logo - Always visible when scrolling */}
      <AnimatePresence>
        {!isNavVisible && currentSectionName && (
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
              <SectionPinText>{currentSectionName}</SectionPinText>
            </SectionPinContent>
          </SectionPinContainer>
        )}
      </AnimatePresence>

      {/* Desktop Navigation - Only visible on desktop */}
      <AnimatePresence>
        {isNavVisible && (
          <DesktopNav
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <NavLinks>
              {sections.slice(1).map((section) => (
                <NavLink 
                  key={section.id} 
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.name}
                </NavLink>
              ))}
            </NavLinks>
          </DesktopNav>
        )}
      </AnimatePresence>
    </NavigationContainer>
  );
};

export default UniversalNavigation;
