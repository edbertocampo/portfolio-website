import React, { useRef, useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder, FiGrid, FiLayers } from 'react-icons/fi';
import BorderGlow from '../BorderGlow/BorderGlow';

const projectsList = [
  {
    title: 'Attendify',
    description: 'A Digital Solution for Hassle-Free Attendance',
    technologies: ['TypeScript', 'ReactJS', 'JavaScript', 'MUI', 'Firebase', 'MongoDB'],
    githubLink: 'https://github.com/edbertocampo/attendify',
    externalLink: 'https://attendify-edu.vercel.app/',
    color: '#64ffda'
  },
  {
    title: 'Task Mate Now',
    description: 'A modern to-do list application with an intuitive interface for task management.',
    technologies: ['HTML', 'TypeScript', 'JavaScript', 'Styled Components', 'Vercel'],
    githubLink: 'https://github.com/edbertocampo/to-do-list-2.0',
    externalLink: 'https://task-mate-now.vercel.app/',
    color: '#48bfe3'
  },
  {
    title: 'INGAT BATANGAS',
    description: 'Emergency response application to alert nearby emergency stations about life-threatening situations.',
    technologies: ['Laravel', 'ReactJS', 'Linode', 'NGINX', 'API', 'SQL'],
    githubLink: 'https://github.com/edbertocampo/INGATBATANGAS',
    externalLink: null,
    color: '#0096c7'
  },
  {
    title: 'XML Plants Catalog',
    description: 'A simple plant catalog using XML, HTML, and CSS, offering an easy-to-navigate display.',
    technologies: ['XML', 'HTML', 'CSS'],
    githubLink: 'https://github.com/edbertocampo/Plant-Info',
    externalLink: 'https://plant-catalog.vercel.app/',
    color: '#64ffda'
  },
  {
    title: 'PHP Web Development',
    description: 'Anime Records app for organizing and managing favorite anime with auth and database.',
    technologies: ['PHP', 'HTML', 'CSS', 'SQL'],
    githubLink: 'https://github.com/edbertocampo/animerecordsphp',
    externalLink: null,
    color: '#48bfe3'
  },
  {
    title: 'Face Recognition System',
    description: 'Attendance tracking system using Python Tkinter, adding/deleting employee data.',
    technologies: ['Python', 'Tkinter', 'Sqlite3'],
    githubLink: 'https://github.com/edbertocampo/Face-Recognition-Attendance_Python',
    externalLink: null,
    color: '#0096c7'
  }
];

const ProjectCard = ({ project }) => (
  <StyledProjectItem>
    <BorderGlow
      backgroundColor="rgba(30, 44, 58, 0.4)"
      borderRadius={20}
      glowColor="164 100 69"
      colors={['#64ffda', '#48bfe3', '#0096c7']}
      glowRadius={30}
      fillOpacity={0.1}
      coneSpread={10}
      glowIntensity={2}
      animated={true}
    >
      <div className="project-content">
        <StyledProjectHeader>
          <div className="folder-icon">
            <FiFolder />
          </div>
          <div className="project-links">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Link"
              >
                <FiGithub />
              </a>
            )}
            {project.externalLink && (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="External Link"
              >
                <FiExternalLink />
              </a>
            )}
          </div>
        </StyledProjectHeader>

        <StyledProjectTitle>{project.title}</StyledProjectTitle>
        <StyledProjectDescription>
          {project.description}
        </StyledProjectDescription>

        <StyledTechList>
          {project.technologies.map((tech, techIndex) => (
            <li key={techIndex}>{tech}</li>
          ))}
        </StyledTechList>
      </div>
    </BorderGlow>
  </StyledProjectItem>
);

const Projects = () => {
  const container = useRef(null);
  const [viewMode, setViewMode] = useState('stack'); // 'stack' (new) or 'grid'

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const handleModeToggle = (mode) => {
    if (mode === viewMode) return;
    if (mode === 'grid') {
      if (container.current) {
        const top = container.current.offsetTop;
        window.scrollTo({
          top: top - 20,
          behavior: 'smooth'
        });
      }
      setTimeout(() => setViewMode(mode), 300);
    } else {
      setViewMode(mode);
    }
  };

  return (
    <div
      ref={container}
      id="projects"
      style={{
        height: viewMode === 'stack' ? `${projectsList.length * 100}vh` : 'auto',
        position: 'relative'
      }}
    >
      <StickyWrapper isGrid={viewMode === 'grid'}>
        <HeaderContainer>
          <StyledSectionHeading>
            <h2>~/projects</h2>
            <div>Showcasing My Technical Journey</div>
          </StyledSectionHeading>

          <LayoutGroup id="projects-toggle">
            <TabList>
              <TabButton
                active={viewMode === 'stack'}
                onClick={() => handleModeToggle('stack')}
              >
                {viewMode === 'stack' && (
                  <ActivePill
                    layoutId="projectsTab"
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                  />
                )}
                <FiLayers style={{ marginRight: '8px' }} /> Stack
              </TabButton>
              <TabButton
                active={viewMode === 'grid'}
                onClick={() => handleModeToggle('grid')}
              >
                {viewMode === 'grid' && (
                  <ActivePill
                    layoutId="projectsTab"
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                  />
                )}
                <FiGrid style={{ marginRight: '8px' }} /> Grid
              </TabButton>
            </TabList>
          </LayoutGroup>
        </HeaderContainer>

        <ViewWrapper>
          <AnimatePresence mode="wait">
            {viewMode === 'stack' ? (
              <StackContainer key="stack">
                {projectsList.map((project, i) => (
                  <StackCard
                    key={i}
                    project={project}
                    index={i}
                    total={projectsList.length}
                    progress={scrollYProgress}
                  />
                ))}
              </StackContainer>
            ) : (
              <GridWrapper
                key="grid"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectGrid>
                  {projectsList.map((project, i) => (
                    <ProjectCard key={i} project={project} />
                  ))}
                </ProjectGrid>
              </GridWrapper>
            )}
          </AnimatePresence>
        </ViewWrapper>
      </StickyWrapper>

      {/* 
        ARCHIVED FLIP LOGIC (Preserved per request)
        If you want to use the flipping cards again, refer to original source or uncomment this section.
        The flipping logic used rotateX transformations mapped to scrollYProgress.
      */}
    </div>
  );
};

const StackCard = ({ project, index, total, progress }) => {
  const start = index / total;
  const end = (index + 1) / total;
  
  // Slide in and settle on top with a slight scale/dim effect for cards beneath
  const translateY = useTransform(progress, [start, start + 0.1], [600, 0]);
  const opacity = useTransform(progress, [start, start + 0.05], [0, 1]);
  const scale = useTransform(progress, [end, end + 0.1], [1, 0.9]);
  const brightness = useTransform(progress, [end, end + 0.1], [1, 0.5]);
  
  // Ensure only the current and previous cards are visible to save performance
  const visibility = useTransform(progress, (p) => {
    if (p < start - 0.1 || p > end + 0.2) return 'hidden';
    return 'visible';
  });

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '100%',
        maxWidth: '800px',
        height: '400px',
        y: translateY,
        opacity,
        scale,
        filter: `brightness(${brightness})`,
        visibility,
        zIndex: index,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ProjectCard project={project} />
    </motion.div>
  );
};

// Styled Components

const StickyWrapper = styled.div`
  position: ${props => props.isGrid ? 'relative' : 'sticky'};
  top: 0;
  height: ${props => props.isGrid ? 'auto' : '100vh'};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(30px, 6vh, 60px) var(--section-padding-x);
  overflow: ${props => props.isGrid ? 'visible' : 'hidden'};
`;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: var(--section-max-width);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: clamp(30px, 5vh, 50px);
  flex-shrink: 0;
  position: relative;
  z-index: 100;
`;

const ViewWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StackContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: flex-start;
`;

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  width: 100%;
  max-width: 1000px;
  padding-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const TabList = styled.div`
  display: flex;
  gap: 10px;
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
  display: flex;
  align-items: center;
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

const StyledSectionHeading = styled.div`
  position: relative;
  width: 100%;
  text-align: left;
  margin-bottom: 25px;

  h2 {
    display: flex;
    align-items: center;
    font-size: clamp(26px, 5vw, 32px);
    margin: 0 0 10px 0;
    white-space: nowrap;
    font-weight: 600;
    color: var(--lightest-slate);

    &::after {
      content: '';
      display: block;
      position: relative;
      width: 300px;
      max-width: 100%;
      height: 1px;
      margin-left: 20px;
      background-color: var(--lightest-navy);
      flex-shrink: 1;

      @media (max-width: 768px) {
        max-width: 200px;
      }
    }
  }

  div {
    color: var(--slate);
    font-family: var(--font-heading);
    font-size: clamp(12px, 1.8vw, 14px);
  }
`;

const StyledProjectItem = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .border-glow-card {
    height: 100%;
  }

  .project-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding: 40px;

    @media (max-width: 768px) {
      padding: 30px;
    }
    
    @media (max-width: 480px) {
      padding: 20px;
    }
  }
`;

const StyledProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  .folder-icon {
    color: var(--slate);
    transition: all 0.4s ease;
    svg {
      width: 40px;
      height: 40px;
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    gap: 20px;

    a {
      color: var(--slate);
      transition: all 0.25s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        color: var(--green);
      }

      svg {
        width: 22px;
        height: 22px;
      }
    }
  }
`;

const StyledProjectTitle = styled.h3`
  color: var(--lightest-slate);
  font-size: clamp(24px, 5vw, 28px);
  margin-bottom: 20px;
  margin-top: 0;
  font-weight: 700;
  line-height: 1.1;
`;

const StyledProjectDescription = styled.p`
  color: var(--slate);
  margin-bottom: 20px;
  line-height: 1.6;
  font-size: 16px;
  flex-grow: 1;
`;

const StyledTechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: auto;
  padding: 0;
  list-style: none;

  li {
    background: rgba(148, 180, 193, 0.05);
    color: var(--slate);
    padding: 6px 14px;
    border-radius: 12px;
    font-size: 11px;
    font-family: var(--font-heading);
    border: 1px solid rgba(148, 180, 193, 0.1);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    cursor: default;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    
    &:hover {
      background: rgba(100, 255, 218, 0.08);
      color: var(--green);
      border-color: rgba(100, 255, 218, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px -5px rgba(100, 255, 218, 0.2);
    }
  }
`;

export default Projects;
