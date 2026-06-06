import { Directive, inject, TemplateRef } from '@angular/core'
import type { SplitGutterContext } from './split-gutter-context'

export type SplitGutterTemplateContext = SplitGutterContext

@Directive({
  selector: '[asSplitGutter]',
})
export class SplitGutterDirective {
  readonly template = inject<TemplateRef<SplitGutterTemplateContext>>(TemplateRef)

  static ngTemplateContextGuard(_dir: SplitGutterDirective, ctx: unknown): ctx is SplitGutterTemplateContext {
    return true
  }
}
