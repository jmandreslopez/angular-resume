import * as _ from 'lodash';
import { Directive, Output, HostListener, ElementRef, EventEmitter } from '@angular/core';

@Directive({
    selector: '[track-scroll]'
})
export class TrackScrollDirective {
    @Output() trackEnter = new EventEmitter<boolean>();
    private status: string = 'outside';

    constructor(private element: ElementRef) {
        //
    }

    @HostListener('document:scroll', ['$event'])
    private scroll() {
        let offsetTop = this.element.nativeElement.offsetTop;
        let offsetHeight = this.element.nativeElement.offsetHeight;
        let offsetBottom = offsetTop + offsetHeight;
        let scrollY = (window.innerHeight / 2) + window.scrollY;

        if (_.inRange(scrollY, offsetTop, offsetBottom)) {
            if (this.status === 'outside') {
                this.status = 'inside';
                this.trackEnter.emit(true);
            }
        }
        else {
            this.status = 'outside';
        }
    }
}
