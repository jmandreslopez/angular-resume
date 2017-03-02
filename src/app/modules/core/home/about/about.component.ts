import { Component } from '@angular/core';
import { HelpersService } from '../../../../services';

@Component({
    selector: 'about',
    templateUrl: 'about.template.html',
    styleUrls: ['about.styles.scss']
})
export class AboutComponent {

    constructor(private helpersService: HelpersService) {
        //
    }

    public trackScrollEnter() {
        this.helpersService.changeUrl('about');
    }
}
