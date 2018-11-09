import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ChangelogService } from '../changelog.service';

@Component({
    selector: 'sp-ex-changelog',
    styles: [`
        :host {
            display: block;
            width: 100%;
            margin: 50px 0;
        }
    `],
    template: `
        <div class="container">
            <div [innerHTML]="changelogHtml$ | async"></div>
        </div>`
})
export class ChangelogComponent implements OnInit {
    changelogHtml$: Observable<string>

    constructor(private changelogService: ChangelogService) {}

    ngOnInit() {
        this.changelogHtml$ = this.changelogService.getHtml();
    }
}
