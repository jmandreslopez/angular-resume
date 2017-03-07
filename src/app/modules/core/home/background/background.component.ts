import { Component } from '@angular/core';
import { ScrollService } from '../../../../services';

@Component({
	selector: 'background',
	templateUrl: 'background.template.html',
	styleUrls: ['background.styles.scss']
})
export class BackgroundComponent {

    constructor(private scrollService: ScrollService) {
        //
    }

    // METHODS

    public trackScrollEnter() {
        this.scrollService.changeActive('background');
    }
}
