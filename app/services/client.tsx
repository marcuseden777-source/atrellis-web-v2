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
  '/assets/products/zipblinds/zipblind_1.jpg',
  '/assets/products/zipblinds/zipblind_2.jpg',
  '/assets/products/zipblinds/zipblind_3.jpg',
  '/assets/products/zipblinds/zipblind_4.jpg',
];

const BLIND_IMAGES = [
  '/assets/products/blinds/blind_1.jpg',
  '/assets/products/blinds/blind_2.jpg',
  '/assets/products/blinds/blind_3.jpg',
  '/assets/products/blinds/blind_4.jpg',
];

export default function ServicesClient() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Initial Reveal Animations
    gsap.utils.toArray('.showcase-reveal').forEach((el: any) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hoveredProduct === 'Zipblinds' || hoveredProduct === 'Indoor Blinds') {
      interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % 4);
      }, 1000);
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

      {/* Services Grid */}
      <section className="services-section">
        <div className="section-container">
          <header className="showcase-reveal">
            <h2 className="section-title">ATRELLIS SYSTEMS</h2>
            <p className="section-subtitle">A vertically integrated approach to architectural renovation.</p>
          </header>
          
          <div className="solution-grid">
            {serviceCards.map((card) => (
              <Link href="/quotation" key={card.id} className="glass-system-card showcase-reveal block no-underline">
                <div className="card-index">{String(card.id).padStart(2, '0')}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <ul className="card-features">
                  {card.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section">
        <div className="section-container">
          <h2 className="section-title showcase-reveal">CASE STUDIES</h2>
          <div className="portfolio-grid">
            {portfolioCards.map((card) => (
              <Link href="/quotation" key={card.id} className="portfolio-card showcase-reveal block no-underline overflow-hidden">
                <div 
                  className="portfolio-img" 
                  style={{ backgroundImage: `url('${card.imagePath}')` }}
                />
                <div className="portfolio-info">
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="section-container">
          <header className="showcase-reveal">
            <h2 className="section-title">ENGINEERED PRODUCTS</h2>
            <p className="section-subtitle">The physical building blocks of our premium environments.</p>
          </header>

          <div className="product-showcase-wrapper">
            
            {/* Zipblinds */}
            <div 
              className="product-glass-row showcase-reveal"
              onMouseEnter={() => setHoveredProduct('Zipblinds')}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="product-image-col">
                <img 
                  src={hoveredProduct === 'Zipblinds' ? ZIPBLIND_IMAGES[currentImageIndex] : '/assets/products/mockups/zipblinds_mockup_1775999699794.png'} 
                  alt="Zipblinds" 
                  className="transition-opacity duration-300"
                />
              </div>
              <div className="product-title-col">
                <h3>Zipblinds</h3>
                <span className="product-subtitle">Track-Guided Protection</span>
                <Link href="/quotation" className="glass-btn outline mt-8 w-fit text-center">LEARN MORE</Link>
              </div>
              <div className="product-variants-col">
                <div className="variant-item">
                  <h4>Solar Mesh Fabric</h4>
                  <p>Filters out up to 99% of UV rays while preserving outside views.</p>
                </div>
                <div className="variant-item">
                  <h4>Clear PVC Rain Shield</h4>
                  <p>100% waterproof barrier ensuring complete rain protection.</p>
                </div>
                <div className="variant-item">
                  <h4>Automated Smart Zip</h4>
                  <p>App-controlled and motorized tracking for effortless operation.</p>
                </div>
              </div>
            </div>

            {/* Indoor Blinds */}
            <div 
              className="product-glass-row showcase-reveal"
              onMouseEnter={() => setHoveredProduct('Indoor Blinds')}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="product-image-col">
                <img 
                  src={hoveredProduct === 'Indoor Blinds' ? BLIND_IMAGES[currentImageIndex] : '/assets/products/mockups/blinds_mockup_1775999717013.png'} 
                  alt="Indoor Blinds" 
                  className="transition-opacity duration-300"
                />
              </div>
              <div className="product-title-col">
                <h3>Indoor Blinds</h3>
                <span className="product-subtitle">Light Architecture</span>
                <Link href="/quotation" className="glass-btn outline mt-8 w-fit text-center">LEARN MORE</Link>
              </div>
              <div className="product-variants-col">
                <div className="variant-item">
                  <h4>Roller Blinds</h4>
                  <p>Minimalist roll-up shades available in absolute blackout or dim-out.</p>
                </div>
                <div className="variant-item">
                  <h4>Combi Blinds</h4>
                  <p>Alternating opaque and sheer horizontal stripes for dynamic light control.</p>
                </div>
                <div className="variant-item">
                  <h4>Venetian Blinds</h4>
                  <p>Premium horizontal slatted blinds in timber or aluminum profiles.</p>
                </div>
              </div>
            </div>

            {/* Premium Roofing */}
            <div className="product-glass-row showcase-reveal">
              <div className="product-image-col">
                <img src="/assets/products/mockups/roofing_mockup_1775999733894.png" alt="Premium Roofing" />
              </div>
              <div className="product-title-col">
                <h3>Premium Roofing</h3>
                <span className="product-subtitle">Overhead Solutions</span>
                <Link href="/quotation" className="glass-btn outline mt-8 w-fit text-center">LEARN MORE</Link>
              </div>
              <div className="product-variants-col">
                <div className="variant-item">
                  <h4>Bioclimatic Pergolas</h4>
                  <p>Motorized aluminum blades allowing total control over sun and air.</p>
                </div>
                <div className="variant-item">
                  <h4>Tempered Sky-Roofs</h4>
                  <p>Frameless minimalist canopies delivering extreme weather protection.</p>
                </div>
                <div className="variant-item">
                  <h4>Aluminum Trellises</h4>
                  <p>Durable structures utilizing heat-reflective roofing panels.</p>
                </div>
              </div>
            </div>

            {/* Full Home Renovation */}
            <div className="product-glass-row showcase-reveal">
              <div className="product-image-col">
                <img src="/assets/portfolio/sentosa_cove.png" alt="Full Home Renovation" />
              </div>
              <div className="product-title-col">
                <h3>Full Home Renovation</h3>
                <span className="product-subtitle">Turnkey Excellence</span>
                <Link href="/quotation" className="glass-btn outline mt-8 w-fit text-center">LEARN MORE</Link>
              </div>
              <div className="product-variants-col">
                <div className="variant-item">
                  <h4>Whole Unit Overhaul</h4>
                  <p>Complete transformation from hacking to the final finish.</p>
                </div>
                <div className="variant-item">
                  <h4>Space Engineering</h4>
                  <p>Optimizing layout for modern flow and maximum utility.</p>
                </div>
                <div className="variant-item">
                  <h4>Material Selection</h4>
                  <p>Curated premium materials sourced for longevity and aesthetics.</p>
                </div>
              </div>
            </div>

            {/* 3D Design Services */}
            <div className="product-glass-row showcase-reveal">
              <div className="product-image-col">
                <img src="/assets/portfolio/marina_one_loft.png" alt="3D Design Services" />
              </div>
              <div className="product-title-col">
                <h3>3D Design Services</h3>
                <span className="product-subtitle">Virtual Visualization</span>
                <Link href="/quotation" className="glass-btn outline mt-8 w-fit text-center">LEARN MORE</Link>
              </div>
              <div className="product-variants-col">
                <div className="variant-item">
                  <h4>Photorealistic Renders</h4>
                  <p>See your space before a single brick is laid with extreme detail.</p>
                </div>
                <div className="variant-item">
                  <h4>Virtual Walkthroughs</h4>
                  <p>Immersive digital tours of your future home renovation.</p>
                </div>
                <div className="variant-item">
                  <h4>Lighting Simulation</h4>
                  <p>Precise mapping of how natural and artificial light affects design.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-strip showcase-reveal" style={{ opacity: 1, position: 'relative', marginTop: '100px', bottom: '0', padding: '50px' }}>
        <p className="copyright">Atrellis Pte Ltd &copy; 2026. All rights reserved.</p>
        <div className="logo-bar" style={{ paddingRight: '0' }}>
          <div className="logo-group">
            <img src="/assets/trustbar_logos/nippon_paint_nobg.png" alt="Nippon Paint" />
            <img src="/assets/trustbar_logos/bizsafe3_nobg.png" alt="bizSafe3" />
            <img src="/assets/trustbar_logos/hdb_licensed_nobg.png" alt="HDB Licensed" />
            <img src="/assets/trustbar_logos/bca_authority_nobg.png" alt="BCA" />
          </div>
        </div>
      </footer>
    </div>
  );
}
