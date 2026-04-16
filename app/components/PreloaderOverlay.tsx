'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { usePreloader } from './PreloaderContext';
import { usePathname } from 'next/navigation';

export default function PreloaderOverlay() {
  const { isVisible, hidePreloader, framesLoaded } = usePreloader();
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();

  // If we are NOT on the home page, we don't need to wait for frame caching
  const isHomePage = pathname === '/';

  // Requirement: Gate opens after video plays once AND (if on home page) 30 frames are cached
  const checkGate = useCallback(() => {
    if (videoEnded) {
      if (!isHomePage || framesLoaded >= 30) {
        hidePreloader();
      }
    }
  }, [videoEnded, framesLoaded, hidePreloader, isHomePage]);

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
      
      {/* Progress Indicator (Only visible on home page loading) */}
      {isHomePage && (
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
      )}
    </div>
  );
}
