import { PropertyType, PriceEstimate } from './types';

const PRICING_MATRIX_2026: Record<PropertyType, { low: number; high: number; notes: string }> = {
  'HDB BTO': {
    low: 60000,
    high: 95000,
    notes: 'New unit, clean slate. Excludes hacking if original finishes are kept.',
  },
  'HDB Resale': {
    low: 95000,
    high: 150000,
    notes: 'Includes hacking and disposal of existing fixtures. Scope-dependent.',
  },
  'Condo': {
    low: 100000,
    high: 200000,
    notes: 'MC regulations apply. MCST approval timeline must be factored in.',
  },
  'Landed': {
    low: 150000,
    high: 300000,
    notes: 'Structural works, roofing, and outdoor scopes can extend upper range significantly.',
  },
  'Commercial': {
    low: 0,
    high: 0,
    notes: 'Priced per scope. Requires site assessment. URA/BCA compliance included.',
  },
  'Shophouse': {
    low: 120000,
    high: 250000,
    notes: 'Conservation requirements (URA) apply. Heritage facade guidelines strictly followed.',
  },
};

export function getPriceEstimate(propertyType: PropertyType): PriceEstimate {
  const matrix = PRICING_MATRIX_2026[propertyType];
  return {
    propertyType,
    lowRange: matrix.low,
    highRange: matrix.high,
    currency: 'SGD',
    notes: matrix.notes,
  };
}

export function formatPriceRange(estimate: PriceEstimate): string {
  if (estimate.lowRange === 0) {
    return `Commercial fit-outs are priced based on scope and floor area. Andrew will provide a detailed breakdown after the site assessment.`;
  }
  const low = estimate.lowRange.toLocaleString('en-SG');
  const high = estimate.highRange.toLocaleString('en-SG');
  return `For a ${estimate.propertyType}, the typical investment range in 2026 is **S$${low} – S$${high}**. ${estimate.notes} These are market benchmarks — a site visit with Andrew gives you a much sharper number specific to your layout and brief.`;
}

// Carpentry rough guide (per foot run, PFR)
export const CARPENTRY_PFR_2026 = {
  laminate: { low: 350, high: 500, unit: 'SGD/ft run' },
  veneer: { low: 500, high: 800, unit: 'SGD/ft run' },
  solidTimber: { low: 800, high: 1400, unit: 'SGD/ft run' },
  paintedMDF: { low: 280, high: 420, unit: 'SGD/ft run' },
};

// Structural / roofing material guide (measurements in MM)
export const STRUCTURAL_MATERIALS_2026 = {
  galvanizedSteel: 'Primary structural framing. Thickness: 1.5mm–3mm. Hot-dip galvanized for outdoor longevity.',
  polycarbonate: 'Roofing panels. Twin-wall 10mm or 16mm. UV-coated. ~80% light transmission.',
  acp: 'Aluminium Composite Panel (ACP). 4mm standard. Used for facade cladding and feature walls.',
  brushedAluminium: 'Finishing profiles and trims. 1mm–2mm. Anodized for oxidation resistance.',
  compositePanels: 'Roofing and cladding. Zinc-aluminium alloy. Lightweight, low maintenance.',
};
