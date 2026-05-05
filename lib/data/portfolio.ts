// lib/data/portfolio.ts
// Single source of truth for Atrellis portfolio projects.
// Previously duplicated across app/services/client.tsx and app/portfolio/client.tsx.

import type { AtrellisProject } from '@/types/atrellis'

export const ATRELLIS_PROJECTS: AtrellisProject[] = [
  {
    slug: 'sentosa-cove',
    title: 'Sentosa Cove Waterfront',
    location: 'Ocean Drive, Sentosa',
    category: 'Landed A&A · Outdoor Structures',
    vost: 'S$45,000 – S$65,000',
    description:
      'A complete terrace overhaul for a prestigious waterfront penthouse — heavy-duty structural framework supporting oversized AtrellisZipblinds® against coastal wind loads.',
    thumbnail: '/assets/portfolio/sentosa_cove.png',
    tags: ['AtrellisZipblinds®', 'Galvanized Steel', 'BCA Compliant'],
    featured: true,
  },
  {
    slug: 'marina-one',
    title: 'Marina One Smart Loft',
    location: 'Marina Way, Core Central Region',
    category: 'Luxury Residential · Smart Home',
    vost: 'S$25,000 – S$35,000',
    description:
      'Transforming a cluttered urban loft into a minimalist Japandi sanctuary through hidden storage architecture, Korean Combi systems, and smart lighting automation.',
    thumbnail: '/assets/portfolio/marina_one_loft.png',
    tags: ['Korean Combi', 'Smart Lighting', 'Japandi'],
    featured: true,
  },
]
