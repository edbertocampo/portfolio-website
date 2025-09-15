import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import BytesToText from '../common/BytesToText';


const StyledHeroSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  white-space: pre-wrap;
  padding: 0 clamp(20px, 5vw, 50px);
  max-width: 1000px;
  margin-top: 184px;
  margin-bottom: 80px;
  width: 100%;
`;

const StyledGreeting = styled(motion.h1)`
  margin: 0 0 clamp(10px, 3vw, 20px) 0;
  color: var(--green);
  font-family: 'Roboto Mono', monospace;
  font-size: clamp(14px, 2.5vw, 16px);
  font-weight: 400;
`;

const StyledName = styled(motion.h2)`
  margin: 0;
  font-size: clamp(32px, 7vw, 72px);
  color: var(--lightest-slate);
  line-height: 1.1;
`;

const StyledSubtitle = styled(motion.h3)`
  margin-top: clamp(10px, 2vw, 15px);
  color: var(--slate);
  line-height: 1.1;
  font-size: clamp(28px, 6vw, 64px);
`;

const StyledDescription = styled(motion.p)`
  margin: clamp(15px, 3vw, 30px) 0 0;
  max-width: 540px;
  color: var(--slate);
  font-size: clamp(15px, 2.3vw, 18px);
  line-height: 1.5;
  word-spacing: 2px;
  text-align: left;

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const StyledResumeButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: clamp(20px, 3vw, 30px);
  padding: 1rem 1.5rem;
  border: 1px solid var(--green);
  border-radius: 4px;
  color: var(--green);
  font-family: 'Roboto Mono', monospace;
  font-size: clamp(14px, 2.5vw, 16px);
  text-decoration: none;
  gap: 10px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

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
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 30px -10px rgba(2,12,27,0.2);

    &::before {
      left: 100%;
    }
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1.25rem;
    font-size: 14px;
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

const Hero = () => {
  return (
    <StyledHeroSection>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <StyledGreeting variants={item}>
          <BytesToText text="Hi, my name is " delay={0} speed={20} />
        </StyledGreeting>
        <StyledName variants={item}>
          <BytesToText text="Edbert." delay={800} speed={20} />
        </StyledName>
        <StyledSubtitle variants={item}>
          <BytesToText text="I build things for the web." delay={1400} speed={20} />
        </StyledSubtitle>
        <StyledDescription variants={item}>
          <BytesToText 
            text="Aspiring QA Engineer / Web Developer / VA Freelancer / Professor passionate about delivering high-quality digital solutions and ensuring exceptional user experiences."
            delay={2000}
            speed={20}
          />
        </StyledDescription>

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
