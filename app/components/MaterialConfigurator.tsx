'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const COLORS = [
  { name: 'Natural', hex: '#E5E7EB', img: '/assets/visuals/zipblinds_tech.png' },
  { name: 'Slate', hex: '#4B5563', img: '/assets/visuals/zipblinds_tech.png' }, // Ideally specific color variants
  { name: 'Charcoal', hex: '#1F2937', img: '/assets/visuals/zipblinds_tech.png' },
  { name: 'Bronze', hex: '#78350F', img: '/assets/visuals/zipblinds_tech.png' },
];

export default function MaterialConfigurator() {
  const [selectedColor, setSelectedColor] = useState(COLORS[2]);

  return (
    <div className="bg-white/2 border border-white/10 rounded-[40px] p-8 md:p-12 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Visualizer */}
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 bg-black">
          <Image 
            src={selectedColor.img} 
            alt="Zipblind Configurator" 
            fill
            className="object-cover transition-opacity duration-500"
            style={{ filter: `hue-rotate(${selectedColor.name === 'Bronze' ? '45deg' : '0deg'}) scale(1)` }} // Simulating variants
          />
          <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-[0.6rem] font-bold tracking-[2px] uppercase">
            Live Preview: {selectedColor.name}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-10">
          <div>
            <h3 className="text-2xl font-black tracking-tight mb-2 uppercase">Atrellis Climate-Shield™ Config</h3>
            <p className="text-white/40 text-sm">Select a proprietary fabric tone to visualize your architectural shading.</p>
          </div>

          <div className="space-y-6">
            <span className="text-[0.6rem] font-bold tracking-[3px] uppercase text-white/30">Fabric Tone Selection</span>
            <div className="flex flex-wrap gap-4">
              {COLORS.map((color) => (
                <button 
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-16 h-16 rounded-2xl border-2 transition-all p-1 ${selectedColor.name === color.name ? 'border-blue-500 scale-110 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <div className="w-full h-full rounded-xl" style={{ backgroundColor: color.hex }}></div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <span className="text-[0.6rem] uppercase tracking-[2px] text-white/30">Durability</span>
              <p className="text-sm font-bold">10+ Year Lifecycle</p>
            </div>
            <div className="space-y-1">
              <span className="text-[0.6rem] uppercase tracking-[2px] text-white/30">Visibility</span>
              <p className="text-sm font-bold">One-Way Translucency</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
