'use client';

import React from 'react';

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

export default function ServicesPage() {
  return (
    <div className="services-page">
      {/* Global Header */}
      <header className="glass-header">
        <div className="logo">
          <img
            src="/assets/trustbar_logos/atrellis_brand_nobg.png"
            alt="Atrellis Brand"
          />
        </div>
        <a href="/quotation" className="glass-btn primary outline">
          GET A FAST QUOTE
        </a>
      </header>

      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-content showcase-reveal">
          <h1>
            ENGINEERED
            <br />
            <span>LUXURY</span>
          </h1>
          <p>
            From bespoke 3D visualization to smart home integration, we bridge
            the gap between design philosophy and precise execution.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="section-container">
          <header className="section-intro showcase-reveal">
            <h2 className="section-title">ATRELLIS SYSTEMS</h2>
            <p className="section-subtitle">
              A vertically integrated approach to architectural renovation.
            </p>
          </header>

          <div className="solution-grid">
            {serviceCards.map((card) => (
              <div key={card.id} className="glass-system-card showcase-reveal">
                <div className="card-index">
                  {String(card.id).padStart(2, '0')}
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <ul className="card-features">
                  {card.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies / Portfolio Section */}
      <section className="portfolio-section">
        <div className="section-container">
          <h2 className="section-title showcase-reveal">CASE STUDIES</h2>
          <div className="portfolio-grid">
            {portfolioCards.map((card) => (
              <div key={card.id} className="portfolio-card showcase-reveal">
                <div
                  className="portfolio-img"
                  style={{
                    backgroundImage: `url('${card.imagePath}')`,
                  }}
                />
                <div className="portfolio-info">
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Products Deep Dive */}
      <section className="products-section deep-dive-section">
        <div className="section-container">
          <header className="section-intro showcase-reveal">
            <h2 className="section-title">ENGINEERED PRODUCTS</h2>
            <p className="section-subtitle">
              The physical building blocks of our premium environments.
            </p>
          </header>

          <div className="product-showcase-wrapper">
            {productRows.map((product) => (
              <div key={product.id} className="product-glass-row showcase-reveal">
                <div className="product-image-col">
                  <img
                    src={product.imagePath}
                    alt={`${product.title} ${product.subtitle} Mockup`}
                  />
                </div>
                <div className="product-title-col">
                  <h3>{product.title}</h3>
                  <span className="product-subtitle">{product.subtitle}</span>
                </div>
                <div className="product-variants-col">
                  {product.variants.map((variant, idx) => (
                    <div key={idx} className="variant-item">
                      <h4>{variant.title}</h4>
                      <p>{variant.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-footer">
        <p>
          Atrellis Pte Ltd &copy; 2026. <br />
          All rights reserved.
        </p>
      </footer>
    </div>
  );
}
