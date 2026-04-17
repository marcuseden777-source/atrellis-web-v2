'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

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
      alert("Please make a selection to proceed.");
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      const currentEl = stepRefs.current[currentStep];
      const nextEl = stepRefs.current[currentStep + 1];

      if (currentEl && nextEl) {
        gsap.to(currentEl, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          onComplete: () => {
            setCurrentStep(prev => prev + 1);
            gsap.fromTo(nextEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
          }
        });
      } else {
        // Fallback for first/initial setup
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

  const submitLead = () => {
    alert("Lead captured! Connecting to CRM and redirecting home...");
    router.push('/services');
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white flex flex-col items-center pt-20 md:pt-24 pb-12 px-6 selection:bg-blue-500/30">
      {/* Global Header */}
      <header className="glass-header">
        <Link href="/" className="logo">
          <img src="/assets/trustbar_logos/atrellis_brand_nobg.png" alt="Atrellis Brand" />
        </Link>
        <button 
          onClick={() => router.push('/')}
          className="glass-btn outline py-2 px-6"
        >
          BACK HOME
        </button>
      </header>

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
                <div 
                  key={type}
                  onClick={() => selectOption('propertyType', type)}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 ${userSelections.propertyType === type ? 'bg-blue-500/20 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white'}`}
                >
                  <span className="text-sm font-bold uppercase">{type}</span>
                </div>
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
                <div 
                  key={size}
                  onClick={() => selectOption('propertySize', size)}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 ${userSelections.propertySize === size ? 'bg-blue-500/20 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white'}`}
                >
                  <span className="text-sm font-bold uppercase">{size}</span>
                </div>
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
                <div 
                  key={style}
                  onClick={() => selectOption('style', style)}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 ${userSelections.style === style ? 'bg-blue-500/20 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white'}`}
                >
                  <span className="text-sm font-bold uppercase">{style}</span>
                </div>
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
                <div 
                  key={scope}
                  onClick={() => toggleMultiOption('scope', scope)}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 ${userSelections.scope.includes(scope) ? 'bg-blue-500/20 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white'}`}
                >
                  <span className="text-sm font-bold uppercase">{scope}</span>
                </div>
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
                <div 
                  key={tier.label}
                  onClick={() => selectOption('budget', tier.label)}
                  className={`p-6 rounded-2xl cursor-pointer border transition-all duration-300 flex flex-col items-center justify-center text-center ${userSelections.budget === tier.label ? 'bg-blue-500/20 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white'}`}
                >
                  <strong className="text-sm uppercase mb-2 tracking-[1px]">{tier.label}</strong>
                  <small className="text-[0.7rem] opacity-70 italic leading-tight">{tier.desc}</small>
                </div>
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
              <input 
                type="text" 
                placeholder="Name"
                value={userSelections.contact.name}
                onChange={(e) => setUserSelections(prev => ({ ...prev, contact: { ...prev.contact, name: e.target.value } }))}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-white placeholder-white/30"
              />
              <input 
                type="email" 
                placeholder="Email Address"
                value={userSelections.contact.email}
                onChange={(e) => setUserSelections(prev => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }))}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-white placeholder-white/30"
              />
              <input 
                type="tel" 
                placeholder="Contact Number"
                value={userSelections.contact.phone}
                onChange={(e) => setUserSelections(prev => ({ ...prev, contact: { ...prev.contact, phone: e.target.value } }))}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-white placeholder-white/30"
              />
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
              className="px-10 py-5 bg-blue-500 text-white font-black uppercase tracking-[3px] rounded-full hover:bg-blue-600 transition-all duration-300 shadow-[0_20px_50px_rgba(59,130,246,0.3)] active:scale-95"
            >
              REQUEST DETAILED QUOTE
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-stretch md:items-center gap-4 md:gap-6 pt-12">
          {currentStep > 1 && (
            <button 
              onClick={prevStep}
              className="px-10 py-4 bg-transparent text-white/50 border border-white/10 rounded-full hover:border-white/30 hover:text-white transition-all font-bold text-xs uppercase tracking-[2px]"
            >
              BACK
            </button>
          )}
          {currentStep < TOTAL_STEPS && (
            <button 
              onClick={nextStep}
              className="px-12 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all font-bold text-xs uppercase tracking-[2px] shadow-[0_10px_20px_rgba(59,130,246,0.2)]"
            >
              CONTINUE
            </button>
          )}
        </div>

        <button 
          onClick={() => router.push('/services')}
          className="block mx-auto pt-12 text-[0.7rem] uppercase tracking-[2px] text-white/30 hover:text-white/60 transition-colors"
        >
          &larr; Cancel Request
        </button>
      </div>

      {/* Background Orbs */}
      <div className="fixed top-1/4 -right-1/4 w-[50vw] h-[50vw] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="fixed bottom-1/4 -left-1/4 w-[40vw] h-[40vw] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
    </div>
  );
}
