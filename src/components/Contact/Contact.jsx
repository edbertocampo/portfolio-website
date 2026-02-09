import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiClock } from 'react-icons/fi';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto;
  padding: 100px var(--section-padding-x);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  @media (max-width: 768px) {
    padding: 80px var(--section-padding-x);
  }

  @media (max-width: 480px) {
    padding: 40px var(--section-padding-x);
  }
`;

const StyledOverline = styled(motion.span)`
  display: block;
  margin-bottom: clamp(15px, 3vh, 25px);
  color: var(--green);
  font-family: var(--font-heading);
  font-size: clamp(12px, 2vw, 16px);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: clamp(12px, 2vh, 18px);
  }
`;

const StyledTitle = styled(motion.h2)`
  font-size: clamp(32px, 8vw, 65px);
  font-weight: 700;
  margin: 0 0 clamp(15px, 3vh, 30px) 0;
  color: var(--lightest-slate);
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: clamp(28px, 6vw, 50px);
    margin-bottom: clamp(12px, 2vh, 20px);
  }

  @media (max-width: 480px) {
    font-size: clamp(26px, 5vw, 40px);
    margin-bottom: 10px;
  }
`;

const StyledDescription = styled(motion.p)`
  margin: 0 0 clamp(25px, 4vh, 40px) 0;
  font-size: clamp(15px, 2.2vw, 18px);
  line-height: 1.7;
  color: var(--slate);
  max-width: 600px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: clamp(14px, 2vw, 16px);
    line-height: 1.6;
    margin-bottom: clamp(20px, 3vh, 30px);
  }

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: clamp(15px, 2vh, 25px);
  }
`;

const StyledButton = styled(motion.a)`
  display: inline-block;
  padding: clamp(12px, 2vh, 20px) clamp(20px, 3vw, 28px);
  background-color: transparent;
  border: 2px solid var(--green);
  border-radius: 4px;
  font-size: clamp(13px, 2vw, 16px);
  font-family: var(--font-heading);
  line-height: 1;
  text-decoration: none;
  color: var(--green);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  margin-bottom: clamp(30px, 5vh, 50px);
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover,
  &:focus {
    background-color: var(--green-tint);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(234, 224, 207, 0.2);
    outline: none;
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: clamp(10px, 1.5vh, 16px) clamp(16px, 2.5vw, 24px);
    font-size: clamp(12px, 1.8vw, 14px);
    margin-bottom: clamp(25px, 4vh, 40px);
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 13px;
    margin-bottom: 20px;
    min-height: 40px;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(20px, 5vw, 30px);
  margin-bottom: clamp(40px, 8vh, 60px);

  a {
    color: var(--lightest-slate);
    font-size: clamp(20px, 4vw, 28px);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;

    &:hover {
      color: var(--green);
      transform: translateY(-4px);
    }

    &:active {
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      font-size: clamp(18px, 3.5vw, 24px);
    }

    @media (max-width: 480px) {
      font-size: 20px;
      min-width: 40px;
      min-height: 40px;
      gap: clamp(15px, 3vw, 20px);
    }
  }
`;

const ResumeLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: clamp(12px, 2vh, 18px) clamp(20px, 3vw, 28px);
  border: 2px solid var(--green);
  border-radius: 4px;
  color: var(--green);
  font-family: var(--font-heading);
  font-size: clamp(13px, 2vw, 16px);
  text-decoration: none;
  gap: clamp(8px, 1.5vw, 12px);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  min-height: 44px;
  white-space: nowrap;

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
      rgba(234, 224, 207, 0.1), 
      transparent
    );
    transition: all 0.3s;
  }

  &:hover {
    background-color: var(--green-tint);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(234, 224, 207, 0.2);

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

  @media (max-width: 768px) {
    padding: clamp(10px, 1.5vh, 16px) clamp(16px, 2.5vw, 24px);
    font-size: clamp(12px, 1.8vw, 14px);
    min-height: 40px;
  }

  @media (max-width: 480px) {
    padding: 10px 14px;
    font-size: 12px;
    min-height: 38px;
  }
`;

const TimeBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: rgba(33, 52, 72, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 180, 193, 0.1);
  border-radius: 99px;
  margin-bottom: 25px;
  font-family: var(--font-heading);
  font-size: 13px;
  color: var(--light-slate);

  span {
    color: var(--green);
    font-weight: 600;
  }

  .dot {
    width: 8px;
    height: 8px;
    background-color: var(--green);
    border-radius: 50%;
    display: inline-block;
    box-shadow: 0 0 8px var(--green);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 1px solid var(--green);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(2.5); opacity: 0; }
  }

  @media (max-width: 480px) {
    font-size: 11px;
    padding: 6px 12px;
  }
`;

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Contact = () => {
  const [phTime, setPhTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setPhTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StyledContactSection id="contact">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <TimeBadge variants={item}>
          <div className="dot"></div>
          Local Time (PH): <span>{phTime}</span>
        </TimeBadge>
        <StyledOverline variants={item}>
          What's Next?
        </StyledOverline>

        <StyledTitle variants={item}>
          Get In Touch
        </StyledTitle>

        <StyledDescription variants={item}>
          Reach out, and let's make something extraordinary together.
        </StyledDescription>

        <StyledButton
          href="mailto:edbert.ocampo123@gmail.com"
          variants={item}
        >
          Say Hello
        </StyledButton>

        <SocialLinks variants={item}>
          <a
            href="https://github.com/edbertocampo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/edbert-ocampo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
          <a
            href="mailto:edbert.ocampo123@gmail.com"
            aria-label="Email"
          >
            <FiMail />
          </a>
        </SocialLinks>

        <ResumeLink
          href="/Ocampo Edbert(Resume).pdf"
          download
          variants={item}
        >
          Download My Resume <FiDownload />
        </ResumeLink>
      </motion.div>
    </StyledContactSection>
  );
};

export default Contact;
