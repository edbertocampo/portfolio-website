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
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from './components/Layout/SplashScreen';
import MouseFollowBlur from './components/common/MouseFollowBlur';
import ScrollToTop from './components/common/ScrollToTop';
import LogoImage from './assets/EO.svg';

const StyledMainContainer = styled.main`
  padding: 0;
  margin: 0;
  width: 100%;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(25px, 5vw, 150px);
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const SectionContainer = styled(motion.div)`
  /* overflow-y: auto;  <-- REMOVED to fix sticky scroll in Projects */
`;

const SectionWrapper = styled.div`
  
  padding-top: 30px;
`;

function App() {
  const [loading, setLoading] = React.useState(true);

  return (
    <Router>
      <div id="root">
        <GlobalStyles />
        <AnimatePresence>
          {loading && (
            <SplashScreen key="splash" finishLoading={() => setLoading(false)} />
          )}
        </AnimatePresence>

        <MouseFollowBlur />
        <UniversalNavigation logoSrc={LogoImage} />
        <ScrollToTop />

        <StyledMainContainer>
          <ContentContainer>
            <SectionContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: loading ? 0 : 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <SectionWrapper id="home">
                        <Hero startTyping={!loading} />
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
