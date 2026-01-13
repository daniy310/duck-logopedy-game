import React, { useState } from 'react';
import Duck from './Duck';
import { IMAGES } from '../config/images';

function LakeScene() {
  const [currentStep, setCurrentStep] = useState(0);

  // Generate duck positions in a semi-circle formation
  const generateDuckPositions = () => {
    const ducks = [];
    const numDucks = 12; // Many ducks as requested
    
    // Target position (where all ducks will converge)
    const targetX = 50; // 50% from left
    const targetY = 80; // 80% from top
    
    // Semi-circle parameters - MUCH BIGGER radius
    const radius = 55; // Increased from 35 to 55 for much larger arc
    
    for (let i = 0; i < numDucks; i++) {
      // Calculate angle for semi-circle (180 degrees total)
      // Spread ducks from left (π) to right (0)
      const angle = Math.PI - (i / (numDucks - 1)) * Math.PI;
      
      // Calculate initial position in semi-circle formation
      const initialX = targetX + radius * Math.cos(angle);
      const initialY = targetY - Math.abs(radius * Math.sin(angle)) * 0.8; // Slightly flattened arc
      
      // Use different duck images, cycling through available ones
      const duckImage = IMAGES.ducks[i % IMAGES.ducks.length];
      
      ducks.push({
        id: i,
        src: duckImage,
        initialX: Math.max(2, Math.min(98, initialX)), // Keep within screen bounds with more buffer
        initialY: Math.max(2, Math.min(70, initialY)), // Keep within reasonable bounds, higher up
        targetX: targetX,
        targetY: targetY
      });
    }
    
    return ducks;
  };

  const ducks = generateDuckPositions();

  const handleLakeClick = () => {
    if (currentStep < 15) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const resetDucks = () => {
    setCurrentStep(0);
  };

  const getStepMessage = () => {
    if (currentStep === 0) return "Faceți clic oriunde pentru a face rățuștele să înoate mai aproape! 🦆🦆";
    if (currentStep === 15) return "Toate rățuștele au ajuns în centru! Bravo! 🎉";
    return `Pasul ${currentStep} din 15 - Continuați să faceți clic! 🦆`;
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-blue-100 cursor-pointer"
      onClick={handleLakeClick}
    >
      {/* Lake Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${IMAGES.lake})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay to ensure ducks are visible */}
        <div className="absolute inset-0 bg-blue-500/10"></div>
      </div>
      
      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-white/90 rounded-lg p-3 shadow-lg z-20 max-w-xs">
        <p className="text-sm font-medium text-gray-700">
          {getStepMessage()}
        </p>
        {currentStep > 0 && (
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 15) * 100}%` }}
            ></div>
          </div>
        )}
      </div>
      
      {/* Ducks */}
      {ducks.map((duck) => (
        <Duck
          key={duck.id}
          src={duck.src}
          initialX={duck.initialX}
          initialY={duck.initialY}
          targetX={duck.targetX}
          targetY={duck.targetY}
          currentStep={currentStep}
          index={duck.id}
        />
      ))}
      
      {/* Reset Button */}
      <button 
        className="absolute bottom-4 right-4 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-full shadow-lg transition-colors duration-200 z-20"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering lake click
          resetDucks();
        }}
      >
        Resetați Rățuștele 🔄
      </button>
      
      {/* Step Counter */}
      <div className="absolute top-4 right-4 bg-white/90 rounded-full px-4 py-2 shadow-lg z-20">
        <span className="text-lg font-bold text-gray-700">
          {currentStep}/15
        </span>
      </div>
      
      {/* Success Message */}
      {currentStep === 15 && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-30">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Felicitări!
            </h2>
            <p className="text-gray-600 mb-4">
              Toate rățuștele au înotat spre centrul lacului!
            </p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                resetDucks();
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              Joacă din nou! 🦆
            </button>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-blue-900/80 text-white text-center py-1 text-xs">
        <span>Dezvoltat cu AI prin vibecoding cu ajutorul </span>
        <a 
          href="https://biela.dev/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-yellow-300 hover:text-yellow-200 underline"
        >
          Biela.dev
        </a>
        <span>, creat de </span>
        <a 
          href="https://teachmecode.ae/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-yellow-300 hover:text-yellow-200 underline"
        >
          TeachMeCode® Institute
        </a>
      </div>
    </div>
  );
}

export default LakeScene;
