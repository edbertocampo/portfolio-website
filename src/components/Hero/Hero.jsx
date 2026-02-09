import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import BytesToText from '../common/BytesToText';

import { useState, useEffect } from 'react';

const TypewriterText = ({ startWrapper }) => {
  const roles = ["Professor.", "Web Developer.", "VA Freelancer."];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!startWrapper) return;

    // Initial delay to wait for splash screen curtain to finish (approx 1.2s total animation)
    // We add 1.5s to be safe and smooth
    if (!hasStarted) {
      const startTimer = setTimeout(() => setHasStarted(true), 1500);
      return () => clearTimeout(startTimer);
    }

    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setDisplayText(isDeleting
        ? fullText.substring(0, displayText.length - 1)
        : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 100 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000); // Pause at end
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pause before typing next
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, roles, typingSpeed, startWrapper, hasStarted]);

  return (
    <span style={{ color: 'var(--slate)', fontWeight: '600' }}>
      {displayText}
      <span className="cursor" style={{ color: 'var(--green)', animation: 'blink 1s step-end infinite' }}>|</span>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </span>
  );
};
const StyledHeroSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0 var(--section-padding-x);
  max-width: var(--section-max-width);
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 100px var(--section-padding-x) 60px;
    min-height: auto;
    display: block;
  }

  @media (max-width: 480px) {
    padding: 60px var(--section-padding-x) 30px;
  }

  @media (max-width: 360px) {
    padding: 60px var(--section-padding-x) 40px;
  }

  @media (max-width: 320px) {
    padding: 50px var(--section-padding-x) 30px;
  }
`;

const StyledGreeting = styled(motion.h1)`
  margin: 0 0 clamp(12px, 3vh, 24px) 0;
  color: var(--green);
  font-family: var(--font-heading);
  font-size: clamp(13px, 2vw, 16px);
  font-weight: 400;
  letter-spacing: 1px;

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: clamp(6px, 1.5vh, 12px);
  }
`;

const StyledName = styled(motion.h2)`
  margin: 0;
  font-size: clamp(40px, 8vw, 80px);
  color: var(--lightest-slate);
  line-height: 1.1;
  width: 100%;

  @media (max-width: 768px) {
    font-size: clamp(35px, 7vw, 70px);
  }

  @media (max-width: 480px) {
    font-size: clamp(30px, 6vw, 60px);
  }

  @media (max-width: 360px) {
    font-size: clamp(28px, 5.5vw, 50px);
  }
`;

const StyledSubtitle = styled(motion.h3)`
  margin-top: clamp(12px, 3vh, 20px);
  color: var(--slate);
  line-height: 1.2;
  font-size: clamp(26px, 5.5vw, 52px);
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: clamp(22px, 5vw, 45px);
    margin-top: clamp(10px, 2vh, 16px);
  }

  @media (max-width: 480px) {
    font-size: clamp(20px, 4.5vw, 38px);
    margin-top: 10px;
  }

  @media (max-width: 360px) {
    font-size: clamp(18px, 4vw, 32px);
  }
`;

const StyledDescription = styled(motion.p)`
  margin: clamp(15px, 3vw, 30px) 0 0;
  max-width: 1000px;
  color: var(--slate);
  font-size: clamp(14px, 2.3vw, 18px);
  line-height: 1.7;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  width: 100%;
  padding: 0 1px;

  & > span {
    display: block;
    white-space: normal;
    overflow-wrap: break-word;
    word-break: normal;
    width: 100%;
    hyphens: auto;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.6;
    gap: 8px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 1.5;
    gap: 6px;
    padding: 0;
    
    & > span {
      line-height: 1.6;
      hyphens: auto;
    }

    & > span:first-child {
      margin-bottom: 4px;
    }
  }

  @media (max-width: 375px) {
    font-size: 13px;
    line-height: 1.5;
    gap: 4px;
    
    & > span {
      overflow-wrap: break-word;
      word-break: break-word;
      hyphens: auto;
      line-height: 1.5;
    }
  }

  @media (max-width: 320px) {
    font-size: 12px;
    letter-spacing: -0.02em;
  }
`;

const StyledResumeButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: clamp(25px, 4vh, 40px);
  padding: clamp(10px, 2vh, 16px) clamp(18px, 3vw, 24px);
  border: 2px solid var(--green);
  border-radius: 4px;
  color: var(--green);
  font-family: var(--font-heading);
  font-size: clamp(13px, 2vw, 15px);
  text-decoration: none;
  gap: clamp(8px, 2vw, 12px);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  white-space: nowrap;
  min-height: 44px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg, 
      transparent, 
      rgba(100, 255, 218, 0.1), 
      transparent
    );
    transition: all 0.3s;
  }

  &:hover {
    background-color: var(--green-tint);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(100, 255, 218, 0.2);

    &::before {
      left: 100%;
    }

    svg {
      transform: translateY(-2px);
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  svg {
    transition: transform 0.3s ease;
    width: clamp(16px, 2.5vw, 20px);
    height: clamp(16px, 2.5vw, 20px);
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 13px;
    margin-top: clamp(15px, 2.5vh, 25px);
    min-height: 40px;
  }

  @media (max-width: 360px) {
    padding: 10px 14px;
    font-size: 12px;
    min-height: 38px;
  }
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Hero = ({ startTyping = true }) => {
  return (
    <StyledHeroSection>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <StyledGreeting variants={item}>
          <BytesToText text="Hi, my name is" delay={0} speed={15} />
        </StyledGreeting>
        <StyledName variants={item}>
          Edbert.
        </StyledName>
        <StyledSubtitle variants={item}>
          I'm a <TypewriterText startWrapper={startTyping} />
        </StyledSubtitle>

        {/* Removed long description for minimal look */}

        <StyledResumeButton
          href="/Ocampo Edbert Resume.pdf"
          download
          variants={item}
        >
          <FiDownload />
          Download Resume
        </StyledResumeButton>
      </motion.div>
    </StyledHeroSection>
  );
};

export default Hero;
