import { Component } from '@angular/core';
import { HelpersService } from '../../../../services';

@Component({
    selector: 'skills',
    templateUrl: 'skills.template.html',
    styleUrls: ['skills.styles.scss']
})
export class SkillsComponent {

    constructor(private helpersService: HelpersService) {
        //
    }

    public trackScrollEnter() {
        this.helpersService.changeUrl('skills');
    }
}
