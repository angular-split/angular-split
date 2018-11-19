import { ExampleEnum } from '../../data/enum';


export class AComponent {
    exampleEnum = ExampleEnum

    testChangeDetectorRun() {
        console.log('Change detector run just now !', Date.now())
        return '';
    }
}
