import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[appGreen]'
})
export class GreenDirective {

    constructor(private el: ElementRef) {
        el.nativeElement.style.color = '#00FF00';
    }
}
