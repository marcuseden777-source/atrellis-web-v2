'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
const ResponsiveScrollPlayer = dynamic(() => import('./components/ResponsiveScrollPlayer'), { ssr: false });
import PreloaderOverlay from './components/PreloaderOverlay';
import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // 1. Initial State — hero headline visible, cards hidden
    gsap.set(['#cta-reveal'], { opacity: 0, scale: 0.95, filter: 'blur(10px)' });
    gsap.set('#hero-headline', { opacity: 1, y: 0 });

    // 2. Main Scroll Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%', // Reduced scroll duration since cards are removed
        scrub: 1,
        pin: true,
      }
    });

    // Segment 1: Intro (0-20%) — hero fades out, cinematic assembles
    tl.to('#hero-headline', {
      opacity: 0,
      y: -30,
      filter: 'blur(8px)',
      duration: 1.5,
    }, 0);

    // Segment 2: Call to Action
    tl.to('#cta-reveal', { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      duration: 1.5 
    }, 1.5);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const triggerJourney = () => {
    const main = document.querySelector('main');
    gsap.to(main, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => { router.push('/quotation'); }
    });
  };

  return (
    <main id="main-content" className="bg-black text-white selection:bg-blue-500/30">
      <PreloaderOverlay />
      <SiteNav />
      
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        {/* Cinematic Scrubber Engine */}
        <ResponsiveScrollPlayer />

        {/* Global UI Layer */}
        <div className="overlay-wrapper pointer-events-none">
          
          {/* Hero Headline — visible on load, fades on scroll */}
          <div
            id="hero-headline"
            className="hero-headline-block"
            aria-label="Atrellis — Singapore Design &amp; Build"
          >
            <span className="hero-headline-eyebrow">Singapore&apos;s Premium Design &amp; Build Studio</span>
            <h1 className="hero-headline-title">
              Engineer.<br />
              <em>Design.</em><br />
              Build.
            </h1>
            <p className="hero-headline-sub">
              Landed property A&amp;A · BCA-compliant structures · Smart home ecosystems
            </p>
          </div>

          <div id="scroll-prompt" className="flex flex-col items-center">
            <span className="text-[0.7rem] uppercase tracking-[4px] font-bold text-white/50 mb-4">Explore Design & Build</span>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full relative">
              <div className="w-1 h-2 bg-blue-500 rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-bounce"></div>
            </div>
          </div>

          {/* Final Conversion Reveal & Role Paths */}
          <div id="cta-reveal" className="flex flex-col items-center gap-6 pointer-events-auto mt-10">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <button 
                onClick={triggerJourney}
                className="start-journey-btn relative px-10 py-5 bg-transparent border border-white/20 text-white font-black uppercase tracking-[4px] text-sm overflow-hidden group hover:border-blue-500 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                <div className="absolute inset-0 bg-blue-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                FOR HOMEOWNERS
              </button>
              <Link
                href="/services"
                className="start-journey-btn relative px-10 py-5 bg-transparent border border-white/20 text-white font-black uppercase tracking-[4px] text-sm overflow-hidden group hover:border-blue-500 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                <div className="absolute inset-0 bg-blue-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                FOR COMMERCIAL
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Trust Visibility Bar - Infinite Marquee */}
      <section className="bg-slate-50 py-16 overflow-hidden">
        <div className="flex w-[200%] animate-marquee opacity-80 hover:opacity-100 transition-all duration-700">
          <div className="flex w-1/2 justify-around items-center px-10">
            <Image src="/assets/trustbar_logos/nippon_paint_nobg.png" alt="Nippon Paint" width={160} height={40} className="h-12 w-auto object-contain" />
            <Image src="/assets/trustbar_logos/bizsafe3_nobg.png" alt="bizSafe3" width={160} height={40} className="h-12 w-auto object-contain" />
            <Image src="/assets/trustbar_logos/hdb_licensed_nobg.png" alt="HDB" width={160} height={40} className="h-12 w-auto object-contain" />
            <Image src="/assets/trustbar_logos/bca_authority_nobg.png" alt="BCA" width={160} height={40} className="h-12 w-auto object-contain" />
          </div>
          <div className="flex w-1/2 justify-around items-center px-10">
            <Image src="/assets/trustbar_logos/nippon_paint_nobg.png" alt="Nippon Paint" width={160} height={40} className="h-12 w-auto object-contain" />
            <Image src="/assets/trustbar_logos/bizsafe3_nobg.png" alt="bizSafe3" width={160} height={40} className="h-12 w-auto object-contain" />
            <Image src="/assets/trustbar_logos/hdb_licensed_nobg.png" alt="HDB" width={160} height={40} className="h-12 w-auto object-contain" />
            <Image src="/assets/trustbar_logos/bca_authority_nobg.png" alt="BCA" width={160} height={40} className="h-12 w-auto object-contain" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-black py-32 px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-blue-500 font-bold tracking-[4px] uppercase text-xs block mb-6">About Atrellis</span>
            <h2 className="text-5xl font-black tracking-tighter leading-tight mb-8">
              Singapore&apos;s Most<br />Precise Build Team
            </h2>
            <p className="text-white/50 leading-relaxed text-lg mb-6">
              Founded by engineers and designers who were frustrated with the gap between beautiful concepts and shoddy execution — Atrellis exists to close that gap permanently.
            </p>
            <p className="text-white/40 leading-relaxed">
              Every project carries our BCA registration, BizSafe Level 3 certification, and a licensed PE on structural works. We don&apos;t just renovate spaces. We engineer them.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { num: '200+', label: 'Projects Completed' },
              { num: '6', label: 'Years in Singapore' },
              { num: '98%', label: 'Client Satisfaction' },
              { num: '<15min', label: 'Speed-to-Lead' },
            ].map(({ num, label }) => (
              <div key={label} className="p-8 glass-panel rounded-3xl">
                <p className="text-4xl font-black text-blue-500 mb-2">{num}</p>
                <p className="text-white/40 text-sm uppercase tracking-[2px]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location / Find Us Section */}
      <section className="bg-black py-32 px-8 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/5 mix-blend-screen pointer-events-none" />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative z-10">
            <span className="text-blue-500 font-bold tracking-[4px] uppercase text-xs block mb-4">Headquarters</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Visit Our Studio</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Map Photo Container */}
            <div className="lg:col-span-3 rounded-3xl overflow-hidden glass-panel border border-white/10 group relative h-[300px] md:h-[450px]">
              <Image 
                src="/assets/location-map.png" 
                alt="Atrellis Home Decor Location Map" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                    </div>
                    <div>
                      <p className="text-white font-bold tracking-wide">Atrellis Studio</p>
                      <p className="text-white/60 text-sm">Geylang Bahru Industrial Estate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold text-white mb-4">Singapore Office</h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  78 Geylang Bahru, #01-2904<br />
                  Geylang Bahru Industrial Estate<br />
                  Kallang, Singapore 339686
                </p>
                <div className="h-px w-full bg-white/10 mb-6" />
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-white/50"><strong className="text-white">Mon-Sat:</strong> 9:00 AM - 6:00 PM</p>
                  <p className="text-sm text-white/50"><strong className="text-white">Sun & PH:</strong> Closed</p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps?q=1.3205454,103.871088"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all overflow-hidden"
              >
                <span className="relative z-10">Get Directions</span>
                <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
