import { Component } from '@angular/core';
import { ScrollService } from '../../../../services';

@Component({
    selector: 'skills',
    templateUrl: 'skills.template.html',
    styleUrls: ['skills.styles.scss']
})
export class SkillsComponent {

    constructor(private scrollService: ScrollService) {
        //
    }

    // METHODS

    public trackScrollEnter() {
        this.scrollService.changeActive('skills');
    }
}
