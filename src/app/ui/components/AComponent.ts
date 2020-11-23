import { ExampleEnum } from '../../examples/example-types'
import { formatDate } from '../../utils/format-date'

export class AComponent {
  exampleEnum = ExampleEnum

  testChangeDetectorRun() {
    console.log(`${formatDate(new Date())} > AComponent.ts - Change detection just ran!`)

    return ''
  }
}
