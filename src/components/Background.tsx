import React from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

const Background: React.FC = () => {
  const { x, y } = useMousePosition();

  return (
    <div className="fixed inset-0 -z-10 w-full h-full bg-[#0a0514] overflow-hidden">
      
      <div 
        className="absolute pointer-events-none rounded-full bg-purple-600/15 blur-[120px] pointer-events-none"
        style={{
          left: `${x - 200}px`,
          top: `${y - 200}px`,
          width: '400px',
          height: '400px',
        }}
      />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none"></div>
    </div>
  );
};

export default Background;