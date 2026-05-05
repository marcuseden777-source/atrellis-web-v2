'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface SiteNavProps {
  /** Override the primary CTA label/href */
  ctaLabel?: string;
  ctaHref?: string;
  /** Show a breadcrumb label next to the logo (e.g. "services") */
  breadcrumb?: string;
}

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/#about' },
];

export default function SiteNav({
  ctaLabel = 'Contact Sales',
  ctaHref = '/quotation',
  breadcrumb,
}: SiteNavProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`site-nav-header ${scrolled ? 'site-nav-scrolled' : ''}`}
        role="banner"
      >
        {/* Logo */}
        <Link href="/" className="site-nav-logo flex items-center" aria-label="Atrellis Home">
          <Image
            src="/assets/trustbar_logos/atrellis_brand_nobg.png"
            alt="Atrellis"
            width={120}
            height={35}
            className="h-[35px] w-auto object-contain"
            priority
          />
          {breadcrumb && (
            <span className="site-nav-breadcrumb">{breadcrumb}</span>
          )}
        </Link>

        {/* Desktop Links */}
        <nav className="site-nav-links flex items-center gap-8 relative" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="group relative">
              <Link
                href={link.href}
                className={`site-nav-link ${pathname === link.href ? 'site-nav-link--active' : ''}`}
              >
                {link.label}
              </Link>
              {link.label === 'Services' && (
                <div className="absolute top-full left-0 mt-4 w-64 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl flex flex-col gap-2 z-50">
                  <Link href="/services#architectural" className="px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">Architectural A&A</Link>
                  <Link href="/services#smart-home" className="px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">Smart Home Ecosystems</Link>
                  <Link href="/zipblinds" className="px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors">AtrellisZipblinds®</Link>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div className="site-nav-actions flex items-center gap-6">
          <Link href="/login" className="text-white/70 hover:text-white text-sm font-medium transition-colors hidden md:block">
            Login
          </Link>
          <Link href={ctaHref} className="site-nav-cta" id="nav-cta-btn">
            {ctaLabel}
          </Link>
          <button
            className="site-nav-hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`hamburger-bar ${menuOpen ? 'bar-open-1' : ''}`} />
            <span className={`hamburger-bar ${menuOpen ? 'bar-open-2' : ''}`} />
            <span className={`hamburger-bar ${menuOpen ? 'bar-open-3' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Dropdown */}
      <div
        className={`site-nav-mobile-menu ${menuOpen ? 'site-nav-mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`site-nav-mobile-link ${pathname === link.href ? 'site-nav-mobile-link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href={ctaHref} className="site-nav-mobile-cta">
            {ctaLabel} →
          </Link>
        </nav>
      </div>

      {/* Mobile Backdrop */}
      {menuOpen && (
        <div
          className="site-nav-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
