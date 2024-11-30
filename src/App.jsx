import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import UniversalNavigation from './components/Layout/UniversalNavigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import ErrorPage from './components/ErrorPage/ErrorPage';
import { motion } from 'framer-motion';
import MouseFollowBlur from './components/common/MouseFollowBlur';
import ScrollToTop from './components/common/ScrollToTop';
import LogoImage from './assets/eo_logo.png';

const StyledMainContainer = styled.main`
  padding: 0;
  margin: 0;
  width: 100%;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(25px, 5vw, 150px);
  padding-top: 60px;

  @media (max-width: 768px) {
    padding-top: 50px;
  }
  width: 100%;
`;

const SectionContainer = styled(motion.div)`
  scroll-behavior: smooth;
  overflow-y: auto;
`;

const SectionWrapper = styled.div`
  
  padding-top: 30px;
`;

function App() {
  return (
    <Router>
      <div id="root">
        <GlobalStyles />
        <MouseFollowBlur />
        <UniversalNavigation logoSrc={LogoImage} />
        <ScrollToTop />
        
        <StyledMainContainer>
          <ContentContainer>
            <SectionContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <>
                      <SectionWrapper id="home">
                        <Hero />
                      </SectionWrapper>
                      <SectionWrapper id="about">
                        <About />
                      </SectionWrapper>
                      <SectionWrapper id="experience">
                        <Experience />
                      </SectionWrapper>
                      <SectionWrapper id="projects">
                        <Projects />
                      </SectionWrapper>
                      <SectionWrapper id="contact">
                        <Contact />
                      </SectionWrapper>
                    </>
                  } 
                />
                <Route path="/about" element={<About />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </SectionContainer>
          </ContentContainer>
        </StyledMainContainer>
      </div>
    </Router>
  );
}

export default App;
