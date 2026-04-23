'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  ctaLabel = 'Start Assessment',
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
        <Link href="/" className="site-nav-logo" aria-label="Atrellis Home">
          <img
            src="/assets/trustbar_logos/atrellis_brand_nobg.png"
            alt="Atrellis"
          />
          {breadcrumb && (
            <span className="site-nav-breadcrumb">{breadcrumb}</span>
          )}
        </Link>

        {/* Desktop Links */}
        <nav className="site-nav-links" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`site-nav-link ${pathname === link.href ? 'site-nav-link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div className="site-nav-actions">
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
