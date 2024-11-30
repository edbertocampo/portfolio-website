import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import LogoImage from '../../assets/EO_Logo.svg';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0 clamp(20px, 5vw, 50px);
  background: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  z-index: 11;
  height: clamp(60px, 10vh, 70px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: clamp(20px, 3vw, 30px);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  
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

const Logo = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const HamburgerButton = styled.button`
  display: none;
`;

const MobileMenu = styled(motion.div)`
  display: none;
`;

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible]);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    const offset = 80; // Height of the navbar plus some padding
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <StyledHeader style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}>
      <Logo 
        src={LogoImage} 
        alt="Edbert Ocampo Logo" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
      />
      <Nav>
        {['About', 'Experience', 'Projects', 'Contact'].map((section) => (
          <NavLink 
            key={section.toLowerCase()} 
            onClick={(e) => handleScroll(e, section.toLowerCase())}
          >
            {section}
          </NavLink>
        ))}
      </Nav>
    </StyledHeader>
  );
};

export default Navbar;
