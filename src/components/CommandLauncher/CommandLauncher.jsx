import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiTerminal, FiCommand, FiArrowRight } from 'react-icons/fi';

const CommandLauncherContainer = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: min(600px, 90vw);
`;

const TerminalWrapper = styled(motion.div)`
  background: rgba(10, 25, 47, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(234, 224, 207, 0.1);
  border-radius: 12px;
  padding: 14px 22px;
  box-shadow: 0 10px 40px -15px rgba(2, 12, 27, 0.8);
  display: flex;
  align-items: center;
  gap: 14px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: rgba(234, 224, 207, 0.4);
    box-shadow: 0 0 20px rgba(234, 224, 207, 0.1);
    background: rgba(10, 25, 47, 0.85);
  }
`;

const Prompt = styled.span`
  color: var(--green);
  font-family: var(--font-mono);
  font-size: 14px;
  white-space: nowrap;
  user-select: none;
  opacity: 0.8;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  font-size: 15px;
  width: 100%;
  outline: none;
  letter-spacing: 0.5px;
  
  &::placeholder {
    color: var(--slate);
    opacity: 0.4;
  }
`;

const FeedbackMessage = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 10px;
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid var(--green);
  border-radius: 4px;
  padding: 4px 12px;
  color: var(--green);
  font-family: var(--font-mono);
  font-size: 12px;
  pointer-events: none;
`;

const HelpTooltip = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 10px;
  background: rgba(2, 12, 27, 0.9);
  border: 1px solid rgba(148, 180, 193, 0.1);
  border-radius: 8px;
  padding: 12px;
  color: var(--slate);
  font-family: var(--font-mono);
  font-size: 11px;
  width: 200px;
  pointer-events: none;

  strong {
    color: var(--green);
    display: block;
    margin-bottom: 4px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 2px;
  }
`;

const CommandLauncher = () => {
  const [command, setCommand] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const commands = [
    '/about', '/experience', '/projects', '/contact', '/home', '/who',
    'git checkout about', 'git checkout experience', 'git checkout projects',
    'git checkout contact', 'git checkout main', 'ls', 'help', 'clear', 'who'
  ];

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = command.trim().toLowerCase();
      if (!cmd) return;

      setHistory(prev => [cmd, ...prev]);
      setHistoryIndex(-1);

      if (cmd === 'clear') {
        setFeedback('');
        setCommand('');
        return;
      }

      if (cmd === '/about' || cmd === 'git checkout about' || cmd === 'goto about') {
        executeNavigation('about', cmd.startsWith('git') ? "Switched to branch 'about'" : "Navigating to /about...");
      } else if (cmd === '/experience' || cmd === 'git checkout experience' || cmd === 'goto experience' || cmd === '/journey') {
        executeNavigation('experience', cmd.startsWith('git') ? "Switched to branch 'experience'" : "Navigating to /journey...");
      } else if (cmd === '/projects' || cmd === 'git checkout projects' || cmd === 'goto projects') {
        executeNavigation('projects', cmd.startsWith('git') ? "Switched to branch 'projects'" : "Navigating to /projects...");
      } else if (cmd === '/contact' || cmd === 'git checkout contact' || cmd === 'goto contact') {
        executeNavigation('contact', cmd.startsWith('git') ? "Switched to branch 'contact'" : "Navigating to /contact...");
      } else if (cmd === '/home' || cmd === 'git checkout main' || cmd === 'goto home') {
        executeNavigation('home', cmd.startsWith('git') ? "Switched to branch 'main'" : "Navigating to /home...");
      } else if (cmd === 'who' || cmd === '/who' || cmd === 'whoami') {
        setFeedback('Edbert Ocampo: Lecturer & Technology Professional. Creator of digital experiences.');
      } else if (cmd === 'ls') {
        setFeedback('Sections: home, about, experience, projects, contact');
      } else if (cmd === 'help') {
        setShowHelp(true);
        setTimeout(() => setShowHelp(false), 5000);
      } else if (cmd === 'git status') {
        setFeedback('On branch main. Your portfolio is up to date.');
      } else {
        setFeedback(`Command not found: ${cmd}. Type 'help' for available commands.`);
      }
      
      setCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = command.toLowerCase();
      const match = commands.find(c => c.startsWith(partial));
      if (match) {
        setCommand(match);
      }
    }
  };

  const executeNavigation = (sectionId, message) => {
    setFeedback(message);
    
    setTimeout(() => {
      if (location.pathname === '/' || sectionId === 'home') {
        const targetId = sectionId === 'home' ? 'home' : sectionId;
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          if (sectionId !== 'home') navigate(`/${sectionId}`, { replace: true });
        } else if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          navigate('/', { replace: true });
        }
      } else {
        navigate(`/${sectionId === 'home' ? '' : sectionId}`);
      }
      setFeedback('');
    }, 500);
  };

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Focus input on '/' key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <CommandLauncherContainer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <AnimatePresence>
        {feedback && (
          <FeedbackMessage
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {feedback}
          </FeedbackMessage>
        )}
        {showHelp && (
          <HelpTooltip
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <strong>Available Commands:</strong>
            <ul>
              <li>/about - Go to About</li>
              <li>/projects - Go to Projects</li>
              <li>/experience - Go to Journey</li>
              <li>/contact - Go to Contact</li>
              <li>ls - List sections</li>
              <li>help - Show this help</li>
            </ul>
            <p style={{ marginTop: '8px', fontSize: '10px' }}>Try "git checkout [section]"!</p>
          </HelpTooltip>
        )}
      </AnimatePresence>

      <TerminalWrapper
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Prompt>guest@portfolio:~$</Prompt>
        <Input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleCommand}
          placeholder="Type a command (e.g. /about) or 'help'"
          onFocus={() => setShowHelp(true)}
          onBlur={() => setShowHelp(false)}
        />
        <FiTerminal style={{ color: 'var(--green)', opacity: 0.5 }} />
      </TerminalWrapper>
    </CommandLauncherContainer>
  );
};

export default CommandLauncher;
