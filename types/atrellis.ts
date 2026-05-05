// types/atrellis.ts
// Domain types for Atrellis Design & Build

export interface AtrellisService {
  id: number
  slug: string
  title: string
  description: string
  features: string[]
  /** Deep-link to the service detail page */
  href: string
  category: 'renovation' | 'structural' | 'waterproofing' | 'joinery' | 'smart' | 'outdoor'
}

export interface AtrellisProject {
  slug: string
  title: string
  location: string
  category: string
  /** Indicative value-of-scope-of-work range, e.g. "S$45,000 – S$65,000" */
  vost: string
  description: string
  thumbnail: string
  tags: string[]
  featured?: boolean
}

export interface QuoteRequest {
  contact: {
    name: string
    email: string
    phone: string
  }
  selections: {
    propertyType: string
    propertySize: string
    style: string
    scope: string[]
    budget: string
  }
  estimate: string
}
