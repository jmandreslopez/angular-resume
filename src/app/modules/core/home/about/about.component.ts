import { Component } from '@angular/core';
import { ScrollService } from '../../../../services';

@Component({
    selector: 'about',
    templateUrl: 'about.template.html',
    styleUrls: ['about.styles.scss']
})
export class AboutComponent {

    constructor(private scrollService: ScrollService) {
        //
    }

    // METHODS

    public trackScrollEnter() {
        this.scrollService.changeActive('about');
    }
}
