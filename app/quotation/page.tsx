'use client';

import React from 'react';

export default function QuotationPage() {
  return (
    <div className="bg-black text-white overflow-x-hidden min-h-screen">
      {/* Global Header */}
      <header className="fixed top-0 left-0 w-full px-12 py-5 flex justify-between items-center bg-black/40 backdrop-blur-2xl border-b border-white/5 z-100">
        <div className="logo">
          <img
            src="/assets/trustbar_logos/atrellis_brand_nobg.png"
            alt="Atrellis Brand"
            className="h-10 w-auto"
          />
        </div>
        <a href="/" className="px-8 py-3 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl text-white font-bold text-sm uppercase letter-spacing-2 hover:bg-white/10 transition-all duration-500">
          BACK HOME
        </a>
      </header>

      {/* Content */}
      <section className="min-h-screen flex items-center justify-center text-center pt-24 px-4">
        <div className="max-w-2xl">
          <h1 className="text-6xl font-light letter-spacing-1 text-white mb-6">
            GET A
            <br />
            <span className="font-bold text-blue-500 drop-shadow-lg" style={{ textShadow: '0 0 40px rgba(43, 115, 240, 0.3)' }}>FAST QUOTE</span>
          </h1>
          <p className="text-white/50 text-xl leading-relaxed mb-12">
            Submit your project details and our team will provide a comprehensive quotation within 24 hours.
          </p>
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-12">
            <form className="space-y-6">
              <div>
                <label className="block text-left text-white mb-3 font-bold">Project Type</label>
                <select className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors">
                  <option value="">Select a service...</option>
                  <option value="residential">Residential Refinement</option>
                  <option value="architectural">Architectural A&A</option>
                  <option value="commercial">Commercial Spatial Planning</option>
                  <option value="carpentry">Bespoke Carpentry</option>
                  <option value="smart">Smart Ecosystems</option>
                  <option value="outdoor">Outdoor Living Solutions</option>
                </select>
              </div>
              <div>
                <label className="block text-left text-white mb-3 font-bold">Your Name</label>
                <input type="text" placeholder="Enter your name" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-left text-white mb-3 font-bold">Email Address</label>
                <input type="email" placeholder="your@email.com" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-left text-white mb-3 font-bold">Project Description</label>
                <textarea placeholder="Tell us about your project..." rows={5} className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
              </div>
              <button className="w-full px-8 py-4 rounded-full bg-blue-500 text-white font-bold text-base uppercase letter-spacing-2 hover:bg-blue-600 transition-all duration-500">
                REQUEST QUOTATION
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-12 px-5 border-t border-white/5 text-white/50 text-sm letter-spacing-1">
        <p>
          Atrellis Pte Ltd © 2026. <br />
          All rights reserved.
        </p>
      </footer>
    </div>
  );
}
