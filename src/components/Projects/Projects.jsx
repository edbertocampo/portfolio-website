import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder, FiGrid, FiLayers } from 'react-icons/fi';

const projectsList = [
  {
    title: 'Attendify',
    description: 'A Digital Solution for Hassle-Free Attendance',
    technologies: ['TypeScript', 'ReactJS', 'JavaScript', 'MUI', 'Firebase', 'MongoDB'],
    githubLink: 'https://github.com/edbertocampo/attendify',
    externalLink: 'https://attendify-edu.vercel.app/'
  },
  {
    title: 'Task Mate Now',
    description: 'A modern to-do list application with an intuitive interface for task management.',
    technologies: ['HTML', 'TypeScript', 'JavaScript', 'Styled Components', 'Vercel'],
    githubLink: 'https://github.com/edbertocampo/to-do-list-2.0',
    externalLink: 'https://task-mate-now.vercel.app/'
  },
  {
    title: 'INGAT BATANGAS',
    description: 'Emergency response application to alert nearby emergency stations about life-threatening situations.',
    technologies: ['Laravel', 'ReactJS', 'Linode', 'NGINX', 'API', 'SQL'],
    githubLink: 'https://github.com/edbertocampo/INGATBATANGAS',
    externalLink: null
  },
  {
    title: 'XML Plants Catalog',
    description: 'A simple plant catalog using XML, HTML, and CSS, offering an easy-to-navigate display.',
    technologies: ['XML', 'HTML', 'CSS'],
    githubLink: 'https://github.com/edbertocampo/Plant-Info',
    externalLink: 'https://plant-catalog.vercel.app/'
  },
  {
    title: 'PHP Web Development',
    description: 'Anime Records app for organizing and managing favorite anime with auth and database.',
    technologies: ['PHP', 'HTML', 'CSS', 'SQL'],
    githubLink: 'https://github.com/edbertocampo/animerecordsphp',
    externalLink: null
  },
  {
    title: 'Face Recognition System',
    description: 'Attendance tracking system using Python Tkinter, adding/deleting employee data.',
    technologies: ['Python', 'Tkinter', 'Sqlite3'],
    githubLink: 'https://github.com/edbertocampo/Face-Recognition-Attendance_Python',
    externalLink: null
  }
];

const ProjectCard = ({ project }) => (
  <StyledProjectItem>
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
  </StyledProjectItem>
);

const Projects = () => {
  const container = useRef(null);
  const [viewMode, setViewMode] = useState('deck'); // 'deck' or 'grid'
  const [exitRotation, setExitRotation] = useState(0);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const totalRotation = (projectsList.length - 1) * 180;
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, totalRotation]);

  const translateZ = useTransform(rotateX, (angle) => {
    const segmentProgress = angle % 180;
    const pullAmount = Math.sin((segmentProgress * Math.PI) / 180) * 100;
    return pullAmount;
  });

  const projectOpacities = projectsList.map((_, i) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(rotateX, (angle) => {
      const currentSegment = Math.floor(angle / 180);
      const segmentProgress = angle % 180;

      if (currentSegment === i) {
        if (segmentProgress > 85) return 0;
        return 1;
      } else if (currentSegment === i - 1) {
        if (segmentProgress > 95) return 1;
        return 0;
      }

      return 0;
    });
  });

  const projectPointerEvents = projectOpacities.map(opacity =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(opacity, (o) => o > 0.5 ? 'auto' : 'none')
  );

  const handleModeToggle = (mode) => {
    if (mode === viewMode) return;

    // Capture current rotation to prevent spin-back during exit
    setExitRotation(rotateX.get());

    if (mode === 'grid') {
      // Smoothly scroll to top of section before switching
      if (container.current) {
        const top = container.current.offsetTop;
        window.scrollTo({
          top: top - 20,
          behavior: 'smooth'
        });
      }

      // Delay switch to allow scroll to start and exit animation to be clean
      setTimeout(() => {
        setViewMode(mode);
      }, 300);
    } else {
      setViewMode(mode);
    }
  };

  return (
    <div
      ref={container}
      id="projects"
      style={{
        height: viewMode === 'deck' ? `${projectsList.length * 100}vh` : 'auto',
        position: 'relative'
      }}
    >
      <StickyWrapper isGrid={viewMode === 'grid'}>
        <HeaderContainer>
          <StyledSectionHeading>
            <h2>My Projects</h2>
            <div>Showcasing My Technical Journey</div>
          </StyledSectionHeading>

          <LayoutGroup id="projects-toggle">
            <TabList>
              <TabButton
                active={viewMode === 'deck'}
                onClick={() => handleModeToggle('deck')}
              >
                {viewMode === 'deck' && (
                  <ActivePill
                    layoutId="projectsTab"
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                  />
                )}
                <FiLayers style={{ marginRight: '8px' }} /> Card
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
            {viewMode === 'deck' ? (
              <DeckContainer
                key="deck"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Use frozen rotation on exit to prevent "unflipping" */}
                <FlipCard style={{ rotateX: viewMode === 'deck' ? rotateX : exitRotation, translateZ }}>
                  {projectsList.map((project, i) => {
                    const isBack = i % 2 === 1;
                    return (
                      <ProjectContainer
                        key={i}
                        style={{
                          opacity: projectOpacities[i],
                          rotateX: 0,
                          rotateY: isBack ? 180 : 0,
                          rotateZ: isBack ? 180 : 0,
                          pointerEvents: projectPointerEvents[i]
                        }}
                      >
                        <ProjectCard project={project} />
                      </ProjectContainer>
                    );
                  })}
                </FlipCard>
              </DeckContainer>
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
    </div>
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
  padding: clamp(60px, 10vh, 100px) var(--section-padding-x);
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
`;

const ViewWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const DeckContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 2000px;

  @media (max-width: 768px) {
    height: 350px;
  }
`;

const GridWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: flex-start;
`;

const FlipCard = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
`;

const ProjectContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  transform-style: preserve-3d;
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

      @media (max-width: 480px) {
        margin-left: 10px;
        max-width: 100px;
        flex: 1;
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
  background: rgba(33, 52, 72, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(234, 224, 207, 0.1);
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1),
              inset 0 0 0 1px rgba(234, 224, 207, 0.05);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(33, 52, 72, 0.5);
    border-color: rgba(234, 224, 207, 0.2);
    transform: translateY(-2px);
  }

  .project-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const StyledProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  .folder-icon {
    color: var(--green);
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
    color: var(--lightest-slate);
    font-size: 11px;
    font-family: var(--font-heading);
    background-color: rgba(148, 180, 193, 0.15);
    padding: 6px 14px;
    border-radius: 99px;
    border: 1px solid rgba(148, 180, 193, 0.1);
    letter-spacing: 0.5px;
    text-transform: uppercase;
    
    &:hover {
      background-color: rgba(148, 180, 193, 0.25);
      border-color: rgba(148, 180, 193, 0.3);
    }
  }
`;

export default Projects;
