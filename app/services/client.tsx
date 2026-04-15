'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// TypeScript Interfaces
interface ServiceCard {
  id: number;
  title: string;
  description: string;
  features: string[];
}

interface PortfolioCard {
  id: number;
  title: string;
  description: string;
  imagePath: string;
}

interface ProductVariant {
  title: string;
  description: string;
}

interface ProductRow {
  id: number;
  title: string;
  subtitle: string;
  imagePath: string;
  variants: ProductVariant[];
}

// Data Structures
const serviceCards: ServiceCard[] = [
  {
    id: 1,
    title: 'Residential Refinement',
    description:
      'Full-scale luxury condo and landed property renovations tailored to your exacting lifestyle standards.',
    features: [
      'Space Reconfiguration',
      'High-End Surface Finishes',
      'Turnkey Interior Fit-outs',
    ],
  },
  {
    id: 2,
    title: 'Architectural A&A',
    description:
      'Sophisticated Additions and Alterations, managing load-bearing modifications and structural extensions seamlessly.',
    features: [
      'BCA Plan Submissions',
      'Structural Reinforcement',
      'Facade Modernization',
    ],
  },
  {
    id: 3,
    title: 'Commercial Spatial Planning',
    description:
      'Designing premium offices, boutique spaces, and experiential retail environments optimized for flow and brand presence.',
    features: [
      'Brand & Identity Mapping',
      'Ergonomic Spatial Flow',
      'Lighting Architecture',
    ],
  },
  {
    id: 4,
    title: 'Bespoke Carpentry',
    description:
      'Factory-precision woodwork and architectural built-ins utilizing premium European hardware and laminates.',
    features: [
      'Custom Walk-in Wardrobes',
      'Integrated Kitchens',
      'Acoustic Feature Walls',
    ],
  },
  {
    id: 5,
    title: 'Smart Ecosystems',
    description:
      'Invisible hardwiring and integration of centralized climate, shading, and security systems to elevate daily living.',
    features: [
      'Somfy Motorization',
      'Centralized Interfaces',
      'App-controlled Ambience',
    ],
  },
  {
    id: 6,
    title: 'Outdoor Living Solutions',
    description:
      'Transforming balconies and terraces into year-round extensions of your indoor space with climate-resilient elements.',
    features: [
      'Decking & Landscaping',
      'Structural Weatherproofing',
      'Outdoor Kitchens & Bars',
    ],
  },
];

const portfolioCards: PortfolioCard[] = [
  {
    id: 1,
    title: 'Sentosa Cove / Modern Luxury',
    description:
      'Full-scale renovation featuring integrated Somfy automation and bespoke Zipblinds.',
    imagePath: '/assets/portfolio/sentosa_cove.png',
  },
  {
    id: 2,
    title: 'Marina One / Minimalist Loft',
    description:
      'Space optimization focused on invisible grilles and premium flooring textures.',
    imagePath: '/assets/portfolio/marina_one_loft.png',
  },
];

const productRows: ProductRow[] = [
  {
    id: 1,
    title: 'Zipblinds',
    subtitle: 'Track-Guided Protection',
    imagePath: '/assets/products/mockups/zipblinds_mockup_1775999699794.png',
    variants: [
      {
        title: 'Solar Mesh Fabric',
        description:
          'Filters out up to 99% of UV rays while preserving outside views and allowing natural breeze circulation.',
      },
      {
        title: 'Clear PVC Rain Shield',
        description:
          '100% waterproof barrier ensuring complete rain protection for balconies without sacrificing the vista.',
      },
      {
        title: 'Automated Smart Zip',
        description:
          'App-controlled and motorized tracking that can automatically respond to sun intensity or driving rain.',
      },
    ],
  },
  {
    id: 2,
    title: 'Indoor Blinds',
    subtitle: 'Light Architecture',
    imagePath: '/assets/products/mockups/blinds_mockup_1775999717013.png',
    variants: [
      {
        title: 'Roller Blinds',
        description:
          'Minimalist roll-up shades available in absolute blackout or precise dim-out fabrics for flawless glare reduction.',
      },
      {
        title: 'Combi Blinds',
        description:
          'Also known as Zebra Blinds, featuring alternating opaque and sheer horizontal stripes for dynamic light control.',
      },
      {
        title: 'Venetian Blinds',
        description:
          'Premium horizontal slatted blinds featuring architectural timber or matte-finish aluminum profiles.',
      },
    ],
  },
  {
    id: 3,
    title: 'Premium Roofing',
    subtitle: 'Overhead Solutions',
    imagePath: '/assets/products/mockups/roofing_mockup_1775999733894.png',
    variants: [
      {
        title: 'Bioclimatic Louvered Pergolas',
        description:
          'Motorized, adjustable structural aluminum blades allowing total control over sun penetration and ventilation.',
      },
      {
        title: 'Tempered Glass Sky-Roofs',
        description:
          'Frameless, minimalist canopies delivering extreme weather protection while maximizing overhead natural light.',
      },
      {
        title: 'Composite Aluminum Trellises',
        description:
          'Highly durable, ultra-modern structures utilizing heat-reflective roofing panels for outdoor thermal comfort.',
      },
    ],
  },
];

export default function ServicesPageClient() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reveals = document.querySelectorAll('.showcase-reveal');
    reveals.forEach((element, index) => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          once: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden block">
      {/* Global Header */}
      <header className="fixed top-0 left-0 w-full px-12 py-5 flex justify-between items-center bg-black/40 backdrop-blur-2xl border-b border-white/5 z-100">
        <div className="logo">
          <img
            src="/assets/trustbar_logos/atrellis_brand_nobg.png"
            alt="Atrellis Brand"
            className="h-10 w-auto"
          />
        </div>
        <a href="/quotation" className="px-8 py-3 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl text-white font-bold text-sm uppercase letter-spacing-2 hover:bg-white/10 transition-all duration-500">
          GET A FAST QUOTE
        </a>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center text-center pt-24">
        <div className="opacity-0 translate-y-10 showcase-reveal">
          <h1 className="text-6xl font-light letter-spacing-1 text-white mb-5">
            ENGINEERED
            <br />
            <span className="font-bold text-blue-500 drop-shadow-lg" style={{ textShadow: '0 0 40px rgba(43, 115, 240, 0.3)' }}>LUXURY</span>
          </h1>
          <p className="max-w-xl mx-auto text-white/50 text-xl leading-relaxed">
            From bespoke 3D visualization to smart home integration, we bridge
            the gap between design philosophy and precise execution.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <header className="opacity-0 translate-y-10 showcase-reveal mb-16">
            <h2 className="text-4xl font-bold letter-spacing-1 text-white mb-16 text-center uppercase">ATRELLIS SYSTEMS</h2>
            <p className="text-white/50 text-lg max-w-md mx-auto mb-10 letter-spacing-0.5">
              A vertically integrated approach to architectural renovation.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card) => (
              <div key={card.id} className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 relative transition-all duration-500 overflow-hidden opacity-0 translate-y-10 showcase-reveal hover:translate-y-[-10px] hover:bg-white/8 hover:border-white/20 hover:shadow-2xl group">
                <div className="absolute inset-0 top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-6xl font-black text-blue-500/20 absolute -top-2 right-2 leading-none">
                  {String(card.id).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-bold text-white mb-5 relative">{card.title}</h3>
                <p className="text-white/50 leading-relaxed mb-6 text-base">{card.description}</p>
                <ul className="list-none p-0 m-0">
                  {card.features.map((feature, idx) => (
                    <li key={idx} className="text-white/95 text-sm mb-2.5 pl-5 relative opacity-80">
                      <span className="absolute left-0 text-blue-500 font-black">→</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies / Portfolio Section */}
      <section className="relative border-t border-white/5 bg-black/15">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <h2 className="text-4xl font-bold letter-spacing-1 text-white mb-16 text-center uppercase opacity-0 translate-y-10 showcase-reveal">CASE STUDIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {portfolioCards.map((card) => (
              <div key={card.id} className="rounded-3xl overflow-hidden bg-white/2 border border-white/5 transition-all duration-500 opacity-0 translate-y-10 showcase-reveal hover:border-blue-500 hover:shadow-2xl">
                <div
                  className="w-full h-56 bg-cover bg-center transition-transform duration-600"
                  style={{
                    backgroundImage: `url('${card.imagePath}')`,
                  }}
                />
                <div className="p-7">
                  <h4 className="text-xl font-bold text-white mb-2.5">{card.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Products Deep Dive */}
      <section className="relative border-t border-white/5 bg-black/25">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <header className="opacity-0 translate-y-10 showcase-reveal mb-16">
            <h2 className="text-4xl font-bold letter-spacing-1 text-white mb-16 text-center uppercase">ENGINEERED PRODUCTS</h2>
            <p className="text-white/50 text-lg max-w-md mx-auto letter-spacing-0.5">
              The physical building blocks of our premium environments.
            </p>
          </header>

          <div className="flex flex-col gap-10">
            {productRows.map((product) => (
              <div key={product.id} className="flex flex-wrap bg-white/2 border border-white/10 backdrop-blur-xl rounded-3xl p-10 gap-10 transition-all duration-500 relative overflow-hidden opacity-0 translate-y-10 showcase-reveal hover:bg-white/8 hover:border-white/20 hover:translate-y-[-5px] hover:shadow-2xl group">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex-1.5 min-w-80 h-96 rounded-2xl overflow-hidden mr-5">
                  <img
                    src={product.imagePath}
                    alt={`${product.title} ${product.subtitle} Mockup`}
                    className="w-full h-full object-cover transition-transform duration-800 group-hover:scale-108"
                  />
                </div>
                <div className="flex-1 min-w-64 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-white mb-2.5">{product.title}</h3>
                  <span className="text-blue-500 text-base letter-spacing-1 uppercase font-bold">{product.subtitle}</span>
                </div>
                <div className="flex-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {product.variants.map((variant, idx) => (
                    <div key={idx} className="bg-black/20 border border-white/5 p-6 rounded-2xl transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-500 hover:translate-y-[-3px]">
                      <h4 className="text-lg text-white mb-3 font-bold">{variant.title}</h4>
                      <p className="text-sm text-white/50 leading-relaxed m-0">{variant.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-12 px-5 border-t border-white/5 text-white/50 text-sm letter-spacing-1">
        <p>
          Atrellis Pte Ltd &copy; 2026. <br />
          All rights reserved.
        </p>
      </footer>
    </div>
  );
}
