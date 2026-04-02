import type { SplitAreaComponent } from '../split-area/split-area.component'

export interface SplitGutterContext {
  /**
   * The area before the gutter.
   * In RTL the right area and in LTR the left area
   */
  areaBefore: SplitAreaComponent
  /**
   * The area after the gutter.
   * In RTL the left area and in LTR the right area
   */
  areaAfter: SplitAreaComponent
  /**
   * The absolute number of the gutter based on direction (RTL and LTR).
   * First gutter is 1, second is 2, etc...
   */
  gutterNum: number
  /**
   * Whether this is the first gutter.
   * In RTL the most right area and in LTR the most left area
   */
  first: boolean
  /**
   * Whether this is the last gutter.
   * In RTL the most left area and in LTR the most right area
   */
  last: boolean
  /**
   * Whether the gutter is being dragged now
   */
  isDragged: boolean
}
