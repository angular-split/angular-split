import type { SplitAreaSize, SplitUnit } from './models'
import type { SplitAreaComponent } from './split-area/split-area.component'
import { sum } from './utils'

export function areAreasValid(areas: readonly SplitAreaComponent[], unit: SplitUnit, logWarnings: boolean): boolean {
  if (areas.length === 0) {
    return true
  }

  const areaSizes = areas.map((area): SplitAreaSize => {
    const size = area.size()
    return size === 'auto' ? '*' : size
  })

  const wildcardAreas = areaSizes.filter((areaSize) => areaSize === '*')

  if (wildcardAreas.length > 1) {
    if (logWarnings) {
      console.warn('as-split: Maximum one * area is allowed')
    }

    return false
  }

  if (unit === 'pixel') {
    if (wildcardAreas.length === 1) {
      return true
    }

    if (logWarnings) {
      console.warn('as-split: Pixel mode must have exactly one * area')
    }

    return false
  }

  const sumPercent = sum(areaSizes, (areaSize) => (areaSize === '*' ? 0 : areaSize))

  // As percent calculation isn't perfect we allow for a small margin of error
  if (wildcardAreas.length === 1) {
    if (sumPercent <= 100.1) {
      return true
    }

    if (logWarnings) {
      console.warn(`as-split: Percent areas must total 100%`)
    }

    return false
  }

  if (sumPercent < 99.9 || sumPercent > 100.1) {
    if (logWarnings) {
      console.warn('as-split: Percent areas must total 100%')
    }

    return false
  }

  return true
}
