import * as _ from 'lodash';
import { Component } from '@angular/core';
import { HelpersService, SeoService } from '../../../services';

@Component({
	selector: 'background',
	templateUrl: 'background.template.html',
	styleUrls: ['background.styles.scss']
})
export class BackgroundComponent {

    constructor(private helpersService: HelpersService,
                private seoService: SeoService) {
        //
    }

    public trackScrollEnter() {
        this.helpersService.changeUrl('background');
    }
}
