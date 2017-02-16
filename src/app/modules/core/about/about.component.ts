import * as _ from 'lodash';
import { Component } from '@angular/core';
import { HelpersService, SeoService } from '../../../services';

@Component({
    selector: 'about',
    templateUrl: 'about.template.html',
    styleUrls: ['about.styles.scss']
})
export class AboutComponent {

    constructor(private helpersService: HelpersService,
                private seoService: SeoService) {
        //
    }

    public trackEnter() {
        this.helpersService.changeUrl('about');
    }
}
