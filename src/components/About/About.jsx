import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCode, FiLayers, FiCpu, FiCheckCircle, FiEdit3, FiUsers, FiBarChart2 } from 'react-icons/fi';

const StyledAboutSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: var(--section-max-width);
  width: 100%;
  margin: 0 auto;
  padding: clamp(50px, 8vh, 100px) var(--section-padding-x);
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
      gap: 30px;
    }

    @media (max-width: 360px) {
      gap: 12px;
    }
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
    margin-top: clamp(30px, 5vh, 50px);
    grid-auto-flow: dense;
    grid-auto-rows: minmax(120px, auto);
    position: relative;
    z-index: 2;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
      margin-top: clamp(18px, 3vh, 30px);
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
  background: rgba(30, 44, 58, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 180, 193, 0.1);
  border-radius: 12px;
  padding: clamp(25px, 3.5vw, 35px);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 32px 0 rgba(2, 12, 27, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(100, 255, 218, 0.05) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(100, 255, 218, 0.3);
    box-shadow: 0 15px 45px -15px rgba(2, 12, 27, 0.8),
                0 0 20px rgba(100, 255, 218, 0.1);
    
    &::before {
      opacity: 1;
    }

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
  const opacity = useTransform(progress, range, [0.25, 1]);
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
  position: relative;
  align-self: center;
  max-width: clamp(240px, 40vw, 380px);
  width: 100%;
  margin: 0 auto;
  z-index: 2;

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    border-radius: 12px;
    background-color: var(--green);
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 0%, rgba(100, 255, 218, 0.2), transparent 70%);
      border-radius: 12px;
      z-index: 2;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    &:hover {
      &::before {
        opacity: 1;
      }
    }

    /* Side border effect */
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      border: 2px solid rgba(100, 255, 218, 0.5);
      top: 15px;
      left: 15px;
      z-index: -1;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .img {
      position: relative;
      border-radius: 12px;
      width: 100%;
      height: auto;
      filter: grayscale(40%) contrast(1.1) brightness(0.9);
      mix-blend-mode: normal;
      display: block;
      transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
      background-color: transparent;
    }

    &:hover .img {
      filter: grayscale(0%) contrast(1) brightness(1);
    }
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.35", "start 0.1"]
  });

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
          About Me
        </motion.h2>
        <div className="inner">
          <StyledText>
            <motion.div variants={item}>
              <p>
                <TextReveal
                  text="I’m Edbert, someone who loves turning ideas into meaningful digital experiences, because I know how powerful the right solution can be for people and businesses."
                  progress={scrollYProgress}
                  range={[0.1, 0.4]}
                />
              </p>
              <p>
                <TextReveal
                  text="As a technology professional and Lecturer, I blend technology and business to create innovative digital solutions across web development, Data Science, and freelance services."
                  progress={scrollYProgress}
                  range={[0.4, 0.7]}
                />
              </p>
              <p>
                <TextReveal
                  text="I thrive on transforming complex challenges into elegant, user-focused solutions, all while continuously learning and inspiring others to do the same."
                  progress={scrollYProgress}
                  range={[0.7, 0.9]}
                />
              </p>
            </motion.div>
          </StyledText>

          <StyledPic>
            <div className="wrapper">
              <img
                className="img"
                src={profileImage}
                alt="Edbert Ocampo"
                width="100%"
                height="auto"
              />
            </div>
          </StyledPic>
        </div>

        <div className="skills-grid">
          {skills.map((category, i) => {
            const isSpan2 = category.skills.length > 3 || i === 0;
            const spanClass = isSpan2 ? 'span-2' : '';

            return (
              <SkillCard key={i} className={spanClass} variants={item}>
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
              </SkillCard>
            );
          })}
        </div>
      </motion.div>
    </StyledAboutSection>
  );
};

export default About;
