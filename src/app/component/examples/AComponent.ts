import { ExampleEnum } from '../../data/enum';
import { formatDate } from '../../service/utils';


export class AComponent {
    exampleEnum = ExampleEnum

    testChangeDetectorRun() {
        console.log(`${ formatDate(new Date()) } > AComponent.ts - Change detector run just now!`);

        return '';
    }
}
