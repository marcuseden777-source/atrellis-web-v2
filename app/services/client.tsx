'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceCards = [
  { id: 1, title: 'Residential Refinement', description: 'Full-scale luxury condo and landed property renovations tailored to your exacting lifestyle standards.', features: ['Space Reconfiguration', 'High-End Surface Finishes', 'Turnkey Interior Fit-outs'] },
  { id: 2, title: 'Architectural A&A', description: 'Sophisticated Additions and Alterations, managing load-bearing modifications and structural extensions.', features: ['BCA Plan Submissions', 'Structural Reinforcement', 'Facade Modernization'] },
  { id: 3, title: 'Commercial Spatial Planning', description: 'Designing premium offices and experiential retail environments optimized for flow and brand presence.', features: ['Brand & Identity Mapping', 'Ergonomic Spatial Flow', 'Lighting Architecture'] },
  { id: 4, title: 'Bespoke Carpentry', description: 'Factory-precision woodwork and architectural built-ins utilizing premium European hardware.', features: ['Custom Walk-in Wardrobes', 'Integrated Kitchens', 'Acoustic Feature Walls'] },
  { id: 5, title: 'Smart Ecosystems', description: 'Invisible hardwiring and integration of centralized climate, shading, and security systems.', features: ['Somfy Motorization', 'Centralized Interfaces', 'App-controlled Ambience'] },
  { id: 6, title: 'Outdoor Living Solutions', description: 'Transforming balconies and terraces into year-round extensions with climate-resilient elements.', features: ['Decking & Landscaping', 'Structural Weatherproofing', 'Outdoor Kitchens & Bars'] },
];

const portfolioCards = [
  { id: 1, title: 'Sentosa Cove / Modern Luxury', description: 'Full-scale renovation featuring integrated Somfy automation and bespoke Zipblinds.', imagePath: '/assets/portfolio/sentosa_cove.png' },
  { id: 2, title: 'Marina One / Minimalist Loft', description: 'Space optimization focused on invisible grilles and premium flooring textures.', imagePath: '/assets/portfolio/marina_one_loft.png' },
];

const ZIPBLIND_IMAGES = [
  '/assets/products/zipblinds/Zipblind images/Zipblind_202604031305.jpeg',
  '/assets/products/zipblinds/Zipblind images/Zipblind_202604031305_2.jpeg',
  '/assets/products/zipblinds/Zipblind images/Zipblind_photo_view_202604031305.jpeg',
  '/assets/products/zipblinds/Zipblind images/Zipblind_photo_view_202604031305_2.jpeg',
];

const BLIND_IMAGES = [
  '/assets/products/blinds/RollerBlind images/Rollerblinds_product_color_202604031307.jpeg',
  '/assets/products/blinds/RollerBlind images/Rollerblinds_product_colour_202604031307.jpeg',
  '/assets/products/blinds/RollerBlind images/Rollerblinds_scenery_to_202604031307.jpeg',
  '/assets/products/blinds/RollerBlind images/Rollerblinds_scenery_to_202604031307_2.jpeg',
];

export default function ServicesClient() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Small delay to ensure DOM is ready and Preloader has faded
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.showcase-reveal').forEach((el: any) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        });
      });
    });

    // Forced refresh for scroll positions
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hoveredProduct === 'Zipblinds' || hoveredProduct === 'Indoor Blinds') {
      interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % 4);
      }, 1200);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [hoveredProduct]);

  return (
    <div className="services-page">
      {/* Global Header */}
      <header className="glass-header">
        <Link href="/" className="logo">
          <img src="/assets/trustbar_logos/atrellis_brand_nobg.png" alt="Atrellis Brand" />
        </Link>
        <Link href="/quotation" className="glass-btn primary outline">GET A FAST QUOTE</Link>
      </header>

      {/* Hero Section */}
      <section className="services-hero">
        <div className="section-container showcase-reveal">
          <h1>ENGINEERED<br /><span>LUXURY</span></h1>
          <p>From bespoke 3D visualization to smart home integration, we bridge the gap between design philosophy and precise execution.</p>
        </div>
      </section>

      {/* Services Grid (Atrellis Systems) */}
      <section className="services-section">
        <div className="section-container">
          <header className="showcase-reveal">
            <h2 className="section-title">ATRELLIS SYSTEMS</h2>
            <p className="section-subtitle">A vertically integrated approach to architectural renovation.</p>
          </header>
          
          <div className="solution-grid">
            {serviceCards.map((card) => (
              <Link href="/quotation" key={card.id} className="glass-system-card showcase-reveal block no-underline group hover:translate-y-[-10px] transition-all">
                <div className="card-index">{String(card.id).padStart(2, '0')}</div>
                <h3>{card.title}</h3>
                <p className="text-white/60">{card.description}</p>
                <ul className="card-features opacity-0 group-hover:opacity-100 transition-opacity">
                  {card.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies (Portfolio) */}
      <section className="portfolio-section">
        <div className="section-container">
          <h2 className="section-title showcase-reveal">CASE STUDIES</h2>
          <div className="portfolio-grid">
            {portfolioCards.map((card) => (
              <Link href="/quotation" key={card.id} className="portfolio-card showcase-reveal block no-underline overflow-hidden border border-white/5 bg-white/2 hover:border-white/20 transition-all group">
                <div 
                  className="portfolio-img h-[300px] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                  style={{ backgroundImage: `url('${card.imagePath}')` }}
                />
                <div className="portfolio-info p-8">
                  <h4 className="text-xl font-bold mb-2">{card.title}</h4>
                  <p className="text-white/50">{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Engineered Products */}
      <section className="products-section">
        <div className="section-container">
          <header className="showcase-reveal">
            <h2 className="section-title">ENGINEERED PRODUCTS</h2>
            <p className="section-subtitle">The physical building blocks of our premium environments.</p>
          </header>

          <div className="product-showcase-wrapper space-y-12">
            
            {/* Zipblinds */}
            <div 
              className="product-glass-row showcase-reveal flex gap-10 items-center bg-white/2 backdrop-blur-2xl p-10 rounded-[40px] border border-white/5"
              onMouseEnter={() => setHoveredProduct('Zipblinds')}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="product-image-col flex-[1.5] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={hoveredProduct === 'Zipblinds' ? ZIPBLIND_IMAGES[currentImageIndex] : '/assets/products/mockups/zipblinds_mockup_1775999699794.png'} 
                  alt="Zipblinds" 
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
              <div className="product-title-col flex-1">
                <h3 className="text-5xl font-black mb-2 tracking-tight">Zipblinds</h3>
                <span className="product-subtitle text-blue-500 font-bold tracking-[4px] uppercase text-sm">Track-Guided Protection</span>
                <Link href="/quotation" className="glass-btn outline mt-12 block w-max">LEARN MORE</Link>
              </div>
              <div className="product-variants-col flex-[2] grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                  <h4 className="font-bold mb-2">Solar Mesh Fabric</h4>
                  <p className="text-sm text-white/40 leading-relaxed">Filters out up to 99% of UV rays while preserving outside views.</p>
                </div>
                <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                  <h4 className="font-bold mb-2">Clear PVC Rain Shield</h4>
                  <p className="text-sm text-white/40 leading-relaxed">100% waterproof barrier ensuring complete rain protection.</p>
                </div>
              </div>
            </div>

            {/* Indoor Blinds */}
            <div 
              className="product-glass-row showcase-reveal flex gap-10 items-center bg-white/2 backdrop-blur-2xl p-10 rounded-[40px] border border-white/5"
              onMouseEnter={() => setHoveredProduct('Indoor Blinds')}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="product-image-col flex-[1.5] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={hoveredProduct === 'Indoor Blinds' ? BLIND_IMAGES[currentImageIndex] : '/assets/products/mockups/blinds_mockup_1775999717013.png'} 
                  alt="Indoor Blinds" 
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
              <div className="product-title-col flex-1">
                <h3 className="text-5xl font-black mb-2 tracking-tight">Indoor Blinds</h3>
                <span className="product-subtitle text-blue-500 font-bold tracking-[4px] uppercase text-sm">Light Architecture</span>
                <Link href="/quotation" className="glass-btn outline mt-12 block w-max">LEARN MORE</Link>
              </div>
              <div className="product-variants-col flex-[2] grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                  <h4 className="font-bold mb-2">Roller Blinds</h4>
                  <p className="text-sm text-white/40 leading-relaxed">Minimalist roll-up shades available in absolute blackout or dim-out.</p>
                </div>
                <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                  <h4 className="font-bold mb-2">Venetian Blinds</h4>
                  <p className="text-sm text-white/40 leading-relaxed">Premium horizontal slatted blinds in timber or aluminum profiles.</p>
                </div>
              </div>
            </div>

            {/* Premium Roofing */}
            <div className="product-glass-row showcase-reveal flex gap-10 items-center bg-white/2 backdrop-blur-2xl p-10 rounded-[40px] border border-white/5">
              <div className="product-image-col flex-[1.5] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img src="/assets/products/mockups/roofing_mockup_1775999733894.png" alt="Premium Roofing" className="w-full h-full object-cover" />
              </div>
              <div className="product-title-col flex-1">
                <h3 className="text-5xl font-black mb-2 tracking-tight">Premium Roofing</h3>
                <span className="product-subtitle text-blue-500 font-bold tracking-[4px] uppercase text-sm">Overhead Solutions</span>
                <Link href="/quotation" className="glass-btn outline mt-12 block w-max">LEARN MORE</Link>
              </div>
              <div className="product-variants-col flex-[2] grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                  <h4 className="font-bold mb-2">Bioclimatic Pergolas</h4>
                  <p className="text-sm text-white/40 leading-relaxed">Motorized aluminum blades allowing total control over sun and air.</p>
                </div>
                <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                  <h4 className="font-bold mb-2">Tempered Sky-Roofs</h4>
                  <p className="text-sm text-white/40 leading-relaxed">Frameless minimalist canopies delivering weather protection.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-container mt-20 border-t border-white/5 pt-20 pb-20 flex flex-col md:flex-row justify-between items-center gap-10">
        <p className="text-xs uppercase tracking-[3px] text-white/30">Atrellis Pte Ltd &copy; 2026. All rights reserved.</p>
        <div className="flex items-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <img src="/assets/trustbar_logos/nippon_paint_nobg.png" alt="Nippon Paint" className="h-8" />
          <img src="/assets/trustbar_logos/bizsafe3_nobg.png" alt="bizSafe3" className="h-8" />
          <img src="/assets/trustbar_logos/hdb_licensed_nobg.png" alt="HDB" className="h-8" />
          <img src="/assets/trustbar_logos/bca_authority_nobg.png" alt="BCA" className="h-8" />
        </div>
      </footer>
    </div>
  );
}
