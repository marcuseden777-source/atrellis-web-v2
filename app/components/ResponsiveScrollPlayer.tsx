'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * ResponsiveScrollPlayer
 * 
 * A high-performance component that swaps between Desktop (16:9) and Mobile (9:16) 
 * video assets based on viewport width. It ensures that only the relevant asset 
 * is fetched and handles complex ScrollTrigger scrubbing.
 */

// Source Constants
const DESKTOP_SOURCE = '/assets/scroll-animation-desktop.mp4';
const MOBILE_SOURCE = '/assets/scroll-animation-mobile.mp4';

interface ResponsiveScrollPlayerProps {
  className?: string;
  onComplete?: () => void;
}

export default function ResponsiveScrollPlayer({
  className = '',
  onComplete,
}: ResponsiveScrollPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // State for responsive switching
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile' | null>(null);

  // 1. Device Detection & Switching Logic
  useEffect(() => {
    const handleResize = () => {
      const isMobileSize = window.innerWidth <= 768;
      const nextType = isMobileSize ? 'mobile' : 'desktop';
      
      if (nextType !== deviceType) {
        setDeviceType(nextType);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [deviceType]);

  // 2. Asset Source Determination (Performance: Only the active source is provided to the video tag)
  const activeSource = useMemo(() => {
    if (!deviceType) return null;
    return deviceType === 'mobile' ? MOBILE_SOURCE : DESKTOP_SOURCE;
  }, [deviceType]);

  // 3. GSAP & ScrollTrigger Initialization
  useEffect(() => {
    if (!deviceType || !videoRef.current || !containerRef.current) return;

    // Clear existing ScrollTriggers to prevent overlaps during resize/switch
    ScrollTrigger.getAll().forEach(st => st.kill());

    const video = videoRef.current;
    const container = containerRef.current;

    const initAnimation = () => {
      const duration = video.duration;
      if (!duration) return;

      gsap.to(video, {
        currentTime: duration,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          // Adjust scroll length based on aspect ratio/device
          end: deviceType === 'mobile' ? '+=300%' : '+=500%', 
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          markers: false,
          onUpdate: (self) => {
            // Safety check for video scrubbing completion
            if (self.progress === 1 && onComplete) {
              onComplete();
            }
          }
        }
      });

      // Refresh to ensure markers/pins are recalculated for the current DOM state
      ScrollTrigger.refresh();
    };

    // Handle video metadata loading
    if (video.readyState >= 1) {
      initAnimation();
    } else {
      video.addEventListener('loadedmetadata', initAnimation);
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      video.removeEventListener('loadedmetadata', initAnimation);
    };
  }, [deviceType, onComplete]);

  // SSR Safe: Return empty container until hydrated
  if (!deviceType) {
    return <div className={`w-full bg-black ${className}`} style={{ height: '100vh' }} />;
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full bg-black overflow-hidden ${className}`}
      style={{ height: '100vh' }}
    >
      {/* 
        Key prop forces React to unmount and remount when deviceType changes.
        This prevents the browser from potentially downloading both sources 
        and ensures a clean state for the new video.
      */}
      <video
        key={deviceType}
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      >
        <source src={activeSource!} type="video/mp4" />
      </video>
      
      {/* Overlay Content Placeholder */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        {/* Your content here */}
      </div>
    </div>
  );
}
