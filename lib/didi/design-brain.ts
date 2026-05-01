import { HybridStyle } from './types';

export const HYBRID_STYLES_2026: HybridStyle[] = [
  {
    name: 'Soft Brutalism',
    tagline: 'Raw structure. Warm soul.',
    description:
      'Celebrates structural honesty — exposed concrete, galvanized steel frames — but softened with biophilic elements (climbing plants, moss walls) and warm layered lighting. The result feels curated, not cold.',
    triggerKeywords: ['industrial', 'raw', 'concrete', 'steel', 'edgy', 'urban', 'loft'],
    materials: ['Board-formed concrete texture', 'Brushed Aluminium profiles', 'Galvanized Steel framing', 'Warm Edison-style lighting', 'Textured plaster walls'],
    atellisTip:
      "We use galvanized steel as the structural skeleton, then let plants and warm lighting do the softening. You get the grit without it feeling like a bunker.",
  },
  {
    name: 'Modern Heritage',
    tagline: 'Singapore history. 2026 function.',
    description:
      'The Singapore edition of heritage design — mixing classic architectural details (Peranakan tile motifs, ventilation blocks, colonial moldings) with contemporary materials like Composite Panels and motorised Zipblinds.',
    triggerKeywords: ['traditional', 'peranakan', 'heritage', 'classic', 'colonial', 'shophouse', 'black and white', 'bungalow', 'balinese', 'kampong'],
    materials: ['Peranakan-inspired encaustic tiles', 'Composite Panel roofing', 'Zipblind motorised systems', 'Teak accents', 'Ventilation block feature walls'],
    atellisTip:
      'We bridge the gap — heritage detail where it matters for character, 2026 materials where it matters for durability and light control.',
  },
  {
    name: 'Boho-Industrial',
    tagline: 'Steel structure. Warm life.',
    description:
      'High-tech Zipblind systems and structural steel provide the industrial skeleton. Layered rattan, earthy textiles, terracotta, and greenery bring the lifestyle warmth. Popular for balcony transformations.',
    triggerKeywords: ['boho', 'bohemian', 'lifestyle', 'cosy', 'garden', 'balcony', 'outdoor', 'rattan', 'plants', 'tropical'],
    materials: ['Zipblind structural frames', 'Galvanized Steel posts', 'Rattan / cane furniture', 'Terracotta planters', 'Linen and cotton textiles', 'Trailing indoor plants'],
    atellisTip:
      'The Zipblinds give you the industrial bones. Add rattan furniture and trailing pothos — suddenly it reads café, not construction site.',
  },
  {
    name: 'Usonian Integration',
    tagline: 'Where inside meets outside.',
    description:
      'Inspired by Frank Lloyd Wright\'s Usonian principles, adapted for Singapore\'s climate. Zipblind systems are engineered so indoor flooring continues seamlessly to the outdoor — no visual or physical break between zones.',
    triggerKeywords: ['open', 'airy', 'indoor outdoor', 'seamless', 'flow', 'nature', 'resort', 'villa', 'landed', 'big balcony'],
    materials: ['Full-width Zipblind track systems', 'Continuous floor tiles (indoor to outdoor)', 'Louvred feature walls', 'Polycarbonate roof panels for natural light', 'Low-profile thresholds'],
    atellisTip:
      'We design the blind system first, then work the flooring and ceiling backwards from it. The result feels like a resort, not a home with a bolt-on balcony.',
  },
];

export function matchStyleFromKeyword(userInput: string): HybridStyle | null {
  const lower = userInput.toLowerCase();
  for (const style of HYBRID_STYLES_2026) {
    if (style.triggerKeywords.some((kw) => lower.includes(kw))) {
      return style;
    }
  }
  return null;
}

export function formatStylePitch(style: HybridStyle): string {
  return `Based on what you're describing, I think **${style.name}** would be a strong fit — "${style.tagline}". ${style.description}\n\nFrom Atrellis' side: "${style.atellisTip}"\n\nKey materials: ${style.materials.slice(0, 3).join(', ')}. Want me to elaborate on any of these elements, or shall we talk about how this would work in your specific space?`;
}
