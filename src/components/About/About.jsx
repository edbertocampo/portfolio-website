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

  .inner {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: clamp(25px, 5vw, 45px);
    width: 100%;
    align-items: flex-start;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

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

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      margin-top: clamp(18px, 3vh, 30px);
    }
    @media (max-width: 1200px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* allow selected cards to span columns for Bento composition */
  .skills-grid .span-2 {
    grid-column: span 2;
  }

  .section-heading {
    font-size: clamp(24px, 5vw, 36px);
    margin-bottom: clamp(25px, 5vh, 45px);
    text-align: center;
    width: 100%;

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
  p {
    font-size: clamp(13px, 2vw, 18px);
    line-height: 1.7;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin-bottom: clamp(10px, 2vh, 20px);
    color: var(--slate);
    word-break: normal;
    overflow-wrap: break-word;
    hyphens: manual;

    @media (max-width: 768px) {
      font-size: clamp(13px, 1.8vw, 15px);
      line-height: 1.6;
      margin-bottom: clamp(8px, 1.5vh, 12px);
    }

    @media (max-width: 480px) {
      font-size: 13px;
      line-height: 1.6;
      margin-bottom: 8px;
    }

    @media (max-width: 360px) {
      font-size: 12px;
      line-height: 1.5;
      margin-bottom: 6px;
    }
  }

  /* skills-container moved below inner as .skills-grid */

  .skill-category {
    margin-bottom: 0;

    .category-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: clamp(22px, 3.2vh, 30px);
      width: 100%;

      svg {
        color: var(--green);
        font-size: clamp(18px, 2.5vw, 22px);
      }

      h3 {
        color: var(--lightest-slate);
        font-family: var(--font-heading);
        font-size: clamp(18px, 2.2vw, 20px);
        margin-bottom: 0;
        text-transform: uppercase;
        letter-spacing: 1.6px;
        font-weight: 700;
        line-height: 1.05;
      }
    }

    .badges-container {
      display: flex;
      flex-wrap: wrap;
      gap: 22px 18px;
      align-items: flex-start;
      padding-left: 4px;
    }
  }
`;

const SkillCard = styled(motion.div)`
  background: rgba(33, 52, 72, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 180, 193, 0.1);
  border-radius: 14px;
  padding: clamp(22px, 3.2vw, 28px) clamp(22px, 3.6vw, 30px);
  transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  min-height: 140px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: linear-gradient(180deg, rgba(30,44,58,0.28), rgba(33,52,72,0.36));
  box-shadow: 0 4px 14px rgba(2,12,27,0.25);

  &:hover {
    background: rgba(33, 52, 72, 0.5);
    border-color: var(--green);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
  }
`;

const SkillBadge = styled(motion.span)`
  background: rgba(148, 180, 193, 0.1);
  color: var(--slate);
  padding: 8px 16px;
  border-radius: 99px;
  font-size: clamp(11px, 1.4vw, 13px);
  font-family: var(--font-heading);
  border: 1px solid rgba(148, 180, 193, 0.1);
  display: inline-flex;
  align-items: center;
  line-height: 1;
  white-space: nowrap;
  margin-top: 6px;
  margin-right: 12px;
  margin-bottom: 6px;
  min-height: 34px;
  padding-top: 6px;
  padding-bottom: 6px;
  transition: all 0.25s ease;
  cursor: default;

  &:hover {
    background: rgba(100, 255, 218, 0.1);
    color: var(--green);
    border-color: var(--green);
    transform: scale(1.05);
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
  align-self: flex-start;
  max-width: clamp(200px, 40vw, 350px);
  width: 100%;
  margin: clamp(20px, 4vh, 40px) auto 0;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  @media (max-width: 1024px) {
    max-width: clamp(200px, 50vw, 300px);
    margin: clamp(15px, 3vh, 30px) auto;
  }

  @media (max-width: 768px) {
    max-width: clamp(180px, 70vw, 280px);
    margin: clamp(10px, 2vh, 20px) auto;
  }

  @media (max-width: 480px) {
    max-width: clamp(160px, 80vw, 240px);
    margin: 10px auto;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      border: 2px solid var(--green);
      top: clamp(8px, 2vw, 14px);
      left: clamp(8px, 2vw, 14px);
      z-index: -1;
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 100%;
      height: auto;
      filter: grayscale(30%);
      display: block;

      &:hover {
        filter: none;
      }
    }
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

const About = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.35", "start 0.1"]
  });

  const skills = [
  { category: 'Web Development', icon: <FiLayers />, skills: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { category: 'Programming', icon: <FiCode />, skills: ['Python', 'PHP', 'SQL'] },
  { category: 'Tools', icon: <FiCpu />, skills: ['Git', 'RStudio', 'Looker Studio'] },
  { category: 'Data & Analytics', icon: <FiBarChart2 />, skills: ['Business Analytics', 'Data Science', 'Data Analysis', 'Statistical Modeling'] },
  // { category: 'Design & Visualization', icon: <FiEdit3 />, skills: ['UI/UX', 'Data Visualization', 'Graphic Design'] },
  { category: 'Soft Skills', icon: <FiUsers />, skills: ['Communication', 'Time Management', 'Leadership', 'Adaptability'] },
  ];

  return (
    <StyledAboutSection id="about" ref={containerRef}>
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
                  text="I'm Edbert, a passionate professional bridging technology and business through innovative digital solutions."
                  progress={scrollYProgress}
                  range={[0.1, 0.4]}
                />
              </p>
              <p style={{ marginTop: '15px' }}>
                <TextReveal
                  text="As a technology professional and Professor, I blend technology and business to create innovative digital solutions across web development, Data Science, and freelance services."
                  progress={scrollYProgress}
                  range={[0.4, 0.7]}
                />
              </p>
              <p style={{ marginTop: '15px' }}>
                <TextReveal
                  text="My professional toolkit showcases versatility in transforming complex challenges into elegant, user-centric experiences:"
                  progress={scrollYProgress}
                  range={[0.7, 0.9]}
                />
              </p>
              {/* moved skills grid below the two-column inner row */}
            </motion.div>
          </StyledText>

          <StyledPic>
            <motion.div variants={item} className="wrapper">
              <img
                className="img"
                src="/OCAMPO.png"
                alt="Headshot"
                width="100%"
                height="auto"
              />
            </motion.div>
          </StyledPic>
        </div>

        <div className="skills-grid">
          {skills.map((category, i) => {
            const spanClass = category.skills.length > 3 ? 'span-2' : '';
            return (
              <SkillCard key={i} className={spanClass} variants={item}>
                <div className="skill-category">
                  <div className="category-header">
                    {category.icon}
                    <h3>{category.category}</h3>
                  </div>
                  <div className="badges-container">
                    {category.skills.map((skill, si) => (
                      <SkillBadge key={si}>{skill}</SkillBadge>
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
