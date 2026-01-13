import React from 'react';
import { ANIMATION_CONFIG } from '../config/images';

function Duck({ src, initialX, initialY, targetX, targetY, currentStep, index }) {
  // Calculate current position based on step (0-15)
  const progress = currentStep / 15; // 0 to 1
  
  const currentX = initialX + (targetX - initialX) * progress;
  const currentY = initialY + (targetY - initialY) * progress;
  
  const duckStyle = {
    position: 'absolute',
    left: `${currentX}%`,
    top: `${currentY}%`,
    width: '60px',
    height: '60px',
    transition: `all ${ANIMATION_CONFIG.duration} ${ANIMATION_CONFIG.easing}`,
    transform: currentStep > 0 ? `scale(${1 + progress * 0.2}) rotate(${progress * 10}deg)` : 'scale(1)',
    zIndex: 10 + index,
  };

  return (
    <img
      src={src}
      alt={`Duck ${index + 1}`}
      className="rounded-full border-2 border-white shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={duckStyle}
      onError={(e) => {
        // Fallback if image fails to load
        e.target.style.display = 'none';
      }}
    />
  );
}

export default Duck;
