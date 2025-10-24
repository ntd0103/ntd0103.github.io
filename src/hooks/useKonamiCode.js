import { useEffect, useState } from 'react';

export default function useKonamiCode() {
  const [activated, setActivated] = useState(false);
  
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    
    let konamiIndex = 0;
    
    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setActivated(true);
          konamiIndex = 0;
          
          // Easter egg effect
          document.body.style.animation = 'rainbowText 2s linear infinite';
          
          // Show celebration
          const celebration = document.createElement('div');
          celebration.innerHTML = '🎉🎊🎈';
          celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 100px;
            z-index: 10000;
            animation: pulse 1s ease-in-out;
            pointer-events: none;
          `;
          document.body.appendChild(celebration);
          
          setTimeout(() => {
            document.body.removeChild(celebration);
            document.body.style.animation = '';
          }, 2000);
        }
      } else {
        konamiIndex = 0;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return activated;
}
