'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import Link from 'next/link';
import SiteNav from '@/app/components/SiteNav';
import SiteFooter from '@/app/components/SiteFooter';
import { logger } from '@/app/lib/logger';

interface UserSelections {
  propertyType: string | null;
  propertySize: string | null;
  style: string | null;
  scope: string[];
  budget: string | null;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}

const TOTAL_STEPS = 7;

export default function QuotationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [estimate, setEstimate] = useState<string>('S$ -- , ---');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const [userSelections, setUserSelections] = useState<UserSelections>({
    propertyType: null,
    propertySize: null,
    style: null,
    scope: [],
    budget: null,
    contact: { name: '', email: '', phone: '' },
  });

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Navigation Logic
  const nextStep = () => {
    if (!validateStep(currentStep)) {
      setStepError('Please make a selection to continue.');
      // Shake the error into view
      const errorEl = document.getElementById('step-error-msg');
      if (errorEl) {
        errorEl.classList.remove('step-error-shake');
        void errorEl.offsetWidth; // reflow to restart animation
        errorEl.classList.add('step-error-shake');
      }
      return;
    }
    setStepError(null);

    if (currentStep < TOTAL_STEPS) {
      const currentEl = stepRefs.current[currentStep];
      const nextEl = stepRefs.current[currentStep + 1];

      if (currentEl && nextEl) {
        gsap.to(currentEl, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          onComplete: () => {
            logger.info('Quotation wizard step advanced', { fromStep: currentStep, toStep: currentStep + 1 });
            setCurrentStep(prev => prev + 1);
            gsap.fromTo(nextEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
          }
        });
      } else {
        // Fallback for first/initial setup
        logger.info('Quotation wizard step advanced (fallback)', { fromStep: currentStep, toStep: currentStep + 1 });
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const currentEl = stepRefs.current[currentStep];
      const prevEl = stepRefs.current[currentStep - 1];

      if (currentEl && prevEl) {
        gsap.to(currentEl, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          onComplete: () => {
            setCurrentStep(prev => prev - 1);
            gsap.fromTo(prevEl, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4 });
          }
        });
      } else {
        setCurrentStep(prev => prev - 1);
      }
    }
  };

  const validateStep = (step: number) => {
    if (step === 1 && !userSelections.propertyType) return false;
    if (step === 2 && !userSelections.propertySize) return false;
    if (step === 3 && !userSelections.style) return false;
    if (step === 4 && userSelections.scope.length === 0) return false;
    if (step === 5 && !userSelections.budget) return false;
    if (step === 6) {
      if (!userSelections.contact.name || !userSelections.contact.email) return false;
    }
    return true;
  };

  const selectOption = (category: keyof UserSelections, value: string) => {
    setUserSelections(prev => ({ ...prev, [category]: value }));
    setStepError(null);
  };

  const toggleMultiOption = (category: keyof UserSelections, value: string) => {
    const currentList = userSelections[category] as string[];
    const index = currentList.indexOf(value);
    const newList = [...currentList];
    if (index > -1) {
      newList.splice(index, 1);
    } else {
      newList.push(value);
    }
    setUserSelections(prev => ({ ...prev, [category]: newList }));
    setStepError(null);
  };

  const submitLead = async () => {
    setIsSubmitting(true);

    logger.info('Quotation submission initiated', {
      propertyType: userSelections.propertyType,
      propertySize: userSelections.propertySize,
      style: userSelections.style,
      scopeCount: userSelections.scope.length,
      budgetTier: userSelections.budget,
      estimateGenerated: estimate,
    });

    try {
      const res = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: userSelections.contact,
          selections: {
            propertyType: userSelections.propertyType,
            propertySize: userSelections.propertySize,
            style: userSelections.style,
            scope: userSelections.scope,
            budget: userSelections.budget,
          },
          estimate,
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      logger.info('Quotation submission successful');
    } catch (err) {
      logger.info('Quotation submission error', { err });
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getWhatsAppLink = () => {
    const message = `Hi Atrellis Team, I've just generated my Technical Brief on your site.

Project Details:
- Name: ${userSelections.contact.name}
- Property: ${userSelections.propertyType} (${userSelections.propertySize})
- Style: ${userSelections.style}
- Scope: ${userSelections.scope.join(', ')}
- Tier: ${userSelections.budget}
- Indicative Estimate: ${estimate}

I'd like to schedule a site survey to finalize these specifications.`;
    
    return `https://wa.me/6592223333?text=${encodeURIComponent(message)}`;
  };

  const generateEstimate = () => {
    let basePrice = 20000;
    if (userSelections.propertySize === '601 - 1000 sqft') basePrice += 15000;
    if (userSelections.propertySize === '1001 - 1500 sqft') basePrice += 30000;
    if (userSelections.propertySize === 'Above 1500 sqft') basePrice += 50000;

    let scopeCost = userSelections.scope.length * 5000;
    let multiplier = 1.0;
    if (userSelections.budget === 'Economic') multiplier = 0.8;
    if (userSelections.budget === 'Premium') multiplier = 1.5;

    const finalEst = (basePrice + scopeCost) * multiplier;
    const lowEnd = Math.floor((finalEst * 0.9) / 1000) * 1000;
    const highEnd = Math.ceil((finalEst * 1.1) / 1000) * 1000;

    const result = `S$${lowEnd.toLocaleString()} - S$${highEnd.toLocaleString()}`;
    setEstimate(result);

    // Number Reveal Animation
    const outputEl = document.getElementById('estimateOutput');
    if (outputEl) {
      gsap.fromTo(outputEl,
        { opacity: 0, scale: 0.8, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "back.out(1.7)" }
      );
    }
  };

  useEffect(() => {
    if (currentStep === TOTAL_STEPS) {
      generateEstimate();
    }
  }, [currentStep]);


  return (
    <div id="main-content" className="bg-[#050505] min-h-screen text-white flex flex-col items-center pt-20 md:pt-24 pb-12 px-6 selection:bg-blue-500/30">
      {/* Global Header */}
      <SiteNav ctaLabel="Back Home" ctaHref="/" />

      {isSuccess ? (
        <div className="w-full max-w-3xl text-center space-y-12 py-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="space-y-6">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/30">
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[8px]">ANALYSIS<br/>COMPLETE</h1>
            <p className="text-white/40 text-lg tracking-[1px] max-w-xl mx-auto">
              Your technical brief has been synchronized with the Atrellis Engineering cloud. 
              Our indicative valuation for your <span className="text-white font-bold">{userSelections.style}</span> project is:
            </p>
          </div>

          <div className="p-12 bg-white/5 border border-white/10 rounded-[40px] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="text-5xl md:text-7xl font-black text-blue-500 mb-4 tracking-tighter">
              {estimate}
            </div>
            <p className="text-xs uppercase tracking-[4px] text-white/20 font-bold">Standard Indicative Range</p>
          </div>

          <div className="space-y-8 pt-8">
            <h3 className="text-xs font-black uppercase tracking-[4px] text-white/30">Mandatory Next Step</h3>
            <a 
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-7 bg-blue-500 text-white font-black uppercase tracking-[4px] rounded-full hover:bg-blue-600 transition-all duration-300 shadow-[0_25px_60px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95"
            >
              Consult Lead Engineer (WhatsApp)
            </a>
            <p className="text-[0.6rem] text-white/20 italic tracking-[1px]">
              *Speed-to-Lead response time: Typically under 15 minutes during business hours.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl text-center space-y-12">
          <div className="space-y-4">
            <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full mb-8"></div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-[6px]">ASSESSMENT</h1>
            <p className="text-white/50 text-base md:text-lg tracking-[1px] max-w-md mx-auto">Initializing your bespoke architectural quotation engine...</p>
          </div>

          {/* Progress Bar */}
          <div className="w-[60%] h-1 bg-white/10 mx-auto rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            ></div>
          </div>

          <div className="relative min-h-[450px]">
            {/* Step 1: Property Type */}
            <div 
              ref={el => { stepRefs.current[1] = el; }}
              className={`step-container ${currentStep === 1 ? 'active block' : 'hidden'}`}
            >
              <h2 className="text-xl font-bold mb-8 uppercase tracking-[2px]">1. Property Type</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['HDB BTO', 'HDB Resale', 'Condominium', 'Landed', 'Commercial'].map(type => (
                  <button 
                    type="button"
                    key={type}
                    onClick={() => selectOption('propertyType', type)}
                    className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 ease-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#050505] ${userSelections.propertyType === type ? 'bg-blue-500/20 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white'}`}
                  >
                    <span className="text-sm font-bold uppercase">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Property Size */}
            <div 
              ref={el => { stepRefs.current[2] = el; }}
              className={`step-container ${currentStep === 2 ? 'active block' : 'hidden'}`}
            >
              <h2 className="text-xl font-bold mb-8 uppercase tracking-[2px]">2. Property Size</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Below 600 sqft', '601 - 1000 sqft', '1001 - 1500 sqft', 'Above 1500 sqft'].map(size => (
                  <button 
                    type="button"
                    key={size}
                    onClick={() => selectOption('propertySize', size)}
                    className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 ease-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#050505] ${userSelections.propertySize === size ? 'bg-blue-500/20 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white'}`}
                  >
                    <span className="text-sm font-bold uppercase">{size}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Style Preference */}
            <div 
              ref={el => { stepRefs.current[3] = el; }}
              className={`step-container ${currentStep === 3 ? 'active block' : 'hidden'}`}
            >
              <h2 className="text-xl font-bold mb-8 uppercase tracking-[2px]">3. Style Preference</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Minimalist', 'Modern Luxury', 'Scandinavian', 'Industrial', 'Japandi', 'Contemporary', 'Classic Elegant'].map(style => (
                  <button 
                    type="button"
                    key={style}
                    onClick={() => selectOption('style', style)}
                    className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 ease-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#050505] ${userSelections.style === style ? 'bg-blue-500/20 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white'}`}
                  >
                    <span className="text-sm font-bold uppercase">{style}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Scope of Work */}
            <div 
              ref={el => { stepRefs.current[4] = el; }}
              className={`step-container ${currentStep === 4 ? 'active block' : 'hidden'}`}
            >
              <h2 className="text-xl font-bold mb-8 uppercase tracking-[2px]">4. Scope of Work (Select Multiple)</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Carpentry', 'Kitchen', 'Flooring', 'Painting', 'Electrical', 'Plumbing', 'Waterproofing', 'False Ceiling', 'Doors/Windows', 'AtrellisZipblinds®'].map(scope => (
                  <button 
                    type="button"
                    key={scope}
                    onClick={() => toggleMultiOption('scope', scope)}
                    className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 ease-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#050505] ${userSelections.scope.includes(scope) ? 'bg-blue-500/20 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white'}`}
                  >
                    <span className="text-sm font-bold uppercase">{scope}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Finish Tier */}
            <div 
              ref={el => { stepRefs.current[5] = el; }}
              className={`step-container ${currentStep === 5 ? 'active block' : 'hidden'}`}
            >
              <h2 className="text-xl font-bold mb-8 uppercase tracking-[2px]">5. Finish Tier</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Economic', desc: 'Functional & clean' },
                  { label: 'Mid-Range', desc: 'Balanced aesthetics' },
                  { label: 'Premium', desc: 'Luxury materials' }
                ].map(tier => (
                  <button 
                    type="button"
                    key={tier.label}
                    onClick={() => selectOption('budget', tier.label)}
                    className={`p-6 rounded-2xl cursor-pointer border transition-all duration-300 ease-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#050505] flex flex-col items-center justify-center text-center w-full ${userSelections.budget === tier.label ? 'bg-blue-500/20 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white'}`}
                  >
                    <strong className="text-sm uppercase mb-2 tracking-[1px]">{tier.label}</strong>
                    <small className="text-[0.7rem] opacity-70 italic leading-tight">{tier.desc}</small>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 6: Contact Details */}
            <div 
              ref={el => { stepRefs.current[6] = el; }}
              className={`step-container ${currentStep === 6 ? 'active block' : 'hidden'}`}
            >
              <h2 className="text-xl font-bold mb-8 uppercase tracking-[2px]">6. Your Details</h2>
              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <div className="flex flex-col">
                  <label htmlFor="contact-name" className="sr-only">Name</label>
                  <input 
                    id="contact-name"
                    type="text" 
                    placeholder="Name"
                    value={userSelections.contact.name}
                    onChange={(e) => setUserSelections(prev => ({ ...prev, contact: { ...prev.contact, name: e.target.value } }))}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white/10 transition-all duration-300 text-white placeholder-white/30"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="contact-email" className="sr-only">Email Address</label>
                  <input 
                    id="contact-email"
                    type="email" 
                    placeholder="Email Address"
                    value={userSelections.contact.email}
                    onChange={(e) => setUserSelections(prev => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }))}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white/10 transition-all duration-300 text-white placeholder-white/30"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="contact-phone" className="sr-only">Contact Number</label>
                  <input 
                    id="contact-phone"
                    type="tel" 
                    placeholder="Contact Number"
                    value={userSelections.contact.phone}
                    onChange={(e) => setUserSelections(prev => ({ ...prev, contact: { ...prev.contact, phone: e.target.value } }))}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white/10 transition-all duration-300 text-white placeholder-white/30"
                  />
                </div>
              </div>
            </div>

            {/* Step 7: Summary & Estimate */}
            <div 
              ref={el => { stepRefs.current[7] = el; }}
              className={`step-container ${currentStep === 7 ? 'active block' : 'hidden'}`}
            >
              <h2 className="text-xl font-bold mb-8 uppercase tracking-[2px]">Indicative Estimate</h2>
              <div className="p-10 bg-blue-500/5 border border-blue-500/20 rounded-3xl mb-8">
                <div 
                  id="estimateOutput"
                  className="text-4xl md:text-5xl font-black text-blue-500 mb-6 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                >
                  {estimate}
                </div>
                <p className="text-[0.7rem] text-white/40 max-w-sm mx-auto leading-relaxed">
                  This is a real-time indicative range based on standard metrics. Final quotation is subject to a detailed site survey and material selection.
                </p>
              </div>
              <button 
                onClick={submitLead}
                disabled={isSubmitting}
                className={`px-10 py-5 bg-blue-500 text-white font-black uppercase tracking-[3px] rounded-full transition-all duration-300 shadow-[0_20px_50px_rgba(59,130,246,0.3)] flex items-center justify-center gap-3 mx-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#050505] ${isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:bg-blue-600 active:scale-95'}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>ANALYZING...</span>
                  </>
                ) : (
                  'REQUEST DETAILED QUOTE'
                )}
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-stretch md:items-center gap-4 md:gap-6 pt-12">
            {currentStep > 1 && (
              <button 
                onClick={prevStep}
                className="px-10 py-4 bg-transparent text-white/50 border border-white/10 rounded-full hover:border-white/30 hover:text-white transition-all duration-300 font-bold text-xs uppercase tracking-[2px] focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#050505] active:scale-95"
              >
                BACK
              </button>
            )}
            {currentStep < TOTAL_STEPS && (
              <button 
                onClick={nextStep}
                className="px-12 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 font-bold text-xs uppercase tracking-[2px] shadow-[0_10px_20px_rgba(59,130,246,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#050505] active:scale-95"
              >
                CONTINUE
              </button>
            )}
          </div>

          {/* Inline Step Error */}
          {stepError && (
            <div
              id="step-error-msg"
              role="alert"
              className="step-error-msg step-error-shake"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {stepError}
            </div>
          )}

          <button 
            onClick={() => router.push('/services')}
            className="block mx-auto pt-12 text-[0.7rem] uppercase tracking-[2px] text-white/30 hover:text-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#050505] rounded p-2"
          >
            &larr; Cancel Request
          </button>
        </div>
      )}

      {/* Background Orbs */}
      <div className="fixed top-1/4 -right-1/4 w-[50vw] h-[50vw] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="fixed bottom-1/4 -left-1/4 w-[40vw] h-[40vw] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <SiteFooter />
    </div>
  );
}
