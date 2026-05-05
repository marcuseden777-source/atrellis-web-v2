// lib/data/services.ts
// Single source of truth for Atrellis service definitions.
// Previously hardcoded in app/services/client.tsx.

import type { AtrellisService } from '@/types/atrellis'

export const ATRELLIS_SERVICES: AtrellisService[] = [
  {
    id: 1,
    slug: 'residential-turnkey',
    title: 'Residential Turnkey',
    description: 'Complete design-and-build solutions for HDB BTO, Resale, and Luxury Condominiums.',
    features: ['BTO Package Optimization', 'Condo Spatial Flow', 'Integrated ID & Build'],
    href: '/services',
    category: 'renovation',
  },
  {
    id: 2,
    slug: 'architectural-aa',
    title: 'Architectural A&A',
    description: 'Additions & Alterations for Landed Properties, managing structural extensions and facade rebuilds.',
    features: ['BCA & URA Submissions', 'Licensed PE/Architect Support', 'Landed Property Rebuilds'],
    href: '/services/aa-structural',
    category: 'structural',
  },
  {
    id: 3,
    slug: 'waterproofing',
    title: 'Waterproofing & Sealing',
    description: 'Professional seepage repair using the latest injection and membrane technologies.',
    features: ['No-Hacking PU Grouting', 'Torch-on Roofing Membrane', '24hr Water Ponding Tests'],
    href: '/services',
    category: 'waterproofing',
  },
  {
    id: 4,
    slug: 'bespoke-carpentry',
    title: 'Bespoke Carpentry',
    description: 'Precision-engineered woodwork for premium kitchens and architectural built-ins.',
    features: ['Quartz & Sintered Stone', 'Blum/Hettich Hardware', 'Custom Floor-to-Ceiling'],
    href: '/services',
    category: 'joinery',
  },
  {
    id: 5,
    slug: 'smart-ecosystems',
    title: 'Smart Ecosystems',
    description: 'Hardwired smart home automation specializing in motorized shading and climate control.',
    features: ['Somfy Home Automation', 'Voice-Controlled Blinds', 'Integrated App Ecosystems'],
    href: '/services',
    category: 'smart',
  },
  {
    id: 6,
    slug: 'outdoor-living',
    title: 'Outdoor Living',
    description: 'Structural balcony and roof extensions utilizing heavy-duty galvanized steel framing.',
    features: ['Galvanized Steel Structures', 'Weatherproof Decking', 'Architectural Cladding'],
    href: '/services',
    category: 'outdoor',
  },
]
