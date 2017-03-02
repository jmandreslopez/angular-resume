import * as _ from 'lodash';
import { Component } from '@angular/core';
import { HelpersService, SeoService } from '../../../services';

@Component({
    selector: 'skills',
    templateUrl: 'skills.template.html',
    styleUrls: ['skills.styles.scss']
})
export class SkillsComponent {

    constructor(private helpersService: HelpersService,
                private seoService: SeoService) {
        //
    }

    public trackScrollEnter() {
        this.helpersService.changeUrl('skills');
    }
}
