import React from 'react';
import Link from 'next/link';

const FOOTER_NAV = [
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/#about' },
  { label: 'Assessment', href: '/quotation' },
];

const TRUST_LOGOS = [
  { src: '/assets/trustbar_logos/nippon_paint_clean.png', alt: 'Nippon Paint Authorised Applicator' },
  { src: '/assets/trustbar_logos/bizsafe3_clean.png', alt: 'BizSafe Level 3 Certified' },
  { src: '/assets/trustbar_logos/hdb_licensed_clean.png', alt: 'HDB Licensed Contractor' },
  { src: '/assets/trustbar_logos/bca_authority_clean.png', alt: 'BCA Registered Builder' },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer-inner">

        {/* Top row */}
        <div className="site-footer-top">

          {/* Brand column */}
          <div className="site-footer-brand">
            <Link href="/" aria-label="Atrellis Home">
              <img
                src="/assets/trustbar_logos/atrellis_brand_nobg.png"
                alt="Atrellis"
                className="site-footer-logo"
              />
            </Link>
            <p className="site-footer-tagline">
              Singapore's premium design &amp; build studio — engineered for landed properties, condominiums, and smart living.
            </p>
            <div className="site-footer-reg">
              <span>Atrellis Pte Ltd</span>
              <span className="site-footer-dot">·</span>
              {/* TODO: Replace with actual UEN */}
              <span>UEN: 202XXXXXX</span>
            </div>
          </div>

          {/* Nav column */}
          <div className="site-footer-nav-col">
            <h3 className="site-footer-col-title">Explore</h3>
            <nav aria-label="Footer navigation">
              {FOOTER_NAV.map((link) => (
                <Link key={link.href} href={link.href} className="site-footer-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div className="site-footer-contact-col">
            <h3 className="site-footer-col-title">Contact</h3>
            {/* TODO: Replace placeholders with real contact details */}
            <a
              href="https://wa.me/6592223333"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-contact-item"
              aria-label="WhatsApp us"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp: +65 9222 3333
            </a>
            <a
              href="mailto:hello@atrellis.business"
              className="site-footer-contact-item"
              aria-label="Email us"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              hello@atrellis.business
            </a>
            <p className="site-footer-hours">
              Mon – Sat · 9am – 6pm SGT<br />
              <span className="site-footer-response">Speed-to-Lead: &lt;15 min response</span>
            </p>
          </div>
        </div>

        {/* Trust logos */}
        <div className="site-footer-trust">
          {TRUST_LOGOS.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="site-footer-trust-logo"
            />
          ))}
        </div>

        {/* Bottom bar */}
        <div className="site-footer-bottom">
          <p>© 2026 Atrellis Pte Ltd · All rights reserved · Registered in Singapore</p>
          <div className="site-footer-legal">
            <Link href="/privacy" className="site-footer-legal-link">Privacy Policy</Link>
            <span className="site-footer-dot">·</span>
            <Link href="/pdpa" className="site-footer-legal-link">PDPA Notice</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
