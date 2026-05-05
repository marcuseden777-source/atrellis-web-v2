'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import SiteNav from '@/app/components/SiteNav';
import SiteFooter from '@/app/components/SiteFooter';
import { ServicesRepository } from '@/lib/repositories/services-repository';
import { PortfolioRepository } from '@/lib/repositories/portfolio-repository';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceCards = ServicesRepository.findAll();
const portfolioCards = PortfolioRepository.findFeatured().slice(0, 2);

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
      <SiteNav breadcrumb="services" ctaLabel="Start Journey" />

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
            {serviceCards.map((card) => {
              // Custom routes for specific deep-dives
              let route = "/quotation";
              if (card.id === 2) route = "/services/aa-structural";
              if (card.id === 3) route = "/services/waterproofing";
              
              return (
                <Link href={route} key={card.id} className="glass-system-card showcase-reveal block no-underline group hover:translate-y-[-10px] transition-all">
                  <div className="card-index">{String(card.id).padStart(2, '0')}</div>
                  <h3>{card.title}</h3>
                  <p className="text-white/60">{card.description}</p>
                  <ul className="card-features opacity-0 group-hover:opacity-100 transition-opacity">
                    {card.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                  <div className="mt-6 text-[0.6rem] uppercase tracking-[2px] text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">Technical Detail &rarr;</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies (Portfolio) */}
      <section className="portfolio-section">
        <div className="section-container">
          <h2 className="section-title showcase-reveal">CASE STUDIES</h2>
          <div className="portfolio-grid">
            {portfolioCards.map((card) => (
              <Link href={`/portfolio/${card.slug}`} key={card.slug} className="portfolio-card showcase-reveal block no-underline overflow-hidden border border-white/5 bg-white/2 hover:border-white/20 transition-all group">
                <div
                  className="portfolio-img h-[300px] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${card.thumbnail}')` }}
                />
                <div className="portfolio-info p-8">
                  <h4 className="text-xl font-bold mb-2">{card.title}</h4>
                  <p className="text-white/50">{card.description}</p>
                  <div className="mt-4 text-[0.6rem] uppercase tracking-[3px] text-blue-500 font-bold opacity-30 group-hover:opacity-100 transition-opacity">View Transformation &rarr;</div>
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
              className="product-glass-row showcase-reveal flex gap-10 items-center glass-panel p-10 rounded-[40px]"
              onMouseEnter={() => setHoveredProduct('Zipblinds')}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="product-image-col relative flex-[1.5] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src={hoveredProduct === 'Zipblinds' ? ZIPBLIND_IMAGES[currentImageIndex] : '/assets/products/mockups/zipblinds_mockup_1775999699794.png'} 
                  alt="AtrellisZipblinds®" 
                  fill
                  className="object-cover transition-all duration-500"
                />
              </div>
              <div className="product-title-col flex-1">
                <h3 className="text-5xl font-black mb-2 tracking-tight whitespace-nowrap">AtrellisZipblinds®</h3>
                <span className="product-subtitle text-blue-500 font-bold tracking-[4px] uppercase text-sm">Professional Rain & Sun Protection</span>
                <Link href="/services/zipblinds" className="glass-btn outline mt-12 block w-max">EXPLORE TECH</Link>
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
              className="product-glass-row showcase-reveal flex gap-10 items-center glass-panel p-10 rounded-[40px]"
              onMouseEnter={() => setHoveredProduct('Indoor Blinds')}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="product-image-col relative flex-[1.5] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src={hoveredProduct === 'Indoor Blinds' ? BLIND_IMAGES[currentImageIndex] : '/assets/products/mockups/blinds_mockup_1775999717013.png'} 
                  alt="Indoor Blinds" 
                  fill
                  className="object-cover transition-all duration-500"
                />
              </div>
              <div className="product-title-col flex-1">
                <h3 className="text-5xl font-black mb-2 tracking-tight">Korean Combi</h3>
                <span className="product-subtitle text-blue-500 font-bold tracking-[4px] uppercase text-sm">Dual-Layer Zebra Control</span>
                <Link href="/services/indoor-blinds" className="glass-btn outline mt-12 block w-max">EXPLORE TECH</Link>
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
            <div className="product-glass-row showcase-reveal flex gap-10 items-center glass-panel p-10 rounded-[40px]">
              <div className="product-image-col relative flex-[1.5] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/assets/products/mockups/roofing_mockup_1775999733894.png" alt="Architectural Roofing" fill className="object-cover" />
              </div>
              <div className="product-title-col flex-1">
                <h3 className="text-5xl font-black mb-2 tracking-tight">A&A Roofing</h3>
                <span className="product-subtitle text-blue-500 font-bold tracking-[4px] uppercase text-sm">Structural Overhead Works</span>
                <Link href="/services/aa-roofing" className="glass-btn outline mt-12 block w-max">TECHNICAL SPECS</Link>
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

      <SiteFooter />
    </div>
  );
}
