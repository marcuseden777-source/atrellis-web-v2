'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ResponsiveScrollPlayer from './components/ResponsiveScrollPlayer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial State for overlay cards
    gsap.set(['#design-card', '#build-card', '#final-cta', '.footer-strip'], { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-section',
        start: 'top top',
        end: '+=500%', // Match the ResponsiveScrollPlayer desktop end
        scrub: 1.5,
      }
    });

    // Cards sequence
    tl.fromTo("#design-card", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.1 }, 0.5);
    tl.to("#design-card", { opacity: 0, duration: 0.05 }, 0.65);

    tl.fromTo("#build-card", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.1 }, 0.7);
    tl.to("#build-card", { opacity: 0, duration: 0.05 }, 0.82);

    tl.fromTo("#final-cta", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.1 }, 0.9);
    tl.to(".footer-strip", { opacity: 1, duration: 0.1 }, 0.9);

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
      {/* Scrollable Container */}
      <div id="scroll-section" className="relative">
        
        {/* The Cinematic Scrubber */}
        <ResponsiveScrollPlayer className="sticky top-0 h-screen w-full" />

        {/* Overlay Content */}
        <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center z-20">
          
          {/* Scroll Prompt (Initial state managed by CSS/GSAP) */}
          <div id="scroll-prompt" className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto">
             <div className="scroll-orb-bg opacity-60"></div>
             <div className="scroll-prompt-content flex flex-col items-center gap-4">
                <span className="text-[0.7rem] uppercase tracking-[4px] font-bold text-white/70">Scroll Explorer</span>
                <div className="w-6 h-10 border-2 border-white/20 rounded-full relative">
                  <div className="w-1 h-2 bg-blue-500 rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-bounce"></div>
                </div>
             </div>
          </div>

          {/* Design Card */}
          <div id="design-card" className="info-card right-card pointer-events-auto">
            <div className="card-line"></div>
            <h3 className="text-4xl font-serif italic font-bold mb-5">Design Solutions</h3>
            <ul className="text-white/50 space-y-4 font-light letter-spacing-0.5">
              <li>Bespoke 3D Visualization</li>
              <li>Smart Space Optimization</li>
              <li>Regulatory Compliance Planning</li>
            </ul>
          </div>

          {/* Build Card */}
          <div id="build-card" className="info-card left-card pointer-events-auto">
            <div className="card-line"></div>
            <h3 className="text-xl uppercase tracking-[4px] font-black mb-5">The Atrellis Journey</h3>
            <ol className="process-list space-y-4 text-white/50 font-light italic">
              <li className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold not-italic">1</span> 
                Online Request
              </li>
              <li className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold not-italic">2</span> 
                Instant Quotation
              </li>
              <li className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold not-italic">3</span> 
                Free Site Visit
              </li>
              <li className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold not-italic">4</span> 
                Designing Services
              </li>
            </ol>
          </div>

          {/* Final CTA */}
          <div id="final-cta" className="pointer-events-auto mt-[15vh]">
            <button 
              onClick={triggerJourney}
              className="start-journey-btn group"
            >
              START JOURNEY
            </button>
          </div>

          {/* Footer Strip */}
          <div className="footer-strip fixed bottom-10 left-0 w-full px-12 flex justify-between items-center opacity-0 z-50">
            <p className="text-[0.6rem] uppercase tracking-[2px] text-white/40">Atrellis Pte Ltd &copy; 2026</p>
            <div className="flex items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
               <img src="/assets/trustbar_logos/bca_authority_nobg.png" className="h-6" alt="BCA" />
               <img src="/assets/trustbar_logos/hdb_licensed_nobg.png" className="h-6" alt="HDB" />
               <img src="/assets/trustbar_logos/nippon_paint_nobg.png" className="h-6" alt="Nippon Paint" />
               <img src="/assets/trustbar_logos/bizsafe3_nobg.png" className="h-6" alt="Bizsafe" />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
