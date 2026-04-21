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
import CurvedLoop from './components/common/CurvedLoop/CurvedLoop';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from './components/Layout/SplashScreen';
import MouseFollowBlur from './components/common/MouseFollowBlur';
import ScrollToTop from './components/common/ScrollToTop';
import LogoImage from './assets/EO.svg';
import GradualBlur from './components/common/GradualBlur/GradualBlur';
import CommandLauncher from './components/CommandLauncher/CommandLauncher';

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
  
  padding-top: 10px;
`;

function App() {
  const [loading, setLoading] = React.useState(true);

  return (
    <Router>
      <div id="root">
        <MouseFollowBlur />
        <GlobalStyles />
        <AnimatePresence>
          {loading && (
            <SplashScreen key="splash" finishLoading={() => setLoading(false)} />
          )}
        </AnimatePresence>

        <UniversalNavigation logoSrc={LogoImage} />
        <CommandLauncher />
        <ScrollToTop />
        {/* <GradualBlur
          target="page"
          position="bottom"
          height="12vh"
          strength={3}
          divCount={10}
          curve="bezier"
          exponential={true}
          opacity={1}
          zIndex={9999}
        /> */}

        <StyledMainContainer>
          <SectionContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 0 : 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <Hero startTyping={!loading} id="home" />
                }
              />
              <Route path="/about" element={<ContentContainer><About /></ContentContainer>} />
              <Route path="/experience" element={<ContentContainer><Experience /></ContentContainer>} />
              <Route path="/projects" element={<ContentContainer><Projects /></ContentContainer>} />
              <Route path="/contact" element={<ContentContainer><Contact /></ContentContainer>} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </SectionContainer>
        </StyledMainContainer>
      </div>
    </Router>
  );
}

export default App;
