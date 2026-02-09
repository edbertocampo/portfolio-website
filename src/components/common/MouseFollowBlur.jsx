import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BlurBackground = styled.div`
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const BlurEffect = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle at center, 
    rgba(234, 224, 207, 0.1) 0%, 
    rgba(234, 224, 207, 0.05) 50%, 
    transparent 80%
  );
  border-radius: 40%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: transform 0.1s ease-out, opacity 0.2s ease;
  filter: blur(30px);
  opacity: 0.4;

  @media (max-width: 768px) {
    width: 400px;
    height: 400px;
  }
`;

const MouseFollowBlur = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <BlurBackground>
      <BlurEffect
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </BlurBackground>
  );
};

export default MouseFollowBlur;
