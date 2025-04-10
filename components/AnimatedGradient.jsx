'use client';

import { useEffect, useState } from 'react';

const AnimatedGradient = () => {
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setGradientPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="absolute inset-0 -z-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"
      style={{
        backgroundPosition: `${gradientPosition.x}% ${gradientPosition.y}%`,
        transition: 'background-position 0.5s ease-out',
      }}
    />
  );
};

export default AnimatedGradient;