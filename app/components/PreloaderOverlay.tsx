'use client';

import { useEffect, useRef } from 'react';
import { usePreloader } from './PreloaderContext';

export default function PreloaderOverlay() {
  const { isVisible, hidePreloader } = usePreloader();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Fail-safe: hide preloader after 8 seconds regardless
    const timer = setTimeout(hidePreloader, 8000);
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
        onEnded={hidePreloader}
        onLoadedData={() => {
          // Attempt to play if autoplay was blocked
          videoRef.current?.play().catch(() => {});
        }}
      />
    </div>
  );
}
