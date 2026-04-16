'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ResponsiveScrollPlayer from './components/ResponsiveScrollPlayer';
import PreloaderOverlay from './components/PreloaderOverlay';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // 1. Initial State
    gsap.set(['#design-card', '#build-card', '#cta-reveal'], { opacity: 0, scale: 0.95, filter: 'blur(10px)' });

    // 2. Main Scroll Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=500%', // Sync with total scroll duration
        scrub: 1,
        pin: true,
      }
    });

    // Segment 1: Intro (0-20%) - No cards, just assembly
    tl.to({}, { duration: 2 }); 

    // Segment 2: Design Section (20-45%)
    tl.to('#design-card', { 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)', 
      duration: 1 
    }, 2)
    .to('#design-card', { 
      opacity: 0, 
      scale: 1.05, 
      filter: 'blur(10px)', 
      duration: 1 
    }, 4.5);

    // Segment 3: Build Section (50-75%)
    tl.to('#build-card', { 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)', 
      duration: 1 
    }, 5)
    .to('#build-card', { 
      opacity: 0, 
      scale: 1.05, 
      filter: 'blur(10px)', 
      duration: 1 
    }, 7.5);

    // Segment 4: Call to Action (85-100%)
    tl.to('#cta-reveal', { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      duration: 1.5 
    }, 8.5);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const triggerJourney = () => {
    const main = document.querySelector('main');
    gsap.to(main, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => { router.push('/services'); }
    });
  };

  return (
    <main className="bg-black text-white selection:bg-blue-500/30">
      <PreloaderOverlay />

      {/* Persistent Global Header */}
      <header className="glass-header">
        <Link href="/" className="logo">
          <img src="/assets/trustbar_logos/atrellis_brand_nobg.png" alt="Atrellis Brand" className="h-8 md:h-10 w-auto" />
        </Link>
        <nav className="flex items-center gap-4 md:gap-8">
          <Link href="/services" className="text-[0.7rem] md:text-xs font-bold tracking-[2px] uppercase hover:text-blue-500 transition-colors">services</Link>
          <Link href="/quotation" className="text-[0.7rem] md:text-xs font-bold tracking-[2px] uppercase bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all">Start Journey</Link>
        </nav>
      </header>
      
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        {/* Cinematic Scrubber Engine */}
        <ResponsiveScrollPlayer />

        {/* Global UI Layer */}
        <div className="overlay-wrapper pointer-events-none">
          
          <div id="scroll-prompt" className="flex flex-col items-center">
            <span className="text-[0.7rem] uppercase tracking-[4px] font-bold text-white/50 mb-4">Explore Design & Build</span>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full relative">
              <div className="w-1 h-2 bg-blue-500 rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-bounce"></div>
            </div>
          </div>

          {/* Design Card */}
          <div id="design-card" className="info-card right-card pointer-events-auto">
            <div className="card-line"></div>
            <h3 className="text-4xl font-serif italic font-bold mb-5 italic">Design Solutions</h3>
            <ul className="text-white/50 space-y-4 font-light tracking-wide text-sm">
              <li>Bespoke 3D Visualization</li>
              <li>Smart Space Optimization</li>
              <li>Regulatory Compliance Planning</li>
            </ul>
          </div>

          {/* Build Card */}
          <div id="build-card" className="info-card left-card pointer-events-auto">
            <div className="card-line"></div>
            <h3 className="text-xl uppercase tracking-[4px] font-black mb-5">The Atrellis Journey</h3>
            <ol className="process-list space-y-4 text-white/50 font-light italic text-sm">
              <li className="flex items-center gap-4"><span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold not-italic">1</span> Online Request</li>
              <li className="flex items-center gap-4"><span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold not-italic">2</span> Instant Quotation</li>
              <li className="flex items-center gap-4"><span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold not-italic">3</span> Site Audit & Fit-out</li>
            </ol>
          </div>

          {/* Final Conversion Reveal */}
          <div id="cta-reveal" className="flex flex-col items-center gap-8 pointer-events-auto">
            <button 
              onClick={triggerJourney}
              className="start-journey-btn relative px-12 py-6 bg-transparent border border-white/20 text-white font-black uppercase tracking-[6px] text-lg overflow-hidden group hover:border-blue-500 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-blue-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              START JOURNEY
            </button>
            <Link 
              href="/services" 
              className="text-[0.7rem] tracking-[3px] uppercase opacity-50 hover:opacity-100 transition-opacity hover:text-blue-400"
            >
              SERVICES →
            </Link>
          </div>

        </div>
      </div>

      {/* Trust Visibility Bar */}
      <section className="bg-black py-20 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10 md:gap-20 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
          <img src="/assets/trustbar_logos/nippon_paint_nobg.png" alt="Nippon Paint" className="h-10 w-auto" />
          <img src="/assets/trustbar_logos/bizsafe3_nobg.png" alt="bizSafe3" className="h-10 w-auto" />
          <img src="/assets/trustbar_logos/hdb_licensed_nobg.png" alt="HDB" className="h-10 w-auto" />
          <img src="/assets/trustbar_logos/bca_authority_nobg.png" alt="BCA" className="h-10 w-auto" />
        </div>
      </section>
    </main>
  );
}
