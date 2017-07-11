import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: 'split-gutter'
})
export class SplitGutterDirective {

    @Input() set order(v: number) {
        this.setStyle('order', v);
    }

    private _direction: string;
    @Input() set direction(v: string) {
        this._direction = v;
        this.refreshStyle();
    }

    private _size: number;
    @Input() set size(v: number) {
        this._size = v;
        this.refreshStyle();
    }

    private _disabled: boolean = false;
    @Input() set disabled(v: boolean) {
        this._disabled = v;
        this.refreshStyle();
    }

    private _image: string;
    @Input() set image(v: string) {
        this._image = v;
        this.refreshStyle();
    }

    constructor(private elementRef: ElementRef,
                private renderer: Renderer) {}

    private refreshStyle() {
        this.setStyle('flex-basis', `${ this._size }px`);
        
        // fix safari bug about gutter height when direction is horizontal
        this.setStyle('height', (this._direction === 'vertical') ? `${ this._size }px` : `100%`);

        const state = (this._disabled === true) ? 'disabled' : this._direction;
        this.setStyle('cursor', this.getCursor(state));

        this.setStyle('background-image', this._image || `url("${ this.getImage(state) }")`);
    }

    private setStyle(key: string, value: any) {
        this.renderer.setElementStyle(this.elementRef.nativeElement, key, value);
    }

    private getCursor(state: string) {
        switch(state) {
            case 'disabled':
                return 'default';

            case 'vertical':
                return 'row-resize';

            case 'horizontal':
                return 'col-resize';
        }
    }

    private getImage(state: string) {
        switch(state) {
            case 'disabled':
                return '';

            case 'vertical':
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC';

            case 'horizontal':
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==';
        }
    }
}
