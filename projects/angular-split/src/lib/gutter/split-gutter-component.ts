import type { InputSignal } from '@angular/core'
import type { SplitGutterContext } from './split-gutter-context'

export interface SplitGutterComponent {
  context: InputSignal<SplitGutterContext>
}
