'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
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
    siteAddress: string;
    isNewHome: boolean;
    keyCollectionDate: string;
  };
  appointment: {
    date: string | null;
    timeSlot: string | null;
  };
}

const TOTAL_STEPS = 8;

export default function QuotationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  
  const [userSelections, setUserSelections] = useState<UserSelections>({
    propertyType: null,
    propertySize: null,
    style: null,
    scope: [],
    budget: null,
    contact: { name: '', email: '', phone: '', siteAddress: '', isNewHome: false, keyCollectionDate: '' },
    appointment: { date: null, timeSlot: null }
  });

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  useEffect(() => {
    // Generate next 14 available days (excluding Sundays)
    const dates = [];
    let d = new Date();
    while(dates.length < 14) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0) { // 0 is Sunday
        dates.push(new Date(d));
      }
    }
    setAvailableDates(dates);
  }, []);

  // Navigation Logic
  const nextStep = () => {
    if (!validateStep(currentStep)) {
      setStepError('Please complete all required fields to continue.');
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
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => {
            logger.info('Quotation wizard step advanced', { fromStep: currentStep, toStep: currentStep + 1 });
            setCurrentStep(prev => prev + 1);
            gsap.fromTo(nextEl, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
            
            // Stagger animations for child buttons/elements
            const childElements = nextEl.querySelectorAll('.stagger-item');
            if (childElements.length > 0) {
              gsap.fromTo(childElements, 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'back.out(1.2)', delay: 0.1 }
              );
            }
          }
        });
      } else {
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
      if (!userSelections.contact.name || !userSelections.contact.email || !userSelections.contact.phone || !userSelections.contact.siteAddress) return false;
      if (userSelections.contact.isNewHome && !userSelections.contact.keyCollectionDate) return false;
    }
    if (step === 7) {
      if (!userSelections.appointment.date || !userSelections.appointment.timeSlot) return false;
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

  const selectAppointmentDate = (date: Date) => {
    setUserSelections(prev => ({ 
      ...prev, 
      appointment: { ...prev.appointment, date: date.toISOString() } 
    }));
    setStepError(null);
  };

  const selectTimeSlot = (slot: string, isAvailable: boolean) => {
    if (!isAvailable) return;
    setUserSelections(prev => ({ 
      ...prev, 
      appointment: { ...prev.appointment, timeSlot: slot } 
    }));
    setStepError(null);
  };

  const submitLead = async () => {
    setIsSubmitting(true);

    logger.info('Quotation submission initiated', {
      propertyType: userSelections.propertyType,
    });

    try {
      const res = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: userSelections.contact,
          appointment: userSelections.appointment,
          selections: {
            propertyType: userSelections.propertyType,
            propertySize: userSelections.propertySize,
            style: userSelections.style,
            scope: userSelections.scope,
            budget: userSelections.budget,
          }
        }),
      });

      if (!res.ok) throw new Error('Request failed');
    } catch (err) {
      logger.info('Quotation submission error', { err });
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getWhatsAppLink = () => {
    const d = userSelections.appointment.date ? new Date(userSelections.appointment.date) : new Date();
    const dateStr = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    let message = `Hi Atrellis Team, I've just completed my Technical Brief and booked an appointment.

Project Details:
- Name: ${userSelections.contact.name}
- Address: ${userSelections.contact.siteAddress}
- Property: ${userSelections.propertyType} (${userSelections.propertySize})
- Style: ${userSelections.style}

Confirmed Appointment:
- Date: ${dateStr}
- Time: ${userSelections.appointment.timeSlot}`;

    if (userSelections.contact.isNewHome) {
      message += `\n- Key Collection: ${userSelections.contact.keyCollectionDate}`;
    }

    return `https://wa.me/6592223333?text=${encodeURIComponent(message)}`;
  };

  // Estimate logic removed as per new lead system requirements

  useEffect(() => {
    // Check if we need to do anything on reaching the final step
  }, [currentStep]);

  const timeSlots = [
    { label: '10:00 AM - 12:00 PM', available: true },
    { label: '12:00 PM - 1:00 PM (Lunch)', available: false },
    { label: '1:00 PM - 3:00 PM', available: true },
    { label: '3:00 PM - 3:30 PM (Booked)', available: false },
    { label: '3:30 PM - 5:00 PM', available: true },
    { label: '5:00 PM - 8:00 PM (Booked)', available: false },
    { label: '8:00 PM - 10:00 PM', available: true },
  ];

  return (
    <div id="main-content" className="bg-[#050505] min-h-screen text-white flex flex-col items-center pt-20 md:pt-24 pb-12 px-6 selection:bg-blue-500/30 overflow-x-hidden relative">
      
      {/* Background Orbs for Premium Atmosphere */}
      <div className="fixed top-1/4 -right-1/4 w-[50vw] h-[50vw] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="fixed bottom-1/4 -left-1/4 w-[40vw] h-[40vw] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '12s' }}></div>
      
      <SiteNav ctaLabel="Back Home" ctaHref="/" />

      {isSuccess ? (
        <div className="w-full max-w-3xl text-center space-y-12 py-20 animate-in fade-in slide-in-from-bottom-10 duration-1000 relative z-10">
          <div className="space-y-6">
            <div className="w-24 h-24 bg-gradient-to-tr from-green-600/30 to-green-400/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/40 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
              <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[8px] bg-clip-text text-transparent bg-gradient-to-r from-white via-green-100 to-white">REQUEST<br/>RECEIVED</h1>
            <p className="text-white/50 text-lg tracking-[1px] max-w-xl mx-auto font-light">
              Your technical brief has been synchronized with the Atrellis Engineering cloud. 
            </p>
          </div>

          <div className="space-y-8 pt-8">
            <h3 className="text-xs font-black uppercase tracking-[4px] text-white/40">If you haven't already:</h3>
            <a 
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-6 bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-[4px] rounded-full transition-all duration-300 shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:shadow-[0_0_60px_rgba(34,197,94,0.6)] hover:scale-105 active:scale-95 border border-green-400/30"
            >
              Continue to WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl text-center space-y-12 relative z-10 mt-8">
          
          <div className="space-y-4">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto rounded-full mb-8"></div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-[6px] text-white/90 drop-shadow-md">ASSESSMENT</h1>
            <p className="text-white/40 text-sm md:text-base tracking-[1.5px] max-w-md mx-auto font-light">Initializing bespoke architectural quotation engine...</p>
          </div>

          {/* Liquid Progress Bar */}
          <div className="w-[80%] md:w-[60%] h-1 bg-white/5 mx-auto rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 transition-all duration-700 ease-out shadow-[0_0_20px_rgba(59,130,246,0.8)]" 
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%`, backgroundSize: '200% auto', animation: 'gradientFlow 3s linear infinite' }}
            ></div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes gradientFlow { 0% { background-position: 0% center; } 100% { background-position: -200% center; } }
          `}} />

          {/* Wizard Glass Container */}
          <div className="relative min-h-[500px] p-6 md:p-12 bg-white/[0.02] border border-white/10 rounded-[32px] backdrop-blur-2xl shadow-2xl">
            
            {/* Step 1: Property Type */}
            <div ref={el => { stepRefs.current[1] = el; }} className={`step-container ${currentStep === 1 ? 'active block' : 'hidden'}`}>
              <h2 className="text-2xl font-bold mb-10 uppercase tracking-[3px] text-white/90">1. Property Type</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {['HDB BTO', 'HDB Resale', 'Condominium', 'Landed', 'Commercial'].map(type => (
                  <button 
                    type="button"
                    key={type}
                    onClick={() => selectOption('propertyType', type)}
                    className={`stagger-item group relative overflow-hidden p-6 rounded-2xl cursor-pointer border transition-all duration-300 ease-out focus:outline-none 
                      ${userSelections.propertyType === type 
                        ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 transition-opacity duration-300 ${userSelections.propertyType === type ? 'opacity-100' : 'group-hover:opacity-50'}`}></div>
                    <span className={`relative z-10 text-sm font-bold uppercase tracking-[1px] ${userSelections.propertyType === type ? 'text-blue-400' : 'text-white/60 group-hover:text-white'}`}>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Property Size */}
            <div ref={el => { stepRefs.current[2] = el; }} className={`step-container ${currentStep === 2 ? 'active block' : 'hidden'}`}>
              <h2 className="text-2xl font-bold mb-10 uppercase tracking-[3px] text-white/90">2. Property Size</h2>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {['Below 600 sqft', '601 - 1000 sqft', '1001 - 1500 sqft', 'Above 1500 sqft'].map(size => (
                  <button 
                    type="button"
                    key={size}
                    onClick={() => selectOption('propertySize', size)}
                    className={`stagger-item group relative p-6 rounded-2xl cursor-pointer border transition-all duration-300 ease-out focus:outline-none 
                      ${userSelections.propertySize === size 
                        ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
                  >
                    <span className={`relative z-10 text-sm font-bold uppercase tracking-[1px] ${userSelections.propertySize === size ? 'text-blue-400' : 'text-white/60 group-hover:text-white'}`}>{size}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Style Preference */}
            <div ref={el => { stepRefs.current[3] = el; }} className={`step-container ${currentStep === 3 ? 'active block' : 'hidden'}`}>
              <h2 className="text-2xl font-bold mb-10 uppercase tracking-[3px] text-white/90">3. Style Preference</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {['Minimalist', 'Modern Luxury', 'Scandinavian', 'Industrial', 'Japandi', 'Contemporary', 'Classic Elegant'].map(style => (
                  <button 
                    type="button"
                    key={style}
                    onClick={() => selectOption('style', style)}
                    className={`stagger-item group p-6 rounded-2xl cursor-pointer border transition-all duration-300 ease-out focus:outline-none 
                      ${userSelections.style === style 
                        ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
                  >
                    <span className={`text-sm font-bold uppercase tracking-[1px] ${userSelections.style === style ? 'text-blue-400' : 'text-white/60 group-hover:text-white'}`}>{style}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Scope of Work */}
            <div ref={el => { stepRefs.current[4] = el; }} className={`step-container ${currentStep === 4 ? 'active block' : 'hidden'}`}>
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-[3px] text-white/90">4. Scope of Work</h2>
              <p className="text-white/40 text-xs uppercase tracking-[2px] mb-8">Select multiple options</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {['Carpentry', 'Kitchen', 'Flooring', 'Painting', 'Electrical', 'Plumbing', 'Waterproofing', 'False Ceiling', 'Doors/Windows', 'AtrellisZipblinds®'].map(scope => (
                  <button 
                    type="button"
                    key={scope}
                    onClick={() => toggleMultiOption('scope', scope)}
                    className={`stagger-item p-4 rounded-xl cursor-pointer border transition-all duration-300 ease-out focus:outline-none 
                      ${userSelections.scope.includes(scope) 
                        ? 'bg-blue-500/20 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                        : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white'}`}
                  >
                    <span className="text-xs font-bold uppercase tracking-[1px]">{scope}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Finish Tier */}
            <div ref={el => { stepRefs.current[5] = el; }} className={`step-container ${currentStep === 5 ? 'active block' : 'hidden'}`}>
              <h2 className="text-2xl font-bold mb-10 uppercase tracking-[3px] text-white/90">5. Finish Tier</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Economic', desc: 'Functional & clean' },
                  { label: 'Mid-Range', desc: 'Balanced aesthetics' },
                  { label: 'Premium', desc: 'Luxury materials' }
                ].map(tier => (
                  <button 
                    type="button"
                    key={tier.label}
                    onClick={() => selectOption('budget', tier.label)}
                    className={`stagger-item group p-8 rounded-2xl cursor-pointer border transition-all duration-300 ease-out focus:outline-none flex flex-col items-center justify-center text-center w-full 
                      ${userSelections.budget === tier.label 
                        ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
                  >
                    <strong className={`text-lg uppercase mb-3 tracking-[2px] ${userSelections.budget === tier.label ? 'text-blue-400' : 'text-white/80 group-hover:text-white'}`}>{tier.label}</strong>
                    <small className="text-xs opacity-50 italic tracking-[1px]">{tier.desc}</small>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 6: Contact & Property Details */}
            <div ref={el => { stepRefs.current[6] = el; }} className={`step-container ${currentStep === 6 ? 'active block' : 'hidden'}`}>
              <h2 className="text-2xl font-bold mb-8 uppercase tracking-[3px] text-white/90">6. Your Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
                
                <div className="space-y-4">
                  <div className="stagger-item">
                    <label className="text-xs uppercase tracking-[2px] text-white/50 ml-2 mb-2 block">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe"
                      value={userSelections.contact.name}
                      onChange={(e) => setUserSelections(prev => ({ ...prev, contact: { ...prev.contact, name: e.target.value } }))}
                      className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-white/20"
                    />
                  </div>
                  <div className="stagger-item">
                    <label className="text-xs uppercase tracking-[2px] text-white/50 ml-2 mb-2 block">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="jane@example.com"
                      value={userSelections.contact.email}
                      onChange={(e) => setUserSelections(prev => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }))}
                      className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-white/20"
                    />
                  </div>
                  <div className="stagger-item">
                    <label className="text-xs uppercase tracking-[2px] text-white/50 ml-2 mb-2 block">Contact Number</label>
                    <input 
                      type="tel" 
                      placeholder="+65 9123 4567"
                      value={userSelections.contact.phone}
                      onChange={(e) => setUserSelections(prev => ({ ...prev, contact: { ...prev.contact, phone: e.target.value } }))}
                      className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-white/20"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="stagger-item">
                    <label className="text-xs uppercase tracking-[2px] text-white/50 ml-2 mb-2 block">Site Address</label>
                    <textarea 
                      placeholder="Block / Street Name / Unit"
                      rows={2}
                      value={userSelections.contact.siteAddress}
                      onChange={(e) => setUserSelections(prev => ({ ...prev, contact: { ...prev.contact, siteAddress: e.target.value } }))}
                      className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-white/20 resize-none"
                    />
                  </div>
                  
                  <div className="stagger-item p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                    <span className="text-sm font-bold uppercase tracking-[1px] text-white/80">Is this a new home?</span>
                    <button 
                      onClick={() => setUserSelections(prev => ({ ...prev, contact: { ...prev.contact, isNewHome: !prev.contact.isNewHome } }))}
                      className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none ${userSelections.contact.isNewHome ? 'bg-blue-500' : 'bg-white/20'}`}
                    >
                      <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${userSelections.contact.isNewHome ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                  </div>

                  {userSelections.contact.isNewHome && (
                    <div className="stagger-item animate-in fade-in slide-in-from-top-4 duration-300">
                      <label className="text-xs uppercase tracking-[2px] text-white/50 ml-2 mb-2 block text-blue-400">Key Collection Date</label>
                      <input 
                        type="date" 
                        value={userSelections.contact.keyCollectionDate}
                        onChange={(e) => setUserSelections(prev => ({ ...prev, contact: { ...prev.contact, keyCollectionDate: e.target.value } }))}
                        className="w-full p-4 bg-black/40 border border-blue-500/30 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Step 7: Appointment Booking */}
            <div ref={el => { stepRefs.current[7] = el; }} className={`step-container ${currentStep === 7 ? 'active block' : 'hidden'}`}>
              <h2 className="text-2xl font-bold mb-2 uppercase tracking-[3px] text-white/90">7. Schedule Site Survey</h2>
              <p className="text-white/40 text-xs uppercase tracking-[2px] mb-8">Select your preferred date & time</p>
              
              <div className="max-w-3xl mx-auto space-y-8">
                
                {/* Date Selection */}
                <div className="stagger-item">
                  <div className="flex overflow-x-auto pb-4 gap-3 hide-scrollbar px-2 snap-x">
                    {availableDates.map((date, idx) => {
                      const isSelected = userSelections.appointment.date === date.toISOString();
                      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                      const dayNum = date.getDate();
                      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => selectAppointmentDate(date)}
                          className={`snap-center flex-shrink-0 w-24 h-28 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 focus:outline-none
                            ${isSelected 
                              ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-105' 
                              : 'bg-black/40 border-white/10 hover:border-white/30'}`}
                        >
                          <span className={`text-xs uppercase tracking-[2px] mb-1 ${isSelected ? 'text-blue-300' : 'text-white/50'}`}>{monthName}</span>
                          <span className={`text-2xl font-black ${isSelected ? 'text-white' : 'text-white/80'}`}>{dayNum}</span>
                          <span className={`text-xs uppercase mt-1 ${isSelected ? 'text-blue-300 font-bold' : 'text-white/40'}`}>{dayName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                {userSelections.appointment.date && (
                  <div className="stagger-item animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-sm font-bold uppercase tracking-[2px] text-white/60 mb-4 text-left border-b border-white/10 pb-2">Available Windows</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {timeSlots.map((slot, idx) => {
                        const isSelected = userSelections.appointment.timeSlot === slot.label;
                        return (
                          <button
                            key={idx}
                            disabled={!slot.available}
                            onClick={() => selectTimeSlot(slot.label, slot.available)}
                            className={`p-4 rounded-xl text-sm font-bold tracking-[1px] transition-all flex justify-between items-center border
                              ${!slot.available 
                                ? 'bg-white/5 border-white/5 text-white/20 cursor-not-allowed' 
                                : isSelected 
                                  ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                                  : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/30 cursor-pointer'}`}
                          >
                            <span>{slot.label}</span>
                            {!slot.available && <span className="text-[0.6rem] uppercase bg-black/50 px-2 py-1 rounded">Unavailable</span>}
                            {isSelected && <span className="text-white">✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 8: One Last Step! */}
            <div ref={el => { stepRefs.current[8] = el; }} className={`step-container ${currentStep === 8 ? 'active block' : 'hidden'}`}>
              <h2 className="text-3xl font-black mb-8 uppercase tracking-[3px] text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-sm">One Last Step!</h2>
              
              <div className="p-10 bg-gradient-to-br from-green-900/10 to-black/40 border border-green-500/20 rounded-[32px] mb-10 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-30"></div>
                
                <p className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed tracking-[1px] mb-6">
                  Your technical brief is ready. To finalize your <strong>{userSelections.style}</strong> project booking and receive your comprehensive estimate, click below to send your details directly to our Lead Engineer.
                </p>

                <p className="text-sm text-white/50 max-w-md mx-auto leading-relaxed">
                  Scheduled Site Survey: <strong className="text-white/80">{userSelections.appointment.date ? new Date(userSelections.appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric'}) : ''}</strong> at <strong className="text-white/80">{userSelections.appointment.timeSlot}</strong>
                </p>
              </div>

              <button 
                onClick={() => {
                  window.open(getWhatsAppLink(), '_blank');
                  submitLead();
                }}
                disabled={isSubmitting}
                className={`group relative overflow-hidden px-12 py-6 bg-green-600 text-white font-black uppercase tracking-[3px] rounded-full transition-all duration-300 shadow-[0_15px_40px_rgba(34,197,94,0.4)] flex items-center justify-center gap-3 mx-auto focus:outline-none 
                  ${isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-white/20 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                {isSubmitting ? 'PROCESSING...' : 'SEND DETAILS VIA WHATSAPP'}
              </button>
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pt-6">
            {currentStep > 1 && (
              <button 
                onClick={prevStep}
                className="px-8 py-3 bg-transparent text-white/50 border border-white/10 rounded-full hover:border-white/30 hover:text-white transition-all duration-300 font-bold text-xs uppercase tracking-[2px] focus:outline-none active:scale-95"
              >
                BACK
              </button>
            )}
            {currentStep < TOTAL_STEPS && (
              <button 
                onClick={nextStep}
                className="px-10 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 font-black text-xs uppercase tracking-[2px] shadow-[0_5px_20px_rgba(255,255,255,0.2)] focus:outline-none active:scale-95"
              >
                CONTINUE
              </button>
            )}
          </div>

          {/* Error Message */}
          <div className="h-8 flex items-center justify-center">
            {stepError && (
              <div id="step-error-msg" role="alert" className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-[1px] animate-in fade-in slide-in-from-bottom-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {stepError}
              </div>
            )}
          </div>

          <button 
            onClick={() => router.push('/services')}
            className="block mx-auto text-[0.65rem] uppercase tracking-[2px] text-white/20 hover:text-white/60 transition-all duration-300 focus:outline-none"
          >
            &larr; Exit Wizard
          </button>
        </div>
      )}

      {/* Hide Scrollbar for horizontal lists */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <SiteFooter />
    </div>
  );
}
