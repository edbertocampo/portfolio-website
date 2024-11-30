import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ErrorContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--navy);
  color: var(--lightest-slate);
  text-align: center;
  padding: 0 20px;
`;

const ErrorCode = styled(motion.h1)`
  font-size: clamp(80px, 20vw, 200px);
  font-family: 'Roboto Mono', monospace;
  color: var(--green);
  margin-bottom: 20px;
  line-height: 1;
`;

const ErrorMessage = styled(motion.p)`
  font-size: clamp(18px, 4vw, 24px);
  max-width: 600px;
  margin-bottom: 30px;
  color: var(--slate);
  font-family: 'Roboto Mono', monospace;
`;

const ReturnButton = styled(motion.button)`
  background-color: transparent;
  border: 2px solid var(--green);
  color: var(--green);
  padding: 12px 24px;
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(100, 255, 218, 0.1);
    transform: translateY(-5px);
  }
`;

const ErrorPage = ({ 
  errorCode = 500, 
  errorType = 'Internal Server Error', 
  customMessage 
}) => {
  const defaultMessages = {
    404: 'The page you are looking for seems to have gone on an unexpected adventure.',
    500: 'Oops! Something went wrong on our end. We are working to fix it.',
    503: 'Service temporarily unavailable. Please try again later.',
  };

  const message = customMessage || defaultMessages[errorCode] || 'An unexpected error occurred.';

  return (
    <ErrorContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ErrorCode
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {errorCode}
      </ErrorCode>
      
      <ErrorMessage
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </ErrorMessage>
      
      <ReturnButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.href = '/'}
      >
        Return to Homepage
      </ReturnButton>
    </ErrorContainer>
  );
};

export default ErrorPage;
