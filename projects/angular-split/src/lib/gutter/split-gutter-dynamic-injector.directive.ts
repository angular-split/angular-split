import { Injector, Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core'
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
  @Input('asSplitGutterDynamicInjector')
  set gutterNum(value: number) {
    this.vcr.clear()

    const injector = Injector.create({
      providers: [
        {
          provide: GUTTER_NUM_TOKEN,
          useValue: value,
        },
      ],
      parent: this.vcr.injector,
    })

    this.vcr.createEmbeddedView(this.templateRef, { $implicit: injector })
  }

  constructor(
    private vcr: ViewContainerRef,
    private templateRef: TemplateRef<SplitGutterDynamicInjectorTemplateContext>,
  ) {}

  static ngTemplateContextGuard(
    dir: SplitGutterDynamicInjectorDirective,
    ctx: unknown,
  ): ctx is SplitGutterDynamicInjectorTemplateContext {
    return true
  }
}
