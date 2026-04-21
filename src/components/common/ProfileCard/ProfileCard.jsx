import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import './ProfileCard.css';

// SVG Pattern for the holographic icons
const ICON_PATTERN = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2364ffda' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

const DEFAULT_INNER_GRADIENT = 'linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(10, 25, 47, 0.8) 100%)';

const ProfileCardComponent = ({
  avatarUrl = '',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor = 'rgba(100, 255, 218, 0.35)',
  behindGlowSize = '60%',
  className = '',
  enableTilt = true,
  enableMobileTilt = true,
  mobileTiltSensitivity = 10,
  name = 'Edbert Ocampo',
  title = 'Technology Professional',
  handle = 'edbertocampo',
  status = 'Online',
  contactText = 'Get in Touch',
  showUserInfo = true,
  onContactClick
}) => {
  const wrapRef = useRef(null);
  const shellRef = useRef(null);
  const containerRef = useRef(null);

  const updateOffsets = useCallback((x, y) => {
    const wrap = wrapRef.current;
    const shell = shellRef.current;
    if (!wrap || !shell) return;

    const rect = shell.getBoundingClientRect();
    const px = ((x - rect.left) / rect.width) * 100;
    const py = ((y - rect.top) / rect.height) * 100;

    const centerX = px - 50;
    const centerY = py - 50;

    wrap.style.setProperty('--pointer-x', `${px}%`);
    wrap.style.setProperty('--pointer-y', `${py}%`);
    wrap.style.setProperty('--rotate-x', `${-(centerX / 4)}deg`);
    wrap.style.setProperty('--rotate-y', `${centerY / 4}deg`);
    wrap.style.setProperty('--pointer-from-top', py / 100);
    wrap.style.setProperty('--pointer-from-left', px / 100);
    wrap.style.setProperty('--pointer-from-center', Math.hypot(centerX, centerY) / 50);
  }, []);

  const handleMouseMove = (e) => {
    if (!enableTilt) return;
    updateOffsets(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.style.setProperty('--rotate-x', '0deg');
    wrap.style.setProperty('--rotate-y', '0deg');
    wrap.style.setProperty('--card-opacity', '0');
  };

  const handleMouseEnter = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.style.setProperty('--card-opacity', '1');
  };

  return (
    <div 
      ref={wrapRef} 
      className={`pc-v2-wrapper ${className}`}
      style={{
        '--icon-pattern': `url("${ICON_PATTERN}")`,
        '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
        '--behind-glow-color': behindGlowColor,
        '--behind-glow-size': behindGlowSize
      }}
    >
      <div 
        ref={shellRef}
        className="pc-v2-shell"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="pc-v2-card">
          <div className="pc-v2-glow" />
          <div className="pc-v2-noise" />
          
          <div className="pc-v2-inside">
            <div className="pc-v2-pattern" />
            <div className="pc-v2-shine" />
            
            <div className="pc-v2-avatar-container">
              <img 
                src={avatarUrl} 
                className="pc-v2-avatar" 
                alt={name}
              />
              <div className="pc-v2-avatar-bottom-mask" />
              
              {/* Relocated text: Below head, above footer */}
              <div className="pc-v2-info-overlay">
                <h3>{name}</h3>
                <p>{title}</p>
              </div>
            </div>

            {/* <div className="pc-v2-top-info">
              <h3>{name}</h3>
              <p>{title}</p>
            </div> */}

            {showUserInfo && (
              <div className="pc-v2-footer">
                <div className="pc-v2-user">
                  <div className="pc-v2-mini-avatar">
                    <img src={avatarUrl} alt="" />
                  </div>
                  <div className="pc-v2-meta">
                    <span className="pc-v2-handle">@{handle}</span>
                    <span className="pc-v2-status">{status}</span>
                  </div>
                </div>
                <button className="pc-v2-btn" onClick={onContactClick}>
                  {contactText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {behindGlowEnabled && <div className="pc-v2-behind-glow" />}
    </div>
  );
};

export default ProfileCardComponent;
