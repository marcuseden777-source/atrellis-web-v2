'use client';

import { useEffect, useRef, useState } from 'react';

interface ResponsiveScrollPlayerProps {
  className?: string;
  onFramesLoaded?: (count: number) => void;
  onComplete?: () => void;
}

export default function ResponsiveScrollPlayer({
  className = '',
  onFramesLoaded,
  onComplete,
}: ResponsiveScrollPlayerProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate loading for the parent component to reveal the UI smoothly
    const timer = setTimeout(() => {
      setIsReady(true);
      if (onFramesLoaded) onFramesLoaded(100);
      if (onComplete) onComplete();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onFramesLoaded, onComplete]);

  return (
    <div 
      className={`relative w-full h-full bg-black overflow-hidden ${className}`}
    >
      <video
        src="/assets/scroll-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
        onCanPlayThrough={() => setIsReady(true)}
      />
      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#0a1628] via-black to-black">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white/90 mb-4">
            Engineer.<br />
            <em className="font-serif italic text-white/40">Design.</em><br />
            Build.
          </h2>
          <p className="text-white/30 text-sm uppercase tracking-[4px] mt-6">Loading cinematic experience...</p>
        </div>
      )}
    </div>
  );
}
