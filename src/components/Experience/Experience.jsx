import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCalendar } from 'react-icons/fi';

const StyledExperienceSection = styled.section`
  position: relative;
  width: 100%;
  max-width: var(--section-max-width);
  margin: 0 auto;
  /* Use scroll depth for sticky experience */
  height: 250vh; 
  padding: 0;
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 var(--section-padding-x);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0 15px;
  }

  .section-heading {
    margin-bottom: 25px;
    @media (max-width: 480px) {
      margin-bottom: 15px;
    }
  }
`;

const TabList = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  background: rgba(33, 52, 72, 0.4);
  padding: 6px;
  border-radius: 99px;
  border: 1px solid rgba(234, 224, 207, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 10;
`;

const TabButton = styled.button`
  position: relative;
  padding: 10px 24px;
  border-radius: 99px;
  border: none;
  background: transparent;
  color: ${props => props.active ? 'var(--navy)' : 'var(--slate)'};
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;
  white-space: nowrap;
  z-index: 1;

  &:hover {
    color: ${props => props.active ? 'var(--navy)' : 'var(--lightest-slate)'};
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 11px;
  }
`;

const ActivePill = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--green);
  border-radius: 99px;
  z-index: -1;
`;

const TimelineWindow = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 600px;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
`;

const TimelineContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  padding-left: 90px;
  padding-top: 40px;
  padding-bottom: 100px;

  @media (max-width: 480px) {
    padding-left: 70px;
  }

  &::before {
    content: '';
    position: absolute;
    left: 72px;
    top: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, var(--green) 0%, rgba(234, 224, 207, 0.1) 100%);
    border-radius: 1px;

    @media (max-width: 480px) {
      left: 52px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 30px;
  width: 100%;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineMarker = styled.div`
  position: absolute;
  left: -25px;
  top: 15px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--navy);
  border: 4px solid var(--green);
  z-index: 2;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
`;

const TimelineYear = styled.div`
  position: absolute;
  left: -105px;
  top: 13px;
  width: 65px;
  text-align: right;
  color: var(--lightest-slate);
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  opacity: 0.8;

  @media (max-width: 480px) {
    font-size: 12px;
    width: 45px;
    left: -80px;
  }
`;

const TimelineCard = styled.div`
  background: rgba(33, 52, 72, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(234, 224, 207, 0.1);
  border-radius: 16px;
  padding: clamp(20px, 4vw, 30px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1),
              inset 0 0 0 1px rgba(234, 224, 207, 0.05);
  transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background: rgba(33, 52, 72, 0.5);
    border-color: rgba(234, 224, 207, 0.2);
    transform: translateX(5px);
  }

  h3 {
    margin-bottom: 6px;
    font-size: clamp(16px, 3vw, 20px);
    color: var(--lightest-slate);
    
    .company {
      color: var(--green);
      font-size: 0.9em;
    }
  }

  .type-badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 99px;
    background: rgba(148, 180, 193, 0.1);
    color: var(--slate);
    font-size: 10px;
    font-family: var(--font-heading);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
    border: 1px solid rgba(148, 180, 193, 0.1);

    @media (max-width: 480px) {
      font-size: 9px;
      padding: 2px 8px;
    }
  }

  h3 {
    margin-bottom: 6px;
    font-size: clamp(16px, 3vw, 20px);
    color: var(--lightest-slate);
    
    @media (max-width: 480px) {
      font-size: 16px;
    }

    .company {
      color: var(--green);
      font-size: 0.9em;
      @media (max-width: 480px) {
        font-size: 0.85em;
      }
    }
  }

  .range {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(148, 180, 193, 0.05);
    padding: 6px 12px;
    border-radius: 8px;
    border-left: 3px solid var(--green);
    color: var(--light-slate);
    font-family: var(--font-heading);
    font-size: 12px;
    margin-bottom: 20px;
    font-weight: 500;
    
    @media (max-width: 480px) {
      font-size: 11px;
      padding: 5px 10px;
      margin-bottom: 15px;
    }

    svg {
      color: var(--green);
      font-size: 14px;
      @media (max-width: 480px) {
        font-size: 12px;
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      position: relative;
      padding-left: 18px;
      margin-bottom: 8px;
      line-height: 1.5;
      font-size: 14px;
      color: var(--slate);

      @media (max-width: 480px) {
        font-size: 13px;
        padding-left: 15px;
      }

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Strictly sequential tabs: Prof (0-0.4), Dead Zone (0.4-0.6), Acad (0.6-1)
  const activeTab = useTransform(scrollYProgress, [0, 0.48, 0.52, 1], ["Professional", "Professional", "Academic", "Academic"]);

  // Smoothly track state for styling the tab buttons
  const [currentTab, setCurrentTab] = useState("Professional");

  useEffect(() => {
    const unsubscribe = activeTab.onChange(v => setCurrentTab(v));
    return () => unsubscribe();
  }, [activeTab]);

  const journey = [
    {
      type: 'Professional',
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
      type: 'Professional',
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
      type: 'Professional',
      company: 'The Umonics Method',
      title: 'Assistant Project Manager Intern',
      range: 'Feb. 2023 - May 2023',
      duties: [
        'Assisted in project planning and coordination',
        'Supported team communication and project tracking',
        'Contributed to project documentation and reporting'
      ],
    },
    {
      type: 'Academic',
      company: 'Batangas State University',
      title: 'Master of Science in Data Science',
      range: 'Aug. 2024 - Present',
      duties: [
        'Pursuing advanced studies in Data Science',
        'Expanding expertise in advanced analytics and machine learning',
        'Conducting research in cutting-edge technological domains'
      ],
    },
    {
      type: 'Academic',
      company: 'Batangas State University',
      title: 'BS Information Technology (Business Analytics)',
      range: '2019 - 2023',
      duties: [
        'Graduated with a Bachelor of Science in Information Technology',
        'Specialized in Business Analytics',
        'Developed strong technical and analytical skills'
      ],
    }
  ];

  const professionalJourney = journey.filter(item => item.type === 'Professional');
  const academicJourney = journey.filter(item => item.type === 'Academic');

  // Strictly sequential movement with an initial "snap pause" for reading the first item
  const profTranslateY = useTransform(scrollYProgress, [0, 0.1, 0.45], [0, 0, -420]);
  const acadTranslateY = useTransform(scrollYProgress, [0.52, 0.65, 1], [0, 0, -220]);

  // Sequential opacity: Prof clears out fully before Acad enters
  const profOpacity = useTransform(scrollYProgress, [0, 0.42, 0.48], [1, 1, 0]);
  const acadOpacity = useTransform(scrollYProgress, [0.52, 0.58, 1], [0, 1, 1]);

  // Pointer events: only allow interaction when visible
  const profPointerEvents = useTransform(profOpacity, (o) => o > 0.5 ? 'auto' : 'none');
  const acadPointerEvents = useTransform(acadOpacity, (o) => o > 0.5 ? 'auto' : 'none');

  const scrollToTab = (type) => {
    if (!containerRef.current) return;
    // targetProgress points to the start of visibility for each category
    const targetProgress = type === 'Professional' ? 0.01 : 0.60;
    const rect = containerRef.current.getBoundingClientRect();
    const start = window.pageYOffset + rect.top;
    const end = window.pageYOffset + rect.bottom - window.innerHeight;
    window.scrollTo({
      top: start + (end - start) * targetProgress,
      behavior: 'smooth'
    });
  };

  return (
    <StyledExperienceSection ref={containerRef} id="experience">
      <StickyWrapper>
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          My Journey
        </motion.h2>

        <TabList>
          <TabButton
            active={currentTab === 'Professional'}
            onClick={() => scrollToTab('Professional')}
          >
            {currentTab === 'Professional' && (
              <ActivePill
                layoutId="experienceTab"
                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
              />
            )}
            Professional
          </TabButton>
          <TabButton
            active={currentTab === 'Academic'}
            onClick={() => scrollToTab('Academic')}
          >
            {currentTab === 'Academic' && (
              <ActivePill
                layoutId="experienceTab"
                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
              />
            )}
            Academic
          </TabButton>
        </TabList>

        <TimelineWindow>
          {/* Professional Timeline */}
          <TimelineContainer style={{
            y: profTranslateY,
            opacity: profOpacity,
            pointerEvents: profPointerEvents,
            position: 'absolute',
            top: 0,
            left: 0
          }}>
            {professionalJourney.map((item, i) => (
              <TimelineItem key={`prof-${i}`}>
                <TimelineYear>{item.range.match(/\d{4}/)?.[0] || ""}</TimelineYear>
                <TimelineMarker />
                <TimelineCard>
                  <span className="type-badge">{item.type}</span>
                  <h3>
                    {item.title} <span className="company">@ {item.company}</span>
                  </h3>
                  <span className="range">
                    <FiCalendar /> {item.range}
                  </span>
                  <ul>
                    {item.duties.map((duty, j) => (
                      <li key={j}>{duty}</li>
                    ))}
                  </ul>
                </TimelineCard>
              </TimelineItem>
            ))}
          </TimelineContainer>

          {/* Academic Timeline */}
          <TimelineContainer style={{
            y: acadTranslateY,
            opacity: acadOpacity,
            pointerEvents: acadPointerEvents,
            position: 'absolute',
            top: 0,
            left: 0
          }}>
            {academicJourney.map((item, i) => (
              <TimelineItem key={`acad-${i}`}>
                <TimelineYear>{item.range.match(/\d{4}/)?.[0] || ""}</TimelineYear>
                <TimelineMarker />
                <TimelineCard>
                  <span className="type-badge">{item.type}</span>
                  <h3>
                    {item.title} <span className="company">@ {item.company}</span>
                  </h3>
                  <span className="range">
                    <FiCalendar /> {item.range}
                  </span>
                  <ul>
                    {item.duties.map((duty, j) => (
                      <li key={j}>{duty}</li>
                    ))}
                  </ul>
                </TimelineCard>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </TimelineWindow>
      </StickyWrapper>
    </StyledExperienceSection>
  );
};

export default Experience;
