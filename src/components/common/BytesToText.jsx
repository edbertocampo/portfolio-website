import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.span`
  display: inline-block;
  width: 100%;
  white-space: pre-wrap; /* preserve spaces but allow wrapping */
  letter-spacing: 0;
  word-spacing: normal;
  word-break: normal;
  text-align: ${props => props.$align || 'left'};

  @media (max-width: 360px) {
    word-break: break-word;
    max-width: calc(100% - 4px);
    margin: 0 2px;
  }

  @media (max-width: 320px) {
    max-width: calc(100% - 2px);
    margin: 0 1px;
    letter-spacing: -0.01em;
  }
`;

const CharContainer = styled.span`
  display: inline-block;
  position: relative;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  text-align: center;
  letter-spacing: inherit;
  margin: 0;
  padding: 0;
`;

const WordContainer = styled.span`
  display: inline-block;
  vertical-align: top;
  margin-right: ${props => (props.$hasTrailingSpace ? '0.28em' : '0')};

  @media (max-width: 768px) {
    margin-right: ${props => (props.$hasTrailingSpace ? '0.25em' : '0')};
  }

  @media (max-width: 480px) {
    margin-right: ${props => (props.$hasTrailingSpace ? '0.22em' : '0')};
  }

  @media (max-width: 360px) {
    margin-right: ${props => (props.$hasTrailingSpace ? '0.18em' : '0')};
  }
`;

const StaticChar = styled.span`
  visibility: ${props => (props.$isRevealed ? 'visible' : 'hidden')};
  opacity: ${props => (props.$isRevealed ? 1 : 0)};
  transition: opacity 0.2s ease;
  color: inherit;
`;

const BinaryChar = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: ${props => (props.$isSpace ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  color: var(--green);
  opacity: ${props => (props.$isRevealed ? 0 : 0.5)};
  transition: opacity 0.2s ease;
  pointer-events: none;
`;

const BytesToText = ({ text, delay = 0, speed = 20, align }) => {
  const [characters, setCharacters] = useState([]);

  const updateBinary = useCallback(() => {
    setCharacters(prev =>
      prev.map(char =>
        char.isRevealed || char.char === ' '
          ? char
          : {
              ...char,
              binary: Math.random() < 0.5 ? '0' : '1',
            }
      )
    );
  }, []);

  useEffect(() => {
    const chars = Array.from(text).map(char => ({
      char,
      binary: char === ' ' ? ' ' : Math.random() < 0.5 ? '0' : '1',
      isRevealed: char === ' ',
    }));

    setCharacters(chars);

    let timeoutIds = [];
    let binaryInterval;

    const startAnimation = () => {
      binaryInterval = setInterval(updateBinary, 35);

      chars.forEach((char, index) => {
        if (char.char === ' ') return;

        const timeout = setTimeout(() => {
          setCharacters(prev =>
            prev.map((c, i) => (i === index ? { ...c, isRevealed: true } : c))
          );

          if (index === chars.length - 1) {
            clearInterval(binaryInterval);
          }
        }, delay + index * speed);

        timeoutIds.push(timeout);
      });
    };

    const initialDelay = setTimeout(startAnimation, 10);
    timeoutIds.push(initialDelay);

    return () => {
      clearInterval(binaryInterval);
      timeoutIds.forEach(clearTimeout);
    };
  }, [text, delay, speed, updateBinary]);

  // group contiguous non-space characters into word containers so words don't break between letters
  const groups = [];
  let currentWord = null;

  characters.forEach((c, i) => {
    if (c.char === ' ') {
      if (currentWord) {
        currentWord.hasTrailingSpace = true;
        groups.push(currentWord);
        currentWord = null;
      }
    } else {
      if (!currentWord) currentWord = { chars: [], hasTrailingSpace: false };
      currentWord.chars.push({ ...c, __index: i });
    }
  });
  if (currentWord) groups.push(currentWord);

  return (
    <Container $align={align}>
      {groups.map((group, gi) => (
        <WordContainer key={gi} $hasTrailingSpace={group.hasTrailingSpace}>
          {group.chars.map(charObj => (
            <CharContainer
              key={charObj.__index}
              $isSpace={false}
              style={{ marginLeft: charObj.char === '/' ? '0.25em' : '0' }}
            >
              <StaticChar $isRevealed={charObj.isRevealed}>{charObj.char}</StaticChar>
              <BinaryChar $isRevealed={charObj.isRevealed} $isSpace={false}>
                {charObj.binary}
              </BinaryChar>
            </CharContainer>
          ))}
        </WordContainer>
      ))}
    </Container>
  );
};

export default BytesToText;
