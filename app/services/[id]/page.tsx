'use client';

import React, { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import gsap from 'gsap';
import Link from 'next/link';

interface TechDetail {
  title: string;
  subtitle: string;
  heroImg: string;
  description: string;
  specs: { label: string; value: string }[];
  process: { step: string; desc: string }[];
}

const TECH_DATA: Record<string, TechDetail> = {
  'zipblinds': {
    title: 'AtrellisZipblinds®',
    subtitle: 'The Gold Standard in Environmental Protection',
    heroImg: '/assets/visuals/zipblinds_tech.png',
    description: 'Engineering the perfect balance between transparency and climate control. Our proprietary Omni-Tension™ system ensures a tight, rattle-free seal even in severe tropical squalls.',
    specs: [
      { label: 'Heat Rejection', value: 'Up to 97%' },
      { label: 'Wind Resistance', value: 'Class 3 Certified' },
      { label: 'Fabric Technology', value: 'Atrellis Climate-Shield™' },
      { label: 'Automation', value: 'Somfy Smart Integration' }
    ],
    process: [
      { step: '01. Digital Mapping', desc: 'Laser-precision site measurements to ensure 100% track alignment.' },
      { step: '02. Structural Install', desc: 'Installation of the Omni-Tension™ side channels and headbox.' },
      { step: '03. Smart Calibation', desc: 'Syncing Somfy obstacles sensors and smart home apps.' }
    ]
  },
  'aa-structural': {
    title: 'Architectural A&A',
    subtitle: 'Structural Integrity & Legal Compliance',
    heroImg: '/assets/visuals/aa_structural.png',
    description: 'Navigating the legal and structural complexities of Singapore Landed property renovations. We manage the entire BCA/URA submission lifecycle using industrial-grade materials.',
    specs: [
      { label: 'Framing', value: 'Galvanized Steel Hollow Sections' },
      { label: 'Compliance', value: 'BCA / URA / SCDF Standards' },
      { label: 'Turnaround', value: 'Expedited Submission Pipeline' },
      { label: 'Safety', value: 'Professional Engineer (PE) Certified' }
    ],
    process: [
      { step: '01. Feasibility Audit', desc: 'Reviewing setback requirements and GFA potential.' },
      { step: '02. Submission Phase', desc: 'Managing the Qualified Person (QP) and Structural Plan Approval.' },
      { step: '03. Fabrication', desc: 'Off-site precision welding of galvanized steel components.' }
    ]
  },
  'waterproofing': {
    title: 'Waterproofing & Sealing',
    subtitle: 'High-Precision Seepage Prevention',
    heroImg: '/assets/visuals/waterproofing_tech.png',
    description: 'Utilizing non-invasive technology to seal inter-floor leakage and rooftop seepage without the need for expensive structural hacking.',
    specs: [
      { label: 'Injection Tech', value: 'High-Pressure PU Grouting' },
      { label: 'Membrane', value: 'Thermal Torch-On Mineral' },
      { label: 'Testing', value: '24-Hour Water Ponding Certified' },
      { label: 'Standard', value: 'Singapore Standard SS 525' }
    ],
    process: [
      { step: '01. Thermal Scan', desc: 'Non-invasive infrared detection to find the leakage source.' },
      { step: '02. Grouting Phase', desc: 'Targeted PU Injection to expand and seal concrete fissures.' },
      { step: '03. Verification', desc: 'Final certified flood test to ensure 100% airtight seal.' }
    ]
  },
  'aa-roofing': {
    title: 'A&A Roofing',
    subtitle: 'Industrial-Grade Structural Overhead Works',
    heroImg: '/assets/visuals/aa_roofing.png',
    description: 'Bespoke roofing extensions engineered for longevity. We combine heavy-duty Galvanized Steel structures with high-performance ACP or Polycarbonate cladding.',
    specs: [
      { label: 'Structural Frame', value: 'Galvanized Steel Hollow Sections' },
      { label: 'Cladding Range', value: 'ACP / Polycarbonate / Composite' },
      { label: 'Protection', value: '100% UV & Heat Shielding' },
      { label: 'Installation', value: 'BCA-Compliant Structural Welding' }
    ],
    process: [
      { step: '01. Structural Load Scan', desc: 'Analyzing the existing building to ensure load-bearing capacity.' },
      { step: '02. Steel Fabrication', desc: 'Precision welding of the galvanized steel framework.' },
      { step: '03. Cladding Install', desc: 'Application of the chosen panels with proprietary weatherproofing.' }
    ]
  },
  'indoor-blinds': {
    title: 'Korean Combi Blinds',
    subtitle: 'Precision Light Control for Modern Spaces',
    heroImg: '/assets/visuals/korean_combi.png',
    description: 'Transforming interior light into an architectural element. Our Zebra/Combi systems provide absolute control over privacy and ambience.',
    specs: [
      { label: 'Control Type', value: 'Dual-Layer Zebra Mechanism' },
      { label: 'Fabric Type', value: 'Antimicrobial / Dim-out' },
      { label: 'Operation', value: 'Somfy Silent Motorization' },
      { label: 'Application', value: 'HDB / Condo / Landed' }
    ],
    process: [
      { step: '01. Fabric Selection', desc: 'Choosing from our curated range of dim-out or blackout series.' },
      { step: '02. Custom Fit-out', desc: 'Precision manufacturing to your exact window dimensions.' },
      { step: '03. Smart Pairing', desc: 'Integration with smart home hubs and mobile apps.' }
    ]
  }
};

export default function ServiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const detail = TECH_DATA[id as string];
  const containerRef = useRef(null);

  useEffect(() => {
    if (!detail) return;

    const ctx = gsap.context(() => {
      gsap.from('.reveal-text', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
      });
      
      gsap.from('.hero-img-container', {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
      });
    });

    return () => ctx.revert();
  }, [detail]);

  if (!detail) return null;

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pb-20 selection:bg-blue-500/30">
      {/* Header */}
      <header className="glass-header">
        <Link href="/services" className="logo flex items-center gap-4">
          <img src="/assets/trustbar_logos/atrellis_brand_nobg.png" alt="Atrellis" />
          <span className="text-[0.7rem] font-bold tracking-[2px] uppercase opacity-50 underline decoration-blue-500 underline-offset-4">back to services</span>
        </Link>
        <Link href="/quotation" className="glass-btn primary outline">REQUEST SURVEY</Link>
      </header>

      {/* Hero */}
      <section className="pt-32 px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8 order-2 lg:order-1">
          <div className="reveal-text">
            <span className="text-blue-500 font-bold tracking-[4px] uppercase text-xs">Technical Deep-Dive</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mt-4 leading-[0.9]">{detail.title}</h1>
            <p className="text-xl text-white/40 mt-6 font-light">{detail.subtitle}</p>
          </div>
          
          <p className="reveal-text text-white/60 leading-relaxed text-lg max-w-xl">
            {detail.description}
          </p>

          <div className="reveal-text grid grid-cols-2 gap-6 pt-10 border-t border-white/5">
            {detail.specs.map((spec, i) => (
              <div key={i} className="space-y-1">
                <span className="text-[0.6rem] uppercase tracking-[2px] text-white/30">{spec.label}</span>
                <p className="font-bold text-sm">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-img-container order-1 lg:order-2 relative aspect-square lg:aspect-video rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <img src={detail.heroImg} alt={detail.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      </section>

      {/* Process Roadmap */}
      <section className="px-8 max-w-7xl mx-auto mt-32">
        <div className="reveal-text mb-20 text-center">
          <h2 className="text-3xl font-black uppercase tracking-[6px]">THE ATRELLIS ROADMAP</h2>
          <p className="text-white/30 text-sm mt-4">Precision-engineered from initial audit to final certification.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {detail.process.map((p, i) => (
            <div key={i} className="reveal-text p-10 bg-white/2 border border-white/5 rounded-3xl hover:border-blue-500/30 transition-all group">
              <span className="text-blue-500 font-black text-4xl opacity-20 group-hover:opacity-100 transition-opacity">{p.step.split('.')[0]}</span>
              <h4 className="text-xl font-bold mt-4 mb-3">{p.step.split('. ')[1]}</h4>
              <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Conversion Bar */}
      <section className="mt-40 px-8 text-center bg-blue-600/5 py-32 border-y border-white/5">
        <div className="reveal-text max-w-2xl mx-auto space-y-10">
          <h2 className="text-4xl font-serif italic text-white/90">Curious how this fits into your space?</h2>
          <Link href="/quotation" className="glass-btn primary py-6 px-12 group">
            START ASSESSMENT ASSESSMENT →
          </Link>
        </div>
      </section>
    </div>
  );
}
