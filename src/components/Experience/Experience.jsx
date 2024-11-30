import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledExperienceSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 50px clamp(20px, 5vw, 50px);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  .inner {
    display: flex;
    width: 100%;
    gap: clamp(20px, 4vw, 30px);
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    @media (max-width: 600px) {
      flex-direction: column;
      gap: 20px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: 100%;
    padding: 0;
    margin-bottom: 15px;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledTabButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: transparent;
  height: 45px;
  padding: 0 20px;
  border: none;
  border-left: 2px solid var(--lightest-navy);
  text-align: left;
  white-space: nowrap;
  color: ${props => props.active ? 'var(--green)' : 'var(--slate)'};
  font-family: 'Roboto Mono', monospace;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    background-color: var(--light-navy);
    color: var(--green);
  }

  @media (max-width: 600px) {
    padding: 0 10px;
    font-size: 12px;
  }
`;

const StyledHighlight = styled(motion.div)`
  position: absolute;
  z-index: 10;
  left: 0;
  width: 2px;
  height: 45px;
  background: var(--green);
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 2.1);
  top: ${props => props.activeTabId * 45}px;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    height: 2px;
    left: ${props => props.activeTabId * 25}%;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: clamp(10px, 3vw, 15px);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 8px 5px;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: clamp(13px, 1.8vw, 14px);
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    li {
      position: relative;
      padding-left: clamp(18px, 3vw, 25px);
      margin-bottom: 8px;
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
      }
    }
  }

  h3 {
    margin-bottom: 4px;
    font-size: clamp(16px, 2.8vw, 20px);
    font-weight: 500;
    line-height: 1.3;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    .company {
      color: var(--green);
    }
  }

  .range {
    margin-bottom: 20px;
    color: var(--light-slate);
    font-family: 'Roboto Mono', monospace;
    font-size: clamp(12px, 1.4vw, 13px);
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
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

const Experience = () => {
  const [activeTabId, setActiveTabId] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const experienceSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const sectionTop = experienceSectionRef.current?.offsetTop || 0;
      const sectionHeight = experienceSectionRef.current?.offsetHeight || 0;
      const windowHeight = window.innerHeight;

      // More conservative scroll tracking
      const scrollThreshold = 100; // Pixels of scroll needed to trigger tab change
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);

      // Check if the scroll is within the Experience section with more buffer
      if (
        currentScrollY >= sectionTop - windowHeight / 3 && 
        currentScrollY <= sectionTop + sectionHeight + windowHeight / 3 &&
        scrollDelta > scrollThreshold
      ) {
        // Determine scroll direction with more conservative logic
        if (currentScrollY > lastScrollY + scrollThreshold) {
          // Scrolling down
          setActiveTabId(prevTab => 
            prevTab < experiences.length - 1 ? prevTab + 1 : prevTab
          );
        } else if (currentScrollY < lastScrollY - scrollThreshold) {
          // Scrolling up
          setActiveTabId(prevTab => 
            prevTab > 0 ? prevTab - 1 : prevTab
          );
        }
      }

      // Always update last scroll position
      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const workExperience = [
    {
      company: 'College of Informatics and Computing Sciences - Batangas State University',
      title: 'Lecturer I',
      range: 'Aug. 2024 - Present',
      duties: [
        'Delivering comprehensive lectures in Information Technology and Computing',
        'Developing curriculum and educational materials',
        'Mentoring and guiding students in their academic and professional growth'
      ],
    },
    {
      company: 'Center for Technopreneurship and Innovation',
      title: 'Computer Programmer I',
      range: 'Apr. 2024 - June 2024',
      duties: [
        'Developing innovative technological solutions',
        'Collaborating with interdisciplinary teams',
        'Contributing to technological research and development projects'
      ],
    },
    {
      company: 'The Umonics Method',
      title: 'Assistant Project Manager Intern',
      range: 'Feb. 2023 - May 2023',
      duties: [
        'Assisted in project planning and coordination',
        'Supported team communication and project tracking',
        'Contributed to project documentation and reporting'
      ],
    }
  ];

  const academicBackground = [
    {
      institution: 'Batangas State University - College of Informatics and Computing Sciences',
      degree: 'Master of Science in Data Science',
      range: 'Aug. 2024 - Present',
      details: [
        'Pursuing advanced studies in Data Science',
        'Expanding expertise in advanced analytics and machine learning',
        'Conducting research in cutting-edge technological domains'
      ],
    },
    {
      institution: 'Batangas State University - College of Informatics and Computing Sciences',
      degree: 'BS Information Technology (Business Analytics)',
      range: '2019 - 2023',
      details: [
        'Graduated with a Bachelor of Science in Information Technology',
        'Specialized in Business Analytics',
        'Developed strong technical and analytical skills'
      ],
    }
  ];

  const [experiences, setExperiences] = useState([
    { name: 'Work Experience', data: workExperience },
    { name: 'Academic Background', data: academicBackground }
  ]);

  return (
    <StyledExperienceSection ref={experienceSectionRef} id="experience">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.h2 variants={item} className="section-heading">
          My Journey
        </motion.h2>
        <div className="inner">
          <StyledTabList role="tablist">
            {experiences.map((exp, i) => (
              <StyledTabButton
                key={i}
                onClick={() => setActiveTabId(i)}
                active={activeTabId === i}
                aria-selected={activeTabId === i}
              >
                {exp.name}
              </StyledTabButton>
            ))}
            <StyledHighlight activeTabId={activeTabId} />
          </StyledTabList>

          <StyledTabPanels>
            {experiences[activeTabId].data.map((job, i) => (
              <StyledTabPanel key={i}>
                <h3>
                  {job.title} <span className="company">@ {job.company || job.institution}</span>
                </h3>
                <p className="range">{job.range}</p>
                <ul>
                  {(job.duties || job.details).map((duty, j) => (
                    <li key={j}>{duty}</li>
                  ))}
                </ul>
              </StyledTabPanel>
            ))}
          </StyledTabPanels>
        </div>
      </motion.div>
    </StyledExperienceSection>
  );
};

export default Experience;
