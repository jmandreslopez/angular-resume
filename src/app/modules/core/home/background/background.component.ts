import { Component } from '@angular/core';
import { HelpersService } from '../../../../services';

@Component({
	selector: 'background',
	templateUrl: 'background.template.html',
	styleUrls: ['background.styles.scss']
})
export class BackgroundComponent {

    constructor(private helpersService: HelpersService) {
        //
    }

    public trackScrollEnter() {
        this.helpersService.changeUrl('background');
    }
}
