import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.span`
  display: inline;
  line-height: inherit;
  font-family: inherit;
  font-size: inherit;
  white-space: pre-wrap;
`;

const BinarySpan = styled.span`
  display: inline;
  color: ${props => props.$isRevealed ? 'inherit' : 'var(--green)'};
  opacity: ${props => props.$isRevealed ? 1 : 0.15};
  transition: all 0.2s ease;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  white-space: pre;
`;

const BytesToText = ({ text, delay = 0, speed = 20 }) => {
  const [characters, setCharacters] = useState([]);
  
  const updateBinary = useCallback(() => {
    setCharacters(prev => prev.map(char => 
      char.isRevealed ? char : {
        ...char,
        current: Math.random() < 0.5 ? '0' : '1'
      }
    ));
  }, []);

  useEffect(() => {
    setCharacters(Array.from(text).map(() => ({
      current: '0',
      isRevealed: false
    })));

    let timeoutIds = [];
    let binaryInterval;

    const startAnimation = () => {
      binaryInterval = setInterval(updateBinary, 50); // Fixed faster binary update rate

      Array.from(text).forEach((char, index) => {
        timeoutIds.push(
          setTimeout(() => {
            setCharacters(prev => prev.map((c, i) => 
              i === index ? { current: char, isRevealed: true } : c
            ));

            if (index === text.length - 1) {
              clearInterval(binaryInterval);
            }
          }, delay + (index * speed))
        );
      });
    };

    const initialDelay = setTimeout(startAnimation, 10);
    timeoutIds.push(initialDelay);

    return () => {
      clearInterval(binaryInterval);
      timeoutIds.forEach(clearTimeout);
    };
  }, [text, delay, speed, updateBinary]);

  return (
    <Container>
      {characters.map((char, index) => (
        <BinarySpan 
          key={index} 
          $isRevealed={char.isRevealed}
        >
          {char.current}
        </BinarySpan>
      ))}
    </Container>
  );
};

export default BytesToText;
