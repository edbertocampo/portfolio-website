import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledAboutSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  width: 100%;
  margin-bottom: 10px;
  padding: 50px clamp(15px, 5vw, 50px);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: clamp(20px, 4vw, 30px);
    width: 100%;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column-reverse;
      gap: 20px;
      padding: 0 10px;
    }
  }

  .section-heading {
    font-size: clamp(24px, 5vw, 32px);
    margin-bottom: clamp(20px, 4vw, 40px);
    text-align: center;

    @media (max-width: 480px) {
      text-align: left;
    }
  }
`;

const StyledText = styled.div`
  p {
    font-size: clamp(14px, 1.8vw, 16px);
    line-height: 1.6;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin-bottom: clamp(10px, 2vw, 15px);
  }

  .skills-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .skill-category {
    margin-bottom: 20px;

    h3 {
      color: var(--green);
      font-family: 'Roboto Mono', monospace;
      font-size: clamp(14px, 1.6vw, 16px);
      margin-bottom: 10px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        position: relative;
        padding-left: 20px;
        margin-bottom: 8px;
        font-family: 'Roboto Mono', monospace;
        font-size: clamp(12px, 1.4vw, 14px);
        color: var(--slate);

        &:before {
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--green);
          font-size: clamp(12px, 1.4vw, 14px);
          line-height: 12px;
        }
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;
  width: 100%;
  margin: 50px auto 0;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  @media (max-width: 1024px) {
    max-width: 300px;
    margin: 30px auto;
  }

  @media (max-width: 768px) {
    max-width: 60%;
    margin: 20px auto;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 100%;
      height: auto;
      filter: grayscale(30%);

      &:hover {
        filter: none;
      }
    }
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

const About = () => {
  const skills = [
    { category: 'Web Development', skills: ['HTML', 'CSS', 'JavaScript', 'React JS'] },
    { category: 'Programming', skills: ['Python', 'PHP', 'SQL'] },
    { category: 'Tools', skills: ['GIT'] },
    { category: 'QA & Testing', skills: ['Manual Testing'] },
    { category: 'Business & Design', skills: [
      'Business Analytics', 
      'UI/UX Design', 
      'Graphics Design'
    ]},
    { category: 'Soft Skills', skills: [
      'Attention to Details', 
      'Organizational Skills'
    ]}
  ];

  return (
    <StyledAboutSection id="about">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.h2 variants={item} className="section-heading">
          About Me
        </motion.h2>
        <div className="inner">
          <StyledText>
            <motion.div variants={item}>
              <p>
                I'm Edbert Ocampo, a passionate professional bridging technology 
                and business through innovative digital solutions.
              </p>
              <p style={{ marginTop: '15px' }}>
                As a technology professional and Professor, I blend technology and business to create 
                innovative digital solutions across web development, QA, and freelance services.
              </p>
              <p style={{ marginTop: '15px' }}>
                My professional toolkit showcases versatility in transforming complex 
                challenges into elegant, user-centric experiences:
              </p>
              <div className="skills-container">
                <div>
                  <div className="skill-category">
                    <h3>Web Development</h3>
                    <ul>
                      <li>HTML</li>
                      <li>CSS</li>
                      <li>JavaScript</li>
                      <li>React JS</li>
                    </ul>
                  </div>
                  <div className="skill-category">
                    <h3>Programming</h3>
                    <ul>
                      <li>Python</li>
                      <li>PHP</li>
                      <li>SQL</li>
                    </ul>
                  </div>
                  <div className="skill-category">
                    <h3>Tools</h3>
                    <ul>
                      <li>GIT</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="skill-category">
                    <h3>QA & Testing</h3>
                    <ul>
                      <li>Manual Testing</li>
                    </ul>
                  </div>
                  <div className="skill-category">
                    <h3>Business & Design</h3>
                    <ul>
                      <li>Business Analytics</li>
                      <li>UI/UX Design</li>
                      <li>Graphics Design</li>
                    </ul>
                  </div>
                  <div className="skill-category">
                    <h3>Soft Skills</h3>
                    <ul>
                      <li>Attention to Details</li>
                      <li>Organizational Skills</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </StyledText>

          <StyledPic>
            <motion.div variants={item} className="wrapper">
              <img
                className="img"
                src="/me.jpg"
                alt="Headshot"
                width="100%"
                height="auto"
              />
            </motion.div>
          </StyledPic>
        </div>
      </motion.div>
    </StyledAboutSection>
  );
};

export default About;
