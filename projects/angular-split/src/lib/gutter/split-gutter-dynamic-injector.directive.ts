import { Injector, Directive, ViewContainerRef, TemplateRef, input, effect, inject } from '@angular/core'
import { GUTTER_NUM_TOKEN } from './gutter-num-token'

interface SplitGutterDynamicInjectorTemplateContext {
  $implicit: Injector
}

/**
 * This directive allows creating a dynamic injector inside ngFor
 * with dynamic gutter num and expose the injector for ngTemplateOutlet usage
 */
@Directive({
  selector: '[asSplitGutterDynamicInjector]',
})
export class SplitGutterDynamicInjectorDirective {
  private readonly vcr = inject(ViewContainerRef)
  private readonly templateRef = inject<TemplateRef<SplitGutterDynamicInjectorTemplateContext>>(TemplateRef)

  readonly gutterNum = input.required<number>({ alias: 'asSplitGutterDynamicInjector' })

  constructor() {
    effect(() => {
      this.vcr.clear()

      const injector = Injector.create({
        providers: [
          {
            provide: GUTTER_NUM_TOKEN,
            useValue: this.gutterNum(),
          },
        ],
        parent: this.vcr.injector,
      })

      this.vcr.createEmbeddedView(this.templateRef, { $implicit: injector })
    })
  }

  static ngTemplateContextGuard(
    _dir: SplitGutterDynamicInjectorDirective,
    ctx: unknown,
  ): ctx is SplitGutterDynamicInjectorTemplateContext {
    return true
  }
}
