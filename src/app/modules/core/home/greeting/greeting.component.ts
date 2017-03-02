import { Component } from '@angular/core';
import { HelpersService } from '../../../../services';

@Component({
    selector: 'greeting',
    templateUrl: 'greeting.template.html',
    styleUrls: ['greeting.styles.scss']
})
export class GreetingComponent {

    constructor(private helpersService: HelpersService) {
        //
    }

    public trackScrollEnter() {
        this.helpersService.changeUrl('');
    }
}
