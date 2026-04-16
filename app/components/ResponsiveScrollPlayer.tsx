'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ResponsiveScrollPlayer - V3 (Canvas Frame Scrubber)
 * 
 * Implements a high-performance canvas-based image sequence player.
 * Maps scroll position to 259 JPEGs for "Cinema Scroll" experience.
 */

const TOTAL_FRAMES = 259;
const FRAME_PREFIX = '/assets/frames/ezgif-frame-';
const FRAME_SUFFIX = '.jpg';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  // 1. Preload Frames
  useEffect(() => {
    let loadedCount = 0;
    const preloadFrames = () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(3, '0');
        img.src = `${FRAME_PREFIX}${frameIndex}${FRAME_SUFFIX}`;
        img.onload = () => {
          loadedCount++;
          if (onFramesLoaded) onFramesLoaded(loadedCount);
          if (loadedCount === 30) {
            // "Gate opens" logic - we have enough buffer to start
            setIsReady(true);
          }
        };
        framesRef.current[i] = img;
      }
    };

    preloadFrames();
  }, [onFramesLoaded]);

  // 2. Canvas Rendering & GSAP Scrubbing
  useEffect(() => {
    if (!isReady || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Initial Frame Draw
    const renderFrame = (index: number) => {
      const img = framesRef.current[Math.floor(index)];
      if (img && img.complete) {
        // Handle responsive canvas sizing
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;

        // Cover logic
        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;
        let drawW, drawH, drawX, drawY;

        if (canvasRatio > imgRatio) {
          drawW = w;
          drawH = w / imgRatio;
          drawX = 0;
          drawY = (h - drawH) / 2;
        } else {
          drawW = h * imgRatio;
          drawH = h;
          drawX = (w - drawW) / 2;
          drawY = 0;
        }

        context.clearRect(0, 0, w, h);
        context.drawImage(img, drawX, drawY, drawW, drawH);
      }
    };

    // First frame
    renderFrame(1);

    // GSAP Scrubber
    const airInstance = { frame: 1 };
    gsap.to(airInstance, {
      frame: TOTAL_FRAMES,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=500%',
        scrub: 1.5,
        pin: true,
        onUpdate: (self) => {
          renderFrame(airInstance.frame);
          if (self.progress === 1 && onComplete) onComplete();
        }
      }
    });

    // Handle Resize
    const handleResize = () => renderFrame(airInstance.frame);
    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, [isReady, onComplete]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full bg-black overflow-hidden ${className}`}
      style={{ height: '100vh' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center text-white/20 text-[0.6rem] uppercase tracking-widest">
          Synchronizing Cinema...
        </div>
      )}
    </div>
  );
}
