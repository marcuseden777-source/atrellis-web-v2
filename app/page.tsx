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
    gsap.set(['#design-card', '#build-card', '#cta-reveal'], { opacity: 0, scale: 0.95, filter: 'blur(10px)' });
    gsap.set('#hero-headline', { opacity: 1, y: 0 });

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

    // Segment 1: Intro (0-20%) — hero fades out, cinematic assembles
    tl.to('#hero-headline', {
      opacity: 0,
      y: -30,
      filter: 'blur(8px)',
      duration: 1.5,
    }, 0);
    tl.to({}, { duration: 0.5 });

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

          {/* Design Card */}
          <Link href="/quotation" id="design-card" className="info-card right-card pointer-events-auto block transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black">
            <div className="card-line"></div>
            <h2 className="text-4xl font-serif italic font-bold mb-5">Architectural A&A</h2>
            <ul className="text-white/50 space-y-4 font-light tracking-wide text-sm mb-6">
              <li>Landed Property A&A (Additions & Alterations)</li>
              <li>BCA & URA Regulatory Submissions</li>
              <li>Bespoke 3D Visualization & Planning</li>
            </ul>
            <div className="text-[0.6rem] uppercase tracking-[3px] text-blue-500 font-black opacity-0 group-hover:opacity-100 transition-opacity">Launch Assessment &rarr;</div>
          </Link>

          {/* Build Card */}
          <Link href="/quotation" id="build-card" className="info-card left-card pointer-events-auto block transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black">
            <div className="card-line"></div>
            <h2 className="text-xl uppercase tracking-[4px] font-black mb-5">AtrellisZipblinds®</h2>
            <ol className="process-list space-y-4 text-white/50 font-light italic text-sm mb-6">
              <li className="flex items-center gap-4"><span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold not-italic">1</span> Online Assessment</li>
              <li className="flex items-center gap-4"><span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold not-italic">2</span> Proprietary Omni-Tension™ Install</li>
              <li className="flex items-center gap-4"><span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold not-italic">3</span> Site Handover & Smart Setup</li>
            </ol>
            <div className="text-[0.6rem] uppercase tracking-[3px] text-blue-500 font-black opacity-0 group-hover:opacity-100 transition-opacity">Launch Assessment &rarr;</div>
          </Link>

          {/* Final Conversion Reveal & Role Paths */}
          <div id="cta-reveal" className="flex flex-col items-center gap-6 pointer-events-auto mt-10">
            <h3 className="text-white/50 text-sm uppercase tracking-[4px] font-bold">Choose Your Path</h3>
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
      <section className="bg-black py-20 border-t border-white/5 overflow-hidden">
        <div className="flex w-[200%] animate-marquee opacity-60 hover:opacity-100 transition-all duration-700">
          <div className="flex w-1/2 justify-around items-center px-10">
            <Image src="/assets/trustbar_logos/nippon_paint_clean.png" alt="Nippon Paint" width={160} height={40} className="h-10 w-auto object-contain" />
            <Image src="/assets/trustbar_logos/bizsafe3_clean.png" alt="bizSafe3" width={160} height={40} className="h-10 w-auto object-contain" />
            <Image src="/assets/trustbar_logos/hdb_licensed_clean.png" alt="HDB" width={160} height={40} className="h-10 w-auto object-contain" />
            <Image src="/assets/trustbar_logos/bca_authority_clean.png" alt="BCA" width={160} height={40} className="h-10 w-auto object-contain" />
          </div>
          <div className="flex w-1/2 justify-around items-center px-10">
            <Image src="/assets/trustbar_logos/nippon_paint_clean.png" alt="Nippon Paint" width={160} height={40} className="h-10 w-auto object-contain" />
            <Image src="/assets/trustbar_logos/bizsafe3_clean.png" alt="bizSafe3" width={160} height={40} className="h-10 w-auto object-contain" />
            <Image src="/assets/trustbar_logos/hdb_licensed_clean.png" alt="HDB" width={160} height={40} className="h-10 w-auto object-contain" />
            <Image src="/assets/trustbar_logos/bca_authority_clean.png" alt="BCA" width={160} height={40} className="h-10 w-auto object-contain" />
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

      <SiteFooter />
    </main>
  );
}
