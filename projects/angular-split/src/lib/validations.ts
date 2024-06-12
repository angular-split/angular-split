import { isDevMode } from '@angular/core'
import { SplitUnit } from './models'
import { SplitAreaComponent } from './split-area/split-area.component'
import { sum } from './utils'

export function areAreasValid(areas: readonly SplitAreaComponent[], unit: SplitUnit): boolean {
  if (areas.length === 0) {
    return true
  }

  const wildcardAreas = areas.filter((area) => area._internalSize() === '*')

  if (wildcardAreas.length > 1) {
    if (isDevMode()) {
      console.warn('as-split: Maximum one * area is allowed')
    }

    return false
  }

  if (unit === 'pixel') {
    if (wildcardAreas.length === 1) {
      return true
    }

    if (isDevMode()) {
      console.warn('as-split: Pixel mode must have one * area')
    }

    return false
  }

  const sumPercent = sum(areas, (area) => {
    const size = area._internalSize()
    return size === '*' ? 0 : size
  })

  // As percent calculation isn't perfect we allow for a small margin of error
  if (wildcardAreas.length === 1) {
    if (sumPercent <= 100.1) {
      return true
    }

    if (isDevMode()) {
      console.warn(`as-split: Percent areas must total 100%`)
    }

    return false
  }

  if (sumPercent < 99.9 || sumPercent > 100.1) {
    if (isDevMode()) {
      console.warn('as-split: Percent areas must total 100%')
    }

    return false
  }

  return true
}
