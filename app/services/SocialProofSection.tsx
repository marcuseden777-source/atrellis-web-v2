'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define social proof data
const socialProofData = {
  metric: '50+ Luxury Projects',
  subtext: 'Completed for Singapore\'s most discerning clients',
  logos: [
    { name: 'BCA Authority', path: '/assets/trustbar_logos/bca_authority_nobg.png' },
    { name: 'Nippon Paint', path: '/assets/trustbar_logos/nippon_paint_nobg.png' },
    { name: 'bizSafe3', path: '/assets/trustbar_logos/bizsafe3_nobg.png' },
    { name: 'HDB Licensed', path: '/assets/trustbar_logos/hdb_licensed_nobg.png' },
    { name: 'NUS Logo', path: '/assets/trustbar_logos/nus_logo_nobg.png' },
    { name: 'Sheerweave', path: '/assets/trustbar_logos/sheerweave_nobg.png' }
  ]
};

export default function SocialProofSection() {
  useEffect(() => {
    // Setup ScrollTrigger animation for the section
    const section = document.querySelector('.social-proof-section');
    if (section) {
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="social-proof-section showcase-reveal">
      <div className="section-container">
        {/* Trust Metric */}
        <div className="trust-metric">
          <h2 className="metric-title">{socialProofData.metric}</h2>
          <p className="metric-subtitle">{socialProofData.subtext}</p>
        </div>

        {/* Logo Bar */}
        <div className="trustbar-wrapper">
          <div className="trustbar-scroll">
            {socialProofData.logos.map((logo, index) => (
              <div key={index} className="logo-item">
                <img
                  src={logo.path}
                  alt={logo.name}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .social-proof-section {
          opacity: 0;
          transform: translateY(40px);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(30px) saturate(180%);
          -webkit-backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 48px;
          padding: 96px 32px;
          margin: 60px auto;
          max-width: 1200px;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .trust-metric {
          text-align: center;
          margin-bottom: 60px;
        }

        .metric-title {
          font-size: 48px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin: 0 0 16px 0;
          font-family: 'Outfit', sans-serif;
          letter-spacing: -0.5px;
        }

        .metric-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
          font-family: 'Outfit', sans-serif;
        }

        .trustbar-wrapper {
          width: 100%;
          overflow: hidden;
        }

        .trustbar-scroll {
          display: flex;
          gap: 48px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          width: 100%;
        }

        .logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 64px;
          flex-shrink: 0;
        }

        .logo-item img {
          height: 100%;
          width: auto;
          object-fit: contain;
          opacity: 0.8;
          transition: opacity 0.3s ease;
          filter: brightness(1) contrast(1.05);
        }

        .logo-item img:hover {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .social-proof-section {
            padding: 60px 24px;
            margin: 40px auto;
          }

          .metric-title {
            font-size: 32px;
          }

          .metric-subtitle {
            font-size: 14px;
          }

          .trustbar-scroll {
            gap: 32px;
          }

          .logo-item {
            height: 48px;
          }
        }

        @media (max-width: 480px) {
          .social-proof-section {
            padding: 48px 16px;
            margin: 30px auto;
            border-radius: 32px;
          }

          .metric-title {
            font-size: 24px;
          }

          .metric-subtitle {
            font-size: 12px;
          }

          .trustbar-scroll {
            gap: 24px;
          }

          .logo-item {
            height: 40px;
          }
        }
      `}</style>
    </section>
  );
}
