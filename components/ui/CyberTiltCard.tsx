'use client';

import React, { useState, useRef } from 'react';

interface CyberTiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export const CyberTiltCard: React.FC<CyberTiltCardProps> = ({
  children,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle natural tilt (-8deg to +8deg)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
    );

    // Glare position
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle(
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    );
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.3s ease'
          : 'transform 0.5s ease-in-out, box-shadow 0.5s ease',
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(4,139,162,0.15),0_0_0_1.5px_rgba(4,139,162,0.5)] group cursor-default transition-all ${className}`}
    >
      {/* 1. Unified Single-Color Teal Ambient Glows */}
      <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full bg-[#048BA2]/12 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-44 h-44 rounded-full bg-[#048BA2]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* 2. Cyber Circuit Scan Beam (Teal) */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-transparent via-[#048BA2]/8 to-transparent pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100 animate-scan' : 'opacity-0'
        }`}
      />

      {/* 3. Subtle Cyber Circuit Trace Lines (Teal) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="absolute top-[25%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#048BA2]/30 to-transparent animate-cyber-line-1" />
        <span className="absolute top-[75%] right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#048BA2]/25 to-transparent animate-cyber-line-2" />
      </div>

      {/* 4. Refined Corner HUD Brackets */}
      <div className="absolute inset-0 pointer-events-none p-3.5">
        <span className="absolute top-3.5 left-3.5 w-3.5 h-3.5 border-t-2 border-l-2 border-slate-200 group-hover:border-[#048BA2] group-hover:shadow-[0_0_6px_rgba(4,139,162,0.4)] rounded-tl-sm transition-all duration-300" />
        <span className="absolute top-3.5 right-3.5 w-3.5 h-3.5 border-t-2 border-r-2 border-slate-200 group-hover:border-[#048BA2] group-hover:shadow-[0_0_6px_rgba(4,139,162,0.4)] rounded-tr-sm transition-all duration-300" />
        <span className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 border-b-2 border-l-2 border-slate-200 group-hover:border-[#048BA2] group-hover:shadow-[0_0_6px_rgba(4,139,162,0.4)] rounded-bl-sm transition-all duration-300" />
        <span className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 border-b-2 border-r-2 border-slate-200 group-hover:border-[#048BA2] group-hover:shadow-[0_0_6px_rgba(4,139,162,0.4)] rounded-br-sm transition-all duration-300" />
      </div>

      {/* 5. Natural Glass Glare */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 260px at ${glarePosition.x}% ${glarePosition.y}%, rgba(4, 139, 162, 0.08), transparent 70%)`,
        }}
      />

      {/* 6. Card Foreground Content */}
      <div className="relative z-10 p-7 sm:p-8 flex flex-col justify-between gap-6 h-full">
        {children}
      </div>
    </div>
  );
};
