'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteNav from '@/app/components/SiteNav';
import SiteFooter from '@/app/components/SiteFooter';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ZipblindsPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el as Element,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <SiteNav breadcrumb="products/zipblinds" />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/products/zipblinds/Zipblind images/Zipblind_photo_view_202604031305_2.jpeg" 
            alt="ZipShield by Atrellis" 
            fill 
            className="object-cover opacity-40" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505]"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center reveal">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
            ZipShield™ <span className="text-white/30">by Atrellis</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-serif italic text-blue-400 mb-8">
            Engineered Outdoor Blinds for Singapore Living
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12 font-light tracking-wide">
            Track-guided. Wind-rated. Smart-controlled. Built to last.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/quotation" className="glass-btn primary px-10 py-5 text-sm">
              GET A FREE QUOTE
            </Link>
            <Link href="/quotation" className="glass-btn outline px-10 py-5 text-sm">
              BOOK A SITE VISIT
            </Link>
          </div>
        </div>
      </section>

      {/* 2. INTRO / VALUE STATEMENT */}
      <section className="py-24 px-8 border-b border-white/5 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto text-center reveal">
          <p className="text-2xl md:text-4xl font-light leading-relaxed mb-10">
            Singapore's balconies deserve more than decorative curtains. Atrellis ZipShield™ is a precision-engineered outdoor blind system — imported from Australia, tested to withstand winds up to <strong className="text-blue-500 font-black">260 km/hr</strong>, and installed by our BCA-registered team with a 5-year residential warranty.
          </p>
          <p className="text-xl text-white/50 font-serif italic">
            No cords. No zippers. No gaps. Just clean lines and total control.
          </p>
        </div>
      </section>

      {/* 3. HOW IT'S BUILT — THE 7-PART SYSTEM (BENTO GRID) */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <span className="text-blue-500 font-bold tracking-[4px] uppercase text-xs block mb-4">What You're Actually Getting</span>
          <h2 className="text-5xl font-black tracking-tighter">The 7-Part System</h2>
          <p className="text-white/50 mt-6 max-w-2xl mx-auto">
            Every Atrellis ZipShield™ blind is made up of seven engineered components — custom fabricated to your exact measurements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-8 rounded-3xl reveal md:col-span-2 lg:col-span-2 hover:border-white/20 transition-colors">
            <h3 className="text-2xl font-bold mb-3"><span className="text-blue-500 mr-2">01</span> Side Spline (The Patent)</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              A proprietary PVC-core rope, wrapped in Kedar tape and acrylic lacquer, high-frequency welded to both faces of your fabric. This single component locks the blind into its tracks and is what allows the system to hold against 260 km/hr wind loads — tested by TÜV SÜD PSB Singapore.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-3xl reveal hover:border-white/20 transition-colors">
            <h3 className="text-2xl font-bold mb-3"><span className="text-blue-500 mr-2">02</span> Extruded Tracks</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              Two precision-machined vertical aluminium channels anchor the side splines. Powder-coated using Oxyplast Superdurable Polyester (Qualicoat Class 2) — the same standard used in Singapore's architectural curtain walls.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-3xl reveal hover:border-white/20 transition-colors">
            <h3 className="text-2xl font-bold mb-3"><span className="text-blue-500 mr-2">03</span> Roller Tube</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              The heart of the system. Your fabric coils around this aluminium barrel at the top of the opening. In motorised systems, the tubular motor sits entirely inside this tube — completely hidden.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-3xl reveal hover:border-white/20 transition-colors">
            <h3 className="text-2xl font-bold mb-3"><span className="text-blue-500 mr-2">04</span> Motor or SuperSpring®</h3>
            <p className="text-white/60 leading-relaxed text-sm mb-2">
              <strong className="text-white">Motorised:</strong> DC tubular motor (Somfy® or Dooya®) slots inside the roller tube.
            </p>
            <p className="text-white/60 leading-relaxed text-sm">
              <strong className="text-white">Manual:</strong> Ziptrak's patented SuperSpring® counterbalances the blind's weight so it moves and pauses with one hand.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-3xl reveal hover:border-white/20 transition-colors">
            <h3 className="text-2xl font-bold mb-3"><span className="text-blue-500 mr-2">05</span> Aluminium Bottom Bar</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              Keeps the fabric taut and weighted. Available in Streamline (up to 5.5m) or Extra Heavy-Duty (up to 6m) — 50% stronger for wide spans and high-floor installations.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-3xl reveal md:col-span-2 hover:border-white/20 transition-colors">
            <h3 className="text-2xl font-bold mb-3"><span className="text-blue-500 mr-2">06</span> PestOut® Pelmet</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              The top housing that protects your motor, roller tube, and fabric. Features a dual brush insert that cleans the fabric on every pass and prevents insects from nesting inside. Colour-matched for a seamless finish.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-3xl reveal lg:col-span-1 hover:border-white/20 transition-colors">
            <h3 className="text-2xl font-bold mb-3"><span className="text-blue-500 mr-2">07</span> Mounting Brackets</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              Stainless steel or powder-coated brackets fix the system to concrete, steel, timber, or brick. A bottom weather seal closes the final gap against rain and dust.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FABRIC OPTIONS */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-blue-500 font-bold tracking-[4px] uppercase text-xs block mb-4">Choose Your View</span>
            <h2 className="text-4xl font-black tracking-tighter">Fabric Options</h2>
            <p className="text-white/50 mt-4">All fabrics are custom-cut and spline-welded to your exact dimensions. No joins, no overlaps.</p>
          </div>
          
          <div className="overflow-x-auto reveal">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-[2px]">
                  <th className="py-4 px-6 min-w-[200px]">Fabric</th>
                  <th className="py-4 px-6">Openness</th>
                  <th className="py-4 px-6">Rain Protection</th>
                  <th className="py-4 px-6">Privacy</th>
                  <th className="py-4 px-6">Best For</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="py-6 px-6 font-bold text-white">PolyWeave 5%</td>
                  <td className="py-6 px-6 text-white/70">5%</td>
                  <td className="py-6 px-6 text-white/70">Partial</td>
                  <td className="py-6 px-6 text-white/70">Low</td>
                  <td className="py-6 px-6 text-white/70">Open views, partial shade</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.03] transition-colors relative">
                  <td className="py-6 px-6 font-bold text-blue-400">FiberWeave 1% <span className="ml-2 text-[0.55rem] uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/40">Popular</span></td>
                  <td className="py-6 px-6 text-white/70">1%</td>
                  <td className="py-6 px-6 text-white/70">Yes</td>
                  <td className="py-6 px-6 text-white/70">Yes</td>
                  <td className="py-6 px-6 text-white/70">Most popular in Singapore — weather + view</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="py-6 px-6 font-bold text-white">RainOut® Acoustic</td>
                  <td className="py-6 px-6 text-white/70">&lt;1%</td>
                  <td className="py-6 px-6 text-white/70">Full waterproof</td>
                  <td className="py-6 px-6 text-white/70">Yes</td>
                  <td className="py-6 px-6 text-white/70">Noise-sensitive balconies, STC 12 rating</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="py-6 px-6 font-bold text-white">RainOut® Blackout</td>
                  <td className="py-6 px-6 text-white/70">&lt;1%</td>
                  <td className="py-6 px-6 text-white/70">Full waterproof</td>
                  <td className="py-6 px-6 text-white/70">Full blackout</td>
                  <td className="py-6 px-6 text-white/70">Bedrooms, AV rooms</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="py-6 px-6 font-bold text-white">ClearView™ PVC</td>
                  <td className="py-6 px-6 text-white/70">0% (clear)</td>
                  <td className="py-6 px-6 text-white/70">Full waterproof</td>
                  <td className="py-6 px-6 text-white/70">None</td>
                  <td className="py-6 px-6 text-white/70">Restaurants, panoramic high-rise views</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. MOTOR & SMART CONTROLS */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="reveal">
            <span className="text-blue-500 font-bold tracking-[4px] uppercase text-xs block mb-4">Motorised or Manual</span>
            <h2 className="text-4xl font-black tracking-tighter mb-10">You Decide.</h2>
            <div className="space-y-8">
              <div className="glass-panel p-6 rounded-2xl hover:border-white/20 transition-colors">
                <h4 className="text-xl font-bold mb-2 flex items-center gap-2">Somfy® Motor <span className="text-[0.6rem] uppercase tracking-wider bg-white/10 text-white/70 px-2 py-1 rounded-full">Premium</span></h4>
                <p className="text-white/60 text-sm leading-relaxed">Designed and manufactured in France. 40–50mm diameter, 6–10Nm torque. IP44 splash-proof. Pairs with the Somfy® App, Amazon Alexa, and Google Home. 5-year warranty.</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl hover:border-white/20 transition-colors">
                <h4 className="text-xl font-bold mb-2 flex items-center gap-2">Dooya® Motor <span className="text-[0.6rem] uppercase tracking-wider bg-white/10 text-white/70 px-2 py-1 rounded-full">Value</span></h4>
                <p className="text-white/60 text-sm leading-relaxed">Made in Ningbo, China — part of the Somfy® Group. 35–45mm diameter. Dual Hall sensor for precise positioning. Obstacle detection. IP44 rated. 5-year warranty.</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl border-blue-500/30 bg-blue-500/5 hover:border-blue-500/50 transition-colors">
                <h4 className="text-xl font-bold text-blue-400 mb-2 flex items-center gap-2">DualDrive® <span className="text-[0.6rem] uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">Best of Both</span></h4>
                <p className="text-white/60 text-sm leading-relaxed mb-4">Our most recommended configuration. Motorised for everyday convenience. Fully manual override if there's a power outage.</p>
                <p className="font-serif italic text-white/80">"Motorised when you want it. Manual when you need it."</p>
              </div>
            </div>
          </div>
          <div className="reveal flex flex-col justify-center">
            <span className="text-blue-500 font-bold tracking-[4px] uppercase text-xs block mb-4">Smart Controls</span>
            <h2 className="text-4xl font-black tracking-tighter mb-10">Control From Anywhere.</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="text-3xl opacity-80">📱</div>
                <div>
                  <h4 className="font-bold">Somfy® App</h4>
                  <p className="text-white/50 text-sm">iOS & Android, control individual or all blinds remotely.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="text-3xl opacity-80">🗣️</div>
                <div>
                  <h4 className="font-bold">Voice Control</h4>
                  <p className="text-white/50 text-sm">Amazon Alexa & Google Assistant integration.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="text-3xl opacity-80">🏠</div>
                <div>
                  <h4 className="font-bold">Smart Home</h4>
                  <p className="text-white/50 text-sm">Integrates with Google Home and RF-compatible smart home hubs.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="text-3xl opacity-80">🌦️</div>
                <div>
                  <h4 className="font-bold">Auto Weather Sensors</h4>
                  <p className="text-white/50 text-sm">Wind and rain triggers that close your blinds automatically.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="text-3xl opacity-80">⏱️</div>
                <div>
                  <h4 className="font-bold">Scheduled Timers</h4>
                  <p className="text-white/50 text-sm">Open at sunrise, close at sunset — even while you're away.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. FRAME FINISHING */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-3xl overflow-hidden reveal glass-panel border-white/10">
            <Image 
              src="/assets/products/zipblinds/Zipblind images/Zipblind_product_color_202604031305.jpeg" 
              alt="Oxyplast Powder Coating Details" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="reveal">
            <span className="text-blue-500 font-bold tracking-[4px] uppercase text-xs block mb-4">Frame Finishing</span>
            <h2 className="text-4xl font-black tracking-tighter mb-6">Baked-On Durability, Not Just Paint.</h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Every aluminium track, pelmet, and bottom bar is powder-coated using <strong>Oxyplast by Lea Hin</strong> — Singapore's locally-produced powder coating, manufactured here since 1982.
            </p>
            <ol className="list-decimal list-inside space-y-3 text-white/50 text-sm mb-8">
              <li>Aluminium extrusions pre-treated with chrome-free chromatation etch.</li>
              <li>Powder electrostatically sprayed at 60–80 kV as a dry coat.</li>
              <li>Components oven-cured at 185–205°C for 10–25 minutes.</li>
              <li>Final film thickness: 60–80 µm (harder and thicker than paint).</li>
            </ol>
            <div className="bg-black/50 p-6 rounded-2xl border border-white/5">
              <h4 className="font-bold mb-2">Available Finishes</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                Standard Architectural (Qualicoat Class 2), Hyperdurable Fluoropolymer (Class 3), Wood Grain Image Transfer, plus Matt, Satin, Gloss, Hammertone, Metallic, and 257-colour RAL palette options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INSTALLATION PROCESS */}
      <section className="py-32 px-8 max-w-5xl mx-auto">
        <div className="text-center mb-20 reveal">
          <span className="text-blue-500 font-bold tracking-[4px] uppercase text-xs block mb-4">The Atrellis Process</span>
          <h2 className="text-5xl font-black tracking-tighter">From Enquiry to Completion</h2>
        </div>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {[
            { step: '01', title: 'Consultation', desc: "Contact us via WhatsApp or our web form. Share your space dimensions or photos. We'll recommend the right fabric, motor, and frame finish for your specific situation." },
            { step: '02', title: 'Site Measurement', desc: 'Our team visits your property for precise millimetre-accurate measurements and a full site assessment — wind exposure, mounting surface, MCST colour requirements, and invisible grille co-existence.' },
            { step: '03', title: 'Custom Fabrication', desc: 'Your blinds are built to order: fabric cut and spline-welded, roller tube assembled with your chosen motor or SuperSpring®, frames powder-coated in your selected Oxyplast colour.' },
            { step: '04', title: 'Installation', desc: 'Our 2-person team installs the bracket system, mounts the tracks, feeds the side splines into channels, connects power (motorised), and programs upper/lower travel limits.' },
            { step: '05', title: 'Testing & Handover', desc: 'We run full travel tests, confirm obstacle detection, pair your remote and app, and walk you through operation and basic maintenance.' },
            { step: '06', title: 'Warranty Coverage', desc: '5-year residential warranty, 3-year commercial warranty, 5-year motor manufacturer warranty (Somfy® & Dooya®), supported by a BCA-registered, licensed renovation contractor.' },
          ].map((item) => (
            <div key={item.step} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active reveal">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[#050505] text-blue-500 font-bold text-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(59,130,246,0.2)] z-10">
                {item.step}
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-2xl hover:border-white/20 transition-colors">
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. SPECIFICATIONS */}
      <section className="py-24 px-8 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl font-black tracking-tighter">Specifications At a Glance</h2>
        </div>
        <div className="glass-panel rounded-3xl overflow-hidden reveal">
          <table className="w-full text-left border-collapse text-sm">
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-4 px-6 font-bold text-white/50 w-1/3 border-r border-white/5">Max Width</td>
                <td className="py-4 px-6 text-white">6m (PanoView® — single blind, no centre post)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 px-6 font-bold text-white/50 border-r border-white/5">Max Height (Manual)</td>
                <td className="py-4 px-6 text-white">4.7m</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 px-6 font-bold text-white/50 border-r border-white/5">Max Height (Motorised)</td>
                <td className="py-4 px-6 text-white">6m</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 px-6 font-bold text-white/50 border-r border-white/5">Wind Rating</td>
                <td className="py-4 px-6 text-white">260 km/hr static (TÜV SÜD PSB Singapore)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 px-6 font-bold text-white/50 border-r border-white/5">Motor Frequency</td>
                <td className="py-4 px-6 text-white">433 MHz RF</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 px-6 font-bold text-white/50 border-r border-white/5">Motor IP Rating</td>
                <td className="py-4 px-6 text-white">IP44 (splash-proof)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 px-6 font-bold text-white/50 border-r border-white/5">Min Install Width</td>
                <td className="py-4 px-6 text-white">450mm (manual) / 800mm (motorised)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 px-6 font-bold text-white/50 border-r border-white/5">Mounting Surfaces</td>
                <td className="py-4 px-6 text-white">Concrete, steel, timber, brick</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 px-6 font-bold text-white/50 border-r border-white/5">Frame Coating</td>
                <td className="py-4 px-6 text-white">Oxyplast Powder Coat — Qualicoat Class 1, 2, or 3</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 px-6 font-bold text-white/50 border-r border-white/5">Smart Integrations</td>
                <td className="py-4 px-6 text-white">Somfy App, Alexa, Google Home, weather sensors</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 px-6 font-bold text-white/50 border-r border-white/5">Residential Warranty</td>
                <td className="py-4 px-6 text-white">5 years</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-bold text-white/50 border-r border-white/5">Commercial Warranty</td>
                <td className="py-4 px-6 text-white">3 years</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 9. CLOSING CTA */}
      <section className="py-32 px-8">
        <div className="max-w-4xl mx-auto glass-panel p-16 rounded-[40px] text-center border-blue-500/20 shadow-[0_0_50px_rgba(3,105,161,0.1)] reveal relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none"></div>
          <h2 className="text-4xl md:text-5xl font-serif italic mb-8 relative z-10">The Art of Refined Living</h2>
          <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto relative z-10">
            Sealed, automated, and engineered for Singapore.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <Link href="/quotation" className="glass-btn primary px-8 py-4 text-sm">GET A FREE QUOTE</Link>
            <Link href="https://wa.me/6592223333" className="glass-btn outline px-8 py-4 text-sm">WHATSAPP US NOW</Link>
            <Link href="/portfolio" className="glass-btn outline px-8 py-4 border-white/5 text-white/50 hover:text-white transition-colors text-sm">VIEW OUR PROJECTS</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
