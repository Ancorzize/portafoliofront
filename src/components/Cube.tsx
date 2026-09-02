
import React, { useMemo } from 'react';

const Cube: React.FC<{ index: number }> = React.memo(({ index }) => {

  const config = useMemo(() => ({
    left: `${(index * 7) + Math.random() * 5}%`,
    size: `${20 + Math.random() * 30}px`,
    delay: `${Math.random() * 10}s`,
    duration: `${12 + Math.random() * 8}s`,
  }), [index]);

  return (
    <div
      className="cube-animation absolute bg-purple-500/40 border border-purple-300/30 rounded-sm"
      style={{
        left: config.left,
        width: config.size,
        height: config.size,
        animationDelay: config.delay,
        animationDuration: config.duration,
        top: '-60px',
      }}
    />
  );
});

export default Cube;