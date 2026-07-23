import React, { useEffect } from 'react';
import './Loader.css';

const Loader = ({ onComplete }) => {
  useEffect(() => {
    // Target duration strictly under 1 second (800ms)
    const timer = window.setTimeout(() => {
      onComplete?.();
    }, 800);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="rq-loader-screen" aria-label="RQ Fashion loading animation">
      <div className="rq-loader-backdrop" />
      <div className="rq-loader-glow" />

      {/* Floating accent particles */}
      <div className="rq-loader-particles" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="rq-loader-particle"
            style={{
              '--x': `${(index % 4) * 25 + 12}%`,
              '--y': `${Math.floor(index / 4) * 25 + 12}%`,
              '--delay': `${index * 0.04}s`,
              '--duration': `${0.6 + (index % 3) * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Center animation ring */}
      <div className="rq-loader-ring" aria-hidden="true">
        <div className="rq-loader-ring-stroke" />
      </div>

      {/* Brand logo */}
      <div className="rq-loader-logo">RQ</div>

      {/* Brand animated letters */}
      <div className="rq-loader-brand" aria-hidden="true">
        {['R', 'Q', ' ', 'F', 'A', 'S', 'H', 'I', 'O', 'N'].map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className={letter === ' ' ? 'rq-loader-space' : ''}
            style={{ animationDelay: `${index * 0.03}s` }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>

      <div className="rq-loader-welcome">
        <span>Welcome to</span>
        <strong>RQ Fashion</strong>
      </div>

      {/* Rapid progress bar */}
      <div className="rq-loader-bar" aria-hidden="true">
        <div className="rq-loader-bar-fill" />
      </div>
    </div>
  );
};

export default Loader;