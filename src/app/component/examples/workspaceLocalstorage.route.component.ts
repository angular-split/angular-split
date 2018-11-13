import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';

import { AComponent } from './AComponent';


interface IConfig {
    columns: Array<{
        visible: boolean,
        size: number,
        rows: Array<{
            visible: boolean,
            size: number,
            type: string
        }>
    }>
    disabled: boolean
}


const defaultConfig: IConfig = {
    columns: [
        {
            visible: true,
            size: 25,
            rows: [
                { visible: true, size: 25, type: 'A' },
                { visible: true, size: 75, type: 'B' }
            ]
        },
        {
            visible: true,
            size: 50,
            rows: [
                { visible: true, size: 60, type: 'doc' },
                { visible: true, size: 40, type: 'C' }    
            ]
        },
        {
            visible: true,
            size: 25,
            rows: [
                { visible: true, size: 20, type: 'D' },
                { visible: true, size: 30, type: 'E' },    
                { visible: true, size: 50, type: 'F' }    
            ]
        }
    ],
    disabled: false
};


@Component({
    selector: 'sp-ex-workspace-localstorage',
    styles: [`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        .bloc {
            height: 100%;
        }

        .explanations {
            padding: 15px;
        }

        .panel {
            font-size: 100px;
            font-weight: bold;
            color: #cccccc;

            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            overflow: hidden;
        }
        .panel > p {
            margin: 0;
        }
        button {
            margin-bottom: 10px;
        }
    `],
    template: `
        <as-split *ngIf="config" 
               direction="horizontal"
               [disabled]="config.disabled"
               (dragEnd)="onDragEnd(-1, $event)">
            <ng-template ngFor let-column [ngForOf]="config.columns" let-icol="index">
                <as-split-area *ngIf="column.visible"
                            [order]="icol" 
                            [size]="column.size">
                    <as-split direction="vertical"
                           [disabled]="config.disabled"
                           (dragEnd)="onDragEnd(icol, $event)">
                        <ng-template ngFor let-row [ngForOf]="column.rows" let-irow="index">
                            <as-split-area *ngIf="row.visible"
                                        [order]="irow" 
                                        [size]="row.size">
                                <div [ngSwitch]="row.type" class="bloc">
                                    <div *ngSwitchCase="'doc'" class="explanations">
                                        <sp-example-title [type]="exampleEnum.WORKSPACE"></sp-example-title>
                                        <p>All areas size and visibility are saved to localStorage.<br>
                                        Toggle areas visibility using following buttons:</p>
                                        <ng-template ngFor let-c [ngForOf]="config.columns">
                                            <ng-template ngFor let-r [ngForOf]="c.rows">
                                                <button *ngIf="r.type !== 'doc'"
                                                        (click)="r.visible = !r.visible; refreshColumnVisibility()" 
                                                        [class.active]="!r.visible"
                                                        class="btn btn-warning">{{ r.type }}</button>
                                            </ng-template>
                                        </ng-template>
                                        <br>
                                        <button class="btn btn-warning" [class.active]="!config.disabled" (click)="toggleDisabled()">{{ 'isDisabled: ' + config.disabled }}</button>
                                        <br>
								        <button (click)="resetConfig()" class="btn btn-warning">Reset localStorage</button>
                                    </div>
                                    <div *ngSwitchDefault class="panel">
                                        <p>{{ row.type }}</p>
                                    </div>
                                </div>
                            </as-split-area>
                        </ng-template>
                    </as-split>
                </as-split-area>
            </ng-template>
        </as-split>`
})
export class WorkspaceLocalstorageComponent extends AComponent implements OnInit {
    localStorageName = 'angular-split-ws'
    config: IConfig = null

    ngOnInit() {
        if(localStorage.getItem(this.localStorageName)) {
            this.config = JSON.parse(localStorage.getItem(this.localStorageName));
        }
        else {
            this.resetConfig();
        }
    }

    resetConfig() {
        this.config = cloneDeep(defaultConfig);

        localStorage.removeItem(this.localStorageName);
    }

    onDragEnd(columnindex: number, e: {gutterNum: number, sizes: Array<number>}) {
        // Column dragged
        if(columnindex === -1) {
            // Set size for all visible columns
            this.config.columns.filter(c => c.visible === true).forEach((column, index) => column.size = e.sizes[index]);
        }
        // Row dragged
        else {
            // Set size for all visible rows from specified column
            this.config.columns[columnindex].rows.filter(r => r.visible === true).forEach((row, index) => row.size = e.sizes[index]);
        }

        this.saveLocalStorage();
    }

    toggleDisabled() {
        this.config.disabled = !this.config.disabled;

        this.saveLocalStorage();
    }

    refreshColumnVisibility() {
        // Refresh columns visibility based on inside rows visibilities (If no row > hide column)
        this.config.columns.forEach((column, index) => {
            column.visible = column.rows.some(row => row.visible === true);
        });

        this.saveLocalStorage();
    }

    saveLocalStorage() {
        localStorage.setItem(this.localStorageName, JSON.stringify(this.config));
    }
}
