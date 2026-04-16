'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePreloader } from './PreloaderContext';

export default function PreloaderOverlay() {
  const { isVisible, hidePreloader, framesLoaded } = usePreloader();
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Requirement: Gate opens after video plays once AND 30 frames are cached
  const checkGate = useCallback(() => {
    if (videoEnded && framesLoaded >= 30) {
      hidePreloader();
    }
  }, [videoEnded, framesLoaded, hidePreloader]);

  useEffect(() => {
    checkGate();
  }, [checkGate]);

  useEffect(() => {
    // Fail-safe: hide preloader after 12 seconds regardless
    const timer = setTimeout(hidePreloader, 12000);
    return () => clearTimeout(timer);
  }, [hidePreloader]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-1000"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <video
        ref={videoRef}
        src="/assets/preloader.mp4"
        className="w-full h-full object-cover"
        muted
        playsInline
        autoPlay
        onEnded={() => setVideoEnded(true)}
        onLoadedData={() => {
          videoRef.current?.play().catch(() => {});
        }}
      />
      
      {/* Progress Indicator (Optional but helpful for Step 1) */}
      <div className="absolute bottom-12 left-12 flex flex-col gap-2">
        <div className="text-[0.6rem] uppercase tracking-[4px] text-white/40">
          Caching Digital Environment: {Math.min(100, Math.round((framesLoaded / 30) * 100))}%
        </div>
        <div className="w-48 h-[1px] bg-white/10">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${Math.min(100, (framesLoaded / 30) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
