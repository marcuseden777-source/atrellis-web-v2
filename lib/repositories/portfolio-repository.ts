import { ATRELLIS_PROJECTS } from '@/lib/data/portfolio'
import type { AtrellisProject } from '@/types/atrellis'

export const PortfolioRepository = {
  findAll(): AtrellisProject[] {
    return ATRELLIS_PROJECTS
  },
  findFeatured(): AtrellisProject[] {
    return ATRELLIS_PROJECTS.filter((p) => p.featured)
  },
  findBySlug(slug: string): AtrellisProject | undefined {
    return ATRELLIS_PROJECTS.find((p) => p.slug === slug)
  },
  getAllTags(): string[] {
    return Array.from(new Set(ATRELLIS_PROJECTS.flatMap((p) => p.tags)))
  },
  findByTag(tag: string): AtrellisProject[] {
    return ATRELLIS_PROJECTS.filter((p) => p.tags.includes(tag))
  },
}
