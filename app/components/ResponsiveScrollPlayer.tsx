'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const [isMobile, setIsMobile] = useState(true);
  const totalFrames = isMobile ? 258 : 259;

  // 0. Detect Device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 1. Preload Frames
  useEffect(() => {
    let loadedCount = 0;
    framesRef.current = []; // Reset frames on device switch
    setIsReady(false);

    const preloadFrames = () => {
      const prefix = isMobile ? '/assets/frames/vertical/frame-' : '/assets/frames/horizontal/frame-';
      
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(3, '0');
        img.src = `${prefix}${frameIndex}.jpg`;
        img.onload = () => {
          loadedCount++;
          if (onFramesLoaded) onFramesLoaded(loadedCount);
          if (loadedCount === 30) {
            setIsReady(true);
          }
        };
        framesRef.current[i] = img;
      }
    };

    preloadFrames();
  }, [isMobile, totalFrames, onFramesLoaded]);

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
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;

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

    renderFrame(1);

    // GSAP Scrubber
    const airInstance = { frame: 1 };
    const st = gsap.to(airInstance, {
      frame: totalFrames,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1.5,
        pin: true,
        onUpdate: (self) => {
          renderFrame(airInstance.frame);
          if (self.progress === 1 && onComplete) onComplete();
        }
      }
    });

    const handleResize = () => renderFrame(airInstance.frame);
    window.addEventListener('resize', handleResize);

    return () => {
      if (st.scrollTrigger) st.scrollTrigger.kill();
      st.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [isReady, onComplete, totalFrames]);

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
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#0a1628] via-black to-black z-50">
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
