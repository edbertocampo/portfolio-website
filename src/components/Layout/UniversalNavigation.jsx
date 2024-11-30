import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

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
  background: rgba(10, 25, 47, 0.85);
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
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
  }
`;

const SectionPinText = styled(motion.h2)`
  color: var(--green);
  font-family: 'Roboto Mono', monospace;
  font-size: clamp(14px, 2vw, 16px);
  margin: 0;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const NavLinks = styled.div`
  display: flex;
  gap: clamp(20px, 4vw, 40px);
  align-items: center;
  margin-left: auto;

  a {
    color: var(--slate);
    text-decoration: none;
    font-family: 'Roboto Mono', monospace;
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
  const [showSectionName, setShowSectionName] = useState(false);
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
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setShowSectionName(currentScrollY > 100);
      
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
              </NavLinks>
            )}
            <SectionPinText show={showSectionName}>{currentSectionName}</SectionPinText>
          </SectionPinContent>
        </SectionPinContainer>
      </AnimatePresence>
    </NavigationContainer>
  );
};

export default UniversalNavigation;
