import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';

const Projects = () => {
  const projectsList = [
    {
      title: 'Task Mate Now',
      description: 'A modern to-do list application with an intuitive interface for task management.',
      technologies: ['HTML', 'TypeScript', 'JavaScript' ,'Styled Components', 'Vercel'],
      githubLink: 'https://github.com/edbertocampo/to-do-list-2.0',
      externalLink: 'https://task-mate-now.vercel.app/'
    },
    {
      title: 'INGAT BATANGAS: City Emergency Response Application with Incident Management System',
      description: 'Emergency response application to alert nearby emergency stations about life-threatening situations.',
      technologies: ['Laravel', 'ReactJS', 'Linode Object Storage', 'NGINX' , 'API', 'SQL'],
      githubLink: 'https://github.com/edbertocampo/INGATBATANGAS',
      externalLink: null
    },
    {
      title: 'XML Plants Catalog',
      description: 'A simple plant catalog using XML, HTML, and CSS, offering an easy-to-navigate display of various plants.',
      technologies: ['XML', 'HTML', 'CSS'],
      githubLink: 'https://github.com/edbertocampo/Plant-Info',
      externalLink: 'https://plant-catalog.vercel.app/'
    },
    {
      title: 'PHP Web Development',
      description: 'Anime Records app for organizing and managing favorite anime, with user authentication and searchable database.',
      technologies: ['PHP', 'HTML', 'CSS', 'SQL'],
      githubLink: 'https://github.com/edbertocampo/animerecordsphp',
      externalLink: null
    },
    {
      title: 'Python Face Recognition System',
      description: 'Face Recognition System using Tkinter for attendance tracking, with features for adding, updating, and deleting employee data.',
      technologies: ['Python', 'Tkinter', 'Sqlite3'],
      githubLink: 'https://github.com/edbertocampo/Face-Recognition-Attendance_Python',
      externalLink: null
    }
  ];
  

  return (
    <StyledProjectsSection id="projects">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <StyledSectionHeading>
          <h2>My Projects</h2>
          <div>Showcasing My Technical Journey</div>
        </StyledSectionHeading>

        <StyledProjectGrid>
          {projectsList.map((project, index) => (
            <StyledProjectItem 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="project-content">
                <StyledProjectHeader>
                  <FiFolder />
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
          ))}
        </StyledProjectGrid>
      </motion.div>
    </StyledProjectsSection>
  );
};

const StyledProjectsSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px clamp(20px, 5vw, 50px);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const StyledSectionHeading = styled.div`
  position: relative;
  margin-bottom: 30px;
  width: 100%;

  h2 {
    display: flex;
    align-items: center;
    font-size: clamp(24px, 5vw, 32px);
    margin-bottom: 10px;
    white-space: nowrap;

    &::after {
      content: '';
      display: block;
      position: relative;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: var(--lightest-navy);
    }
  }

  div {
    color: var(--slate);
    font-family: 'Roboto Mono', monospace;
  }
`;

const StyledProjectGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  position: relative;
  padding: 0;
  list-style: none;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px;
  }
`;

const StyledProjectItem = styled(motion.li)`
  background-color: var(--light-navy);
  border-radius: 4px;
  padding: 25px;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  will-change: transform, box-shadow;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 15px 40px -15px rgba(2, 12, 27, 0.7);
  }

  .project-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const StyledProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  svg {
    width: 40px;
    height: 40px;
    color: var(--green);
  }

  .project-links {
    display: flex;
    align-items: center;
    gap: 15px;

    a {
      color: var(--slate);
      transition: color 0.3s ease;

      &:hover {
        color: var(--green);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledProjectTitle = styled.h3`
  color: var(--lightest-slate);
  font-size: 22px;
  margin-bottom: 15px;
`;

const StyledProjectDescription = styled.p`
  color: var(--slate);
  margin-bottom: 20px;
  line-height: 1.5;
  font-size: 15px;
`;

const StyledTechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;
  padding: 0;
  list-style: none;

  li {
    background-color: var(--navy);
    color: var(--green);
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-family: 'Roboto Mono', monospace;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(100, 255, 218, 0.1);
    }
  }
`;

export default Projects;
