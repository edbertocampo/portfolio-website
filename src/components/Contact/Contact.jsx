import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin-left: auto;
  margin-bottom: 150px;
  padding: 40px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  @media (max-width: 768px) {
    padding: 30px 0;
    margin-left: auto;
    margin-bottom: 100px;
  }

  @media (max-width: 480px) {
    padding: 20px 0;
    margin-left: auto;
    margin-bottom: 100px;
  }
`;

const StyledOverline = styled(motion.span)`
  display: block;
  margin-bottom: 20px;
  color: var(--green);
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const StyledTitle = styled(motion.h2)`
  font-size: clamp(40px, 5vw, 60px);
  font-weight: 600;
  margin: 0 0 20px;
  color: var(--lightest-slate);
  line-height: 1.1;
`;

const StyledDescription = styled(motion.p)`
  margin: 0 0 30px;
  font-size: 18px;
  line-height: 1.5;
  color: var(--slate);
  max-width: 500px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 10px;
    max-width: 90%;
  }
`;

const StyledButton = styled(motion.a)`
  display: inline-block;
  padding: 1.25rem 1.75rem;
  background-color: transparent;
  border: 1px solid var(--green);
  border-radius: 4px;
  font-size: 16px;
  font-family: 'Roboto Mono', monospace;
  line-height: 1;
  text-decoration: none;
  color: var(--green);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  margin-bottom: 40px;

  &:hover,
  &:focus {
    background-color: var(--green-tint);
    outline: none;
  }

  @media (max-width: 480px) {
    padding: 1rem 1.25rem;
    font-size: 14px;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;

  a {
    color: var(--lightest-slate);
    font-size: 24px;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover {
      color: var(--green);
      transform: translateY(-4px);
    }

    @media (max-width: 480px) {
      font-size: 20px;
    }
  }
`;

const ResumeLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding: 1rem 1.5rem;
  border: 1px solid var(--green);
  border-radius: 4px;
  color: var(--green);
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
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
  return (
    <StyledContactSection id="contact">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
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
