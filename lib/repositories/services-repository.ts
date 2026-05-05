import { ATRELLIS_SERVICES } from '@/lib/data/services'
import type { AtrellisService } from '@/types/atrellis'

export const ServicesRepository = {
  findAll(): AtrellisService[] {
    return ATRELLIS_SERVICES
  },
  findBySlug(slug: string): AtrellisService | undefined {
    return ATRELLIS_SERVICES.find((s) => s.slug === slug)
  },
  findByCategory(category: AtrellisService['category']): AtrellisService[] {
    return ATRELLIS_SERVICES.filter((s) => s.category === category)
  },
}
