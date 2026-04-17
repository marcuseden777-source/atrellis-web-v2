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
  { id: 1, title: 'Residential Turnkey', description: 'Complete design-and-build solutions for HDB BTO, Resale, and Luxury Condominiums.', features: ['BTO Package Optimization', 'Condo Spatial Flow', 'Integrated ID & Build'] },
  { id: 2, title: 'Architectural A&A', description: 'Additions & Alterations for Landed Properties, managing structural extensions and facade rebuilds.', features: ['BCA & URA Submissions', 'Licensed PE/Architect Support', 'Landed Property Rebuilds'] },
  { id: 3, title: 'Waterproofing & Sealing', description: 'Professional seepage repair using the latest injection and membrane technologies.', features: ['No-Hacking PU Grouting', 'Torch-on Roofing Membrane', '24hr Water Ponding Tests'] },
  { id: 4, title: 'Bespoke Carpentry', description: 'Precision-engineered woodwork for premium kitchens and architectural built-ins.', features: ['Quartz & Sintered Stone', 'Blum/Hettich Hardware', 'Custom Floor-to-Ceiling'] },
  { id: 5, title: 'Smart Ecosystems', description: 'Hardwired smart home automation specializing in motorized shading and climate control.', features: ['Somfy Home Automation', 'Voice-Controlled Blinds', 'Integrated App Ecosystems'] },
  { id: 6, title: 'Outdoor Living', description: 'Structural balcony and roof extensions utilizing heavy-duty galvanized steel framing.', features: ['Galvanized Steel Structures', 'Weatherproof Decking', 'Architectural Cladding'] },
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
        <Link href="/" className="logo flex items-center gap-4">
          <img src="/assets/trustbar_logos/atrellis_brand_nobg.png" alt="Atrellis Brand" />
          <span className="text-[0.7rem] font-bold tracking-[2px] uppercase opacity-50">services</span>
        </Link>
        <Link href="/quotation" className="glass-btn primary outline">START JOURNEY</Link>
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
            
            {/* AtrellisZipblinds® */}
            <div 
              className="product-glass-row showcase-reveal flex gap-10 items-center bg-white/2 backdrop-blur-2xl p-10 rounded-[40px] border border-white/5"
              onMouseEnter={() => setHoveredProduct('Zipblinds')}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="product-image-col flex-[1.5] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={hoveredProduct === 'Zipblinds' ? ZIPBLIND_IMAGES[currentImageIndex] : '/assets/products/mockups/zipblinds_mockup_1775999699794.png'} 
                  alt="AtrellisZipblinds®" 
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
              <div className="product-title-col flex-1">
                <h3 className="text-5xl font-black mb-2 tracking-tight whitespace-nowrap">AtrellisZipblinds®</h3>
                <span className="product-subtitle text-blue-500 font-bold tracking-[4px] uppercase text-sm">Professional Rain & Sun Protection</span>
                <Link href="/quotation" className="glass-btn outline mt-12 block w-max">LEARN MORE</Link>
              </div>
              <div className="product-variants-col flex-[2] grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                  <h4 className="font-bold mb-2">Omni-Tension™ System</h4>
                  <p className="text-sm text-white/40 leading-relaxed">Precision-welded track guidance ensuring complete edge-to-edge environmental sealing.</p>
                </div>
                <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                  <h4 className="font-bold mb-2">Climate-Shield™ Fabric</h4>
                  <p className="text-sm text-white/40 leading-relaxed">Advanced UV-rejecting mesh engineered for Singapore's extreme humidity and rainfall.</p>
                </div>
              </div>
            </div>

            {/* Indoor Korean Combi / Zebra */}
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
                <h3 className="text-5xl font-black mb-2 tracking-tight">Korean Combi</h3>
                <span className="product-subtitle text-blue-500 font-bold tracking-[4px] uppercase text-sm">Dual-Layer Zebra Control</span>
                <Link href="/quotation" className="glass-btn outline mt-12 block w-max">EXPLORE STYLES</Link>
              </div>
              <div className="product-variants-col flex-[2] grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                  <h4 className="font-bold mb-2">Blackout Series</h4>
                  <p className="text-sm text-white/40 leading-relaxed">Maximum privacy and light blocking, ideal for bedrooms and home cinemas.</p>
                </div>
                <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                  <h4 className="font-bold mb-2">Antimicrobial Fabric</h4>
                  <p className="text-sm text-white/40 leading-relaxed">Dust-resistant and hypoallergenic materials perfect for young families.</p>
                </div>
              </div>
            </div>

            {/* Architectural Roofing */}
            <div className="product-glass-row showcase-reveal flex gap-10 items-center bg-white/2 backdrop-blur-2xl p-10 rounded-[40px] border border-white/5">
              <div className="product-image-col flex-[1.5] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img src="/assets/products/mockups/roofing_mockup_1775999733894.png" alt="Architectural Roofing" className="w-full h-full object-cover" />
              </div>
              <div className="product-title-col flex-1">
                <h3 className="text-5xl font-black mb-2 tracking-tight">A&A Roofing</h3>
                <span className="product-subtitle text-blue-500 font-bold tracking-[4px] uppercase text-sm">Structural Overhead Works</span>
                <Link href="/quotation" className="glass-btn outline mt-12 block w-max">REQUEST SURVEY</Link>
              </div>
              <div className="product-variants-col flex-[2] grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                  <h4 className="font-bold mb-2">Galvanized Steel Frame</h4>
                  <p className="text-sm text-white/40 leading-relaxed">Industrial-grade hollow sections ensuring maximum structural longevity.</p>
                </div>
                <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                  <h4 className="font-bold mb-2">Panel Cladding</h4>
                  <p className="text-sm text-white/40 leading-relaxed">Choice of Polycarbonate, ACP (Aluminum Composite), or Composite panels.</p>
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
