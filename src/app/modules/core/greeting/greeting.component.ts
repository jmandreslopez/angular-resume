import * as _ from 'lodash';
import { Component } from '@angular/core';
import { HelpersService, SeoService } from '../../../services';

@Component({
    selector: 'greeting',
    templateUrl: 'greeting.template.html',
    styleUrls: ['greeting.styles.scss']
})
export class GreetingComponent {

    constructor(private helpersService: HelpersService,
                private seoService: SeoService) {
        //
    }

    public trackScrollEnter() {
        this.helpersService.changeUrl('');
    }
}
