'use client';

import { useEffect, useRef } from 'react';

interface TiltContainerProps {
  children: React.ReactNode;
}

export default function TiltContainer({ children }: TiltContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Reduced sensitivity for full-screen effect
      const rotateX = ((centerY - y) / 30) * -1;
      const rotateY = ((x - centerX) / 30) * -1;
      
      container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    // <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out"
        ref={containerRef}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    // </div>
  );
} 