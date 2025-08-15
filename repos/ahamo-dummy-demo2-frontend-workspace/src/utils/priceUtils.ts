import { SmartphoneProduct } from '@/types'

export function parsePrice(priceString: string): number {
  const cleanPrice = priceString.replace(/[円,〜]/g, '').trim()
  return parseInt(cleanPrice, 10) || 0
}

export function sortSmartphones(
  smartphones: SmartphoneProduct[],
  sortOrder: string
): SmartphoneProduct[] {
  const sorted = [...smartphones]

  switch (sortOrder) {
    case 'price-low':
      return sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    case 'price-high':
      return sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
    case 'newest':
      return sorted.reverse()
    case 'recommended':
    default:
      return sorted
  }
}
