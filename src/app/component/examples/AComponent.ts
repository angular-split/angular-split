import { ExampleEnum } from '../../data/enum'
import { formatDate } from '../../utils/format-date'

export class AComponent {
  exampleEnum = ExampleEnum

  testChangeDetectorRun() {
    console.log(`${formatDate(new Date())} > AComponent.ts - Change detection just run!`)

    return ''
  }
}
