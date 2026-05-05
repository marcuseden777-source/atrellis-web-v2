'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImg: string;
  afterImg: string;
  projectName: string;
}

export default function BeforeAfterSlider({ beforeImg, afterImg, projectName }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/10] md:aspect-video rounded-3xl overflow-hidden cursor-ew-resize group select-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image (Background) */}
      <Image 
        src={afterImg} 
        alt={`${projectName} After`}
        fill
        className="object-cover"
      />
      
      {/* Before Image (Foreground, Clipped) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <Image 
          src={beforeImg} 
          alt={`${projectName} Before`}
          fill
          className="object-cover grayscale-[0.5] contrast-[0.8]"
        />
        {/* Before Label */}
        <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md px-4 py-1 rounded-full text-[0.6rem] font-bold tracking-[2px] uppercase text-white/60 border border-white/10">
          Before
        </div>
      </div>

      {/* After Label */}
      <div className="absolute top-8 right-8 bg-blue-500/80 backdrop-blur-md px-4 py-1 rounded-full text-[0.6rem] font-bold tracking-[2px] uppercase text-white border border-white/20">
        Atrellis Final
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transition-transform group-active:scale-90">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}
