import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiTerminal, 
  FiCommand, 
  FiArrowRight, 
  FiUser, 
  FiBriefcase, 
  FiFolder, 
  FiMail, 
  FiHome, 
  FiInfo, 
  FiHash, 
  FiX, 
  FiSmile,
  FiCloud
} from 'react-icons/fi';

const CommandLauncherContainer = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: 60px;
  align-items: ${props => props.expandDirection === 'left' ? 'flex-end' : 'flex-start'};
  pointer-events: none; 
`;

const TerminalWrapper = styled(motion.div)`
  background: rgba(10, 25, 47, 0.7);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(234, 224, 207, 0.1);
  border-radius: ${props => props.minimized ? '50%' : '14px'};
  width: ${props => props.minimized ? '60px' : 'min(500px, 85vw)'};
  height: 60px;
  padding: ${props => props.minimized ? '0' : '0 22px'};
  box-shadow: 0 10px 40px -10px rgba(2, 12, 27, 0.9);
  display: flex;
  align-items: center;
  justify-content: ${props => props.minimized ? 'center' : 'flex-start'};
  gap: 14px;
  cursor: ${props => props.minimized ? 'grab' : 'text'};
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  pointer-events: auto; /* Re-enable pointer events */
  
  &:active {
    cursor: ${props => props.minimized ? 'grabbing' : 'text'};
  }
`;

const Prompt = styled(motion.span)`
  color: var(--green);
  font-family: var(--font-mono);
  font-size: 14px;
  white-space: nowrap;
  user-select: none;
  opacity: 0.8;
  flex-shrink: 0;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  font-size: 15px;
  width: 100%;
  outline: none;
  letter-spacing: 0.2px;
  caret-color: var(--green);
  
  &::placeholder {
    color: var(--slate);
    opacity: 0.3;
  }
`;


const SuggestionsContainer = styled(motion.div)`
  position: absolute;
  ${props => props.verticalDirection === 'down' ? 'top: 72px;' : 'bottom: 72px;'}
  ${props => props.expandDirection === 'left' ? 'right: 0;' : 'left: 0;'}
  background: rgba(10, 25, 47, 0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 12px;
  width: 280px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  flex-shrink: 0;
  pointer-events: auto;
`;

const SuggestionItem = styled.div`
  padding: 12px 16px;
  color: ${props => props.active ? 'var(--green)' : 'var(--slate)'};
  background: ${props => props.active ? 'rgba(100, 255, 218, 0.1)' : 'transparent'};
  font-family: var(--font-mono);
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(100, 255, 218, 0.05);
    color: var(--lightest-slate);
  }

  .icon {
    opacity: 0.6;
    display: flex;
    align-items: center;
  }

  .label {
    flex: 1;
  }

  span.shortcut {
    opacity: 0.4;
    font-size: 11px;
    background: rgba(148, 180, 193, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

const QuickHint = styled(motion.div)`
  position: absolute;
  bottom: -24px;
  left: 22px;
  font-size: 10px;
  color: var(--slate);
  opacity: 0.5;
  font-family: var(--font-mono);
  white-space: nowrap;
  pointer-events: none;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--slate);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    background: rgba(234, 224, 207, 0.1);
    color: var(--green);
  }
`;

const CommandMenuContainer = styled(motion.div)`
  position: absolute;
  ${props => props.verticalDirection === 'down' ? 'top: 72px;' : 'bottom: 72px;'}
  ${props => props.expandDirection === 'left' ? 'right: 0;' : 'left: 0;'}
  padding: 24px;
  background: rgba(10, 25, 47, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(100, 255, 218, 0.15);
  border-radius: 16px;
  width: min(550px, 95vw);
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
  pointer-events: auto;
  
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
  }

  .menu-section {
    margin-bottom: 0;
  }

  .section-title {
    font-size: 10px;
    color: var(--green);
    margin-bottom: 12px;
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const QuickAction = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--slate);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 4px;

  span {
    flex: 1;
  }

  .cmd-badge {
    font-size: 9px;
    font-family: var(--font-mono);
    color: var(--green);
    opacity: 0.4;
    background: rgba(100, 255, 218, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    margin-left: 8px;
  }

  &:hover {
    background: rgba(100, 255, 218, 0.08);
    color: var(--lightest-slate);
    transform: translateX(4px);

    .cmd-badge {
      opacity: 0.8;
    }
  }

  svg {
    font-size: 14px;
    color: var(--green);
    opacity: 0.7;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const KeyHint = styled(motion.div)`
  position: absolute;
  ${props => props.verticalDirection === 'down' ? 'bottom: -40px;' : 'top: -40px;'}
  background: var(--light-navy);
  color: var(--green);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 10px;
  font-family: var(--font-mono);
  border: 1px solid var(--green);
  white-space: nowrap;
  pointer-events: none;
`;

const FeedbackMessage = styled(motion.div)`
  position: absolute;
  ${props => props.verticalDirection === 'down' ? 'top: 72px;' : 'bottom: 72px;'}
  ${props => props.expandDirection === 'left' ? 'right: 0;' : 'left: 0;'}
  background: rgba(10, 25, 47, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(234, 224, 207, 0.2);
  border-radius: 8px;
  padding: 8px 16px;
  color: var(--green);
  font-family: var(--font-mono);
  font-size: 12px;
  pointer-events: none;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  max-width: 300px;
  text-align: ${props => props.side === 'left' ? 'right' : 'left'};
  white-space: pre-wrap;
  flex-shrink: 0;
`;

const HelpTooltip = styled(motion.div)`
  position: absolute;
  ${props => props.verticalDirection === 'down' ? 'top: 72px;' : 'bottom: 72px;'}
  ${props => props.expandDirection === 'left' ? 'right: 0;' : 'left: 0;'}
  background: rgba(10, 25, 47, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(234, 224, 207, 0.1);
  border-radius: 12px;
  padding: 16px;
  color: var(--slate);
  font-family: var(--font-mono);
  font-size: 11px;
  width: 220px;
  pointer-events: none;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  flex-shrink: 0;

  strong {
    color: var(--green);
    display: block;
    margin-bottom: 8px;
    font-size: 12px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
  }
`;

const CommandLauncher = () => {
  const [command, setCommand] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('portfolio_cmd_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [expandDirection, setExpandDirection] = useState('left');
  const [verticalDirection, setVerticalDirection] = useState('up');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const commands = [
    { cmd: '/about', desc: 'bio', icon: <FiUser /> },
    { cmd: '/experience', desc: 'path', icon: <FiBriefcase /> },
    { cmd: '/projects', desc: 'works', icon: <FiFolder /> },
    { cmd: '/contact', desc: 'link', icon: <FiMail /> },
    { cmd: '/home', desc: 'main', icon: <FiHome /> },
    { cmd: 'ls', desc: 'dir', icon: <FiFolder /> },
    { cmd: 'help', desc: 'man', icon: <FiInfo /> },
    { cmd: 'clear', desc: 'cls', icon: <FiHash /> },
    { cmd: 'whoami', desc: 'user', icon: <FiUser /> },
    { cmd: 'skills', desc: 'tech', icon: <FiBriefcase /> },
    { cmd: 'socials', desc: 'social', icon: <FiHash /> },
    { cmd: 'date', desc: 'time', icon: <FiHash /> },
    { cmd: 'neofetch', desc: 'system', icon: <FiTerminal /> },
    { cmd: 'joke', desc: 'fun', icon: <FiSmile /> },
    { cmd: 'weather', desc: 'sky', icon: <FiCloud /> },
    { cmd: 'git checkout main', desc: 'branch', icon: <FiHash /> }
  ];

  useEffect(() => {
    localStorage.setItem('portfolio_cmd_history', JSON.stringify(history.slice(0, 50)));
  }, [history]);

  useEffect(() => {
    if (command) {
      const filtered = commands.filter(c => 
        c.cmd.toLowerCase().startsWith(command.toLowerCase())
      );
      setSuggestions(filtered);
      setSuggestionIndex(0);
    } else {
      setSuggestions([]);
    }
  }, [command]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = suggestions.length > 0 && suggestionIndex !== -1 
        ? suggestions[suggestionIndex].cmd 
        : command.trim().toLowerCase();
        
      if (!cmd) return;

      setHistory(prev => [cmd, ...prev.filter(h => h !== cmd)]);
      setHistoryIndex(-1);
      processCommand(cmd);
      setCommand('');
      setSuggestions([]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSuggestionIndex(prev => (prev <= 0 ? suggestions.length - 1 : prev - 1));
      } else if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSuggestionIndex(prev => (prev >= suggestions.length - 1 ? 0 : prev + 1));
      } else if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 1) {
        setSuggestionIndex(prev => (prev >= suggestions.length - 1 ? 0 : prev + 1));
      } else if (suggestions.length === 1) {
        setCommand(suggestions[0].cmd);
      }
    } else if (e.key === 'Escape') {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsMinimized(true);
    setCommand('');
    setSuggestions([]);
    setShowHelp(false);
    inputRef.current?.blur();
  };

  const processCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    
    if (cleanCmd === 'clear') {
      setFeedback('');
      return;
    }

    if (cleanCmd === '/about' || cleanCmd === 'git checkout about' || cleanCmd === 'goto about') {
      executeNavigation('about', "Switching to 'about'...");
    } else if (cleanCmd === '/experience' || cleanCmd === 'git checkout experience' || cleanCmd === '/journey') {
      executeNavigation('experience', "Loading path...");
    } else if (cleanCmd === '/projects' || cleanCmd === 'git checkout projects') {
      executeNavigation('projects', "Opening works...");
    } else if (cleanCmd === '/contact' || cleanCmd === 'git checkout contact') {
      executeNavigation('contact', "Linking up...");
    } else if (cleanCmd === '/home' || cleanCmd === 'git checkout main') {
      executeNavigation('home', "Returning to main...");
    } else if (cleanCmd === 'who' || cleanCmd === 'whoami') {
      setFeedback('Edbert Ocampo: Lecturer & Technology Professional.');
    } else if (cleanCmd === 'ls') {
      setFeedback('drwxr-xr-x  about/  experience/  projects/  contact/  home/  README.md');
    } else if (cleanCmd === 'help') {
      setShowHelp(true);
      setTimeout(() => setShowHelp(false), 8000);
    } else if (cleanCmd === 'git status') {
      setFeedback('On branch main. Portfolio clean. Nothing to commit, working tree clean.');
    } else if (cleanCmd === 'skills') {
      setFeedback('React, Python, SQL, HTML/CSS, JS, Business Analytics, Data Science, Freelancing.');
    } else if (cleanCmd === 'socials') {
      setFeedback('GitHub: @edbertocampo | LinkedIn: edbert-ocampo | Email: 02.ocampo.edbert@gmail.com');
    } else if (cleanCmd === 'date') {
      const options = { timeZone: 'Asia/Manila', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      setFeedback('Manila: ' + new Intl.DateTimeFormat('en-US', options).format(new Date()));
    } else if (cleanCmd === 'neofetch') {
      setFeedback('Edbert@Portfolio-v1 \n ------------------ \n OS: Antigravity OS \n Roles: Lecturer, Dev, VA \n Shell: portfolio-sh \n CPU: Human Intelligence \n Memory: 100% Passion');
    } else if (cleanCmd === 'joke') {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs.",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
        "A SQL query walks into a bar, walks up to two tables, and asks, 'Can I join you?'"
      ];
      setFeedback(jokes[Math.floor(Math.random() * jokes.length)]);
    } else if (cleanCmd === 'weather') {
      setFeedback('Status: 100% Digital Sunshine. Humidity: 0%. Forecast: Pure Creativity.');
    } else if (cleanCmd.startsWith('echo ')) {
      setFeedback(cleanCmd.slice(5));
    } else {
      setFeedback(`sh: command not found: ${cleanCmd}`);
    }
  };

  const executeNavigation = (sectionId, message) => {
    setFeedback(message);
    
    setTimeout(() => {
      const targetPath = sectionId === 'home' ? '/' : `/${sectionId}`;
      
      if (location.pathname === targetPath) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(targetPath);
      }
      
      setFeedback('');
      handleClose();
    }, 500);
  };

  const updateExpandDirection = (point) => {
    if (!containerRef.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = point ? point.x : rect.left;
    const y = point ? point.y : rect.top;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    if (x < screenWidth / 2) {
      setExpandDirection('right');
    } else {
      setExpandDirection('left');
    }

    if (y < screenHeight / 2) {
      setVerticalDirection('down');
    } else {
      setVerticalDirection('up');
    }
  };

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(''), 8000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        updateExpandDirection();
        setIsMinimized(false);
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <CommandLauncherContainer
      ref={containerRef}
      drag={isMinimized}
      dragMomentum={false}
      dragConstraints={{ 
        left: -(window.innerWidth - 100), 
        right: 0, 
        top: -(window.innerHeight - 100), 
        bottom: 0 
      }}
      onDragEnd={(e, info) => updateExpandDirection(info.point)}
      expandDirection={expandDirection}
      verticalDirection={verticalDirection}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      <TerminalWrapper
        minimized={isMinimized}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if (isMinimized) {
            updateExpandDirection();
            setIsMinimized(false);
            setTimeout(() => inputRef.current?.focus(), 150);
          }
        }}
        transition={{ 
          type: 'spring', damping: 25, stiffness: 200 
        }}
      >
        <AnimatePresence mode="wait">
          {isMinimized ? (
            <motion.div
              key="bubble-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <FiTerminal size={24} color="var(--green)" />
            </motion.div>
          ) : (
            <motion.div
              key="expanded-input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '12px' }}
            >
              <Prompt>~/</Prompt>
              <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                <Input
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleCommand}
                  onBlur={() => {
                    setTimeout(() => {
                      if (document.activeElement !== inputRef.current) {
                        handleClose();
                      }
                    }, 200);
                  }}
                  placeholder="Search or type a command..."
                  autoFocus
                />
              </div>
              <CloseButton onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }} title="Close (ESC)">
                <FiX size={18} />
              </CloseButton>
              <FiCommand size={18} color="var(--green)" style={{ opacity: 0.5, flexShrink: 0 }} />
              
              <QuickHint
                verticalDirection={verticalDirection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Press <strong>Enter</strong> to run • <strong>↑↓</strong> to navigate • <strong>ESC</strong> to close
              </QuickHint>
            </motion.div>
          )}
        </AnimatePresence>
      </TerminalWrapper>

      <AnimatePresence>
        {isMinimized && isHovered && (
          <KeyHint
            verticalDirection={verticalDirection}
            initial={{ opacity: 0, y: verticalDirection === 'down' ? -10 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: verticalDirection === 'down' ? -10 : 10 }}
          >
            Press <strong>/</strong> to command
          </KeyHint>
        )}
        
        {!isMinimized && !command && !feedback && !showHelp && (
          <CommandMenuContainer
            verticalDirection={verticalDirection}
            expandDirection={expandDirection}
            initial={{ opacity: 0, scale: 0.95, y: verticalDirection === 'down' ? -20 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: verticalDirection === 'down' ? -20 : 20 }}
            onMouseDown={(e) => e.preventDefault()} // Prevent input blur when clicking menu
          >
            <div className="menu-section">
              <div className="section-title"><FiArrowRight size={10} /> Navigation</div>
              <QuickAction onClick={() => { setCommand('/about'); setTimeout(() => processCommand('/about'), 10); }}>
                <FiUser /> <span>About Me</span> <div className="cmd-badge">/about</div>
              </QuickAction>
              <QuickAction onClick={() => { setCommand('/projects'); setTimeout(() => processCommand('/projects'), 10); }}>
                <FiFolder /> <span>Projects</span> <div className="cmd-badge">/projects</div>
              </QuickAction>
              <QuickAction onClick={() => { setCommand('/experience'); setTimeout(() => processCommand('/experience'), 10); }}>
                <FiBriefcase /> <span>Experience</span> <div className="cmd-badge">/experience</div>
              </QuickAction>
              <QuickAction onClick={() => { setCommand('/contact'); setTimeout(() => processCommand('/contact'), 10); }}>
                <FiMail /> <span>Contact</span> <div className="cmd-badge">/contact</div>
              </QuickAction>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="menu-section">
                <div className="section-title"><FiArrowRight size={10} /> Utilities</div>
                <QuickAction onClick={() => { processCommand('neofetch'); }}>
                  <FiTerminal /> <span>System Info</span> <div className="cmd-badge">neofetch</div>
                </QuickAction>
                <QuickAction onClick={() => { processCommand('skills'); }}>
                  <FiBriefcase /> <span>Technical Skills</span> <div className="cmd-badge">skills</div>
                </QuickAction>
                <QuickAction onClick={() => { processCommand('date'); }}>
                  <FiHash /> <span>Current Time</span> <div className="cmd-badge">date</div>
                </QuickAction>
              </div>

              <div className="menu-section">
                <div className="section-title"><FiArrowRight size={10} /> Fun</div>
                <QuickAction onClick={() => { processCommand('joke'); }}>
                  <FiSmile /> <span>Tell me a Joke</span> <div className="cmd-badge">joke</div>
                </QuickAction>
                <QuickAction onClick={() => { processCommand('weather'); }}>
                  <FiCloud /> <span>Digital Weather</span> <div className="cmd-badge">weather</div>
                </QuickAction>
                <QuickAction onClick={() => { processCommand('ls'); }}>
                  <FiFolder /> <span>List Files</span> <div className="cmd-badge">ls</div>
                </QuickAction>
              </div>
            </div>
          </CommandMenuContainer>
        )}

        {suggestions.length > 0 && !isMinimized && (
          <SuggestionsContainer
            verticalDirection={verticalDirection}
            initial={{ opacity: 0, scale: 0.95, y: verticalDirection === 'down' ? -10 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: verticalDirection === 'down' ? -10 : 10 }}
          >
            {suggestions.map((s, i) => (
              <SuggestionItem 
                key={s.cmd} 
                active={i === suggestionIndex}
                onClick={(e) => {
                  e.stopPropagation();
                  setCommand(s.cmd);
                  setTimeout(() => {
                    processCommand(s.cmd);
                    setCommand('');
                    setSuggestions([]);
                  }, 10);
                }}
              >
                <div className="icon">{s.icon}</div>
                <div className="label">{s.cmd}</div>
                <span className="shortcut">{s.desc}</span>
              </SuggestionItem>
            ))}
          </SuggestionsContainer>
        )}
        {feedback && !isMinimized && (
          <FeedbackMessage
            side={expandDirection}
            verticalDirection={verticalDirection}
            initial={{ opacity: 0, scale: 0.8, y: verticalDirection === 'down' ? -10 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: verticalDirection === 'down' ? 10 : -10 }}
          >
            {feedback}
          </FeedbackMessage>
        )}
        {showHelp && !isMinimized && (
          <HelpTooltip
            verticalDirection={verticalDirection}
            initial={{ opacity: 0, scale: 0.9, y: verticalDirection === 'down' ? -10 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: verticalDirection === 'down' ? 10 : -10 }}
          >
            <strong>Terminal Help:</strong>
            <ul>
              <li><span>/about</span> <span>→ bio</span></li>
              <li><span>/projects</span> <span>→ works</span></li>
              <li><span>/journey</span> <span>→ path</span></li>
              <li><span>neofetch</span> <span>→ info</span></li>
              <li><span>skills</span> <span>→ tech</span></li>
              <li><span>ESC</span> <span>→ hide</span></li>
            </ul>
          </HelpTooltip>
        )}
      </AnimatePresence>
    </CommandLauncherContainer>
  );
};

export default CommandLauncher;
