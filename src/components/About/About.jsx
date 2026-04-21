import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCode, FiLayers, FiCpu, FiCheckCircle, FiEdit3, FiUsers, FiBarChart2 } from 'react-icons/fi';
import BorderGlow from '../BorderGlow/BorderGlow';
// import Lanyard from '../common/Lanyard/Lanyard';
import ProfileCard from '../common/ProfileCard/ProfileCard';

const StyledAboutSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: var(--section-max-width);
  width: 100%;
  margin: 0 auto;
  padding: clamp(20px, 4vh, 60px) var(--section-padding-x);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;

  .inner {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: clamp(25px, 5vw, 45px);
    width: 100%;
    align-items: flex-start;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    position: relative;
    z-index: 2;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: clamp(20px, 4vw, 35px);
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column-reverse;
      gap: clamp(25px, 5vw, 40px);
    }

    @media (max-width: 480px) {
      flex-direction: column-reverse;
      gap: 15px; // Reduced gap for mobile
    }

    @media (max-width: 360px) {
      gap: 12px;
    }
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
    margin-top: clamp(80px, 12vh, 120px);
    grid-auto-flow: dense;
    grid-auto-rows: minmax(120px, auto);
    position: relative;
    z-index: 2;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
      margin-top: clamp(30px, 5vh, 50px); // Significantly reduced for mobile
      gap: 16px;
    }
  }

  /* allow selected cards to span columns for Bento composition */
  .skills-grid .span-2 {
    grid-column: span 2;
    @media (max-width: 640px) {
      grid-column: span 1;
    }
  }

  .section-heading {
    font-size: clamp(24px, 5vw, 36px);
    margin-bottom: clamp(25px, 5vh, 45px);
    text-align: center;
    width: 100%;
    position: relative;
    z-index: 2;

    @media (max-width: 480px) {
      font-size: clamp(20px, 4vw, 28px);
      margin-bottom: clamp(12px, 2.5vh, 20px);
    }

    @media (max-width: 360px) {
      font-size: 20px;
      margin-bottom: 15px;
    }
  }

  @media (max-width: 768px) {
    padding: clamp(40px, 6vh, 80px) clamp(10px, 3vw, 25px);
  }

  @media (max-width: 480px) {
    padding: clamp(25px, 4vh, 50px) clamp(10px, 3vw, 16px);
  }

  @media (max-width: 360px) {
    padding: clamp(25px, 4vh, 50px) clamp(8px, 2vw, 12px);
  }
`;

const StyledText = styled.div`
  position: relative;
  z-index: 2;

  p {
    font-size: clamp(14px, 2.2vw, 18px);
    line-height: 1.8;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin-bottom: clamp(15px, 2.5vh, 25px);
    color: var(--slate);
    word-break: normal;
    overflow-wrap: break-word;

    @media (max-width: 768px) {
      font-size: clamp(14px, 1.8vw, 16px);
      line-height: 1.7;
    }
  }
`;

const SkillCard = styled(motion.div)`
  position: relative;
  z-index: 2;
  height: 100%;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  
  .border-glow-card {
    height: 100%;
  }

  .border-glow-inner {
    padding: clamp(25px, 3.5vw, 35px);
    height: 100%;
  }

  &:hover {
    transform: translateY(-8px);
    
    .category-icon {
      color: var(--green);
      transform: scale(1.1) rotate(5deg);
    }
  }

  .skill-category {
    position: relative;
    z-index: 1;
  }

  .category-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;

    @media (max-width: 480px) {
      gap: 10px;
      margin-bottom: 15px;
    }

    .category-icon {
      color: var(--slate);
      font-size: 20px;
      transition: all 0.4s ease;

      @media (max-width: 480px) {
        font-size: 18px;
      }
    }

    h3 {
      color: var(--lightest-slate);
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (max-width: 480px) {
        font-size: 12px;
        letter-spacing: 1px;
      }
    }
  }

  .badges-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const SkillBadge = styled(motion.span)`
  background: rgba(148, 180, 193, 0.05);
  color: var(--slate);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-family: var(--font-heading);
  border: 1px solid rgba(148, 180, 193, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: default;
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    padding: 4px 10px;
    font-size: 11px;
    border-radius: 4px;
  }

  &:hover {
    background: rgba(100, 255, 218, 0.08);
    color: var(--green);
    border-color: rgba(100, 255, 218, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px -5px rgba(100, 255, 218, 0.2);
  }
`;

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ['var(--slate)', 'var(--lightest-slate)']);

  return (
    <motion.span style={{ opacity, color, display: 'inline-block', marginRight: '0.25em' }}>
      {children}
    </motion.span>
  );
};

const TextReveal = ({ text, progress, range }) => {
  const words = text.split(' ');
  const amount = range[1] - range[0];
  const step = amount / words.length;

  return (
    <>
      {words.map((word, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        return (
          <Word key={i} progress={progress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </>
  );
};

const StyledPic = styled.div`
  z-index: 10;
  pointer-events: none;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 500px;
  
  & > div {
    pointer-events: auto;
  }

  @media (min-width: 1025px) {
    position: absolute;
    top: -30px;
    height: 900px;
    left: 0 !important;
    right: 0 !important;
    width: 100vw !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    z-index: 10;
  }

  @media (max-width: 1024px) {
    height: 600px;
    margin-top: 0;
    margin-bottom: 0px;
  }

  @media (max-width: 480px) {
    height: 450px;
  }
`;

const StyledCardContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
  margin-top: -60px;

  @media (max-width: 1024px) {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const BackgroundAccent = styled.div`
  position: absolute;
  top: 20%;
  right: -5%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(100, 255, 218, 0.03) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
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
  const containerRef = React.useRef(null);
  const skills = [
    { category: 'Web Development', icon: <FiLayers />, skills: ['HTML', 'CSS', 'JavaScript', 'React'] },
    { category: 'Programming', icon: <FiCode />, skills: ['Python', 'PHP', 'SQL'] },
    { category: 'Tools', icon: <FiCpu />, skills: ['Git', 'RStudio', 'Looker Studio'] },
    { category: 'Data & Analytics', icon: <FiBarChart2 />, skills: ['Business Analytics', 'Data Science', 'Data Analysis', 'Data Mining'] },
    { category: 'Soft Skills', icon: <FiUsers />, skills: ['Communication', 'Time Management', 'Leadership', 'Adaptability'] },
  ];

  const profileImage = '/OCAMPO.png';
  const lanyardRef = React.useRef(null);
  const bioRef = React.useRef(null);

  const { scrollYProgress: lanyardScroll } = useScroll({
    target: bioRef,
    offset: ["start 0.9", "end 0.6"]
  });

  const lanyardY = useTransform(lanyardScroll, [0, 0.5, 1], [-20, -10, 4.5]);
  const lanyardOpacity = useTransform(lanyardScroll, [0, 0.2, 0.5], [0, 0.5, 1]);

  return (
    <StyledAboutSection id="about" ref={containerRef}>
      <BackgroundAccent />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.h2 variants={item} className="section-heading">
          ~/about
        </motion.h2>


        {/* <StyledPic
          as={motion.div}
          ref={lanyardRef}
          style={{ 
            opacity: lanyardOpacity,
          }}
        >
          <Lanyard cardImage={profileImage} scrollY={lanyardY} eventSource={containerRef} />
        </StyledPic> */}

        <div className="inner">
          <StyledText ref={bioRef}>
            <motion.div variants={item}>
              <p>
                <TextReveal
                  text="I’m Edbert, someone who loves turning ideas into meaningful digital experiences, because I know how powerful the right solution can be for people and businesses."
                  progress={lanyardScroll}
                  range={[0.1, 0.4]}
                />
              </p>
              <p>
                <TextReveal
                  text="As a technology professional and Lecturer, I blend technology and business to create innovative digital solutions across web development, Data Science, and freelance services."
                  progress={lanyardScroll}
                  range={[0.4, 0.7]}
                />
              </p>
              <p>
                <TextReveal
                  text="I thrive on transforming complex challenges into elegant, user-focused solutions, all while continuously learning and inspiring others to do the same."
                  progress={lanyardScroll}
                  range={[0.7, 0.9]}
                />
              </p>
            </motion.div>
          </StyledText>

          <StyledCardContainer variants={item}>
            <ProfileCard
              name="Edbert Ocampo"
              title="Lecturer & Technology Professional"
              handle="edbertocampo"
              status="Available for Work"
              contactText="Get in Touch"
              avatarUrl={profileImage}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={true}
              onContactClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
              }}
              behindGlowEnabled={true}
              innerGradient="linear-gradient(145deg, rgba(10, 25, 47, 0.9) 0%, rgba(100, 255, 218, 0.1) 100%)"
              behindGlowColor="rgba(100, 255, 218, 0.4)"
            />
          </StyledCardContainer>
        </div>

        <div className="skills-grid">
          {skills.map((category, i) => {
            const isSpan2 = category.skills.length > 3 || i === 0;
            const spanClass = isSpan2 ? 'span-2' : '';

            return (
              <SkillCard key={i} className={spanClass} variants={item}>
                <BorderGlow
                  backgroundColor="rgba(30, 44, 58, 0.4)"
                  borderRadius={12}
                  glowColor="164 100 69"
                  colors={['#64ffda', '#48bfe3', '#0096c7']}
                  glowRadius={30}
                  fillOpacity={0.1}
                  coneSpread={10}
                  glowIntensity={2}
                  animated={true}
                >
                  <div className="skill-category">
                    <div className="category-header">
                      <span className="category-icon">{category.icon}</span>
                      <h3>{category.category}</h3>
                    </div>
                    <div className="badges-container">
                      {category.skills.map((skill, si) => (
                        <SkillBadge
                          key={si}
                          whileHover={{ y: -2 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          {skill}
                        </SkillBadge>
                      ))}
                    </div>
                  </div>
                </BorderGlow>
              </SkillCard>
            );
          })}
        </div>
      </motion.div>

    </StyledAboutSection>
  );
};

export default About;
