import React, { useEffect } from 'react';
import './Loader.css';

const Loader = ({ onComplete }) => {
  useEffect(() => {
    const timer = window.setTimeout(() => onComplete?.(), 8000);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="luxury-loader-screen" aria-label="RQ Fashion loading animation">
      <div className="luxury-loader-backdrop" />
      <div className="luxury-loader-glow" />

      <div className="luxury-particles" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, index) => (
          <span
            key={index}
            className="luxury-particle"
            style={{
              '--x': `${(index % 6) * 16 + 8}%`,
              '--y': `${Math.floor(index / 6) * 16 + 8}%`,
              '--delay': `${index * 0.12}s`,
              '--duration': `${4.2 + (index % 5) * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="luxury-ring" aria-hidden="true">
        <div className="luxury-ring-stroke" />
      </div>

      <div className="luxury-logo">RQ</div>

      <div className="luxury-brand" aria-hidden="true">
        {['R', 'Q', ' ', 'F', 'A', 'S', 'H', 'I', 'O', 'N'].map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className={letter === ' ' ? 'brand-space' : ''}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>

      <div className="luxury-welcome">
        <span>Welcome to</span>
        <strong>RQ Fashion</strong>
      </div>

      <div className="luxury-taglines">
        <p style={{ animationDelay: '2.8s' }}>Where Style Meets Elegance.</p>
        <p style={{ animationDelay: '3.35s' }}>Discover timeless fashion crafted with premium quality.</p>
        <p style={{ animationDelay: '3.9s' }}>Designed for confidence, made for every occasion.</p>
      </div>

      <div className="luxury-loader-bar" aria-hidden="true">
        <div className="luxury-loader-bar-fill" />
      </div>
    </div>
  );
};

export default Loader;
