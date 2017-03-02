import { Component } from '@angular/core';
import { HelpersService } from '../../../../services';

@Component({
    selector: 'contact',
    templateUrl: 'contact.template.html',
    styleUrls: ['contact.styles.scss']
})
export class ContactComponent {
    public trackScrollConfig = {
        position: 'bottom',
        offset: 100
    };

    constructor(private helpersService: HelpersService) {
        //
    }

    public trackScrollEnter() {
        this.helpersService.changeUrl('contact');
    }
}
