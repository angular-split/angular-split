import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: 'split-gutter'
})
export class SplitGutterDirective {

    @Input() set order(v: number) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'order', v);
    }
    
    ////

    private _direction: string;
    
    @Input() set direction(v: string) {
        this._direction = v;
        this.refreshStyle();
    }
    
    get direction(): string {
        return this._direction;
    }
    
    ////

    private _size: number;

    @Input() set size(v: number) {
        this._size = v;
        this.refreshStyle();
    }
    
    get size(): number {
        return this._size;
    }
    
    ////

    private _disabled: boolean = false;

    @Input() set disabled(v: boolean) {
        this._disabled = v;
        this.refreshStyle();
    }
    
    get disabled(): boolean {
        return this._disabled;
    }
    
    ////

    constructor(private elementRef: ElementRef,
                private renderer: Renderer2) {}

    private refreshStyle(): void {
        this.renderer.setStyle(this.elementRef.nativeElement, 'flex-basis', `${ this.size }px`);
        
        // fix safari bug about gutter height when direction is horizontal
        this.renderer.setStyle(this.elementRef.nativeElement, 'height', (this.direction === 'vertical') ? `${ this.size }px` : `100%`);

        const state = (this.disabled === true) ? 'disabled' : this.direction;
        this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', getCursor(state));
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', `url("${ getImage(state) }")`);
    }
}



function getCursor(state: string): string {
    switch(state) {
        case 'disabled':
            return 'default';

        case 'vertical':
            return 'row-resize';

        case 'horizontal':
            return 'col-resize';
    }
    return '';
}

function getImage(state: string): string {
    switch(state) {
        case 'vertical':
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC';
        
        case 'horizontal':
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==';
        
        case 'disabled':
            return '';
    }
    return '';
}
