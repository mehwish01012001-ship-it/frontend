import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'md', fullscreen = false }) => {
  return (
    <div className={`spinner-container ${fullscreen ? 'fullscreen' : ''}`}>
      <div className={`spinner spinner-${size}`}></div>
    </div>
  );
};

export default LoadingSpinner;
