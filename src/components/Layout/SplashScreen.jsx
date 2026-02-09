import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledSplashScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
  background: transparent;
`;

const BackgroundSlice = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100%;
  width: ${props => 100 / props.count}%;
  left: ${props => (100 / props.count) * props.index}%;
  background: linear-gradient(
    135deg, 
    rgba(43, 69, 98, 1) 0%, 
    var(--navy) 100%
  );
  background-size: ${props => props.count * 100}% 100%;
  background-position: ${props => (props.index * 100) / (props.count - 1)}% 0;
  z-index: 1;
`;

const StyledText = styled(motion.h1)`
  color: var(--lightest-slate);
  font-family: var(--font-heading);
  font-size: clamp(40px, 8vw, 80px);
  font-weight: 600;
  display: flex;
  align-items: center;
  z-index: 2;

  .cursor {
    display: inline-block;
    width: 6px;
    height: 1em;
    background-color: var(--green);
    margin-left: 5px;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const SplashScreen = ({ finishLoading }) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const fullText = 'edbert.';
    const sliceCount = 7;
    const slices = Array.from({ length: sliceCount });

    useEffect(() => {
        let timer;
        const handleTyping = () => {
            if (!isDeleting) {
                if (text.length < fullText.length) {
                    setText(fullText.substring(0, text.length + 1));
                    timer = setTimeout(handleTyping, 150);
                } else {
                    timer = setTimeout(() => setIsDeleting(true), 1000);
                }
            } else {
                if (text.length > 0) {
                    setText(fullText.substring(0, text.length - 1));
                    timer = setTimeout(handleTyping, 100);
                } else {
                    finishLoading();
                }
            }
        };

        timer = setTimeout(handleTyping, 100);
        return () => clearTimeout(timer);
    }, [text, isDeleting, finishLoading]);

    // Animation variants
    const containerVariants = {
        exit: {
            transition: { staggerChildren: 0.1 }
        }
    };

    const sliceVariants = {
        initial: { y: "0%" },
        exit: {
            y: "-100%",
            transition: {
                duration: 0.6,
                ease: [0.645, 0.045, 0.355, 1]
            }
        }
    };

    const textVariants = {
        exit: {
            opacity: 0,
            transition: { duration: 0.2 }
        }
    };

    return (
        <StyledSplashScreen
            variants={containerVariants}
            initial="initial"
            exit="exit"
        >
            {slices.map((_, i) => (
                <BackgroundSlice
                    key={i}
                    index={i}
                    count={sliceCount}
                    variants={sliceVariants}
                />
            ))}
            <StyledText variants={textVariants}>
                {text}
                <span className="cursor"></span>
            </StyledText>
        </StyledSplashScreen>
    );
};

export default SplashScreen;
