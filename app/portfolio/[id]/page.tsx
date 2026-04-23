'use client';

import React, { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import gsap from 'gsap';
import Link from 'next/link';
import BeforeAfterSlider from '@/app/components/BeforeAfterSlider';
import SiteNav from '@/app/components/SiteNav';
import SiteFooter from '@/app/components/SiteFooter';

interface ProjectDetail {
  title: string;
  location: string;
  vost: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  specs: { label: string; value: string }[];
  systemsUsed: string[];
}

const PROJECT_DATA: Record<string, ProjectDetail> = {
  'sentosa-cove': {
    title: 'Sentosa Cove Waterfront',
    location: 'Ocean Drive, Sentosa',
    vost: '$45,000 - $65,000',
    beforeImg: '/assets/projects/sentosa_before.png',
    afterImg: '/assets/projects/sentosa_after.png',
    description: 'A complete terrace overhaul for a prestigious waterfront penthouse. The challenge was managing extreme coastal wind loads while maintaining unobstructed views of the marina. We implemented a heavy-duty structural framework to support oversized AtrellisZipblinds®.',
    specs: [
      { label: 'Project Type', value: 'Landed A&A' },
      { label: 'Area', value: '1,200 sqft Terrace' },
      { label: 'Timeline', value: '6 Weeks' },
      { label: 'Compliance', value: 'BCA Tech Audit Passed' }
    ],
    systemsUsed: ['AtrellisZipblinds®', 'Galvanized Steel HS', 'ACP Cladding', 'Outdoor Smart Lighting']
  },
  'marina-one': {
    title: 'Marina One Smart Loft',
    location: 'Marina Way, Core Central Region',
    vost: '$25,000 - $35,000',
    beforeImg: '/assets/projects/marina_before.png',
    afterImg: '/assets/projects/marina_after.png',
    description: 'Transforming a cluttered urban loft into a minimalist sanctuary. The project focused on "Hidden Storage" and "Automated Lighting Control," utilizing premium Korean Combi systems to filter the harsh afternoon sun while preserving the iconic skyline view.',
    specs: [
      { label: 'Project Type', value: 'Luxury Residential ID' },
      { label: 'Area', value: '950 sqft Loft' },
      { label: 'Timeline', value: '4 Weeks' },
      { label: 'Style', value: 'Japandi Minimalist' }
    ],
    systemsUsed: ['Korean Combi (Zebra)', 'Invisible Cabinetry', 'Smart Home Integration', 'Sintered Stone Surfaces']
  }
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const detail = PROJECT_DATA[id as string];
  const containerRef = useRef(null);

  useEffect(() => {
    if (!detail) return;
    const ctx = gsap.context(() => {
      gsap.from('.reveal-item', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    });
    return () => ctx.revert();
  }, [detail]);

  if (!detail) return null;

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pb-32">
      <SiteNav breadcrumb="Case Studies" ctaLabel="Request Similar Build" ctaHref="/quotation" />

      {/* Main Content */}
      <main className="pt-40 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left: Info */}
          <div className="space-y-12 lg:sticky lg:top-40">
            <div className="reveal-item">
              <span className="text-blue-500 font-bold tracking-[4px] uppercase text-xs">Project Spotlight</span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mt-4 leading-tight">{detail.title}</h1>
              <p className="text-xl text-white/40 mt-4 italic font-serif leading-relaxed">{detail.location}</p>
            </div>

            <div className="reveal-item space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[4px] text-white/30 border-b border-white/10 pb-4">The Challenge</h3>
              <p className="text-white/70 leading-relaxed text-lg">{detail.description}</p>
            </div>

            <div className="reveal-item grid grid-cols-2 gap-x-12 gap-y-10">
              {detail.specs.map((spec, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-[0.6rem] uppercase tracking-[3px] text-white/30 font-bold">{spec.label}</span>
                  <p className="font-bold text-lg">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="reveal-item pt-10">
              <h3 className="text-xs font-black uppercase tracking-[4px] text-white/30 mb-6">Systems Integrated</h3>
              <div className="flex flex-wrap gap-3">
                {detail.systemsUsed.map((system, i) => (
                  <span key={i} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[0.7rem] font-bold tracking-[1px] text-white/80">
                    {system}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Immersive Slider */}
          <div className="reveal-item space-y-10">
            <h3 className="text-xs font-black uppercase tracking-[4px] text-center text-white/20 mb-4 hidden lg:block">Interact to Reveal Transformation</h3>
            <BeforeAfterSlider 
              beforeImg={detail.beforeImg} 
              afterImg={detail.afterImg} 
              projectName={detail.title} 
            />
            <div className="p-8 bg-blue-600/5 rounded-3xl border border-blue-500/20 text-center">
              <p className="text-sm text-blue-200/60 leading-relaxed mb-6">
                Estimated Value of Works: <span className="text-white font-black ml-2">{detail.vost}</span>*
              </p>
              <p className="text-[0.6rem] text-white/20 italic">*Actual costs vary based on site constraints and material choices.</p>
            </div>
          </div>

        </div>
      </main>

      {/* Cross-Sell */}
      <section className="mt-40 px-8 py-40 bg-white/2 border-y border-white/5 text-center">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">Ready for your own transformation?</h2>
          <p className="text-white/40 text-lg">Every space has untapped potential. Our engineering team specializes in unlocking it through high-performance materials and legal compliance mastery.</p>
          <div className="pt-10 flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/quotation" className="glass-btn primary py-6 px-12 text-sm font-bold uppercase tracking-[2px]">Start Assessment</Link>
            <Link href="/services" className="glass-btn outline py-6 px-12 text-sm font-bold uppercase tracking-[2px]">Explore Systems</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
